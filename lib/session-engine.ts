// Moteur d'échauffement.
//
// Entrée : les zones travaillées aujourd'hui (séance type ou choix libre), les
// zones sensibles, le matériel. Sortie : un échauffement inspiré du protocole
// RAMP (Raise, Activate & Mobilise, Potentiate) :
//   1. Mise en route — 2 min de cardio léger (sauf version courte)
//   2. Mobilité      — les amplitudes que les zones demandent
//   3. Activation    — les stabilisateurs à réveiller, puis la répétition du
//                      geste au poids du corps
// La connaissance de coach (besoins de chaque zone, exercices qui y répondent,
// raisons) est dans lib/prep-catalog.ts. Le moteur additionne les besoins des
// zones (un besoin partagé passe devant), sert d'abord le besoin principal de
// chaque zone, couvre chaque besoin une seule fois en préférant les exercices
// qui en couvrent plusieurs, puis ordonne pour limiter les passages au sol.
// Les séries d'approche sont un outil à part (buildRampPlan, /series-approche).

import { exercises, type BodyZone, type Exercise, type MuscleGroup, type PrepFocus } from "@/lib/warmup-data";
import { LIFTS_BY_ID, ZONE_LIFTS, ZONE_ORDER, zonesLabel, sessionLabel, type Lift, type LiftLoading } from "@/lib/lifts";
import { computeApproachSets, formatKg, type ApproachExercise } from "@/lib/approach-sets";
import { COVERS, NEEDS, NEEDS_BAR, PAIN_NEEDS, POSITION, ZONE_NEEDS, type Need, type NeedKey, type NeedPhase, type Position } from "@/lib/prep-catalog";

export interface SessionInput {
  /** Zones à échauffer (cas principal : séance type ou choix libre). */
  zones?: MuscleGroup[];
  /** Ou bien un exercice précis (pages « échauffement avant le squat »). */
  lifts: string[];
  /** Charge de la première série de travail du 1er exercice, en kg. */
  workWeight?: number;
  /** Répétitions de cette série (séries d'approche uniquement). */
  workReps?: number;
  pain: BodyZone[];
  /** Un élastique est disponible. */
  band: boolean;
  /** Version courte : pas de mise en route, moins d'exercices. */
  short: boolean;
  /** Variante : 0 = la sélection la plus pertinente ; au-delà, on tourne parmi
   * les exercices presque aussi pertinents, pour varier d'une séance à l'autre. */
  variant?: number;
}

export interface PrepStep {
  kind: "prep";
  exercise: Exercise;
  instructions: string;
  /** L'exercice demande un élastique absent : on donne l'alternative. */
  substituted: boolean;
  reps: string;
  seconds: number;
  /** Pourquoi cet exercice est là, en clair. */
  reason: string;
}

export interface RaiseStep {
  kind: "raise";
  name: string;
  instructions: string;
  reps: string;
  seconds: number;
}

export interface RampLine {
  load: string;
  reps: number;
  /** Disques par côté, du plus lourd au plus léger. */
  plates?: number[];
  restSeconds: number;
}

export interface RampStep {
  kind: "ramp";
  lift: Lift;
  lines: RampLine[];
  /** Montée complète (1er exercice) ou simple rappel (exercices suivants). */
  full: boolean;
  note?: string;
}

export type PlanStep = PrepStep | RaiseStep | RampStep;

export interface PlanPhase {
  key: "raise" | "mobility" | "activation" | "ramp";
  title: string;
  why: string;
  steps: PlanStep[];
}

export interface PlanWarning {
  zone: BodyZone;
  text: string;
  href: string;
}

export interface SessionPlan {
  /** Nom de l'échauffement : « Jambes », « Pecs + Dos », « Squat »… */
  title: string;
  lifts: Lift[];
  phases: PlanPhase[];
  minutes: number;
  warnings: PlanWarning[];
}

export const FOCUS_LABELS: Record<PrepFocus, string> = {
  scapula: "omoplates",
  "rotator-cuff": "coiffe des rotateurs",
  thoracic: "haut du dos",
  lumbar: "bas du dos",
  hip: "hanches",
  "knee-control": "genoux",
  ankle: "chevilles",
  "wrist-forearm": "poignets",
  "elbow-tendon": "coudes",
  glutes: "fessiers",
  core: "gainage",
  hamstrings: "ischio-jambiers",
  overhead: "épaules en hauteur",
};

export const PAIN_LABELS: Record<BodyZone, string> = {
  epaule: "Épaule",
  coudes: "Coude",
  poignets: "Poignet",
  "bas-du-dos": "Bas du dos",
  hanches: "Hanche",
  genou: "Genou",
  chevilles: "Cheville",
};

