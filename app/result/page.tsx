import type { Metadata } from "next";
import { generateWarmup } from "@/lib/warmup-engine";
import ResultClient from "./ResultClient";
import type { MuscleGroup, Objective, SensitiveZone } from "@/lib/warmup-data";
import { MUSCLE_LABELS, OBJECTIVE_LABELS, ZONE_LABELS } from "@/lib/warmup-data";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function parseParams(params: { [key: string]: string | string[] | undefined }) {
  const musclesRaw = typeof params.muscles === "string" ? params.muscles : "";
  const objectifRaw = typeof params.objectif === "string" ? params.objectif : "hypertrophie";
  const zonesRaw = typeof params.zones === "string" ? params.zones : "";
  const dureeRaw = typeof params.duree === "string" ? params.duree : "5";

  const muscles = musclesRaw ? (musclesRaw.split(",") as MuscleGroup[]) : [];
  const objective = (["force", "hypertrophie", "reprise", "mobilite"] as Objective[]).includes(
    objectifRaw as Objective
  )
    ? (objectifRaw as Objective)
    : "hypertrophie";
  const zones: SensitiveZone[] = zonesRaw ? (zonesRaw.split(",") as SensitiveZone[]) : ["aucune"];
  const duration = ([3, 5, 8] as const).includes(Number(dureeRaw) as 3 | 5 | 8)
    ? (Number(dureeRaw) as 3 | 5 | 8)
    : 5;

  return { muscles, objective, zones, duration };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const { muscles, objective, zones } = parseParams(params);
  const muscleLabel = muscles.length > 0 ? muscles.map((m) => MUSCLE_LABELS[m]).join(", ") : "General";
  const activeZones = zones.filter((z) => z !== "aucune");
  const zonesSuffix = activeZones.length > 0 ? ` | ${activeZones.map((z) => ZONE_LABELS[z]).join(", ")}` : "";

  return {
    title: `Echauffement ${muscleLabel} | ${OBJECTIVE_LABELS[objective]}${zonesSuffix}`,
    robots: { index: false, follow: false },
  };
}

export default async function ResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { muscles, objective, zones, duration } = parseParams(params);

  const plan = generateWarmup({ muscles, objective, zones, duration });
  const muscleLabel = muscles.length > 0 ? muscles.map((m) => MUSCLE_LABELS[m]).join(", ") : "Général";
  const allExercises = [...plan.articulaire, ...plan.activation, ...plan.ciblé.map((i) => i.exercise)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Echauffement ${muscleLabel} (${OBJECTIVE_LABELS[objective]})`,
    description: `Plan d'echauffement de ${duration} minutes pour ${muscleLabel.toLowerCase()}.`,
    totalTime: `PT${duration}M`,
    step: allExercises.map((exercise, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: exercise.name,
      text: exercise.description,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResultClient
        plan={plan}
        muscleLabel={muscleLabel}
        objectiveLabel={OBJECTIVE_LABELS[objective]}
        requestedDuration={duration}
      />
    </>
  );
}
