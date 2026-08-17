import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { DOULEUR_PAGES, DOULEUR_SLUGS } from "@/lib/content/douleur";
import { PROTECTION_PAGES } from "@/lib/content/protection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DOULEUR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = DOULEUR_PAGES[slug];
  if (!data) return {};
  const path = `/douleur/${slug}`;
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

export default async function DouleurPage({ params }: PageProps) {
  const { slug } = await params;
  const data = DOULEUR_PAGES[slug];
  if (!data) notFound();

  const path = `/douleur/${slug}`;
  const protection = PROTECTION_PAGES[data.relatedProtection];

  // Maillage : les autres douleurs d'abord, puis le protocole de zone
  // correspondant, qui est la suite logique de lecture.
  const relatedLinks = [
    ...DOULEUR_SLUGS.filter((s) => s !== slug).map((s) => ({
      href: `/douleur/${s}`,
      label: DOULEUR_PAGES[s].h1,
    })),
    ...(protection
      ? [
          {
            href: `/echauffement/protection/${data.relatedProtection}`,
            label: protection.h1,
          },
        ]
      : []),
  ];

  return (
    <SEOPage
      h1={data.h1}
      subtitle={data.subtitle}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Douleurs", href: "/douleur" },
        { label: data.exerciseLabel.charAt(0).toUpperCase() + data.exerciseLabel.slice(1) },
      ]}
      keyAnswer={data.keyAnswer}
      intro={data.intro}
      sections={[data.causes]}
      exerciseSectionTitle={`Protocole en ${data.exercises.length} mouvements`}
      exercises={data.exercises}
      advice={data.advice}
      faqs={data.faqs}
      related={{ title: "Autres douleurs fréquentes", links: relatedLinks }}
      siteUrl={SITE_URL}
      path={path}
      planHref={`/result?${data.planParams}&duree=5`}
    />
  );
}
