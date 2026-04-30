import {
  exercises,
  type Exercise,
  type MuscleGroup,
  type Objective,
  type SensitiveZone,
  type BodyZone,
  type JointRegion,
  type PrepFocus,
  type PrepIntensity,
  type PrepRole,
  type TrainingSetting,
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

type ZoneProfile = {
  focuses: PrepFocus[];
  roles: PrepRole[];
};

const COUNTS: Record<3 | 5 | 8, { articulaire: number; activation: number }> = {
  3: { articulaire: 2, activation: 2 },
  5: { articulaire: 3, activation: 3 },
  8: { articulaire: 4, activation: 4 },
};

const CIBLÉ_PER_ZONE: Record<3 | 5 | 8, number> = { 3: 1, 5: 1, 8: 2 };

const SETTING_SCORE: Record<TrainingSetting, number> = {
  gym: 4,
  both: 2,
  home: -2,
};

const OBJECTIVE_INTENSITY_SCORE: Record<Objective, Record<PrepIntensity, number>> = {
  force: { soft: -2, moderate: 2, neural: 4 },
  hypertrophie: { soft: -2, moderate: 3, neural: 1 },
  reprise: { soft: 1, moderate: 2, neural: -1 },
  mobilite: { soft: 4, moderate: 1, neural: -2 },
};

const OBJECTIVE_ROLE_SCORE: Record<Objective, Partial<Record<PrepRole, number>>> = {
  force: {
    activation: 3,
    stability: 4,
    therapeutic: 2,
    "core-bracing": 4,
    "posterior-chain": 3,
    mobility: 1,
  },
  hypertrophie: {
    activation: 3,
    stability: 3,
    therapeutic: 2,
    "core-bracing": 2,
    "posterior-chain": 2,
    mobility: 1,
  },
  reprise: {
    activation: 2,
    stability: 3,
    therapeutic: 4,
    "core-bracing": 3,
    "posterior-chain": 2,
    mobility: 3,
  },
  mobilite: {
    activation: 1,
    stability: 2,
    therapeutic: 2,
    "core-bracing": 1,
    "posterior-chain": 1,
    mobility: 4,
  },
};

const ZONE_PROFILES: Record<BodyZone, ZoneProfile> = {
  epaule: {
    focuses: ["scapula", "rotator-cuff", "thoracic"],
    roles: ["stability", "therapeutic", "activation"],
  },
  genou: {
    focuses: ["knee-control", "glutes", "hip"],
    roles: ["stability", "therapeutic", "activation"],
  },
  "bas-du-dos": {
    focuses: ["lumbar", "core", "glutes"],
    roles: ["therapeutic", "core-bracing", "posterior-chain", "activation"],
  },
  hanches: {
    focuses: ["hip", "glutes", "thoracic"],
    roles: ["stability", "therapeutic", "activation", "mobility"],
  },
  poignets: {
    focuses: ["wrist-forearm"],
    roles: ["therapeutic", "activation", "mobility"],
  },
  coudes: {
    focuses: ["elbow-tendon", "wrist-forearm"],
    roles: ["therapeutic", "activation", "mobility"],
  },
  chevilles: {
    focuses: ["ankle", "hip"],
    roles: ["therapeutic", "activation", "mobility"],
  },
};

const RELATED_MUSCLES: Record<MuscleGroup, MuscleGroup[]> = {
  pecs: ["epaules", "bras", "dos"],
  dos: ["epaules", "core", "bras"],
  epaules: ["pecs", "dos", "bras"],
  jambes: ["fessiers", "core"],
  fessiers: ["jambes", "core"],
  bras: ["pecs", "dos", "epaules"],
  core: ["dos", "fessiers", "jambes"],
};

function activeZones(zones: SensitiveZone[]): BodyZone[] {
  return zones.filter((zone): zone is BodyZone => zone !== "aucune");
}

function isAllowed(exercise: Exercise, active: BodyZone[]): boolean {
  return !exercise.contraindications.some((zone) => active.includes(zone));
}

function getNeededJoints(muscles: MuscleGroup[]): Set<JointRegion> {
  const joints = new Set<JointRegion>();

  muscles.forEach((muscle) => {
    MUSCLE_JOINTS[muscle].forEach((joint) => joints.add(joint));
  });

  return joints;
}

function getRelatedMuscles(muscles: MuscleGroup[]): Set<MuscleGroup> {
  const related = new Set<MuscleGroup>();

  muscles.forEach((muscle) => {
    RELATED_MUSCLES[muscle].forEach((relatedMuscle) => related.add(relatedMuscle));
  });

  return related;
}

function scoreRoles(exercise: Exercise, objective: Objective): number {
  return (exercise.prepRoles ?? []).reduce(
    (sum, role) => sum + (OBJECTIVE_ROLE_SCORE[objective][role] ?? 0),
    0
  );
}

function scoreZones(exercise: Exercise, zones: BodyZone[]): number {
  return zones.reduce((sum, zone) => {
    const profile = ZONE_PROFILES[zone];
    const support = exercise.painSupport?.includes(zone) || exercise.therapeutic === zone ? 8 : 0;
    const focusScore = (exercise.prepFocus ?? []).reduce(
      (focusSum, focus) => focusSum + (profile.focuses.includes(focus) ? 3 : 0),
      0
    );
    const roleScore = (exercise.prepRoles ?? []).reduce(
      (roleSum, role) => roleSum + (profile.roles.includes(role) ? 2 : 0),
      0
    );

    return sum + support + focusScore + roleScore;
  }, 0);
}

function scoreSetting(exercise: Exercise, objective: Objective): number {
  const base = SETTING_SCORE[exercise.setting ?? "both"];

  if (objective === "mobilite" && exercise.setting === "home") {
    return base + 1;
  }

  return base;
}

function scoreIntensity(exercise: Exercise, objective: Objective): number {
  return OBJECTIVE_INTENSITY_SCORE[objective][exercise.prepIntensity ?? "moderate"];
}

function scoreTrainingValue(exercise: Exercise): number {
  return (exercise.trainingValue ?? 2) * 3;
}

function scoreArticulaire(
  exercise: Exercise,
  neededJoints: Set<JointRegion>,
  objective: Objective,
  zones: BodyZone[]
): number {
  const jointScore = (exercise.joints ?? []).filter((joint) => neededJoints.has(joint)).length * 5;
  return (
    jointScore +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective) +
    scoreRoles(exercise, objective) +
    scoreZones(exercise, zones)
  );
}

