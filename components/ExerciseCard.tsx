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
      className="w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111318] text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e]"
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Numéro */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#22c55e]/10 text-[13px] font-black text-[#22c55e]">
          {index}
        </div>

        {/* Contenu */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[14px] font-bold text-white">{exercise.name}</p>
            <span className="shrink-0 text-[#4B5563]">
              <ChevronIcon open={open} />
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            {zone && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#22c55e]">
                Protection · {ZONE_LABELS[zone]}
              </span>
            )}
            <span className="text-[11px] font-medium text-[#4B5563]">
              {exercise.reps ? `${exercise.reps} reps` : `${exercise.durationSeconds}s`}
            </span>
          </div>
        </div>
      </div>

      {/* Détail dépliable */}
      <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
            <p className="text-[12px] leading-5 text-[#6B7280]">{exercise.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                {EQUIPMENT_LABELS[exercise.equipment]}
              </span>
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                {exercise.durationSeconds}s
              </span>
            </div>
            {exercise.fallback && (
              <p className="mt-3 text-[11px] leading-4 text-[#4B5563]">
                Sans matériel : {exercise.fallback}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
