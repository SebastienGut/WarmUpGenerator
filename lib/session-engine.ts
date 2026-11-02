// Moteur d'échauffement (v3, docs/brief-moteur-v3.md).
//
// Une courte préparation articulaire et musculaire, à faire AVANT les séries
// d'approche du premier exercice : mobilité utile, contrôle, sollicitation
// légère, sans fatigue. Pas de cardio : la personne n'a pas besoin de l'outil
// pour ça.
//
//   séance type (Push, Pull…) → sa routine de référence (lib/routines.ts)
//   « Mes zones »             → bases des zones, mises en commun et ordonnées
//   puis                        variantes selon le matériel (lib/bank.ts),
//                               zones sensibles, version courte, ↻ Varier.
//
// Les séries d'approche sont un outil à part (buildRampPlan, /series-approche).

import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";
import { LIFTS_BY_ID, SESSION_TEMPLATES, ZONE_LIFTS, ZONE_ORDER, zonesLabel, sessionLabel, type Lift, type LiftLoading } from "@/lib/lifts";
import { computeApproachSets, formatKg, type ApproachExercise } from "@/lib/approach-sets";
import { BANK, type BankExercise, type BankPosition, type Equipment, type Variant } from "@/lib/bank";
import { ALTERNATIVES, MAX_STEPS, SHORT_STEPS, TEMPLATE_ROUTINES, ZONE_BASES, type RoutineEntry } from "@/lib/routines";

export type { Equipment } from "@/lib/bank";

export interface SessionInput {
  /** Zones à échauffer (cas principal : séance type ou choix libre). */
  zones?: MuscleGroup[];
  /** Séance type choisie (push, pull, legs, haut, bas, full) : sa routine de référence. */
  template?: string;
  /** Ou bien un exercice précis (anciennes pages « échauffement avant le squat »). */
  lifts: string[];
  /** Charge de la première série de travail du 1er exercice, en kg. */
  workWeight?: number;
  /** Répétitions de cette série (séries d'approche uniquement). */
  workReps?: number;
  pain: BodyZone[];
  /** Matériel disponible ; « salle » par défaut. */
  equipment?: Equipment;
  /** Ancien réglage (URL e=1) : un élastique est disponible. */
  band: boolean;
  /** Version courte : quatre exercices au plus. */
  short: boolean;
  /** Variante : 0 = la routine de référence ; au-delà, remplacements de même fonction. */
  variant?: number;
}

/** Ce que l'interface affiche d'un exercice. */
export interface PrepExercise {
  /** Identifiant du pictogramme (lib/figures.ts). */
  id: string;
  /** Identifiant dans la banque (lib/bank.ts). */
  bankId: string;
  name: string;
  equipment: Equipment;
  needs?: string;
}

export interface PrepStep {
  kind: "prep";
  exercise: PrepExercise;
  instructions: string;
  /** La variante prévue n'existe pas avec ce matériel : exercice de remplacement. */
  substituted: boolean;
  /** Exercice prévu par la routine, quand celui-ci le remplace. */
  replaces?: string;
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
  /** Nom de l'échauffement : « Push », « Pecs + Dos »… */
  title: string;
  lifts: Lift[];
  phases: PlanPhase[];
  minutes: number;
  warnings: PlanWarning[];
  /** Matériel retenu pour les variantes. */
  equipment: Equipment;
}

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

function rampExerciseFor(lift: Lift): ApproachExercise {
  if (lift.loading === "halteres") return "halteres";
  if (lift.loading === "machine") return "machine";
  return lift.id === "souleve-de-terre" ? "souleve-de-terre" : "squat";
}