const PROTECTION_HREF: Partial<Record<BodyZone, string>> = {
  epaule: "/echauffement/protection/epaule-douleur",
  genou: "/echauffement/protection/genou",
  "bas-du-dos": "/echauffement/protection/lombaires",
  poignets: "/echauffement/protection/poignets",
};

// Étirements statiques : réservés aux zones douloureuses déclarées. Avant une
// séance de force, l'étirement statique prolongé n'apporte rien au geste.
const STATIC_STRETCH = /etire|capsule|genoux-poitrine/;

// Exercices qui supposent un poste précis de la salle : proposés seulement si
// la séance y passe de toute façon.
// Variantes d'un même geste sans movementKey commun dans la base.
const SAME_MOVEMENT: Record<string, string> = { "cib-epaule-yt-sol": "y-raise", "act-epaules-y-raise": "y-raise" };
const movementOf = (ex: Exercise) => ex.movementKey ?? SAME_MOVEMENT[ex.id];

function toStep(ex: Exercise, input: SessionInput, reason: string): PrepStep {
  const substituted = ex.equipment === "elastique" && !input.band;
  return {
    kind: "prep",
    exercise: ex,
    instructions: substituted && ex.fallback ? ex.fallback : ex.description,
    substituted,
    reps: ex.reps ?? `${ex.durationSeconds} s`,
    seconds: ex.durationSeconds,
    reason,
  };
}

function rampExerciseFor(lift: Lift): ApproachExercise {
  if (lift.loading === "halteres") return "halteres";
  if (lift.loading === "machine") return "machine";
  return lift.id === "souleve-de-terre" ? "souleve-de-terre" : "squat";
}

function fullRamp(lift: Lift, input: SessionInput, barWeight = 20): RampLine[] {
  if (lift.loading === "poids-du-corps") {
    return [
      { load: "Amplitude réduite", reps: 5, restSeconds: 45 },
      { load: "Amplitude complète, lent", reps: 3, restSeconds: 90 },
    ];
  }
  const known = input.workWeight !== undefined && input.workWeight > 0;
  const sets = computeApproachSets({
    exercise: rampExerciseFor(lift),
    workWeight: known ? input.workWeight! : 100,
    workReps: input.workReps ?? 8,
    barWeight,
  });
  return sets.map((s) => ({
    load: s.emptyBar ? "Barre seule" : known ? formatKg(s.weight) : `${s.percent} %`,
    reps: s.reps,
    plates: known && lift.loading === "barre" && !s.emptyBar ? s.platesPerSide : undefined,
    restSeconds: s.restSeconds,
  }));
}


const NEED_LABELS: Record<NeedKey, string> = {
  thoracic: "haut du dos",
  overhead: "épaules au-dessus de la tête",
  "shoulder-open": "avant de l'épaule",
  "shoulder-general": "épaules",
  elbow: "coudes",
  wrist: "poignets",
  hip: "hanches",
  ankle: "chevilles",
  adductors: "adducteurs",
  hamstrings: "arrière des cuisses",
  lumbar: "bas du dos",
  cuff: "coiffe des rotateurs",
  "scap-lower": "bas des trapèzes",
  "scap-retract": "omoplates",
  "scap-protract": "dentelé",
  "scap-depress": "omoplates",
  biceps: "biceps",
  triceps: "triceps",
  knee: "quadriceps et genoux",
  glutes: "fessiers",
  "glute-med": "moyen fessier",
  "core-front": "gainage",
  "core-side": "gainage latéral",
  "push-pattern": "poussée",
  "squat-pattern": "squat",
  "hinge-pattern": "charnière de hanche",
  "pull-pattern": "tirage",
};

// Ordre des positions : la mobilité commence debout et descend au sol,
// l'activation repart du sol pour finir debout — deux passages au sol au plus.
const POS_RANK: Record<Position, number> = { debout: 0, barre: 1, appui: 2, quadrupedie: 3, sol: 4 };
const posOf = (ex: Exercise): Position => POSITION[ex.id] ?? "debout";

/** Besoins de la séance, du plus important au moins important. Un besoin
 * partagé par plusieurs zones s'additionne : il passe devant. */
