import { createOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";

export const alt = "Échauffement musculation — Warmup";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LANDINGS[slug];
  return createOgCard({
    eyebrow: l?.kicker ?? "Échauffement musculation",
    title: l?.h1 ?? "Échauffement musculation",
    subtitle: "La routine prête à suivre, exercice par exercice, avec mode guidé. Gratuit.",
  });
}
