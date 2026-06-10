import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { EXERCICE_PAGES, EXERCICE_SLUGS } from "@/lib/content/exercice";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Deep-link générateur : muscles + objectif les plus proches du mouvement
const PLAN_PARAMS: Record<string, string> = {
  "developpe-couche": "muscles=pecs,epaules&objectif=force",
  squat: "muscles=jambes,fessiers&objectif=force",
  "souleve-de-terre": "muscles=dos,jambes&objectif=force",
  tractions: "muscles=dos,bras&objectif=force",
  "rowing-barre": "muscles=dos&objectif=force",
  "developpe-militaire": "muscles=epaules&objectif=force",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return EXERCICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = EXERCICE_PAGES[slug];
  if (!data) return {};
  const path = `/echauffement/exercice/${slug}`;
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

export default async function ExercicePage({ params }: PageProps) {
  const { slug } = await params;
  const data = EXERCICE_PAGES[slug];
  if (!data) notFound();

  const path = `/echauffement/exercice/${slug}`;

  return (
    <SEOPage
      h1={data.h1}
      subtitle={data.subtitle}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Exercices", href: "/echauffement/exercice" },
        { label: data.exerciseLabel.charAt(0).toUpperCase() + data.exerciseLabel.slice(1) },
      ]}
      intro={data.intro}
      exerciseSectionTitle={`Protocole en ${data.exercises.length} mouvements`}
      exercises={data.exercises}
      advice={data.advice}
      faqs={data.faqs}
      related={{
        title: "Autres échauffements par exercice",
        links: EXERCICE_SLUGS.filter((s) => s !== slug).map((s) => ({
          href: `/echauffement/exercice/${s}`,
          label: EXERCICE_PAGES[s].h1,
        })),
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={data.h1}
      totalDurationLabel="5 min"
      planHref={PLAN_PARAMS[slug] ? `/result?${PLAN_PARAMS[slug]}&duree=5` : undefined}
    />
  );
}
