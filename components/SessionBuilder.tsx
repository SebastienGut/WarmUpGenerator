"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExerciseFigure from "@/components/ExerciseFigure";
import Sheet from "@/components/Sheet";
import { LIFTS_BY_ID, LIFT_GROUPS, SESSION_TEMPLATES, searchLifts, sessionLabel } from "@/lib/lifts";
import { serializeSession } from "@/lib/session-engine";
import { loadSessions, removeSession, saveSession, type SavedSession } from "@/lib/saved-sessions";

/** Variante du jour : le même tap redonne un plan un peu différent d'un jour à
 * l'autre, sans jamais changer au sein d'une même journée. */
const dayVariant = () => Math.floor(Date.now() / 86_400_000) % 997;

export default function SessionBuilder() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedSession[]>([]);
  const [picking, setPicking] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Séances récentes : stockées sur l'appareil, donc lues après hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(loadSessions());
  }, []);

  const results = useMemo(() => searchLifts(query), [query]);

  const go = (lifts: string[]) => {
    const q = serializeSession({ lifts, workReps: 8, pain: [], band: false, short: false, variant: dayVariant() });
    saveSession({ query: q, label: sessionLabel(lifts) });
    router.push(`/plan?${q}`);
  };
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <main className="mx-auto w-full max-w-[1080px] px-5 pb-16 pt-5 sm:px-8">
      <header className="mb-8 flex items-baseline justify-between sm:mb-12">
        <span className="font-display text-[24px] font-extrabold uppercase leading-none tracking-tight text-ink">
          Warmup<span className="text-accent">.</span>
        </span>
        <Link href="/series-approche" className="text-[14px] font-medium text-muted hover:text-ink">
          Séries d&apos;approche
        </Link>
      </header>

      <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-[64px]">
        Tu entraînes <span className="text-accent">quoi&nbsp;?</span>
      </h1>
      <p className="mt-3 text-[16px] text-muted">Un tap, ton échauffement est prêt.</p>

      {saved.length > 0 && (
        <div className="-mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {saved.map((s) => (
            <span key={s.query} className="flex shrink-0 items-center rounded-full border border-line-strong bg-card">
              <Link href={`/plan?${s.query}`} className="flex items-center gap-2 py-2 pl-4 pr-2 text-[14px] font-semibold text-ink">
                <span aria-hidden="true" className="text-accent-ink">↻</span>
                {s.label}
              </Link>
              <button
                type="button"
                onClick={() => {
                  removeSession(s.query);
                  setSaved(loadSessions());
                }}
                aria-label={`Oublier ${s.label}`}
                className="py-2 pl-1 pr-3 text-[16px] leading-none text-subtle hover:text-ink"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <section aria-label="Séances types" className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {SESSION_TEMPLATES.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.lifts)}
            style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
            className="anim-rise group flex flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition-[border-color,transform] duration-150 hover:border-ink active:scale-[0.97]"
          >
            <ExerciseFigure id={t.cover} label={LIFTS_BY_ID[t.cover].name} className="aspect-[12/10] w-full bg-ink/[0.025]" />
            <span className="flex flex-col gap-1 px-4 pb-4 pt-3">
              <span className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink sm:text-[24px] lg:text-[20px]">{t.label}</span>
              <span className="truncate text-[12px] text-subtle">{t.lifts.map((id) => LIFTS_BY_ID[id].name).join(" · ")}</span>
            </span>
          </button>
        ))}
      </section>

      <button
        type="button"
        onClick={() => setPicking(true)}
        className="mt-4 flex w-full items-center justify-between rounded-2xl border-2 border-dashed border-line-strong px-5 py-4 text-left transition-colors hover:border-ink"
      >
        <span>
          <span className="block font-display text-[20px] font-extrabold uppercase leading-none tracking-tight text-ink">Ma séance à moi</span>
          <span className="mt-1 block text-[13px] text-subtle">Choisis tes exercices parmi {Object.keys(LIFTS_BY_ID).length}</span>
        </span>
        <span aria-hidden="true" className="font-display text-[26px] font-extrabold text-ink">+</span>
      </button>

      <Sheet
        open={picking}
        onClose={() => setPicking(false)}
        title="Ta séance"
        tall
        footer={
          <button
            type="button"
            onClick={() => selected.length && go(selected)}
            aria-disabled={!selected.length}
            className={`flex w-full items-center justify-between rounded-xl px-5 py-4 transition-transform active:scale-[0.98] ${
              selected.length ? "bg-accent text-on-accent" : "bg-ink/[0.07] text-subtle"
            }`}
          >
            <span className="font-display text-[20px] font-extrabold uppercase tracking-wide">
              {selected.length ? `Échauffer · ${selected.length} exo${selected.length > 1 ? "s" : ""}` : "Touche tes exercices"}
            </span>
            <span aria-hidden="true" className="font-display text-[22px] font-extrabold">→</span>
          </button>
        }
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : squat, bench, tractions…"
          aria-label="Rechercher un exercice"
          className="mb-4 w-full rounded-xl border border-line-strong bg-card px-4 py-3 text-[16px] text-ink outline-none placeholder:text-subtle focus:border-ink"
        />
        {selected.length > 0 && <p className="mb-3 text-[13px] text-subtle">Le premier choisi reçoit la montée en charge complète.</p>}
        {LIFT_GROUPS.map((g) => {
          const items = results.filter((l) => l.group === g);
          if (!items.length) return null;
          return (
            <div key={g} className="mb-5">
              <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">{g}</p>
              <div className="grid grid-cols-3 gap-2">
                {items.map((l) => {
                  const order = selected.indexOf(l.id);
                  const on = order >= 0;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(l.id)}
                      className={`relative flex flex-col overflow-hidden rounded-xl border-2 text-left transition-colors ${
                        on ? "border-accent bg-accent/[0.06]" : "border-line bg-card hover:border-line-strong"
                      }`}
                    >
                      <ExerciseFigure id={l.id} label={l.name} animate={on} className="aspect-[12/10] w-full" />
                      <span className="px-2 pb-2 text-[12px] font-semibold leading-tight text-ink">{l.name}</span>
                      {on && (
                        <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent font-display text-[14px] font-extrabold text-on-accent">
                          {order + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {results.length === 0 && <p className="text-[14px] text-subtle">Aucun exercice trouvé.</p>}
      </Sheet>
    </main>
  );
}
