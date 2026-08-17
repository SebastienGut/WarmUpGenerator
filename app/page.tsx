import type { Metadata } from "next";
import GeneratorClient from "@/components/GeneratorClient";
import HomepageSEO from "@/components/HomepageSEO";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
  description:
    "Crée en 30 secondes un plan d'échauffement adapté à tes muscles cibles, ton objectif et tes zones sensibles. 100% gratuit, sans inscription, fonctionne hors ligne.",
  alternates: { canonical: "/", languages: { "fr-FR": "/" } },
  openGraph: {
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Plan d'échauffement sur mesure en 30 secondes. Gratuit, sans inscription, sans pub.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Plan d'échauffement sur mesure en 30 secondes. Gratuit, sans inscription, sans pub.",
  },
};

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Warmup Generator",
      url: SITE_URL,
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Warmup Generator — Échauffement musculation gratuit",
      url: SITE_URL,
      inLanguage: "fr-FR",
      isPartOf: { "@type": "WebSite", name: "Warmup Generator", url: SITE_URL },
      description:
        "Générateur gratuit d'échauffement musculation personnalisé selon les muscles, l'objectif et les zones sensibles.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Warmup Generator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Générateur d'échauffement musculation personnalisé. Crée un plan adapté à tes muscles, ton objectif et tes zones sensibles en 30 secondes.",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "Plan d'échauffement personnalisé en 30 secondes",
        "Adaptation aux zones sensibles (épaule, genou, lombaires)",
        "Mode timer plein écran pour la salle",
        "Fonctionne hors ligne",
        "Sans inscription, sans publicité",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Warmup Generator",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GeneratorClient />
      <HomepageSEO />
      <IOSInstallPrompt />
    </>
  );
}
