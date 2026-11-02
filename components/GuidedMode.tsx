"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ExerciseFigure from "@/components/ExerciseFigure";
import Plates from "@/components/Plates";
import { Barbell, PHASE_STYLE } from "@/components/PlanParts";
import type { PlanPhase, SessionPlan } from "@/lib/session-engine";

type PK = PlanPhase["key"];

type GuidedItem =
  | { type: "do"; pk: PK; phase: string; fig?: string; title: string; target: string; instructions: string; countdown?: number }
  | { type: "set"; pk: PK; phase: string; fig: string; title: string; load: string; reps: number; plates?: number[]; rest: number; index: number; total: number }
  | { type: "info"; pk: PK; phase: string; title: string; lines: string[] };

function flatten(plan: SessionPlan): GuidedItem[] {
  const items: GuidedItem[] = [];
  const reminders: string[] = [];
  for (const phase of plan.phases) {
    for (const step of phase.steps) {
      if (step.kind === "raise") {
        items.push({ type: "do", pk: phase.key, phase: phase.title, fig: "raise", title: step.name, target: step.reps, instructions: step.instructions, countdown: step.seconds });
      } else if (step.kind === "prep") {
        items.push({ type: "do", pk: phase.key, phase: phase.title, fig: step.exercise.id, title: step.exercise.name, target: step.reps, instructions: step.instructions });
      } else if (step.full) {
        step.lines.forEach((line, i) =>
          items.push({
            type: "set",
            pk: phase.key,
            phase: phase.title,
            fig: step.lift.id,
            title: step.lift.name,
            load: line.load,
            reps: line.reps,
            plates: line.plates,
            rest: line.restSeconds,
            index: i + 1,
            total: step.lines.length,
          }),
        );
      } else {
        reminders.push(`${step.lift.name} : ${step.lines.map((l) => `${l.load} × ${l.reps}`).join(", ")}`);
      }
    }
  }
  if (reminders.length) items.push({ type: "info", pk: "ramp", phase: "Pour la suite", title: "Avant chaque exercice suivant", lines: reminders });
  return items;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Anneau de décompte : se vide en continu, secondes au centre. */
function Ring({ remaining, total, label }: { remaining: number; total: number; label: string }) {
  const r = 88;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto aspect-square w-[min(72vw,280px)]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - remaining / total)}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[64px] font-extrabold leading-none text-ink tabular">{fmt(remaining)}</span>
        <span className="mt-1 text-[14px] font-semibold text-subtle">{label}</span>
      </div>
    </div>
  );
}

const primary = "flex-1 rounded-2xl bg-accent py-4 font-display text-[22px] font-extrabold text-on-accent active:scale-[0.98]";
const secondary = "rounded-2xl border border-line-strong px-5 py-4 text-[17px] font-semibold text-ink active:scale-[0.98]";

