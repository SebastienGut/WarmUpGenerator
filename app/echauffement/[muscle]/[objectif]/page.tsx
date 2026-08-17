import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { generateWarmup } from "@/lib/warmup-engine";
import type { MuscleGroup, Objective } from "@/lib/warmup-data";
import { MUSCLE_LABELS, OBJECTIVE_LABELS } from "@/lib/warmup-data";
import { MUSCLE_INSIGHTS, MUSCLE_CROSS_LINKS, MUSCLE_HUB } from "@/lib/content/muscle";
import { OBJECTIVE_PROFILES, MUSCLE_OBJECTIVE_NOTES } from "@/lib/content/muscle-objectif";

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

export const dynamicParams = false;

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
  // Titre court : le template "%s · Warmup Generator" ajoute déjà la marque.
  // On reste sous ~60 caractères pour éviter la troncature en SERP.
  const title = `Échauffement ${muscleLabel} ${objectiveLabel}`;
  const description = `Plan d'échauffement pour les ${muscleLabel.toLowerCase()} en ${objectiveLabel.toLowerCase()} : mobilisation articulaire et activation musculaire, exercice par exercice. Gratuit, sans inscription.`;
  const path = `/echauffement/${muscle}/${objectif}`;

  return {
    title,
    description,
    alternates: { canonical: path, languages: { "fr-FR": path } },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "fr_FR",
      url: path,
      siteName: "Warmup Generator",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
  const path = `/echauffement/${muscle}/${objectif}`;
  const muscleLow = muscleLabel.toLowerCase();
  const objLow = objectiveLabel.toLowerCase();
  const totalSeconds = allExercises.reduce((s, e) => s + e.durationSeconds, 0);
  const totalMinutes = Math.max(1, Math.round(totalSeconds / 60));

  const profile = OBJECTIVE_PROFILES[objectiveTyped];
  const hub = MUSCLE_HUB[muscleTyped];

  const intro = [
    // Accroche unique à la combinaison muscle × objectif (anti near-duplicate)
    MUSCLE_OBJECTIVE_NOTES[muscleTyped][objectiveTyped],
    // Anatomie / particularité du muscle (partagée entre les 4 objectifs)
    MUSCLE_INSIGHTS[muscleTyped],
    // Description du plan, calibrée pour l'objectif
    `Ce plan en ${allExercises.length} mouvements combine <strong class='text-white'>mobilisation articulaire</strong> (lubrification, amplitude) et <strong class='text-white'>activation musculaire</strong> (réveil des fibres, connexion neuro-musculaire), dans l'ordre adapté à une séance ${objLow}. Compte environ ${totalMinutes} minute${totalMinutes > 1 ? "s" : ""}, juste avant tes séries de chauffe avec barre ou haltères.`,
  ];

  const advice = {
    title: profile.adviceTitle,
    paragraphs: [
      profile.science(muscleLow),
      profile.chargeReps(muscleLow),
      `Si tu as une <strong class='text-white'>zone sensible</strong> (épaule, genou, lombaires, poignets), utilise plutôt le générateur en haut de page pour produire un plan adapté à ta situation exacte — il intègre des exercices thérapeutiques spécifiques en bonus.`,
    ],
  };

  // FAQ différenciée : 2 questions propres à l'objectif + 1 générale + 1 propre
  // au muscle (via sa zone sensible). L'ensemble varie sur chacune des 28 pages.
  const faqs = [
    profile.faq(muscleLow),
    profile.rampFaq(muscleLow),
    {
      q: `Faut-il s'étirer avant une séance ${muscleLow} ?`,
      a: `Pas en statique. Les étirements statiques avant l'effort réduisent temporairement la force et la puissance de 5 à 10 %. Avant les ${muscleLow}, privilégie la mobilité dynamique et l'activation musculaire — garde les étirements longs pour l'après-séance ou les jours de repos.`,
    },
    {
      q: `Et si j'ai une gêne à ${hub.zone.label} ?`,
      a: hub.zone.answer,
    },
  ];

  // Map plan exercises to SEOPage format
  const seoExercises = allExercises.map((ex) => ({
    name: ex.name,
    description: ex.description,
    durationSeconds: ex.durationSeconds,
    reps: ex.reps,
  }));

  // Related : hub muscle + autres objectifs + pages connexes (maillage interne)
  const relatedLinks = [
    {
      href: `/echauffement/${muscle}`,
      label: `Échauffement ${muscleLabel} : le guide complet`,
    },
    ...VALID_OBJECTIVES.filter((o) => o !== objectiveTyped).map((o) => ({
      href: `/echauffement/${muscle}/${o}`,
      label: `${muscleLabel} · ${OBJECTIVE_LABELS[o]}`,
    })),
    ...MUSCLE_CROSS_LINKS[muscleTyped],
  ];

  return (
    <SEOPage
      h1={`Échauffement ${muscleLabel} ${objectiveLabel}`}
      subtitle={`Plan gratuit · ${allExercises.length} exercices · ~${totalMinutes} min`}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: `Échauffement ${muscleLabel}`, href: `/echauffement/${muscle}` },
        { label: objectiveLabel },
      ]}
      intro={intro}
      exerciseSectionTitle={`Plan ${objectiveLabel.toLowerCase()} en ${allExercises.length} mouvements`}
      exercises={seoExercises}
      advice={advice}
      faqs={faqs}
      related={{
        title: `Autres plans pour ${muscleLow}`,
        links: relatedLinks,
      }}
      siteUrl={SITE_URL}
      path={path}
      planHref={`/result?muscles=${muscle}&objectif=${objectif}&duree=5`}
    />
  );
}
