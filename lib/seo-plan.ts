// Pont entre les pages SEO (par muscle) et le générateur : le plan affiché sur
// une page « échauffement pectoraux » est exactement celui que l'outil produit
// quand on choisit la zone Pecs.

import type { BodyZone, MuscleGroup, Objective } from "@/lib/warmup-data";
import { buildSessionPlan, serializeSession, type PrepStep, type SessionInput } from "@/lib/session-engine";

export interface SeoPlan {
  exercises: { name: string; description: string; durationSeconds: number; reps?: string }[];
  minutes: number;
  planHref: string;
}

export function seoPlanFor(zones: MuscleGroup[], objective: Objective = "hypertrophie", pain: BodyZone[] = []): SeoPlan {
  const input: SessionInput = {
    zones,
    lifts: [],
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