export default function GuidedMode({ plan, onClose }: { plan: SessionPlan; onClose: () => void }) {
  const items = useMemo(() => flatten(plan), [plan]);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [duration, setDuration] = useState(1);
  const [resting, setResting] = useState(false);
  const item = items[index];
  const done = index >= items.length;

  // Écran allumé pendant l'échauffement : le téléphone est posé au sol.
  useEffect(() => {
    let lock: WakeLockSentinel | undefined;
    navigator.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => {});
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lock?.release().catch(() => {});
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      navigator.vibrate?.(200);
      const t = setTimeout(() => {
        setRemaining(null);
        setResting(false);
        setDir(1);
        setIndex((i) => i + 1);
      }, 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRemaining((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const startTimer = (s: number) => {
    setDuration(s);
    setRemaining(s);
  };
  const go = (delta: number) => {
    setRemaining(null);
    setResting(false);
    setDir(delta);
    setIndex((i) => Math.min(items.length, Math.max(0, i + delta)));
  };
  const completeSet = (rest: number) => {
    if (items[index + 1]?.type !== "set") return go(1);
    setResting(true);
    startTimer(rest);
  };
  const next = items[index + 1];
  // Un disque par exercice : la barre se charge au fil de l'échauffement.
  const oneItemPerStep = items.length === plan.phases.reduce((n, p) => n + p.steps.length, 0);
  const key = done ? "done" : resting ? `rest${index}` : `i${index}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper" role="dialog" aria-modal="true" aria-label="Échauffement guidé">
      <div className="mx-auto w-full max-w-[560px] px-5 pt-[max(14px,env(safe-area-inset-top))]">
        {oneItemPerStep ? (
          <Barbell phases={plan.phases} loaded={index} className="[&_.plate-load]:![animation:none]" />
        ) : (
          <div className="flex gap-1" aria-hidden="true">
            {items.map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < index ? "bg-ink" : i === index ? "bg-accent" : "bg-line"}`} />
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-subtle tabular">
            {done ? "Terminé" : `${item.phase}, ${index + 1} sur ${items.length}`}
          </span>
          <button type="button" onClick={onClose} className="-mr-2 rounded-full px-3 py-2 text-[15px] font-semibold text-muted hover:bg-ink/[0.06] hover:text-ink">
            Fermer
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[560px] flex-1 overflow-hidden" aria-live="polite">
        {/* Entrée en CSS (la clé change à chaque étape) ; framer ne sert qu'au balayage. */}
          <motion.div
            key={key}
            className="anim-slide flex w-full flex-col justify-center px-6"
            style={{ "--dir": dir } as React.CSSProperties}
            drag={reduce || done ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -90) go(1);
              else if (info.offset.x > 90 && index > 0) go(-1);
            }}
          >
            {done ? (
              <div className="flex flex-col gap-4">
                <p className="font-display text-[52px] font-extrabold leading-[0.92] tracking-tight text-ink">Barre chargée.</p>
                <p className="text-[16px] text-muted">Tu es échauffé : ta prochaine série est ta première série de travail.</p>
              </div>
            ) : resting ? (
              <div className="flex flex-col items-center gap-6">
                <Ring remaining={remaining ?? 0} total={duration} label="Repos" />
                {next?.type === "set" && (
                  <p className="text-center text-[17px] text-muted">
                    Ensuite <span className="block font-display text-[34px] font-extrabold text-ink tabular">{next.load} × {next.reps}</span>
                  </p>
                )}
              </div>
            ) : item.type === "set" ? (
              <div className="flex flex-col">
                <ExerciseFigure id={item.fig} label={item.title} className="mx-auto h-[min(26vh,200px)] w-full max-w-[280px]" />
                <p className="mt-2 text-[15px] font-medium text-muted">
                  {item.title}, approche {item.index} sur {item.total}
                </p>
                <p className="font-display font-extrabold leading-[0.85] text-ink">
                  <span className={`block tabular ${item.load.length > 7 ? "text-[52px]" : "text-[80px]"}`}>{item.load}</span>
                  <span className="block text-[52px] text-accent">× {item.reps}</span>
                </p>
                {item.plates && (
                  <div className="mt-4">
                    <Plates plates={item.plates} size={48} />
                  </div>
                )}
              </div>
            ) : item.type === "info" ? (
              <div className="flex flex-col gap-5">
                <p className="font-display text-[38px] font-extrabold leading-[0.95] text-ink">{item.title}</p>
                <ul className="divide-y divide-line border-y border-line">
                  {item.lines.map((l) => (
                    <li key={l} className="py-3 text-[16px] text-muted">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col">
                {item.countdown && remaining !== null ? (
                  <Ring remaining={remaining} total={duration} label="Cardio léger" />
                ) : item.fig ? (
                  <ExerciseFigure id={item.fig} label={item.title} className="mx-auto h-[min(32vh,240px)] w-full max-w-[300px]" />
                ) : (
                  <span className="mx-auto font-display text-[96px] font-extrabold text-accent" aria-hidden="true">
                    ♥
                  </span>
                )}
                <p className="mt-4 font-display text-[32px] font-extrabold leading-[0.98] tracking-tight text-ink">{item.title}</p>
                <p className={`mt-2 font-display text-[28px] font-extrabold leading-none tracking-tight tabular ${PHASE_STYLE[item.pk].ink}`}>{item.target}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.instructions}</p>
              </div>
            )}
          </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-[560px] gap-3 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
        {done ? (
          <button type="button" onClick={onClose} className={primary}>
            Retour au plan
          </button>
        ) : (
          <>
            {item.type === "do" && item.countdown && remaining === null ? (
              // Étape chronométrée pas encore lancée : on peut la sauter (cardio déjà fait).
              <button type="button" onClick={() => go(1)} className={secondary}>
                Passer
              </button>
            ) : (
              <button type="button" onClick={() => go(-1)} disabled={index === 0 && !resting} className={`${secondary} disabled:opacity-30`} aria-label="Étape précédente">
                ←
              </button>
            )}
            {resting ? (
              <button type="button" onClick={() => go(1)} className={`${secondary} flex-1`}>
                Passer le repos
              </button>
            ) : item.type === "set" ? (
              <button type="button" onClick={() => completeSet(item.rest)} className={primary}>
                Série faite
              </button>
            ) : item.type === "do" && item.countdown && remaining === null ? (
              <button type="button" onClick={() => startTimer(item.countdown!)} className={primary}>
                Lancer {fmt(item.countdown)}
              </button>
            ) : (
              <button type="button" onClick={() => go(1)} className={primary}>
                {index === items.length - 1 ? "Terminer" : "Suivant"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
