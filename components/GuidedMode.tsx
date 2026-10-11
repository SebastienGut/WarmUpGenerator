"use client";

import { useEffect, useMemo, useState } from "react";
import Plates from "@/components/Plates";
import type { SessionPlan } from "@/lib/session-engine";

type GuidedItem =
  | { type: "do"; phase: string; title: string; target: string; instructions: string; countdown?: number }
  | { type: "set"; phase: string; title: string; load: string; reps: number; plates?: number[]; rest: number; index: number; total: number }
  | { type: "info"; phase: string; title: string; lines: string[] };

function flatten(plan: SessionPlan): GuidedItem[] {
  const items: GuidedItem[] = [];
  const reminders: string[] = [];
  for (const phase of plan.phases) {
    for (const step of phase.steps) {
      if (step.kind === "raise") {
        items.push({ type: "do", phase: phase.title, title: step.name, target: step.reps, instructions: step.instructions, countdown: step.seconds });
      } else if (step.kind === "prep") {
        items.push({ type: "do", phase: phase.title, title: step.exercise.name, target: step.reps, instructions: step.instructions });
      } else if (step.full) {
        step.lines.forEach((line, i) =>
          items.push({
            type: "set",
            phase: phase.title,
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
  if (reminders.length) {
    items.push({ type: "info", phase: "Pour la suite", title: "Avant chaque exercice suivant", lines: reminders });
  }
  return items;
}

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const primary =
  "flex-1 rounded-xl bg-accent py-4 font-display text-[22px] font-extrabold uppercase tracking-wide text-on-accent active:scale-[0.98]";
const secondary = "rounded-xl border border-line-strong px-5 py-4 text-[16px] font-semibold text-ink active:scale-[0.98]";

export default function GuidedMode({ plan, onClose }: { plan: SessionPlan; onClose: () => void }) {
  const items = useMemo(() => flatten(plan), [plan]);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [duration, setDuration] = useState(1);
  const [resting, setResting] = useState(false);
  const item = items[index];
  const done = index >= items.length;

  // Écran allumé pendant l'échauffement : le téléphone est posé au sol.
  useEffect(() => {
    let lock: WakeLockSentinel | undefined;
    navigator.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => {});
    return () => {
      lock?.release().catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      navigator.vibrate?.(200);
      const t = setTimeout(() => {
        // Fin d'un repos ou du chrono de mise en route : on enchaîne.
        setRemaining(null);
        setResting(false);
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
    setIndex((i) => Math.min(items.length, Math.max(0, i + delta)));
  };
  const completeSet = (rest: number) => {
    if (items[index + 1]?.type !== "set") return go(1);
    setResting(true);
    startTimer(rest);
  };
  const next = items[index + 1];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper" role="dialog" aria-modal="true" aria-label="Échauffement guidé">
      <div className="mx-auto w-full max-w-[560px] px-5 pt-4">
        <div className="flex gap-1" aria-hidden="true">
          {items.map((_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i < index ? "bg-ink" : i === index ? "bg-accent" : "bg-line"}`} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-[15px] font-bold uppercase tracking-wide text-subtle">
            {done ? "Terminé" : `${item.phase} · ${index + 1}/${items.length}`}
          </span>
          <button type="button" onClick={onClose} className="py-1.5 text-[14px] font-semibold text-muted hover:text-ink">
            Fermer
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center px-6" aria-live="polite">
        {done ? (
          <div className="flex flex-col gap-4">
            <p className="font-display text-[56px] font-extrabold uppercase leading-[0.9] text-ink">
              Échauffé.
              <br />
              <span className="text-accent">À toi.</span>
            </p>
            <p className="text-[16px] text-muted">Ta prochaine série est ta première série de travail.</p>
          </div>
        ) : resting ? (
          <div className="flex flex-col gap-5">
            <p className="font-display text-[18px] font-bold uppercase tracking-wide text-subtle">Repos</p>
            <p className="font-display text-[120px] font-extrabold leading-[0.85] text-ink tabular">{fmt(remaining ?? 0)}</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full bg-accent transition-[width] duration-1000 ease-linear" style={{ width: `${((remaining ?? 0) / duration) * 100}%` }} />
            </div>
            {next?.type === "set" && (
              <p className="text-[17px] text-muted">
                Ensuite : <span className="font-display text-[22px] font-bold text-ink">{next.load} × {next.reps}</span>
              </p>
            )}
          </div>
        ) : item.type === "set" ? (
          <div className="flex flex-col gap-5">
            <p className="text-[16px] font-medium text-muted">
              {item.title} — série d&apos;approche {item.index} sur {item.total}
            </p>
            <p className="font-display font-extrabold uppercase leading-[0.85] text-ink">
              {/* « Barre seule » ou « Amplitude réduite » : trop longs pour la taille pleine. */}
              <span className={`block tabular ${item.load.length > 7 ? "text-[60px]" : "text-[88px]"}`}>{item.load}</span>
              <span className="block text-[56px] text-accent">× {item.reps}</span>
            </p>
            {item.plates && (
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-subtle">De chaque côté</span>
                <Plates plates={item.plates} size={56} />
              </div>
            )}
          </div>
        ) : item.type === "info" ? (
          <div className="flex flex-col gap-5">
            <p className="font-display text-[40px] font-extrabold uppercase leading-[0.95] text-ink">{item.title}</p>
            <ul className="divide-y divide-line border-y border-line">
              {item.lines.map((l) => (
                <li key={l} className="py-3 text-[16px] text-muted">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="font-display text-[44px] font-extrabold uppercase leading-[0.92] tracking-tight text-ink">{item.title}</p>
            <p className="font-display text-[34px] font-bold leading-none text-accent tabular">
              {item.countdown && remaining !== null ? fmt(remaining) : item.target}
            </p>
            <p className="text-[17px] leading-relaxed text-muted">{item.instructions}</p>
          </div>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-[560px] gap-3 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
        {done ? (
          <button type="button" onClick={onClose} className={primary}>
            Retour au plan
          </button>
        ) : (
          <>
            <button type="button" onClick={() => go(-1)} disabled={index === 0 && !resting} className={`${secondary} disabled:opacity-30`} aria-label="Étape précédente">
              ←
            </button>
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
                Lancer le chrono
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
