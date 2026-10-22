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

export function Timeline({ phases }: { phases: PlanPhase[] }) {
  const secs = phases.map(phaseSeconds);
  const total = secs.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="mt-5">
      <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">
        {phases.map((p, i) => (
          <span
            key={p.key}
            className={`anim-grow transition-[width] duration-500 ${i === phases.length - 1 ? "bg-accent" : "bg-ink"}`}
            style={
              {
                width: `${(secs[i] / total) * 100}%`,
                opacity: i === phases.length - 1 ? 1 : 0.22 + (0.5 * i) / phases.length,
                "--d": `${i * 90}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <ol className="mt-2 flex justify-between gap-2">
        {phases.map((p, i) => (
          <li key={p.key} className="min-w-0">
            <span className="block truncate font-display text-[13px] font-bold uppercase tracking-wide text-ink">{p.title}</span>
            <span className="text-[11px] text-subtle tabular">{fmtMin(secs[i])}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Ligne d'exercice : pictogramme, nom, volume. La consigne s'ouvre au tap. */
export function StepRow({ step }: { step: Exclude<PlanStep, RampStep> }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = step.kind === "prep" ? step.exercise.id : "raise";
  const name = step.kind === "prep" ? step.exercise.name : step.name;
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-card">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 p-2 pr-4 text-left">
        <ExerciseFigure id={id} label={name} className="h-[60px] w-[66px] shrink-0 rounded-xl bg-ink/[0.03]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{name}</span>
          <span className="font-display text-[17px] font-bold text-accent-ink tabular">{step.reps}</span>
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
                  {step.substituted ? " · version sans élastique" : ""}
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

