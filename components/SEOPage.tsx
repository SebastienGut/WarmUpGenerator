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
  href?: string; // optional — last segment is text only
}

export interface SEOPageProps {
  /** H1 visible on page */
  h1: string;
  /** Short subtitle / meta info under H1 */
  subtitle?: string;
  /** Breadcrumb trail (last item is current page) */
  breadcrumbs: SEOBreadcrumb[];
  /** 2-4 intro paragraphs (string array, supports basic React) */
  intro: string[];
  /** Section heading for the warmup list */
  exerciseSectionTitle: string;
  /** Curated warmup exercises */
  exercises: SEOExercise[];
  /** Optional secondary article block (advice, mistakes, etc.) */
  advice?: { title: string; paragraphs: string[] };
  /** FAQ items */
  faqs: SEOFaq[];
  /** Internal cross-links */
  related?: { title: string; links: SEORelatedLink[] };
  /** Site URL for breadcrumb schema */
  siteUrl: string;
  /** Path for breadcrumb schema, e.g. "/echauffement/protection/epaule-douleur" */
  path: string;
  /** Full schema HowTo name */
  howToName: string;
  /** Total duration label, e.g. "5 min" */
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
    description: intro[0]?.slice(0, 240) ?? howToName,
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
    <main className="flex flex-col min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HEADER */}
      <header className="border-b border-white/[0.06] px-4 py-3">
        <div className="max-w-[640px] mx-auto flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#A3FF12" aria-hidden="true">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:text-[#A3FF12] transition-colors"
          >
            Warmup / Generator
          </Link>
        </div>
      </header>

      <div className="max-w-[640px] mx-auto w-full px-5 py-8 flex flex-col gap-10">

        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="text-[11px] text-[#5A5A60] flex items-center gap-1.5 flex-wrap">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.href ? (
                <Link href={b.href} className="hover:text-[#A3FF12] transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span className="text-white">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden="true">›</span>}
            </span>
          ))}
        </nav>

        {/* HERO */}
        <article className="flex flex-col gap-3">
          <h1 className="font-sans text-[28px] font-black uppercase leading-[0.95] tracking-tight text-white">
            {h1}
          </h1>
          {subtitle && (
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-[#A1A1A6]">
            {intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </article>

        {/* EXERCISES */}
        <article className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h2 className="font-sans text-[20px] font-black tracking-tight text-white">
              {exerciseSectionTitle}
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
              {formatDuration(totalSeconds)} · {exercises.length} mouvements
            </span>
          </div>
          <ol className="flex flex-col gap-2">
            {exercises.map((ex, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-[14px] font-bold text-white">
                    <span className="font-mono text-[#5A5A60] mr-2">{(i + 1).toString().padStart(2, "0")}</span>
                    {ex.name}
                  </h3>
                  <span className="font-mono text-[11px] font-bold tabular-nums text-[#A3FF12] shrink-0">
                    {ex.reps ?? `${ex.durationSeconds}s`}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#A1A1A6]">{ex.description}</p>
              </li>
            ))}
          </ol>
        </article>

        {/* ADVICE (optional) */}
        {advice && (
          <article className="flex flex-col gap-3">
            <h2 className="font-sans text-[20px] font-black tracking-tight text-white">
              {advice.title}
            </h2>
            <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-[#A1A1A6]">
              {advice.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </article>
        )}

        {/* CTA générateur */}
        <div className="rounded-2xl border border-[#A3FF12]/20 bg-[#A3FF12]/[0.04] p-5 flex flex-col gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A3FF12]">
              → Générateur
            </p>
            <p className="mt-2 text-[15px] font-bold text-white leading-snug">
              Un plan adapté à ton profil exact en 30 secondes ?
            </p>
            <p className="mt-1 text-[13px] text-[#A1A1A6] leading-relaxed">
              Sélectionne tes muscles, ton objectif, tes zones sensibles. Le générateur fait le reste.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl bg-[#A3FF12] px-5 py-3 text-center text-[14px] font-black uppercase tracking-wide text-black hover:bg-[#B8FF42] transition-colors"
          >
            Générer mon plan
          </Link>
        </div>

        {/* FAQ */}
        <article className="flex flex-col gap-4">
          <h2 className="font-sans text-[20px] font-black tracking-tight text-white">
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-white">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="font-mono text-[#5A5A60] transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-[#A1A1A6]">{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        {/* RELATED */}
        {related && related.links.length > 0 && (
          <article className="flex flex-col gap-3">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {related.title}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {related.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-3 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
                >
                  <span className="truncate">{l.label}</span>
                  <span aria-hidden="true" className="font-mono text-[#5A5A60] group-hover:text-[#A3FF12]">→</span>
                </Link>
              ))}
            </div>
          </article>
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