function scoreActivation(
  exercise: Exercise,
  muscles: MuscleGroup[],
  objective: Objective,
  zones: BodyZone[]
): number {
  const relatedMuscles = getRelatedMuscles(muscles);
  const directMatches = exercise.muscles.filter((muscle) => muscles.includes(muscle)).length;
  const relatedMatches = exercise.muscles.filter((muscle) => relatedMuscles.has(muscle)).length;
  const muscleScore = directMatches * 5 + relatedMatches * 2;
  const objectiveScore = exercise.objectives.includes(objective) ? 3 : 0;
  const therapeuticFromActivation =
    exercise.category === "activation" && zones.some((zone) => exercise.painSupport?.includes(zone))
      ? 4
      : 0;
  const offTargetPenalty =
    directMatches === 0 && relatedMatches === 0 && therapeuticFromActivation === 0 ? -12 : 0;

  return (
    muscleScore +
    objectiveScore +
    therapeuticFromActivation +
    offTargetPenalty +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective) +
    scoreRoles(exercise, objective) +
    scoreZones(exercise, zones)
  );
}

function scoreProtection(
  exercise: Exercise,
  zone: BodyZone,
  objective: Objective,
  targets: MuscleGroup[]
): number {
  const profile = ZONE_PROFILES[zone];
  const muscleScore = exercise.muscles.filter((muscle) => targets.includes(muscle)).length * 3;
  const objectiveScore = exercise.objectives.includes(objective) ? 2 : 0;
  const explicitSupport = exercise.painSupport?.includes(zone) || exercise.therapeutic === zone ? 14 : 0;
  const focusScore = (exercise.prepFocus ?? []).reduce(
    (sum, focus) => sum + (profile.focuses.includes(focus) ? 4 : 0),
    0
  );
  const roleScore = (exercise.prepRoles ?? []).reduce(
    (sum, role) => sum + (profile.roles.includes(role) ? 3 : 0),
    0
  );

  return (
    muscleScore +
    objectiveScore +
    explicitSupport +
    focusScore +
    roleScore +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective)
  );
}

