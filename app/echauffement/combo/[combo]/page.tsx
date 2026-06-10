import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { COMBO_PAGES, COMBO_SLUGS } from "@/lib/content/combo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Deep-link générateur : groupes musculaires du combo
const PLAN_PARAMS: Record<string, string> = {
  "haut-du-corps": "muscles=pecs,dos,epaules&objectif=hypertrophie",
  "bas-du-corps": "muscles=jambes,fessiers&objectif=hypertrophie",
  "full-body": "muscles=pecs,dos,jambes&objectif=hypertrophie",
  push: "muscles=pecs,epaules,bras&objectif=hypertrophie",
  pull: "muscles=dos,bras&objectif=hypertrophie",
};

interface PageProps {
  params: Promise<{ combo: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return COMBO_SLUGS.map((combo) => ({ combo }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { combo } = await params;
  const data = COMBO_PAGES[combo];
  if (!data) return {};
  const path = `/echauffement/combo/${combo}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: path, languages: { "fr-FR": path } },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: "article",
      locale: "fr_FR",
      url: path,
      siteName: "Warmup Generator",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ComboPage({ params }: PageProps) {
  const { combo } = await params;
  const data = COMBO_PAGES[combo];
  if (!data) notFound();

  const path = `/echauffement/combo/${combo}`;

  return (
    <SEOPage
      h1={data.h1}
      subtitle={data.subtitle}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Combos", href: "/echauffement/combo" },
        { label: data.h1 },
      ]}
      intro={data.intro}
      exerciseSectionTitle={`Protocole en ${data.exercises.length} mouvements`}
      exercises={data.exercises}
      advice={data.advice}
      faqs={data.faqs}
      related={{
        title: "Autres combos",
        links: COMBO_SLUGS.filter((s) => s !== combo).map((s) => ({
          href: `/echauffement/combo/${s}`,
          label: COMBO_PAGES[s].h1,
        })),
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={data.h1}
      totalDurationLabel="5 min"
      planHref={PLAN_PARAMS[combo] ? `/result?${PLAN_PARAMS[combo]}&duree=5` : undefined}
    />
  );
}
