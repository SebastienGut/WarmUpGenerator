import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Échauffement musculation, Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "Échauffement musculation",
    title: "Tous les échauffements",
    subtitle: "Par séance, par zone ou par exercice, prêts à suivre.",
    tone: "black",
  });
}
