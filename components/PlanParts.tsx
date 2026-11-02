"use client";

// Briques d'affichage d'un plan d'échauffement, partagées par la page /plan
// et par les pages d'atterrissage (échauffement haut du corps, pecs…).

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ExerciseFigure from "@/components/ExerciseFigure";
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
 * La barre chargée : un disque par exercice, aux couleurs de sa phase. C'est la
 * frise du plan et, en mode guidé, la jauge de progression (`loaded` disques
 * pleins, les suivants en creux). Les disques se chargent un à un à l'ouverture,
 * seul mouvement non déclenché de l'écran.
 */
export function Barbell({ phases, loaded, className = "" }: { phases: PlanPhase[]; loaded?: number; className?: string }) {
  let n = 0;
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      {/* Manchon gauche et butée */}
      <span className="h-[5px] w-4 shrink-0 rounded-l-full bg-line-strong" />
      <span className="mr-1 h-6 w-[5px] shrink-0 rounded-[2px] bg-subtle/70" />
      {phases.map((p) => (
        <span key={p.key} className="flex items-center gap-[3px] pr-[3px]">
          {p.steps.map((_, j) => {
            const i = n++;
            const full = loaded === undefined || i < loaded;
            return (
              <span
                key={j}
                className={`plate-load w-[11px] shrink-0 rounded-[3px] transition-colors duration-300 sm:w-[13px] ${full ? PHASE_STYLE[p.key].bg : "bg-line"}`}
                style={{ height: `${60 * PHASE_STYLE[p.key].h}px`, "--d": `${i * 55}ms` } as React.CSSProperties}
              />
            );
          })}
        </span>
      ))}
      <span className="h-[5px] min-w-6 flex-1 rounded-r-full bg-line-strong" />
    </div>
  );
}

export function Timeline({ phases }: { phases: PlanPhase[] }) {
  const secs = phases.map(phaseSeconds);
  return (
    <div className="mt-5">
      <Barbell phases={phases} />
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
    <li className={`overflow-hidden rounded-xl transition-colors ${open ? "bg-card" : ""}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3.5 rounded-xl py-1.5 pl-1 pr-3 text-left hover:bg-card">
        <ExerciseFigure id={id} label={name} className="h-[58px] w-[64px] shrink-0 rounded-lg bg-card" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{name}</span>
          <span className={`text-[14px] font-semibold tabular ${PHASE_STYLE[phase].ink}`}>{step.reps}</span>
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
                  {step.substituted ? " Version sans élastique." : ""}
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

