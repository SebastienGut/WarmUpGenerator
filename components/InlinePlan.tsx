"use client";

import { useEffect, useState } from "react";
import GuidedMode from "@/components/GuidedMode";
import { Chip, EquipmentPicker, PhaseMark, StepRow, Timeline, fmtMin, phaseSeconds } from "@/components/PlanParts";
import type { Equipment } from "@/lib/bank";
import { loadEquipment, saveEquipment } from "@/lib/equipment-pref";
import { buildSessionPlan, type SessionInput } from "@/lib/session-engine";
import type { MuscleGroup } from "@/lib/warmup-data";

/**
 * L'échauffement prêt à l'emploi, au cœur d'une page d'atterrissage : la
 * personne qui cherche « échauffement haut du corps » le trouve tel quel, peut
 * l'adapter sur place et le lancer en mode guidé. Rendu côté serveur dans son
 * état par défaut, pour que la liste d'exercices soit lisible par les moteurs.
 */
export default function InlinePlan({ zones, template, fixedEquipment }: { zones: MuscleGroup[]; template?: string; fixedEquipment?: Equipment }) {
  const [equipment, setEquipment] = useState<Equipment>(fixedEquipment ?? "gym");
  const short = false;
  const [variant, setVariant] = useState(0);
  const [guided, setGuided] = useState(false);

  useEffect(() => {
    // La page impose parfois son matériel (« sans matériel ») ; sinon, celui réglé sur l'appareil.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- le réglage n'existe qu'au client
    if (!fixedEquipment) setEquipment(loadEquipment());
  }, [fixedEquipment]);

  const input: SessionInput = { zones, template, lifts: [], pain: [], band: equipment === "band", equipment, short, variant };
  // Calcul instantané (quelques dizaines d'exercices) : pas besoin de mémoïser.
  const plan = buildSessionPlan(input);

  return (
    <div className="rounded-3xl bg-ink/[0.035] p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="poster font-display text-[26px] leading-none text-ink">Ton échauffement</p>
        <span className="whitespace-nowrap text-[13px] text-subtle tabular">
          {plan.minutes} min, {plan.phases.reduce((n, p) => n + p.steps.length, 0)} exercices
        </span>
      </div>
      <Timeline phases={plan.phases} />
      <div className="mt-4">
        <EquipmentPicker
          value={equipment}
          onChange={(v) => {
            setEquipment(v);
            saveEquipment(v);
          }}
        />
      </div>

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip onClick={() => setVariant((v) => (v + 1) % 997)}>↻ Varier</Chip>
      </div>

      <div className="mt-6">
        {plan.phases.map((phase) => (
          <section key={phase.key + variant} className="mb-6">
            <h3 className="mb-2 flex items-center gap-3">
              <PhaseMark phase={phase.key} />
              <span className="poster font-display text-[22px] leading-none text-ink">{phase.title}</span>
              <span className="ml-auto text-[13px] text-subtle tabular">{fmtMin(phaseSeconds(phase))}</span>
            </h3>
            <ol className="flex flex-col gap-2">
              {phase.steps.map((s, j) => (s.kind === "ramp" ? null : <StepRow key={`${s.kind === "prep" ? s.exercise.id : "r"}${j}`} step={s} phase={phase.key} />))}
            </ol>
          </section>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setGuided(true)}
          className="flex items-center justify-between rounded-full bg-black px-7 py-4 text-white transition-transform active:scale-[0.98]"
        >
          <span className="font-display text-[26px] leading-none">C&apos;est parti</span>
          <span className="font-display text-[20px] leading-none tabular">{plan.minutes} min ▶</span>
        </button>
      </div>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </div>
  );
}
