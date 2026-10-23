import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "À propos de Warmup, l'outil d'échauffement gratuit",
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
    dateModified: "2026-06-10",
    author: {
      "@type": "Person",
      name: "Sébastien Gutierrez",
      url: `${SITE_URL}/a-propos`,
      description:
        "Pratiquant de musculation de longue date, créateur de Warmup Generator.",
    },
    publisher: {
      "@type": "Organization",
      name: "Warmup Generator",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/a-propos`,
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sébastien Gutierrez",
    url: `${SITE_URL}/a-propos`,
    description:
      "Pratiquant de musculation de longue date, créateur de Warmup Generator — outil gratuit de génération d'échauffements personnalisés.",
    knowsAbout: ["musculation", "échauffement", "préparation physique", "prévention des blessures"],
    mainEntityOfPage: `${SITE_URL}/a-propos`,
  };

  return (
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <Link
            href="/"
            className="font-display text-[22px] font-extrabold leading-none tracking-tight text-ink transition-colors hover:underline underline-offset-4"
          >
            Warmup
          </Link>
          <Link
            href="/"
            className="ml-auto text-[14px] font-semibold text-ink transition-opacity hover:opacity-80"
          >
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 md:py-14">

        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-subtle">
          <Link href="/" className="transition-colors hover:underline underline-offset-4">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold text-ink">À propos</span>
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink hyphens-auto sm:text-[40px] md:text-[46px]">
            Un outil simple, par un sportif, pour les sportifs.
          </h1>
        </section>

        {/* MANIFESTE */}
        <section className="mb-14 flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
          <p>
            Warmup Generator est né d&apos;un constat simple : <strong className="text-ink">la majorité des
            pratiquants de musculation ne s&apos;échauffent pas correctement</strong>. Soit ils sautent
            cette étape par manque de temps, soit ils enchaînent mécaniquement quelques cercles
            d&apos;épaules et un peu de cardio sans vraiment préparer les muscles ciblés. Résultat :
            performance amputée sur la première série, et au fil des mois, un terrain favorable aux
            blessures évitables.
          </p>
          <p>
            Pourtant, un échauffement ciblé prend 5 minutes et change tout. Le problème, c&apos;est
            que <strong className="text-ink">trouver le bon protocole pour <em>sa</em> séance, <em>son</em> objectif et
            <em> ses</em> zones sensibles</strong> demande des heures de recherche dans des articles génériques
            ou contradictoires. Cet outil règle ce problème : tu choisis ce que tu travailles, il construit
            l&apos;échauffement qui y prépare. Un second outil calcule tes séries d&apos;approche. Sans inscription, sans pub.
          </p>
        </section>

        {/* AUTEUR */}
        <section className="mb-14 flex items-stretch overflow-hidden rounded-xl border border-line bg-card">
          <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-line bg-ink/[0.035]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col gap-1 px-4 py-4">
            <p className="text-[14px] font-semibold text-subtle">
              Qui est derrière l&apos;outil
            </p>
            <h2 className="text-[16px] font-bold leading-tight text-ink">Sébastien Gutierrez</h2>
            <p className="text-[13px] leading-relaxed text-muted">
              Pratiquant de musculation passionné de longue date. Warmup Generator est un projet
              personnel, sans société derrière, né de mes propres séances : l&apos;algorithme de
              sélection, la base d&apos;exercices et chaque protocole publié sur ce site sont
              construits et maintenus à la main. Les articles du blog sont signés sous ce nom.
            </p>
          </div>
        </section>

        {/* VALEURS */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
              Nos engagements
            </h2>
            <span className="text-[14px] font-semibold text-ink">
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
            ].map((v) => (
              <li
                key={v.title}
                className="flex items-stretch overflow-hidden rounded-xl border border-line bg-card"
              >
                <div className="flex flex-1 flex-col gap-1 px-4 py-3.5">
                  <h3 className="text-[15px] font-bold leading-tight text-ink">{v.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CE QUE L'OUTIL N'EST PAS */}
        <section className="mb-14 border-l-2 border-line pl-6">
          <h2 className="mb-4 font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
            Ce que cet outil n&apos;est pas
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            <p>
              Warmup Generator <strong className="text-ink">n&apos;est pas un programme d&apos;entraînement</strong>. Il
              ne remplace pas ton plan de musculation, ton coach, ni ton kinésithérapeute. C&apos;est
              un outil ciblé sur une étape précise : l&apos;échauffement, juste avant ta séance.
            </p>
            <p>
              <strong className="text-ink">Il n&apos;est pas un substitut médical.</strong> En cas de douleur
              persistante, de blessure récente ou de pathologie connue, consulte un professionnel
              de santé. Les protocoles &quot;zones sensibles&quot; sont des aides à la pratique, pas des
              traitements.
            </p>
            <p>
              <strong className="text-ink">Il n&apos;est pas alimenté par de l&apos;IA générative.</strong> Le générateur
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
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-accent px-6 py-5 text-on-accent transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-semibold">
                Essai
              </span>
              <span className="font-display text-[21px] font-extrabold leading-tight tracking-tight md:text-[20px]">
                Construire mon échauffement
              </span>
              <span className="text-[12px] font-medium">
                Choisis tes exercices du jour, la charge et ce qui coince.
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        {/* RELATED */}
        <section className="mb-14">
          <p className="mb-4 text-[14px] font-semibold text-subtle">
            Pour aller plus loin
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/methodologie"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
            >
              <span className="truncate">Méthodologie & sources</span>
            </Link>
            <Link
              href="/"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
            >
              <span className="truncate">Générateur d&apos;échauffement</span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-line pt-6 text-[11px] leading-relaxed text-subtle">
          Warmup Generator · Outil informatif sur l&apos;échauffement musculation. Ne remplace pas
          l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du sport.
        </footer>

      </div>
    </main>
  );
}
