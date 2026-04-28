import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateWarmup, formatDuration } from "@/lib/warmup-engine";
import ExerciseCard from "@/components/ExerciseCard";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { MUSCLE_LABELS, OBJECTIVE_LABELS } from "@/lib/warmup-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

const VALID_MUSCLES: MuscleGroup[] = [
  "pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core",
];
const VALID_OBJECTIVES: Objective[] = [
  "force", "hypertrophie", "reprise", "mobilite",
];

interface PageProps {
  params: Promise<{ muscle: string; objectif: string }>;
}

export function generateStaticParams() {
  return VALID_MUSCLES.flatMap((muscle) =>
    VALID_OBJECTIVES.map((objectif) => ({ muscle, objectif }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { muscle, objectif } = await params;

  if (
    !VALID_MUSCLES.includes(muscle as MuscleGroup) ||
    !VALID_OBJECTIVES.includes(objectif as Objective)
  ) {
    return {};
  }

  const muscleLabel = MUSCLE_LABELS[muscle as MuscleGroup];
  const objectiveLabel = OBJECTIVE_LABELS[objectif as Objective];
  const title = `Échauffement ${muscleLabel} ${objectiveLabel} — Plan complet en 5 min`;
  const description = `Plan d'échauffement complet pour les ${muscleLabel.toLowerCase()} en ${objectiveLabel.toLowerCase()}. Mobilisation articulaire et activation musculaire en 5 minutes. 100% gratuit, sans inscription.`;
  const path = `/echauffement/${muscle}/${objectif}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "fr_FR",
      url: path,
      siteName: "Warmup Generator",
      // og:image hérité de app/opengraph-image.tsx (root)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // twitter:image hérité de app/twitter-image.tsx (root)
    },
    robots: { index: true, follow: true },
  };
}

function getFaqs(muscleLabel: string, objectiveLabel: string): { q: string; a: string }[] {
  return [
    {
      q: `Combien de temps doit durer un échauffement ${muscleLabel.toLowerCase()} ?`,
      a: `Pour une séance ${objectiveLabel.toLowerCase()}, 5 à 8 minutes d'échauffement ciblé suffisent : 2-3 minutes de mobilisation articulaire puis 2-5 minutes d'activation musculaire spécifique. Au-delà, tu fatigues sans bénéfice supplémentaire.`,
    },
    {
      q: `Faut-il s'étirer avant la musculation ${muscleLabel.toLowerCase()} ?`,
      a: `Non — les étirements statiques avant l'effort réduisent la force et la puissance de 5 à 10 %. Privilégie la mobilité dynamique et l'activation musculaire. Les étirements statiques ont leur place après la séance ou les jours off.`,
    },
    {
      q: `Quels exercices d'échauffement pour ${muscleLabel.toLowerCase()} en ${objectiveLabel.toLowerCase()} ?`,
      a: `Le plan ci-dessus combine mobilisation articulaire (préparer les articulations) et activation musculaire (réveiller les fibres ciblées). Pour la ${objectiveLabel.toLowerCase()}, on insiste sur la connexion neuro-musculaire et la préparation à des charges lourdes ou un volume élevé.`,
    },
    {
      q: `Cet échauffement remplace-t-il les séries de chauffe avec barre ?`,
      a: `Non. Cet échauffement prépare le corps. Sur les exercices polyarticulaires (squat, développé couché, soulevé de terre), ajoute toujours 2 à 3 séries de chauffe progressive avec la barre avant tes séries de travail.`,
    },
  ];
}

export default async function StaticPlanPage({ params }: PageProps) {
  const { muscle, objectif } = await params;

  if (
    !VALID_MUSCLES.includes(muscle as MuscleGroup) ||
    !VALID_OBJECTIVES.includes(objectif as Objective)
  ) {
    notFound();
  }

  const muscleTyped = muscle as MuscleGroup;
  const objectiveTyped = objectif as Objective;

  const plan = generateWarmup({
    muscles: [muscleTyped],
    objective: objectiveTyped,
    zones: ["aucune"],
    duration: 5,
  });

  const muscleLabel = MUSCLE_LABELS[muscleTyped];
  const objectiveLabel = OBJECTIVE_LABELS[objectiveTyped];
  const allExercises = [...plan.articulaire, ...plan.activation];
  const faqs = getFaqs(muscleLabel, objectiveLabel);
  const path = `/echauffement/${muscle}/${objectif}`;
  const pageUrl = `${SITE_URL}${path}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Échauffement ${muscleLabel} — ${objectiveLabel}`,
    description: `Plan d'échauffement de 5 minutes pour les ${muscleLabel.toLowerCase()}, objectif ${objectiveLabel.toLowerCase()}.`,
    totalTime: "PT5M",
    inLanguage: "fr-FR",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    supply: [{ "@type": "HowToSupply", name: "Aucun matériel requis" }],
    tool: [{ "@type": "HowToTool", name: "Tapis de sol (optionnel)" }],
    step: allExercises.map((ex, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: ex.name,
      text: ex.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `Échauffement ${muscleLabel}`,
        item: `${SITE_URL}/echauffement/${muscle}/force`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: objectiveLabel,
        item: pageUrl,
      },
    ],
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

  let index = 1;

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="border-b border-[var(--border)] px-4 py-3 flex-shrink-0">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <span className="text-base">⚡</span>
          <Link
            href="/"
            className="text-xs font-bold text-[var(--foreground)] hover:text-green-400 transition-colors"
          >
            Warmup Generator
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-3 px-4 py-4 max-w-lg mx-auto w-full">

        {/* Breadcrumbs visibles */}
        <nav aria-label="Fil d'Ariane" className="text-[11px] text-[var(--muted)] flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-green-400 transition-colors">Accueil</Link>
          <span aria-hidden="true">›</span>
          <span>Échauffement {muscleLabel}</span>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--foreground)]">{objectiveLabel}</span>
        </nav>

        <div className="flex flex-col gap-0.5 pb-1">
          <h1 className="text-lg font-bold text-[var(--foreground)] leading-tight">
            Échauffement {muscleLabel}
          </h1>
          <p className="text-sm text-[var(--muted)]">
            {objectiveLabel} · {formatDuration(plan.totalSeconds)} · {allExercises.length} exercices
          </p>
        </div>

        {plan.articulaire.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] px-1">
              Mobilisation articulaire
            </p>
            {plan.articulaire.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} index={index++} />
            ))}
          </div>
        )}

        {plan.activation.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] px-1">
              Activation
            </p>
            {plan.activation.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} index={index++} />
            ))}
          </div>
        )}

        {/* CTA vers générateur */}
        <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">
              Ce plan est générique.
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
              Le générateur adapte l&apos;échauffement à tes zones sensibles, ta durée disponible et ton objectif — en 30 secondes.
            </p>
          </div>
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 active:bg-green-600 text-black font-bold text-sm text-center transition-colors duration-150 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            Générer mon échauffement sur mesure →
          </Link>
        </div>

        {/* FAQ */}
        <section className="mt-4 flex flex-col gap-3" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-sm font-bold text-[var(--foreground)]">
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="cursor-pointer list-none text-xs font-bold text-[var(--foreground)] flex items-center justify-between gap-2">
                  <span>{f.q}</span>
                  <span className="text-[var(--muted)] group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Maillage interne : autres objectifs pour ce muscle */}
        <section className="mt-4 flex flex-col gap-2" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] px-1">
            Autres plans pour {muscleLabel.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 gap-1.5">
            {VALID_OBJECTIVES.filter((o) => o !== objectiveTyped).map((o) => (
              <Link
                key={o}
                href={`/echauffement/${muscle}/${o}`}
                className="text-xs font-medium text-[var(--foreground)] rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 hover:border-green-400/40 transition-colors"
              >
                {OBJECTIVE_LABELS[o]} →
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