function sessionNeeds(zones: MuscleGroup[], pain: BodyZone[]) {
  // Bras ou gainage avec d'autres zones : les exercices composés les échauffent
  // déjà, leurs besoins propres passent au second plan.
  const secondary = (z: MuscleGroup) => (z === "bras" || z === "core") && zones.some((o) => o !== "bras" && o !== "core");
  const w: Partial<Record<NeedKey, number>> = {};
  const lead: NeedKey[] = [];
  for (const z of zones) {
    const entries = (Object.entries(ZONE_NEEDS[z]) as [NeedKey, number][])
      // Avec une séance de tirage, le biceps travaille ; avec une poussée, le triceps.
      .filter(([k]) => !secondary(z) || (k !== "biceps" || zones.includes("dos")) && (k !== "triceps" || zones.some((o) => o === "pecs" || o === "epaules")))
      .map(([k, v]) => [k, secondary(z) ? v * 0.35 : v] as const);
    for (const [k, v] of entries) w[k] = (w[k] ?? 0) + v;
    // Le besoin principal de chaque zone est servi en premier : un full body
    // prépare aussi le haut du corps, pas seulement les jambes.
    if (!secondary(z)) {
      const top = [...entries].filter(([k]) => NEEDS[k].phase === "activation").sort((x, y) => y[1] - x[1])[0];
      if (top) lead.push(top[0]);
    }
  }
  const painNeed = new Set<NeedKey>();
  for (const z of pain) {
    for (const k of PAIN_NEEDS[z]) {
      w[k] = (w[k] ?? 0) + 4;
      painNeed.add(k);
    }
  }
  const phaseRank: Record<NeedPhase, number> = { mobility: 0, activation: 1, rehearsal: 2 };
  const leadBoost = (k: NeedKey) => (lead.includes(k) ? 100 : 0);
  return (Object.entries(w) as [NeedKey, number][])
    .map(([key, weight]) => ({ key, weight, pain: painNeed.has(key) }))
    .sort(
      (x, y) =>
        (y.pain ? 1000 : 0) + leadBoost(y.key) + y.weight - ((x.pain ? 1000 : 0) + leadBoost(x.key) + x.weight) ||
        phaseRank[NEEDS[x.key].phase] - phaseRank[NEEDS[y.key].phase] ||
        x.key.localeCompare(y.key),
    );
}

/** Zones d'un exercice de séance (anciens liens « échauffement avant le squat »). */
function zonesOfLifts(lifts: Lift[]): MuscleGroup[] {
  return ZONE_ORDER.filter((z) => lifts.some((l) => ZONE_LIFTS[z].includes(l.id)));
}

