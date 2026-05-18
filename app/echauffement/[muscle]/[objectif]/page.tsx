import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { generateWarmup } from "@/lib/warmup-engine";
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
  const title = `Échauffement ${muscleLabel} ${objectiveLabel} — Plan complet en 5 min`;
  const description = `Plan d'échauffement complet pour les ${muscleLabel.toLowerCase()} en ${objectiveLabel.toLowerCase()}. Mobilisation articulaire et activation musculaire en 5 minutes. 100% gratuit, sans inscription.`;
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

function getFaqs(muscleLabel: string, objectiveLabel: string) {
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
  const path = `/echauffement/${muscle}/${objectif}`;
  const muscleLow = muscleLabel.toLowerCase();
  const objLow = objectiveLabel.toLowerCase();

  const intro = [
    `Un <strong class='text-white'>échauffement ${muscleLow}</strong> efficace prépare en parallèle les articulations sollicitées, active les muscles cibles et programme le système nerveux à pousser des charges lourdes ou volumineuses. Pour une séance orientée <strong class='text-white'>${objLow}</strong>, l'enjeu est précis : arriver sur ta première série de travail avec ${muscleLow} \"chauds\", connectés et prêts à recevoir la stimulation maximale.`,
    `Ce plan en ${allExercises.length} mouvements combine <strong class='text-white'>mobilisation articulaire</strong> (lubrification, amplitude) et <strong class='text-white'>activation musculaire</strong> (réveil des fibres, connexion neuro-musculaire). Compte 5 minutes. À pratiquer juste avant tes séries de chauffe avec barre ou haltères.`,
  ];

  const advice = {
    title: `Pourquoi ce plan est adapté à la ${objLow}`,
    paragraphs: [
      objectiveTyped === "force"
        ? `Pour la <strong class='text-white'>force pure</strong>, le système nerveux doit être pré-activé pour recruter un maximum de fibres dès la première répétition lourde. Les exercices d'activation ci-dessus stimulent les motoneurones et améliorent la synchronisation neuro-musculaire — tu peux gagner 5 à 10 % de force disponible juste avec un échauffement bien fait.`
        : objectiveTyped === "hypertrophie"
        ? `Pour l'<strong class='text-white'>hypertrophie</strong>, l'objectif est la connexion mind-muscle : tu dois sentir tes ${muscleLow} se contracter sur chaque répétition. L'activation ciblée du protocole ci-dessus établit cette connexion avant que la fatigue ne brouille le signal. Résultat : recrutement musculaire plus complet, gains de masse plus rapides.`
        : objectiveTyped === "mobilite"
        ? `Pour un travail orienté <strong class='text-white'>mobilité</strong>, l'échauffement n'est pas qu'une préparation — c'est une partie intégrante de la session. La mobilisation articulaire ci-dessus libère les amplitudes que tu vas exploiter dans le travail principal. Sans elle, tu travailles dans une amplitude réduite et tu ne progresses pas.`
        : `En <strong class='text-white'>reprise</strong>, l'échauffement est ta meilleure assurance contre la rechute. Les tissus reviennent en charge progressivement, et un protocole complet de mobilisation + activation prépare en douceur sans surcharger. Reste à l'écoute : si une zone proteste, réduis l'amplitude ou la charge sur ta première série.`,
      `Si tu as une <strong class='text-white'>zone sensible</strong> (épaule, genou, lombaires, poignets), utilise plutôt le générateur en haut de page pour produire un plan adapté à ta situation exacte — il intègre des exercices thérapeutiques spécifiques en bonus.`,
    ],
  };

  // Map plan exercises to SEOPage format
  const seoExercises = allExercises.map((ex) => ({
    name: ex.name,
    description: ex.description,
    durationSeconds: ex.durationSeconds,
    reps: ex.reps,
  }));

  // Related : autres objectifs pour le même muscle + autres muscles populaires
  const relatedLinks = [
    ...VALID_OBJECTIVES.filter((o) => o !== objectiveTyped).map((o) => ({
      href: `/echauffement/${muscle}/${o}`,
      label: `${muscleLabel} · ${OBJECTIVE_LABELS[o]}`,
    })),
  ];

  return (
    <SEOPage
      h1={`Échauffement ${muscleLabel}`}
      subtitle={`${objectiveLabel} · 5 minutes · ${allExercises.length} exercices`}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: `Échauffement ${muscleLabel}`, href: `/echauffement/${muscle}/force` },
        { label: objectiveLabel },
      ]}
      intro={intro}
      exerciseSectionTitle={`Plan ${objectiveLabel.toLowerCase()} en ${allExercises.length} mouvements`}
      exercises={seoExercises}
      advice={advice}
      faqs={getFaqs(muscleLabel, objectiveLabel)}
      related={{
        title: `Autres plans pour ${muscleLow}`,
        links: relatedLinks,
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={`Échauffement ${muscleLabel} — ${objectiveLabel}`}
      totalDurationLabel="5 min"
    />
  );
}
