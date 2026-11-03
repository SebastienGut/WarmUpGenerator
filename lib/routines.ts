// Routines de référence du moteur v3 (docs/brief-moteur-v3.md).
//
// Les séances types (Push, Pull…) ont une routine écrite d'un bloc, pensée comme
// un préparateur physique la composerait. « Mes zones » compose les bases de
// chaque zone : mise en commun des exercices partagés, plafond de volume, ordre
// qui limite les passages au sol. Ce sont des propositions de programmation, à
// faire valider ; elles ne prétendent pas à une séquence optimale démontrée.

import type { MuscleGroup } from "@/lib/warmup-data";

export interface RoutineEntry {
  id: string;
  /** Dose propre à cette routine ; sinon la dose par défaut de l'exercice. */
  dose?: string;
  /** Durée réelle de cette dose (côtés, séries et installation compris), en secondes. */
  seconds?: number;
}

const e = (id: string, dose?: string, seconds?: number): RoutineEntry => ({ id, dose, seconds });

/** Routines des séances types, dans leur ordre d'exécution. */
// Chaque séance type dure environ 6 minutes (transitions comprises) : l'activation
// se fait en deux séries courtes, la mobilité en cycles lents.
export const TEMPLATE_ROUTINES: Record<string, RoutineEntry[]> = {
  push: [
    e("cat-cow", "8 cycles", 50),
    e("pompes-scapulaires", "2 × 10 répétitions", 75),
    e("rotation-externe", "2 × 10 par côté", 110),
    e("face-pull", "2 × 12 répétitions", 85),
  ],
  pull: [
    e("cat-cow", "6 cycles", 40),
    e("rotation-thoracique", "6 par côté", 55),
    e("wall-slides", "2 × 8 répétitions", 65),
    e("face-pull", "2 × 12 répétitions", 85),
    e("curl-marteau", "2 × 10 répétitions", 65),
  ],
  legs: [
    e("cheville-mur", "10 par côté", 50),
    e("squat-assiste", "3 × 10 secondes", 50),
    e("good-morning", "2 × 10 répétitions", 65),
    e("glute-bridge", "2 × 10 répétitions", 65),
    e("mollets", "2 × 12 répétitions", 60),
  ],
  haut: [
    e("cat-cow", "6 cycles", 40),
    e("rotation-thoracique", "5 par côté", 45),
    e("pompes-scapulaires", "2 × 10 répétitions", 75),
    e("rotation-externe", "10 par côté", 55),
    e("face-pull", "2 × 12 répétitions", 85),
  ],
  bas: [
    e("cheville-mur", "10 par côté", 50),
    e("squat-assiste", "3 × 10 secondes", 50),
    e("good-morning", "2 × 10 répétitions", 65),
    e("glute-bridge", "2 × 10 répétitions", 65),
    e("dead-bug", "2 × 5 par côté", 70),
  ],
  full: [
    e("cheville-mur", "8 par côté", 45),
    e("squat-assiste", "2 × 10 secondes", 35),
    e("good-morning", "8 répétitions", 35),
    e("face-pull", "10 répétitions", 40),
    e("rotation-externe", "8 par côté", 45),
    e("pompes-scapulaires", "8 répétitions", 30),
    e("dead-bug", "4 par côté", 40),
  ],
};

/** Base de chaque zone pour « Mes zones », dans l'ordre d'importance. */
export const ZONE_BASES: Record<MuscleGroup, RoutineEntry[]> = {
  pecs: [e("cat-cow"), e("pompes-scapulaires"), e("rotation-externe")],
  dos: [e("cat-cow"), e("rotation-thoracique"), e("wall-slides"), e("face-pull")],
  epaules: [e("wall-slides"), e("rotation-externe"), e("face-pull")],
  // Bras choisis à la main : biceps et triceps d'abord (règle du brief), avant-bras ensuite.
  bras: [e("curl-marteau"), e("extension-triceps"), e("pronation-supination")],
  jambes: [e("cheville-mur"), e("squat-assiste"), e("good-morning"), e("mollets")],
  fessiers: [e("90-90"), e("good-morning"), e("glute-bridge")],
  core: [e("cat-cow"), e("bird-dog"), e("dead-bug")],
};

/** Remplacements proposés par ↻ Varier : seulement entre exercices de même fonction. */
export const ALTERNATIVES: Record<string, string> = {
  "dead-bug": "bird-dog",
  "bird-dog": "dead-bug",
  "rotation-externe": "rotation-externe-cote",
  "90-90": "squat-assiste",
};

/** Volume maximal : au-delà, la préparation devient une séance. */
export const MAX_STEPS = 7;
export const SHORT_STEPS = 4;
