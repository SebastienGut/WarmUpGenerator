import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Méthodologie & sources — Comment l'algorithme construit ton plan",
  description:
    "Comment Warmup construit ton échauffement selon les zones travaillées : mise en route, mobilité, activation. Et comment il calcule les séries d'approche. Principes, sources et limites.",
  alternates: { canonical: "/methodologie", languages: { "fr-FR": "/methodologie" } },
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
    title: "Partir de ce que la zone exige",
    body: "Tu choisis ce que tu travailles (une séance type comme Jambes ou Push, ou tes zones). Chaque zone est décrite par ce qu'exigent ses exercices typiques, notés de 1 à 3 : les jambes demandent des chevilles et des hanches mobiles, des genoux contrôlés, des fessiers et un gainage actifs ; les pecs demandent des omoplates stables et une coiffe des rotateurs prête. L'outil n'en déduit pas tes exercices : il prépare la zone.",
  },
  {
    n: "02",
    title: "Mobilité et activation, chacune sa carte",
    body: "Ces exigences forment deux cartes de besoins, l'une pour la mobilité (chevilles, hanches, haut du dos, ischio-jambiers, épaules en hauteur…), l'autre pour l'activation (coiffe, omoplates, fessiers, gainage…). L'algorithme retient à chaque tour l'exercice de préparation qui couvre le mieux les besoins restants, puis réduit ceux qu'il vient de couvrir. Résultat : pas de doublon, et chaque exercice affiché dit pour quel mouvement il est là.",
  },
  {
    n: "03",
    title: "Les séries d'approche, un outil à part",
    body: "La montée en charge se fait sur l'exercice lui-même, une fois échauffé : c'est le second outil. À partir de ta charge et de tes répétitions de travail du jour, il calcule les paliers : plus la série est lourde, plus il y a de paliers et moins chaque palier compte de répétitions (pour 5 reps : barre × 10, 40 % × 5, 60 % × 3, 75 % × 2, 85 % × 1), arrondis aux disques réels.",
  },
  {
    n: "04",
    title: "Rien d'inutile",
    body: "Pas d'étirement statique avant l'effort (il réduit temporairement la force), pas de rotation de genou ou de nuque sans intérêt pour la séance, et un seuil de pertinence : un exercice n'entre dans le plan que s'il répond à un vrai besoin de tes exercices. Sans élastique, chaque exercice qui en demande un est remplacé par sa version sans matériel.",
  },
  {
    n: "05",
    title: "Les zones qui coincent",
    body: "Une zone déclarée douloureuse exclut tous les exercices contre-indiqués, ajoute une préparation dédiée (par exemple un step-up contrôlé pour le genou) et affiche un repère d'auto-régulation : la douleur doit rester sous 3 sur 10 pendant la montée en charge, sinon on arrête de monter. Ce sont des aides pour des gênes mineures, pas des traitements.",
  },
];

