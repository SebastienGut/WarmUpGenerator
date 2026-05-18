import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "Echauffements pour zones sensibles - Warmup Generator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgCard({
    eyebrow: "ZONES SENSIBLES",
    title: "Protege tes articulations",
    subtitle: "Protocoles epaule, genou, lombaires et poignets avant la musculation.",
  });
}
