// Catalogue des exercices de séance — ce que l'utilisateur fait APRÈS
// l'échauffement. C'est l'entrée du moteur : on prépare le corps aux
// exigences réelles de ces mouvements, pas à des groupes musculaires abstraits.

import type { BodyZone, PrepFocus } from "@/lib/warmup-data";

export type LiftPattern =
  | "squat"
  | "hinge"
  | "lunge"
  | "glute"
  | "push-h"
  | "push-v"
  | "pull-h"
  | "pull-v"
  | "iso-upper"
  | "iso-lower";

/** Comment se fait la montée en charge sur cet exercice. */
export type LiftLoading = "barre" | "halteres" | "machine" | "poids-du-corps";

export type LiftGroup = "Poussée" | "Tirage" | "Jambes" | "Isolation";

export interface Lift {
  id: string;
  name: string;
  /** Termes de recherche supplémentaires (sans accents, minuscules). */
  aliases: string[];
  group: LiftGroup;
  pattern: LiftPattern;
  loading: LiftLoading;
  /** Exigences de préparation, pondérées de 1 (accessoire) à 3 (déterminant). */
  demands: Partial<Record<PrepFocus, number>>;
  /** Zones que l'exercice met sous contrainte : une douleur déclarée sur
   * l'une d'elles déclenche la préparation ciblée et un avertissement. */
  stress: BodyZone[];
  /** Page douleur dédiée, quand elle existe. */
  painGuide?: { zone: BodyZone; href: string };
}

