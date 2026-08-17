import type { MetadataRoute } from "next";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { PROTECTION_SLUGS } from "@/lib/content/protection";
import { COMBO_SLUGS } from "@/lib/content/combo";
import { EXERCICE_SLUGS } from "@/lib/content/exercice";
import { DOULEUR_SLUGS } from "@/lib/content/douleur";
import { BLOG_POSTS } from "@/lib/blog-content";
import { frDateToISO } from "@/lib/dates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const MUSCLES: MuscleGroup[] = ["pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core"];
const OBJECTIVES: Objective[] = ["force", "hypertrophie", "reprise", "mobilite"];

// Date de dernière mise à jour réelle du contenu statique (à actualiser lors
// des refontes de contenu). Un lastModified recalculé à chaque build envoie
// un faux signal de fraîcheur à Google et finit par être ignoré.
const CONTENT_UPDATED = new Date("2026-06-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;

  // Pages hub muscle : cibles principales ("échauffement pecs", "échauffement dos"...)
  const muscleHubPages: MetadataRoute.Sitemap = MUSCLES.map((muscle) => ({
    url: `${SITE_URL}/echauffement/${muscle}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Les 28 pages /echauffement/{muscle}/{objectif} sont VOLONTAIREMENT absentes
  // du sitemap depuis le 17/08/2026.
  //
  // Constat GSC : sur 34 URL « Détectée, actuellement non indexée », 20 sont des
  // pages de cette matrice — et les 7 pages hub muscle, qui ciblent de vraies
  // requêtes à volume, n'ont jamais été explorées non plus alors qu'elles sont
  // liées depuis la homepage. La profondeur de maillage n'est donc pas la
  // contrainte : c'est le budget de crawl alloué à un domaine sans autorité.
  //
  // Chaque URL déclarée entre en concurrence pour ce budget. La matrice, qui
  // vise des requêtes sans volume ("échauffement fessiers mobilité"), consommait
  // l'attention due aux pages qui en ont. Elle reste en ligne, indexable et
  // atteignable depuis les hubs muscle : on cesse simplement de la mettre en
  // avant. Réversible en réintroduisant `musclePages` ci-dessous.
  //
  // À réévaluer quand le taux d'indexation dépassera ~80 %.
  void OBJECTIVES;

  const protectionPages: MetadataRoute.Sitemap = PROTECTION_SLUGS.map((zone) => ({
    url: `${SITE_URL}/echauffement/protection/${zone}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9, // forte intention transactionnelle
  }));

  const comboPages: MetadataRoute.Sitemap = COMBO_SLUGS.map((combo) => ({
    url: `${SITE_URL}/echauffement/combo/${combo}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const exercicePages: MetadataRoute.Sitemap = EXERCICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/echauffement/exercice/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85, // long-tail très transactionnel
  }));

  // Cluster douleur : requêtes symptôme (« mal à X au Y »), la demande réelle.
  // Priorité maximale du site — intention forte et concurrence faible, c'est
  // là que le domaine peut se classer avant d'avoir de l'autorité.
  const douleurPages: MetadataRoute.Sitemap = DOULEUR_SLUGS.map((slug) => ({
    url: `${SITE_URL}/douleur/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(frDateToISO(post.publishDate)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/methodologie`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/echauffement`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/echauffement/exercice`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/echauffement/combo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/echauffement/protection`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/douleur`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/donnees`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...douleurPages,
    ...blogPages,
    ...muscleHubPages,
    ...protectionPages,
    ...comboPages,
    ...exercicePages,
  ];
}