function fullRamp(lift: Lift, input: Pick<SessionInput, "workWeight" | "workReps">, barWeight = 20): RampLine[] {
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

// ── Composition ─────────────────────────────────────────────────────

/** Niveau de chaque position : debout (ou en appui sur un banc) contre au sol. */
const LEVEL: Record<BankPosition, number> = { debout: 0, appui: 0, quadrupedie: 1, sol: 1 };

/** Zones d'un exercice de séance (anciens liens « échauffement avant le squat »). */
function zonesOfLifts(lifts: Lift[]): MuscleGroup[] {
  return ZONE_ORDER.filter((z) => lifts.some((l) => ZONE_LIFTS[z].includes(l.id)));
}

/** Séance type dont les zones correspondent exactement (anciens liens et landings). */
export function templateForZones(zones: MuscleGroup[]): string | undefined {
  const key = [...zones].sort().join(",");
  return SESSION_TEMPLATES.find((t) => [...t.zones].sort().join(",") === key)?.id;
}

/**
 * « Mes zones » : les bases de chaque zone mises en commun. Un exercice partagé
 * par plusieurs zones n'apparaît qu'une fois et passe devant ; ensuite chaque
 * zone reçoit à tour de rôle son exercice suivant, jusqu'au plafond, pour
 * qu'aucune zone choisie ne reste sans préparation. Les exercices sans variante
 * pour ce matériel sont écartés avant, pour ne pas gaspiller une place.
 */
function composeZones(zones: MuscleGroup[], equipment: Equipment, cap: number): RoutineEntry[] {
  const target = (id: string) => resolve(id, equipment, new Set())?.ex.id;
  const bases = zones.map((z) => ZONE_BASES[z].filter((en) => target(en.id)));
  const count = new Map<string, number>();
  for (const b of bases) for (const en of b) count.set(target(en.id)!, (count.get(target(en.id)!) ?? 0) + 1);
  const picked: RoutineEntry[] = [];
  const has = (id: string) => picked.some((p) => target(p.id) === target(id));
  // Tour par tour, chaque zone pas encore servie à ce niveau prend son prochain
  // exercice, en préférant celui qui sert aussi d'autres zones choisies.
  for (let round = 0; picked.length < cap && round < 4; round++) {
    for (const b of bases) {
      if (picked.length >= cap || b.filter((en) => has(en.id)).length > round) continue;
      const next = b
        .map((en, rank) => ({ en, rank }))
        .filter(({ en }) => !has(en.id))
        .sort((x, y) => count.get(target(y.en.id)!)! - count.get(target(x.en.id)!)! || x.rank - y.rank)[0];
      if (next) picked.push(next.en);
    }
  }
  // Ordre d'exécution : mobilité puis activation ; la mobilité commence debout et
  // descend au sol, l'activation repart du sol et finit debout.
  const phaseOf = (id: string) => BANK[target(id)!].phase;
  const levelOf = (id: string) => LEVEL[BANK[target(id)!].position];
  return picked.sort((a, b) => {
    const pa = phaseOf(a.id) === "mobility" ? 0 : 1;
    const pb = phaseOf(b.id) === "mobility" ? 0 : 1;
    if (pa !== pb) return pa - pb;
    return pa === 0 ? levelOf(a.id) - levelOf(b.id) : levelOf(b.id) - levelOf(a.id);
  });
}

/** Nom de l'exercice prévu, dans sa version de salle (« Face pull à la corde… »). */
function plannedName(id: string): string {
  const v = BANK[id]?.variants.gym;
  return typeof v === "object" && v ? v.name : id;
}

/** Variante de l'exercice selon le matériel ; remplacement honnête ou retrait. */
function resolve(id: string, equipment: Equipment, seen: Set<string>): { ex: BankExercise; v: Variant; substituted: boolean } | null {
  let ex = BANK[id];
  let substituted = false;
  for (let hop = 0; hop < 3 && ex; hop++) {
    const v = ex.variants[equipment];
    if (v === null) return null;
    if (typeof v === "string") {
      ex = BANK[v];
      substituted = true;
      continue;
    }
    if (seen.has(ex.id)) return null;
    return { ex, v, substituted };
  }
  return null;
}

const PHASE_TEXT = {
  mobility: { title: "Mobilité", why: "Ouvrir les amplitudes que la séance va demander, sans forcer." },
  activation: { title: "Activation", why: "Réveiller les stabilisateurs, résistance facile, sans fatigue." },
} as const;

export function buildSessionPlan(input: SessionInput): SessionPlan {
  const lifts = input.lifts.map((id) => LIFTS_BY_ID[id]).filter((l): l is Lift => Boolean(l));
  const chosenZones = (input.zones ?? []).filter((z) => z in ZONE_LIFTS);
  const byZone = chosenZones.length > 0;
  const zones = byZone ? chosenZones : zonesOfLifts(lifts);
  const template = input.template && TEMPLATE_ROUTINES[input.template] ? input.template : !byZone ? templateForZones(zones) : undefined;
  const equipment: Equipment = input.equipment ?? (input.band ? "band" : "gym");

  let entries = template ? TEMPLATE_ROUTINES[template] : composeZones(zones, equipment, input.short ? SHORT_STEPS : MAX_STEPS);
  // ↻ Varier : remplacements de même fonction, un sur deux selon la variante.
  const v = input.variant ?? 0;
  if (v) {
    let n = 0;
    entries = entries.map((en) => {
      const alt = ALTERNATIVES[en.id];
      if (!alt) return en;
      n++;
      return (v + n) % 2 === 0 && !entries.some((o) => o.id === alt) ? { id: alt } : en;
    });
  }

  const seen = new Set<string>();
  const steps: { step: PrepStep; phase: "mobility" | "activation" }[] = [];
  for (const en of entries) {
    const r = resolve(en.id, equipment, seen);
    if (!r) continue;
    if ((r.ex.avoid ?? []).some((z) => input.pain.includes(z as BodyZone))) continue;
    seen.add(r.ex.id);
    // Dose de la routine pour l'exercice prévu ; dose propre pour un remplaçant.
    const dose = !r.substituted && en.dose ? en.dose : r.ex.dose;
    steps.push({
      phase: r.ex.phase,
      step: {
        kind: "prep",
        exercise: { id: r.v.figure, bankId: r.ex.id, name: r.v.name, equipment, needs: r.v.needs },
        instructions: r.v.instructions,
        substituted: r.substituted,
        replaces: r.substituted ? plannedName(en.id) : undefined,
        reps: dose,
        seconds: r.ex.seconds,
        reason: r.ex.why,
      },
    });
  }
  const kept = input.short ? steps.slice(0, SHORT_STEPS) : steps;

  const phases: PlanPhase[] = [];
  for (const key of ["mobility", "activation"] as const) {
    const list = kept.filter((s) => s.phase === key).map((s) => s.step);
    if (list.length) phases.push({ key, title: PHASE_TEXT[key].title, why: PHASE_TEXT[key].why, steps: list });
  }

  // Durée honnête : exercices (côtés et installation compris), ~10 s entre deux
  // exercices, 15 s de plus pour descendre au sol ou se relever.
  const flat = kept.map((s) => s.step);
  const levelOf = (st: PrepStep) => LEVEL[BANK[st.exercise.bankId].position];
  const transitions = flat.reduce((s, st, i) => (i === 0 ? s : s + 10 + (levelOf(st) !== levelOf(flat[i - 1]) ? 15 : 0)), 0);
  const seconds = flat.reduce((s, st) => s + st.seconds, 0) + transitions;

  const refLifts = byZone ? [...new Set(zones.flatMap((z) => ZONE_LIFTS[z]))].map((id) => LIFTS_BY_ID[id]) : lifts;
  const warnings: PlanWarning[] = input.pain.flatMap((zone) => {
    const stressing = refLifts.filter((l) => l.stress.includes(zone));
    if (!stressing.length) return [];
    const guide = byZone ? undefined : stressing.find((l) => l.painGuide?.zone === zone)?.painGuide?.href;
    return [
      {
        zone,
        text: `${PAIN_LABELS[zone]} sensible : garde la gêne faible (sous 3 sur 10) et réduis l'amplitude plutôt que de forcer.`,
        href: guide ?? PROTECTION_HREF[zone] ?? "/douleur",
      },
    ];
  });

  const templateLabel = template ? SESSION_TEMPLATES.find((t) => t.id === template)?.label : undefined;
  return {
    title: templateLabel ?? (byZone ? zonesLabel(zones) : sessionLabel(lifts.map((l) => l.id))),
    lifts,
    phases,
    minutes: Math.max(1, Math.round(seconds / 60)),
    warnings,
    equipment,
  };
}

export function buildRampPlan(liftId: string, workWeight: number | undefined, workReps: number, barWeight = 20): SessionPlan {
  const lift = LIFTS_BY_ID[liftId];
  const lines = fullRamp(lift, { workWeight, workReps }, barWeight);
  return {
    title: lift.name,
    lifts: [lift],
    phases: [{ key: "ramp", title: "Séries d'approche", why: "", steps: [{ kind: "ramp", lift, lines, full: true }] }],
    minutes: Math.max(1, Math.round(lines.reduce((s, l) => s + 30 + l.restSeconds, 0) / 60)),
    warnings: [],
    equipment: "gym",
  };
}

// ── URL ────────────────────────────────────────────────────────────
// /plan?t=push                       (séance type)
// /plan?z=jambes,fessiers&p=genou    (mes zones)
// &m=n|e|s (matériel : sans, élastique, salle — salle par défaut) &c=1 (courte) &v=2
// Anciens liens : /plan?s=squat, e=1 (élastique).

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];
const EQ_CODE: Record<Equipment, string> = { none: "n", band: "e", gym: "s" };