export const LIFTS: Lift[] = [
  // ── Poussée ───────────────────────────────────────────────────────
  {
    id: "developpe-couche",
    name: "Développé couché",
    aliases: ["bench", "dc", "developpe couche barre"],
    group: "Poussée",
    pattern: "push-h",
    loading: "barre",
    demands: { scapula: 3, "rotator-cuff": 3, thoracic: 2, "wrist-forearm": 1, "elbow-tendon": 1 },
    stress: ["epaule", "poignets", "coudes"],
    painGuide: { zone: "epaule", href: "/douleur/epaule-developpe-couche" },
  },
  {
    id: "developpe-incline",
    name: "Développé incliné",
    aliases: ["incline", "developpe incline barre", "developpe incline halteres"],
    group: "Poussée",
    pattern: "push-h",
    loading: "barre",
    demands: { scapula: 3, "rotator-cuff": 3, thoracic: 2, overhead: 1, "wrist-forearm": 1 },
    stress: ["epaule", "poignets"],
  },
  {
    id: "developpe-halteres",
    name: "Développé couché haltères",
    aliases: ["dumbbell press", "developpe halteres"],
    group: "Poussée",
    pattern: "push-h",
    loading: "halteres",
    demands: { scapula: 3, "rotator-cuff": 3, thoracic: 2, "wrist-forearm": 1 },
    stress: ["epaule", "poignets"],
  },
  {
    id: "developpe-militaire",
    name: "Développé militaire",
    aliases: ["ohp", "overhead press", "developpe debout", "military press"],
    group: "Poussée",
    pattern: "push-v",
    loading: "barre",
    demands: { overhead: 3, thoracic: 3, "rotator-cuff": 2, scapula: 2, core: 2, "wrist-forearm": 1 },
    stress: ["epaule", "bas-du-dos", "poignets"],
  },
  {
    id: "developpe-epaules-halteres",
    name: "Développé épaules haltères",
    aliases: ["developpe assis", "shoulder press", "developpe arnold"],
    group: "Poussée",
    pattern: "push-v",
    loading: "halteres",
    demands: { overhead: 3, thoracic: 2, "rotator-cuff": 2, scapula: 2 },
    stress: ["epaule", "poignets"],
  },
  {
    id: "dips",
    name: "Dips",
    aliases: ["dips barres paralleles"],
    group: "Poussée",
    pattern: "push-h",
    loading: "poids-du-corps",
    demands: { "rotator-cuff": 3, scapula: 2, "elbow-tendon": 2, "wrist-forearm": 1 },
    stress: ["epaule", "coudes", "poignets"],
  },
  {
    id: "pompes",
    name: "Pompes",
    aliases: ["push up", "pushups"],
    group: "Poussée",
    pattern: "push-h",
    loading: "poids-du-corps",
    demands: { scapula: 2, "wrist-forearm": 2, core: 1, "rotator-cuff": 1 },
    stress: ["poignets", "epaule"],
    painGuide: { zone: "poignets", href: "/douleur/poignet-pompes" },
  },

  // ── Tirage ────────────────────────────────────────────────────────
  {
    id: "tractions",
    name: "Tractions",
    aliases: ["pull up", "pullups", "chin up", "traction"],
    group: "Tirage",
    pattern: "pull-v",
    loading: "poids-du-corps",
    demands: { scapula: 3, overhead: 2, "elbow-tendon": 1, "rotator-cuff": 1, core: 1 },
    stress: ["epaule", "coudes"],
    painGuide: { zone: "epaule", href: "/douleur/epaule-tractions" },
  },
  {
    id: "tirage-vertical",
    name: "Tirage vertical",
    aliases: ["lat pulldown", "tirage poitrine", "tirage poulie haute"],
    group: "Tirage",
    pattern: "pull-v",
    loading: "machine",
    demands: { scapula: 3, overhead: 2, "elbow-tendon": 1 },
    stress: ["epaule", "coudes"],
  },
  {
    id: "rowing-barre",
    name: "Rowing barre",
    aliases: ["row", "barbell row", "rowing penche"],
    group: "Tirage",
    pattern: "pull-h",
    loading: "barre",
    demands: { scapula: 3, hamstrings: 2, lumbar: 2, core: 2, hip: 1 },
    stress: ["bas-du-dos", "coudes"],
  },
  {
    id: "rowing-haltere",
    name: "Rowing haltère",
    aliases: ["dumbbell row", "rowing un bras"],
    group: "Tirage",
    pattern: "pull-h",
    loading: "halteres",
    demands: { scapula: 3, core: 1, "elbow-tendon": 1 },
    stress: ["bas-du-dos", "coudes"],
  },
  {
    id: "tirage-horizontal",
    name: "Tirage horizontal",
    aliases: ["seated row", "rowing assis", "tirage poulie basse"],
    group: "Tirage",
    pattern: "pull-h",
    loading: "machine",
    demands: { scapula: 3, lumbar: 1, "elbow-tendon": 1 },
    stress: ["bas-du-dos", "coudes"],
  },

  // ── Jambes ────────────────────────────────────────────────────────
  {
    id: "squat",
    name: "Squat",
    aliases: ["back squat", "squat barre", "squat arriere"],
    group: "Jambes",
    pattern: "squat",
    loading: "barre",
    demands: { ankle: 3, hip: 3, "knee-control": 2, glutes: 2, core: 2, thoracic: 1 },
    stress: ["genou", "bas-du-dos", "hanches", "chevilles"],
    painGuide: { zone: "genou", href: "/douleur/genou-squat" },
  },
  {
    id: "presse",
    name: "Presse à cuisses",
    aliases: ["leg press", "presse"],
    group: "Jambes",
    pattern: "squat",
    loading: "machine",
    demands: { hip: 2, "knee-control": 2, ankle: 1, glutes: 1 },
    stress: ["genou", "bas-du-dos"],
  },
  {
    id: "souleve-de-terre",
    name: "Soulevé de terre",
    aliases: ["deadlift", "sdt", "souleve de terre"],
    group: "Jambes",
    pattern: "hinge",
    loading: "barre",
    demands: { hamstrings: 3, hip: 3, core: 3, lumbar: 2, glutes: 2, scapula: 1 },
    stress: ["bas-du-dos", "hanches"],
    painGuide: { zone: "bas-du-dos", href: "/douleur/bas-du-dos-souleve-de-terre" },
  },
  {
    id: "souleve-roumain",
    name: "Soulevé de terre roumain",
    aliases: ["rdl", "romanian deadlift", "souleve jambes tendues"],
    group: "Jambes",
    pattern: "hinge",
    loading: "barre",
    demands: { hamstrings: 3, hip: 2, lumbar: 2, core: 2, glutes: 1 },
    stress: ["bas-du-dos", "hanches"],
  },
  {
    id: "hip-thrust",
    name: "Hip thrust",
    aliases: ["releve de bassin", "pont fessier barre"],
    group: "Jambes",
    pattern: "glute",
    loading: "barre",
    demands: { glutes: 3, hip: 2, core: 1, lumbar: 1 },
    stress: ["bas-du-dos", "hanches"],
  },
  {
    id: "fentes",
    name: "Fentes / squat bulgare",
    aliases: ["lunges", "split squat", "bulgare", "fentes halteres"],
    group: "Jambes",
    pattern: "lunge",
    loading: "halteres",
    demands: { hip: 3, "knee-control": 2, ankle: 2, glutes: 2 },
    stress: ["genou", "hanches", "chevilles"],
  },

  // ── Isolation ─────────────────────────────────────────────────────
  {
    id: "elevations-laterales",
    name: "Élévations latérales",
    aliases: ["lateral raise", "elevations"],
    group: "Isolation",
    pattern: "iso-upper",
    loading: "halteres",
    demands: { "rotator-cuff": 2, scapula: 1 },
    stress: ["epaule"],
  },
  {
    id: "ecartes",
    name: "Écartés / pec deck",
    aliases: ["butterfly", "ecarte poulie", "vis a vis"],
    group: "Isolation",
    pattern: "iso-upper",
    loading: "machine",
    demands: { "rotator-cuff": 1, scapula: 1, thoracic: 1 },
    stress: ["epaule"],
  },
  {
    id: "curl-biceps",
    name: "Curl biceps",
    aliases: ["curl", "biceps", "curl barre"],
    group: "Isolation",
    pattern: "iso-upper",
    loading: "halteres",
    demands: { "elbow-tendon": 2, "wrist-forearm": 1 },
    stress: ["coudes", "poignets"],
    painGuide: { zone: "coudes", href: "/douleur/coude-curl-biceps" },
  },
  {
    id: "triceps",
    name: "Extensions triceps",
    aliases: ["pushdown", "barre au front", "triceps poulie"],
    group: "Isolation",
    pattern: "iso-upper",
    loading: "machine",
    demands: { "elbow-tendon": 2, "wrist-forearm": 1 },
    stress: ["coudes"],
  },
  {
    id: "leg-extension",
    name: "Leg extension",
    aliases: ["extension quadriceps", "leg extension"],
    group: "Isolation",
    pattern: "iso-lower",
    loading: "machine",
    demands: { "knee-control": 2 },
    stress: ["genou"],
  },
  {
    id: "leg-curl",
    name: "Leg curl",
    aliases: ["ischio machine", "leg curl"],
    group: "Isolation",
    pattern: "iso-lower",
    loading: "machine",
    demands: { hamstrings: 2, "knee-control": 1 },
    stress: ["genou"],
  },
  {
    id: "mollets",
    name: "Mollets",
    aliases: ["calf raise", "extension mollets"],
    group: "Isolation",
    pattern: "iso-lower",
    loading: "machine",
    demands: { ankle: 2 },
    stress: ["chevilles"],
  },

  // ── Banque élargie (octobre 2026) ────────────────────────────────
  {
    id: "developpe-machine",
    name: "Développé machine",
    aliases: ["chest press", "presse pectoraux", "developpe assis machine"],
    group: "Poussée",
    pattern: "push-h",
    loading: "machine",
    demands: { scapula: 2, "rotator-cuff": 2, "wrist-forearm": 1 },
    stress: ["epaule", "poignets"],
  },
  {
    id: "face-pull",
    name: "Face pull",
    aliases: ["face pull poulie", "tirage visage"],
    group: "Tirage",
    pattern: "iso-upper",
    loading: "machine",
    demands: { "rotator-cuff": 2, scapula: 2 },
    stress: ["epaule"],
  },
  {
    id: "pullover",
    name: "Pull-over poulie",
    aliases: ["pullover", "tirage bras tendus", "straight arm pulldown"],
    group: "Tirage",
    pattern: "iso-upper",
    loading: "machine",
    demands: { overhead: 2, scapula: 1, thoracic: 1 },
    stress: ["epaule"],
  },
  {
    id: "front-squat",
    name: "Squat avant",
    aliases: ["front squat", "squat devant"],
    group: "Jambes",
    pattern: "squat",
    loading: "barre",
    demands: { ankle: 3, hip: 3, thoracic: 3, core: 3, "knee-control": 2, "wrist-forearm": 2 },
    stress: ["genou", "poignets", "chevilles"],
  },
  {
    id: "goblet-squat",
    name: "Squat goblet",
    aliases: ["goblet", "squat haltere", "squat kettlebell"],
    group: "Jambes",
    pattern: "squat",
    loading: "halteres",
    demands: { ankle: 2, hip: 3, "knee-control": 2, core: 1 },
    stress: ["genou"],
  },
  {
    id: "hack-squat",
    name: "Hack squat",
    aliases: ["hack squat machine", "squat machine"],
    group: "Jambes",
    pattern: "squat",
    loading: "machine",
    demands: { "knee-control": 3, hip: 2, ankle: 2 },
    stress: ["genou"],
  },
  {
    id: "souleve-sumo",
    name: "Soulevé de terre sumo",
    aliases: ["sumo", "sumo deadlift", "sdt sumo"],
    group: "Jambes",
    pattern: "hinge",
    loading: "barre",
    demands: { hip: 3, hamstrings: 2, core: 3, lumbar: 2, glutes: 2, "knee-control": 1 },
    stress: ["bas-du-dos", "hanches", "genou"],
  },
  {
    id: "good-morning",
    name: "Good morning",
    aliases: ["good morning barre", "bonjour"],
    group: "Jambes",
    pattern: "hinge",
    loading: "barre",
    demands: { hamstrings: 3, lumbar: 3, hip: 2, core: 2 },
    stress: ["bas-du-dos"],
  },
  {
    id: "kettlebell-swing",
    name: "Kettlebell swing",
    aliases: ["swing", "kb swing", "balancier kettlebell"],
    group: "Jambes",
    pattern: "hinge",
    loading: "halteres",
    demands: { hamstrings: 3, hip: 3, glutes: 3, core: 2, lumbar: 1 },
    stress: ["bas-du-dos"],
  },
  {
    id: "abduction",
    name: "Abduction",
    aliases: ["abducteurs machine", "hip abduction", "ecartement jambes"],
    group: "Isolation",
    pattern: "iso-lower",
    loading: "machine",
    demands: { glutes: 2, hip: 1 },
    stress: ["hanches"],
  },
  {
    id: "releves-jambes",
    name: "Relevés de jambes suspendu",
    aliases: ["releve de jambes", "hanging leg raise", "abdos suspendu"],
    group: "Isolation",
    pattern: "iso-lower",
    loading: "poids-du-corps",
    demands: { core: 2, hip: 2, overhead: 1, scapula: 1 },
    stress: ["bas-du-dos", "epaule"],
  },
  {
    id: "curl-marteau",
    name: "Curl marteau",
    aliases: ["hammer curl", "curl prise neutre"],
    group: "Isolation",
    pattern: "iso-upper",
    loading: "halteres",
    demands: { "elbow-tendon": 2, "wrist-forearm": 2 },
    stress: ["coudes", "poignets"],
  },
];

