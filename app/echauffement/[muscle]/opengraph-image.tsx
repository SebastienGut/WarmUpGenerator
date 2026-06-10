import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";
import { MUSCLE_LABELS, type MuscleGroup } from "@/lib/warmup-data";

export const runtime = "edge";
export const alt = "Échauffement musculation — Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ImageProps {
  params: Promise<{ muscle: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { muscle } = await params;
  const muscleLabel = MUSCLE_LABELS[muscle as MuscleGroup] ?? "Musculation";

  return createOgCard({
    eyebrow: "GUIDE COMPLET",
    title: `Échauffement ${muscleLabel}`,
    subtitle: "Plan gratuit : mobilisation + activation, exercice par exercice. Sans inscription.",
  });
}