const SOURCES = [
  {
    label: "Jeffreys (2007)",
    full: "Warm-up revisited: the RAMP method of optimising warm-ups",
    desc: "Le cadre en trois temps repris par l'outil : élever la température (Raise), activer et mobiliser (Activate & Mobilise), puis potentialiser sur le geste de la séance (Potentiate).",
  },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Méthodologie et sources de Warmup Generator",
    description: metadata.description,
    url: `${SITE_URL}/methodologie`,
    inLanguage: "fr-FR",
    dateModified: "2026-10-11",
    author: { "@type": "Organization", name: "Warmup Generator" },
    publisher: {
      "@type": "Organization",
      name: "Warmup Generator",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/methodologie`,
  };

  return (
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <Link
            href="/"
            className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink transition-colors hover:text-accent-ink"
          >
            Warmup<span className="text-accent">.</span>
          </Link>
          <Link
            href="/"
            className="ml-auto font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-80"
          >
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 md:py-14">

        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-subtle">
          <Link href="/" className="transition-colors hover:text-accent-ink">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold uppercase tracking-wide text-ink">Méthodologie</span>
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            Algorithme · Sources · Transparence
          </p>
          <h1 className="font-display text-[41px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink md:text-[48px]">
            Comment l&apos;outil construit ton plan.
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            <p>
              Warmup Generator n&apos;utilise <strong className="text-ink">aucune intelligence artificielle générative</strong>.
              Le plan que tu reçois est construit par un algorithme déterministe : à entrées identiques (mêmes
              exercices, même charge, mêmes zones sensibles), tu obtiens toujours le même plan. Le calcul se
              fait dans ton navigateur, rien n&apos;est envoyé à un serveur.
            </p>
            <p>
              Cette page documente <strong className="text-ink">les 5 principes</strong> qui guident la sélection,
              ainsi que les <strong className="text-ink">sources scientifiques</strong> sur lesquelles s&apos;appuie
              le protocole. Tu sauras exactement pourquoi tel exercice se retrouve dans ton plan.
            </p>
          </div>
        </section>

        {/* PRINCIPES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="font-display text-[25px] font-extrabold uppercase tracking-tight text-ink md:text-[24px]">
              Les 5 principes de l&apos;algorithme
            </h2>
            <span className="shrink-0 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
              Logique de sélection
            </span>
          </div>
          <ol className="flex flex-col gap-2.5">
            {PRINCIPLES.map((p) => (
              <li
                key={p.n}
                className="overflow-hidden rounded-xl border border-line bg-card"
              >
                <div className="flex items-stretch">
                  <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-line bg-accent/[0.03]">
                    <span className="font-display text-[23px] font-extrabold tabular text-accent">
                      {p.n}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 px-4 py-3.5">
                    <h3 className="text-[15px] font-bold leading-tight text-ink">{p.title}</h3>
                    <p className="text-[13px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* STRUCTURE DU PLAN */}
        <section className="mb-14 border-l-[3px] border-accent pl-6">
          <h2 className="mb-4 font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Structure d&apos;un plan
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            <p>
              L&apos;échauffement suit le protocole <strong className="text-ink">RAMP</strong> : les deux premiers temps dans le générateur, le dernier dans le calculateur.
            </p>
            <ol className="flex flex-col gap-3 pl-4">
              <li>
                <strong className="text-ink">1. Mise en route</strong> — 2 minutes de cardio léger (rameur,
                vélo, corde) pour élever la température. Supprimée en version courte.
              </li>
              <li>
                <strong className="text-ink">2. Mobilité</strong> — 2 à 3 mouvements sur les amplitudes que
                la zone exige.
              </li>
              <li>
                <strong className="text-ink">3. Activation</strong> — 1 à 3 exercices légers sur les muscles
                stabilisateurs, plus une préparation dédiée par zone qui coince.
              </li>
              <li>
                <strong className="text-ink">4. Séries d&apos;approche</strong> — dans le calculateur, sur ton
                premier exercice lourd, à partir de ta charge du jour.
              </li>
            </ol>
            <p>
              Compte 4 minutes en version courte, 6 à 7 minutes en version complète, puis 4 à 8 minutes
              de séries d&apos;approche selon la charge : c&apos;est la partie la plus spécifique d&apos;un
              échauffement de musculation, d&apos;où un outil dédié.
            </p>
          </div>
        </section>

        {/* SOURCES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="font-display text-[25px] font-extrabold uppercase tracking-tight text-ink md:text-[24px]">
              Sources & références
            </h2>
            <span className="shrink-0 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
              Scientifique
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {SOURCES.map((s) => (
              <li
                key={s.label}
                className="rounded-xl border border-line bg-card px-4 py-3.5"
              >
                <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
                    {s.label}
                  </span>
                  <span className="text-[13px] font-bold text-ink">{s.full}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-muted">{s.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* LIMITES */}
        <section className="mb-14">
          <h2 className="mb-4 font-display text-[25px] font-extrabold uppercase tracking-tight text-ink md:text-[24px]">
            Limites & honnêteté
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            <p>
              <strong className="text-ink">L&apos;algorithme n&apos;est pas omniscient.</strong> Il propose un
              plan générique adapté à des entrées générales, pas un programme personnalisé sur
              mesure. Ton kinésithérapeute, ton préparateur physique ou ton médecin du sport
              connaissent <em>ton</em> historique, <em>tes</em> spécificités. Cet outil ne les remplace
              pas — il comble le vide quand tu n&apos;as pas accès à eux.
            </p>
            <p>
              <strong className="text-ink">La science évolue.</strong> Les recommandations sur l&apos;échauffement
              changent au fil de la recherche. Cette méthodologie est mise à jour quand un consensus
              scientifique évolue de manière significative. La dernière révision date de 2026.
            </p>
            <p>
              <strong className="text-ink">Si une zone fait mal, consulte.</strong> Les protocoles &quot;zones
              sensibles&quot; sont des aides à la pratique pour des gênes mineures, pas des traitements.
              Une douleur installée mérite un avis médical.
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
              <span className="font-display text-[14px] font-bold uppercase tracking-wide opacity-85">
                → Essai
              </span>
              <span className="font-display text-[21px] font-extrabold uppercase leading-tight tracking-tight md:text-[20px]">
                Construire mon échauffement
              </span>
              <span className="text-[12px] font-medium">
                Choisis tes exercices, l&apos;échauffement se construit en quelques secondes.
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
          <p className="mb-4 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            Pour aller plus loin
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/a-propos"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
            >
              <span className="truncate">À propos du projet</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent-ink">→</span>
            </Link>
            <Link
              href="/echauffement/exercice/squat"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
            >
              <span className="truncate">Exemple : échauffement squat</span>
              <span aria-hidden="true" className="shrink-0 font-mono text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent-ink">→</span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-line pt-6 text-[11px] leading-relaxed text-subtle">
          Méthodologie révisée en 2026. Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute
          ou d&apos;un médecin du sport.
        </footer>

      </div>
    </main>
  );
}
