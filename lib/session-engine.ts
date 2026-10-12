// Moteur d'échauffement par séance.
//
// Entrée : les exercices que la personne va faire aujourd'hui, dans l'ordre.
// Sortie : un échauffement en quatre temps, inspiré du protocole RAMP
// (Raise, Activate & Mobilise, Potentiate) :
//   1. Mise en route   — 2 min de cardio léger (sauf version courte)
//   2. Mobilité        — les articulations que CES exercices exigent
//   3. Activation      — les stabilisateurs que CES exercices sollicitent
//   4. Séries d'approche — montée en charge complète sur le 1er exercice,
//                          rappel court sur les suivants
//
// Le choix des exercices de préparation est un glouton sur une carte
// d'exigences (PrepFocus → poids) : chaque exercice retenu « consomme » une
// part des exigences qu'il couvre, ce qui force la diversité sans règle ad hoc.

import { exercises, type BodyZone, type Exercise, type PrepFocus } from "@/lib/warmup-data";
import { LIFTS_BY_ID, type Lift, type LiftLoading } from "@/lib/lifts";
import { computeApproachSets, formatKg, type ApproachExercise } from "@/lib/approach-sets";

export interface SessionInput {
  /** Identifiants d'exercices de séance, dans l'ordre de la séance. */
  lifts: string[];
  /** Charge de la première série de travail du 1er exercice, en kg. */
  workWeight?: number;
  /** Répétitions de cette série. */
  workReps: number;
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

const PAIN_FOCUS: Record<BodyZone, PrepFocus[]> = {
  epaule: ["rotator-cuff", "scapula"],
  coudes: ["elbow-tendon"],
  poignets: ["wrist-forearm"],
  "bas-du-dos": ["lumbar", "core"],
  hanches: ["hip"],
  genou: ["knee-control"],
  chevilles: ["ankle"],
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

const NEEDS_PATTERN: Record<string, string> = { "prep-tractions-scapulaires": "pull-v" };

type Demand = Partial<Record<PrepFocus, number>>;

function sessionDemand(lifts: Lift[]): Demand {
  const d: Demand = {};
  lifts.forEach((lift, i) => {
    const position = i === 0 ? 1 : i === 1 ? 0.7 : 0.5;
    const isolation = lift.pattern.startsWith("iso") ? 0.5 : 1;
    for (const [focus, w] of Object.entries(lift.demands) as [PrepFocus, number][]) {
      d[focus] = (d[focus] ?? 0) + w * position * isolation;
    }
  });
  return d;
}

// Qualités que chaque phase sait préparer. Le gainage ou les fessiers ne se
// « mobilisent » pas ; la cheville ou les ischios ne s'« activent » pas avant
// un squat — sans ce filtre, un exercice lombaire passait devant la cheville.
const PHASE_FOCI: Record<"mobility" | "activation", Set<PrepFocus>> = {
  mobility: new Set(["ankle", "hip", "thoracic", "hamstrings", "overhead", "lumbar", "wrist-forearm", "scapula", "knee-control"]),
  activation: new Set(["rotator-cuff", "scapula", "glutes", "core", "knee-control", "lumbar", "elbow-tendon", "wrist-forearm", "overhead"]),
};

function coverageOf(ex: Exercise, d: Demand, phase: "mobility" | "activation") {
  const foci = PHASE_FOCI[phase];
  return (ex.prepFocus ?? []).reduce((s, f) => s + (foci.has(f) ? d[f] ?? 0 : 0), 0);
}

function scoreOf(ex: Exercise, d: Demand, phase: "mobility" | "activation", input: SessionInput) {
  const coverage = coverageOf(ex, d, phase);
  const value = 0.4 * ((ex.trainingValue ?? 3) - 3);
  // Préférer ce qui se fait vraiment avec le matériel présent.
  const substitution = ex.equipment === "elastique" && !input.band ? -1 : 0;
  // Exercice conçu pour une zone déclarée douloureuse : prioritaire.
  const therapeutic = ex.therapeutic && input.pain.includes(ex.therapeutic) ? 2 : 0;
  return coverage + value + substitution + therapeutic;
}

function hasRole(ex: Exercise, phase: "mobility" | "activation") {
  const roles = ex.prepRoles ?? [];
  return phase === "mobility"
    ? roles.includes("mobility")
    : roles.some((r) => r === "activation" || r === "stability" || r === "core-bracing" || r === "posterior-chain");
}

function liftsDriving(ex: Exercise, lifts: Lift[]) {
  const names = lifts
    .map((l) => ({ l, s: (ex.prepFocus ?? []).reduce((acc, f) => acc + (l.demands[f] ?? 0), 0) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map((x) => x.l.name);
  return names;
}

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

function fullRamp(lift: Lift, input: SessionInput): RampLine[] {
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
    workReps: input.workReps,
    barWeight: 20,
  });
  return sets.map((s) => ({
    load: s.emptyBar ? "Barre seule" : known ? formatKg(s.weight) : `${s.percent} %`,
    reps: s.reps,
    plates: known && lift.loading === "barre" && !s.emptyBar ? s.platesPerSide : undefined,
    restSeconds: s.restSeconds,
  }));
}

function reminderRamp(lift: Lift, patternDone: boolean): RampLine[] {
  if (lift.loading === "poids-du-corps") return [{ load: "Amplitude réduite", reps: 5, restSeconds: 60 }];
  return patternDone
    ? [{ load: "≈ 60 %", reps: 5, restSeconds: 60 }]
    : [
        { load: "≈ 50 %", reps: 8, restSeconds: 45 },
        { load: "≈ 75 %", reps: 3, restSeconds: 60 },
      ];
}

export function buildSessionPlan(input: SessionInput): SessionPlan {
  const lifts = input.lifts.map((id) => LIFTS_BY_ID[id]).filter((l): l is Lift => Boolean(l));
  const demand = sessionDemand(lifts);
  for (const zone of input.pain) {
    for (const f of PAIN_FOCUS[zone]) demand[f] = (demand[f] ?? 0) + 2;
  }

  const used = new Set<string>();
  const usedMovement = new Set<string>();
  const eligible = (ex: Exercise, forPain?: BodyZone) => {
    if (used.has(ex.id)) return false;
    const movement = movementOf(ex);
    if (movement && usedMovement.has(movement)) return false;
    if (ex.contraindications.some((z) => input.pain.includes(z))) return false;
    if (ex.equipment === "elastique" && !input.band && !ex.fallback) return false;
    if (ex.equipment === "haltere" || ex.equipment === "poulie") return false; // pas de matériel à aller chercher
    const supportsDeclaredPain = (ex.painSupport ?? []).some((z) => input.pain.includes(z));
    if (STATIC_STRETCH.test(ex.id) && !forPain) return false;
    const pattern = NEEDS_PATTERN[ex.id];
    if (pattern && !lifts.some((l) => l.pattern === pattern)) return false;
    if ((ex.trainingValue ?? 3) <= 1 && !supportsDeclaredPain) return false;
    if (forPain && !(ex.painSupport ?? []).includes(forPain)) return false;
    return true;
  };
  // Une carte d'exigences par phase : la mobilité des omoplates ne doit pas
  // épuiser le besoin d'activer ces mêmes omoplates avant des tractions.
  const remaining: Record<"mobility" | "activation", Demand> = { mobility: { ...demand }, activation: { ...demand } };
  const take = (ex: Exercise, phases: ("mobility" | "activation")[]) => {
    used.add(ex.id);
    const movement = movementOf(ex);
    if (movement) usedMovement.add(movement);
    for (const phase of phases) {
      for (const f of ex.prepFocus ?? []) remaining[phase][f] = (remaining[phase][f] ?? 0) * 0.4;
    }
  };
  // Variation : les candidats à au moins 80 % du meilleur score sont tous de
  // bons choix ; la variante désigne lequel. Déterministe, donc un lien
  // partagé redonne toujours le même plan.
  let pick = 0;
  const best = (pool: Exercise[], phase: "mobility" | "activation") => {
    const scored = pool
      .map((ex) => ({ ex, score: scoreOf(ex, remaining[phase], phase, input) }))
      .sort((a, b) => b.score - a.score || a.ex.id.localeCompare(b.ex.id));
    if (!scored.length) return undefined;
    const top = scored[0].score;
    // Écart relatif au meilleur (un score peut être négatif : pénalités).
    const close = scored.filter((c) => c.score >= top - Math.abs(top) * 0.2);
    const v = input.variant ?? 0;
    pick++;
    return close[v === 0 ? 0 : (v * 7 + pick * 13) % close.length].ex;
  };

  const mobility: PrepStep[] = [];
  const activation: PrepStep[] = [];

  // 1. Une préparation dédiée par zone douloureuse (deux zones au plus).
  for (const zone of input.pain.slice(0, 2)) {
    const pool = exercises.filter((e) => eligible(e, zone));
    const phase = PAIN_FOCUS[zone].some((f) => PHASE_FOCI.activation.has(f)) ? "activation" : "mobility";
    const ex = best(pool, phase);
    if (!ex) continue;
    take(ex, ["mobility", "activation"]);
    const step = toStep(ex, input, `${PAIN_LABELS[zone]} sensible`);
    (hasRole(ex, "activation") ? activation : mobility).push(step);
  }

  // 2. Complément selon les exigences de la séance.
  const fill = (target: PrepStep[], phase: "mobility" | "activation", count: number) => {
    while (target.length < count) {
      // Seuil sur la pertinence seule : la qualité intrinsèque d'un exercice ne
      // doit pas suffire à le faire entrer dans une séance qui n'en a pas
      // besoin. Le premier de chaque phase passe dès qu'il sert un peu, pour
      // qu'une séance d'isolation ait quand même sa mobilité et son activation.
      const threshold = target.length ? 1.5 : 0.1;
      const ex = best(
        exercises.filter((e) => eligible(e) && hasRole(e, phase) && coverageOf(e, remaining[phase], phase) >= threshold),
        phase,
      );
      if (!ex) break;
      take(ex, [phase]);
      const drivers = liftsDriving(ex, lifts);
      target.push(toStep(ex, input, drivers.length ? `Pour : ${drivers.join(", ")}` : "Préparation générale"));
    }
  };
  fill(mobility, "mobility", input.short ? 2 : 3);
  fill(activation, "activation", input.short ? 1 : 2);

  // 3. Séries d'approche.
  const ramps: RampStep[] = [];
  const patterns = new Set<string>();
  let isolationNoted = false;
  lifts.forEach((lift, i) => {
    const isolation = lift.pattern.startsWith("iso");
    if (i === 0) {
      ramps.push({
        kind: "ramp",
        lift,
        lines: fullRamp(lift, input),
        full: true,
        note:
          input.workWeight && input.workWeight > 0
            ? undefined
            : lift.loading === "poids-du-corps"
            ? undefined
            : "Pourcentages de ta charge de travail. Indique-la pour obtenir les poids exacts.",
      });
      patterns.add(lift.pattern);
      return;
    }
    if (isolation) {
      if (!isolationNoted) {
        isolationNoted = true;
        ramps.push({
          kind: "ramp",
          lift,
          lines: [{ load: "Léger", reps: 12, restSeconds: 45 }],
          full: false,
          note: "Pour les exercices d'isolation, une série légère avant la première série de travail suffit.",
        });
      }
      return;
    }
    ramps.push({ kind: "ramp", lift, lines: reminderRamp(lift, patterns.has(lift.pattern)), full: false });
    patterns.add(lift.pattern);
  });

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

  const topFoci = (steps: PrepStep[]) =>
    [...new Set(steps.flatMap((s) => s.exercise.prepFocus ?? []))].slice(0, 3).map((f) => FOCUS_LABELS[f]);
  if (mobility.length) {
    phases.push({
      key: "mobility",
      title: "Mobilité",
      why: `Ouvrir les amplitudes que ta séance va demander : ${topFoci(mobility).join(", ")}.`,
      steps: mobility,
    });
  }
  if (activation.length) {
    phases.push({
      key: "activation",
      title: "Activation",
      why: `Réveiller les muscles qui stabilisent tes mouvements : ${topFoci(activation).join(", ")}.`,
      steps: activation,
    });
  }
  if (ramps.length) {
    phases.push({
      key: "ramp",
      title: "Séries d'approche",
      why: "Répéter le geste exact en montant la charge, pour arriver prêt sur ta première vraie série.",
      steps: ramps,
    });
  }

  // Durée : exercices + ~30 s d'effort par série d'approche, repos compris
  // uniquement pour la montée du 1er exercice (les rappels se font en séance).
  const prepSeconds = phases
    .flatMap((p) => p.steps)
    .reduce((s, st) => s + (st.kind === "ramp" ? 0 : st.seconds), 0);
  const first = ramps.find((r) => r.full);
  const rampSeconds = first ? first.lines.reduce((s, l) => s + 30 + l.restSeconds, 0) : 0;

  const warnings: PlanWarning[] = input.pain.flatMap((zone) => {
    const stressing = lifts.filter((l) => l.stress.includes(zone));
    if (!stressing.length) return [];
    const guide = stressing.find((l) => l.painGuide?.zone === zone)?.painGuide?.href;
    return [
      {
        zone,
        text: `${PAIN_LABELS[zone]} sensible et ${stressing.map((l) => l.name.toLowerCase()).join(", ")} : la douleur doit rester sous 3 sur 10 pendant les séries d'approche. Si elle augmente d'une série à l'autre, arrête la montée et garde la charge où elle était confortable.`,
        href: guide ?? PROTECTION_HREF[zone] ?? "/douleur",
      },
    ];
  });

  return {
    lifts,
    phases,
    minutes: Math.max(1, Math.round((prepSeconds + rampSeconds) / 60)),
    warnings,
  };
}

// ── URL ────────────────────────────────────────────────────────────
// /plan?s=squat,presse&kg=100&r=5&p=genou&e=1&c=1

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];

export function serializeSession(input: SessionInput): string {
  const p = new URLSearchParams();
  p.set("s", input.lifts.join(","));
  if (input.workWeight && input.workWeight > 0) p.set("kg", String(input.workWeight));
  p.set("r", String(input.workReps));
  if (input.pain.length) p.set("p", input.pain.join(","));
  if (input.band) p.set("e", "1");
  if (input.short) p.set("c", "1");
  if (input.variant) p.set("v", String(input.variant));
  return p.toString();
}

export function parseSession(params: Record<string, string | string[] | undefined>): SessionInput {
  const str = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const lifts = str("s").split(",").filter((id) => id in LIFTS_BY_ID).slice(0, 8);
  const kg = Number(str("kg").replace(",", "."));
  const reps = Number(str("r"));
  return {
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
