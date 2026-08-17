import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { EXERCICE_PAGES, EXERCICE_SLUGS } from "@/lib/content/exercice";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement/exercice";

export const metadata: Metadata = {
  title: "Échauffements par exercice — Squat, développé couché, tractions",
  description:
    "Tous les protocoles d'échauffement par exercice : squat, développé couché, soulevé de terre, rowing, tractions et développé militaire.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Échauffements par exercice — Warmup Generator",
    description:
      "Choisis ton exercice principal et suis un protocole ciblé en 5 minutes avant ta séance de musculation.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Échauffements par exercice — Warmup Generator",
    description: "Protocoles ciblés pour squat, développé couché, soulevé de terre, tractions et plus.",
  },
  robots: { index: true, follow: true },
};

export default function ExerciseHubPage() {
  return (
    <SEOHubPage
      title="Échauffements par exercice"
      subtitle="Squat · Développé couché · Tractions · Deadlift"
      intro={[
        "Chaque exercice lourd impose ses propres contraintes : stabiliser les épaules au développé couché, ouvrir les hanches au squat, verrouiller le gainage avant le soulevé de terre, préparer le grip et les omoplates avant les tractions.",
        "Ces guides regroupent les protocoles les plus utiles avant les mouvements de musculation courants. Choisis ton exercice principal, suis la séquence en 5 minutes, puis ajoute tes séries de chauffe progressives avec la barre ou les haltères.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Échauffements", href: "/echauffement" }, { label: "Exercices" }]}
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
      faqs={[
        {
          q: "Pourquoi choisir un échauffement par exercice ?",
          a: "Un exercice lourd impose une contrainte précise. Le squat demande surtout hanches, chevilles, genoux et gainage. Le développé couché demande coiffe des rotateurs, omoplates et thoracique. Un protocole par exercice prépare donc le pattern exact au lieu de rester général.",
        },
        {
          q: "Faut-il faire ce protocole avant les séries de chauffe ?",
          a: "Oui. Utilise ce protocole pour préparer les articulations et activer les muscles, puis enchaîne avec tes séries de chauffe progressives sur l'exercice principal.",
        },
        {
          q: "Que faire si l'exercice principal n'est pas encore listé ?",
          a: "Choisis le protocole le plus proche biomécaniquement. Par exemple, utilise développé couché pour les poussées horizontales, développé militaire pour les poussées verticales, rowing ou tractions pour les tirages, squat pour les mouvements dominants genou.",
        },
      ]}
      relatedTitle="Explorer les autres familles"
      relatedLinks={[
        { href: "/echauffement/combo", label: "Échauffements par groupes musculaires" },
        { href: "/echauffement/protection", label: "Protocoles pour zones sensibles" },
        { href: "/douleur", label: "Douleurs par exercice" },
        { href: "/methodologie", label: "Méthodologie de l'algorithme" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
