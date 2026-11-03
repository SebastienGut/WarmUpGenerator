// Calcul des séries d'approche (montée en charge avant la première série de
// travail). Logique pure, partagée par le calculateur client et par les
// tableaux d'exemple rendus côté serveur — les exemples statiques sont donc
// toujours identiques à ce que l'outil produit.

export type ApproachExercise =
  | "squat"
  | "developpe-couche"
  | "souleve-de-terre"
  | "developpe-militaire"
  | "rowing-barre"
  | "halteres"
  | "machine";

export interface ApproachInput {
  exercise: ApproachExercise;
  /** Charge de la première série de travail, en kg (barre comprise). */
  workWeight: number;
  /** Répétitions prévues sur la série de travail. */
  workReps: number;
  /** Poids de la barre, en kg. Ignoré pour les haltères. */
  barWeight: number;
  /** Exercice qui suit un autre exercice pour les mêmes muscles : montée courte. */
  alreadyWarm?: boolean;
}

export interface ApproachSet {
  weight: number;
  reps: number;
  /** Pourcentage réel de la charge de travail, après arrondi. */
  percent: number;
  /** Disques à charger de chaque côté, du plus lourd au plus léger. */
  platesPerSide: number[];
  restSeconds: number;
  /** Série à la barre seule. */
  emptyBar: boolean;
}

export const EXERCISE_LABELS: Record<ApproachExercise, string> = {
  squat: "Squat",
  "developpe-couche": "Développé couché",
  "souleve-de-terre": "Soulevé de terre",
  "developpe-militaire": "Développé militaire",
  "rowing-barre": "Rowing barre",
  halteres: "Haltères (tout exercice)",
  machine: "Machine / poulie",
};

const PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];

/**
 * Montée en charge, selon les principes partagés par la littérature et les
 * entraîneurs de force :
 *  - la dernière série d'approche est lourde (80 à 90 % de la charge de travail) :
 *    c'est elle qui prépare le mieux la performance (Sousa et al. 2024, Ribeiro et
 *    al. 2020, synthèse Stronger by Science « heavier warm-ups ») ;
 *  - entre la barre et ce dernier palier, des sauts réguliers et limités (20 kg ou
 *    20 % de la charge au plus), donc plus de paliers quand la charge est lourde ;
 *  - des répétitions qui baissent à mesure que la charge monte, loin de l'échec :
 *    on prépare le geste et le système nerveux sans entamer la série qui compte ;
 *  - un exercice déjà échauffé par le précédent n'a besoin que de deux paliers.
 */
function topFor(workReps: number): { pct: number; reps: number } {
  if (workReps <= 3) return { pct: 0.9, reps: 1 };
  if (workReps <= 6) return { pct: 0.85, reps: 2 };
  if (workReps <= 10) return { pct: 0.8, reps: 3 };
  return { pct: 0.75, reps: 4 };
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function platesPerSide(weight: number, barWeight: number): number[] {
  let remaining = Math.max(0, (weight - barWeight) / 2);
  const out: number[] = [];
  for (const p of PLATES) {
    while (remaining >= p - 1e-9) {
      out.push(p);
      remaining = Math.round((remaining - p) * 100) / 100;
    }
  }
  return out;
}

export function computeApproachSets(input: ApproachInput): ApproachSet[] {
  const machine = input.exercise === "machine";
  // Haltères et machines : pas de barre ni de disques à afficher.
  const dumbbells = input.exercise === "halteres" || machine;
  const deadlift = input.exercise === "souleve-de-terre";
  const bar = dumbbells ? 0 : input.barWeight;
  // Une paire de 1,25 kg à la barre ; les haltères vont en général de 2 en 2.
  const step = machine ? 5 : dumbbells ? 2 : 2.5;
  const work = input.workWeight;
  if (!Number.isFinite(work) || work <= 0) return [];

  const { pct: topPct, reps: topReps } = topFor(input.workReps);
  const top = roundTo(work * topPct, step);
  const sets: ApproachSet[] = [];
  const push = (weight: number, reps: number, emptyBar: boolean) => {
    if (weight >= work || (sets.length && weight <= sets[sets.length - 1].weight)) return;
    sets.push({ weight, reps, percent: Math.round((weight / work) * 100), platesPerSide: dumbbells ? [] : platesPerSide(weight, bar), restSeconds: 0, emptyBar });
  };

  // Point de départ : la barre seule pour répéter le geste (pas au soulevé de terre,
  // trop bas sans disques : on part de deux disques de 20, hauteur standard).
  const emptyBarSet = !dumbbells && !deadlift && !input.alreadyWarm && bar > 0 && bar <= work * 0.5;
  let from: number;
  if (emptyBarSet) {
    push(bar, input.workReps >= 8 ? 10 : 8, true);
    from = bar;
  } else if (deadlift && !input.alreadyWarm) {
    from = Math.min(Math.max(bar + 40, roundTo(work * 0.4, step)), top);
  } else {
    from = roundTo(work * (input.alreadyWarm ? 0.6 : 0.5), step);
  }

  // Paliers réguliers jusqu'au dernier palier lourd.
  const maxJump = Math.max(20, work * 0.2);
  const first = emptyBarSet ? from + Math.min(maxJump, (top - from) / 2) : from;
  const loaded = input.alreadyWarm ? 2 : Math.min(4, Math.max(2, Math.ceil((top - first) / maxJump) + 1));
  const reps0 = Math.max(input.workReps >= 8 ? 8 : 5, topReps + 1);
  for (let k = 0; k < loaded; k++) {
    const t = loaded === 1 ? 1 : k / (loaded - 1);
    const w = roundTo(first + (top - first) * t, step);
    const reps = Math.round(reps0 + (topReps - reps0) * t);
    push(Math.max(w, dumbbells ? step : bar), reps, !dumbbells && w === bar);
  }

  // Repos : presque rien sur les paliers légers, davantage en approchant de la charge,
  // et 2 à 3 minutes avant la série de travail.
  return sets.map((s, i) => {
    const last = i === sets.length - 1;
    const restSeconds = last ? (input.workReps <= 6 ? 180 : 120) : s.percent >= 75 ? 90 : s.percent >= 55 ? 60 : 30;
    return { ...s, restSeconds };
  });
}

export function formatKg(weight: number) {
  return `${frNumber(weight)} kg`;
}

export function formatPlates(plates: number[]) {
  if (plates.length === 0) return "—";
  return plates.map(frNumber).join(" + ");
}

function frNumber(n: number) {
  return String(Math.round(n * 100) / 100).replace(".", ",");
}
