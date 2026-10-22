import type { MetadataRoute } from "next";
import { PROTECTION_SLUGS } from "@/lib/content/protection";
import { EXERCICE_SLUGS } from "@/lib/content/exercice";
import { DOULEUR_SLUGS } from "@/lib/content/douleur";
import { LANDING_SLUGS } from "@/lib/content/landings";
import { BLOG_POSTS } from "@/lib/blog-content";
import { frDateToISO } from "@/lib/dates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Date de dernière mise à jour réelle du contenu (à actualiser lors des
// refontes). Un lastModified recalculé à chaque build envoie un faux signal
// de fraîcheur, que Google finit par ignorer.
const CONTENT_UPDATED = new Date("2026-10-22");

type Entry = MetadataRoute.Sitemap[number];
const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly", lastModified = CONTENT_UPDATED): Entry => ({
  url: `${SITE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    // Pages d'atterrissage : l'outil prêt à l'emploi sur les recherches réelles
    // (« échauffement haut du corps », « échauffement jambes »…). Priorité haute.
    ...LANDING_SLUGS.map((slug) => page(`/echauffement/${slug}`, 0.95)),
    page("/series-approche", 0.9),
    page("/echauffement", 0.85),
    ...EXERCICE_SLUGS.map((slug) => page(`/echauffement/exercice/${slug}`, 0.8)),
    page("/echauffement/exercice", 0.7),
    // Requêtes symptôme : intention forte, concurrence faible.
    page("/douleur", 0.8),
    ...DOULEUR_SLUGS.map((slug) => page(`/douleur/${slug}`, 0.85)),
    page("/echauffement/protection", 0.7),
    ...PROTECTION_SLUGS.map((zone) => page(`/echauffement/protection/${zone}`, 0.75)),
    page("/blog", 0.6, "weekly"),
    ...BLOG_POSTS.map((post) => page(`/blog/${post.slug}`, 0.7, "monthly", new Date(frDateToISO(post.publishDate)))),
    page("/methodologie", 0.5, "yearly"),
    page("/a-propos", 0.4, "yearly"),
    page("/donnees", 0.5, "yearly"),
  ];
}