export const LIFTS_BY_ID: Record<string, Lift> = Object.fromEntries(LIFTS.map((l) => [l.id, l]));

export const LIFT_GROUPS: LiftGroup[] = ["Poussée", "Tirage", "Jambes", "Isolation"];

/** Séances types : un tap pour pré-remplir, modifiable ensuite. */
export const SESSION_TEMPLATES: { id: string; label: string; lifts: string[] }[] = [
  { id: "push", label: "Push", lifts: ["developpe-couche", "developpe-epaules-halteres", "elevations-laterales", "triceps"] },
  { id: "pull", label: "Pull", lifts: ["tractions", "rowing-barre", "tirage-horizontal", "curl-biceps"] },
  { id: "legs", label: "Jambes", lifts: ["squat", "souleve-roumain", "presse", "leg-curl"] },
  { id: "haut", label: "Haut du corps", lifts: ["developpe-couche", "rowing-barre", "developpe-militaire", "tractions"] },
  { id: "bas", label: "Bas du corps", lifts: ["squat", "souleve-roumain", "fentes", "hip-thrust"] },
  { id: "full", label: "Full body", lifts: ["squat", "developpe-couche", "rowing-barre"] },
];

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export function searchLifts(query: string): Lift[] {
  const q = normalize(query);
  if (!q) return LIFTS;
  return LIFTS.filter((l) => normalize(l.name).includes(q) || l.aliases.some((a) => a.includes(q)));
}

/** Nom court d'une séance : le modèle s'il correspond, sinon les exercices. */
export function sessionLabel(ids: string[]) {
  const template = SESSION_TEMPLATES.find((t) => t.lifts.join(",") === ids.join(","));
  if (template) return template.label;
  const names = ids.map((id) => LIFTS_BY_ID[id]?.name).filter(Boolean);
  return names.slice(0, 2).join(" + ") + (names.length > 2 ? ` +${names.length - 2}` : "");
}
