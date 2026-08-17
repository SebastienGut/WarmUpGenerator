import type { Metadata } from "next";
import SEOHubPage from "@/components/SEOHubPage";
import { DOULEUR_PAGES, DOULEUR_SLUGS } from "@/lib/content/douleur";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/douleur";

export const metadata: Metadata = {
  title: "Douleurs en musculation : causes par exercice et solutions",
  description:
    "Mal à l'épaule au développé couché, au genou pendant le squat, au bas du dos au soulevé de terre ? Le diagnostic exercice par exercice et les protocoles pour continuer à t'entraîner.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Douleurs en musculation — Causes et solutions par exercice",
    description:
      "Identifie l'origine de ta douleur selon l'exercice qui la déclenche, corrige ta technique et prépare l'articulation avant la charge.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Douleurs en musculation — Causes et solutions par exercice",
    description: "Le diagnostic exercice par exercice, et le protocole pour continuer à t'entraîner.",
  },
  robots: { index: true, follow: true },
};

export default function DouleurHubPage() {
  return (
    <SEOHubPage
      title="Douleurs en musculation"
      subtitle="Diagnostic par exercice · Correction technique · Protocoles"
      intro={[
        "Une douleur en musculation se comprend rarement en isolant l'articulation qui fait mal. Elle se comprend en regardant le mouvement qui la déclenche : le genou qui souffre au squat vient presque toujours de la cheville ou de la hanche, et le bas du dos qui chauffe au soulevé de terre vient d'une charnière de hanche que le corps ne sait pas produire.",
        "Chaque guide part donc de l'exercice. Il t'explique le mécanisme réel de la douleur, les corrections techniques qui la font disparaître, les alternatives qui te permettent de continuer à progresser en attendant, et le protocole de préparation à faire avant la séance.",
        "Ces pages sont informatives et ne remplacent pas un diagnostic. Chacune signale les symptômes qui imposent une consultation plutôt qu'un aménagement d'entraînement — et dans ce cas, la bonne décision est de voir un kinésithérapeute ou un médecin du sport.",
      ]}
      breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Douleurs" }]}
      itemsTitle="Guides par exercice"
      items={DOULEUR_SLUGS.map((slug) => {
        const page = DOULEUR_PAGES[slug];
        return {
          href: `/douleur/${slug}`,
          title: page.h1,
          description: page.metaDescription,
          kicker: page.subtitle,
        };
      })}
      faqs={[
        {
          q: "Puis-je continuer à m'entraîner avec une douleur ?",
          a: "Le repère utilisé en rééducation est celui de la douleur tolérable : jusqu'à 3 sur 10, qui n'augmente pas au fil des séries et qui a disparu le lendemain matin, tu peux généralement continuer en adaptant la charge et l'amplitude. Au-delà de ce seuil, ou si la douleur monte pendant la séance, il faut réduire nettement et réévaluer.",
        },
        {
          q: "Le repos complet est-il la bonne solution ?",
          a: "Rarement, en particulier pour les tendons. Le consensus actuel en rééducation est que le tendon se soigne par une charge progressive et contrôlée, alors que le repos total l'affaiblit et provoque une rechute dès la reprise. La bonne approche est presque toujours d'adapter — charge réduite, amplitude indolore, tempo lent — plutôt que d'arrêter.",
        },
        {
          q: "Quand faut-il consulter plutôt que s'auto-gérer ?",
          a: "Dès qu'apparaît un signal d'alerte : douleur nocturne, irradiation dans un membre, fourmillements ou engourdissement, perte de force brutale, gonflement, blocage articulaire, ou douleur qui persiste plus de trois à six semaines malgré l'adaptation. Ces situations demandent un diagnostic, pas un aménagement d'échauffement.",
        },
        {
          q: "L'échauffement suffit-il à faire disparaître une douleur ?",
          a: "Il crée les conditions d'une séance sans douleur — articulation mobilisée, stabilisateurs activés, pattern moteur programmé — mais il ne corrige pas une cause technique ni un déséquilibre de programmation. C'est pour cette raison que chaque guide combine les trois : diagnostic, correction de l'exécution, et protocole.",
        },
      ]}
      relatedTitle="Aller plus loin"
      relatedLinks={[
        { href: "/echauffement/protection", label: "Protocoles par zone sensible" },
        { href: "/echauffement/exercice", label: "Guides par exercice principal" },
        { href: "/methodologie", label: "Méthodologie et limites" },
        { href: "/", label: "Générateur avec zones sensibles" },
      ]}
      siteUrl={SITE_URL}
      path={PATH}
    />
  );
}
