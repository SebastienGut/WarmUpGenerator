import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Échauffements par exercice, Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "Guides par exercice",
    title: "Prépare ton premier exercice",
    subtitle: "Squat, développé couché, soulevé de terre, tractions, rowing, militaire.",
    tone: "red",
  });
}