export function buildSessionPlan(input: SessionInput): SessionPlan {
  const lifts = input.lifts.map((id) => LIFTS_BY_ID[id]).filter((l): l is Lift => Boolean(l));
  const chosenZones = (input.zones ?? []).filter((z) => z in ZONE_LIFTS);
  const byZone = chosenZones.length > 0;
  const zones = byZone ? chosenZones : zonesOfLifts(lifts);
  const refLifts = byZone ? [...new Set(zones.flatMap((z) => ZONE_LIFTS[z]))].map((id) => LIFTS_BY_ID[id]) : lifts;
  const needs = sessionNeeds(zones, input.pain);
  const inPlan = new Set(needs.map((n) => n.key));
  const weightOf = new Map(needs.map((n) => [n.key, n.weight]));

  // Volume : assez pour préparer sans fatiguer. Plus de zones = un peu plus,
  // jamais au-delà de sept exercices.
  const main = zones.filter((z) => z !== "bras" && z !== "core").length || 1;
  const caps: Record<"total" | NeedPhase, number> = input.short
    ? { total: 4, mobility: 2, activation: 1, rehearsal: 1 }
    : { total: main >= 2 ? 7 : 6, mobility: 3, activation: main >= 3 ? 3 : 3, rehearsal: main >= 3 ? 2 : 1 };

  const byId = new Map(exercises.map((e) => [e.id, e]));
  const used = new Set<string>();
  const usedMovement = new Set<string>();
  const covered = new Set<NeedKey>();
  const chosen: { ex: Exercise; phase: NeedPhase; reason: string }[] = [];
  const count = (phase: NeedPhase) => chosen.filter((c) => c.phase === phase).length;

  const eligible = (ex: Exercise | undefined, forPain: boolean): ex is Exercise => {
    if (!ex || used.has(ex.id)) return false;
    const movement = movementOf(ex);
    if (movement && usedMovement.has(movement)) return false;
    if (ex.contraindications.some((z) => input.pain.includes(z))) return false;
    if (ex.equipment === "haltere" || ex.equipment === "poulie") return false; // pas de matériel à aller chercher
    if (ex.equipment === "elastique" && !input.band && !ex.fallback) return false;
    if (NEEDS_BAR.has(ex.id) && !zones.includes("dos")) return false;
    if (STATIC_STRETCH.test(ex.id) && !forPain) return false;
    if ((ex.trainingValue ?? 3) <= 1 && !forPain) return false;
    return true;
  };

  let needIndex = 0;
  for (const need of needs) {
    if (covered.has(need.key)) continue;
    const def: Need = NEEDS[need.key];
    if (chosen.length >= caps.total || count(def.phase) >= caps[def.phase]) continue;
    const last = chosen.filter((c) => c.phase === def.phase).at(-1);
    const candidates = def.pool
      .map((id, rank) => ({ ex: byId.get(id), rank }))
      .filter((c): c is { ex: Exercise; rank: number } => eligible(c.ex, need.pain))
      .map(({ ex, rank }) => {
        // Un exercice qui répond aussi à d'autres besoins de la séance passe devant.
        const alsoCovers = (COVERS[ex.id] ?? [])
          .filter((k) => k !== need.key && inPlan.has(k) && !covered.has(k) && (NEEDS[k].phase === def.phase || NEEDS[k].phase === "rehearsal"))
          .reduce((s, k) => s + 0.5 * (weightOf.get(k) ?? 0), 0);
        // Sans élastique, la version de remplacement ne vient qu'en dernier recours.
        const band = ex.equipment === "elastique" ? (input.band ? 0.5 : -6) : 0;
        const sameSpot = last && posOf(last.ex) === posOf(ex) ? 0.5 : 0;
        const pain = (ex.painSupport ?? []).some((z) => input.pain.includes(z)) ? 2 : 0;
        return { ex, score: def.pool.length - rank + alsoCovers + band + sameSpot + pain };
      })
      .sort((x, y) => y.score - x.score || x.ex.id.localeCompare(y.ex.id));
    if (!candidates.length) continue;
    // Variante : alterner avec le deuxième meilleur choix, besoin par besoin.
    const v = input.variant ?? 0;
    const options = candidates.slice(0, Math.min(2, candidates.length));
    const ex = options[v === 0 ? 0 : (v + needIndex) % options.length].ex;
    needIndex++;
    used.add(ex.id);
    const movement = movementOf(ex);
    if (movement) usedMovement.add(movement);
    for (const k of COVERS[ex.id] ?? []) {
      const sameFamily = NEEDS[k].phase === def.phase || NEEDS[k].phase === "rehearsal";
      if (inPlan.has(k) && sameFamily) covered.add(k);
    }
    covered.add(need.key);
    chosen.push({ ex, phase: def.phase, reason: need.pain ? `Zone sensible. ${def.reason}` : def.reason });
  }

  const toSteps = (list: typeof chosen) => list.map((c) => toStep(c.ex, input, c.reason));
  const mobilityList = chosen
    .filter((c) => c.phase === "mobility")
    .sort((x, y) => POS_RANK[posOf(x.ex)] - POS_RANK[posOf(y.ex)]);
  // L'activation repart du sol pour finir debout ; la répétition du geste se
  // place avec les exercices de la même position, après eux.
  const activationList = chosen
    .filter((c) => c.phase !== "mobility")
    .sort(
      (x, y) =>
        POS_RANK[posOf(y.ex)] - POS_RANK[posOf(x.ex)] ||
        Number(x.phase === "rehearsal") - Number(y.phase === "rehearsal"),
    );
  const rehearsalList = chosen.filter((c) => c.phase === "rehearsal");
  const mobility = toSteps(mobilityList);
  const activation = toSteps(activationList);

  const phases: PlanPhase[] = [];
  if (!input.short) {
    phases.push({
      key: "raise",
      title: "Mise en route",
      why: "Faire monter la température et le rythme cardiaque, sans fatiguer.",
      steps: [
        {
          kind: "raise",
          name: "Cardio léger",
          instructions: "Rameur, vélo, elliptique ou corde à sauter. L'intensité est juste : tu dois pouvoir parler.",
          reps: "2 min",
          seconds: 120,
        },
      ],
    });
  }
  const labels = (list: typeof chosen) =>
    [...new Set(list.flatMap((c) => (COVERS[c.ex.id] ?? []).filter((k) => inPlan.has(k)).map((k) => NEED_LABELS[k])))].slice(0, 3);
  if (mobility.length) {
    phases.push({
      key: "mobility",
      title: "Mobilité",
      why: `Ouvrir les amplitudes que la séance va demander : ${labels(mobilityList).join(", ")}.`,
      steps: mobility,
    });
  }
  if (activation.length) {
    phases.push({
      key: "activation",
      title: "Activation",
      why: rehearsalList.length
        ? `Réveiller ${labels(activationList.filter((c) => c.phase === "activation")).join(", ") || "les stabilisateurs"} et répéter le geste à vide.`
        : `Réveiller les muscles qui stabilisent les mouvements : ${labels(activationList).join(", ")}.`,
      steps: activation,
    });
  }

  const prepSteps = phases.flatMap((p) => p.steps).filter((st) => st.kind !== "ramp");
  // Durée honnête : le temps des exercices, plus ~10 s pour enchaîner chaque
  // exercice et 15 s de plus quand il faut prendre ou poser du matériel.
  const equipmentOf = (st: (typeof prepSteps)[number]) => (st.kind === "prep" ? st.exercise.equipment : "aucun");
  const transitions = prepSteps.reduce(
    (s, st, i) => (i === 0 ? s : s + 10 + (equipmentOf(st) !== equipmentOf(prepSteps[i - 1]) ? 15 : 0)),
    0,
  );
  const prepSeconds = prepSteps.reduce((s, st) => s + st.seconds, 0) + transitions;

  const warnings: PlanWarning[] = input.pain.flatMap((zone) => {
    const stressing = refLifts.filter((l) => l.stress.includes(zone));
    if (!stressing.length) return [];
    const guide = byZone ? undefined : stressing.find((l) => l.painGuide?.zone === zone)?.painGuide?.href;
    return [
      {
        zone,
        text: `${PAIN_LABELS[zone]} sensible : la gêne doit rester sous 3 sur 10 pendant l'échauffement. Si elle augmente, réduis l'amplitude plutôt que de forcer.`,
        href: guide ?? PROTECTION_HREF[zone] ?? "/douleur",
      },
    ];
  });

  return {
    title: byZone ? zonesLabel(zones) : sessionLabel(lifts.map((l) => l.id)),
    lifts,
    phases,
    minutes: Math.max(1, Math.round(prepSeconds / 60)),
    warnings,
  };
}

