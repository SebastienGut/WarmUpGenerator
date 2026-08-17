import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/echauffement";

export const metadata: Metadata = {
  title: "Échauffement musculation — Tous les plans gratuits",
  description:
    "Tous les échauffements musculation Warmup Generator : plans par exercice, par groupe musculaire et par zone sensible. Gratuit, sans inscription.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Échauffement musculation — Warmup Generator",
    description:
      "Explore les plans d'échauffement par exercice, par groupe musculaire ou par zone sensible.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Échauffement musculation — Warmup Generator",
    description: "Tous les plans d'échauffement gratuits pour préparer ta séance.",
  },
  robots: { index: true, follow: true },
};

export default function WarmupHubPage() {
  return (
    <SEOHubPage
      title="Échauffement musculation"
      subtitle="Plans gratuits · Exercices · Groupes · Zones sensibles"
      intro={[
        "Un bon échauffement n'est pas une routine générique. Il dépend de ce que tu vas travailler, de l'exercice principal, de ton objectif et des zones qui demandent plus d'attention.",
        "Cette page regroupe tous les guides Warmup Generator : protocoles par exercice, plans par groupe musculaire et échauffements adaptés aux zones sensibles. Chaque plan reste court, concret et utilisable directement en salle.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Échauffements" }]}
      itemsTitle="Choisir une famille"
      items={[
        {
          href: "/echauffement/exercice",
          title: "Par exercice",
          description:
            "Squat, développé couché, soulevé de terre, tractions, rowing ou développé militaire : prépare le mouvement principal de ta séance.",
          kicker: "Long-tail exercice",
        },
        {
          href: "/echauffement/combo",
          title: "Par groupe musculaire",
          description:
            "Haut du corps, bas du corps, full body, push ou pull : échauffe toute la chaîne musculaire utile.",
          kicker: "Structure séance",
        },
        {
          href: "/echauffement/protection",
          title: "Zones sensibles",
          description:
            "Épaule, genou, lombaires ou poignets : ajoute une logique de protection avant tes séries de travail.",
          kicker: "Confort articulaire",
        },
        {
          href: "/douleur",
          title: "Douleurs par exercice",
          description:
            "Mal à l'épaule au développé couché, au genou pendant le squat : le diagnostic du mécanisme avant le protocole.",
          kicker: "Diagnostic",
        },
      ]}
      faqs={[
        {
          q: "Quel échauffement choisir avant une séance de musculation ?",
          a: "Pars de ton intention principale. Si ta séance tourne autour d'un mouvement lourd, choisis un échauffement par exercice. Si tu fais une séance complète haut du corps, jambes, push ou pull, choisis un combo. Si une articulation est sensible, commence par les protocoles de protection.",
        },
        {
          q: "Combien de temps doit durer un échauffement musculation ?",
          a: "Pour la plupart des séances, 5 à 8 minutes suffisent avant les séries de chauffe spécifiques. L'objectif est d'élever la température, mobiliser les articulations utiles et activer les muscles ciblés sans fatiguer avant le travail principal.",
        },
        {
          q: "Ces plans remplacent-ils les séries de chauffe avec barre ?",
          a: "Non. Les plans préparent le corps et les articulations. Sur squat, développé couché, soulevé de terre ou développé militaire, ajoute ensuite des séries progressives avec la barre ou les haltères avant les séries de travail.",
        },
      ]}
      relatedTitle="Plans populaires"
      relatedLinks={[
        { href: "/echauffement/exercice/developpe-couche", label: "Échauffement développé couché" },
        { href: "/echauffement/exercice/squat", label: "Échauffement squat" },
        { href: "/echauffement/combo/haut-du-corps", label: "Échauffement haut du corps" },
        { href: "/echauffement/protection/epaule-douleur", label: "Échauffement épaule sensible" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
