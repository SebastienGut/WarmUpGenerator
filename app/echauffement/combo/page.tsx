import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { COMBO_PAGES, COMBO_SLUGS } from "@/lib/content/combo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/combo";

export const metadata: Metadata = {
  title: "Echauffements par groupe musculaire - Haut, bas, full body",
  description:
    "Protocoles d'echauffement musculation par groupe: haut du corps, bas du corps, full body, push et pull. Plans gratuits en 5 minutes.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Echauffements par groupe musculaire - Warmup Generator",
    description:
      "Trouve le bon echauffement pour une seance haut du corps, bas du corps, full body, push ou pull.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echauffements par groupe musculaire - Warmup Generator",
    description: "Guides haut du corps, bas du corps, full body, push et pull en 5 minutes.",
  },
  robots: { index: true, follow: true },
};

export default function ComboHubPage() {
  return (
    <SEOHubPage
      title="Echauffements par groupe"
      subtitle="Haut du corps - Bas du corps - Full body - Push - Pull"
      intro={[
        "Quand ta seance ne tourne pas autour d'un seul exercice, le plus efficace est de preparer toute la chaine musculaire concernee. Un push day ne demande pas la meme activation qu'un pull day, et une seance jambes n'a pas les memes priorites qu'un full body.",
        "Ces protocoles par combo couvrent les formats de seance les plus courants. Ils combinent mobilisation articulaire, activation musculaire et preparation progressive pour arriver chaud sans gaspiller d'energie.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Echauffements", href: "/echauffement" }, { label: "Combos" }]}
      itemsTitle="Guides par combo"
      items={COMBO_SLUGS.map((slug) => {
        const page = COMBO_PAGES[slug];
        return {
          href: `/echauffement/combo/${slug}`,
          title: page.h1,
          description: page.metaDescription,
          kicker: page.subtitle,
        };
      })}
      faqs={[
        {
          q: "Quand choisir un echauffement par combo ?",
          a: "Choisis un combo quand ta seance sollicite plusieurs exercices ou plusieurs groupes musculaires. C'est le cas d'un push day, pull day, full body, haut du corps ou bas du corps.",
        },
        {
          q: "Un combo est-il moins precis qu'un echauffement par exercice ?",
          a: "Il est moins specialise, mais plus adapte aux seances larges. Si tu as un exercice prioritaire tres lourd, commence par le guide de cet exercice. Si ta seance est plus globale, le combo est souvent plus ergonomique.",
        },
        {
          q: "Puis-je ajouter une zone sensible a un combo ?",
          a: "Oui. Si une zone est fragile, utilise le generateur personnalise ou consulte les protocoles de protection pour ajouter un travail cible avant ton combo.",
        },
      ]}
      relatedTitle="Construire un echauffement plus precis"
      relatedLinks={[
        { href: "/echauffement/exercice", label: "Guides par exercice principal" },
        { href: "/echauffement/protection", label: "Protocoles pour zones sensibles" },
        { href: "/a-propos", label: "A propos du projet" },
        { href: "/", label: "Generateur personnalise" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
