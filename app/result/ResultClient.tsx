"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, Play, Share2, Zap } from "lucide-react";
import type { WarmupPlan } from "@/lib/warmup-engine";
import { EQUIPMENT_LABELS } from "@/lib/warmup-data";
import TimerMode, { type TimerStep } from "@/components/TimerMode";

const CIRCUIT_ROUNDS = 2;

interface Props {
  plan: WarmupPlan;
  muscleLabel: string;
  objectiveLabel: string;
  requestedDuration: 3 | 5 | 8;
}

export default function ResultClient({ plan, muscleLabel, objectiveLabel, requestedDuration }: Props) {
  const [timerOpen, setTimerOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  async function sharePlan() {
    const url = window.location.href;
    // Web Share API sur mobile (WhatsApp, Messages...), clipboard en fallback
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Échauffement ${muscleLabel} · ${objectiveLabel}`,
          text: "Mon plan d'échauffement musculation — gratuit, sans inscription :",
          url,
        });
        return;
      } catch {
        // partage annulé par l'utilisateur → rien à faire
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // clipboard indisponible : pas de feedback, le lien reste dans la barre d'adresse
    }
  }

  const steps = useMemo<TimerStep[]>(() => {
    let i = 1;
    return [
      ...plan.articulaire.map((ex) => ({ exercise: ex, phase: "Mobilisation" as const, index: i++ })),
      ...plan.activation.map((ex) => ({ exercise: ex, phase: "Activation" as const, index: i++ })),
      ...plan.ciblé.map(({ exercise }) => ({ exercise, phase: "Protection" as const, index: i++ })),
    ];
  }, [plan]);

  const timerSteps = useMemo<TimerStep[]>(
    () =>
      Array.from({ length: CIRCUIT_ROUNDS }, (_, roundIndex) =>
        steps.map((step) => ({
          ...step,
          round: roundIndex + 1,
          totalRounds: CIRCUIT_ROUNDS,
        }))
      ).flat(),
    [steps]
  );

  let cumulative = 0;
  const timeline = steps.map((step) => {
    const start = cumulative;
    cumulative += step.exercise.durationSeconds;
    return { ...step, start, end: cumulative };
  });

  function fmt(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  return (
    <>
      <main className="relative flex min-h-screen flex-col bg-[#050505]">
        <div className="content-layer mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 pt-7 pb-6">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60] transition active:scale-95 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
              Retour
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/20">
                <Zap className="h-3 w-3 fill-[#A3FF12] stroke-[#A3FF12]" strokeWidth={2.5} />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                Warmup / Plan
              </span>
            </div>
          </header>

          <div className="mt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              Plan généré · {steps.length} mouvements
            </p>
            <h1 className="mt-2 font-sans text-[28px] font-black uppercase leading-[0.95] tracking-tight text-white">
              {muscleLabel}
              <br />
              <span className="italic text-[#A3FF12]">{objectiveLabel}.</span>
            </h1>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Format" value={`${requestedDuration} min`} />
            <Stat label="Circuit" value={`x${CIRCUIT_ROUNDS}`} />
            <Stat label="Mouvements" value={String(steps.length)} accent />
          </div>
          {plan.ciblé.length > 0 && (
            <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5A5A60]">
              {plan.ciblé.length} mouvement{plan.ciblé.length > 1 ? "s" : ""} de protection inclus
            </p>
          )}

          <div className="mt-5 flex-1">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                Timeline
              </h2>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5A5A60]">
                A REPETER 2X
              </span>
            </div>

            <div className="relative pl-3">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/[0.06]" />
              <div className="flex flex-col gap-2">
                {timeline.map((step, idx) => (
                  <TimelineRow key={step.exercise.id} step={step} idx={idx} fmt={fmt} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setTimerOpen(true)}
              className="energy-ring group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#A3FF12] px-6 py-5 text-left text-black transition-transform active:scale-[0.98] focus-visible:outline-none"
            >
              <div className="font-sans text-[19px] font-black uppercase leading-none tracking-tight">
                Démarrer l&apos;échauffement
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/15">
                <Play className="h-5 w-5 fill-black ml-0.5" strokeWidth={2.4} />
              </div>
            </button>
            <button
              type="button"
              onClick={sharePlan}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A1A6] transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12] active:scale-[0.98]"
            >
              {linkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Lien copié
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Partager ce plan
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {timerOpen && <TimerMode steps={timerSteps} open={timerOpen} onClose={() => setTimerOpen(false)} />}
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 ${
        accent ? "border-[#A3FF12]/20 bg-[#A3FF12]/[0.04]" : "border-white/[0.06] bg-[#0C0C0E]"
      }`}
    >
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#5A5A60]">
        {label}
      </p>
      <p
        className={`mt-1 font-sans text-[20px] font-black leading-none tracking-tight ${
          accent ? "text-[#A3FF12]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function TimelineRow({
  step,
  idx,
  fmt,
}: {
  step: TimerStep & { start: number; end: number };
  idx: number;
  fmt: (s: number) => string;
}) {
  const [open, setOpen] = useState(false);
  const isProtection = step.phase === "Protection";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04, duration: 0.3 }}
      className="relative flex items-start gap-3"
    >
      <div className="relative z-10 flex h-2.5 w-2.5 shrink-0 items-center justify-center -ml-3.5 mt-4">
        <div
          className={`h-2 w-2 rounded-full ${
            isProtection ? "bg-[#A3FF12] ring-2 ring-[#A3FF12]/30" : "bg-[#A3FF12]"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors hover:border-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12]/70 ${
            isProtection ? "border-[#A3FF12]/15 bg-[#A3FF12]/[0.03]" : "border-white/[0.06] bg-[#0C0C0E]"
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#5A5A60]">
                {String(step.index).padStart(2, "0")}
              </span>
              {isProtection && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#A3FF12]">
                  · Protection
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-[13px] font-bold text-white">{step.exercise.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-[12px] font-black tabular-nums text-white">{fmt(step.start)}</p>
            <p className="font-mono text-[9px] font-medium text-[#5A5A60]">
              {step.exercise.durationSeconds}s
            </p>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#5A5A60] transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={2.2}
          />
        </button>

        <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] pt-1" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="rounded-xl border border-white/[0.06] bg-[#111318] px-3 py-3">
              <p className="text-[12px] leading-5 text-[#D7D7DA]">{step.exercise.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-white/[0.06] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#A1A1A6]">
                  {EQUIPMENT_LABELS[step.exercise.equipment]}
                </span>
                {step.exercise.fallback && (
                  <span className="rounded-full border border-[#A3FF12]/20 bg-[#A3FF12]/[0.04] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#A3FF12]">
                    Alternative dispo
                  </span>
                )}
              </div>
              {step.exercise.fallback && (
                <p className="mt-2 text-[12px] leading-5 text-[#A1A1A6]">
                  Sans matériel : {step.exercise.fallback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
