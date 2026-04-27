"use client";

import type { Objective } from "@/lib/warmup-data";
import { OBJECTIVE_LABELS } from "@/lib/warmup-data";

const ICONS: Record<Objective, React.ReactNode> = {
  force: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="9.5" />
    </svg>
  ),
  hypertrophie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="15" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="19" rx="1" />
    </svg>
  ),
  mobilite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7 A9 9 0 1 0 7 20" />
      <path d="M18 3 L21 7 L17 8" />
    </svg>
  ),
  reprise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 12 3" />
      <path d="M8 3 L12 3 L12 7" />
      <path d="M16 12 L16 18 M13 15 L16 18 L19 15" />
    </svg>
  ),
};

interface Props {
  objective: Objective;
  selected: boolean;
  onSelect: (o: Objective) => void;
}

export default function ObjectiveCard({ objective, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(objective)}
      className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-150 select-none ${
        selected
          ? "bg-green-500/10 border-green-500/70 text-green-400"
          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)]"
      }`}
    >
      <div className="w-6 h-6">{ICONS[objective]}</div>
      <span className="text-xs font-semibold leading-tight text-center">
        {OBJECTIVE_LABELS[objective]}
      </span>
    </button>
  );
}
