"use client";

import { useEffect, useMemo, useState } from "react";
import ExerciseFigure from "@/components/ExerciseFigure";
import GuidedMode from "@/components/GuidedMode";
import Plates from "@/components/Plates";
import Sheet from "@/components/Sheet";
import { LIFTS, LIFTS_BY_ID, LIFT_GROUPS } from "@/lib/lifts";
import { buildRampPlan } from "@/lib/session-engine";

const BARS = [20, 15, 10];
const REPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15];
// Exercices qui se chargent : les seuls pour lesquels une montée en charge a un sens.
const LOADED = LIFTS.filter((l) => l.loading !== "poids-du-corps");
// Anciens identifiants génériques du calculateur, gardés pour les liens existants.
const LEGACY: Record<string, string> = { halteres: "developpe-halteres", machine: "presse" };

export default function ApproachCalculator() {
  const [liftId, setLiftId] = useState("squat");
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState(5);
  const [bar, setBar] = useState(20);
  const [picking, setPicking] = useState(false);
  const [guided, setGuided] = useState(false);

  // Paramètres partageables : /series-approche?ex=squat&charge=100&reps=5.
  // L'URL n'existe pas au rendu statique : on la lit après hydratation.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const raw = p.get("ex") ?? "";
    const ex = LEGACY[raw] ?? raw;
    const charge = Number(p.get("charge"));
    const r = Number(p.get("reps"));
    const b = Number(p.get("barre"));
    /* eslint-disable react-hooks/set-state-in-effect */
    if (LIFTS_BY_ID[ex] && LIFTS_BY_ID[ex].loading !== "poids-du-corps") setLiftId(ex);
    if (charge > 0) setWeight(String(charge));
    if (r >= 1 && r <= 15) setReps(r);
    if (BARS.includes(b)) setBar(b);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const lift = LIFTS_BY_ID[liftId];
  const barbell = lift.loading === "barre";
  const kg = Number(weight.replace(",", "."));
  const workWeight = kg > 0 && kg < 600 ? kg : undefined;
  const plan = useMemo(() => buildRampPlan(liftId, workWeight, reps, bar), [liftId, workWeight, reps, bar]);
  const ramp = plan.phases[0].steps[0];
  const lines = ramp.kind === "ramp" ? ramp.lines : [];

  useEffect(() => {
    const p = new URLSearchParams({ ex: liftId, reps: String(reps) });
    if (workWeight) p.set("charge", String(workWeight));
    if (barbell && bar !== 20) p.set("barre", String(bar));
    window.history.replaceState(null, "", `?${p.toString()}`);
  }, [liftId, workWeight, reps, bar, barbell]);

  const label = "mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle";

  return (
    <div className="flex flex-col gap-6">
      {/* Exercice */}
      <div>
        <p className={label}>Exercice</p>
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card p-2 pr-4 text-left transition-colors hover:border-ink"
        >
          <ExerciseFigure id={liftId} label={lift.name} className="h-16 w-[72px] shrink-0 rounded-xl bg-ink/[0.03]" />
          <span className="flex-1 font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink">{lift.name}</span>
          <span className="text-[13px] font-semibold text-accent-ink">Changer</span>
        </button>
      </div>

      {/* Série de travail */}
      <div>
        <p className={label}>Ta série de travail du jour{lift.loading === "halteres" ? " (par haltère)" : ""}</p>
        <div className="flex items-end gap-3">
          <label className="flex flex-1 items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
            <input
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ""))}
              placeholder="—"
              aria-label="Charge de ta série de travail, en kilos"
              className="w-full min-w-0 bg-transparent font-display text-[52px] font-extrabold leading-none text-ink outline-none tabular placeholder:text-faint"
            />
            <span className="font-display text-[22px] font-bold text-subtle">kg</span>
          </label>
          <span className="pb-2 font-display text-[30px] font-bold text-subtle">×</span>
          <label className="flex items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
            <select
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              aria-label="Répétitions de ta série de travail"
              className="appearance-none bg-transparent font-display text-[52px] font-extrabold leading-none text-ink outline-none tabular"
            >
              {REPS.map((r) => (
                <option key={r} value={r} className="bg-card text-[16px]">
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
        {barbell && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[13px] text-subtle">Barre</span>
            {BARS.map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={b === bar}
                onClick={() => setBar(b)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  b === bar ? "border-ink bg-ink text-paper" : "border-line-strong bg-card text-ink hover:border-ink"
                }`}
              >
                {b} kg
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Montée en charge */}
      <div aria-live="polite">
        <p className={label}>Ta montée en charge</p>
        <ol className="overflow-hidden rounded-2xl border border-line bg-card">
          {lines.map((l, i) => (
            <li key={i} className="anim-rise flex items-center gap-3 border-b border-line px-4 py-3" style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
              <span className="w-5 font-display text-[15px] font-bold text-subtle tabular">{i + 1}</span>
              <span className="flex-1">
                <span className="font-display text-[26px] font-bold leading-none text-ink tabular">{l.load}</span>
                <span className="ml-1.5 font-display text-[20px] font-semibold text-muted">× {l.reps}</span>
                <span className="mt-1 block text-[11px] text-subtle tabular">repos {l.restSeconds} s</span>
              </span>
              {l.plates && <Plates plates={l.plates} size={26} />}
            </li>
          ))}
          <li className="flex items-center gap-3 bg-accent/[0.07] px-4 py-3">
            <span className="w-5 font-display text-[17px] font-extrabold text-accent">→</span>
            <span className="flex-1">
              <span className="font-display text-[26px] font-extrabold leading-none text-ink tabular">
                {workWeight ? `${String(workWeight).replace(".", ",")} kg` : "100 %"}
              </span>
              <span className="ml-1.5 font-display text-[20px] font-bold text-muted">× {reps}</span>
            </span>
            <span className="text-[13px] font-semibold text-accent-ink">série de travail</span>
          </li>
        </ol>
        {!workWeight && <p className="mt-2 text-[13px] text-subtle">Indique ta charge pour obtenir les poids et les disques.</p>}
      </div>

      <button
        type="button"
        onClick={() => setGuided(true)}
        className="flex w-full items-center justify-between rounded-2xl bg-accent px-6 py-4 text-on-accent transition-transform active:scale-[0.98]"
      >
        <span className="font-display text-[22px] font-extrabold uppercase tracking-wide">Démarrer la montée</span>
        <span className="text-[14px] font-semibold">avec minuteur de repos</span>
      </button>

      <Sheet open={picking} onClose={() => setPicking(false)} title="Exercice" tall>
        {LIFT_GROUPS.map((g) => {
          const items = LOADED.filter((l) => l.group === g);
          if (!items.length) return null;
          return (
            <div key={g} className="mb-5">
              <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">{g}</p>
              <div className="grid grid-cols-3 gap-2">
                {items.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={l.id === liftId}
                    onClick={() => {
                      setLiftId(l.id);
                      setPicking(false);
                    }}
                    className={`flex flex-col overflow-hidden rounded-xl border-2 text-left transition-colors ${
                      l.id === liftId ? "border-accent bg-accent/[0.06]" : "border-line bg-card hover:border-line-strong"
                    }`}
                  >
                    <ExerciseFigure id={l.id} label={l.name} animate={false} className="aspect-[12/10] w-full" />
                    <span className="px-2 pb-2 text-[12px] font-semibold leading-tight text-ink">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </Sheet>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </div>
  );
}
