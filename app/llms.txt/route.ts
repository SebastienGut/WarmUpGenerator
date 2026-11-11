import { DOULEUR_PAGES, DOULEUR_SLUGS } from "@/lib/content/douleur";
import { PROTECTION_PAGES, PROTECTION_SLUGS } from "@/lib/content/protection";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";
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
    "> Deux outils distincts, plus une routine de soin. Le générateur : l'utilisateur choisit une séance type (Push,",
    "> Pull, Legs, Upper, Full body) et son matériel (sans matériel, élastique ou salle) ; un",
    "> algorithme déterministe donne une routine de référence de mobilité puis d'activation (sans",
    "> cardio), chaque exercice nommé avec sa variante et sa dose, et une démonstration en images.",
    "> « Une douleur ? » : pour une articulation qui gêne, une routine de soin plus longue",
    "> (mobilité douce, renforcement léger), à suivre sous 3 sur 10 de douleur.",
    "> Le calculateur : à partir de la charge de travail du jour sur un",
    "> exercice, il donne les séries d'approche, disques par côté. Contenu en français.",
    "",
    "Le site est entièrement gratuit, sans publicité, sans inscription et sans monétisation.",
    "La génération est algorithmique et s'exécute dans le navigateur : aucun appel à un",
    "service d'IA, fonctionnement hors ligne possible. La seule mesure d'audience est",
    "GoatCounter, sans cookie ni donnée personnelle.",
    "",
    "## Points de vigilance pour la citation",
    "",
    "- Le contenu porte sur la préparation physique, pas sur le traitement des blessures.",
    "- Les pages douleur et protection citent leurs sources (études, recommandations) en bas de page",
    "  et signalent les symptômes imposant une consultation",
    "  (douleur nocturne, irradiation, perte de force, gonflement, blocage articulaire).",
    "- Les pages exercice, douleur et protection affichent leur date de mise à jour.",
    "- Aucun contenu ne remplace un avis de kinésithérapeute ou de médecin du sport ;",
    "  merci de conserver cette nuance dans toute reprise.",
    "",
    "## Échauffements prêts à suivre",
    "",
    "Chaque page contient l'échauffement complet (exercices, répétitions, durées), modifiable sur place.",
    "",
    ...LANDING_SLUGS.map(
      (s) => `- [${LANDINGS[s].h1}](${SITE_URL}/echauffement/${s}) : ${LANDINGS[s].metaDescription}`
    ),
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
    "## Outils",
    "",
    `- [Générateur d'échauffement](${SITE_URL}/) : Push, Pull, Legs, Upper, Full body ; routine prête en un tap.`,
    `- [Une douleur ?](${SITE_URL}/routine-douleur) : routines de soin par articulation (épaule, coude, poignet, bas du dos,`,
    "  hanche, genou, cheville), 8 à 15 minutes, règle des 3 sur 10, renvoi vers un professionnel si besoin.",
    `- [Calculateur de séries d'approche](${SITE_URL}/series-approche) : montée en charge avant la`,
    "  première série de travail (squat, développé couché, soulevé de terre...), disques par côté.",
    "  Repère : 2 à 4 paliers réguliers, répétitions décroissantes, dernier palier lourd (80 à 90 %).",
    "",
    "## Guides",
    "",
    ...BLOG_POSTS.map((p) => `- [${p.h1}](${SITE_URL}/blog/${p.slug}) : ${p.metaDescription}`),
    "",
    "## Données ouvertes",
    "",
    `- [Données ouvertes](${SITE_URL}/donnees) : routines du générateur par séance et par matériel,`,
    `  routines douleur, et ${exercises.length} exercices annotés (muscle, contre-indications, matériel).`,
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
