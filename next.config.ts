import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.warmup-generator.com" }],
        destination: "https://warmup-generator.com/:path*",
        permanent: true,
      },
      // Octobre 2026 : les combos deviennent des pages d'atterrissage à URL
      // courte, calquées sur les recherches (« échauffement haut du corps »).
      { source: "/echauffement/combo", destination: "/echauffement", permanent: true },
      { source: "/echauffement/combo/:slug", destination: "/echauffement/:slug", permanent: true },
      // Matrice muscle × objectif retirée : aucune demande de recherche réelle.
      {
        source: "/echauffement/:muscle(pecs|dos|epaules|jambes|fessiers|bras|core)/:objectif(force|hypertrophie|reprise|mobilite)",
        destination: "/echauffement/:muscle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
