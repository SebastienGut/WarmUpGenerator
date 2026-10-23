import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Warmup Generator",
    short_name: "Warmup",
    description: "Générateur d'échauffement musculation personnalisé. Gratuit, sans inscription.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f5f2",
    theme_color: "#f4f5f2",
    categories: ["fitness", "health", "sports"],
    lang: "fr",
    icons: [
      {
        src: "/icons/logo-pwa-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/logo-pwa-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/logo-pwa-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
