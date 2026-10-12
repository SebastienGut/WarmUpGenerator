import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEOPage from "@/components/SEOPage";
import { EXERCICE_PAGES, EXERCICE_SLUGS } from "@/lib/content/exercice";
import { computeApproachSets, formatKg, type ApproachExercise } from "@/lib/approach-sets";
import type { SEORamp } from "@/components/SEOPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Deep-link vers le moteur par séance : le slug de page est un identifiant
// d'exercice du catalogue (lib/lifts.ts).
const PLAN_PARAMS: Record<string, string> = {
  "developpe-couche": "s=developpe-couche",
  squat: "s=squat",
  "souleve-de-terre": "s=souleve-de-terre",
  tractions: "s=tractions",
  "rowing-barre": "s=rowing-barre",
  "developpe-militaire": "s=developpe-militaire",
};

// Exemples de montée en charge, à des charges de travail courantes en salle.
// Calculés au build par le même code que le calculateur.
const RAMP_EXAMPLES: Record<string, { ex: ApproachExercise; kg: number; reps: number }> = {
  "developpe-couche": { ex: "developpe-couche", kg: 80, reps: 5 },
  squat: { ex: "squat", kg: 100, reps: 5 },
  "souleve-de-terre": { ex: "souleve-de-terre", kg: 140, reps: 3 },
  "rowing-barre": { ex: "rowing-barre", kg: 70, reps: 8 },
  "developpe-militaire": { ex: "developpe-militaire", kg: 50, reps: 5 },
};

function rampFor(slug: string, label: string): SEORamp | undefined {
  const e = RAMP_EXAMPLES[slug];
  if (!e) return undefined;
  const sets = computeApproachSets({ exercise: e.ex, workWeight: e.kg, workReps: e.reps, barWeight: 20 });
  return {
    title: "Les séries d'approche",
    intro: `Après cet échauffement, la montée en charge se fait sur le ${label} lui-même. Exemple pour une première série de travail à <strong class='text-ink'>${formatKg(e.kg)} × ${e.reps}</strong> :`,
    rows: sets.map((s) => ({
      load: s.emptyBar ? "Barre seule" : formatKg(s.weight),
      reps: s.reps,
      percent: s.percent,
      plates: s.emptyBar ? undefined : s.platesPerSide,
      restSeconds: s.restSeconds,
    })),
    work: `${formatKg(e.kg)} × ${e.reps}`,
    calculatorHref: `/series-approche?ex=${e.ex}&charge=${e.kg}&reps=${e.reps}`,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return EXERCICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = EXERCICE_PAGES[slug];
  if (!data) return {};
  const path = `/echauffement/exercice/${slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: path, languages: { "fr-FR": path } },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: "article",
      locale: "fr_FR",
      url: path,
      siteName: "Warmup Generator",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExercicePage({ params }: PageProps) {
  const { slug } = await params;
  const data = EXERCICE_PAGES[slug];
  if (!data) notFound();

  const path = `/echauffement/exercice/${slug}`;

  return (
    <SEOPage
      h1={data.h1}
      subtitle={data.subtitle}
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Exercices", href: "/echauffement/exercice" },
        { label: data.exerciseLabel.charAt(0).toUpperCase() + data.exerciseLabel.slice(1) },
      ]}
      intro={data.intro}
      exerciseSectionTitle={`Protocole en ${data.exercises.length} mouvements`}
      exercises={data.exercises}
      advice={data.advice}
      faqs={data.faqs}
      related={{
        title: "Autres échauffements par exercice",
        links: EXERCICE_SLUGS.filter((s) => s !== slug).map((s) => ({
          href: `/echauffement/exercice/${s}`,
          label: EXERCICE_PAGES[s].h1,
        })),
      }}
      siteUrl={SITE_URL}
      path={path}
      howToName={data.h1}
      totalDurationLabel="5 min"
      ramp={rampFor(slug, data.exerciseLabel)}
      planHref={PLAN_PARAMS[slug] ? `/plan?${PLAN_PARAMS[slug]}` : undefined}
    />
  );
}
