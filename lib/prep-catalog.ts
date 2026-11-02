// Connaissance de coach qui guide le moteur d'échauffement (lib/session-engine.ts).
//
// Une zone travaillée n'appelle pas « des exercices » mais des besoins : un
// développé demande un haut du dos mobile, une épaule ouverte, une coiffe et un
// dentelé réveillés, puis de répéter le geste à vide. Plusieurs zones partagent
// des besoins (le haut du dos sert aux pecs comme aux épaules) : on ne les
// couvre qu'une fois. Chaque besoin a sa liste d'exercices, du plus pertinent au
// moins pertinent, et une raison écrite pour la personne qui s'échauffe.
//
// Ce sont des choix de conception, appuyés sur le protocole RAMP (Jeffreys) et
// les pratiques courantes de préparation physique ; ils ne remplacent pas l'avis
// d'un coach qui connaît la personne. Voir /methodologie.

import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

export type Position = "debout" | "appui" | "quadrupedie" | "sol" | "barre";

/** Position de départ de chaque exercice : sert à limiter les allers-retours au sol. */
export const POSITION: Record<string, Position> = {
  "art-cervicales": "debout",
  "art-epaules-cercles": "debout",
  "art-poignets": "debout",
  "art-coudes": "debout",
  "art-ouverture-pecs": "debout",
  "art-mobilisation-thoracique": "debout",
  "art-chat-vache": "quadrupedie",
  "art-hanches-cercles": "debout",
  "art-cheville-genou-mur": "debout",
  "art-squat-profond-rebond": "debout",
  "art-genoux-cercles": "debout",
  "art-chevilles": "debout",
  "art-tronc-lateral": "debout",
  "art-lombaires-essuie-glace": "sol",
  "act-pecs-pompes-reprise": "appui",
  "act-pecs-iso": "appui",
  "act-dos-rowing-haltere": "debout",
  "act-dos-face-pull-elastique": "debout",
  "act-dos-superman": "sol",
  "act-epaules-rotation-coiffe": "debout",
  "act-epaules-y-raise": "debout",
  "act-jambes-squat-corps": "debout",
  "act-jambes-fentes": "debout",
  "act-jambes-leg-curl-leger": "sol",
  "act-jambes-mkg-haut": "debout",
  "act-fessiers-pont": "sol",
  "act-fessiers-kickback-elastique": "quadrupedie",
  "act-bras-pompes-mur": "debout",
  "act-bras-pushdown-elastique": "debout",
  "act-bras-curl-elastique": "debout",
  "act-core-dead-bug": "sol",
  "act-core-planche": "appui",
  "act-core-bird-dog": "quadrupedie",
  "cib-epaule-retraction-scapulaire": "debout",
  "cib-epaule-capsule-posterieure": "debout",
  "cib-epaule-yt-sol": "debout",
  "cib-genou-tke": "debout",
  "cib-genou-slr": "sol",
  "cib-genou-step-up": "debout",
  "cib-lombaires-genoux-poitrine": "sol",
  "cib-lombaires-hip-thrust-pdc": "sol",
  "cib-lombaires-extension-banc": "sol",
  "cib-hanches-fire-hydrant": "quadrupedie",
  "cib-hanches-essuie-glace": "sol",
  "cib-hanches-fente-rotation": "appui",
  "cib-poignets-etire-extenseurs": "debout",
  "cib-poignets-etire-flechisseurs": "debout",
  "cib-poignets-activation-progressive": "quadrupedie",
  "cib-coudes-etire-triceps": "debout",
  "cib-coudes-pronation-supination": "debout",
  "cib-chevilles-montees-pointe": "debout",
  "cib-chevilles-etire-mollet": "debout",
  "prep-charniere-hanche": "debout",
  "prep-inchworm": "debout",
  "prep-glisses-mur": "debout",
  "prep-extension-thoracique-banc": "sol",
  "prep-tractions-scapulaires": "barre",
  "prep-pull-apart": "debout",
  "prep-90-90": "sol",
  "prep-cossack": "debout",
  "prep-thread-needle": "quadrupedie",
  "prep-open-book": "sol",
  "prep-dislocations": "debout",
  "prep-hamstring-sweep": "debout",
  "prep-frog": "quadrupedie",
  "prep-spiderman": "appui",
  "prep-epaules-cars": "debout",
  "prep-pont-marche": "sol",
  "prep-clamshell": "sol",
  "prep-marche-laterale": "debout",
  "prep-w-sol": "sol",
  "prep-hollow": "sol",
  "prep-pallof": "debout",
  "prep-planche-laterale": "sol",
  "prep-sdt-une-jambe": "debout",
  "prep-releves-pointes": "debout",
  "prep-rotation-externe-cote": "sol",
  "prep-suspension": "barre",
  "prep-marche-ours": "quadrupedie",
  "prep-fente-iso": "debout",
};

