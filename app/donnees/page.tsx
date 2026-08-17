import type { Metadata } from "next";
import Link from "next/link";
import { exercises } from "@/lib/warmup-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/donnees";

export const metadata: Metadata = {
  title: `Base de données ouverte : ${exercises.length} exercices d'échauffement`,
  description: `Jeu de données libre de ${exercises.length} exercices d'échauffement en français, annotés par muscle, objectif, contre-indications et articulations. Format JSON, licence CC BY 4.0, réutilisation libre.`,
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Base de données ouverte des exercices d'échauffement",
    description:
      "55 exercices annotés en français, JSON libre sous CC BY 4.0. Réutilisable pour vos applications, recherches ou projets.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base de données ouverte des exercices d'échauffement",
    description: "55 exercices annotés en français, JSON libre sous CC BY 4.0.",
  },
  robots: { index: true, follow: true },
};

/**
 * Page de documentation du jeu de données ouvert.
 *
 * Porte un schema.org/Dataset : c'est ce balisage qui rend la ressource
 * éligible à Google Dataset Search, un index distinct et très peu concurrentiel
 * comparé à la recherche web classique — donc accessible à un domaine jeune.
 */
export default function DonneesPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Référentiel d'exercices d'échauffement pour la musculation",
    description: `Jeu de données ouvert de ${exercises.length} exercices d'échauffement en français, annotés par groupe musculaire, objectif d'entraînement, contre-indications par zone sensible, articulations mobilisées et matériel requis. Conçu pour la génération automatisée de protocoles d'échauffement.`,
    url: `${SITE_URL}${PATH}`,
    identifier: `${SITE_URL}/api/exercices`,
    keywords: [
      "échauffement",
      "musculation",
      "exercices",
      "préparation physique",
      "contre-indications",
      "mobilité articulaire",
      "contre-indications",
    ],
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: "fr",
    creator: {
      "@type": "Organization",
      name: "Warmup Generator",
      url: SITE_URL,
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${SITE_URL}/api/exercices`,
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#050505]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#A3FF12" aria-hidden="true">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#A3FF12]"
          >
            Warmup / Generator
          </Link>
          <Link
            href="/"
            className="ml-auto font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12] transition-opacity hover:opacity-80"
          >
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 md:py-14">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-[#5A5A60]">
          <Link href="/" className="transition-colors hover:text-[#A3FF12]">Accueil</Link>
          <span aria-hidden="true" className="text-[#2E2E33]">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-white">Données ouvertes</span>
        </nav>

        <section className="mb-14 flex flex-col gap-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Open data · CC BY 4.0 · JSON
          </p>
          <h1 className="font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            Base de données des exercices
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              Le référentiel qui alimente le générateur est publié en accès libre :{" "}
              <strong className="text-white">{exercises.length} exercices d&apos;échauffement</strong> en français,
              annotés par groupe musculaire, objectif d&apos;entraînement, contre-indications
              par zone sensible, articulations mobilisées et matériel requis.
            </p>
            <p>
              À notre connaissance, il n&apos;existe pas d&apos;équivalent ouvert en français
              intégrant la dimension <strong className="text-white">contre-indication</strong> —
              c&apos;est-à-dire l&apos;information permettant d&apos;écarter automatiquement un
              exercice quand une zone est sensible, et d&apos;identifier ceux qui la soulagent.
              C&apos;est ce qui rend la base réutilisable pour autre chose que de l&apos;affichage.
            </p>
            <p>
              Réutilisation libre, y compris commerciale, avec attribution. Aucune
              inscription, aucune clé d&apos;API, aucune limite de débit.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/[0.06] pb-3 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Accès
          </h2>
          <a
            href="/api/exercices"
            className="group mb-6 flex items-center justify-between gap-4 rounded-2xl bg-[#A3FF12] px-6 py-5 text-black transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                → Endpoint JSON
              </span>
              <span className="font-mono text-[15px] font-black tracking-tight md:text-[17px]">
                /api/exercices
              </span>
              <span className="text-[12px] font-medium opacity-75">
                {exercises.length} exercices · Libellés inclus · CORS ouvert
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="#000" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </a>
          <pre className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0C0C0E] p-5 font-mono text-[12px] leading-relaxed text-[#A1A1A6]">
{`curl ${SITE_URL}/api/exercices

# Exercices sans matériel, sûrs pour une épaule sensible
curl -s ${SITE_URL}/api/exercices \\
  | jq '.exercises[]
        | select(.equipment == "aucun")
        | select(.contraindications | index("epaule") | not)
        | {id, name, category}'`}
          </pre>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/[0.06] pb-3 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Structure
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#0C0C0E]">
                  <th className="px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A3FF12]">Champ</th>
                  <th className="px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#5A5A60]">Contenu</th>
                </tr>
              </thead>
              <tbody className="text-[#A1A1A6]">
                {[
                  ["muscles", "Groupes musculaires préparés par l'exercice"],
                  ["objectives", "Force, hypertrophie, reprise ou mobilité"],
                  ["contraindications", "Zones sensibles pour lesquelles l'exercice est déconseillé"],
                  ["painSupport", "Zones sensibles que l'exercice aide activement à soulager"],
                  ["joints", "Articulations mobilisées"],
                  ["category", "Phase : mobilisation, activation ou préparation spécifique"],
                  ["equipment", "Matériel requis, de aucun à barre"],
                  ["durationSeconds", "Durée recommandée en secondes"],
                  ["description", "Consigne d'exécution rédigée en français"],
                ].map(([field, desc]) => (
                  <tr key={field} className="border-b border-white/[0.04] last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-white">{field}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#5A5A60]">
            La réponse embarque ses propres référentiels de libellés
            (<span className="font-mono text-[12px]">vocabularies</span>) et la définition de
            chaque champ (<span className="font-mono text-[12px]">fieldDefinitions</span>) :
            le jeu de données est lisible sans consulter cette page.
          </p>
        </section>

        <section className="mb-14 border-l-2 border-[#A3FF12]/40 pl-6">
          <h2 className="mb-4 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Licence et attribution
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              Publié sous{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/deed.fr"
                className="text-[#A3FF12] underline underline-offset-4"
                rel="license noopener"
                target="_blank"
              >
                Creative Commons Attribution 4.0
              </a>
              . Tu peux copier, modifier, redistribuer et exploiter commercialement ces
              données, y compris dans un produit fermé. La seule obligation est de citer
              la source.
            </p>
            <p className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] p-4 font-mono text-[12px] leading-relaxed text-[#A1A1A6]">
              Données : Warmup Generator ({SITE_URL}) — CC BY 4.0
            </p>
            <p>
              Ces données décrivent des exercices de préparation physique à visée
              informative. Elles ne constituent pas un avis médical et le champ{" "}
              <span className="font-mono text-[13px] text-white">contraindications</span>{" "}
              ne remplace pas l&apos;évaluation d&apos;un professionnel de santé. Si tu les
              intègres dans un produit destiné au public, conserve cet avertissement.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Voir aussi
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { href: "/methodologie", label: "Méthodologie de sélection" },
              { href: "/douleur", label: "Douleurs par exercice" },
              { href: "/echauffement/protection", label: "Protocoles zones sensibles" },
              { href: "/", label: "Générateur d'échauffement" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
              >
                <span className="truncate">{l.label}</span>
                <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
