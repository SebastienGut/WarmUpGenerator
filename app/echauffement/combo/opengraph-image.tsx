import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "Echauffements par groupe musculaire - Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "GUIDES PAR GROUPE",
    title: "Haut, bas, full body",
    subtitle: "Des protocoles courts pour push, pull, jambes, haut du corps et full body.",
  });
}
