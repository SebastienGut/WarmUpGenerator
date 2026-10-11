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

/** Paliers [pourcentage, répétitions] selon le nombre de reps de travail.
 * Plus la série de travail est lourde, plus la montée est longue et plus les
 * répétitions d'approche sont courtes : on prépare le système nerveux à la
 * charge sans entamer la fatigue avant la série qui compte. */
function rampFor(workReps: number): [number, number][] {
  if (workReps <= 3) return [[0.4, 5], [0.6, 3], [0.75, 2], [0.85, 1], [0.92, 1]];
  if (workReps <= 6) return [[0.4, 5], [0.6, 3], [0.75, 2], [0.85, 1]];
  if (workReps <= 10) return [[0.5, 8], [0.7, 4], [0.85, 2]];
  return [[0.5, 10], [0.75, 4]];
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
  const bar = dumbbells ? 0 : input.barWeight;
  // Une paire de 1,25 kg à la barre ; les haltères vont en général de 2 en 2.
  const step = machine ? 5 : dumbbells ? 2 : 2.5;
  const work = input.workWeight;
  if (!Number.isFinite(work) || work <= 0) return [];

  const sets: ApproachSet[] = [];
  const push = (weight: number, reps: number, emptyBar: boolean) => {
    sets.push({
      weight,
      reps,
      percent: Math.round((weight / work) * 100),
      platesPerSide: dumbbells ? [] : platesPerSide(weight, bar),
      restSeconds: 0,
      emptyBar,
    });
  };

  // Barre seule : utile tant qu'elle reste nettement sous le premier palier.
  // Pas au soulevé de terre — la barre nue est trop basse pour une position
  // de départ correcte, on commence avec des disques.
  const ramp = rampFor(input.workReps);
  if (!dumbbells && input.exercise !== "souleve-de-terre" && bar > 0 && bar <= work * 0.45) {
    push(bar, 10, true);
  }

  for (const [pct, reps] of ramp) {
    const minimum = dumbbells ? step : input.exercise === "souleve-de-terre" ? bar + 2 * 10 : bar;
    const w = Math.max(roundTo(work * pct, step), minimum);
    if (w >= work) continue;
    const prev = sets.at(-1);
    // Deux paliers trop proches n'apportent rien et fatiguent : on fusionne.
    if (prev && w - prev.weight < Math.max(2 * step, work * 0.05)) continue;
    push(w, reps, !dumbbells && w === bar);
  }

  // Repos : court au début, plus long à l'approche de la charge réelle.
  return sets.map((s, i) => ({
    ...s,
    restSeconds: s.percent >= 80 || i === sets.length - 1 ? 90 : s.percent >= 60 ? 60 : 45,
  }));
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
