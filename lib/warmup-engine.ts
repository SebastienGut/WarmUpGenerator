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
  type Equipment,
  MUSCLE_JOINTS,
} from "./warmup-data";

export interface CibléExercise {
  exercise: Exercise;
  zone: BodyZone;
}

export interface WarmupPlan {
  articulaire: Exercise[];
  activation: Exercise[];
  rounds: number;          // times to repeat the articulaire+activation circuit
  ciblé: CibléExercise[]; // done once after the circuit
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

type WarmupCounts = {
  articulaire: number;
  activation: number;
};

// Exercises per circuit pass — repeated `rounds` times to fill the target duration
const CIRCUIT_COUNTS: Record<Objective, Record<3 | 5 | 8, WarmupCounts>> = {
  force: {
    3: { articulaire: 1, activation: 2 },
    5: { articulaire: 2, activation: 3 },
    8: { articulaire: 2, activation: 3 },
  },
  hypertrophie: {
    3: { articulaire: 1, activation: 2 },
    5: { articulaire: 2, activation: 3 },
    8: { articulaire: 2, activation: 3 },
  },
  reprise: {
    3: { articulaire: 1, activation: 2 },
    5: { articulaire: 2, activation: 2 },
    8: { articulaire: 2, activation: 2 },
  },
  mobilite: {
    3: { articulaire: 3, activation: 0 },
    5: { articulaire: 3, activation: 0 },
    8: { articulaire: 4, activation: 1 },
  },
};

const PROTECTION_LIMIT: Record<Objective, Record<3 | 5 | 8, number>> = {
  force:        { 3: 1, 5: 2, 8: 2 },
  hypertrophie: { 3: 1, 5: 2, 8: 2 },
  reprise:      { 3: 1, 5: 2, 8: 2 },
  mobilite:     { 3: 1, 5: 1, 8: 1 },
};

// Max circuit repetitions per duration — longer formats allow more rounds to fill the time
const MAX_ROUNDS: Record<3 | 5 | 8, number> = { 3: 1, 5: 2, 8: 3 };

const SETTING_SCORE: Record<TrainingSetting, number> = {
  gym: 4,
  both: 2,
  home: -2,
};

const OBJECTIVE_INTENSITY_SCORE: Record<Objective, Record<PrepIntensity, number>> = {
  force:        { soft: -2, moderate: 2, neural: 4 },
  hypertrophie: { soft: -2, moderate: 3, neural: 1 },
  reprise:      { soft: 1,  moderate: 2, neural: -1 },
  mobilite:     { soft: 4,  moderate: 1, neural: -2 },
};

const OBJECTIVE_ROLE_SCORE: Record<Objective, Partial<Record<PrepRole, number>>> = {
  force: {
    activation: 3, stability: 4, therapeutic: 2,
    "core-bracing": 4, "posterior-chain": 3, mobility: 1,
  },
  hypertrophie: {
    activation: 3, stability: 3, therapeutic: 2,
    "core-bracing": 2, "posterior-chain": 2, mobility: 1,
  },
  reprise: {
    activation: 2, stability: 3, therapeutic: 4,
    "core-bracing": 3, "posterior-chain": 2, mobility: 3,
  },
  mobilite: {
    activation: 1, stability: 2, therapeutic: 2,
    "core-bracing": 1, "posterior-chain": 1, mobility: 4,
  },
};

// Equipment proximity groups — same group = stay in the same gym spot
// 0 = bodyweight (neutral, works everywhere)
// 1 = elastic/cable area (elastique + poulie are interchangeable)
// 2 = dumbbell rack
// 3 = barbell station
const EQUIPMENT_GROUP: Record<Equipment, number> = {
  aucun:     0,
  elastique: 1,
  poulie:    1,
  haltere:   2,
  barre:     3,
};

const ZONE_PROFILES: Record<BodyZone, ZoneProfile> = {
  epaule:       { focuses: ["scapula", "rotator-cuff", "thoracic"],   roles: ["stability", "therapeutic", "activation"] },
  genou:        { focuses: ["knee-control", "glutes", "hip"],         roles: ["stability", "therapeutic", "activation"] },
  "bas-du-dos": { focuses: ["lumbar", "core", "glutes"],              roles: ["therapeutic", "core-bracing", "posterior-chain", "activation"] },
  hanches:      { focuses: ["hip", "glutes", "thoracic"],             roles: ["stability", "therapeutic", "activation", "mobility"] },
  poignets:     { focuses: ["wrist-forearm"],                         roles: ["therapeutic", "activation", "mobility"] },
  coudes:       { focuses: ["elbow-tendon", "wrist-forearm"],         roles: ["therapeutic", "activation", "mobility"] },
  chevilles:    { focuses: ["ankle", "hip"],                          roles: ["therapeutic", "activation", "mobility"] },
};

const RELATED_MUSCLES: Record<MuscleGroup, MuscleGroup[]> = {
  pecs:     ["epaules"],
  dos:      ["epaules", "core"],
  epaules:  ["dos"],
  jambes:   ["fessiers"],
  fessiers: ["jambes", "core"],
  bras:     [],
  core:     [],
};

function activeZones(zones: SensitiveZone[]): BodyZone[] {
  return zones.filter((zone): zone is BodyZone => zone !== "aucune");
}

function isAllowed(exercise: Exercise, active: BodyZone[]): boolean {
  return !exercise.contraindications.some((zone) => active.includes(zone));
}

function getNeededJoints(muscles: MuscleGroup[]): Set<JointRegion> {
  const joints = new Set<JointRegion>();
  muscles.forEach((muscle) => MUSCLE_JOINTS[muscle].forEach((joint) => joints.add(joint)));
  return joints;
}

function getRelatedMuscles(muscles: MuscleGroup[]): Set<MuscleGroup> {
  const related = new Set<MuscleGroup>();
  muscles.forEach((muscle) => RELATED_MUSCLES[muscle].forEach((m) => related.add(m)));
  return related;
}

// Returns the dominant non-neutral equipment group among a set of exercises
function dominantEquipmentGroup(selected: Exercise[]): number | null {
  const groups = selected
    .map((e) => EQUIPMENT_GROUP[e.equipment])
    .filter((g) => g !== 0);
  if (groups.length === 0) return null;
  const counts = groups.reduce<Record<number, number>>((acc, g) => {
    acc[g] = (acc[g] ?? 0) + 1;
    return acc;
  }, {});
  return Number(Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0]);
}