export type NeedPhase = "mobility" | "activation" | "rehearsal";

export interface Need {
  phase: NeedPhase;
  /** Exercices qui répondent à ce besoin, du plus pertinent au moins pertinent. */
  pool: string[];
  /** Pourquoi, en une phrase, pour la personne qui s'échauffe. */
  reason: string;
}

export const NEEDS = {
  // — Mobilité
  thoracic: {
    phase: "mobility",
    pool: ["prep-thread-needle", "prep-open-book", "art-mobilisation-thoracique", "cib-hanches-fente-rotation"],
    reason: "Un haut du dos qui tourne et s'ouvre laisse les épaules travailler à leur place.",
  },
  overhead: {
    phase: "mobility",
    pool: ["prep-glisses-mur", "prep-dislocations", "prep-epaules-cars"],
    reason: "Monter les bras au-dessus de la tête sans cambrer ni hausser les épaules.",
  },
  "shoulder-open": {
    phase: "mobility",
    pool: ["art-ouverture-pecs", "prep-dislocations", "art-epaules-cercles"],
    reason: "Ouvrir l'avant de l'épaule et la poitrine avant de pousser.",
  },
  "shoulder-general": {
    phase: "mobility",
    pool: ["art-epaules-cercles", "prep-epaules-cars"],
    reason: "Les bras travaillent depuis l'épaule : on la met en mouvement d'abord.",
  },
  elbow: {
    phase: "mobility",
    pool: ["cib-coudes-pronation-supination", "art-coudes"],
    reason: "Coudes et avant-bras échauffés encaissent mieux les curls, les tirages et les extensions.",
  },
  wrist: {
    phase: "mobility",
    pool: ["cib-poignets-activation-progressive", "art-poignets"],
    reason: "Les poignets portent la charge aux pompes et aux développés.",
  },
  hip: {
    phase: "mobility",
    pool: ["prep-90-90", "prep-spiderman", "art-squat-profond-rebond", "art-hanches-cercles"],
    reason: "Des hanches libres dans toutes les directions pour descendre sans compenser avec le dos.",
  },
  ankle: {
    phase: "mobility",
    pool: ["art-cheville-genou-mur", "prep-cossack"],
    reason: "Le genou avance au-dessus du pied en squat et en fente : la cheville doit suivre.",
  },
  adductors: {
    phase: "mobility",
    pool: ["prep-cossack", "prep-frog"],
    reason: "Les adducteurs ouvrent les hanches en bas du squat et dans les fentes.",
  },
  hamstrings: {
    phase: "mobility",
    pool: ["prep-hamstring-sweep", "prep-charniere-hanche", "prep-inchworm"],
    reason: "Arrière des cuisses délié pour basculer le bassin sans arrondir le dos.",
  },
  lumbar: {
    phase: "mobility",
    pool: ["art-chat-vache", "art-lombaires-essuie-glace"],
    reason: "Bouger le bas du dos en douceur avant de le gainer.",
  },
  // — Activation
  cuff: {
    phase: "activation",
    pool: ["act-epaules-rotation-coiffe", "prep-rotation-externe-cote", "prep-w-sol", "act-dos-face-pull-elastique"],
    reason: "La coiffe des rotateurs tient la tête de l'épaule centrée quand les bras poussent ou montent.",
  },
  "scap-lower": {
    phase: "activation",
    pool: ["cib-epaule-yt-sol", "prep-glisses-mur", "act-epaules-y-raise"],
    reason: "Le bas des trapèzes fait pivoter l'omoplate pour monter les bras sans coincer.",
  },
  "scap-retract": {
    phase: "activation",
    pool: ["prep-pull-apart", "act-dos-face-pull-elastique", "cib-epaule-retraction-scapulaire", "cib-epaule-yt-sol", "prep-w-sol"],
    reason: "Serrer les omoplates : c'est ce qui démarre un tirage et stabilise un développé.",
  },
  "scap-protract": {
    phase: "activation",
    pool: ["act-pecs-iso", "prep-marche-ours"],
    reason: "Le dentelé plaque l'omoplate contre les côtes en fin de poussée.",
  },
  "scap-depress": {
    phase: "activation",
    pool: ["prep-tractions-scapulaires", "prep-suspension"],
    reason: "Abaisser les omoplates avant de tirer : le dos démarre le mouvement, pas les bras.",
  },
  biceps: {
    phase: "activation",
    pool: ["act-bras-curl-elastique"],
    reason: "Quelques flexions légères préparent le biceps et le tendon du coude avant de tirer.",
  },
  triceps: {
    phase: "activation",
    pool: ["act-bras-pushdown-elastique", "act-bras-pompes-mur"],
    reason: "Quelques extensions légères préparent le triceps et le coude avant de pousser.",
  },
  knee: {
    phase: "activation",
    pool: ["prep-fente-iso", "act-jambes-fentes", "cib-genou-tke", "cib-genou-step-up"],
    reason: "Des quadriceps réveillés et un genou qui reste dans l'axe du pied.",
  },
  glutes: {
    phase: "activation",
    pool: ["act-fessiers-pont", "prep-pont-marche", "cib-lombaires-hip-thrust-pdc", "act-fessiers-kickback-elastique"],
    reason: "Des fessiers actifs prennent le relais du bas du dos dans les extensions de hanche.",
  },
  "glute-med": {
    phase: "activation",
    pool: ["prep-marche-laterale", "prep-clamshell", "cib-hanches-fire-hydrant"],
    reason: "Le moyen fessier empêche le genou de rentrer en squat et en fente.",
  },
  "core-front": {
    phase: "activation",
    pool: ["act-core-dead-bug", "act-core-bird-dog", "act-core-planche", "prep-hollow"],
    reason: "Gainer le tronc sans bloquer la respiration, pour transmettre la force des jambes.",
  },
  "core-side": {
    phase: "activation",
    pool: ["prep-planche-laterale", "prep-pallof"],
    reason: "Résister aux rotations et aux inclinaisons : le tronc reste droit sous la charge.",
  },
  // — Répétition du geste, à vide ou au poids du corps
  "push-pattern": {
    phase: "rehearsal",
    pool: ["act-pecs-pompes-reprise"],
    reason: "Répéter la poussée lentement au poids du corps avant de charger.",
  },
  "squat-pattern": {
    phase: "rehearsal",
    pool: ["act-jambes-squat-corps", "art-squat-profond-rebond"],
    reason: "Répéter le squat au poids du corps : trajectoire, profondeur, genoux dans l'axe.",
  },
  "hinge-pattern": {
    phase: "rehearsal",
    pool: ["prep-charniere-hanche", "prep-sdt-une-jambe"],
    reason: "Répéter la charnière de hanche, dos plat, avant le soulevé de terre ou le hip thrust.",
  },
  "pull-pattern": {
    phase: "rehearsal",
    pool: ["prep-tractions-scapulaires", "prep-pull-apart"],
    reason: "Répéter le début du tirage, omoplates d'abord.",
  },
} satisfies Record<string, Need>;

