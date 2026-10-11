"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LIFTS_BY_ID,
  LIFT_GROUPS,
  SESSION_TEMPLATES,
  searchLifts,
  sessionLabel,
} from "@/lib/lifts";
import { PAIN_LABELS, parseSession, serializeSession } from "@/lib/session-engine";
import { loadSessions, removeSession, saveSession, type SavedSession } from "@/lib/saved-sessions";
import type { BodyZone } from "@/lib/warmup-data";

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];
const REPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15];

function SectionTitle({ n, children, hint }: { n: number; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3 border-b-2 border-ink pb-2">
      <span className="font-display text-[22px] font-extrabold leading-none text-accent tabular">{String(n).padStart(2, "0")}</span>
      <h2 className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink">{children}</h2>
      {hint && <span className="ml-auto text-[12px] text-subtle">{hint}</span>}
    </div>
  );
}

function Toggle({ on, onChange, title, hint }: { on: boolean; onChange: (v: boolean) => void; title: string; hint: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
    >
      <span className="flex flex-col">
        <span className="text-[16px] font-semibold text-ink">{title}</span>
        <span className="text-[13px] text-subtle">{hint}</span>
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-faint"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow-sm transition-all ${on ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

export default function SessionBuilder() {
  const router = useRouter();
  const [lifts, setLifts] = useState<string[]>([]);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState(8);
  const [pain, setPain] = useState<BodyZone[]>([]);
  const [band, setBand] = useState(false);
  const [short, setShort] = useState(false);
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<SavedSession[]>([]);

  // Pré-remplissage depuis l'URL (« Modifier » depuis un plan) et séances
  // récentes : deux sources qui n'existent qu'au client.
  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    const input = parseSession(params);
    /* eslint-disable react-hooks/set-state-in-effect */
    setSaved(loadSessions());
    if (input.lifts.length) {
      setLifts(input.lifts);
      setWeight(input.workWeight ? String(input.workWeight) : "");
      setReps(input.workReps);
      setPain(input.pain);
      setBand(input.band);
      setShort(input.short);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const first = lifts[0] ? LIFTS_BY_ID[lifts[0]] : undefined;
  const loaded = first !== undefined && first.loading !== "poids-du-corps";
  const results = useMemo(() => searchLifts(query).filter((l) => !lifts.includes(l.id)), [query, lifts]);

  const add = (id: string) => {
    setLifts((ls) => (ls.includes(id) ? ls : [...ls, id]));
    setQuery("");
  };
  const remove = (id: string) => setLifts((ls) => ls.filter((l) => l !== id));
  const promote = (id: string) => setLifts((ls) => [id, ...ls.filter((l) => l !== id)]);
  const togglePain = (z: BodyZone) => setPain((ps) => (ps.includes(z) ? ps.filter((p) => p !== z) : [...ps, z]));

  const submit = () => {
    if (!lifts.length) return;
    const kg = Number(weight.replace(",", "."));
    const q = serializeSession({
      lifts,
      workWeight: loaded && kg > 0 ? kg : undefined,
      workReps: reps,
      pain,
      band,
      short,
    });
    saveSession({ query: q, label: sessionLabel(lifts) });
    router.push(`/plan?${q}`);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-5 pb-32 pt-5">
      <header className="mb-10 flex items-baseline justify-between">
        <span className="font-display text-[24px] font-extrabold uppercase leading-none tracking-tight text-ink">
          Warmup<span className="text-accent">.</span>
        </span>
        <Link href="/series-approche" className="text-[14px] font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
          Séries d&apos;approche
        </Link>
      </header>

      <h1 className="font-display text-[44px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[60px]">
        Ton échauffement,
        <br />
        <span className="text-accent">calé sur ta séance.</span>
      </h1>
      <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted">
        Dis ce que tu fais aujourd&apos;hui. On prépare les articulations et les muscles que tes exercices
        sollicitent, puis on calcule tes séries d&apos;approche.
      </p>

      {saved.length > 0 && (
        <section className="mt-10">
          <p className="mb-2 text-[13px] font-semibold text-subtle">Tes dernières séances</p>
          <ul className="divide-y divide-line border-y border-line">
            {saved.map((s) => (
              <li key={s.query} className="flex items-center">
                <Link href={`/plan?${s.query}`} className="group flex flex-1 items-center justify-between gap-3 py-3.5">
                  <span className="truncate font-display text-[20px] font-bold uppercase tracking-wide text-ink">{s.label}</span>
                  <span className="shrink-0 text-[14px] font-semibold text-accent-ink group-hover:underline">Relancer →</span>
                </Link>
                <button
                  type="button"
                  aria-label={`Oublier la séance ${s.label}`}
                  onClick={() => {
                    removeSession(s.query);
                    setSaved(loadSessions());
                  }}
                  className="ml-2 px-2 py-2 text-[18px] leading-none text-subtle hover:text-ink"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 1. SÉANCE */}
      <section className="mt-12">
        <SectionTitle n={1}>Ta séance du jour</SectionTitle>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {SESSION_TEMPLATES.map((t) => {
            const active = t.lifts.join(",") === lifts.join(",");
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setLifts(t.lifts)}
                className={`shrink-0 rounded-lg border-2 px-4 py-2 font-display text-[17px] font-bold uppercase tracking-wide transition-colors ${
                  active ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {lifts.length > 0 && (
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {lifts.map((id, i) => (
              <li key={id} className="flex items-center gap-3 py-3">
                <span className={`w-7 font-display text-[22px] font-extrabold leading-none tabular ${i === 0 ? "text-accent" : "text-faint"}`}>
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[17px] font-semibold text-ink">{LIFTS_BY_ID[id].name}</span>
                  {i === 0 && <span className="text-[12px] text-subtle">Premier exercice · montée en charge complète</span>}
                </span>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => promote(id)}
                    className="rounded-md px-2.5 py-1 text-[18px] leading-none text-subtle hover:bg-ink/[0.05] hover:text-ink"
                    title="Mettre en premier"
                    aria-label={`Faire de ${LIFTS_BY_ID[id].name} le premier exercice`}
                  >
                    ↑
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(id)}
                  className="rounded-md px-2 py-1 text-[20px] leading-none text-subtle hover:bg-ink/[0.05] hover:text-ink"
                  aria-label={`Retirer ${LIFTS_BY_ID[id].name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
        )}

        {picking ? (
          <div className="mt-4 rounded-xl border border-line-strong bg-card p-4">
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Squat, tractions, bench…"
                aria-label="Rechercher un exercice"
                className="w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 text-[16px] text-ink outline-none placeholder:text-subtle focus:border-ink"
              />
              <button type="button" onClick={() => setPicking(false)} className="shrink-0 px-2 text-[14px] font-semibold text-muted hover:text-ink">
                OK
              </button>
            </div>
            <div className="mt-4 flex max-h-[340px] flex-col gap-4 overflow-y-auto">
              {LIFT_GROUPS.map((g) => {
                const items = results.filter((l) => l.group === g);
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <p className="mb-2 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">{g}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => add(l.id)}
                          className="rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-[14px] font-medium text-ink hover:border-ink"
                        >
                          + {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {results.length === 0 && <p className="text-[14px] text-subtle">Aucun exercice trouvé.</p>}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="mt-4 w-full rounded-xl border-2 border-dashed border-line-strong px-4 py-3.5 text-[15px] font-semibold text-muted hover:border-ink hover:text-ink"
          >
            + {lifts.length ? "Ajouter un exercice" : "Choisir mes exercices"}
          </button>
        )}
      </section>

      {/* 2. PREMIÈRE SÉRIE */}
      {loaded && (
        <section className="mt-12">
          <SectionTitle n={2} hint="Facultatif">
            Première série
          </SectionTitle>
          <p className="mb-3 text-[14px] text-muted">
            Ta première série de travail au {first.name.toLowerCase()}
            {first.loading === "halteres" ? " (charge par haltère)" : ""}.
          </p>
          <div className="flex items-end gap-3">
            <label className="flex flex-1 items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
              <input
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder="—"
                aria-label="Charge de ta première série de travail, en kilos"
                className="w-full min-w-0 bg-transparent font-display text-[48px] font-extrabold leading-none text-ink outline-none tabular placeholder:text-faint"
              />
              <span className="font-display text-[22px] font-bold text-subtle">kg</span>
            </label>
            <span className="pb-3 font-display text-[30px] font-bold text-subtle">×</span>
            <label className="flex items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
              <select
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                aria-label="Répétitions de ta première série"
                className="appearance-none bg-transparent font-display text-[48px] font-extrabold leading-none text-ink outline-none tabular"
              >
                {REPS.map((r) => (
                  <option key={r} value={r} className="bg-card text-[16px]">
                    {r}
                  </option>
                ))}
              </select>
              <span className="ml-1 font-display text-[22px] font-bold text-subtle">reps</span>
            </label>
          </div>
          <p className="mt-3 text-[13px] text-subtle">Sans charge, tes séries d&apos;approche sont données en pourcentages.</p>
        </section>
      )}

      {/* 3. OPTIONS */}
      <section className="mt-12">
        <SectionTitle n={loaded ? 3 : 2}>Ça coince ?</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const on = pain.includes(z);
            return (
              <button
                key={z}
                type="button"
                aria-pressed={on}
                onClick={() => togglePain(z)}
                className={`rounded-full border-2 px-3.5 py-1.5 text-[14px] font-semibold transition-colors ${
                  on ? "border-warn bg-warn-bg text-warn-ink" : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {on ? "✕ " : ""}
                {PAIN_LABELS[z]}
              </button>
            );
          })}
        </div>
        <div className="mt-5 divide-y divide-line border-y border-line">
          <Toggle on={band} onChange={setBand} title="J'ai un élastique" hint="Sinon, versions sans matériel" />
          <Toggle on={short} onChange={setShort} title="Version courte" hint="Sans cardio, l'essentiel en 5 min" />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div className="mx-auto max-w-[560px]">
          <button
            type="button"
            onClick={submit}
            aria-disabled={!lifts.length}
            className={`flex w-full items-center justify-between rounded-xl px-6 py-4 transition-transform active:scale-[0.98] ${
              lifts.length ? "bg-accent text-on-accent" : "bg-ink/[0.07] text-subtle"
            }`}
          >
            <span className="font-display text-[22px] font-extrabold uppercase tracking-wide">
              {lifts.length ? "Construire l'échauffement" : "Choisis tes exercices"}
            </span>
            <span aria-hidden="true" className="font-display text-[24px] font-extrabold">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
