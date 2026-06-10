import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";
import { MUSCLE_LABELS, OBJECTIVE_LABELS, type MuscleGroup, type Objective } from "@/lib/warmup-data";

export const runtime = "edge";
export const alt = "Échauffement musculation — Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ImageProps {
  params: Promise<{ muscle: string; objectif: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { muscle, objectif } = await params;
  const muscleLabel = MUSCLE_LABELS[muscle as MuscleGroup] ?? "Musculation";
  const objectiveLabel = OBJECTIVE_LABELS[objectif as Objective] ?? "";

  return createOgCard({
    eyebrow: `ÉCHAUFFEMENT ${objectiveLabel.toUpperCase()}`,
    title: `Échauffement ${muscleLabel}`,
    subtitle: "Plan gratuit : mobilisation articulaire + activation musculaire, exercice par exercice.",
  });
}
