import Link from "next/link";

export interface SEOExercise {
  name: string;
  description: string;
  durationSeconds: number;
  reps?: string;
}

export interface SEOFaq {
  q: string;
  a: string;
}

export interface SEORelatedLink {
  href: string;
  label: string;
}

export interface SEOBreadcrumb {
  label: string;
  href?: string;
}

export interface SEOPageProps {
  h1: string;
  subtitle?: string;
  breadcrumbs: SEOBreadcrumb[];
  intro: string[];
  exerciseSectionTitle: string;
  exercises: SEOExercise[];
  advice?: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
  related?: { title: string; links: SEORelatedLink[] };
  siteUrl: string;
  path: string;
  howToName: string;
  totalDurationLabel: string;
}

function totalSecondsOf(ex: SEOExercise[]) {
  return ex.reduce((s, e) => s + e.durationSeconds, 0);
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m} min`;
  return `${m} min ${s.toString().padStart(2, "0")}`;
}

export default function SEOPage(props: SEOPageProps) {
  const {
    h1,
    subtitle,
    breadcrumbs,
    intro,
    exerciseSectionTitle,
    exercises,
    advice,
    faqs,
    related,
    siteUrl,
    path,
    howToName,
  } = props;

  const totalSeconds = totalSecondsOf(exercises);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToName,
    description: intro[0]?.replace(/<[^>]+>/g, "").slice(0, 240) ?? howToName,
    totalTime: `PT${Math.max(1, Math.round(totalSeconds / 60))}M`,
    inLanguage: "fr-FR",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    supply: [{ "@type": "HowToSupply", name: "Aucun matériel requis" }],
    tool: [{ "@type": "HowToTool", name: "Tapis de sol (optionnel)" }],
    step: exercises.map((ex, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: ex.name,
      text: ex.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: b.href ? `${siteUrl}${b.href}` : `${siteUrl}${path}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.href ? (
                <Link href={b.href} className="transition-colors hover:text-[#A3FF12]">
                  {b.label}
                </Link>
              ) : (
                <span className="font-mono uppercase tracking-[0.12em] text-white">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden="true" className="text-[#2E2E33]">/</span>}
            </span>
          ))}
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          {subtitle && (
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {subtitle}
            </p>
          )}
          <h1 className="font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            {h1}
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
            {intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </section>

        {/* EXERCISES */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              {exerciseSectionTitle}
            </h2>
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
              {formatDuration(totalSeconds)} · {exercises.length} mvts
            </span>
          </div>
          <ol className="flex flex-col gap-2.5">
            {exercises.map((ex, i) => (
              <li
                key={i}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0C0C0E] transition-colors hover:border-white/[0.12]"
              >
                <div className="flex items-stretch">
                  {/* Numéro à gauche */}
                  <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-white/[0.06] bg-[#A3FF12]/[0.03]">
                    <span className="font-mono text-[18px] font-black tabular-nums text-[#A3FF12]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  {/* Contenu */}
                  <div className="flex flex-1 flex-col gap-1.5 px-4 py-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-bold leading-tight text-white">
                        {ex.name}
                      </h3>
                      <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums uppercase tracking-wider text-[#A3FF12]">
                        {ex.reps ?? `${ex.durationSeconds}s`}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#A1A1A6]">{ex.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA générateur */}
        <section className="mb-14">
          <Link
            href="/"
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#A3FF12] px-6 py-5 text-black transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                → Plan personnalisé
              </span>
              <span className="font-sans text-[18px] font-black uppercase leading-tight tracking-tight md:text-[20px]">
                Générer ton échauffement sur mesure
              </span>
              <span className="text-[12px] font-medium opacity-75">
                Adapté à tes muscles, ton objectif, tes zones sensibles · 30 secondes
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="#000" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        {/* ADVICE — accent lime à gauche */}
        {advice && (
          <section className="mb-14 border-l-2 border-[#A3FF12]/40 pl-6">
            <h2 className="mb-4 font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              {advice.title}
            </h2>
            <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
              {advice.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              Questions fréquentes
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
              FAQ · {faqs.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-5 py-4 transition-colors hover:border-white/[0.12] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-white">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[16px] text-[#5A5A60] transition-transform group-open:rotate-45 group-open:text-[#A3FF12]">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-[#A1A1A6]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED */}
        {related && related.links.length > 0 && (
          <section className="mb-14">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {related.title}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {related.links.map((l) => (
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
        )}

        {/* DISCLAIMER */}
        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-[#5A5A60]">
          Cet article est informatif et ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou
          d&apos;un médecin du sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>
    </main>
  );
}
