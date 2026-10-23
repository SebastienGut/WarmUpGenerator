import Link from "next/link";
import Plates from "@/components/Plates";

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

export interface SEOSection {
  title: string;
  paragraphs: string[];
}

export interface SEORampRow {
  load: string;
  reps: number;
  percent: number;
  plates?: number[];
  restSeconds: number;
}

/** Exemple de séries d'approche calculé par le moteur, rendu côté serveur :
 * un contenu chiffré et vérifiable, citable tel quel. */
export interface SEORamp {
  title: string;
  intro: string;
  rows: SEORampRow[];
  work: string;
  calculatorHref: string;
}

export interface SEOPageProps {
  h1: string;
  subtitle?: string;
  breadcrumbs: SEOBreadcrumb[];
  /**
   * Réponse directe et autoportante à la question que pose la page, en 40-60
   * mots. Rendue juste sous le H1.
   *
   * Deux usages, l'un humain l'autre machine : le lecteur qui arrive avec une
   * douleur obtient sa réponse immédiatement, et les moteurs génératifs
   * (AI Overviews, ChatGPT, Perplexity) disposent d'un passage citable sans
   * contexte environnant — c'est la condition pour être repris comme source,
   * ces systèmes n'extrayant que des passages compréhensibles isolément.
   *
   * Contrainte de rédaction : aucune référence anaphorique (« comme vu plus
   * haut », « ce protocole »), un fait vérifiable, et le sujet nommé en toutes
   * lettres plutôt que repris par un pronom.
   */
  keyAnswer?: string;
  intro: string[];
  /** Sections rédactionnelles insérées entre l'intro et le protocole.
   * Utilisé par les pages douleur pour la partie diagnostic (« d'où vient
   * la douleur »), qui doit précéder le protocole pour répondre à l'intention
   * de recherche avant de proposer la solution. */
  sections?: SEOSection[];
  exerciseSectionTitle: string;
  exercises: SEOExercise[];
  advice?: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
  related?: { title: string; links: SEORelatedLink[] };
  siteUrl: string;
  path: string;
  /** @deprecated Conservé pour compat ascendante ; le schema HowTo a été retiré
   * (Google a supprimé les rich results HowTo en 2023). */
  howToName?: string;
  /** @deprecated Conservé pour compat ascendante. */
  totalDurationLabel?: string;
  ramp?: SEORamp;
  /** Deep-link vers /plan préconfiguré : le CTA devient « Lancer ce plan en mode guidé ». */
  planHref?: string;
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
    keyAnswer,
    intro,
    sections,
    exerciseSectionTitle,
    exercises,
    advice,
    faqs,
    related,
    siteUrl,
    path,
    planHref,
    ramp,
  } = props;

  const totalSeconds = totalSecondsOf(exercises);

  // NB : schemas HowTo et FAQPage retirés volontairement — Google a supprimé les
  // rich results HowTo (sept. 2023) et réservé les rich results FAQ aux sites
  // gouvernementaux/santé (août 2023). On conserve uniquement le BreadcrumbList,
  // qui produit toujours un affichage en SERP.
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

  const ctaBlock = (
    <div className="flex flex-col gap-3">
      <Link
        href={planHref ?? "/"}
        className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-accent px-6 py-5 text-on-accent transition-transform active:scale-[0.98]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[14px] font-semibold">
            {planHref ? "Mode guidé" : "Plan personnalisé"}
          </span>
          <span className="font-display text-[21px] font-extrabold leading-tight tracking-tight ">
            {planHref ? "Lancer ce plan, étape par étape" : "Construire ton échauffement"}
          </span>
          <span className="text-[12px] font-medium">
            {planHref
              ? "Séries d'approche comprises, repos décomptés · Hors ligne"
              : "Par zone ou type de séance · Gratuit, sans compte"}
          </span>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L14 8 L0 16 Z" />
          </svg>
        </div>
      </Link>
      {planHref && (
        <Link
          href="/"
          className="self-start text-[12px] font-medium text-subtle underline decoration-faint underline-offset-4 transition-colors hover:underline underline-offset-4"
        >
          Besoin d&apos;adapter ? Personnalise ton plan : muscles, zones sensibles, durée
        </Link>
      )}
    </div>
  );

  return (
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.href ? (
                <Link href={b.href} className="transition-colors hover:underline underline-offset-4">
                  {b.label}
                </Link>
              ) : (
                <span className="font-display font-semibold text-ink">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden="true" className="text-faint">/</span>}
            </span>
          ))}
        </nav>

        {/* HERO */}
        <section className="mb-14 flex flex-col gap-4">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink hyphens-auto sm:text-[40px] md:text-[46px]">
            {h1}
          </h1>
          {subtitle && <p className="-mt-2 text-[14px] font-semibold text-subtle">{subtitle}</p>}
          {keyAnswer && (
            <div className="mt-4 rounded-2xl border border-line bg-ink/[0.035] px-5 py-4">
              <p className="mb-2 text-[14px] font-semibold text-ink">
                En bref
              </p>
              <p
                className="text-[15px] font-medium leading-[1.65] text-ink md:text-[16px]"
                dangerouslySetInnerHTML={{ __html: keyAnswer }}
              />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            {intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </section>

        {/* SECTIONS RÉDACTIONNELLES (diagnostic) — avant le protocole */}
        {sections?.map((s) => (
          <section key={s.title} className="mb-14">
            <h2 className="mb-4 border-b-2 border-ink pb-2 font-display text-[26px] font-extrabold tracking-tight text-ink">
              {s.title}
            </h2>
            <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
              {s.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </section>
        ))}

        {/* EXERCISES */}
        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
            <h2 className="font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
              {exerciseSectionTitle}
            </h2>
            <span className="text-[14px] font-semibold text-subtle">
              {formatDuration(totalSeconds)}, {exercises.length} mouvements
            </span>
          </div>
          <ol className="divide-y divide-line">
            {exercises.map((ex, i) => (
              <li key={i} className="flex gap-4 py-4">
                <span className="w-6 shrink-0 font-display text-[18px] font-extrabold leading-snug text-subtle tabular">{i + 1}</span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[16px] font-semibold leading-snug text-ink">{ex.name}</h3>
                    <span className="shrink-0 font-display text-[16px] font-bold text-ink tabular">
                      {ex.reps ?? `${ex.durationSeconds} s`}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted">{ex.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {ramp && (
          <section className="mb-14">
            <h2 className="mb-2 border-b-2 border-ink pb-2 font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
              {ramp.title}
            </h2>
            <p className="mb-2 text-[15px] leading-[1.7] text-muted" dangerouslySetInnerHTML={{ __html: ramp.intro }} />
            <table className="w-full text-left">
              <tbody>
                {ramp.rows.map((r, i) => (
                  <tr key={i} className="border-b border-line">
                    <td className="w-7 py-3 font-display text-[16px] font-bold text-subtle tabular">{i + 1}</td>
                    <td className="py-3">
                      <span className="font-display text-[22px] font-bold leading-none text-ink tabular">{r.load}</span>
                      <span className="ml-1.5 font-display text-[18px] font-semibold text-muted">× {r.reps}</span>
                      <span className="mt-1 block text-[11px] text-subtle tabular">
                        {r.percent} % · repos {r.restSeconds} s
                      </span>
                    </td>
                    <td className="py-3 text-right">{r.plates && r.plates.length > 0 && <Plates plates={r.plates} size={22} />}</td>
                  </tr>
                ))}
                <tr className="bg-ink/[0.035]">
                  <td className="py-3 pl-1 font-display text-[18px] font-extrabold text-accent">→</td>
                  <td className="py-3" colSpan={2}>
                    <span className="font-display text-[22px] font-extrabold text-ink tabular">{ramp.work}</span>
                    <span className="ml-2 text-[13px] font-semibold text-ink">série de travail</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <Link href={ramp.calculatorHref} className="mt-3 inline-block text-[14px] font-semibold text-ink underline underline-offset-4">
              Calculer avec ta propre charge
            </Link>
          </section>
        )}

        {/* CTA générateur — après les exercices */}
        <section className="mb-14">
          {ctaBlock}
        </section>

        {/* ADVICE — accent lime à gauche */}
        {advice && (
          <section className="mb-14 border-l-2 border-line pl-6">
            <h2 className="mb-4 font-display text-[26px] font-extrabold tracking-tight text-ink">
              {advice.title}
            </h2>
            <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
              {advice.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
            <h2 className="font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
              Questions fréquentes
            </h2>
          </div>
          <div className="flex flex-col border-t border-line">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border-b border-line py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-ink">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 text-[16px] text-subtle transition-transform group-open:rotate-45 group-open:text-ink">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED */}
        {related && related.links.length > 0 && (
          <section className="mb-14">
            <p className="mb-4 text-[14px] font-semibold text-subtle">
              {related.title}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {related.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
                >
                  <span className="truncate">{l.label}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA générateur — bas de page */}
        <section className="mb-14">
          {ctaBlock}
        </section>

        {/* DISCLAIMER */}
        <footer className="border-t border-line pt-6 pb-24 text-[11px] leading-relaxed text-subtle md:pb-6">
          Cet article est informatif et ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou
          d&apos;un médecin du sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>

      {/* Barre sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md md:hidden">
        <Link
          href={planHref ?? "/"}
          className="flex items-center justify-between gap-3 rounded-xl bg-accent px-5 py-3 text-on-accent active:scale-[0.98] transition-transform"
        >
          <span className="font-display text-[17px] font-extrabold tracking-tight">
            {planHref ? "Lancer ce plan" : "Générer mon plan"}
          </span>
          <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L14 8 L0 16 Z" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
