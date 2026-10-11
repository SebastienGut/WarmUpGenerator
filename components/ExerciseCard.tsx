"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/warmup-data";
import { EQUIPMENT_LABELS, ZONE_LABELS, type BodyZone } from "@/lib/warmup-data";

interface Props {
  exercise: Exercise;
  index: number;
  zone?: BodyZone;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function ExerciseCard({ exercise, index, zone }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-card text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Numéro */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-[13px] font-black text-accent-ink">
          {index}
        </div>

        {/* Contenu */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[14px] font-bold text-ink">{exercise.name}</p>
            <span className="shrink-0 text-faint">
              <ChevronIcon open={open} />
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            {zone && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
                Protection · {ZONE_LABELS[zone]}
              </span>
            )}
            <span className="text-[11px] font-medium text-faint">
              {exercise.reps ? `${exercise.reps} reps` : `${exercise.durationSeconds}s`}
            </span>
          </div>
        </div>
      </div>

      {/* Détail dépliable */}
      <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-4 pb-4 pt-3">
            <p className="text-[12px] leading-5 text-subtle">{exercise.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-lg border border-line bg-ink/[0.03] px-2.5 py-1 text-[11px] font-medium text-subtle">
                {EQUIPMENT_LABELS[exercise.equipment]}
              </span>
              <span className="rounded-lg border border-line bg-ink/[0.03] px-2.5 py-1 text-[11px] font-medium text-subtle">
                {exercise.durationSeconds}s
              </span>
            </div>
            {exercise.fallback && (
              <p className="mt-3 text-[11px] leading-4 text-faint">
                Sans matériel : {exercise.fallback}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
