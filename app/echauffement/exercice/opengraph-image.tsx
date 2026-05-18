import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "Echauffements par exercice - Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "GUIDES PAR EXERCICE",
    title: "Prepare ton mouvement",
    subtitle: "Squat, developpe couche, souleve de terre, tractions et autres exercices lourds.",
  });
}
