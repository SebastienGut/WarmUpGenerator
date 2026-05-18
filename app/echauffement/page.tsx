import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement";

export const metadata: Metadata = {
  title: "Echauffement musculation - Tous les plans gratuits",
  description:
    "Tous les echauffements musculation Warmup Generator: plans par exercice, par groupe musculaire et par zone sensible. Gratuit, sans inscription.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Echauffement musculation - Warmup Generator",
    description:
      "Explore les plans d'echauffement par exercice, par groupe musculaire ou par zone sensible.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echauffement musculation - Warmup Generator",
    description: "Tous les plans d'echauffement gratuits pour preparer ta seance.",
  },
  robots: { index: true, follow: true },
};

export default function WarmupHubPage() {
  return (
    <SEOHubPage
      title="Echauffement musculation"
      subtitle="Plans gratuits - Exercices - Groupes - Zones sensibles"
      intro={[
        "Un bon echauffement n'est pas une routine generique. Il depend de ce que tu vas travailler, de l'exercice principal, de ton objectif et des zones qui demandent plus d'attention.",
        "Cette page regroupe tous les guides Warmup Generator: protocoles par exercice, plans par groupe musculaire et echauffements adaptes aux zones sensibles. Chaque plan reste court, concret et utilisable directement en salle.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Echauffements" }]}
      itemsTitle="Choisir une famille"
      items={[
        {
          href: "/echauffement/exercice",
          title: "Par exercice",
          description:
            "Squat, developpe couche, souleve de terre, tractions, rowing ou developpe militaire: prepare le mouvement principal de ta seance.",
          kicker: "Long-tail exercice",
        },
        {
          href: "/echauffement/combo",
          title: "Par groupe musculaire",
          description:
            "Haut du corps, bas du corps, full body, push ou pull: echauffe toute la chaine musculaire utile.",
          kicker: "Structure seance",
        },
        {
          href: "/echauffement/protection",
          title: "Zones sensibles",
          description:
            "Epaule, genou, lombaires ou poignets: ajoute une logique de protection avant tes series de travail.",
          kicker: "Confort articulaire",
        },
      ]}
      faqs={[
        {
          q: "Quel echauffement choisir avant une seance de musculation ?",
          a: "Pars de ton intention principale. Si ta seance tourne autour d'un mouvement lourd, choisis un echauffement par exercice. Si tu fais une seance complete haut du corps, jambes, push ou pull, choisis un combo. Si une articulation est sensible, commence par les protocoles de protection.",
        },
        {
          q: "Combien de temps doit durer un echauffement musculation ?",
          a: "Pour la plupart des seances, 5 a 8 minutes suffisent avant les series de chauffe specifiques. L'objectif est d'elever la temperature, mobiliser les articulations utiles et activer les muscles cibles sans fatiguer avant le travail principal.",
        },
        {
          q: "Ces plans remplacent-ils les series de chauffe avec barre ?",
          a: "Non. Les plans preparent le corps et les articulations. Sur squat, developpe couche, souleve de terre ou developpe militaire, ajoute ensuite des series progressives avec la barre ou les halteres avant les series de travail.",
        },
      ]}
      relatedTitle="Plans populaires"
      relatedLinks={[
        { href: "/echauffement/exercice/developpe-couche", label: "Echauffement developpe couche" },
        { href: "/echauffement/exercice/squat", label: "Echauffement squat" },
        { href: "/echauffement/combo/haut-du-corps", label: "Echauffement haut du corps" },
        { href: "/echauffement/protection/epaule-douleur", label: "Echauffement epaule sensible" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