// +2 for bodyweight (always compatible), +3 for same group, -4 for different gym zone
function scoreEquipmentProximity(exercise: Exercise, dominantGroup: number | null): number {
  if (exercise.equipment === "aucun") return 2;
  if (dominantGroup === null) return 0;
  const group = EQUIPMENT_GROUP[exercise.equipment];
  if (group === dominantGroup) return 3;
  if (Math.abs(group - dominantGroup) === 1) return 0;
  return -4;
}

function scoreRoles(exercise: Exercise, objective: Objective): number {
  return (exercise.prepRoles ?? []).reduce(
    (sum, role) => sum + (OBJECTIVE_ROLE_SCORE[objective][role] ?? 0), 0
  );
}

function scoreZones(exercise: Exercise, zones: BodyZone[]): number {
  return zones.reduce((sum, zone) => {
    const profile = ZONE_PROFILES[zone];
    const support = exercise.painSupport?.includes(zone) || exercise.therapeutic === zone ? 8 : 0;
    const focusScore = (exercise.prepFocus ?? []).reduce(
      (s, focus) => s + (profile.focuses.includes(focus) ? 3 : 0), 0
    );
    const roleScore = (exercise.prepRoles ?? []).reduce(
      (s, role) => s + (profile.roles.includes(role) ? 2 : 0), 0
    );
    return sum + support + focusScore + roleScore;
  }, 0);
}

function scoreSetting(exercise: Exercise, objective: Objective): number {
  const base = SETTING_SCORE[exercise.setting ?? "both"];
  if (objective === "mobilite" && exercise.setting === "home") return base + 1;
  return base;
}

function scoreIntensity(exercise: Exercise, objective: Objective): number {
  return OBJECTIVE_INTENSITY_SCORE[objective][exercise.prepIntensity ?? "moderate"];
}

function scoreTrainingValue(exercise: Exercise): number {
  return (exercise.trainingValue ?? 2) * 3;
}

