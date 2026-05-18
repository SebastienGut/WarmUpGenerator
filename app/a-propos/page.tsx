import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "À propos — Warmup Generator, l'outil d'échauffement gratuit",
  description:
    "Pourquoi Warmup Generator existe : un outil gratuit, sans inscription, sans pub, conçu par un sportif pour les sportifs. Notre philosophie et nos engagements.",
  alternates: { canonical: "/a-propos", languages: { "fr-FR": "/a-propos" } },
  openGraph: {
    title: "À propos — Warmup Generator",
    description:
      "Un outil gratuit conçu par un sportif pour les sportifs. Notre philosophie, nos engagements, ce qui nous distingue.",
    type: "article",
    locale: "fr_FR",
    url: "/a-propos",
    siteName: "Warmup Generator",
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "À propos", item: `${SITE_URL}/a-propos` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "A propos de Warmup Generator",
    description: metadata.description,
    url: `${SITE_URL}/a-propos`,
    inLanguage: "fr-FR",
    dateModified: "2026-05-18",
    author: { "@type": "Organization", name: "Warmup Generator" },
    publisher: {
      "@type": "Organization",
      name: "Warmup Generator",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/a-propos`,
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* HEADER */}
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

        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-[#5A5A60]">
          <Link href="/" className="transition-colors hover:text-[#A3FF12]">Accueil</Link>
          <span aria-hidden="true" className="text-[#2E2E33]">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-white">À propos</span>
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Le projet · La philosophie
          </p>
          <h1 className="font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            Un outil simple, par un sportif, pour les sportifs.
          </h1>
        </section>

        {/* MANIFESTE */}
        <section className="mb-14 flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
          <p>
            Warmup Generator est né d&apos;un constat simple : <strong className="text-white">la majorité des
            pratiquants de musculation ne s&apos;échauffent pas correctement</strong>. Soit ils sautent
            cette étape par manque de temps, soit ils enchaînent mécaniquement quelques cercles
            d&apos;épaules et un peu de cardio sans vraiment préparer les muscles ciblés. Résultat :
            performance amputée sur la première série, et au fil des mois, un terrain favorable aux
            blessures évitables.
          </p>
          <p>
            Pourtant, un échauffement ciblé prend 5 minutes et change tout. Le problème, c&apos;est
            que <strong className="text-white">trouver le bon protocole pour <em>sa</em> séance, <em>son</em> objectif et
            <em> ses</em> zones sensibles</strong> demande des heures de recherche dans des articles génériques
            ou contradictoires. Cet outil règle ce problème en 30 secondes, sans inscription,
            sans pub, et avec un plan adapté à ton profil exact.
          </p>
        </section>

        {/* VALEURS */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              Nos engagements
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
              5 promesses
            </span>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              {
                title: "100 % gratuit, à vie.",
                body: "Aucun \"freemium\", aucun \"premium\", aucune fonctionnalité débloquée par paiement. L'outil est entièrement utilisable par tous, sans limite.",
              },
              {
                title: "Aucune inscription.",
                body: "Pas de compte, pas d'email demandé, pas de mot de passe à retenir. Tu arrives, tu génères, tu pars. Tes choix restent dans ton navigateur.",
              },
              {
                title: "Zéro pub, zéro tracking.",
                body: "Pas de bannières publicitaires, pas de cookies tiers, pas d'analytics intrusifs. Ta navigation reste privée. Aucune donnée personnelle n'est collectée ni revendue.",
              },
              {
                title: "Fonctionne hors ligne.",
                body: "Une fois la page chargée, l'outil tourne dans ton navigateur. Tu peux générer un plan dans le métro, en salle sans wifi, ou en mode avion. Aucune dépendance serveur.",
              },
              {
                title: "Conçu par un pratiquant.",
                body: "Le générateur n'est pas un produit marketing. Il est conçu par un sportif qui connaît la salle, les exercices, et les pièges classiques. Chaque protocole est pensé pour être réellement utilisé entre deux séries.",
              },
            ].map((v, i) => (
              <li
                key={i}
                className="flex items-stretch overflow-hidden rounded-xl border border-white/[0.06] bg-[#0C0C0E]"
              >
                <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-white/[0.06] bg-[#A3FF12]/[0.03]">
                  <span className="font-mono text-[18px] font-black tabular-nums text-[#A3FF12]">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 px-4 py-3.5">
                  <h3 className="text-[15px] font-bold leading-tight text-white">{v.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#A1A1A6]">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CE QUE L'OUTIL N'EST PAS */}
        <section className="mb-14 border-l-2 border-[#A3FF12]/40 pl-6">
          <h2 className="mb-4 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Ce que cet outil n&apos;est pas
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              Warmup Generator <strong className="text-white">n&apos;est pas un programme d&apos;entraînement</strong>. Il
              ne remplace pas ton plan de musculation, ton coach, ni ton kinésithérapeute. C&apos;est
              un outil ciblé sur une étape précise : l&apos;échauffement, juste avant ta séance.
            </p>
            <p>
              <strong className="text-white">Il n&apos;est pas un substitut médical.</strong> En cas de douleur
              persistante, de blessure récente ou de pathologie connue, consulte un professionnel
              de santé. Les protocoles &quot;zones sensibles&quot; sont des aides à la pratique, pas des
              traitements.
            </p>
            <p>
              <strong className="text-white">Il n&apos;est pas alimenté par de l&apos;IA générative.</strong> Le générateur
              est un algorithme déterministe : à entrées identiques, sortie identique. Pas de
              hallucinations, pas d&apos;exercices inventés. La base d&apos;exercices est construite et
              maintenue à la main, en cohérence avec les standards de la préparation physique.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14">
          <Link
            href="/"
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#A3FF12] px-6 py-5 text-black transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                → Essai
              </span>
              <span className="font-sans text-[18px] font-black uppercase leading-tight tracking-tight md:text-[20px]">
                Générer ton plan en 30 secondes
              </span>
              <span className="text-[12px] font-medium opacity-75">
                Sélectionne tes muscles, ton objectif, tes zones sensibles.
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="#000" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        {/* RELATED */}
        <section className="mb-14">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Pour aller plus loin
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/methodologie"
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
            >
              <span className="truncate">Méthodologie & sources</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">→</span>
            </Link>
            <Link
              href="/"
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
            >
              <span className="truncate">Générateur d&apos;échauffement</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">→</span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-[#5A5A60]">
          Warmup Generator · Outil informatif sur l&apos;échauffement musculation. Ne remplace pas
          l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du sport.
        </footer>

      </div>
    </main>
  );
}
