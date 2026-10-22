import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Warmup — ton échauffement musculation en un tap";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return createOgCard({
    eyebrow: "Échauffement musculation",
    title: "Tu entraînes quoi ? Échauffé en un tap.",
    subtitle: "Push, pull, jambes, haut ou bas du corps : la routine prête à suivre, avec mode guidé.",
  });
}
