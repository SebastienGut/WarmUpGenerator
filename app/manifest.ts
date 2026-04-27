import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Warmup Generator",
    short_name: "Warmup",
    description: "Générateur d'échauffement musculation personnalisé. Gratuit, sans inscription.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#090b10",
    theme_color: "#090b10",
    categories: ["fitness", "health", "sports"],
    lang: "fr",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
