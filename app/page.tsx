import type { Metadata } from "next";
import SessionBuilder from "@/components/SessionBuilder";
import HomepageSEO from "@/components/HomepageSEO";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
  description:
    "Choisis les exercices de ta séance : mobilité, activation et séries d'approche calculées pour eux. Mode guidé pour la salle. Gratuit, sans compte.",
  alternates: { canonical: "/", languages: { "fr-FR": "/" } },
  openGraph: {
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Un échauffement construit sur les exercices de ta séance, séries d'approche comprises. Gratuit, sans compte.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Un échauffement construit sur les exercices de ta séance, séries d'approche comprises. Gratuit, sans compte.",
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
        "Générateur gratuit d'échauffement musculation construit sur les exercices de la séance, avec séries d'approche calculées.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Warmup Generator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Générateur d'échauffement musculation : mobilité, activation et séries d'approche calculées à partir des exercices de la séance.",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "Échauffement construit sur les exercices de la séance",
        "Séries d'approche calculées avec les disques par côté",
        "Adaptation aux zones sensibles (épaule, genou, lombaires)",
        "Mode guidé plein écran avec minuteur de repos",
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
      <SessionBuilder />
      <HomepageSEO />
      <IOSInstallPrompt />
    </>
  );
}
