import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Méthodologie et sources : comment ton plan est construit",
  description:
    "Comment Warmup construit ta préparation : des routines de référence par séance, mobilité puis activation, adaptées à ton matériel. Et comment il calcule les séries d'approche. Principes, sources et limites.",
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
    title: "Une routine de référence par séance",
     body: "Chaque séance type (Push, Pull, Legs, Upper, Full body) a sa routine, écrite d'un bloc comme un préparateur physique la composerait : par exemple, pour Push, cat-cow, pompes scapulaires, rotation externe et face pull. La même séance redonne toujours la même routine : on l'apprend, on la refait. Ce sont des propositions de programmation, pas une séquence dont l'optimalité serait démontrée.",
  },
  {
    n: "02",
    title: "Les pages par zone : des bases mises en commun",
    body: "Sur les pages par zone (pecs, dos, épaules, bras…), chaque zone apporte sa base de deux à quatre exercices. Un exercice partagé par plusieurs zones (le cat-cow pour les pecs, le dos et le gainage) n'apparaît qu'une fois et passe devant ; ensuite chaque zone reçoit à tour de rôle son exercice suivant, jusqu'à sept au plus. Les bras suivent la séance : triceps en Push, biceps en Pull, les deux quand tu choisis Bras toi-même.",
  },
  {
    n: "03",
    title: "Un ordre qui évite les allers-retours",
    body: "Mobilité, puis activation, puis les séries d'approche sur ton premier exercice. Pas de cardio : la montée en température se fait sur l'exercice lui-même, avec des charges progressives. Dans « Mes zones », la mobilité commence debout et descend au sol, l'activation repart du sol et finit debout. Trois à sept exercices : de quoi préparer sans fatiguer.",
  },
  {
    n: "04",
    title: "Ton matériel, des remplacements honnêtes",
    body: "Tu indiques une fois ton matériel (sans matériel, élastique ou salle) ; chaque exercice prend la variante correspondante : rotation externe à la poulie, à l'élastique, ou allongé sur le côté. Quand il n'existe pas d'équivalent fiable, l'outil le dit : sans matériel, le face pull devient un W allongé, qui travaille les mêmes muscles, et les exercices de bras disparaissent plutôt que d'être remplacés par un geste qui n'a rien à voir. Pas d'étirement tenu longtemps avant l'effort.",
  },
  {
    n: "05",
    title: "Une douleur : une routine à part",
    body: "Pour une articulation qui gêne (épaule, coude, poignet, bas du dos, hanche, genou, cheville), « Une douleur ? » propose une routine plus longue et plus lente que l'échauffement : mobilité douce, puis renforcement léger (contrôle, isométrie, comme la fente tenue pour le genou). Elle demande d'accepter une règle avant de commencer : la douleur reste sous 3 sur 10, pendant et après. Un outil pour aller mieux au quotidien, sans prétendre remplacer un kiné.",
  },
  {
    n: "06",
    title: "Les séries d'approche, un outil à part",
    body: "La montée en charge se fait sur l'exercice lui-même, une fois échauffé : c'est le second outil. À partir de ta charge et de tes répétitions de travail du jour, il calcule les paliers : des sauts réguliers (20 kg ou 20 % de la charge au plus), des répétitions qui baissent, et un dernier palier lourd (90 % avant 1 à 3 répétitions, 85 % avant 4 à 6, 80 % avant 7 à 10), le plus utile d'après les études récentes ; deux paliers seulement si l'exercice suit un autre exercice pour les mêmes muscles, arrondis aux disques réels.",
  },
];

// Ce qui relève de la recherche, ce qui relève de nos choix.
const STATUS = [
  {
    title: "Appuyé par la recherche",
    items: [
      "Un échauffement structuré améliore la performance sur la majorité des critères étudiés.",
      "Les étirements statiques longs (plus de 60 secondes par muscle) juste avant l'effort réduisent un peu la force et la puissance ; des durées courtes ont un effet négligeable.",
      "L'échauffement du haut du corps, dynamique puis spécifique, améliore la performance des membres supérieurs.",
    ],
  },
  {
    title: "Choix de conception",
    items: [
      "La liste des besoins de chaque zone et leur importance.",
      "Le choix de l'exercice qui répond à chaque besoin, et l'ordre qui limite les passages au sol.",
      "Les durées et le nombre d'exercices (trois à sept).",
    ],
  },
];

