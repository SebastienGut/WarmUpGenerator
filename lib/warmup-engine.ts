import {
  exercises,
  type Exercise,
  type MuscleGroup,
  type Objective,
  type SensitiveZone,
  type BodyZone,
  type JointRegion,
  MUSCLE_JOINTS,
} from "./warmup-data";

export interface CibléExercise {
  exercise: Exercise;
  zone: BodyZone;
}

export interface WarmupPlan {
  articulaire: Exercise[];
  activation: Exercise[];
  ciblé: CibléExercise[];
  totalSeconds: number;
}

interface GenerateOptions {
  muscles: MuscleGroup[];
  objective: Objective;
  zones: SensitiveZone[];
  duration: 3 | 5 | 8;
}

const COUNTS: Record<3 | 5 | 8, { articulaire: number; activation: number }> = {
  3: { articulaire: 2, activation: 2 },
  5: { articulaire: 3, activation: 3 },
  8: { articulaire: 4, activation: 4 },
};

const CIBLÉ_PER_ZONE: Record<3 | 5 | 8, number> = { 3: 1, 5: 1, 8: 2 };

function activeZones(zones: SensitiveZone[]): BodyZone[] {
  return zones.filter((z): z is BodyZone => z !== "aucune");
}

function isAllowed(exercise: Exercise, zones: SensitiveZone[]): boolean {
  const az = activeZones(zones);
  return !exercise.contraindications.some((c) => az.includes(c));
}

// ─── ARTICULAIRE — scoring par articulations, pas par muscles ─────────────────

function getNeededJoints(muscles: MuscleGroup[]): Set<JointRegion> {
  const joints = new Set<JointRegion>();
  muscles.forEach((m) => MUSCLE_JOINTS[m].forEach((j) => joints.add(j)));
  return joints;
}

function pickArticulaire(
  candidates: Exercise[],
  neededJoints: Set<JointRegion>,
  count: number
): Exercise[] {
  const scored = candidates
    .map((e) => ({
      exercise: e,
      score: (e.joints ?? []).filter((j) => neededJoints.has(j)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || a.exercise.id.localeCompare(b.exercise.id)
    );

  const picked: Exercise[] = [];
  const jointsCovered = new Set<JointRegion>();

  // Passe 1 : couvrir un max de joints non encore couverts, par ordre de score
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score === 0) continue;
    const coversNew = (exercise.joints ?? []).some(
      (j) => neededJoints.has(j) && !jointsCovered.has(j)
    );
    if (coversNew) {
      picked.push(exercise);
      (exercise.joints ?? []).forEach((j) => jointsCovered.add(j));
    }
  }

  // Passe 2 : compléter avec score > 0, joints déjà couverts OK
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score === 0) continue;
    if (!picked.includes(exercise)) picked.push(exercise);
  }

  // Passe 3 : dernier recours (général, aucun joint nécessaire)
  for (const { exercise } of scored) {
    if (picked.length >= count) break;
    if (!picked.includes(exercise)) picked.push(exercise);
  }

  return picked.slice(0, count);
}

// ─── ACTIVATION — scoring par muscles + objectif + bonus zones actives ────────

function scoreActivation(
  exercise: Exercise,
  muscles: MuscleGroup[],
  objective: Objective,
  az: BodyZone[]
): number {
  const muscleScore = exercise.muscles.filter((m) => muscles.includes(m)).length;
  const objectiveScore = exercise.objectives.includes(objective) ? 2 : 0;
  // Bonus pour les exercices thérapeutiques d'une zone active : ils remontent
  const therapeuticBonus =
    exercise.therapeutic && az.includes(exercise.therapeutic) ? 4 : 0;
  return muscleScore * 3 + objectiveScore + therapeuticBonus;
}

function pickActivation(
  candidates: Exercise[],
  muscles: MuscleGroup[],
  objective: Objective,
  count: number,
  az: BodyZone[]
): Exercise[] {
  const scored = candidates
    .map((e) => ({
      exercise: e,
      score: scoreActivation(e, muscles, objective, az),
    }))
    .sort(
      (a, b) =>
        b.score - a.score || a.exercise.id.localeCompare(b.exercise.id)
    );

  const picked: Exercise[] = [];
  const musclesCovered = new Set<MuscleGroup>();

  // Passe 1 : couvrir les muscles ciblés, score > 0
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score === 0) continue;
    const coversNewTargeted = exercise.muscles.some(
      (m) => muscles.includes(m) && !musclesCovered.has(m)
    );
    if (coversNewTargeted) {
      picked.push(exercise);
      exercise.muscles.forEach((m) => musclesCovered.add(m));
    }
  }

  // Passe 2 : compléter score > 0
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score === 0) continue;
    if (!picked.includes(exercise)) picked.push(exercise);
  }

  // Passe 3 : dernier recours
  for (const { exercise } of scored) {
    if (picked.length >= count) break;
    if (!picked.includes(exercise)) picked.push(exercise);
  }

  return picked.slice(0, count);
}

// ─── CIBLÉ — exercices spécifiques à la zone ─────────────────────────────────

function pickCibléForZone(
  zone: BodyZone,
  objective: Objective,
  excluded: Set<string>,
  count: number
): Exercise[] {
  const base = exercises.filter(
    (e) => e.category === "ciblé" && e.therapeutic === zone && !excluded.has(e.id)
  );
  // Préférer ceux qui correspondent à l'objectif
  const withObj = base.filter((e) => e.objectives.includes(objective));
  const pool = withObj.length >= count ? withObj : base;
  return pool.slice(0, count);
}

// ─── ENTRÉE PRINCIPALE ────────────────────────────────────────────────────────

export function generateWarmup({
  muscles,
  objective,
  zones,
  duration,
}: GenerateOptions): WarmupPlan {
  const counts = COUNTS[duration];
  const cibléPerZone = CIBLÉ_PER_ZONE[duration];

  const targets: MuscleGroup[] =
    muscles.length > 0
      ? muscles
      : ["pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core"];

  const az = activeZones(zones);

  const allowed = exercises.filter(
    (e) =>
      (e.category === "articulaire" || e.category === "activation") &&
      isAllowed(e, zones)
  );

  // Articulaire : scoring joint-based
  const neededJoints = getNeededJoints(targets);
  const articulaire = pickArticulaire(
    allowed.filter((e) => e.category === "articulaire"),
    neededJoints,
    counts.articulaire
  );

  // Activation : scoring muscle + objectif + bonus zone
  const activation = pickActivation(
    allowed.filter((e) => e.category === "activation"),
    targets,
    objective,
    counts.activation,
    az
  );

  // Ciblé : exercices zone-spécifiques
  const usedIds = new Set([
    ...articulaire.map((e) => e.id),
    ...activation.map((e) => e.id),
  ]);

  const ciblé: CibléExercise[] = [];
  for (const zone of az) {
    const picked = pickCibléForZone(zone, objective, usedIds, cibléPerZone);
    picked.forEach((e) => {
      usedIds.add(e.id);
      ciblé.push({ exercise: e, zone });
    });
  }

  const all = [
    ...articulaire,
    ...activation,
    ...ciblé.map((c) => c.exercise),
  ];
  const totalSeconds = all.reduce((s, e) => s + e.durationSeconds, 0);

  return { articulaire, activation, ciblé, totalSeconds };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s}s`;
}
