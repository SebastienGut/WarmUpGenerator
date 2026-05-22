export type MuscleGroup =
  | "pecs"
  | "dos"
  | "epaules"
  | "jambes"
  | "fessiers"
  | "bras"
  | "core";

export type Objective = "force" | "hypertrophie" | "reprise" | "mobilite";

export type SensitiveZone =
  | "aucune"
  | "epaule"
  | "genou"
  | "bas-du-dos"
  | "hanches"
  | "poignets"
  | "coudes"
  | "chevilles";

export type ExerciseCategory = "articulaire" | "activation" | "ciblé";

// Régions articulaires — utilisées pour scorer les exercices articulaires
// (la mobilisation articulaire raisonne en articulations, pas en muscles)
export type JointRegion =
  | "rachis-cervical"
  | "rachis-thoracique"
  | "rachis-lombaire"
  | "epaule"
  | "coude-poignet"
  | "hanche"
  | "genou"
  | "cheville";

// Articulations à mobiliser selon le groupe musculaire ciblé
export const MUSCLE_JOINTS: Record<MuscleGroup, JointRegion[]> = {
  pecs:     ["rachis-thoracique", "epaule"],
  dos:      ["rachis-thoracique", "rachis-lombaire", "epaule"],
  epaules:  ["rachis-thoracique", "epaule"],
  jambes:   ["hanche", "genou", "cheville"],
  fessiers: ["hanche", "rachis-lombaire"],
  bras:     ["coude-poignet", "epaule"],
  core:     ["rachis-thoracique", "rachis-lombaire"],
};

export type BodyZone = Exclude<SensitiveZone, "aucune">;

export type Equipment = "aucun" | "elastique" | "haltere" | "poulie" | "barre";

export type TrainingSetting = "gym" | "both" | "home";

export type PrepRole =
  | "mobility"
  | "activation"
  | "stability"
  | "therapeutic"
  | "core-bracing"
  | "posterior-chain";

export type PrepFocus =
  | "scapula"
  | "rotator-cuff"
  | "thoracic"
  | "lumbar"
  | "hip"
  | "knee-control"
  | "ankle"
  | "wrist-forearm"
  | "elbow-tendon"
  | "glutes"
  | "core";

export type PrepIntensity = "soft" | "moderate" | "neural";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscles: MuscleGroup[];
  objectives: Objective[];
  contraindications: BodyZone[];
  durationSeconds: number;
  description: string;
  reps?: string;
  equipment: Equipment;
  fallback?: string;
  // Pour les exercices articulaires : articulations mobilisées (scoring joint-based)
  joints?: JointRegion[];
  // Si présent, cet exercice est sélectionné quand cette zone est cochée
  therapeutic?: BodyZone;
  // Identifie les variantes d'un même mouvement (ex: "face-pull") pour éviter les doublons
  movementKey?: string;
  // Muscles pour lesquels cet exercice est une préparation essentielle (bypass addsCoverage)
  prepMuscles?: MuscleGroup[];
  setting?: TrainingSetting;
  prepRoles?: PrepRole[];
  prepFocus?: PrepFocus[];
  prepIntensity?: PrepIntensity;
  trainingValue?: number;
  painSupport?: BodyZone[];
}

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  pecs: "Pectoraux",
  dos: "Dos",
  epaules: "Épaules",
  jambes: "Jambes",
  fessiers: "Fessiers",
  bras: "Bras",
  core: "Core",
};

export const MUSCLE_EMOJIS: Record<MuscleGroup, string> = {
  pecs: "💪",
  dos: "🔙",
  epaules: "🔼",
  jambes: "🦵",
  fessiers: "🍑",
  bras: "💪",
  core: "⚡",
};

export const OBJECTIVE_LABELS: Record<Objective, string> = {
  force: "Force",
  hypertrophie: "Hypertrophie",
  reprise: "Reprise",
  mobilite: "Mobilité",
};

export const OBJECTIVE_DESCRIPTIONS: Record<Objective, string> = {
  force: "Activation SNC, potentiation neuromusculaire",
  hypertrophie: "Afflux sanguin, connexion musculaire",
  reprise: "Progressif, proprioception, douceur",
  mobilite: "Amplitude maximale, souplesse active",
};

export const ZONE_LABELS: Record<SensitiveZone, string> = {
  aucune: "Aucune",
  epaule: "Épaule",
  genou: "Genou",
  "bas-du-dos": "Bas du dos",
  hanches: "Hanches",
  poignets: "Poignets",
  coudes: "Coudes",
  chevilles: "Chevilles",
};

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  aucun: "Poids du corps",
  elastique: "Élastique",
  haltere: "Haltère",
  poulie: "Poulie / câble",
  barre: "Barre",
};

export const DURATION_OPTIONS: { value: 3 | 5 | 8; label: string }[] = [
  { value: 3, label: "3 min" },
  { value: 5, label: "5 min" },
  { value: 8, label: "8 min" },
];