function scoreObjectiveFit(exercise: Exercise, objective: Objective): number {
  const objectiveScore = exercise.objectives.includes(objective) ? 10 : -6;
  const roles = exercise.prepRoles ?? [];
  const intensity = exercise.prepIntensity ?? "moderate";
  const equipment = exercise.equipment;

  if (objective === "mobilite") {
    const mobilityFit =
      roles.includes("mobility") || exercise.category === "articulaire" || intensity === "soft" ? 10 : 0;
    const activationPenalty =
      exercise.category === "activation" && !roles.includes("therapeutic") && !roles.includes("stability") ? -8 : 0;
    const equipmentPenalty =
      equipment === "poulie" || equipment === "barre" || equipment === "haltere" ? -5 : 0;
    return objectiveScore + mobilityFit + activationPenalty + equipmentPenalty;
  }

  if (objective === "reprise") {
    const therapeuticFit =
      roles.includes("therapeutic") || exercise.therapeutic || exercise.painSupport?.length ? 10 : 0;
    const stabilityFit = roles.includes("stability") || roles.includes("core-bracing") ? 5 : 0;
    const neuralPenalty = intensity === "neural" ? -8 : 0;
    const heavyEquipmentPenalty = equipment === "barre" ? -6 : 0;
    return objectiveScore + therapeuticFit + stabilityFit + neuralPenalty + heavyEquipmentPenalty;
  }

  if (objective === "force") {
    const neuralFit = intensity === "neural" ? 6 : 0;
    const stabilityFit = roles.includes("stability") || roles.includes("core-bracing") ? 5 : 0;
    return objectiveScore + neuralFit + stabilityFit;
  }

  // hypertrophie
  const activationFit = roles.includes("activation") ? 6 : 0;
  const mindMuscleFit = intensity === "moderate" ? 4 : 0;
  return objectiveScore + activationFit + mindMuscleFit;
}

// Used only internally in the articulaire picker (joint score computed dynamically)
function scoreArticulaireBase(
  exercise: Exercise,
  objective: Objective,
  zones: BodyZone[],
  dominantEquipGroup: number | null,
): number {
  return (
    scoreObjectiveFit(exercise, objective) +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective) +
    scoreRoles(exercise, objective) +
    scoreZones(exercise, zones) +
    scoreEquipmentProximity(exercise, dominantEquipGroup)
  );
}

// Blocks same-movement variants identified by movementKey (e.g. face-pull elastic vs cable).
// Exercises without movementKey are never blocked — prepFocus overlap alone is too coarse
// (e.g. rotation coiffe and face pull share focuses but are complementary, not redundant).
function isFunctionalDuplicate(exercise: Exercise, picked: Exercise[]): boolean {
  if (!exercise.movementKey) return false;
  return picked.some((p) => p.movementKey === exercise.movementKey);
}

function scoreActivation(
  exercise: Exercise,
  muscles: MuscleGroup[],
  objective: Objective,
  zones: BodyZone[],
  dominantEquipGroup: number | null,
): number {
  const relatedMuscles = getRelatedMuscles(muscles);
  const directMatches = exercise.muscles.filter((m) => muscles.includes(m)).length;
  const prepMatches = exercise.prepMuscles?.filter((m) => muscles.includes(m)).length ?? 0;
  const relatedMatches = exercise.muscles.filter((m) => relatedMuscles.has(m)).length;
  const muscleScore = directMatches * 8 + prepMatches * 6 + Math.min(relatedMatches, 1);
  const therapeuticFromActivation =
    exercise.category === "activation" && zones.some((z) => exercise.painSupport?.includes(z)) ? 4 : 0;
  const comboAccessory = muscles.length > 1 && relatedMatches > 0;
  const offTargetPenalty =
    directMatches === 0 && prepMatches === 0 && therapeuticFromActivation === 0 && !comboAccessory
      ? -40
      : 0;

  return (
    muscleScore +
    scoreObjectiveFit(exercise, objective) +
    therapeuticFromActivation +
    offTargetPenalty +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective) +
    scoreRoles(exercise, objective) +
    scoreZones(exercise, zones) +
    scoreEquipmentProximity(exercise, dominantEquipGroup)
  );
}

