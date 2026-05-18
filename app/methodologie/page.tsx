import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Méthodologie & sources — Comment l'algorithme construit ton plan",
  description:
    "Comment Warmup Generator choisit les exercices, les durées et l'ordre. Sources scientifiques, principes de préparation physique, transparence totale sur l'algorithme.",
  alternates: { canonical: "/methodologie" },
  openGraph: {
    title: "Méthodologie & sources — Warmup Generator",
    description:
      "Transparence totale sur l'algorithme : comment l'outil sélectionne les exercices, et sur quelles bases scientifiques.",
    type: "article",
    locale: "fr_FR",
    url: "/methodologie",
    siteName: "Warmup Generator",
  },
  robots: { index: true, follow: true },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Élever la température corporelle",
    body: "L'augmentation de la température musculaire (1 à 2°C) améliore l'élasticité des tissus, la vitesse de conduction nerveuse et la libération d'oxygène par l'hémoglobine. Effet direct : plus de force et de vitesse disponibles.",
  },
  {
    n: "02",
    title: "Mobiliser les articulations sollicitées",
    body: "Le générateur cible les articulations spécifiques au groupe musculaire choisi (ex : épaule + thoracique pour les pecs, hanche + cheville pour les jambes). La mobilité dynamique préserve la force, contrairement aux étirements statiques pré-effort.",
  },
  {
    n: "03",
    title: "Activer la chaîne musculaire ciblée",
    body: "Activation à charge légère pour signaler aux muscles cibles \"tu vas bosser\". Améliore la connexion neuro-musculaire et la synchronisation des fibres dès la première série de travail.",
  },
  {
    n: "04",
    title: "Adapter à l'objectif",
    body: "Force : focus sur l'activation neuro-musculaire (recrutement de fibres). Hypertrophie : connexion mind-muscle. Mobilité : amplitudes complètes. Reprise : progressivité, plus de mobilisation, moins de charge.",
  },
  {
    n: "05",
    title: "Protéger les zones sensibles",
    body: "Si une zone est marquée comme sensible (épaule, genou, lombaires...), l'algorithme injecte des exercices thérapeutiques spécifiques (coiffe des rotateurs, gainage anti-extension, mobilité de cheville) en remplacement d'exercices contre-indiqués.",
  },
];

const SOURCES = [
  {
    label: "ACSM",
    full: "American College of Sports Medicine",
    desc: "Standards de la prescription d'exercice — recommandations sur le warm-up dynamique avant entraînement résistance.",
  },
  {
    label: "NSCA",
    full: "National Strength and Conditioning Association",
    desc: "Référentiel sur l'échauffement spécifique et la potentialisation post-activation (PAP) en force et puissance.",
  },
  {
    label: "Behm & Chaouachi (2011)",
    full: "A review of the acute effects of static and dynamic stretching",
    desc: "Méta-analyse fondatrice : les étirements statiques pré-effort réduisent la force de 5 à 10 %. Les étirements dynamiques préservent voire améliorent les performances.",
  },
  {
    label: "Hartmann et al. (2013)",
    full: "Analysis of the load on the knee joint and vertebral column with deep squat training",
    desc: "Étude de référence montrant que le squat profond, bien exécuté, n'augmente pas le risque de blessure et offre un meilleur recrutement musculaire que le squat parallèle.",
  },
  {
    label: "Fradkin et al. (2010)",
    full: "Effects of warming-up on physical performance: a systematic review",
    desc: "Revue systématique de 32 études : un warm-up structuré améliore la performance dans 79 % des cas mesurés.",
  },
  {
    label: "Page (2012)",
    full: "Current concepts in muscle stretching for exercise and rehabilitation",
    desc: "Cadre clinique sur la place des étirements en pré- et post-effort, et sur la mobilité dynamique en réhabilitation.",
  },
];