type ExerciseMetadata = Pick<
  Exercise,
  "setting" | "prepRoles" | "prepFocus" | "prepIntensity" | "trainingValue" | "painSupport" | "prepMuscles"
>;

const EXERCISE_METADATA: Record<string, ExerciseMetadata> = {
  "art-cervicales": {
    setting: "both",
    prepRoles: ["mobility"],
    prepIntensity: "soft",
    trainingValue: 1,
  },
  "art-epaules-cercles": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["scapula"],
    prepIntensity: "soft",
    trainingValue: 2,
  },
  "art-poignets": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["wrist-forearm"],
    prepIntensity: "soft",
    trainingValue: 1, // zone sensible only — coude-poignet covered by art-coudes in general case
    painSupport: ["poignets", "coudes"],
  },
  "art-coudes": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["elbow-tendon", "wrist-forearm"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["coudes"],
  },
  "art-ouverture-pecs": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["thoracic", "scapula"],
    prepIntensity: "soft",
    trainingValue: 2,
  },
  "art-mobilisation-thoracique": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["thoracic"],
    prepIntensity: "soft",
    trainingValue: 3,
  },
  "art-chat-vache": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["thoracic", "lumbar", "core"],
    prepIntensity: "soft",
    trainingValue: 3,
    painSupport: ["bas-du-dos"],
  },
  "art-hanches-cercles": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["hip"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["hanches"],
  },
  "art-cheville-genou-mur": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["ankle", "knee-control"],
    prepIntensity: "soft",
    trainingValue: 5,
    painSupport: ["chevilles", "genou"],
  },
  "art-squat-profond-rebond": {
    setting: "both",
    prepRoles: ["mobility", "activation", "stability"],
    prepFocus: ["hip", "knee-control", "ankle", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["genou", "hanches"],
  },
  "art-genoux-cercles": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["knee-control"],
    prepIntensity: "soft",
    trainingValue: 1,
    painSupport: ["genou"],
  },
  "art-chevilles": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["ankle"],
    prepIntensity: "soft",
    trainingValue: 1,
    painSupport: ["chevilles"],
  },
  "art-tronc-lateral": {
    setting: "both",
    prepRoles: ["mobility"],
    prepFocus: ["lumbar", "core"],
    prepIntensity: "soft",
    trainingValue: 2,
  },
  "art-lombaires-essuie-glace": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["lumbar", "core", "hip"],
    prepIntensity: "soft",
    trainingValue: 5,
    painSupport: ["bas-du-dos", "hanches"],
  },
  "act-pecs-pompes-reprise": {
    setting: "home",
    prepRoles: ["activation"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-pecs-iso": {
    setting: "both",
    prepRoles: ["activation", "stability"],
    prepFocus: ["scapula"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-dos-rowing-haltere": {
    setting: "gym",
    prepRoles: ["activation", "posterior-chain"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-dos-face-pull-elastique": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["scapula", "rotator-cuff"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["epaule"],
  },
  "act-dos-superman": {
    setting: "home",
    prepRoles: ["activation", "posterior-chain"],
    prepFocus: ["lumbar", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 1,
  },
  "act-epaules-rotation-coiffe": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["rotator-cuff", "scapula"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["epaule"],
  },
  "act-epaules-y-raise": {
    setting: "both",
    prepRoles: ["activation", "stability"],
    prepFocus: ["scapula", "rotator-cuff"],
    prepIntensity: "soft",
    trainingValue: 3,
  },
  "act-jambes-leg-curl-leger": {
    setting: "gym",
    prepRoles: ["activation"],
    prepIntensity: "moderate",
    trainingValue: 1,
    painSupport: ["genou"],
  },
  "act-jambes-squat-corps": {
    setting: "both",
    prepRoles: ["activation"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-jambes-fentes": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["hip", "knee-control"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-jambes-mkg-haut": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["hip", "core"],
    prepIntensity: "neural",
    trainingValue: 2,
  },
  "act-fessiers-abduction-elastique": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["hip", "glutes", "knee-control"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["hanches", "genou", "bas-du-dos"],
  },
  "act-fessiers-pont": {
    setting: "both",
    prepRoles: ["activation", "posterior-chain", "therapeutic"],
    prepFocus: ["glutes", "lumbar", "core"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["bas-du-dos"],
  },
  "act-fessiers-kickback-elastique": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["glutes", "hip"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-bras-pushdown-elastique": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["elbow-tendon"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["coudes"],
    prepMuscles: ["bras"],
  },
  "act-bras-pompes-mur": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["elbow-tendon", "scapula"],
    prepIntensity: "moderate",
    trainingValue: 4,
    prepMuscles: ["bras"],
  },
  "act-bras-curl-elastique": {
    setting: "both",
    prepRoles: ["activation"],
    prepFocus: ["elbow-tendon", "wrist-forearm"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["coudes"],
    prepMuscles: ["bras"],
  },
  "act-core-dead-bug": {
    setting: "both",
    prepRoles: ["activation", "core-bracing", "therapeutic"],
    prepFocus: ["core", "lumbar"],
    prepIntensity: "moderate",
    trainingValue: 3,
    painSupport: ["bas-du-dos"],
  },
  "act-core-planche": {
    setting: "both",
    prepRoles: ["activation", "core-bracing"],
    prepFocus: ["core"],
    prepIntensity: "moderate",
    trainingValue: 3,
  },
  "act-core-bird-dog": {
    setting: "both",
    prepRoles: ["activation", "core-bracing", "therapeutic"],
    prepFocus: ["core", "lumbar", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["bas-du-dos"],
  },
  "cib-epaule-retraction-scapulaire": {
    setting: "both",
    prepRoles: ["stability", "therapeutic"],
    prepFocus: ["scapula"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["epaule"],
  },
  "cib-epaule-capsule-posterieure": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["rotator-cuff"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["epaule"],
  },
  "cib-epaule-yt-sol": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["scapula", "rotator-cuff"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["epaule"],
  },
  "cib-genou-tke": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["knee-control"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["genou"],
  },
  "cib-genou-slr": {
    setting: "home",
    prepRoles: ["activation", "therapeutic"],
    prepFocus: ["knee-control"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["genou"],
  },
  "cib-genou-step-up": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["knee-control", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["genou"],
  },
  "cib-lombaires-genoux-poitrine": {
    setting: "home",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["lumbar"],
    prepIntensity: "soft",
    trainingValue: 1,
    painSupport: ["bas-du-dos"],
  },
  "cib-lombaires-hip-thrust-pdc": {
    setting: "both",
    prepRoles: ["activation", "posterior-chain", "therapeutic"],
    prepFocus: ["glutes", "lumbar"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["bas-du-dos"],
  },
  "cib-lombaires-extension-banc": {
    setting: "gym",
    prepRoles: ["activation", "posterior-chain", "therapeutic"],
    prepFocus: ["lumbar", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 5,
    painSupport: ["bas-du-dos"],
  },
  "cib-hanches-fire-hydrant": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["hip", "glutes"],
    prepIntensity: "moderate",
    trainingValue: 4,
    painSupport: ["hanches"],
  },
  "cib-hanches-essuie-glace": {
    setting: "home",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["hip"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["hanches"],
  },
  "cib-hanches-fente-rotation": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["hip", "thoracic"],
    prepIntensity: "moderate",
    trainingValue: 3,
    painSupport: ["hanches"],
  },
  "cib-poignets-etire-extenseurs": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["wrist-forearm"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["poignets"],
  },
  "cib-poignets-etire-flechisseurs": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["wrist-forearm"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["poignets"],
  },
  "cib-poignets-activation-progressive": {
    setting: "both",
    prepRoles: ["activation", "therapeutic"],
    prepFocus: ["wrist-forearm"],
    prepIntensity: "moderate",
    trainingValue: 3,
    painSupport: ["poignets"],
  },
  "cib-coudes-etire-triceps": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["elbow-tendon"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["coudes"],
  },
  "cib-coudes-pronation-supination": {
    setting: "both",
    prepRoles: ["mobility", "activation", "therapeutic"],
    prepFocus: ["elbow-tendon", "wrist-forearm"],
    prepIntensity: "soft",
    trainingValue: 3,
    painSupport: ["coudes"],
  },
  "cib-chevilles-montees-pointe": {
    setting: "both",
    prepRoles: ["activation", "stability", "therapeutic"],
    prepFocus: ["ankle"],
    prepIntensity: "moderate",
    trainingValue: 3,
    painSupport: ["chevilles"],
  },
  "cib-chevilles-etire-mollet": {
    setting: "both",
    prepRoles: ["mobility", "therapeutic"],
    prepFocus: ["ankle"],
    prepIntensity: "soft",
    trainingValue: 2,
    painSupport: ["chevilles"],
  },
};

function inferDefaultMetadata(exercise: Exercise): ExerciseMetadata {
  const setting: TrainingSetting =
    exercise.equipment === "aucun" ? "both" : exercise.equipment === "barre" ? "gym" : "both";

  const prepRoles: PrepRole[] =
    exercise.category === "articulaire"
      ? ["mobility"]
      : exercise.category === "ciblé"
      ? ["therapeutic"]
      : ["activation"];

  return {
    setting,
    prepRoles,
    prepIntensity: exercise.category === "articulaire" ? "soft" : "moderate",
    trainingValue: exercise.category === "ciblé" ? 3 : 2,
    painSupport: exercise.therapeutic ? [exercise.therapeutic] : [],
  };
}

export const ALL_MUSCLES: MuscleGroup[] = [
  "pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core",
];

export const ALL_OBJECTIVES: Objective[] = [
  "force", "hypertrophie", "reprise", "mobilite",
];

export const ALL_ZONES: SensitiveZone[] = [
  "aucune", "epaule", "genou", "bas-du-dos", "hanches", "poignets", "coudes", "chevilles",
];

const rawExercises: Exercise[] = [

  // ══════════════════════════════════════════════════════════════
  // ARTICULAIRE — mobilisation des articulations concernées
  // ══════════════════════════════════════════════════════════════

  {
    id: "art-cervicales",
    name: "Rotations cervicales",
    category: "articulaire",
    muscles: ["dos", "epaules"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["rachis-cervical"],
    description: "Tournez lentement la tête de gauche à droite en amplitude maximale, puis faites de petits cercles doux dans les deux sens.",
    reps: "5 de chaque côté",
  },
  {
    id: "art-epaules-cercles",
    name: "Grands cercles d'épaules",
    category: "articulaire",
    muscles: ["epaules", "pecs", "dos"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["epaule"],
    description: "Bras le long du corps, décrivez de grands cercles avec les deux épaules simultanément, vers l'avant puis vers l'arrière.",
    reps: "8 vers l'avant, 8 vers l'arrière",
  },
  {
    id: "art-poignets",
    name: "Rotations de poignets",
    category: "articulaire",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 20,
    equipment: "aucun",
    joints: ["coude-poignet"],
    description: "Entrelacez les doigts et décrivez de grands cercles avec les poignets dans les deux sens.",
    reps: "10 rotations",
    therapeutic: "poignets",
  },
  {
    id: "art-coudes",
    name: "Flexions-extensions de coudes",
    category: "articulaire",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 20,
    equipment: "aucun",
    joints: ["coude-poignet"],
    description: "Bras tendus devant vous, fléchissez et étendez les coudes lentement en supination puis en pronation.",
    reps: "10 reps",
  },
  {
    id: "art-ouverture-pecs",
    name: "Ouvertures d'épaules",
    category: "articulaire",
    muscles: ["pecs", "epaules"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["epaule"],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["epaule", "rachis-thoracique"],
    description: "Bras écartés à hauteur d'épaules, ramenez-les devant vous en croisant, puis ouvrez en grand en pinçant les omoplates.",
    reps: "10 reps",
  },
  {
    id: "art-mobilisation-thoracique",
    name: "Rotations du buste debout",
    category: "articulaire",
    muscles: ["dos", "pecs"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["bas-du-dos"],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["rachis-thoracique"],
    description: "Debout, mains derrière la tête, coudes ouverts. Tournez le haut du buste à droite puis à gauche en gardant le bassin fixe. Le mouvement vient du haut du dos, pas des lombaires.",
    reps: "8 de chaque côté",
  },
  {
    id: "art-chat-vache",
    name: "Dos rond / dos creux",
    category: "articulaire",
    muscles: ["dos", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["rachis-thoracique", "rachis-lombaire"],
    description: "À quatre pattes, alternez dos creux puis dos rond. Cherchez une amplitude douce et contrôlée, sans forcer en fin de mouvement.",
    reps: "8 cycles",
    therapeutic: "bas-du-dos",
  },
  {
    id: "art-hanches-cercles",
    name: "Cercles de hanches",
    category: "articulaire",
    muscles: ["fessiers", "jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["hanche"],
    description: "Debout, mains sur les hanches, pieds à largeur d'épaules. Décrivez de grands cercles avec le bassin dans un sens puis dans l'autre. Genoux légèrement fléchis.",
    reps: "8 dans chaque sens",
    therapeutic: "hanches",
  },
  {
    id: "art-cheville-genou-mur",
    name: "Mobilité cheville genou au mur",
    category: "articulaire",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["cheville", "genou"],
    description: "Position fente courte, pied avant à plat. Avancez le genou au-dessus des orteils sans décoller le talon, puis revenez. Cherchez l'amplitude utile pour squatter, pas une rotation molle de cheville.",
    reps: "8-10 de chaque côté",
  },
  {
    id: "art-squat-profond-rebond",
    name: "Squat profond contrôlé",
    category: "articulaire",
    muscles: ["jambes", "fessiers", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["hanche", "genou", "cheville"],
    description: "Descendez en squat au poids du corps, restez bas 2 secondes, faites deux petits rebonds contrôlés puis remontez. Gardez les talons au sol et les genoux dans l'axe des pieds.",
    reps: "6-8 reps",
  },
  {
    id: "art-genoux-cercles",
    name: "Rotations de genoux",
    category: "articulaire",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 25,
    equipment: "aucun",
    joints: ["genou"],
    description: "Pieds joints, légèrement fléchis, mains sur les genoux. Décrivez des cercles avec les genoux joints dans les deux sens.",
    reps: "10 rotations",
  },
  {
    id: "art-chevilles",
    name: "Rotations de chevilles",
    category: "articulaire",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 25,
    equipment: "aucun",
    joints: ["cheville"],
    description: "Appuyé si besoin, soulevez un pied et décrivez de grands cercles avec la cheville. Alternez.",
    reps: "10 de chaque côté",
  },
  {
    id: "art-tronc-lateral",
    name: "Inclinaisons latérales du tronc",
    category: "articulaire",
    muscles: ["dos", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["rachis-thoracique", "rachis-lombaire"],
    description: "Debout, pieds à largeur d'épaules. Glissez une main le long de la cuisse vers le genou en inclinant le buste latéralement. Revenez au centre et alternez. Gardez le bassin fixe.",
    reps: "8 de chaque côté",
  },
  {
    id: "art-lombaires-essuie-glace",
    name: "Essuie-glaces lombaires",
    category: "articulaire",
    muscles: ["dos", "core", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["rachis-lombaire", "hanche"],
    therapeutic: "bas-du-dos",
    description: "Allongé sur le dos, genoux fléchis, pieds proches des fessiers et bras ouverts au sol. Laissez tomber les genoux doucement à droite puis à gauche pour délier le bas de la colonne sans forcer.",
    reps: "8 de chaque côté",
  },

  // ══════════════════════════════════════════════════════════════
  // ACTIVATION — stabilisateurs + muscles concernés
  // ══════════════════════════════════════════════════════════════

  // PECS
  {
    id: "act-pecs-pompes-reprise",
    name: "Pompes lentes",
    category: "activation",
    muscles: ["pecs", "bras", "epaules"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["poignets", "epaule"],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Position planche, corps aligné. Descente sur 3 secondes, remontée normale. Activer, pas fatiguer.",
    reps: "8-10 reps",
  },
  {
    id: "act-pecs-iso",
    name: "Pompes scapulaires",
    category: "activation",
    muscles: ["pecs", "epaules"],
    objectives: ["force", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Position de pompe bras tendus. Sans plier les coudes, laissez les omoplates se rapprocher puis repoussez le sol pour les écarter. Excellent avant les mouvements de poussée.",
    reps: "10-12 reps",
  },

  // DOS
  {
    id: "act-dos-rowing-haltere",
    name: "Rowing haltère léger",
    category: "activation",
    muscles: ["dos", "bras"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["bas-du-dos", "poignets"],
    durationSeconds: 40,
    equipment: "haltere",
    description: "Appuyé sur un banc, haltère léger. Tirez le coude vers le plafond en serrant les omoplates. Descente lente sur 3 secondes.",
    reps: "10 de chaque côté",
    fallback: "Y-T au sol : allongé face au sol, levez légèrement les bras en Y puis en T en serrant les omoplates.",
  },
  {
    id: "act-dos-face-pull-elastique",
    name: "Face pull élastique",
    category: "activation",
    muscles: ["dos", "epaules"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "elastique",
    description: "Élastique fixé à hauteur du visage. Tirez vers le visage en écartant les mains, coudes qui sortent en haut et sur les côtés. Serrez les omoplates à chaque répétition.",
    reps: "15 reps",
    fallback: "Serrage des omoplates debout — coudes en arrière, contraction max 2s sans résistance",
    therapeutic: "epaule",
    movementKey: "face-pull",
  },
  {
    id: "act-dos-superman",
    name: "Superman au sol",
    category: "activation",
    muscles: ["dos", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Allongé face au sol, bras tendus devant vous. Soulevez simultanément bras et jambes en contractant les érecteurs et les fessiers. Tenez 2 secondes en haut.",
    reps: "10 reps",
  },

  // ÉPAULES
  {
    id: "act-epaules-rotation-coiffe",
    name: "Rotation externe coiffe des rotateurs",
    category: "activation",
    muscles: ["epaules"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "elastique",
    description: "Coude à 90° collé au flanc, élastique fixé sur le côté. Ouvrez en rotation externe puis revenez lentement. Fondamental avant toute séance de poussée.",
    reps: "15 de chaque côté",
    fallback: "Même rotation sans résistance, coude collé au flanc",
    therapeutic: "epaule",
    prepMuscles: ["epaules", "pecs"],
  },
  {
    id: "act-epaules-y-raise",
    name: "Y-raise",
    category: "activation",
    muscles: ["epaules"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: ["epaule"],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Bras le long du corps, montez les deux bras en diagonale pour former un Y, pouces vers le haut. Pause 2 secondes en haut, redescendez lentement. Avec ou sans petit poids — le mouvement seul suffit en échauffement.",
    reps: "10 reps",
  },

  // JAMBES
  {
    id: "act-jambes-squat-corps",
    name: "Squats au poids du corps",
    category: "activation",
    muscles: ["jambes", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["genou"],
    durationSeconds: 40,
    equipment: "aucun",
    description: "Pieds à largeur d'épaules, orteils légèrement ouverts. Descendez lentement (3s), cuisses parallèles minimum, talons au sol.",
    reps: "12 reps",
  },
  {
    id: "act-jambes-fentes",
    name: "Fentes avant alternées",
    category: "activation",
    muscles: ["jambes", "fessiers"],
    objectives: ["force", "hypertrophie", "mobilite"],
    contraindications: ["genou", "hanches"],
    durationSeconds: 40,
    equipment: "aucun",
    description: "Grand pas en avant, fléchissez les deux genoux à 90°. Genou avant dans l'axe du pied, alternez.",
    reps: "8 de chaque côté",
  },
  {
    id: "act-jambes-leg-curl-leger",
    name: "Leg curl léger",
    category: "activation",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Machine leg curl, charge légère (30-40 % du 1RM). Fléchissez lentement, revenez sur 3 secondes. Active les ischios-jambiers sans les fatiguer avant squats et presses.",
    reps: "15 reps",
  },
  {
    id: "act-jambes-mkg-haut",
    name: "Montées de genoux hautes",
    category: "activation",
    muscles: ["jambes", "core"],
    objectives: ["force", "hypertrophie", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Sur place, montez les genoux alternativement au-dessus de la hanche, bras qui balancent. Cadence rapide mais propre. Active les fléchisseurs de hanche et réveille le système nerveux.",
    reps: "20 secondes",
  },

  // FESSIERS
  {
    id: "act-fessiers-pont",
    name: "Pont fessier",
    category: "activation",
    muscles: ["fessiers", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Allongé sur le dos, pieds à plat, genoux fléchis. Poussez le bassin vers le plafond en serrant les fessiers. Tenez 2 secondes en haut.",
    reps: "12 reps",
    therapeutic: "bas-du-dos",
  },
  {
    id: "act-fessiers-kickback-elastique",
    name: "Kickback fessier avec élastique",
    category: "activation",
    muscles: ["fessiers"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "elastique",
    description: "Élastique à la cheville, debout face à un mur ou à quatre pattes. Tendez la jambe vers l'arrière en contractant le fessier. Revenez lentement. Isole efficacement le grand fessier.",
    reps: "12-15 de chaque côté",
  },

  // BRAS
  {
    id: "act-bras-pompes-mur",
    name: "Pompes triceps contre mur",
    category: "activation",
    muscles: ["bras", "pecs", "epaules"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Debout face au mur, mains à hauteur d'épaules, coudes collés aux flancs (pas en V). Fléchissez les coudes jusqu'à ce que le front touche presque le mur, poussez en extension complète. Isole le triceps sans aucune friction.",
    reps: "12-15 reps",
    prepMuscles: ["bras"],
  },
  {
    id: "act-bras-pushdown-elastique",
    name: "Pushdown triceps élastique",
    category: "activation",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "elastique",
    description: "Élastique fixé à hauteur de tête (rack, barre, poignée de porte). Coudes collés aux flancs, poussez vers le bas jusqu'à extension complète, revenez lentement. Même bande qu'en face pull — pas besoin de se déplacer.",
    reps: "15 reps",
    prepMuscles: ["bras"],
  },
  {
    id: "act-bras-curl-elastique",
    name: "Curl biceps élastique",
    category: "activation",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "elastique",
    description: "Élastique sous le pied (debout), prise en supination. Fléchissez lentement jusqu'au menton, descente contrôlée sur 3 secondes. Même bande qu'en face pull — zero déplacement.",
    reps: "12-15 reps",
    prepMuscles: ["bras"],
  },

  // CORE
  {
    id: "act-core-dead-bug",
    name: "Dead Bug",
    category: "activation",
    muscles: ["core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["bas-du-dos"],
    durationSeconds: 40,
    equipment: "aucun",
    description: "Allongé sur le dos, bras vers le plafond, hanches et genoux à 90°. Bas du dos collé au sol. Abaissez bras droit et jambe gauche simultanément. Alternez.",
    reps: "6 de chaque côté",
    therapeutic: "bas-du-dos",
  },
  {
    id: "act-core-planche",
    name: "Planche sur coudes",
    category: "activation",
    muscles: ["core"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["bas-du-dos"],
    durationSeconds: 30,
    equipment: "aucun",
    description: "Appui sur les coudes et les orteils, corps aligné. Contractez le ventre, fessiers et cuisses. Ne laissez pas les hanches s'affaisser.",
    reps: "25-30 secondes",
  },
  {
    id: "act-core-bird-dog",
    name: "Extension quadrupédie alternée",
    category: "activation",
    muscles: ["core", "dos", "fessiers"],
    objectives: ["force", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 40,
    equipment: "aucun",
    description: "À quatre pattes, dos plat. Étendez bras droit et jambe gauche en ligne droite, tenez 2 secondes. Revenez sans poser et alternez.",
    reps: "8 de chaque côté",
    therapeutic: "bas-du-dos",
  },

  // ══════════════════════════════════════════════════════════════
  // CIBLÉ — exercices spécifiques selon zone sensible
  // Sélectionnés par l'algorithme uniquement si la zone est cochée
  // ══════════════════════════════════════════════════════════════

  // ÉPAULE
  {
    id: "cib-epaule-retraction-scapulaire",
    name: "Rétraction scapulaire",
    category: "ciblé",
    muscles: ["dos", "epaules"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "elastique",
    therapeutic: "epaule",
    description: "Élastique en mains, bras légèrement fléchis. Serrez les omoplates l'une vers l'autre et vers le bas, tenez 3 secondes. Active les stabilisateurs profonds de l'épaule — essentiel avant toute séance de poussée ou traction si vous avez des tensions à l'épaule.",
    reps: "12 reps",
    fallback: "Même mouvement mains libres : coudes en arrière, serrez les omoplates vers le bas 3 secondes.",
  },
  {
    id: "cib-epaule-capsule-posterieure",
    name: "Étirement de la capsule postérieure",
    category: "ciblé",
    muscles: ["epaules"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "epaule",
    description: "Bras tendu, ramenez-le horizontalement devant vous vers l'épaule opposée. L'autre main tire le coude doucement vers vous. Sentez l'étirement à l'arrière de l'épaule — cette zone se raidit souvent et provoque des douleurs en amplitude haute.",
    reps: "25 secondes par côté",
  },
  {
    id: "cib-epaule-yt-sol",
    name: "Y-T au sol ou debout",
    category: "ciblé",
    muscles: ["epaules", "dos"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "epaule",
    description: "Au sol ou debout penché légèrement en avant. Formez un Y avec les bras puis un T, montez peu mais serrez fort les omoplates. Utile pour réveiller coiffe, trapèzes bas et arrière d'épaule.",
    reps: "10 Y + 10 T",
  },

  // GENOU
  {
    id: "cib-genou-tke",
    name: "Extension terminale du genou",
    category: "ciblé",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "elastique",
    therapeutic: "genou",
    description: "Élastique derrière le genou, debout légèrement fléchi. Tendez le genou jusqu'au verrouillage doux en contractant le quadriceps. Très utile pour stabiliser la rotule avant squat, presse ou fentes.",
    reps: "15 de chaque côté",
    fallback: "Contraction isométrique quadriceps assis — serrez le quadriceps, jambe tendue, tenez 3s",
  },
  {
    id: "cib-genou-slr",
    name: "Relevé de jambe tendue (SLR)",
    category: "ciblé",
    muscles: ["jambes"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "genou",
    description: "Allongé sur le dos, une jambe fléchie, l'autre tendue. Contractez le quadriceps de la jambe tendue et soulevez-la à 45°. Tenez 2 secondes. Active le quadriceps sans aucune compression articulaire sur le genou.",
    reps: "12 de chaque côté",
  },
  {
    id: "cib-genou-step-up",
    name: "Step-up contrôlé",
    category: "ciblé",
    muscles: ["jambes", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "genou",
    description: "Montez sur une marche ou un step bas, genou dans l'axe du pied — ni en dedans, ni en dehors. Montée lente, contrôlée. C'est cet alignement qui est l'enjeu, pas l'effort.",
    reps: "10 de chaque côté",
  },

  // BAS DU DOS
  {
    id: "cib-lombaires-genoux-poitrine",
    name: "Genoux sur poitrine",
    category: "ciblé",
    muscles: ["core", "dos"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "bas-du-dos",
    description: "Allongé sur le dos, ramenez les deux genoux sur la poitrine et serrez-les avec les bras. Bercement doux si nécessaire. Décompression immédiate des vertèbres lombaires — à faire en premier avant tout exercice si douleur le matin.",
    reps: "30 secondes",
  },
  {
    id: "cib-lombaires-hip-thrust-pdc",
    name: "Pont au sol une jambe",
    category: "ciblé",
    muscles: ["fessiers", "dos"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: ["hanches"],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "bas-du-dos",
    description: "Allongé sur le dos, épaules au sol, un pied planté et l'autre jambe tendue. Poussez le bassin vers le haut en contractant fort le fessier. Réactive la chaîne postérieure sans banc ni charge.",
    reps: "10 de chaque côté",
  },
  {
    id: "cib-lombaires-extension-banc",
    name: "Extensions lombaires sur banc",
    category: "ciblé",
    muscles: ["dos", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "bas-du-dos",
    description: "Banc à lombaires, poids du corps uniquement. Montez jusqu'à l'alignement dos-hanches, sans hyperextension ni charge ajoutée. Chauffe progressive des érecteurs avant de charger le bas du dos.",
    reps: "12-15 reps lentes",
    fallback: "Hip thrust au sol une jambe : un pied planté, l'autre jambe tendue, montez le bassin en contractant fessier et bas du dos.",
  },

  // HANCHES
  {
    id: "cib-hanches-fire-hydrant",
    name: "Ouverture de hanche à quatre pattes",
    category: "ciblé",
    muscles: ["fessiers", "jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "hanches",
    description: "À quatre pattes, genoux à 90°. Ouvrez un genou sur le côté en gardant le bassin immobile, puis redescendez lentement. Bon réveil de hanche et fessier moyen avant squat, presse ou fentes.",
    reps: "12 de chaque côté",
  },
  {
    id: "cib-hanches-essuie-glace",
    name: "Essuie-glaces hanches (allongé)",
    category: "ciblé",
    muscles: ["fessiers", "jambes"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "hanches",
    description: "Assis au sol, genoux fléchis, pieds à largeur d'épaules. Faites basculer les deux genoux ensemble vers la droite puis vers la gauche. Travaille les rotations internes et externes de hanche en décharge.",
    reps: "8 de chaque côté",
  },
  {
    id: "cib-hanches-fente-rotation",
    name: "Fente basse avec ouverture du buste",
    category: "ciblé",
    muscles: ["jambes", "fessiers", "core"],
    objectives: ["force", "mobilite"],
    contraindications: ["genou"],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "hanches",
    description: "En fente basse, genou arrière au sol. Posez une main près du pied avant et ouvrez l'autre bras vers le plafond en tournant le buste. Ouvre hanche et haut du dos en même temps.",
    reps: "8 de chaque côté",
  },

  // POIGNETS
  {
    id: "cib-poignets-etire-extenseurs",
    name: "Étirement des extenseurs du poignet",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "Bras tendu devant vous, paume vers le sol. De l'autre main, abaissez doucement les doigts vers le sol pour étirer les extenseurs de l'avant-bras. Essentiel si douleur en appui (pompes, développé).",
    reps: "20 secondes par côté",
  },
  {
    id: "cib-poignets-etire-flechisseurs",
    name: "Étirement des fléchisseurs du poignet",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "Bras tendu, paume vers le plafond. Tirez doucement les doigts vers vous avec l'autre main pour étirer les fléchisseurs. Complémentaire de l'étirement extenseurs — faites les deux.",
    reps: "20 secondes par côté",
  },
  {
    id: "cib-poignets-activation-progressive",
    name: "Mise en charge progressive des poignets",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "En appui sur les mains à quatre pattes, transférez doucement le poids vers l'avant et sur les côtés. Augmentez l'angle à votre tolérance. Prépare les poignets au travail en appui.",
    reps: "30 secondes",
  },

  // COUDES
  {
    id: "cib-coudes-etire-triceps",
    name: "Étirement du triceps brachial",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "coudes",
    description: "Levez un bras et fléchissez le coude pour amener la main dans le dos. De l'autre main, poussez doucement le coude vers l'arrière de la tête. Étire le triceps et décompresse la capsule postérieure du coude.",
    reps: "20 secondes par côté",
  },
  {
    id: "cib-coudes-pronation-supination",
    name: "Pronation-supination de l'avant-bras",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "coudes",
    description: "Coude fléchi à 90°, collé au flanc. Tournez lentement la paume vers le haut (supination) puis vers le bas (pronation). Mobilise l'articulation radio-ulnaire et prépare les tendons du coude.",
    reps: "10 dans chaque sens",
  },

  // CHEVILLES
  {
    id: "cib-chevilles-montees-pointe",
    name: "Montées sur la pointe des pieds",
    category: "ciblé",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "chevilles",
    description: "Debout, pieds parallèles. Montez lentement sur la pointe des pieds, tenez 2 secondes, redescendez sous contrôle. Renforce les muscles de la cheville et améliore la proprioception avant tout travail de jambes.",
    reps: "15 reps",
  },
  {
    id: "cib-chevilles-etire-mollet",
    name: "Étirement du mollet au mur",
    category: "ciblé",
    muscles: ["jambes"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "chevilles",
    description: "Mains au mur, pied arrière tendu, talon au sol. Avancez le bassin vers le mur pour étirer le mollet. Fléchissez légèrement le genou arrière pour cibler le soléaire. Changez de jambe.",
    reps: "20 secondes par côté",
  },
];

export const exercises: Exercise[] = [];

exercises.push(
  ...rawExercises.map((exercise) => {
    const defaults = inferDefaultMetadata(exercise);
    const enriched = EXERCISE_METADATA[exercise.id];

    return {
      ...exercise,
      ...defaults,
      ...enriched,
      painSupport: enriched?.painSupport ?? defaults.painSupport,
    };
  })
);
