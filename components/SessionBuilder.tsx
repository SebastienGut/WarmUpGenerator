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

const label = "font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A5A60]";

function Toggle({ on, onChange, title, hint }: { on: boolean; onChange: (v: boolean) => void; title: string; hint: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-left"
    >
      <span className="flex flex-col">
        <span className="text-[14px] font-bold text-white">{title}</span>
        <span className="text-[12px] text-[#5A5A60]">{hint}</span>
      </span>
      <span className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${on ? "bg-[#A3FF12]" : "bg-white/10"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full transition-all ${on ? "left-5 bg-black" : "left-1 bg-white/60"}`} />
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
  const results = useMemo(() => searchLifts(query).filter((l) => !lifts.includes(l.id)), [query, lifts]);

  const add = (id: string) => {
    setLifts((ls) => (ls.includes(id) ? ls : [...ls, id]));
    setQuery("");
    setPicking(false);
  };
  const remove = (id: string) => setLifts((ls) => ls.filter((l) => l !== id));
  const promote = (id: string) => setLifts((ls) => [id, ...ls.filter((l) => l !== id)]);
  const togglePain = (z: BodyZone) => setPain((ps) => (ps.includes(z) ? ps.filter((p) => p !== z) : [...ps, z]));

  const submit = () => {
    if (!lifts.length) return;
    const kg = Number(weight.replace(",", "."));
    const q = serializeSession({
      lifts,
      workWeight: first?.loading !== "poids-du-corps" && kg > 0 ? kg : undefined,
      workReps: reps,
      pain,
      band,
      short,
    });
    saveSession({ query: q, label: sessionLabel(lifts) });
    router.push(`/plan?${q}`);
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[560px] flex-col bg-[#050505] px-4 pb-32 pt-6 sm:px-6">
      <header className="mb-8 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/25">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#A3FF12" aria-hidden="true">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">Warmup</span>
        <Link href="/series-approche" className="ml-auto text-[12px] font-medium text-[#A1A1A6] hover:text-[#A3FF12]">
          Séries d&apos;approche
        </Link>
      </header>

      <h1 className="font-sans text-[34px] font-black leading-[1] tracking-tight text-white sm:text-[40px]">
        Ton échauffement, <span className="text-[#A3FF12]">calé sur ta séance.</span>
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#A1A1A6]">
        Dis ce que tu fais aujourd&apos;hui. On prépare les articulations et les muscles que tes exercices
        sollicitent, puis on calcule tes séries d&apos;approche.
      </p>

      {saved.length > 0 && (
        <section className="mt-8">
          <p className={`${label} mb-3`}>Tes séances</p>
          <div className="flex flex-col gap-2">
            {saved.map((s) => (
              <div key={s.query} className="flex items-stretch overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E]">
                <Link href={`/plan?${s.query}`} className="flex flex-1 items-center justify-between gap-3 px-4 py-3 hover:bg-white/[0.02]">
                  <span className="truncate text-[14px] font-bold text-white">{s.label}</span>
                  <span className="shrink-0 font-mono text-[11px] font-bold text-[#A3FF12]">Relancer →</span>
                </Link>
                <button
                  type="button"
                  aria-label={`Oublier la séance ${s.label}`}
                  onClick={() => {
                    removeSession(s.query);
                    setSaved(loadSessions());
                  }}
                  className="border-l border-white/[0.06] px-3 text-[#5A5A60] hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 1. SÉANCE */}
      <section className="mt-8">
        <p className={`${label} mb-3`}>1 · Ta séance du jour</p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {SESSION_TEMPLATES.map((t) => {
            const active = t.lifts.join(",") === lifts.join(",");
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setLifts(t.lifts)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                  active ? "border-[#A3FF12] bg-[#A3FF12] text-black" : "border-white/[0.1] text-white hover:border-white/30"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {lifts.length > 0 && (
          <ol className="mt-4 flex flex-col gap-2">
            {lifts.map((id, i) => (
              <li key={id} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-3 py-2.5">
                <span className={`w-6 text-center font-mono text-[13px] font-black ${i === 0 ? "text-[#A3FF12]" : "text-[#5A5A60]"}`}>
                  {i + 1}
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-[15px] font-bold text-white">{LIFTS_BY_ID[id].name}</span>
                  {i === 0 && <span className="text-[11px] text-[#5A5A60]">Premier exercice · montée en charge complète</span>}
                </span>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => promote(id)}
                    className="rounded-lg px-2 py-1 text-[11px] font-bold text-[#5A5A60] hover:text-white"
                    aria-label={`Faire de ${LIFTS_BY_ID[id].name} le premier exercice`}
                  >
                    ↑ 1er
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(id)}
                  className="rounded-lg px-2 py-1 text-[16px] text-[#5A5A60] hover:text-white"
                  aria-label={`Retirer ${LIFTS_BY_ID[id].name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
        )}

        {picking ? (
          <div className="mt-3 rounded-xl border border-white/[0.1] bg-[#08080A] p-3">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher : squat, tractions, bench…"
              className="w-full rounded-lg border border-white/[0.08] bg-[#0C0C0E] px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-[#5A5A60] focus:border-[#A3FF12]"
            />
            <div className="mt-3 flex max-h-[320px] flex-col gap-3 overflow-y-auto">
              {LIFT_GROUPS.map((g) => {
                const items = results.filter((l) => l.group === g);
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <p className={`${label} mb-2`}>{g}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => add(l.id)}
                          className="rounded-full border border-white/[0.1] px-3 py-1.5 text-[13px] font-medium text-white hover:border-[#A3FF12] hover:text-[#A3FF12]"
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {results.length === 0 && <p className="text-[13px] text-[#5A5A60]">Aucun exercice trouvé.</p>}
            </div>
            <button type="button" onClick={() => setPicking(false)} className="mt-3 text-[12px] text-[#5A5A60] hover:text-white">
              Fermer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="mt-3 w-full rounded-xl border border-dashed border-white/[0.14] px-4 py-3 text-[14px] font-bold text-[#A1A1A6] hover:border-[#A3FF12]/60 hover:text-[#A3FF12]"
          >
            + {lifts.length ? "Ajouter un exercice" : "Choisir mes exercices"}
          </button>
        )}
      </section>

      {/* 2. PREMIÈRE SÉRIE */}
      {first && first.loading !== "poids-du-corps" && (
        <section className="mt-8">
          <p className={`${label} mb-3`}>2 · Ta 1ère série de {first.name.toLowerCase()}</p>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <label className="flex items-center rounded-xl border border-white/[0.08] bg-[#0C0C0E] focus-within:border-[#A3FF12]">
              <input
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder="Charge"
                aria-label="Charge de ta première série de travail, en kilos"
                className="w-full bg-transparent px-4 py-3 font-mono text-[18px] font-bold text-white outline-none placeholder:font-sans placeholder:text-[15px] placeholder:font-medium placeholder:text-[#5A5A60]"
              />
              <span className="pr-4 font-mono text-[13px] text-[#5A5A60]">{first.loading === "halteres" ? "kg / haltère" : "kg"}</span>
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0C0C0E] pr-3">
              <select
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                aria-label="Répétitions de ta première série"
                className="bg-transparent py-3 pl-4 font-mono text-[18px] font-bold text-white outline-none"
              >
                {REPS.map((r) => (
                  <option key={r} value={r} className="bg-[#0C0C0E]">
                    {r}
                  </option>
                ))}
              </select>
              <span className="font-mono text-[13px] text-[#5A5A60]">reps</span>
            </label>
          </div>
          <p className="mt-2 text-[12px] text-[#5A5A60]">Facultatif. Sans charge, tes séries d&apos;approche sont données en pourcentages.</p>
        </section>
      )}

      {/* 3. OPTIONS */}
      <section className="mt-8">
        <p className={`${label} mb-3`}>{first && first.loading !== "poids-du-corps" ? "3" : "2"} · Ça coince quelque part ?</p>
        <div className="flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const on = pain.includes(z);
            return (
              <button
                key={z}
                type="button"
                aria-pressed={on}
                onClick={() => togglePain(z)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors ${
                  on ? "border-[#FF8A3D] bg-[#FF8A3D]/15 text-[#FFB27A]" : "border-white/[0.1] text-[#A1A1A6] hover:border-white/30"
                }`}
              >
                {PAIN_LABELS[z]}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Toggle on={band} onChange={setBand} title="J'ai un élastique" hint="Sinon, on te donne les versions sans matériel" />
          <Toggle on={short} onChange={setShort} title="Version courte" hint="Sans cardio, 2 mobilités et 1 activation" />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.06] bg-[#050505]/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div className="mx-auto max-w-[560px]">
          <button
            type="button"
            onClick={submit}
            disabled={!lifts.length}
            className={`flex w-full items-center justify-between rounded-2xl px-6 py-4 transition-transform active:scale-[0.98] ${
              lifts.length ? "bg-[#A3FF12] text-black" : "bg-white/[0.08] text-[#5A5A60]"
            }`}
          >
            <span className="font-sans text-[17px] font-black tracking-tight">
              {lifts.length ? "Construire mon échauffement" : "Choisis tes exercices"}
            </span>
            <span aria-hidden="true" className="font-mono text-[18px] font-black">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
