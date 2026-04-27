"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Zap, Shield } from "lucide-react";
import { formatDuration, type WarmupPlan } from "@/lib/warmup-engine";
import { ZONE_LABELS } from "@/lib/warmup-data";
import TimerMode, { type TimerStep } from "@/components/TimerMode";

interface Props {
  plan: WarmupPlan;
  muscleLabel: string;
  objectiveLabel: string;
}

export default function ResultClient({ plan, muscleLabel, objectiveLabel }: Props) {
  const [timerOpen, setTimerOpen] = useState(false);

  const steps = useMemo<TimerStep[]>(() => {
    let i = 1;
    return [
      ...plan.articulaire.map((ex) => ({ exercise: ex, phase: "Mobilisation" as const, index: i++ })),
      ...plan.activation.map((ex) => ({ exercise: ex, phase: "Activation" as const, index: i++ })),
      ...plan.ciblé.map(({ exercise }) => ({ exercise, phase: "Protection" as const, index: i++ })),
    ];
  }, [plan]);

  // Timeline avec offsets temporels
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

          {/* HEADER */}
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

          {/* HERO */}
          <div className="mt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              Plan généré · {steps.length} blocs
            </p>
            <h1 className="mt-2 font-sans text-[28px] font-black uppercase leading-[0.95] tracking-tight text-white">
              {muscleLabel}
              <br />
              <span className="italic text-[#A3FF12]">{objectiveLabel}.</span>
            </h1>
          </div>

          {/* STATS */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Durée" value={formatDuration(plan.totalSeconds)} />
            <Stat label="Exercices" value={String(steps.length)} accent />
            <Stat
              label={plan.ciblé.length ? "Protégé" : "Standard"}
              value={plan.ciblé.length ? String(plan.ciblé.length) : "—"}
            />
          </div>

          {/* TIMELINE */}
          <div className="mt-5 flex-1">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                Timeline
              </h2>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5A5A60]">
                0:00 → {fmt(plan.totalSeconds)}
              </span>
            </div>

            <div className="relative pl-3">
              {/* Ligne verticale */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/[0.06]" />

              <div className="flex flex-col gap-2">
                {timeline.map((step, idx) => (
                  <TimelineRow
                    key={step.exercise.id}
                    step={step}
                    idx={idx}
                    fmt={fmt}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setTimerOpen(true)}
              className="energy-ring group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#A3FF12] px-6 py-5 text-left text-black active:scale-[0.98] transition-transform focus-visible:outline-none"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                  → Mode Salle
                </div>
                <div className="mt-0.5 font-sans text-[19px] font-black uppercase leading-none tracking-tight">
                  Démarrer le timer
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/15">
                <Play className="h-5 w-5 fill-black ml-0.5" strokeWidth={2.4} />
              </div>
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5A60]">
              <Shield className="h-3 w-3" strokeWidth={2} />
              <span>Pose le téléphone · Tout en gros</span>
            </div>
          </div>
        </div>
      </main>

      <TimerMode steps={steps} open={timerOpen} onClose={() => setTimerOpen(false)} />
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 ${
        accent
          ? "border-[#A3FF12]/20 bg-[#A3FF12]/[0.04]"
          : "border-white/[0.06] bg-[#0C0C0E]"
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
  const isProtection = step.phase === "Protection";
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04, duration: 0.3 }}
      className="relative flex items-center gap-3"
    >
      {/* Dot */}
      <div className="relative z-10 flex h-2.5 w-2.5 shrink-0 items-center justify-center -ml-3.5">
        <div
          className={`h-2 w-2 rounded-full ${
            isProtection ? "bg-[#A3FF12] ring-2 ring-[#A3FF12]/30" : "bg-[#A3FF12]"
          }`}
        />
      </div>

      {/* Card */}
      <div
        className={`flex flex-1 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
          isProtection
            ? "border-[#A3FF12]/15 bg-[#A3FF12]/[0.03]"
            : "border-white/[0.06] bg-[#0C0C0E]"
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
          <p className="mt-0.5 truncate text-[13px] font-bold text-white">
            {step.exercise.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[12px] font-black tabular-nums text-white">
            {fmt(step.start)}
          </p>
          <p className="font-mono text-[9px] font-medium text-[#5A5A60]">
            {step.exercise.durationSeconds}s
          </p>
        </div>
      </div>
    </motion.div>
  );
}
