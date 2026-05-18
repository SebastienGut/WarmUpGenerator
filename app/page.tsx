import GeneratorClient from "@/components/GeneratorClient";
import HomepageSEO from "@/components/HomepageSEO";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Warmup Generator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Generateur d'echauffement musculation personnalise. Cree un plan adapte a tes muscles, ton objectif et tes zones sensibles en 30 secondes.",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "Plan d'echauffement personnalise en 30 secondes",
        "Adaptation aux zones sensibles (epaule, genou, lombaires)",
        "Mode timer plein ecran pour la salle",
        "Fonctionne hors ligne",
        "Sans inscription, sans publicite",
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
    </>
  );
}
