"use client";

import { DURATION_OPTIONS } from "@/lib/warmup-data";

interface Props {
  value: 3 | 5 | 8;
  onChange: (v: 3 | 5 | 8) => void;
}

export default function DurationPicker({ value, onChange }: Props) {
  return (
    <div className="flex bg-card rounded-xl p-1 border border-line gap-1">
      {DURATION_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 select-none ${
            value === opt.value
              ? "bg-[var(--accent)] text-on-accent"
              : "text-muted hover:text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
