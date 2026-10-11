import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { EXERCICE_PAGES, EXERCICE_SLUGS } from "@/lib/content/exercice";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Deep-link générateur : muscles + objectif les plus proches du mouvement
// Deep-link vers le moteur par séance : le slug de page est un identifiant
// d'exercice du catalogue (lib/lifts.ts).
const PLAN_PARAMS: Record<string, string> = {
  "developpe-couche": "s=developpe-couche&r=5",
  squat: "s=squat&r=5",
  "souleve-de-terre": "s=souleve-de-terre&r=5",
  tractions: "s=tractions&r=5",
  "rowing-barre": "s=rowing-barre&r=8",
  "developpe-militaire": "s=developpe-militaire&r=5",
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
      planHref={PLAN_PARAMS[slug] ? `/plan?${PLAN_PARAMS[slug]}` : undefined}
    />
  );
}
