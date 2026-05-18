import type { MetadataRoute } from "next";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { PROTECTION_SLUGS } from "@/lib/content/protection";
import { COMBO_SLUGS } from "@/lib/content/combo";
import { EXERCICE_SLUGS } from "@/lib/content/exercice";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const CONTENT_UPDATED_AT = new Date("2026-05-18");

const MUSCLES: MuscleGroup[] = ["pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core"];
const OBJECTIVES: Objective[] = ["force", "hypertrophie", "reprise", "mobilite"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED_AT;

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
    ...musclePages,
    ...protectionPages,
    ...comboPages,
    ...exercicePages,
  ];
}
