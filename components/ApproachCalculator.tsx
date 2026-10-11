"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EXERCISE_LABELS,
  computeApproachSets,
  formatKg,
  formatPlates,
  type ApproachExercise,
} from "@/lib/approach-sets";

const EXERCISES = Object.keys(EXERCISE_LABELS) as ApproachExercise[];
const BARS = [20, 15, 10];

function isExercise(v: string | null): v is ApproachExercise {
  return v !== null && (EXERCISES as string[]).includes(v);
}

export default function ApproachCalculator() {
  const [exercise, setExercise] = useState<ApproachExercise>("squat");
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState(5);
  const [bar, setBar] = useState(20);

  // Paramètres partageables : /series-approche?ex=squat&charge=100&reps=5
  // Lus après le montage pour garder la page entièrement statique.
  // L'URL n'existe pas au rendu statique : la synchroniser après hydratation
  // est précisément le cas d'usage légitime d'un setState dans un effet.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const ex = p.get("ex");
    const charge = Number(p.get("charge"));
    const r = Number(p.get("reps"));
    const b = Number(p.get("barre"));
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isExercise(ex)) setExercise(ex);
    if (charge > 0) setWeight(String(charge));
    if (r >= 1 && r <= 15) setReps(r);
    if (BARS.includes(b)) setBar(b);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const workWeight = Number(weight.replace(",", "."));
  const sets = useMemo(
    () => computeApproachSets({ exercise, workWeight, workReps: reps, barWeight: bar }),
    [exercise, workWeight, reps, bar],
  );

  useEffect(() => {
    if (!(workWeight > 0)) return;
    const p = new URLSearchParams({ ex: exercise, charge: String(workWeight), reps: String(reps) });
    if (bar !== 20) p.set("barre", String(bar));
    window.history.replaceState(null, "", `?${p.toString()}`);
  }, [exercise, workWeight, reps, bar]);

  const dumbbells = exercise === "halteres" || exercise === "machine";
  const label = "font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]";
  const chip = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-[13px] font-bold transition-colors ${
      active
        ? "border-[#A3FF12] bg-[#A3FF12]/10 text-[#A3FF12]"
        : "border-white/[0.06] bg-[#0C0C0E] text-[#A1A1A6] hover:border-white/[0.14]"
    }`;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-[#08080A] p-5 md:p-6">
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>01 Exercice</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {EXERCISES.map((e) => (
            <button key={e} type="button" onClick={() => setExercise(e)} className={chip(e === exercise)} aria-pressed={e === exercise}>
              {EXERCISE_LABELS[e]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2.5">
          <span className={label}>02 Charge de travail{exercise === "halteres" ? " (par haltère)" : ""}</span>
          <div className="flex items-center rounded-xl border border-white/[0.08] bg-[#0C0C0E] focus-within:border-[#A3FF12]">
            <input
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ""))}
              className="w-full bg-transparent px-4 py-3 font-mono text-[20px] font-bold text-white outline-none"
              aria-label="Charge de la première série de travail en kilos"
            />
            <span className="pr-4 font-mono text-[13px] text-[#5A5A60]">kg</span>
          </div>
        </label>
        <label className="flex flex-col gap-2.5">
          <span className={label}>03 Répétitions</span>
          <select
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="rounded-xl border border-white/[0.08] bg-[#0C0C0E] px-4 py-3 font-mono text-[20px] font-bold text-white outline-none focus:border-[#A3FF12]"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!dumbbells && (
        <fieldset className="flex flex-col gap-2.5">
          <legend className={`${label} mb-2.5`}>04 Barre</legend>
          <div className="flex gap-2">
            {BARS.map((b) => (
              <button key={b} type="button" onClick={() => setBar(b)} className={chip(b === bar)} aria-pressed={b === bar}>
                {b} kg
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div aria-live="polite">
        <p className={`${label} mb-3`}>Tes séries d&apos;approche</p>
        {sets.length === 0 ? (
          <p className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-4 text-[14px] text-[#A1A1A6]">
            {workWeight > 0
              ? "Charge trop légère pour une montée en charge : quelques répétitions à vide suffisent avant ta série de travail."
              : "Indique la charge de ta première série de travail."}
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {sets.map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3">
                <span className="w-6 font-mono text-[13px] font-black text-[#A3FF12]">{i + 1}</span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[16px] font-bold text-white">
                    {formatKg(s.weight)} × {s.reps}
                    {s.emptyBar && <span className="ml-2 text-[12px] font-medium text-[#5A5A60]">barre seule</span>}
                  </span>
                  {!dumbbells && !s.emptyBar && (
                    <span className="text-[12px] text-[#5A5A60]">Par côté : {formatPlates(s.platesPerSide)}</span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[12px] font-bold text-[#A1A1A6]">{s.percent} %</span>
                  <span className="font-mono text-[11px] text-[#5A5A60]">repos {s.restSeconds}s</span>
                </div>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-xl border border-[#A3FF12]/40 bg-[#A3FF12]/[0.06] px-4 py-3">
              <span className="w-6 font-mono text-[13px] font-black text-[#A3FF12]">→</span>
              <span className="flex-1 text-[16px] font-black text-white">
                {formatKg(workWeight)} × {reps}
                <span className="ml-2 text-[12px] font-medium text-[#A3FF12]">série de travail</span>
              </span>
            </li>
          </ol>
        )}
      </div>
    </div>
  );
}
