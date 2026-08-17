import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { PROTECTION_PAGES, PROTECTION_SLUGS } from "@/lib/content/protection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/protection";

export const metadata: Metadata = {
  title: "Échauffements zones sensibles — Épaule, genou, lombaires",
  description:
    "Protocoles d'échauffement pour s'entraîner avec une zone sensible : épaule, genou, lombaires ou poignets. Guides gratuits et progressifs.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Échauffements pour zones sensibles — Warmup Generator",
    description:
      "Choisis la zone à protéger avant ta séance : épaule, genou, lombaires ou poignets.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Échauffements pour zones sensibles — Warmup Generator",
    description: "Protocoles épaule, genou, lombaires et poignets pour une séance plus confortable.",
  },
  robots: { index: true, follow: true },
};

export default function ProtectionHubPage() {
  return (
    <SEOHubPage
      title="Échauffements zones sensibles"
      subtitle="Épaule · Genou · Lombaires · Poignets"
      intro={[
        "Une zone sensible change la logique de l'échauffement. Il ne suffit plus de bouger un peu avant la charge : il faut réveiller les muscles stabilisateurs, réduire les compensations et choisir des amplitudes qui restent confortables.",
        "Ces protocoles ne remplacent pas un avis médical. Ils servent à préparer une séance de musculation quand une gêne légère ou récurrente demande plus d'attention avant les séries de travail.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Échauffements", href: "/echauffement" }, { label: "Protection" }]}
      itemsTitle="Guides par zone"
      items={PROTECTION_SLUGS.map((slug) => {
        const page = PROTECTION_PAGES[slug];
        return {
          href: `/echauffement/protection/${slug}`,
          title: page.h1,
          description: page.metaDescription,
          kicker: page.subtitle,
        };
      })}
      faqs={[
        {
          q: "Un protocole de protection peut-il remplacer un avis médical ?",
          a: "Non. Ces protocoles servent à préparer une séance quand une gêne légère demande plus d'attention. En cas de douleur aiguë, persistante ou qui s'aggrave, consulte un professionnel de santé.",
        },
        {
          q: "Dois-je m'échauffer différemment avec une zone sensible ?",
          a: "Oui. Il faut réduire les compensations, activer les stabilisateurs et rester dans des amplitudes confortables. L'objectif n'est pas de forcer, mais de préparer la zone avant la charge.",
        },
        {
          q: "Puis-je combiner protection et échauffement par exercice ?",
          a: "Oui. Par exemple, si tu fais du développé couché avec une épaule sensible, commence par le protocole épaule puis garde les éléments spécifiques du développé couché et des séries de chauffe progressives.",
        },
      ]}
      relatedTitle="Adapter ton plan"
      relatedLinks={[
        { href: "/douleur", label: "Douleurs par exercice" },
        { href: "/echauffement/exercice", label: "Guides par exercice principal" },
        { href: "/echauffement/combo", label: "Guides par groupe musculaire" },
        { href: "/", label: "Générateur avec zones sensibles" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
