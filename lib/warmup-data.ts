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
  pecs:     ["rachis-thoracique", "epaule", "coude-poignet"],
  dos:      ["rachis-thoracique", "rachis-lombaire", "epaule"],
  epaules:  ["rachis-cervical", "epaule"],
  jambes:   ["hanche", "genou", "cheville"],
  fessiers: ["hanche", "rachis-lombaire"],
  bras:     ["coude-poignet", "epaule"],
  core:     ["rachis-thoracique", "rachis-lombaire"],
};

export type BodyZone = Exclude<SensitiveZone, "aucune">;

export type Equipment = "aucun" | "elastique" | "haltere" | "poulie" | "barre";

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

export const ALL_MUSCLES: MuscleGroup[] = [
  "pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core",
];

export const ALL_OBJECTIVES: Objective[] = [
  "force", "hypertrophie", "reprise", "mobilite",
];

export const ALL_ZONES: SensitiveZone[] = [
  "aucune", "epaule", "genou", "bas-du-dos", "hanches", "poignets", "coudes", "chevilles",
];

export const exercises: Exercise[] = [

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
    name: "Ouvertures pectorales",
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
    name: "Rotations thoraciques",
    category: "articulaire",
    muscles: ["dos", "pecs"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["bas-du-dos"],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["rachis-thoracique"],
    description: "Mains derrière la tête, coudes ouverts. Alternez rotation du buste à droite et à gauche en gardant le bassin fixe.",
    reps: "8 de chaque côté",
  },
  {
    id: "art-chat-vache",
    name: "Chat-vache (dos rond / dos creux)",
    category: "articulaire",
    muscles: ["dos", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    joints: ["rachis-thoracique", "rachis-lombaire"],
    description: "À quatre pattes, alternez dos cambré (vache : tête en haut, ventre vers le sol) et dos rond (chat : tête vers le sol, dos vers le plafond). Lent et contrôlé.",
    reps: "8 cycles",
    therapeutic: "bas-du-dos",
  },
  {
    id: "art-hanches-cercles",
    name: "Grands cercles de bassin",
    category: "articulaire",
    muscles: ["fessiers", "jambes", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["hanches"],
    durationSeconds: 30,
    equipment: "aucun",
    joints: ["hanche"],
    description: "Mains sur les hanches, pieds à largeur d'épaules. Décrivez de grands cercles horizontaux avec le bassin dans les deux sens.",
    reps: "10 dans chaque sens",
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
    muscles: ["core", "dos"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 25,
    equipment: "aucun",
    joints: ["rachis-thoracique", "rachis-lombaire"],
    description: "Debout, glissez alternativement une main vers le genou en inclinant le buste sur le côté.",
    reps: "8 de chaque côté",
  },

  // ══════════════════════════════════════════════════════════════
  // ACTIVATION — stabilisateurs + muscles concernés
  // ══════════════════════════════════════════════════════════════

  // PECS
  {
    id: "act-pecs-push-leger",
    name: "Développé haltères léger",
    category: "activation",
    muscles: ["pecs", "epaules", "bras"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["epaule", "poignets"],
    durationSeconds: 35,
    equipment: "haltere",
    description: "Haltères légers (30-40% de votre charge habituelle). Développé complet, descente lente sur 3 secondes pour activer les pectoraux.",
    reps: "10 reps",
    fallback: "Pompes lentes — 3s descente",
  },
  {
    id: "act-pecs-pompes-reprise",
    name: "Pompes lentes",
    category: "activation",
    muscles: ["pecs", "bras", "epaules"],
    objectives: ["reprise", "mobilite"],
    contraindications: ["poignets", "epaule"],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Position planche, corps aligné. Descente sur 3 secondes, remontée normale. Activer, pas fatiguer.",
    reps: "8-10 reps",
  },
  {
    id: "act-pecs-iso",
    name: "Poussée isométrique (main contre main)",
    category: "activation",
    muscles: ["pecs"],
    objectives: ["force", "reprise"],
    contraindications: [],
    durationSeconds: 25,
    equipment: "aucun",
    description: "Paumes face à face devant le sternum. Poussez l'une contre l'autre à 70% pendant 5 secondes. Sentez la contraction des pectoraux.",
    reps: "6 contractions",
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
    fallback: "Tirage isométrique assis : bras tendus, tirez fort sur un pied de banc ou poteau fixe",
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
  },
  {
    id: "act-dos-superman",
    name: "Élévations dos-jambes allongé",
    category: "activation",
    muscles: ["dos", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["bas-du-dos"],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Allongé face au sol, bras tendus devant. Soulevez simultanément les bras et les jambes, tenez 2 secondes en haut.",
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
  },
  {
    id: "act-epaules-face-pull-poulie",
    name: "Face pull à la poulie",
    category: "activation",
    muscles: ["epaules", "dos"],
    objectives: ["force", "hypertrophie"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "poulie",
    description: "Corde à hauteur du visage. Tirez vers le visage, coudes hauts et écartés. Indispensable pour activer les deltoïdes postérieurs.",
    reps: "15 reps",
    fallback: "Face pull élastique fixé à un montant",
  },
  {
    id: "act-epaules-elev-laterales",
    name: "Élévations latérales légères",
    category: "activation",
    muscles: ["epaules"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: ["epaule"],
    durationSeconds: 30,
    equipment: "haltere",
    description: "Haltères très légers (2-4 kg). Bras sur les côtés jusqu'à hauteur d'épaules. Concentration sur le deltoïde moyen.",
    reps: "15 reps lentes",
    fallback: "Élévations latérales élastique sous le pied",
  },

  // JAMBES
  {
    id: "act-jambes-leg-curl-leger",
    name: "Leg curl léger",
    category: "activation",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["genou"],
    durationSeconds: 35,
    equipment: "poulie",
    description: "Machine à curl couché ou assis, charge à 30% de l'habituel. Contraction des ischio-jambiers en fin de mouvement. Mouvement contrôlé.",
    reps: "15 reps",
    fallback: "Curl ischio debout avec élastique à la cheville",
  },
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
    id: "act-jambes-mkg-haut",
    name: "Montées de genoux dynamiques",
    category: "activation",
    muscles: ["jambes", "core"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: ["hanches"],
    durationSeconds: 35,
    equipment: "aucun",
    description: "Joggez sur place en montant les genoux à hauteur de hanche. Progressif sur les premières secondes.",
    reps: "20 reps (10 par jambe)",
  },

  // FESSIERS
  {
    id: "act-fessiers-abduction-elastique",
    name: "Abduction de hanche élastique",
    category: "activation",
    muscles: ["fessiers"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: ["hanches"],
    durationSeconds: 35,
    equipment: "elastique",
    description: "Élastique autour des genoux ou chevilles. Écartez une jambe sur le côté en contractant le fessier. Revenez lentement.",
    reps: "15 de chaque côté",
    fallback: "Abduction allongée sur le côté sans résistance",
  },
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
    name: "Kickback fessier élastique",
    category: "activation",
    muscles: ["fessiers"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["hanches", "bas-du-dos"],
    durationSeconds: 35,
    equipment: "elastique",
    description: "Élastique à la cheville, appuyé à un support. Poussez la jambe vers l'arrière en contractant le fessier, dos droit. Revenez lentement.",
    reps: "12-15 de chaque côté",
    fallback: "Extension hanche debout sans résistance — contraction maximale 2s en fin de mouvement",
  },

  // BRAS
  {
    id: "act-bras-curl-leger",
    name: "Curl biceps léger",
    category: "activation",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["poignets"],
    durationSeconds: 30,
    equipment: "haltere",
    description: "Haltère léger, coudes fixes le long du corps. Montée complète en supination, descente lente sur 3 secondes.",
    reps: "12-15 reps",
    fallback: "Curl à l'élastique sous le pied",
  },
  {
    id: "act-bras-pushdown",
    name: "Pushdown triceps à la poulie",
    category: "activation",
    muscles: ["bras"],
    objectives: ["force", "hypertrophie"],
    contraindications: ["epaule", "poignets"],
    durationSeconds: 30,
    equipment: "poulie",
    description: "Corde ou barre droite légère. Coudes fixes, étendez les bras vers le bas en serrant les triceps. Amplitude complète.",
    reps: "15 reps",
    fallback: "Extension triceps élastique fixé en hauteur",
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
    fallback: "Même mouvement sans élastique : même contraction, même résultat",
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
    name: "Y-T au sol (renforcement coiffe)",
    category: "ciblé",
    muscles: ["epaules", "dos"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "epaule",
    description: "Allongé face au sol, bras tendus. Formez un Y (bras à 45° au-dessus de la tête) puis un T (bras à 90°). Levez légèrement les bras en contractant les omoplates — pas besoin de monter haut, c'est la contraction qui compte. Renforce la coiffe et le trapèze inférieur.",
    reps: "10 Y + 10 T",
  },

  // GENOU
  {
    id: "cib-genou-tke",
    name: "Terminal Knee Extension (élastique)",
    category: "ciblé",
    muscles: ["jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "elastique",
    therapeutic: "genou",
    description: "Élastique fixé à l'arrière du genou, debout légèrement fléchi. Étendez le genou jusqu'à verrouillage complet en contractant le VMO (le muscle en larme de l'intérieur du genou). Essentiel pour stabiliser la rotule avant les squats et presses.",
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
    name: "Hip thrust poids du corps (jambe tendue)",
    category: "ciblé",
    muscles: ["fessiers", "dos"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: ["hanches"],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "bas-du-dos",
    description: "Allongé sur le dos, épaules sur un banc. Un pied au sol, l'autre jambe tendue horizontale. Poussez le bassin vers le haut en contractant fort le fessier. Réactive la chaîne postérieure (fessiers + lombaires) avant de charger le bas du dos.",
    reps: "10 de chaque côté",
  },
  {
    id: "cib-lombaires-extension-banc",
    name: "Extensions lombaires légères sur banc",
    category: "ciblé",
    muscles: ["dos", "fessiers"],
    objectives: ["force", "hypertrophie", "reprise"],
    contraindications: [],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "bas-du-dos",
    description: "Banc à lombaires, première série à demi-amplitude et poids du corps uniquement. Montée jusqu'à l'alignement dos-hanches, pas en hyperextension. Chauffe progressive des érecteurs avant de passer aux charges — indispensable si vous avez tendance aux douleurs lombaires sous charge.",
    reps: "12-15 reps lentes",
  },

  // HANCHES
  {
    id: "cib-hanches-fire-hydrant",
    name: "Rotation hanche externe (Fire Hydrant)",
    category: "ciblé",
    muscles: ["fessiers", "jambes"],
    objectives: ["force", "hypertrophie", "reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 35,
    equipment: "aucun",
    therapeutic: "hanches",
    description: "À quatre pattes, genoux à 90°. Ouvrez un genou sur le côté aussi haut que possible en gardant le bassin immobile. Descente contrôlée. Mobilise la hanche en rotation externe — souvent le maillon faible chez les sportifs qui squattent.",
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
    name: "Fente basse avec rotation du buste",
    category: "ciblé",
    muscles: ["jambes", "fessiers", "core"],
    objectives: ["force", "mobilite"],
    contraindications: ["genou"],
    durationSeconds: 40,
    equipment: "aucun",
    therapeutic: "hanches",
    description: "Position fente basse (genou arrière au sol). Tournez le buste vers le pied avant en ouvrant les bras. Sentez l'ouverture de la hanche côté genou au sol. Cette combinaison étire le fléchisseur de hanche et mobilise la rotation thoracique en même temps.",
    reps: "8 de chaque côté",
  },

  // POIGNETS
  {
    id: "cib-poignets-etire-extenseurs",
    name: "Étirement extenseurs de l'avant-bras",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "Bras tendu devant vous, paume vers le bas. Avec l'autre main, tirez doucement les doigts vers vous (vers le haut). Sentez l'étirement sur le dessus de l'avant-bras. À faire avant les exercices de tirage et tractions.",
    reps: "20 secondes par côté",
  },
  {
    id: "cib-poignets-etire-flechisseurs",
    name: "Étirement fléchisseurs de l'avant-bras",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["reprise", "mobilite"],
    contraindications: [],
    durationSeconds: 30,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "Bras tendu devant vous, paume vers le haut. Avec l'autre main, tirez doucement les doigts vers vous (vers le bas). Sentez l'étirement sous l'avant-bras. Essentiel avant les exercices de poussée et curl.",
    reps: "20 secondes par côté",
  },
  {
    id: "cib-poignets-activation-progressive",
    name: "Serrage de poing progressif",
    category: "ciblé",
    muscles: ["bras"],
    objectives: ["force", "reprise"],
    contraindications: [],
    durationSeconds: 25,
    equipment: "aucun",
    therapeutic: "poignets",
    description: "Contractez le poing progressivement sur 3 secondes jusqu'à la pleine force, tenez 2 secondes, relâchez lentement. Active les tendons et structures du poignet graduellement avant la charge.",
    reps: "8 répétitions",
  },
];
