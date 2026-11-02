"use client";

// Briques d'affichage d'un plan d'échauffement, partagées par la page /plan
// et par les pages d'atterrissage (échauffement haut du corps, pecs…).

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ExerciseFigure from "@/components/ExerciseFigure";
import { EQUIPMENT_LABELS, type Equipment } from "@/lib/bank";
import type { PlanPhase, PlanStep, RampStep } from "@/lib/session-engine";

export function phaseSeconds(phase: PlanPhase) {
  return phase.steps.reduce((s, st) => {
    if (st.kind !== "ramp") return s + st.seconds;
    return st.full ? s + st.lines.reduce((a, l) => a + 30 + l.restSeconds, 0) : s;
  }, 0);
}
export const fmtMin = (s: number) => (s >= 60 ? `${Math.round(s / 60)} min` : `${s} s`);

/**
 * Chaque phase prend la couleur d'un disque de compétition, du plus léger au
 * plus lourd : l'échauffement « charge la barre » jusqu'aux séries de travail.
 * `h` : hauteur relative du disque sur la barre.
 */
export const PHASE_STYLE: Record<PlanPhase["key"], { bg: string; ink: string; h: number }> = {
  raise: { bg: "bg-ph-raise", ink: "text-ph-raise-ink", h: 0.62 },
  mobility: { bg: "bg-ph-mobility", ink: "text-ph-mobility-ink", h: 0.8 },
  activation: { bg: "bg-ph-activation", ink: "text-ph-activation-ink", h: 1 },
  ramp: { bg: "bg-accent", ink: "text-ink", h: 1 },
};

/** Pastille de phase : un disque vu de profil. */
export function PhaseMark({ phase, className = "" }: { phase: PlanPhase["key"]; className?: string }) {
  return <span aria-hidden="true" className={`inline-block w-[7px] shrink-0 rounded-[2px] ${PHASE_STYLE[phase].bg} ${className}`} style={{ height: `${22 * PHASE_STYLE[phase].h}px` }} />;
}

/**
 * La frise du plan : un segment par exercice, à la couleur de sa phase. En mode
 * guidé, c'est la jauge de progression (`loaded` segments pleins, les suivants
 * en creux). Les segments apparaissent un à un à l'ouverture, seul mouvement non
 * déclenché de l'écran.
 */
export function StepBar({ phases, loaded, className = "" }: { phases: PlanPhase[]; loaded?: number; className?: string }) {
  let n = 0;
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {phases.flatMap((p) =>
        p.steps.map((_, j) => {
          const i = n++;
          const full = loaded === undefined || i < loaded;
          return (
            <span
              key={`${p.key}${j}`}
              className={`plate-load h-2 min-w-0 flex-1 rounded-full transition-colors duration-300 ${full ? PHASE_STYLE[p.key].bg : "bg-line"}`}
              style={{ "--d": `${i * 55}ms` } as React.CSSProperties}
            />
          );
        }),
      )}
    </div>
  );
}

export function Timeline({ phases }: { phases: PlanPhase[] }) {
  const secs = phases.map(phaseSeconds);
  return (
    <div className="mt-5">
      <StepBar phases={phases} />
      <ol className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {phases.map((p, i) => (
          <li key={p.key} className="flex items-center gap-2 text-[13px]">
            <PhaseMark phase={p.key} className="!h-3" />
            <span className="font-semibold text-ink">{p.title}</span>
            <span className="text-subtle tabular">{fmtMin(secs[i])}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Ligne d'exercice : pictogramme, nom, volume. La consigne s'ouvre au tap. */
export function StepRow({ step, phase }: { step: Exclude<PlanStep, RampStep>; phase: PlanPhase["key"] }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = step.kind === "prep" ? step.exercise.id : "raise";
  const name = step.kind === "prep" ? step.exercise.name : step.name;
  return (
    <li className="overflow-hidden rounded-2xl bg-card shadow-[0_1px_0_var(--line)] ring-1 ring-line">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 p-2 pr-3.5 text-left">
        <ExerciseFigure id={id} label={name} className="h-[58px] w-[64px] shrink-0 rounded-xl bg-ink/[0.04]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{name}</span>
          <span className={`font-display text-[17px] leading-tight tabular ${PHASE_STYLE[phase].ink}`}>{step.reps}</span>
        </span>
        <motion.span aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} className="text-[14px] text-subtle">
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-4">
              <ExerciseFigure id={id} label={name} className="mx-auto mb-3 h-40 w-full max-w-[260px]" />
              <p className="text-[14px] leading-relaxed text-muted">{step.instructions}</p>
              {step.kind === "prep" && (
                <p className="mt-2 text-[12px] text-subtle">
                  {step.reason}
                  {step.replaces ? ` Remplace : ${step.replaces}, sans équivalent avec ton matériel.` : ""}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Chip({ children, onClick, tone = "default" }: { children: React.ReactNode; onClick: () => void; tone?: "default" | "warn" | "on" }) {
  const cls =
    tone === "warn"
      ? "border-warn bg-warn-bg text-warn-ink"
      : tone === "on"
        ? "border-ink bg-ink text-paper"
        : "border-line-strong bg-card text-ink hover:border-ink";
  return (
    <button type="button" onClick={onClick} className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${cls}`}>
      {children}
    </button>
  );
}

/** Matériel disponible : trois choix exclusifs, le moteur prend la variante correspondante. */
export function EquipmentPicker({ value, onChange }: { value: Equipment; onChange: (v: Equipment) => void }) {
  return (
    <div role="radiogroup" aria-label="Matériel disponible" className="grid grid-cols-3 gap-1 rounded-full bg-ink/[0.07] p-1">
      {(Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((eq) => (
        <button
          key={eq}
          type="button"
          role="radio"
          aria-checked={value === eq}
          onClick={() => onChange(eq)}
          className={`rounded-full px-2 py-2 text-[13px] font-semibold transition-colors ${value === eq ? "bg-ink text-paper" : "text-subtle hover:text-ink"}`}
        >
          {EQUIPMENT_LABELS[eq]}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ on, onChange, title }: { on: boolean; onChange: (v: boolean) => void; title: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between py-3.5 text-left">
      <span className="text-[16px] font-semibold text-ink">{title}</span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-faint"}`}>
        <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow-sm ${on ? "right-1" : "left-1"}`} />
      </span>
    </button>
  );
}