export type NeedKey = keyof typeof NEEDS;

/**
 * Besoins de chaque zone, avec leur importance (3 = indispensable, 1 = utile).
 * Pensés à partir des mouvements typiques de la zone, sans présumer lequel la
 * personne fera.
 */
export const ZONE_NEEDS: Record<MuscleGroup, Partial<Record<NeedKey, number>>> = {
  pecs: { thoracic: 3, "shoulder-open": 3, "scap-protract": 2, cuff: 2, wrist: 1, "push-pattern": 3 },
  epaules: { overhead: 3, thoracic: 2, cuff: 3, "scap-lower": 3, "scap-retract": 2, "shoulder-open": 1 },
  dos: { thoracic: 2, overhead: 3, "scap-retract": 3, "scap-depress": 3, "scap-lower": 1, elbow: 1, "pull-pattern": 2 },
  bras: { "shoulder-general": 2, elbow: 3, wrist: 2, biceps: 3, triceps: 3 },
  jambes: { ankle: 3, hip: 3, adductors: 2, knee: 3, "glute-med": 2, "squat-pattern": 3 },
  fessiers: { hip: 3, hamstrings: 3, glutes: 3, "glute-med": 2, "hinge-pattern": 3 },
  core: { lumbar: 2, hip: 1, "core-front": 3, "core-side": 2, glutes: 1 },
};

/** Une zone sensible déclarée ajoute un besoin prioritaire. */
export const PAIN_NEEDS: Record<BodyZone, NeedKey[]> = {
  epaule: ["cuff", "scap-lower"],
  coudes: ["elbow"],
  poignets: ["wrist"],
  "bas-du-dos": ["lumbar", "core-front"],
  hanches: ["hip"],
  genou: ["knee", "glute-med"],
  chevilles: ["ankle"],
};

/** Exercices qui demandent un poste de la salle : seulement si la zone s'y prête. */
export const NEEDS_BAR = new Set(["prep-tractions-scapulaires", "prep-suspension"]);

/** Ce qu'un exercice couvre : tous les besoins dont il fait partie. */
export const COVERS: Record<string, NeedKey[]> = (() => {
  const out: Record<string, NeedKey[]> = {};
  for (const [key, need] of Object.entries(NEEDS) as [NeedKey, Need][]) {
    for (const id of need.pool) (out[id] ??= []).push(key);
  }
  return out;
})();
