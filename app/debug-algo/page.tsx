import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateWarmup } from "@/lib/warmup-engine";
import {
  exercises,
  EQUIPMENT_LABELS,
  MUSCLE_LABELS,
  OBJECTIVE_LABELS,
  ZONE_LABELS,
  type Exercise,
  type MuscleGroup,
  type Objective,
  type SensitiveZone,
} from "@/lib/warmup-data";

export const metadata: Metadata = {
  title: "Debug Algo",
  description: "Vue interne pour auditer la logique de selection et le catalogue d'exercices.",
  robots: { index: false, follow: false },
};

const TARGETED_CATEGORY = "cibl\u00e9" as Exercise["category"];
const TARGETED_PLAN_KEY = "cibl\u00e9" as const;

type Scenario = {
  title: string;
  muscles: MuscleGroup[];
  objective: Objective;
  zones: SensitiveZone[];
  duration: 3 | 5 | 8;
  why: string;
};

const EXERCISE_CATEGORIES: Exercise["category"][] = ["articulaire", "activation", TARGETED_CATEGORY];

const SCENARIOS: Scenario[] = [
  {
    title: "Bench / Pecs + epaules / Force / Epaule sensible",
    muscles: ["pecs", "epaules"],
    objective: "force",
    zones: ["epaule"],
    duration: 5,
    why: "Cas typique prehab haut du corps avant developpe lourd.",
  },
  {
    title: "Dos + core / Reprise / Lombaires sensibles",
    muscles: ["dos", "core"],
    objective: "reprise",
    zones: ["bas-du-dos"],
    duration: 5,
    why: "On veut voir si l'algo pousse vers du gainage, des fessiers et du rachis utile.",
  },
  {
    title: "Jambes / Hypertrophie / Genou sensible",
    muscles: ["jambes"],
    objective: "hypertrophie",
    zones: ["genou"],
    duration: 5,
    why: "Controle du genou, chauffe hanche-fessiers et choix salle pertinents.",
  },
  {
    title: "Pecs / Force / Sans douleur",
    muscles: ["pecs"],
    objective: "force",
    zones: ["aucune"],
    duration: 5,
    why: "Cas standard salle sans douleur, pour verifier la base du moteur.",
  },
];

const CATEGORY_LABELS = {
  articulaire: "Mobilisation",
  activation: "Activation",
  "cibl\u00e9": "Protection ciblee",
} satisfies Record<Exercise["category"], string>;

const PRIORITY_RULES = [
  "Le moteur raisonne salle par defaut : gym > both > home.",
  "Les zones sensibles declenchent des profils de priorite par focus : scapula/coiffe, lombaires/core/fessiers, controle genou, etc.",
  "Les exercices utiles avant seance lourde montent via trainingValue, prepRoles, prepFocus et prepIntensity.",
  "Un exo hors sujet est penalise, meme s'il est bon dans l'absolu.",
  "Les exos sans materiel restent presents, mais plutot comme solutions de secours ou complements.",
];

function renderTags(exercise: Exercise): string[] {
  const tags = [
    exercise.setting,
    exercise.prepIntensity,
    ...(exercise.prepRoles ?? []),
    ...(exercise.prepFocus ?? []),
  ];

  return tags.filter((tag): tag is Exclude<typeof tag, undefined> => tag !== undefined);
}

function groupExercisesByCategory(): Record<Exercise["category"], Exercise[]> {
  const grouped: Record<Exercise["category"], Exercise[]> = {
    articulaire: [],
    activation: [],
    "cibl\u00e9": [],
  };

  return exercises.reduce(
    (acc: Record<Exercise["category"], Exercise[]>, exercise) => {
      acc[exercise.category].push(exercise);
      return acc;
    },
    grouped
  );
}

