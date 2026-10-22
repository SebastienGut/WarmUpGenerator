import Link from "next/link";
import InlinePlan from "@/components/InlinePlan";
import ExerciseFigure from "@/components/ExerciseFigure";
import { LANDINGS, type Landing } from "@/lib/content/landings";
import { buildSessionPlan, type PrepStep } from "@/lib/session-engine";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

/**
 * Page d'atterrissage « échauffement + zone » : l'outil d'abord, l'explication
 * ensuite. La personne qui arrive de Google a son échauffement sous les yeux
 * en moins d'une seconde, et peut le lancer.
 */
export default function LandingPage({ landing }: { landing: Landing }) {
  const path = `/echauffement/${landing.slug}`;
  // Plan de référence (variante 0) pour les données structurées.
  const plan = buildSessionPlan({ zones: landing.zones, lifts: [], pain: [], band: !!landing.band, short: false });
  const prep = plan.phases.flatMap((p) => p.steps).filter((s): s is PrepStep => s.kind === "prep");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Échauffements", item: `${SITE_URL}/echauffement` },
        { "@type": "ListItem", position: 3, name: landing.h1, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ExercisePlan",
      name: landing.h1,
      description: landing.keyAnswer,
      url: `${SITE_URL}${path}`,
      inLanguage: "fr-FR",
      activityDuration: `PT${plan.minutes}M`,
      exerciseType: "Échauffement",
      workload: prep.map((s) => `${s.exercise.name} : ${s.reps}`),
      isAccessibleForFree: true,
    },
  ];

  const h2 = "mb-4 font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink";

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1080px] items-center px-5 py-3 sm:px-8">
          <Link href="/" className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink">
            Warmup<span className="text-accent">.</span>
          </Link>
          <Link href="/series-approche" className="ml-auto text-[14px] font-medium text-muted hover:text-ink">
            Séries d&apos;approche
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1080px] px-5 pb-16 pt-6 sm:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-5 flex flex-wrap items-center gap-1.5 text-[12px] text-subtle">
          <Link href="/" className="hover:text-ink">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <Link href="/echauffement" className="hover:text-ink">Échauffements</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="text-ink">{landing.h1}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <section className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-display text-[15px] font-bold uppercase tracking-wide text-subtle">{landing.kicker}</p>
            <h1 className="mt-1 font-display text-[44px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[56px]">
              {landing.h1}
            </h1>
            <ExerciseFigure id={landing.cover} label={landing.h1} className="mt-4 hidden h-48 w-full max-w-[320px] lg:block" />
            <p className="mt-4 text-[16px] leading-relaxed text-muted">{landing.keyAnswer}</p>
          </section>

          <div className="mt-6 lg:mt-0">
            <InlinePlan zones={landing.zones} defaultBand={!!landing.band} />
          </div>
        </div>

        <section className="mt-14">
          <h2 className={h2}>Ce que ta séance demande</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {landing.needs.map((n, i) => (
              <div key={n.title} className="rounded-2xl border border-line bg-card p-5">
                <span className="font-display text-[22px] font-extrabold text-accent tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-[16px] font-semibold leading-snug text-ink">{n.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{n.body}</p>
              </div>
            ))}
          </div>
        </section>

        {landing.section && (
          <section className="mt-12 max-w-[68ch]">
            <h2 className={h2}>{landing.section.title}</h2>
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-muted">
              {landing.section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>
        )}

        <Link
          href="/series-approche"
          className="mt-12 flex items-center justify-between gap-4 rounded-2xl bg-ink px-6 py-5 text-paper transition-transform active:scale-[0.99]"
        >
          <span>
            <span className="block font-display text-[22px] font-extrabold uppercase leading-none tracking-tight">Ensuite : tes séries d&apos;approche</span>
            <span className="mt-1.5 block text-[14px] text-paper/80">Ta charge du jour → ta montée en charge, disques compris.</span>
          </span>
          <span aria-hidden="true" className="font-display text-[24px] font-extrabold">→</span>
        </Link>

        <section className="mt-12 max-w-[760px]">
          <h2 className={h2}>Questions fréquentes</h2>
          <div className="divide-y divide-line border-y border-line">
            {landing.faqs.map((f) => (
              <details key={f.q} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold leading-snug text-ink">
                  <h3>{f.q}</h3>
                  <span aria-hidden="true" className="shrink-0 font-display text-[22px] leading-none text-subtle transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="mb-3 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">Autres échauffements</p>
          <div className="flex flex-wrap gap-2">
            {landing.related.map((slug) => (
              <Link
                key={slug}
                href={`/echauffement/${slug}`}
                className="rounded-full border border-line-strong bg-card px-4 py-2 text-[14px] font-semibold text-ink hover:border-ink"
              >
                {LANDINGS[slug].h1}
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t border-line pt-6 text-[12px] leading-relaxed text-subtle">
          Ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du sport en cas de douleur installée.{" "}
          <Link href="/methodologie" className="underline underline-offset-2 hover:text-ink">
            Comment l&apos;échauffement est construit
          </Link>
        </p>
      </div>
    </main>
  );
}
