"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EXERCISE_LABELS,
  computeApproachSets,
  formatKg,
  type ApproachExercise,
} from "@/lib/approach-sets";
import Plates from "@/components/Plates";

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
  const label = "font-display text-[14px] font-bold uppercase tracking-wide text-subtle";
  const chip = (active: boolean) =>
    `rounded-lg border-2 px-3 py-2.5 text-[14px] font-semibold transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-line bg-card text-muted hover:border-line-strong"
    }`;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-card p-5 md:p-6">
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
          <div className="flex items-center rounded-xl border border-line bg-card focus-within:border-accent">
            <input
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ""))}
              className="w-full bg-transparent px-4 py-3 font-display text-[26px] font-bold text-ink outline-none tabular"
              aria-label="Charge de la première série de travail en kilos"
            />
            <span className="pr-4 font-display text-[17px] font-bold text-subtle">kg</span>
          </div>
        </label>
        <label className="flex flex-col gap-2.5">
          <span className={label}>03 Répétitions</span>
          <select
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="rounded-xl border border-line bg-card px-4 py-3 font-display text-[26px] font-bold text-ink outline-none focus:border-accent"
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
          <p className="rounded-xl border border-line bg-card px-4 py-4 text-[14px] text-muted">
            {workWeight > 0
              ? "Charge trop légère pour une montée en charge : quelques répétitions à vide suffisent avant ta série de travail."
              : "Indique la charge de ta première série de travail."}
          </p>
        ) : (
          <table className="w-full border-y-2 border-ink text-left">
            <tbody>
              {sets.map((s, i) => (
                <tr key={i} className="border-b border-line last:border-b-0">
                  <td className="w-7 py-3 font-display text-[16px] font-bold text-subtle tabular">{i + 1}</td>
                  <td className="py-3">
                    <span className="font-display text-[24px] font-bold leading-none text-ink tabular">
                      {s.emptyBar ? "Barre seule" : formatKg(s.weight)}
                    </span>
                    <span className="ml-1.5 font-display text-[19px] font-semibold text-muted">× {s.reps}</span>
                    <span className="mt-1 block text-[11px] text-subtle tabular">
                      {s.percent} % · repos {s.restSeconds} s
                    </span>
                  </td>
                  <td className="py-3 text-right">{!dumbbells && !s.emptyBar && <Plates plates={s.platesPerSide} size={24} />}</td>
                </tr>
              ))}
              <tr className="bg-accent/[0.07]">
                <td className="w-7 py-3 pl-1 font-display text-[18px] font-extrabold text-accent">→</td>
                <td className="py-3" colSpan={2}>
                  <span className="font-display text-[26px] font-extrabold leading-none text-ink tabular">{formatKg(workWeight)}</span>
                  <span className="ml-1.5 font-display text-[20px] font-bold text-muted">× {reps}</span>
                  <span className="ml-2 text-[13px] font-semibold text-accent-ink">série de travail</span>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
