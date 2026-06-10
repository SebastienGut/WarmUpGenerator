import type { MetadataRoute } from "next";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { PROTECTION_SLUGS } from "@/lib/content/protection";
import { COMBO_SLUGS } from "@/lib/content/combo";
import { EXERCICE_SLUGS } from "@/lib/content/exercice";
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

  const musclePages: MetadataRoute.Sitemap = MUSCLES.flatMap((muscle) =>
    OBJECTIVES.map((objectif) => ({
      url: `${SITE_URL}/echauffement/${muscle}/${objectif}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

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
    ...blogPages,
    ...muscleHubPages,
    ...musclePages,
    ...protectionPages,
    ...comboPages,
    ...exercicePages,
  ];
}