export function serializeSession(input: SessionInput): string {
  const p = new URLSearchParams();
  if (input.template) p.set("t", input.template);
  else if (input.zones?.length) p.set("z", input.zones.join(","));
  else p.set("s", input.lifts.join(","));
  if (input.pain.length) p.set("p", input.pain.join(","));
  const eq = input.equipment ?? (input.band ? "band" : "gym");
  if (eq !== "gym") p.set("m", EQ_CODE[eq]);
  if (input.short) p.set("c", "1");
  if (input.variant) p.set("v", String(input.variant));
  return p.toString();
}

export function parseSession(params: Record<string, string | string[] | undefined>): SessionInput {
  const str = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const lifts = str("s").split(",").filter((id) => id in LIFTS_BY_ID).slice(0, 8);
  const zones = str("z").split(",").filter((z): z is MuscleGroup => (ZONE_ORDER as string[]).includes(z));
  const template = TEMPLATE_ROUTINES[str("t")] ? str("t") : undefined;
  const kg = Number(str("kg").replace(",", "."));
  const reps = Number(str("r"));
  const m = str("m");
  const equipment: Equipment = m === "n" ? "none" : m === "e" || str("e") === "1" ? "band" : "gym";
  const tpl = template ? SESSION_TEMPLATES.find((t) => t.id === template) : undefined;
  return {
    zones: zones.length ? zones : tpl ? [...tpl.zones] : [],
    template,
    lifts,
    workWeight: kg > 0 && kg < 600 ? kg : undefined,
    workReps: reps >= 1 && reps <= 15 ? reps : 8,
    pain: str("p").split(",").filter((z): z is BodyZone => (ZONES as string[]).includes(z)),
    equipment,
    band: equipment === "band",
    short: str("c") === "1",
    variant: Math.max(0, Math.floor(Number(str("v")) || 0)) % 1000,
  };
}

export function liftLoadingLabel(loading: LiftLoading) {
  return { barre: "barre", halteres: "par haltère", machine: "machine", "poids-du-corps": "poids du corps" }[loading];
}
