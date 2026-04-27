"use client";

import type { MuscleGroup } from "@/lib/warmup-data";

// Simple, bold geometric icons — readable at any size
const ICONS: Record<MuscleGroup, React.ReactNode> = {
  pecs: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="15" r="6.5" />
      <circle cx="22" cy="15" r="6.5" />
    </svg>
  ),
  dos: (
    <svg viewBox="0 0 100 100" fill="currentColor">
      <path d="M47,10 L40,10 C32,10 25,15 18,20 C10,25 8,35 8,42 C8,50 15,50 18,45 C20,40 24,40 28,45 C32,60 35,75 38,90 L46,90 L46,65 L32,48 L47,35 L47,25 L45,20 L47,15 Z" />
      <path d="M53,10 L60,10 C68,10 75,15 82,20 C90,25 92,35 92,42 C92,50 85,50 82,45 C80,40 76,40 72,45 C68,60 65,75 62,90 L54,90 L54,65 L68,48 L53,35 L53,25 L55,20 L53,15 Z" />
    </svg>
  ),
  epaules: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="5" />
      <circle cx="16" cy="13" r="5" />
      <circle cx="26" cy="19" r="5" />
    </svg>
  ),
  jambes: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="9" height="22" rx="4.5" />
      <rect x="18" y="5" width="9" height="22" rx="4.5" />
    </svg>
  ),
  fessiers: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6 Q26 6 26 16 Q26 26 16 26 Q6 26 6 16 Q6 6 16 6 Z" />
      <path d="M16 6 L16 26" />
    </svg>
  ),
  bras: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 27 L7 17 Q7 7 14 5 Q21 4 22 12 Q20 17 16 16" />
      <path d="M16 16 Q23 15 24 21 Q25 27 19 27 Z" />
    </svg>
  ),
  core: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="20" height="24" rx="4" />
      <path d="M16 4 L16 28" />
      <path d="M6 13 L26 13" />
      <path d="M6 20 L26 20" />
    </svg>
  ),
};

const SHORT_LABELS: Record<MuscleGroup, string> = {
  pecs: "Pecs",
  dos: "Dos",
  epaules: "Épaules",
  jambes: "Jambes",
  fessiers: "Fessiers",
  bras: "Bras",
  core: "Core",
};

interface Props {
  muscle: MuscleGroup;
  selected: boolean;
  onToggle: (m: MuscleGroup) => void;
}

export default function MuscleCard({ muscle, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(muscle)}
      className={`flex flex-col items-center justify-center gap-3 aspect-square rounded-2xl border transition-all duration-150 select-none ${
        selected
          ? "bg-green-500/10 border-green-500/60 text-green-400"
          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)]"
      }`}
    >
      <div className="w-10 h-10">{ICONS[muscle]}</div>
      <span className="text-xs font-semibold">{SHORT_LABELS[muscle]}</span>
    </button>
  );
}
