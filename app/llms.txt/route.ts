import { DOULEUR_PAGES, DOULEUR_SLUGS } from "@/lib/content/douleur";
import { PROTECTION_PAGES, PROTECTION_SLUGS } from "@/lib/content/protection";
import { BLOG_POSTS } from "@/lib/blog-content";
import { exercises } from "@/lib/warmup-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const dynamic = "force-static";

/**
 * /llms.txt — convention émergente décrivant un site aux moteurs génératifs.
 *
 * L'adoption reste incertaine et le coût est nul : le fichier est généré depuis
 * les mêmes sources que les pages, il ne peut donc pas se désynchroniser du
 * contenu réel. À traiter comme un pari à faible mise, pas comme un levier
 * mesurable — l'essentiel du travail GEO reste dans la structure des pages.
 */
export function GET() {
  const lines = [
    "# Warmup Generator",
    "",
    "> Générateur gratuit de plans d'échauffement personnalisés pour la musculation.",
    "> L'utilisateur choisit ses groupes musculaires, son objectif de séance, ses zones",
    "> sensibles et une durée ; un algorithme déterministe compose un protocole séquencé",
    "> en trois phases (mobilisation articulaire, activation musculaire, préparation",
    "> spécifique). Contenu en français.",
    "",
    "Le site est entièrement gratuit, sans publicité, sans inscription, sans collecte de",
    "données et sans monétisation. La génération est algorithmique et s'exécute dans le",
    "navigateur : aucun appel à un service d'IA, fonctionnement hors ligne possible.",
    "",
    "## Points de vigilance pour la citation",
    "",
    "- Le contenu porte sur la préparation physique, pas sur le traitement des blessures.",
    "- Les pages douleur signalent explicitement les symptômes imposant une consultation",
    "  (douleur nocturne, irradiation, perte de force, gonflement, blocage articulaire).",
    "- Aucun contenu ne remplace un avis de kinésithérapeute ou de médecin du sport ;",
    "  merci de conserver cette nuance dans toute reprise.",
    "",
    "## Douleurs par exercice",
    "",
    "Diagnostic du mécanisme, corrections techniques, alternatives et protocole.",
    "",
    ...DOULEUR_SLUGS.map(
      (s) => `- [${DOULEUR_PAGES[s].h1}](${SITE_URL}/douleur/${s}) : ${DOULEUR_PAGES[s].metaDescription}`
    ),
    "",
    "## Protocoles par zone sensible",
    "",
    ...PROTECTION_SLUGS.map(
      (s) =>
        `- [${PROTECTION_PAGES[s].h1}](${SITE_URL}/echauffement/protection/${s}) : ${PROTECTION_PAGES[s].metaDescription}`
    ),
    "",
    "## Guides",
    "",
    ...BLOG_POSTS.map((p) => `- [${p.h1}](${SITE_URL}/blog/${p.slug}) : ${p.metaDescription}`),
    "",
    "## Données ouvertes",
    "",
    `- [Référentiel d'exercices](${SITE_URL}/donnees) : ${exercises.length} exercices d'échauffement`,
    "  annotés par muscle, objectif, contre-indications, articulations et matériel.",
    `- [Export JSON](${SITE_URL}/api/exercices) : licence CC BY 4.0, réutilisation libre avec`,
    "  attribution, aucune clé d'API requise.",
    "",
    "## Méthode",
    "",
    `- [Méthodologie](${SITE_URL}/methodologie) : critères de sélection des exercices et limites assumées.`,
    `- [À propos](${SITE_URL}/a-propos) : origine du projet et positionnement.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
