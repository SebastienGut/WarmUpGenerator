import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { PROTECTION_PAGES, PROTECTION_SLUGS } from "@/lib/content/protection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/protection";

export const metadata: Metadata = {
  title: "Echauffements pour zones sensibles - Epaule, genou, lombaires",
  description:
    "Protocoles d'echauffement pour s'entrainer avec une zone sensible: epaule, genou, lombaires ou poignets. Guides gratuits et progressifs.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Echauffements pour zones sensibles - Warmup Generator",
    description:
      "Choisis la zone a proteger avant ta seance: epaule, genou, lombaires ou poignets.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echauffements pour zones sensibles - Warmup Generator",
    description: "Protocoles epaule, genou, lombaires et poignets pour une seance plus confortable.",
  },
  robots: { index: true, follow: true },
};

export default function ProtectionHubPage() {
  return (
    <SEOHubPage
      title="Echauffements zones sensibles"
      subtitle="Epaule - Genou - Lombaires - Poignets"
      intro={[
        "Une zone sensible change la logique de l'echauffement. Il ne suffit plus de bouger un peu avant la charge: il faut reveiller les muscles stabilisateurs, reduire les compensations et choisir des amplitudes qui restent confortables.",
        "Ces protocoles ne remplacent pas un avis medical. Ils servent a preparer une seance de musculation quand une gene legere ou recurrente demande plus d'attention avant les series de travail.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Echauffements", href: "/echauffement" }, { label: "Protection" }]}
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
          q: "Un protocole de protection peut-il remplacer un avis medical ?",
          a: "Non. Ces protocoles servent a preparer une seance quand une gene legere demande plus d'attention. En cas de douleur aigue, persistante ou qui s'aggrave, consulte un professionnel de sante.",
        },
        {
          q: "Dois-je m'echauffer differemment avec une zone sensible ?",
          a: "Oui. Il faut reduire les compensations, activer les stabilisateurs et rester dans des amplitudes confortables. L'objectif n'est pas de forcer, mais de preparer la zone avant la charge.",
        },
        {
          q: "Puis-je combiner protection et echauffement par exercice ?",
          a: "Oui. Par exemple, si tu fais du developpe couche avec une epaule sensible, commence par le protocole epaule puis garde les elements specifiques du developpe couche et des series de chauffe progressives.",
        },
      ]}
      relatedTitle="Adapter ton plan"
      relatedLinks={[
        { href: "/echauffement/exercice", label: "Guides par exercice principal" },
        { href: "/echauffement/combo", label: "Guides par groupe musculaire" },
        { href: "/methodologie", label: "Methodologie et limites" },
        { href: "/", label: "Generateur avec zones sensibles" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
