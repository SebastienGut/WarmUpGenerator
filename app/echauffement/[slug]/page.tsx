import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const l = LANDINGS[slug];
  if (!l) return {};
  const path = `/echauffement/${slug}`;
  return {
    title: { absolute: l.metaTitle },
    description: l.metaDescription,
    alternates: { canonical: path, languages: { "fr-FR": path } },
    openGraph: { title: l.metaTitle, description: l.metaDescription, type: "website", locale: "fr_FR", url: path, siteName: "Warmup Generator" },
    twitter: { card: "summary_large_image", title: l.metaTitle, description: l.metaDescription },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const landing = LANDINGS[slug];
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
