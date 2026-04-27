"use client";

import type { MuscleGroup } from "@/lib/warmup-data";
import { MUSCLE_LABELS } from "@/lib/warmup-data";

interface Props {
  muscle: MuscleGroup;
  selected: boolean;
  onToggle: (m: MuscleGroup) => void;
}

export default function MuscleChip({ muscle, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(muscle)}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 select-none ${
        selected
          ? "bg-[var(--accent)] border-[var(--accent)] text-black font-semibold"
          : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)]"
      }`}
    >
      {MUSCLE_LABELS[muscle]}
    </button>
  );
}
