import type { Metadata } from "next";
import Link from "next/link";
import ApproachCalculator from "@/components/ApproachCalculator";
import {
  EXERCISE_LABELS,
  computeApproachSets,
  formatKg,
  formatPlates,
  type ApproachExercise,
} from "@/lib/approach-sets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";
const PATH = "/series-approche";

export const metadata: Metadata = {
  title: "Calculateur de séries d'approche en musculation",
  description:
    "Entre ta charge de travail : le calculateur te donne tes séries d'approche (poids, répétitions, disques par côté, repos) pour le squat, le développé couché, le soulevé de terre. Gratuit.",
  alternates: { canonical: PATH, languages: { "fr-FR": PATH } },
  openGraph: {
    title: "Calculateur de séries d'approche — Warmup Generator",
    description:
      "Tes séries de montée en charge calculées à partir de ta charge de travail, disques par côté inclus.",
    type: "website",
    locale: "fr_FR",
    url: PATH,
    siteName: "Warmup Generator",
  },
  robots: { index: true, follow: true },
};

// Exemples rendus au build avec le même moteur que le calculateur : lisibles
// sans JavaScript (robots, moteurs génératifs) et jamais désynchronisés.
const EXAMPLES: { exercise: ApproachExercise; weight: number; reps: number }[] = [
  { exercise: "squat", weight: 100, reps: 5 },
  { exercise: "developpe-couche", weight: 80, reps: 8 },
  { exercise: "souleve-de-terre", weight: 140, reps: 3 },
];

const RAMP_TABLE = [
  { work: "1 à 3 reps (force max)", ramp: "Barre × 10 · 40 % × 5 · 60 % × 3 · 75 % × 2 · 85 % × 1 · 92 % × 1" },
  { work: "4 à 6 reps (force)", ramp: "Barre × 10 · 40 % × 5 · 60 % × 3 · 75 % × 2 · 85 % × 1" },
  { work: "7 à 10 reps (hypertrophie)", ramp: "Barre × 10 · 50 % × 8 · 70 % × 4 · 85 % × 2" },
  { work: "11 reps et plus", ramp: "Barre × 10 · 50 % × 10 · 75 % × 4" },
];

const FAQS = [
  {
    q: "Combien de séries d'approche faut-il faire ?",
    a: "Entre deux et cinq selon la charge. Plus la série de travail est lourde, plus il faut de paliers : trois suffisent avant une série de 10 répétitions, quatre à cinq avant une série de 1 à 5 répétitions. Seul le premier exercice polyarticulaire de la séance en demande une montée complète ; les suivants se contentent d'une ou deux séries.",
  },
  {
    q: "Les séries d'approche comptent-elles dans le volume d'entraînement ?",
    a: "Non. Elles sont volontairement trop légères et trop courtes pour produire de la fatigue ou un stimulus de progression. Si une série d'approche te fatigue, elle est mal dosée : réduis les répétitions des derniers paliers plutôt que d'en enlever.",
  },
  {
    q: "Faut-il encore faire un échauffement général avant les séries d'approche ?",
    a: "Oui, les deux se complètent. L'échauffement général (mobilité, activation, 3 à 8 minutes) prépare les articulations et les muscles stabilisateurs ; les séries d'approche préparent le geste précis et le système nerveux à la charge. L'ordre est toujours : échauffement général, puis séries d'approche sur le premier exercice.",
  },
  {
    q: "Combien de temps de repos entre deux séries d'approche ?",
    a: "Très peu au début : 30 à 45 secondes sur les paliers légers, le temps de changer les disques. Puis 60 à 90 secondes sur les deux derniers paliers, au-delà de 75 % de la charge de travail, pour arriver frais sur la série qui compte.",
  },
  {
    q: "Pourquoi commencer le soulevé de terre avec des disques plutôt qu'à la barre seule ?",
    a: "La barre nue est trop basse : sans disques, elle repose au sol bien plus bas qu'en position de départ réelle, ce qui force à arrondir le dos pour l'attraper. On commence donc avec au moins une paire de disques de 10 kg, ou la barre posée sur des cales.",
  },
];

