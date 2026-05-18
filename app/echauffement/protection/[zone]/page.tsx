import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { PROTECTION_PAGES, PROTECTION_SLUGS } from "@/lib/content/protection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

interface PageProps {
  params: Promise<{ zone: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROTECTION_SLUGS.map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone } = await params;
  const data = PROTECTION_PAGES[zone];
  if (!data) return {};
  const path = `/echauffement/protection/${zone}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: path },
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

export default async function ProtectionPage({ params }: PageProps) {
  const { zone } = await params;
  const data = PROTECTION_PAGES[zone];
  if (!data) notFound();

  const path = `/echauffement/protection/${zone}`;

  return (
    <SEOPage
      h1={data.h1}
      subtitle={data.subtitle}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Protection", href: "/echauffement/protection" },
        { label: data.zoneLabel.charAt(0).toUpperCase() + data.zoneLabel.slice(1) },
      ]}
      intro={data.intro}
      exerciseSectionTitle={`Protocole en ${data.exercises.length} mouvements`}
      exercises={data.exercises}
      advice={data.advice}
      faqs={data.faqs}
      related={{
        title: "Autres protections",
        links: PROTECTION_SLUGS.filter((s) => s !== zone).map((s) => ({
          href: `/echauffement/protection/${s}`,
          label: PROTECTION_PAGES[s].h1,
        })),
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={data.h1}
      totalDurationLabel="5 min"
    />
  );
}