/** Plan réduit à la seule montée en charge d'un exercice : c'est l'outil
 * séries d'approche, distinct de l'échauffement, qui réutilise le mode guidé. */
export function buildRampPlan(liftId: string, workWeight: number | undefined, workReps: number, barWeight = 20): SessionPlan {
  const lift = LIFTS_BY_ID[liftId];
  const lines = fullRamp(lift, { lifts: [liftId], workWeight, workReps, pain: [], band: false, short: false }, barWeight);
  return {
    title: lift.name,
    lifts: [lift],
    phases: [{ key: "ramp", title: "Séries d'approche", why: "", steps: [{ kind: "ramp", lift, lines, full: true }] }],
    minutes: Math.max(1, Math.round(lines.reduce((s, l) => s + 30 + l.restSeconds, 0) / 60)),
    warnings: [],
  };
}

// ── URL ────────────────────────────────────────────────────────────
// /plan?z=jambes,fessiers&p=genou&e=1&c=1   (zones)
// /plan?s=squat                               (avant un exercice précis)

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];

export function serializeSession(input: SessionInput): string {
  const p = new URLSearchParams();
  if (input.zones?.length) p.set("z", input.zones.join(","));
  else p.set("s", input.lifts.join(","));
  if (input.pain.length) p.set("p", input.pain.join(","));
  if (input.band) p.set("e", "1");
  if (input.short) p.set("c", "1");
  if (input.variant) p.set("v", String(input.variant));
  return p.toString();
}

export function parseSession(params: Record<string, string | string[] | undefined>): SessionInput {
  const str = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const lifts = str("s").split(",").filter((id) => id in LIFTS_BY_ID).slice(0, 8);
  const zones = str("z").split(",").filter((z): z is MuscleGroup => (ZONE_ORDER as string[]).includes(z));
  const kg = Number(str("kg").replace(",", "."));
  const reps = Number(str("r"));
  return {
    zones,
    lifts,
    workWeight: kg > 0 && kg < 600 ? kg : undefined,
    workReps: reps >= 1 && reps <= 15 ? reps : 8,
    pain: str("p").split(",").filter((z): z is BodyZone => (ZONES as string[]).includes(z)),
    band: str("e") === "1",
    short: str("c") === "1",
    variant: Math.max(0, Math.floor(Number(str("v")) || 0)) % 1000,
  };
}

export function liftLoadingLabel(loading: LiftLoading) {
  return { barre: "barre", halteres: "par haltère", machine: "machine", "poids-du-corps": "poids du corps" }[loading];
}
