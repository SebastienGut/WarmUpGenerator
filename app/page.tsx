import type { Metadata } from "next";
import SessionBuilder from "@/components/SessionBuilder";
import HomepageSEO from "@/components/HomepageSEO";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
  description:
    "Push, pull, jambes, haut du corps : ton échauffement musculation en un tap : mobilité, activation ciblée, mode guidé. Plus les séries d'approche. Gratuit.",
  alternates: { canonical: "/", languages: { "fr-FR": "/" } },
  openGraph: {
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Ton échauffement musculation en un tap, selon ce que tu travailles. Gratuit, sans compte.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmup Generator — Échauffement musculation gratuit & personnalisé",
    description:
      "Ton échauffement musculation en un tap, selon ce que tu travailles. Gratuit, sans compte.",
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
        "Générateur gratuit d'échauffement musculation par zone ou type de séance, et calculateur de séries d'approche.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Warmup Generator",
      url: SITE_URL,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Générateur d'échauffement musculation : mobilité et activation ciblées selon les zones travaillées, et calculateur de séries d'approche séparé.",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "Échauffement de 6 minutes par séance, selon le matériel disponible",
        "Démonstration en images de chaque exercice, mode guidé",
        "Calculateur de séries d'approche avec les disques par côté",
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
      // Profils publics du projet : aident les moteurs à relier le site à une même entité.
      sameAs: [
        "https://github.com/SebastienGut/WarmUpGenerator",
        "https://huggingface.co/datasets/fabdigstudio/warmup-exercises-fr",
      ],
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