function sortScored<T extends { exercise: Exercise; score: number }>(items: T[]): T[] {
  return items.sort(
    (a, b) => b.score - a.score || a.exercise.id.localeCompare(b.exercise.id)
  );
}

function pickArticulaire(
  candidates: Exercise[],
  neededJoints: Set<JointRegion>,
  objective: Objective,
  zones: BodyZone[],
  count: number
): Exercise[] {
  const scored = sortScored(
    candidates.map((exercise) => ({
      exercise,
      score: scoreArticulaire(exercise, neededJoints, objective, zones),
    }))
  );

  const picked: Exercise[] = [];
  const covered = new Set<JointRegion>();

  for (const { exercise } of scored) {
    if (picked.length >= count) break;
    const matchingJoints = (exercise.joints ?? []).filter((joint) => neededJoints.has(joint));
    const addsCoverage = matchingJoints.some((joint) => !covered.has(joint));

    if (matchingJoints.length > 0 && addsCoverage) {
      picked.push(exercise);
      matchingJoints.forEach((joint) => covered.add(joint));
    }
  }

  for (const { exercise } of scored) {
    if (picked.length >= count) break;
    if (!picked.includes(exercise)) {
      picked.push(exercise);
    }
  }

  return picked.slice(0, count);
}

function pickActivation(
  candidates: Exercise[],
  muscles: MuscleGroup[],
  objective: Objective,
  zones: BodyZone[],
  count: number
): Exercise[] {
  const scored = sortScored(
    candidates.map((exercise) => ({
      exercise,
      score: scoreActivation(exercise, muscles, objective, zones),
    }))
  );

  const picked: Exercise[] = [];
  const covered = new Set<MuscleGroup>();

  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score <= 0) continue;

    const matchingMuscles = exercise.muscles.filter((muscle) => muscles.includes(muscle));
    const addsCoverage = matchingMuscles.some((muscle) => !covered.has(muscle));

    if (matchingMuscles.length > 0 && addsCoverage) {
      picked.push(exercise);
      matchingMuscles.forEach((muscle) => covered.add(muscle));
    }
  }

  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score <= 0) continue;
    if (!picked.includes(exercise)) {
      picked.push(exercise);
    }
  }

  return picked.slice(0, count);
}

function pickCibléForZone(
  zone: BodyZone,
  objective: Objective,
  targets: MuscleGroup[],
  excluded: Set<string>,
  active: BodyZone[],
  count: number
): Exercise[] {
  const candidates = exercises.filter(
    (exercise) =>
      !excluded.has(exercise.id) &&
      isAllowed(exercise, active) &&
      (exercise.painSupport?.includes(zone) || exercise.therapeutic === zone)
  );

  const scored = sortScored(
    candidates.map((exercise) => ({
      exercise,
      score: scoreProtection(exercise, zone, objective, targets),
    }))
  );

  return scored.slice(0, count).map(({ exercise }) => exercise);
}

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

  const active = activeZones(zones);
  const neededJoints = getNeededJoints(targets);
  const allowed = exercises.filter((exercise) => isAllowed(exercise, active));

  const articulaire = pickArticulaire(
    allowed.filter((exercise) => exercise.category === "articulaire"),
    neededJoints,
    objective,
    active,
    counts.articulaire
  );

  const activation = pickActivation(
    allowed.filter((exercise) => exercise.category === "activation"),
    targets,
    objective,
    active,
    counts.activation
  );

  const usedIds = new Set([
    ...articulaire.map((exercise) => exercise.id),
    ...activation.map((exercise) => exercise.id),
  ]);

  const ciblé: CibléExercise[] = [];

  for (const zone of active) {
    const picked = pickCibléForZone(zone, objective, targets, usedIds, active, cibléPerZone);

    picked.forEach((exercise) => {
      usedIds.add(exercise.id);
      ciblé.push({ exercise, zone });
    });
  }

  const totalSeconds = [...articulaire, ...activation, ...ciblé.map((item) => item.exercise)].reduce(
    (sum, exercise) => sum + exercise.durationSeconds,
    0
  );

  return { articulaire, activation, ciblé, totalSeconds };
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds}s`;
  if (remainingSeconds === 0) return `${minutes} min`;
  return `${minutes} min ${remainingSeconds}s`;
}
