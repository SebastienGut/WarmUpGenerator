"use client";

import { useEffect, useMemo, useState } from "react";
import type { SessionPlan } from "@/lib/session-engine";

type GuidedItem =
  | { type: "do"; phase: string; title: string; target: string; instructions: string; countdown?: number }
  | { type: "set"; phase: string; title: string; target: string; plates?: string; rest: number; index: number; total: number }
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
            target: `${line.load} × ${line.reps}`,
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

export default function GuidedMode({ plan, onClose }: { plan: SessionPlan; onClose: () => void }) {
  const items = useMemo(() => flatten(plan), [plan]);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
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

  const go = (delta: number) => {
    setRemaining(null);
    setResting(false);
    setIndex((i) => Math.min(items.length, Math.max(0, i + delta)));
  };
  const completeSet = (rest: number) => {
    if (index === items.length - 1 || items[index + 1]?.type !== "set") return go(1);
    setResting(true);
    setRemaining(rest);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050505]" role="dialog" aria-modal="true" aria-label="Échauffement guidé">
      <div className="h-1 w-full bg-white/[0.06]">
        <div className="h-full bg-[#A3FF12] transition-all" style={{ width: `${(Math.min(index, items.length) / items.length) * 100}%` }} />
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
          {done ? "Terminé" : `${item.phase} · ${index + 1}/${items.length}`}
        </span>
        <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-[13px] font-bold text-[#A1A1A6] hover:text-white">
          Fermer
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center gap-6 px-6">
        {done ? (
          <div className="flex flex-col gap-4 text-center">
            <p className="font-sans text-[34px] font-black leading-tight text-white">Échauffé. À toi de jouer.</p>
            <p className="text-[15px] text-[#A1A1A6]">Ta prochaine série est ta première série de travail.</p>
          </div>
        ) : resting ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#5A5A60]">Repos</p>
            <p className="font-mono text-[72px] font-black tabular-nums text-white">{fmt(remaining ?? 0)}</p>
            {items[index + 1]?.type === "set" && (
              <p className="text-[15px] text-[#A1A1A6]">
                Ensuite : <span className="font-bold text-white">{(items[index + 1] as Extract<GuidedItem, { type: "set" }>).target}</span>
              </p>
            )}
          </div>
        ) : item.type === "set" ? (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#A1A1A6]">
              {item.title} · série d&apos;approche {item.index}/{item.total}
            </p>
            <p className="font-sans text-[56px] font-black leading-none tracking-tight text-white">{item.target}</p>
            {item.plates && <p className="text-[16px] text-[#A1A1A6]">Par côté : {item.plates}</p>}
          </div>
        ) : item.type === "info" ? (
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[28px] font-black leading-tight text-white">{item.title}</p>
            <ul className="flex flex-col gap-2 text-[16px] text-[#A1A1A6]">
              {item.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[32px] font-black leading-tight tracking-tight text-white">{item.title}</p>
            <p className="font-mono text-[22px] font-bold text-[#A3FF12]">
              {item.countdown && remaining !== null ? fmt(remaining) : item.target}
            </p>
            <p className="text-[16px] leading-relaxed text-[#A1A1A6]">{item.instructions}</p>
          </div>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-[560px] gap-3 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
        {done ? (
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl bg-[#A3FF12] py-4 font-sans text-[17px] font-black uppercase text-black">
            Retour au plan
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0 && !resting}
              className="rounded-2xl border border-white/[0.1] px-5 py-4 text-[15px] font-bold text-white disabled:opacity-30"
              aria-label="Étape précédente"
            >
              ←
            </button>
            {resting ? (
              <button type="button" onClick={() => go(1)} className="flex-1 rounded-2xl border border-white/[0.1] py-4 text-[16px] font-bold text-white">
                Passer le repos
              </button>
            ) : item.type === "set" ? (
              <button type="button" onClick={() => completeSet(item.rest)} className="flex-1 rounded-2xl bg-[#A3FF12] py-4 font-sans text-[17px] font-black uppercase text-black">
                Série faite
              </button>
            ) : item.type === "do" && item.countdown && remaining === null ? (
              <button type="button" onClick={() => setRemaining(item.countdown!)} className="flex-1 rounded-2xl bg-[#A3FF12] py-4 font-sans text-[17px] font-black uppercase text-black">
                Lancer le chrono
              </button>
            ) : (
              <button type="button" onClick={() => go(1)} className="flex-1 rounded-2xl bg-[#A3FF12] py-4 font-sans text-[17px] font-black uppercase text-black">
                {index === items.length - 1 ? "Terminer" : "Suivant"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
