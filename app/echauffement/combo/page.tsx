import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { COMBO_PAGES, COMBO_SLUGS } from "@/lib/content/combo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/combo";

export const metadata: Metadata = {
  title: "Échauffements par groupe musculaire — Haut, bas, full body",
  description:
    "Protocoles d'échauffement musculation par groupe : haut du corps, bas du corps, full body, push et pull. Plans gratuits en 5 minutes.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Échauffements par groupe musculaire — Warmup Generator",
    description:
      "Trouve le bon échauffement pour une séance haut du corps, bas du corps, full body, push ou pull.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Échauffements par groupe musculaire — Warmup Generator",
    description: "Guides haut du corps, bas du corps, full body, push et pull en 5 minutes.",
  },
  robots: { index: true, follow: true },
};

export default function ComboHubPage() {
  return (
    <SEOHubPage
      title="Échauffements par groupe"
      subtitle="Haut du corps · Bas du corps · Full body · Push · Pull"
      intro={[
        "Quand ta séance ne tourne pas autour d'un seul exercice, le plus efficace est de préparer toute la chaîne musculaire concernée. Un push day ne demande pas la même activation qu'un pull day, et une séance jambes n'a pas les mêmes priorités qu'un full body.",
        "Ces protocoles par combo couvrent les formats de séance les plus courants. Ils combinent mobilisation articulaire, activation musculaire et préparation progressive pour arriver chaud sans gaspiller d'énergie.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Échauffements", href: "/echauffement" }, { label: "Combos" }]}
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
          q: "Quand choisir un échauffement par combo ?",
          a: "Choisis un combo quand ta séance sollicite plusieurs exercices ou plusieurs groupes musculaires. C'est le cas d'un push day, d'un pull day, d'un full body, d'une séance haut du corps ou bas du corps.",
        },
        {
          q: "Un combo est-il moins précis qu'un échauffement par exercice ?",
          a: "Il est moins spécialisé, mais plus adapté aux séances larges. Si tu as un exercice prioritaire très lourd, commence par le guide de cet exercice. Si ta séance est plus globale, le combo est souvent plus ergonomique.",
        },
        {
          q: "Puis-je ajouter une zone sensible à un combo ?",
          a: "Oui. Si une zone est fragile, utilise le générateur personnalisé ou consulte les protocoles de protection pour ajouter un travail ciblé avant ton combo.",
        },
      ]}
      relatedTitle="Construire un échauffement plus précis"
      relatedLinks={[
        { href: "/echauffement/exercice", label: "Guides par exercice principal" },
        { href: "/echauffement/protection", label: "Protocoles pour zones sensibles" },
        { href: "/a-propos", label: "À propos du projet" },
        { href: "/", label: "Générateur personnalisé" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