function ExampleTable({ exercise, weight, reps }: (typeof EXAMPLES)[number]) {
  const sets = computeApproachSets({ exercise, workWeight: weight, workReps: reps, barWeight: 20 });
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-[15px] font-bold text-ink">
        {EXERCISE_LABELS[exercise]} à {formatKg(weight)} pour {reps} répétitions
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-card font-display text-[14px] font-semibold uppercase tracking-wide text-subtle">
            <tr>
              <th className="px-3 py-2.5">Série</th>
              <th className="px-3 py-2.5">Charge</th>
              <th className="px-3 py-2.5">Reps</th>
              <th className="px-3 py-2.5">Disques / côté</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {sets.map((s, i) => (
              <tr key={i} className="border-t border-line">
                <td className="px-3 py-2.5 font-mono">{i + 1}</td>
                <td className="px-3 py-2.5 font-bold text-ink">
                  {formatKg(s.weight)} <span className="font-normal text-subtle">({s.percent} %)</span>
                </td>
                <td className="px-3 py-2.5">{s.reps}</td>
                <td className="px-3 py-2.5">{s.emptyBar ? "barre seule" : formatPlates(s.platesPerSide)}</td>
              </tr>
            ))}
            <tr className="border-t border-accent/30 bg-accent/[0.05]">
              <td className="px-3 py-2.5 font-mono text-accent-ink">→</td>
              <td className="px-3 py-2.5 font-black text-ink">{formatKg(weight)}</td>
              <td className="px-3 py-2.5 text-ink">{reps}</td>
              <td className="px-3 py-2.5 text-accent-ink">série de travail</td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function SeriesApprochePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Séries d'approche", item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculateur de séries d'approche",
      url: `${SITE_URL}${PATH}`,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
  ];

  const h2 = "mb-4 border-b border-line pb-3 font-display text-[25px] font-extrabold uppercase tracking-tight text-ink md:text-[24px]";
  const body = "flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]";

  return (
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <Link href="/" className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink transition-colors hover:text-accent-ink">
            Warmup<span className="text-accent">.</span>
          </Link>
          <Link href="/" className="ml-auto font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink hover:opacity-80">
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:px-6 md:py-14">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-1.5 text-[11px] text-subtle">
          <Link href="/" className="hover:text-accent-ink">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold uppercase tracking-wide text-ink">Séries d&apos;approche</span>
        </nav>

        <section className="mb-6 flex flex-col gap-4">
          <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            Calculateur · Montée en charge · Disques par côté
          </p>
          <h1 className="font-display text-[39px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink md:text-[48px]">
            Calculateur de séries d&apos;approche
          </h1>
        </section>

        <section className="mb-14">
          <ApproachCalculator />
          <p className="mt-3 text-[12px] leading-relaxed text-subtle">
            Charges arrondies à 2,5 kg (une paire de disques de 1,25 kg), 2 kg pour les haltères.
            Les paramètres sont dans l&apos;adresse de la page : ajoute-la à ton écran d&apos;accueil pour
            la retrouver en salle.
          </p>
          <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/[0.04] px-5 py-4">
            <p className="mb-2 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">En bref</p>
            <p className="text-[15px] font-medium leading-[1.65] text-ink md:text-[16px]">
              Les séries d&apos;approche sont des séries légères et courtes, faites à charge croissante
              avant la première série de travail d&apos;un exercice. Pour une série de 5 répétitions, la
              montée classique est : barre seule × 10, puis 40 % × 5, 60 % × 3, 75 % × 2 et 85 % × 1 de
              la charge de travail, avec 45 à 90 secondes de repos.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className={h2}>À quoi servent les séries d&apos;approche</h2>
          <div className={body}>
            <p>
              L&apos;échauffement général prépare le corps ; les séries d&apos;approche préparent
              <strong className="text-ink"> le geste et la charge</strong>. Elles répètent le mouvement
              exact de la séance pendant que le poids monte, ce qui laisse au système nerveux le temps de
              recruter progressivement plus de fibres, et te permet de vérifier ta technique à 60 % avant
              de la tester à 100 %.
            </p>
            <p>
              Le piège le plus courant est d&apos;en faire trop : des séries d&apos;approche à 8 ou 10
              répétitions jusqu&apos;à 80 % de la charge entament la fatigue avant la série qui compte. La
              règle est inverse de l&apos;intuition — plus la charge monte, plus les répétitions
              descendent, jusqu&apos;à une seule répétition sur le dernier palier.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className={h2}>Les paliers selon tes répétitions de travail</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-card font-display text-[14px] font-semibold uppercase tracking-wide text-subtle">
                <tr>
                  <th className="px-3 py-2.5">Série de travail</th>
                  <th className="px-3 py-2.5">Montée en charge</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {RAMP_TABLE.map((r) => (
                  <tr key={r.work} className="border-t border-line">
                    <td className="px-3 py-2.5 font-bold text-ink">{r.work}</td>
                    <td className="px-3 py-2.5">{r.ramp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-subtle">
            Pourcentages exprimés par rapport à la charge de ta série de travail, pas de ton 1RM. Le
            calculateur fusionne les paliers trop proches quand la charge est légère.
          </p>
        </section>

        <section className="mb-14">
          <h2 className={h2}>Exemples calculés</h2>
          <div className="flex flex-col gap-8">
            {EXAMPLES.map((e) => (
              <ExampleTable key={e.exercise} {...e} />
            ))}
          </div>
        </section>

        <section className="mb-14 border-l-2 border-accent/40 pl-6">
          <h2 className="mb-4 font-display text-[25px] font-extrabold uppercase tracking-tight text-ink md:text-[24px]">
            Avant les séries d&apos;approche
          </h2>
          <div className={body}>
            <p>
              Les séries d&apos;approche ne remplacent pas l&apos;échauffement articulaire. Commence par 3 à
              5 minutes de mobilité et d&apos;activation ciblées sur les muscles de ta séance, puis enchaîne
              sur la montée en charge de ton premier exercice.
            </p>
            <Link
              href="/"
              className="flex items-center justify-between gap-4 rounded-2xl bg-accent px-6 py-5 text-on-accent transition-transform active:scale-[0.98]"
            >
              <span className="font-display text-[20px] font-extrabold uppercase leading-tight tracking-tight">
                Générer mon échauffement général
              </span>
              <span aria-hidden="true" className="font-mono text-[18px] font-black">→</span>
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className={h2}>Questions fréquentes</h2>
          <div className="flex flex-col gap-2">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-ink">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[16px] text-subtle transition-transform group-open:rotate-45 group-open:text-accent-ink">+</span>
                </summary>
                <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="mb-4 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">Aller plus loin</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { href: "/echauffement/exercice", label: "Échauffement par exercice" },
              { href: "/douleur", label: "Douleurs par exercice" },
              { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps s'échauffer" },
              { href: "/methodologie", label: "Méthodologie" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <span className="truncate">{l.label}</span>
                <span aria-hidden="true" className="font-mono text-subtle">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
