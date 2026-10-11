// Pont entre les pages SEO (raisonnées par muscle) et le moteur par séance
// (raisonné par exercice). Chaque muscle est représenté par les exercices de
// séance qui le travaillent le plus souvent en salle : le plan affiché sur la
// page est exactement celui que le générateur produirait pour cette séance.

import type { BodyZone, MuscleGroup, Objective } from "@/lib/warmup-data";
import { buildSessionPlan, serializeSession, type PrepStep } from "@/lib/session-engine";

export const MUSCLE_LIFTS: Record<MuscleGroup, string[]> = {
  pecs: ["developpe-couche", "developpe-incline", "ecartes"],
  dos: ["tractions", "rowing-barre", "tirage-horizontal"],
  epaules: ["developpe-militaire", "elevations-laterales"],
  jambes: ["squat", "presse", "leg-curl"],
  fessiers: ["hip-thrust", "souleve-roumain", "fentes"],
  bras: ["curl-biceps", "triceps"],
  core: ["souleve-de-terre", "squat"],
};

/** Répétitions de travail typiques par objectif : c'est ce qui module la
 * montée en charge dans le nouveau moteur. */
const OBJECTIVE_REPS: Record<Objective, number> = { force: 5, hypertrophie: 10, reprise: 12, mobilite: 12 };

export interface SeoPlan {
  exercises: { name: string; description: string; durationSeconds: number; reps?: string }[];
  minutes: number;
  planHref: string;
}

export function seoPlanFor(lifts: string[], objective: Objective = "hypertrophie", pain: BodyZone[] = []): SeoPlan {
  const input = {
    lifts,
    workReps: OBJECTIVE_REPS[objective],
    pain,
    band: false,
    // Reprise : version courte, on n'empile pas les exercices.
    short: objective === "reprise",
  };
  const plan = buildSessionPlan(input);
  const prep = plan.phases
    .filter((p) => p.key === "mobility" || p.key === "activation")
    .flatMap((p) => p.steps)
    .filter((s): s is PrepStep => s.kind === "prep");
  return {
    exercises: prep.map((s) => ({
      name: s.exercise.name,
      description: s.instructions,
      durationSeconds: s.seconds,
      reps: s.reps,
    })),
    minutes: plan.minutes,
    planHref: `/plan?${serializeSession(input)}`,
  };
}