export default function DebugAlgoPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const grouped = groupExercisesByCategory();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A3FF12]">
              Vue Interne
            </p>
            <h1 className="mt-2 text-[32px] font-black uppercase leading-none tracking-tight">
              Debug de l&apos;algo
            </h1>
            <p className="mt-3 max-w-[780px] text-sm leading-6 text-[#A1A1A6]">
              Cette page sert a juger l&apos;algorithme comme un coach regarderait un protocole
              d&apos;echauffement : priorites metier, sorties concretes et catalogue d&apos;exos avec
              leurs tags.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-[#A3FF12]/25 bg-[#A3FF12]/[0.06] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]"
          >
            Retour au generateur
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0E] p-5">
            <h2 className="font-sans text-[20px] font-black uppercase tracking-tight">Logique V2</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-[#A1A1A6]">
              {PRIORITY_RULES.map((rule) => (
                <p key={rule}>{rule}</p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0E] p-5">
            <h2 className="font-sans text-[20px] font-black uppercase tracking-tight">Ce qu&apos;on veut voir</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-[#A1A1A6]">
              <p>Epaule : face pull, coiffe, scapula, Y-T, mobilite thoracique utile.</p>
              <p>Lombaires : bird dog, pont fessier, banc lombaires, gainage utile, pas de remplissage mou.</p>
              <p>Genou : TKE, step-up, abduction, chauffe hanche-cheville-genou coherente.</p>
              <p>Sans douleur : base salle credible avant seance, pas juste du sol et des tours de cou.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[22px] font-black uppercase tracking-tight">Scenarios de test</h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
              Sortie reelle du moteur
            </p>
          </div>

          <div className="grid gap-4">
            {SCENARIOS.map((scenario) => {
              const plan = generateWarmup({
                muscles: scenario.muscles,
                objective: scenario.objective,
                zones: scenario.zones,
                duration: scenario.duration,
              });

              return (
                <article
                  key={scenario.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0C0C0E] p-5"
                >
                  <div className="flex flex-col gap-2 border-b border-white/[0.06] pb-4">
                    <h3 className="text-[20px] font-black leading-tight text-white">{scenario.title}</h3>
                    <p className="text-sm leading-6 text-[#A1A1A6]">{scenario.why}</p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A3FF12]">
                      Muscles: {scenario.muscles.map((muscle) => MUSCLE_LABELS[muscle]).join(", ")}
                      {" · "}
                      Objectif: {OBJECTIVE_LABELS[scenario.objective]}
                      {" · "}
                      Zones: {scenario.zones.map((zone) => ZONE_LABELS[zone]).join(", ")}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    <PlanColumn title="Mobilisation" exercises={plan.articulaire} />
                    <PlanColumn title="Activation" exercises={plan.activation} />
                    <PlanColumn title="Protection" exercises={plan[TARGETED_PLAN_KEY].map((item) => item.exercise)} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[22px] font-black uppercase tracking-tight">Catalogue des exercices</h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
              Exos en clair + tags metier
            </p>
          </div>

          <div className="grid gap-6">
            {EXERCISE_CATEGORIES.map((category) => (
              <section key={category} className="rounded-2xl border border-white/[0.08] bg-[#0C0C0E] p-5">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                  <h3 className="text-[18px] font-black uppercase tracking-tight">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
                    {grouped[category].length} exos
                  </span>
                </div>

                <div className="grid gap-3">
                  {grouped[category].map((exercise) => (
                    <article
                      key={exercise.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-[16px] font-bold text-white">{exercise.name}</p>
                            <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5A5A60]">
                              {exercise.id}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[12px] font-semibold text-[#A1A1A6]">
                              {EQUIPMENT_LABELS[exercise.equipment]}
                            </p>
                            <p className="mt-1 text-[12px] font-semibold text-[#A1A1A6]">
                              {exercise.durationSeconds}s
                            </p>
                          </div>
                        </div>

                        <p className="text-sm leading-6 text-[#A1A1A6]">{exercise.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {renderTags(exercise).map((tag) => (
                            <span
                              key={`${exercise.id}-${tag}`}
                              className="rounded-full border border-[#A3FF12]/20 bg-[#A3FF12]/[0.05] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A3FF12]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="grid gap-2 text-[12px] leading-5 text-[#7E7E84] md:grid-cols-2">
                          <p>
                            Muscles: {exercise.muscles.map((muscle) => MUSCLE_LABELS[muscle]).join(", ")}
                          </p>
                          <p>
                            Objectifs: {exercise.objectives.map((objective) => OBJECTIVE_LABELS[objective]).join(", ")}
                          </p>
                          <p>
                            Zone support:{" "}
                            {exercise.painSupport?.length
                              ? exercise.painSupport.map((zone) => ZONE_LABELS[zone]).join(", ")
                              : "Aucune"}
                          </p>
                          <p>Fallback: {exercise.fallback ?? "Pas encore defini"}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function PlanColumn({ title, exercises }: { title: string; exercises: Exercise[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12]">
        {title}
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {exercises.length === 0 ? (
          <p className="text-sm text-[#5A5A60]">Aucun exercice</p>
        ) : (
          exercises.map((exercise) => (
            <div key={`${title}-${exercise.id}`} className="rounded-lg border border-white/[0.06] bg-[#050505] p-3">
              <p className="text-[14px] font-bold text-white">{exercise.name}</p>
              <p className="mt-1 text-[12px] leading-5 text-[#A1A1A6]">{exercise.description}</p>
              <p className="mt-2 text-[11px] text-[#5A5A60]">
                {EQUIPMENT_LABELS[exercise.equipment]} · {exercise.durationSeconds}s
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
