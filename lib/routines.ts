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
}

const e = (id: string, dose?: string): RoutineEntry => ({ id, dose });

/** Routines des séances types, dans leur ordre d'exécution. */
export const TEMPLATE_ROUTINES: Record<string, RoutineEntry[]> = {
  push: [e("cat-cow", "6 cycles"), e("pompes-scapulaires", "10 répétitions"), e("rotation-externe", "10 par côté"), e("face-pull", "12 répétitions")],
  pull: [
    e("cat-cow", "6 cycles"),
    e("rotation-thoracique", "5 par côté"),
    e("wall-slides", "8 répétitions"),
    e("face-pull", "12 répétitions"),
    e("curl-marteau", "10 répétitions"),
  ],
  legs: [
    e("cheville-mur", "10 par côté"),
    e("squat-assiste", "3 × 10 secondes"),
    e("good-morning", "10 répétitions"),
    e("glute-bridge", "10 répétitions"),
    e("mollets", "12 répétitions"),
  ],
  haut: [
    e("cat-cow", "6 cycles"),
    e("rotation-thoracique", "5 par côté"),
    e("pompes-scapulaires", "10 répétitions"),
    e("rotation-externe", "10 par côté"),
    e("face-pull", "12 répétitions"),
  ],
  bas: [
    e("cheville-mur", "10 par côté"),
    e("squat-assiste", "3 × 10 secondes"),
    e("good-morning", "10 répétitions"),
    e("glute-bridge", "10 répétitions"),
    e("dead-bug", "5 par côté"),
  ],
  full: [
    e("cheville-mur", "8 par côté"),
    e("squat-assiste", "2 × 10 secondes"),
    e("good-morning", "8 répétitions"),
    e("face-pull", "10 répétitions"),
    e("rotation-externe", "8 par côté"),
    e("pompes-scapulaires", "8 répétitions"),
    e("dead-bug", "4 par côté"),
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
