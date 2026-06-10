import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { generateWarmup } from "@/lib/warmup-engine";
import type { MuscleGroup } from "@/lib/warmup-data";
import { MUSCLE_LABELS, OBJECTIVE_LABELS } from "@/lib/warmup-data";
import { MUSCLE_INSIGHTS, MUSCLE_CROSS_LINKS, MUSCLE_HUB } from "@/lib/content/muscle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

const VALID_MUSCLES: MuscleGroup[] = [
  "pecs", "dos", "epaules", "jambes", "fessiers", "bras", "core",
];

interface PageProps {
  params: Promise<{ muscle: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return VALID_MUSCLES.map((muscle) => ({ muscle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { muscle } = await params;
  if (!VALID_MUSCLES.includes(muscle as MuscleGroup)) return {};

  const muscleLabel = MUSCLE_LABELS[muscle as MuscleGroup];
  const title = `Échauffement ${muscleLabel} — Plan complet gratuit (musculation)`;
  const description = `Comment s'échauffer les ${muscleLabel.toLowerCase()} avant la musculation : plan gratuit exercice par exercice, mobilisation articulaire et activation musculaire. Sans inscription, utilisable en salle.`;
  const path = `/echauffement/${muscle}`;

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

export default async function MuscleHubPage({ params }: PageProps) {
  const { muscle } = await params;
  if (!VALID_MUSCLES.includes(muscle as MuscleGroup)) notFound();

  const muscleTyped = muscle as MuscleGroup;
  const muscleLabel = MUSCLE_LABELS[muscleTyped];
  const muscleLow = muscleLabel.toLowerCase();
  const hub = MUSCLE_HUB[muscleTyped];

  // Plan de référence du hub : hypertrophie (objectif le plus courant en salle)
  const plan = generateWarmup({
    muscles: [muscleTyped],
    objective: "hypertrophie",
    zones: ["aucune"],
    duration: 5,
  });
  const allExercises = [...plan.articulaire, ...plan.activation];
  const totalSeconds = allExercises.reduce((s, e) => s + e.durationSeconds, 0);
  const totalMinutes = Math.max(1, Math.round(totalSeconds / 60));
  const path = `/echauffement/${muscle}`;

  const intro = [
    `S'échauffer les <strong class='text-white'>${muscleLow}</strong> avant la musculation ne consiste pas à pédaler dix minutes ni à s'étirer. Un échauffement efficace fait trois choses, dans cet ordre : <strong class='text-white'>mobiliser les articulations</strong> qui vont travailler, <strong class='text-white'>activer les muscles cibles</strong> pour établir la connexion neuro-musculaire, et préparer le système nerveux à la charge. Le tout en ${totalMinutes} à 8 minutes — au-delà, tu fatigues sans bénéfice.`,
    MUSCLE_INSIGHTS[muscleTyped],
    `Le plan ci-dessous est le protocole de référence pour les ${muscleLow}. Il prépare une séance type : ${hub.sessionExamples}. Si ta séance a un objectif précis (force lourde, reprise après blessure, travail de mobilité), les variantes adaptées sont listées en bas de page.`,
  ];

  const advice = {
    title: "Force, hypertrophie, reprise : quelle variante choisir ?",
    paragraphs: [
      `Le plan affiché ici est calibré pour une séance classique d'<strong class='text-white'>hypertrophie</strong> (8-15 répétitions). Pour une séance de <strong class='text-white'>force lourde</strong> (1-5 reps), l'activation neuro-musculaire devient prioritaire : prends la variante force, puis ajoute tes séries de chauffe progressives à la barre. En <strong class='text-white'>reprise</strong> (retour de blessure, longue pause, courbatures sévères), la variante reprise monte en charge plus doucement. Et si ta séance est dédiée à la <strong class='text-white'>mobilité</strong>, la variante mobilité fait de l'échauffement une partie intégrante du travail.`,
      `Dans tous les cas, la règle reste la même : cet échauffement précède (et ne remplace pas) tes <strong class='text-white'>séries de chauffe avec barre</strong> sur les exercices polyarticulaires lourds. Et si une articulation te gêne, passe par le générateur — il intègre des exercices de protection spécifiques à ta zone sensible.`,
    ],
  };

  const faqs = [
    {
      q: `Quel échauffement avant une séance ${muscleLow} ?`,
      a: `Deux phases en ${totalMinutes} à 8 minutes : mobilisation des articulations sollicitées (lubrification, amplitude), puis activation ciblée des ${muscleLow} (connexion neuro-musculaire, pré-fatigue zéro). Le plan ci-dessus enchaîne les ${allExercises.length} mouvements dans le bon ordre — suis-le tel quel ou lance-le en mode timer.`,
    },
    {
      q: "Faut-il un échauffement différent selon l'objectif de la séance ?",
      a: "Oui, à la marge. La base (mobilisation + activation) reste identique, mais une séance de force exige plus d'activation nerveuse, une reprise demande une montée en charge plus douce, et une séance mobilité prolonge la phase articulaire. Les quatre variantes sont disponibles en bas de page.",
    },
    {
      q: `Ce plan prépare-t-il tous les exercices ${muscleLow} ?`,
      a: `Il prépare les structures communes à toute la séance : ${hub.sessionExamples}. Pour le premier exercice lourd de ta séance, ajoute 2-3 séries de chauffe progressives avec la barre — c'est le complément indispensable de cet échauffement général.`,
    },
    {
      q: `Et si j'ai une douleur à ${hub.zone.label} ?`,
      a: hub.zone.answer,
    },
  ];

  const relatedLinks = [
    ...(["force", "hypertrophie", "reprise", "mobilite"] as const).map((o) => ({
      href: `/echauffement/${muscle}/${o}`,
      label: `${muscleLabel} · ${OBJECTIVE_LABELS[o]}`,
    })),
    ...MUSCLE_CROSS_LINKS[muscleTyped],
  ];

  return (
    <SEOPage
      h1={`Échauffement ${muscleLabel}`}
      subtitle={`Le guide complet · ${allExercises.length} exercices · ~${totalMinutes} min`}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Échauffements", href: "/echauffement" },
        { label: muscleLabel },
      ]}
      intro={intro}
      exerciseSectionTitle={`Le plan de référence en ${allExercises.length} mouvements`}
      exercises={allExercises.map((ex) => ({
        name: ex.name,
        description: ex.description,
        durationSeconds: ex.durationSeconds,
        reps: ex.reps,
      }))}
      advice={advice}
      faqs={faqs}
      related={{
        title: `Variantes et plans liés pour ${muscleLow}`,
        links: relatedLinks,
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={`Échauffement ${muscleLabel} avant la musculation`}
      totalDurationLabel={`${totalMinutes} min`}
      planHref={`/result?muscles=${muscle}&objectif=hypertrophie&duree=5`}
    />
  );
}
