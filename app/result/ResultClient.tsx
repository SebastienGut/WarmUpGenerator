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
      <main className="relative flex min-h-screen flex-col bg-paper">
        <div className="content-layer mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 pt-7 pb-6">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-display text-[14px] font-bold uppercase tracking-wide text-subtle transition active:scale-95 hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
              Retour
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
                <Zap className="h-3 w-3 fill-accent stroke-accent" strokeWidth={2.5} />
              </div>
              <span className="font-display text-[14px] font-bold uppercase tracking-wide text-ink">
                Warmup / Plan
              </span>
            </div>
          </header>

          <div className="mt-6">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              Plan généré · {steps.length} mouvements
            </p>
            <h1 className="mt-2 font-display text-[32px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              {muscleLabel}
              <br />
              <span className="italic text-accent-ink">{objectiveLabel}.</span>
            </h1>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Format" value={`${requestedDuration} min`} />
            <Stat label="Circuit" value={`x${CIRCUIT_ROUNDS}`} />
            <Stat label="Mouvements" value={String(steps.length)} accent />
          </div>
          {plan.ciblé.length > 0 && (
            <p className="mt-2 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              {plan.ciblé.length} mouvement{plan.ciblé.length > 1 ? "s" : ""} de protection inclus
            </p>
          )}

          <div className="mt-5 flex-1">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-display text-[14px] font-bold uppercase tracking-wide text-ink">
                Timeline
              </h2>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-subtle">
                A REPETER 2X
              </span>
            </div>

            <div className="relative pl-3">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/[0.07]" />
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
              className="energy-ring group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-accent px-6 py-5 text-left text-on-accent transition-transform active:scale-[0.98] focus-visible:outline-none"
            >
              <div className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight">
                Démarrer l&apos;échauffement
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/15">
                <Play className="h-5 w-5 fill-black ml-0.5" strokeWidth={2.4} />
              </div>
            </button>
            <button
              type="button"
              onClick={sharePlan}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-3 font-display text-[14px] font-bold uppercase tracking-wide text-muted transition-colors hover:border-accent/40 hover:text-accent-ink active:scale-[0.98]"
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
            {objectiveLabel !== "Mobilité" && (
              <Link
                href="/series-approche"
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-left transition-colors hover:border-accent/40"
              >
                <span className="flex flex-col">
                  <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
                    Ensuite, sur ton premier exercice
                  </span>
                  <span className="text-[14px] font-bold text-ink">Calculer mes séries d&apos;approche</span>
                </span>
                <span aria-hidden="true" className="font-mono text-accent-ink">→</span>
              </Link>
            )}
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
        accent ? "border-accent/20 bg-accent/[0.04]" : "border-line bg-card"
      }`}
    >
      <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
        {label}
      </p>
      <p
        className={`mt-1 font-display text-[23px] font-extrabold leading-none tracking-tight ${
          accent ? "text-accent" : "text-ink"
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
            isProtection ? "bg-accent ring-2 ring-accent/30" : "bg-accent"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
            isProtection ? "border-accent/15 bg-accent/[0.03]" : "border-line bg-card"
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-subtle">
                {String(step.index).padStart(2, "0")}
              </span>
              {isProtection && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-ink">
                  · Protection
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-[13px] font-bold text-ink">{step.exercise.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[15px] font-extrabold tabular text-ink">{fmt(step.start)}</p>
            <p className="font-mono text-[9px] font-medium text-subtle">
              {step.exercise.durationSeconds}s
            </p>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-subtle transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={2.2}
          />
        </button>

        <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] pt-1" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="rounded-xl border border-line bg-card px-3 py-3">
              <p className="text-[12px] leading-5 text-muted">{step.exercise.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-line px-2 py-1 font-display text-[14px] font-bold uppercase tracking-wide text-muted">
                  {EQUIPMENT_LABELS[step.exercise.equipment]}
                </span>
                {step.exercise.fallback && (
                  <span className="rounded-full border border-accent/20 bg-accent/[0.04] px-2 py-1 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
                    Alternative dispo
                  </span>
                )}
              </div>
              {step.exercise.fallback && (
                <p className="mt-2 text-[12px] leading-5 text-muted">
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
