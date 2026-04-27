import type { MetadataRoute } from "next";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echauffement.app";

const MUSCLES: MuscleGroup[] = ["pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core"];
const OBJECTIVES: Objective[] = ["force", "hypertrophie", "reprise", "mobilite"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = MUSCLES.flatMap((muscle) =>
    OBJECTIVES.map((objectif) => ({
      url: `${SITE_URL}/echauffement/${muscle}/${objectif}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...staticPages,
  ];
}
