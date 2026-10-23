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

  const h2 = "mb-4 font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink";

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1080px] items-center px-5 py-3 sm:px-8">
          <Link href="/" className="font-display text-[22px] font-extrabold leading-none tracking-tight text-ink">
            Warmup
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

        {/* Sur téléphone, le plan passe juste sous le titre ; la réponse « En bref »
            reste tôt dans le HTML et s'affiche après le plan. */}
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12">
          <section className="order-1 lg:col-start-1 lg:row-start-1">
            <h1 className="font-display text-[34px] font-extrabold leading-[1] tracking-tight text-ink hyphens-auto sm:text-[48px]">{landing.h1}</h1>
            <p className="mt-2 text-[14px] font-semibold text-subtle">{landing.kicker}</p>
            <ExerciseFigure id={landing.cover} label={landing.h1} large className="mt-6 hidden h-48 w-full max-w-[320px] lg:block" />
          </section>
          <p className="order-3 mt-6 self-start text-[16px] leading-relaxed text-muted lg:col-start-1 lg:row-start-2">{landing.keyAnswer}</p>
          <div className="order-2 mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
            <InlinePlan zones={landing.zones} defaultBand={!!landing.band} />
          </div>
        </div>

        <section className="mt-14">
          <h2 className={h2}>Ce que ta séance demande</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {landing.needs.map((n) => (
              <div key={n.title} className="border-t-2 border-ink pt-3">
                <h3 className="text-[16px] font-semibold leading-snug text-ink">{n.title}</h3>
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
            <span className="block font-display text-[22px] font-extrabold leading-none tracking-tight">Ensuite : tes séries d&apos;approche</span>
            <span className="mt-1.5 block text-[14px] text-paper/80">Ta charge du jour, et la montée en charge disque par disque pour y arriver.</span>
          </span>
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
          <p className="mb-3 text-[14px] font-semibold text-subtle">Autres échauffements</p>
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
