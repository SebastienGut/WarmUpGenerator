import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Warmup — un échauffement musculation construit sur les exercices de ta séance";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return createOgCard({
    eyebrow: "Échauffement musculation",
    title: "Ton échauffement, calé sur ta séance.",
    subtitle: "Mobilité, activation et séries d'approche calculées pour les exercices du jour.",
  });
}