function scoreProtection(
  exercise: Exercise,
  zone: BodyZone,
  objective: Objective,
  targets: MuscleGroup[],
): number {
  const profile = ZONE_PROFILES[zone];
  const muscleScore = exercise.muscles.filter((m) => targets.includes(m)).length * 3;
  const explicitSupport = exercise.painSupport?.includes(zone) || exercise.therapeutic === zone ? 14 : 0;
  const targetedExercise = exercise.category === "ciblé" ? 8 : 0;
  const focusScore = (exercise.prepFocus ?? []).reduce(
    (sum, f) => sum + (profile.focuses.includes(f) ? 4 : 0), 0
  );
  const roleScore = (exercise.prepRoles ?? []).reduce(
    (sum, r) => sum + (profile.roles.includes(r) ? 3 : 0), 0
  );
  return (
    muscleScore +
    scoreObjectiveFit(exercise, objective) +
    explicitSupport +
    targetedExercise +
    focusScore +
    roleScore +
    scoreTrainingValue(exercise) +
    scoreSetting(exercise, objective) +
    scoreIntensity(exercise, objective)
  );
}

function sortScored<T extends { exercise: Exercise; score: number }>(items: T[]): T[] {
  return items.sort((a, b) => b.score - a.score || a.exercise.id.localeCompare(b.exercise.id));
}

function pickArticulaire(
  candidates: Exercise[],
  neededJoints: Set<JointRegion>,
  muscles: MuscleGroup[],
  objective: Objective,
  zones: BodyZone[],
  count: number,
): Exercise[] {
  // Hard filter: only exercises that cover at least one needed joint
  const relevant = candidates.filter(
    (e) => (e.joints ?? []).some((j) => neededJoints.has(j))
  );

  const picked: Exercise[] = [];
  const covered = new Set<JointRegion>();
  let remaining = [...relevant];

  // Dynamic greedy: rescore after each pick so new-joint bonus reflects what's still uncovered
  while (picked.length < count && remaining.length > 0) {
    const domGroup = dominantEquipmentGroup(picked);

    const scored = sortScored(
      remaining.map((exercise) => {
        const exJoints = exercise.joints ?? [];
        const newJoints   = exJoints.filter((j) => neededJoints.has(j) && !covered.has(j)).length;
        const knownJoints = exJoints.filter((j) => neededJoints.has(j) &&  covered.has(j)).length;
        // Strong bonus for covering new joints, tiny bonus for redundant coverage (keeps variety)
        const jointScore = newJoints * 8 + knownJoints * 1;
        const posteriorChainComboBonus =
          muscles.includes("jambes") &&
          muscles.includes("dos") &&
          exercise.id === "art-lombaires-essuie-glace"
            ? 10
            : 0;
        return {
          exercise,
          score:
            jointScore +
            posteriorChainComboBonus +
            scoreArticulaireBase(exercise, objective, zones, domGroup),
        };
      })
    );

    const [best] = scored;
    if (!best) break;

    picked.push(best.exercise);
    (best.exercise.joints ?? []).forEach((j) => {
      if (neededJoints.has(j)) covered.add(j);
    });
    remaining = remaining.filter((e) => e !== best.exercise);
  }

  return picked;
}

function pickActivation(
  candidates: Exercise[],
  muscles: MuscleGroup[],
  objective: Objective,
  zones: BodyZone[],
  count: number,
  dominantEquipGroup: number | null,
): Exercise[] {
  const scored = sortScored(
    candidates.map((exercise) => ({
      exercise,
      score: scoreActivation(exercise, muscles, objective, zones, dominantEquipGroup),
    }))
  );

  const picked: Exercise[] = [];
  const covered = new Set<MuscleGroup>();

  // First pass: one exercise per muscle group, no functional duplicates.
  // Zone-therapeutic exercises (matching a target muscle) bypass the addsCoverage requirement
  // so they are never squeezed out by exercises that happen to cover a new muscle group.
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score <= 0) continue;
    const matchingMuscles = [
      ...exercise.muscles.filter((m) => muscles.includes(m)),
      ...(exercise.prepMuscles?.filter((m) => muscles.includes(m)) ?? []),
    ];
    const relatedMuscles = getRelatedMuscles(muscles);
    const isComboAccessory =
      matchingMuscles.length === 0 &&
      muscles.length > 1 &&
      exercise.movementKey === "face-pull" &&
      exercise.muscles.some((m) => relatedMuscles.has(m));
    const addsCoverage = matchingMuscles.some((m) => !covered.has(m));
    const isZoneTherapeutic =
      matchingMuscles.length > 0 &&
      zones.some((z) => exercise.painSupport?.includes(z) || exercise.therapeutic === z);
    // Essential prep exercises (e.g. rotation coiffe) bypass coverage requirement
    // when the muscles they prepare are being trained — preventive, not zone-dependent
    const isMuscleEssential =
      matchingMuscles.length > 0 &&
      exercise.prepMuscles?.some((m) => muscles.includes(m));
    const canAdd =
      (matchingMuscles.length > 0 && addsCoverage) ||
      isZoneTherapeutic ||
      isMuscleEssential ||
      isComboAccessory;
    if (canAdd && !isFunctionalDuplicate(exercise, picked)) {
      picked.push(exercise);
      matchingMuscles.forEach((m) => covered.add(m));
    }
  }

  // Second pass: fill remaining slots with direct-match exercises (still no duplicates)
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score <= 0) continue;
    if (
      !picked.includes(exercise) &&
      (exercise.muscles.some((m) => muscles.includes(m)) ||
        exercise.prepMuscles?.some((m) => muscles.includes(m))) &&
      !isFunctionalDuplicate(exercise, picked)
    ) {
      picked.push(exercise);
    }
  }

  // Third pass: fallback — allow anything positive-score (duplicates included as last resort)
  for (const { exercise, score } of scored) {
    if (picked.length >= count) break;
    if (score <= 0) continue;
    if (!picked.includes(exercise)) picked.push(exercise);
  }

  return picked.slice(0, count);
}

