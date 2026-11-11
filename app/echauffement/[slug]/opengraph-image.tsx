import { createOgCard, OG_CONTENT_TYPE, OG_SIZE, type OgTone } from "@/lib/og-card";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";

export const alt = "Échauffement musculation — Warmup";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Même aplat que le bandeau de la page (components/LandingPage.tsx).
const TONE: Record<string, OgTone> = {
  push: "red", pecs: "red", "haut-du-corps": "red",
  pull: "blue", dos: "blue",
  jambes: "green", fessiers: "green", "bas-du-corps": "green",
  epaules: "yellow", bras: "yellow",
};

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LANDINGS[slug];
  return createOgCard({
    eyebrow: l?.kicker ?? "Échauffement musculation",
    title: l?.h1 ?? "Échauffement musculation",
    subtitle: "La routine prête à suivre, exercice par exercice, avec mode guidé.",
    tone: TONE[slug] ?? "black",
  });
}
