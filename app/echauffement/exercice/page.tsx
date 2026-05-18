import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { EXERCICE_PAGES, EXERCICE_SLUGS } from "@/lib/content/exercice";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/exercice";

export const metadata: Metadata = {
  title: "Echauffements par exercice - Squat, developpe couche, tractions",
  description:
    "Tous les protocoles d'echauffement par exercice: squat, developpe couche, souleve de terre, rowing, tractions et developpe militaire.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Echauffements par exercice - Warmup Generator",
    description:
      "Choisis ton exercice principal et suis un protocole cible en 5 minutes avant ta seance de musculation.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echauffements par exercice - Warmup Generator",
    description: "Protocoles cibles pour squat, developpe couche, souleve de terre, tractions et plus.",
  },
  robots: { index: true, follow: true },
};

export default function ExerciseHubPage() {
  return (
    <SEOHubPage
      title="Echauffements par exercice"
      subtitle="Squat - Developpe couche - Tractions - Deadlift"
      intro={[
        "Chaque exercice lourd impose ses propres contraintes: stabiliser les epaules au developpe couche, ouvrir les hanches au squat, verrouiller le gainage avant le souleve de terre, preparer le grip et les omoplates avant les tractions.",
        "Ces guides regroupent les protocoles les plus utiles avant les mouvements de musculation courants. Choisis ton exercice principal, suis la sequence en 5 minutes, puis ajoute tes series de chauffe progressives avec la barre ou les halteres.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Echauffements", href: "/echauffement" }, { label: "Exercices" }]}
      itemsTitle="Guides par exercice"
      items={EXERCICE_SLUGS.map((slug) => {
        const page = EXERCICE_PAGES[slug];
        return {
          href: `/echauffement/exercice/${slug}`,
          title: page.h1,
          description: page.metaDescription,
          kicker: page.subtitle,
        };
      })}
      relatedTitle="Explorer les autres familles"
      relatedLinks={[
        { href: "/echauffement/combo", label: "Echauffements par groupes musculaires" },
        { href: "/echauffement/protection", label: "Protocoles pour zones sensibles" },
        { href: "/methodologie", label: "Methodologie de l'algorithme" },
        { href: "/", label: "Generateur personnalise" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
