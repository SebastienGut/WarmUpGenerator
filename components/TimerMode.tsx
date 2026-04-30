"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pause, Play, SkipForward, RotateCcw, HelpCircle } from "lucide-react";
import { EQUIPMENT_LABELS, type Exercise } from "@/lib/warmup-data";

export interface TimerStep {
  exercise: Exercise;
  phase: "Mobilisation" | "Activation" | "Protection";
  index: number;
  round?: number;
  totalRounds?: number;
}

interface Props {
  steps: TimerStep[];
  open: boolean;
  onClose: () => void;
}

export default function TimerMode({ steps, open, onClose }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showCue, setShowCue] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const current = steps[stepIdx];
  const next = steps[stepIdx + 1];
  const total = current?.exercise.durationSeconds ?? 0;
  const remaining = Math.max(0, total - elapsed);
  const progress = total > 0 ? (elapsed / total) * 100 : 0;
  const finished = stepIdx >= steps.length;

  useEffect(() => {
    if (!open) {
      setStepIdx(0);
      setElapsed(0);
      setPaused(false);
      setShowCue(false);
    }
  }, [open]);

  useEffect(() => {
    setShowCue(false);
  }, [stepIdx]);

  useEffect(() => {
    if (!open || paused || finished) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        if (current && e + 1 >= current.exercise.durationSeconds) {
          setStepIdx((i) => i + 1);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open, paused, finished, current]);

  function skip() {
    setElapsed(0);
    setStepIdx((i) => i + 1);
  }
  function restart() {
    setStepIdx(0);
    setElapsed(0);
    setPaused(false);
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex flex-col bg-[#050505]"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white active:scale-95"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" strokeWidth={2.4} />
          </button>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            {finished ? "Terminé" : `${stepIdx + 1} / ${steps.length}`}
          </p>
          <div className="h-9 w-9" />
        </header>

        {finished ? (
          <FinishedScreen onRestart={restart} onClose={onClose} />
        ) : (
          <>
            {/* Body */}
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#A3FF12]">
                {current.totalRounds && current.totalRounds > 1
                  ? `Tour ${current.round}/${current.totalRounds} · ${current.phase}`
                  : current.phase}
              </p>
              <h2 className="mt-4 text-center font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white">
                {current.exercise.name}
              </h2>
              {current.exercise.reps && (
                <p className="mt-3 font-mono text-[14px] font-semibold uppercase tracking-widest text-[#A1A1A6]">
                  {current.exercise.reps}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowCue((value) => !value)}
                className="mt-5 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0C0C0E] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#A1A1A6] active:scale-95"
              >
                <HelpCircle className="h-3.5 w-3.5 text-[#A3FF12]" strokeWidth={2.2} />
                Consigne
              </button>
              {showCue && (
                <div className="mt-3 w-full max-w-[340px] rounded-2xl border border-white/[0.08] bg-[#0C0C0E] px-4 py-3 text-left">
                  <p className="text-[13px] leading-5 text-[#D7D7DA]">{current.exercise.description}</p>
                  <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5A5A60]">
                    Matériel : {EQUIPMENT_LABELS[current.exercise.equipment]}
                  </p>
                  {current.exercise.fallback && (
                    <p className="mt-2 text-[12px] leading-5 text-[#A1A1A6]">
                      Sans matériel : {current.exercise.fallback}
                    </p>
                  )}
                </div>
              )}

              {/* Timer ring */}
              <div className={`relative flex h-[220px] w-[220px] items-center justify-center ${showCue ? "mt-7" : "mt-12"}`}>
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" stroke="#1A1A1E" strokeWidth="6" fill="none" />
                  <motion.circle
                    cx="110"
                    cy="110"
                    r="100"
                    stroke="#A3FF12"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 100}
                    animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - progress / 100) }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>
                <div className="text-center">
                  <p className="font-mono text-[64px] font-black leading-none tracking-tight text-white">
                    {String(remaining).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#5A5A60]">
                    secondes
                  </p>
                </div>
              </div>

              {next && (
                <div className="mt-10 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-3 py-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
                    Suivant
                  </span>
                  <span className="text-[12px] font-bold text-white">{next.exercise.name}</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pb-8">
              <button
                type="button"
                onClick={restart}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] text-white active:scale-95"
                aria-label="Recommencer"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A3FF12] text-black active:scale-95 shadow-[0_0_30px_rgba(163,255,18,0.4)]"
                aria-label={paused ? "Reprendre" : "Pause"}
              >
                {paused ? (
                  <Play className="h-6 w-6 fill-black ml-0.5" strokeWidth={2.4} />
                ) : (
                  <Pause className="h-6 w-6 fill-black" strokeWidth={2.4} />
                )}
              </button>
              <button
                type="button"
                onClick={skip}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] text-white active:scale-95"
                aria-label="Suivant"
              >
                <SkipForward className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function FinishedScreen({ onRestart, onClose }: { onRestart: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-[#A3FF12]/[0.08] ring-2 ring-[#A3FF12]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#A3FF12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </motion.div>
      <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#A3FF12]">
        Warmup complet
      </p>
      <h2 className="mt-3 text-center font-sans text-[40px] font-black uppercase leading-none tracking-tight text-white">
        Prêt pour<br />la séance.
      </h2>
      <div className="mt-10 flex flex-col gap-2 w-full max-w-[280px]">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-2xl border border-white/[0.08] bg-[#0C0C0E] py-3.5 text-[13px] font-black uppercase tracking-wider text-white active:scale-[0.98]"
        >
          Refaire le warmup
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl bg-[#A3FF12] py-3.5 text-[13px] font-black uppercase tracking-wider text-black active:scale-[0.98]"
        >
          Terminer
        </button>
      </div>
    </div>
  );
}