export default function MethodologyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Méthodologie", item: `${SITE_URL}/methodologie` },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-[#5A5A60]">
          <Link href="/" className="transition-colors hover:text-[#A3FF12]">Accueil</Link>
          <span aria-hidden="true" className="text-[#2E2E33]">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-white">Méthodologie</span>
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Algorithme · Sources · Transparence
          </p>
          <h1 className="font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            Comment l&apos;outil construit ton plan.
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              Warmup Generator n&apos;utilise <strong className="text-white">aucune intelligence artificielle générative</strong>.
              Le plan que tu reçois est construit par un algorithme déterministe : à entrées identiques (mêmes
              muscles, même objectif, même durée, mêmes zones sensibles), tu obtiens toujours le même
              plan. Pas de hallucinations, pas d&apos;exercices inventés.
            </p>
            <p>
              Cette page documente <strong className="text-white">les 5 principes</strong> qui guident la sélection,
              ainsi que les <strong className="text-white">sources scientifiques</strong> sur lesquelles s&apos;appuie
              le protocole. Tu sauras exactement pourquoi tel exercice se retrouve dans ton plan.
            </p>
          </div>
        </section>

        {/* PRINCIPES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              Les 5 principes de l&apos;algorithme
            </h2>
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
              Logique de sélection
            </span>
          </div>
          <ol className="flex flex-col gap-2.5">
            {PRINCIPLES.map((p) => (
              <li
                key={p.n}
                className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0C0C0E]"
              >
                <div className="flex items-stretch">
                  <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-white/[0.06] bg-[#A3FF12]/[0.03]">
                    <span className="font-mono text-[18px] font-black tabular-nums text-[#A3FF12]">
                      {p.n}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 px-4 py-3.5">
                    <h3 className="text-[15px] font-bold leading-tight text-white">{p.title}</h3>
                    <p className="text-[13px] leading-relaxed text-[#A1A1A6]">{p.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* STRUCTURE DU PLAN */}
        <section className="mb-14 border-l-2 border-[#A3FF12]/40 pl-6">
          <h2 className="mb-4 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Structure d&apos;un plan généré
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              Chaque plan suit une <strong className="text-white">séquence en trois temps</strong> identique,
              quel que soit le profil :
            </p>
            <ol className="flex flex-col gap-3 pl-4">
              <li>
                <strong className="text-white">1. Mobilisation articulaire</strong> — 2 à 3 mouvements
                ciblés sur les articulations sollicitées par les muscles choisis. Lubrifie, prépare,
                augmente l&apos;amplitude utile.
              </li>
              <li>
                <strong className="text-white">2. Activation musculaire</strong> — 2 à 3 exercices à
                charge légère (poids du corps ou élastique) pour signaler aux fibres musculaires
                qu&apos;elles vont travailler. Améliore la connexion neuro-musculaire.
              </li>
              <li>
                <strong className="text-white">3. Protection (si zone sensible)</strong> — 1 à 2
                exercices thérapeutiques spécifiques en cas de zone sensible cochée. Coiffe des
                rotateurs pour l&apos;épaule, gainage anti-extension pour les lombaires, mobilité de
                cheville pour le genou, etc.
              </li>
            </ol>
            <p>
              Les durées (5, 8 minutes...) modulent le nombre d&apos;exercices et leur durée individuelle,
              pas la séquence. Sur 5 minutes, on garde l&apos;essentiel. Sur 8 minutes, on ajoute des
              variations utiles.
            </p>
          </div>
        </section>

        {/* SOURCES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              Sources & références
            </h2>
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
              Scientifique
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {SOURCES.map((s) => (
              <li
                key={s.label}
                className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3.5"
              >
                <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#A3FF12]">
                    {s.label}
                  </span>
                  <span className="text-[13px] font-bold text-white">{s.full}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#A1A1A6]">{s.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* LIMITES */}
        <section className="mb-14">
          <h2 className="mb-4 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
            Limites & honnêteté
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            <p>
              <strong className="text-white">L&apos;algorithme n&apos;est pas omniscient.</strong> Il propose un
              plan générique adapté à des entrées générales, pas un programme personnalisé sur
              mesure. Ton kinésithérapeute, ton préparateur physique ou ton médecin du sport
              connaissent <em>ton</em> historique, <em>tes</em> spécificités. Cet outil ne les remplace
              pas — il comble le vide quand tu n&apos;as pas accès à eux.
            </p>
            <p>
              <strong className="text-white">La science évolue.</strong> Les recommandations sur l&apos;échauffement
              changent au fil de la recherche. Cette méthodologie est mise à jour quand un consensus
              scientifique évolue de manière significative. La dernière révision date de 2026.
            </p>
            <p>
              <strong className="text-white">Si une zone fait mal, consulte.</strong> Les protocoles &quot;zones
              sensibles&quot; sont des aides à la pratique pour des gênes mineures, pas des traitements.
              Une douleur installée mérite un avis médical.
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
                Tester l&apos;algorithme
              </span>
              <span className="text-[12px] font-medium opacity-75">
                30 secondes pour générer ton plan personnalisé.
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
              href="/a-propos"
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
            >
              <span className="truncate">À propos du projet</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">→</span>
            </Link>
            <Link
              href="/echauffement/exercice/squat"
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
            >
              <span className="truncate">Exemple : échauffement squat</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">→</span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-[#5A5A60]">
          Méthodologie révisée en 2026. Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute
          ou d&apos;un médecin du sport.
        </footer>

      </div>
    </main>
  );
}
