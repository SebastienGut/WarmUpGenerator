import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Échauffements pour zones sensibles, Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "Zones sensibles",
    title: "Une articulation qui gêne ?",
    subtitle: "Épaule, genou, bas du dos, poignets : l'échauffement adapté.",
    tone: "black",
  });
}
