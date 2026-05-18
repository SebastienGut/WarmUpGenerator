import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "Echauffement musculation - Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "ECHAUFFEMENT MUSCULATION",
    title: "Tous les plans",
    subtitle: "Exercices, groupes musculaires et zones sensibles pour preparer ta seance.",
  });
}