const SOURCES = [
  {
    label: "Jeffreys (2007)",
    full: "Warm-up revisited: the RAMP method of optimising warm-ups",
    desc: "Le cadre de référence : élever la température (Raise), activer et mobiliser (Activate & Mobilise), puis préparer le geste (Potentiate). L'outil reprend l'activation et la mobilisation ; les séries d'approche assurent la montée en température et la préparation du geste.",
  },
  {
    label: "Fradkin et al. (2010)",
    full: "Effects of warming-up on physical performance: a systematic review with meta-analysis",
    desc: "Revue systématique : l'échauffement améliore la performance dans 79 % des critères mesurés.",
  },
  {
    label: "McCrary, Ackermann & Halaki (2015)",
    full: "A systematic review of the effects of upper body warm-up on performance and injury",
    desc: "Revue sur le haut du corps : échauffements dynamiques et spécifiques améliorent la performance ; peu de données solides sur la prévention des blessures.",
  },
  {
    label: "Behm & Chaouachi (2011)",
    full: "A review of the acute effects of static and dynamic stretching on performance",
    desc: "Les étirements statiques prolongés réduisent la force et la puissance ; les étirements dynamiques préservent voire améliorent la performance.",
  },
  {
    label: "Behm et al. (2016)",
    full: "Acute effects of muscle stretching on physical performance, range of motion, and injury incidence",
    desc: "Au-dessous de 60 secondes par muscle, l'effet des étirements statiques sur la performance devient faible : c'est la durée qui compte.",
  },
  {
    label: "Hartmann et al. (2013)",
    full: "Analysis of the load on the knee joint and vertebral column with changes in squatting depth and weight load",
    desc: "Le squat profond bien exécuté n'est pas plus risqué pour le genou que le squat partiel, à charge adaptée.",
  },
  {
    label: "Page (2012)",
    full: "Current concepts in muscle stretching for exercise and rehabilitation",
    desc: "Cadre clinique sur la place des étirements avant et après l'effort, et sur la mobilité dynamique.",
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
          <Link href="/" aria-label="Warmup Generator, accueil" className="text-ink">
            <Logo />
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

        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-subtle">
          <Link href="/" className="transition-colors hover:underline underline-offset-4">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold text-ink">Méthodologie</span>
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink hyphens-auto sm:text-[40px] md:text-[46px]">
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
          <h2 className="mb-6 border-b border-line pb-3 font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
            Comment l&apos;outil choisit les exercices
          </h2>
          <ul className="flex flex-col divide-y divide-line">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="flex flex-col gap-1.5 py-4">
                <h3 className="text-[16px] font-bold leading-tight text-ink">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CE QUI EST PROUVÉ, CE QUI EST CHOISI */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-line pb-3 font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
            Ce qui est prouvé, ce qui est choisi
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {STATUS.map((g) => (
              <div key={g.title} className="border-t-2 border-ink pt-3">
                <h3 className="mb-2 text-[15px] font-bold text-ink">{g.title}</h3>
                <ul className="flex flex-col gap-2 text-[14px] leading-relaxed text-muted">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* STRUCTURE DU PLAN */}
        <section className="mb-14 border-l-[3px] border-accent pl-6">
          <h2 className="mb-4 font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
            Structure d&apos;un plan
          </h2>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            <p>
              La préparation reprend deux temps du protocole <strong className="text-ink">RAMP</strong> dans le générateur ; la montée en charge se fait dans le calculateur.
            </p>
            <ol className="flex flex-col gap-3 pl-4">
              <li>
                <strong className="text-ink">1. Mobilité</strong> : un à quatre mouvements sur les amplitudes que
                la séance demande (cat-cow, rotation thoracique, cheville au mur, squat profond assisté…).
              </li>
              <li>
                <strong className="text-ink">2. Activation</strong> : deux à quatre exercices légers sur les
                stabilisateurs (pompes scapulaires, rotation externe, face pull, glute bridge, dead bug…), sans fatigue.
              </li>
              <li>
                <strong className="text-ink">3. Séries d&apos;approche</strong> : dans le calculateur, sur ton
                premier exercice, à partir de ta charge du jour. C&apos;est là que le corps monte vraiment en température.
              </li>
            </ol>
            <p>
              Le plan affiche sa durée réelle, transitions comprises : 2 à 7 minutes selon la séance,
              puis quelques minutes de séries d&apos;approche selon la charge.
            </p>
          </div>
        </section>

        {/* SOURCES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
              Sources & références
            </h2>
            <span className="shrink-0 text-[14px] font-semibold text-ink">
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
                  <span className="text-[14px] font-semibold text-ink">
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
          <h2 className="mb-4 font-display text-[25px] font-extrabold tracking-tight text-ink md:text-[24px]">
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
              <span className="text-[14px] font-semibold">
                Essai
              </span>
              <span className="font-display text-[21px] font-extrabold leading-tight tracking-tight md:text-[20px]">
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
          <p className="mb-4 text-[14px] font-semibold text-subtle">
            Pour aller plus loin
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/a-propos"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
            >
              <span className="truncate">À propos du projet</span>
            </Link>
            <Link
              href="/echauffement/exercice/squat"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
            >
              <span className="truncate">Exemple : échauffement squat</span>
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