function pickCibléForZone(
  zone: BodyZone,
  objective: Objective,
  targets: MuscleGroup[],
  excluded: Set<string>,
  active: BodyZone[],
  count: number,
): Exercise[] {
  const candidates = exercises.filter(
    (e) =>
      !excluded.has(e.id) &&
      isAllowed(e, active) &&
      (e.painSupport?.includes(zone) || e.therapeutic === zone)
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
  const counts = CIRCUIT_COUNTS[objective][duration];
  const protectionLimit = PROTECTION_LIMIT[objective][duration];
  const targets: MuscleGroup[] =
    muscles.length > 0
      ? muscles
      : ["pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core"];

  const active = activeZones(zones);
  const neededJoints = getNeededJoints(targets);
  const allowed = exercises.filter((e) => isAllowed(e, active));

  // Therapeutic exercises for active zones are reserved exclusively for the ciblé slot
  const reservedForCible = (e: Exercise) =>
    active.some((z) => e.painSupport?.includes(z) || e.therapeutic === z);

  const articulaire = pickArticulaire(
    allowed.filter((e) => e.category === "articulaire" && !reservedForCible(e)),
    neededJoints,
    targets,
    objective,
    active,
    counts.articulaire,
  );

  const artDomGroup = dominantEquipmentGroup(articulaire);

  const activation = pickActivation(
    allowed.filter((e) => e.category === "activation" && !reservedForCible(e)),
    targets,
    objective,
    active,
    counts.activation,
    artDomGroup,
  );

  const usedIds = new Set([
    ...articulaire.map((e) => e.id),
    ...activation.map((e) => e.id),
  ]);

  const ciblé: CibléExercise[] = [];

  for (const zone of active) {
    if (ciblé.length >= protectionLimit) break;
    const picked = pickCibléForZone(zone, objective, targets, usedIds, active, 1);
    picked.forEach((exercise) => {
      if (ciblé.length >= protectionLimit) return;
      usedIds.add(exercise.id);
      ciblé.push({ exercise, zone });
    });
  }

  // Calculate rounds to fill the target duration
  const onePassSeconds =
    articulaire.reduce((s, e) => s + e.durationSeconds, 0) +
    activation.reduce((s, e) => s + e.durationSeconds, 0);
  const cibléSeconds = ciblé.reduce((s, c) => s + c.exercise.durationSeconds, 0);
  const budgetCircuit = duration * 60 - cibléSeconds;

  const rounds =
    onePassSeconds === 0
      ? 1
      : Math.min(MAX_ROUNDS[duration], Math.max(1, Math.round(budgetCircuit / onePassSeconds)));

  const totalSeconds = onePassSeconds * rounds + cibléSeconds;

  return { articulaire, activation, rounds, ciblé, totalSeconds };
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) return `${remainingSeconds}s`;
  if (remainingSeconds === 0) return `${minutes} min`;
  return `${minutes} min ${remainingSeconds}s`;
}
