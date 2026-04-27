import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateWarmup, formatDuration } from "@/lib/warmup-engine";
import ExerciseCard from "@/components/ExerciseCard";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { MUSCLE_LABELS, OBJECTIVE_LABELS } from "@/lib/warmup-data";

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
  const title = `Échauffement ${muscleLabel} ${objectiveLabel} — Plan 5 min gratuit`;
  const description = `Plan d'échauffement complet pour les ${muscleLabel.toLowerCase()} en ${objectiveLabel.toLowerCase()}. Mobilisation articulaire et activation musculaire. 5 minutes, 100% gratuit, sans inscription.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", locale: "fr_FR" },
    robots: { index: true, follow: true },
  };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Échauffement ${muscleLabel} — ${objectiveLabel}`,
    description: `Plan d'échauffement de 5 minutes pour les ${muscleLabel.toLowerCase()}, objectif ${objectiveLabel.toLowerCase()}.`,
    totalTime: "PT5M",
    step: allExercises.map((ex, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: ex.name,
      text: ex.description,
    })),
  };

  let index = 1;

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

      </div>
    </main>
  );
}
