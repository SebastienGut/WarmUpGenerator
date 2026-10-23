"use client";

import { useState } from "react";
import Link from "next/link";
import GuidedMode from "@/components/GuidedMode";
import { Chip, PhaseMark, StepRow, Timeline, fmtMin, phaseSeconds } from "@/components/PlanParts";
import { buildSessionPlan, serializeSession, type SessionInput } from "@/lib/session-engine";
import type { MuscleGroup } from "@/lib/warmup-data";

/**
 * L'échauffement prêt à l'emploi, au cœur d'une page d'atterrissage : la
 * personne qui cherche « échauffement haut du corps » le trouve tel quel, peut
 * l'adapter sur place et le lancer en mode guidé. Rendu côté serveur dans son
 * état par défaut, pour que la liste d'exercices soit lisible par les moteurs.
 */
export default function InlinePlan({ zones, defaultBand = false }: { zones: MuscleGroup[]; defaultBand?: boolean }) {
  const [band, setBand] = useState(defaultBand);
  const [short, setShort] = useState(false);
  const [variant, setVariant] = useState(0);
  const [guided, setGuided] = useState(false);

  const input: SessionInput = { zones, lifts: [], pain: [], band, short, variant };
  // Calcul instantané (quelques dizaines d'exercices) : pas besoin de mémoïser.
  const plan = buildSessionPlan(input);

  return (
    <div className="rounded-3xl bg-ink/[0.035] p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-display text-[20px] font-extrabold leading-none tracking-tight text-ink">Ton échauffement</p>
        <span className="whitespace-nowrap text-[13px] text-subtle tabular">
          {plan.minutes} min, {plan.phases.reduce((n, p) => n + p.steps.length, 0)} exercices
        </span>
      </div>
      <Timeline phases={plan.phases} />

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip onClick={() => setBand(!band)} tone={band ? "on" : "default"}>
          {band ? "✓ Avec élastique" : "Sans matériel"}
        </Chip>
        <Chip onClick={() => setShort(!short)} tone={short ? "on" : "default"}>
          {short ? "✓ Version courte" : "Version courte"}
        </Chip>
        <Chip onClick={() => setVariant((v) => (v + 1) % 997)}>↻ Varier</Chip>
      </div>

      <div className="mt-6">
        {plan.phases.map((phase) => (
          <section key={phase.key + variant} className="mb-6">
            <h3 className="mb-2 flex items-center gap-3">
              <PhaseMark phase={phase.key} />
              <span className="font-display text-[18px] font-extrabold leading-none tracking-tight text-ink">{phase.title}</span>
              <span className="ml-auto text-[13px] text-subtle tabular">{fmtMin(phaseSeconds(phase))}</span>
            </h3>
            <ol className="flex flex-col gap-1">
              {phase.steps.map((s, j) => (s.kind === "ramp" ? null : <StepRow key={`${s.kind === "prep" ? s.exercise.id : "r"}${j}`} step={s} phase={phase.key} />))}
            </ol>
          </section>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setGuided(true)}
          className="flex flex-1 items-center justify-between rounded-2xl bg-accent px-6 py-4 text-on-accent transition-transform active:scale-[0.98]"
        >
          <span className="font-display text-[22px] font-extrabold">Démarrer</span>
          <span className="font-display text-[18px] font-bold tabular">{plan.minutes} min ▶</span>
        </button>
        <Link
          href={`/plan?${serializeSession(input)}`}
          className="flex items-center justify-center rounded-2xl border border-line-strong px-5 py-4 text-[15px] font-semibold text-ink hover:border-ink"
        >
          Adapter (douleur, zones)
        </Link>
      </div>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </div>
  );
}
