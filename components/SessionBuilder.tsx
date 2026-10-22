"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExerciseFigure from "@/components/ExerciseFigure";
import Plates from "@/components/Plates";
import Sheet from "@/components/Sheet";
import { LIFTS_BY_ID, SESSION_TEMPLATES, ZONE_LIFTS, ZONE_ORDER, zonesLabel } from "@/lib/lifts";
import { serializeSession } from "@/lib/session-engine";
import { loadSessions, removeSession, saveSession, type SavedSession } from "@/lib/saved-sessions";
import { MUSCLE_LABELS, type MuscleGroup } from "@/lib/warmup-data";

/** Variante du jour : le même tap redonne un plan un peu différent d'un jour à
 * l'autre, sans jamais changer au sein d'une même journée. */
const dayVariant = () => Math.floor(Date.now() / 86_400_000) % 997;

export default function SessionBuilder() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedSession[]>([]);
  const [picking, setPicking] = useState(false);
  const [zones, setZones] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    // Échauffements récents : stockés sur l'appareil, donc lus après hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(loadSessions());
  }, []);

  const go = (z: MuscleGroup[]) => {
    const q = serializeSession({ zones: z, lifts: [], pain: [], band: false, short: false, variant: dayVariant() });
    saveSession({ query: q, label: zonesLabel(z) });
    router.push(`/plan?${q}`);
  };
  const toggle = (z: MuscleGroup) => setZones((s) => (s.includes(z) ? s.filter((x) => x !== z) : [...s, z]));

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

      {/* Le mot-clé principal ouvre le H1 ; la question reste le message visible. */}
      <h1 className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-ink">
        <span className="mb-2 block text-[17px] tracking-wide text-subtle sm:text-[20px]">Échauffement musculation</span>
        <span className="block text-[42px] sm:text-[64px]">
          Tu entraînes <span className="text-accent">quoi&nbsp;?</span>
        </span>
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
            onClick={() => go(t.zones)}
            style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
            className="anim-rise group flex flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition-[border-color,transform] duration-150 hover:border-ink active:scale-[0.97]"
          >
            <ExerciseFigure id={t.cover} label={LIFTS_BY_ID[t.cover].name} className="aspect-[12/10] w-full bg-ink/[0.025]" />
            <span className="flex flex-col gap-1 px-4 pb-4 pt-3">
              <span className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink sm:text-[24px] lg:text-[20px]">{t.label}</span>
              <span className="truncate text-[12px] text-subtle">{t.hint}</span>
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
          <span className="block font-display text-[20px] font-extrabold uppercase leading-none tracking-tight text-ink">Mes zones</span>
          <span className="mt-1 block text-[13px] text-subtle">Choisis précisément ce que tu travailles</span>
        </span>
        <span aria-hidden="true" className="font-display text-[26px] font-extrabold text-ink">+</span>
      </button>

      {/* Second outil, distinct : la montée en charge sur un exercice précis. */}
      <Link
        href="/series-approche"
        className="mt-10 flex items-center gap-4 rounded-2xl bg-ink px-5 py-5 text-paper transition-transform active:scale-[0.99] sm:px-7"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[13px] font-bold uppercase tracking-wide text-paper/70">Deuxième outil</span>
          <span className="mt-1 block font-display text-[26px] font-extrabold uppercase leading-none tracking-tight">Séries d&apos;approche</span>
          <span className="mt-2 block text-[14px] text-paper/80">Ta charge de travail du jour → ta montée en charge, disques compris.</span>
        </span>
        <span className="hidden shrink-0 sm:block" aria-hidden="true">
          <Plates plates={[25, 20, 5, 2.5]} size={56} showLabel={false} />
        </span>
        <span aria-hidden="true" className="font-display text-[26px] font-extrabold">→</span>
      </Link>

      <Sheet
        open={picking}
        onClose={() => setPicking(false)}
        title="Mes zones"
        footer={
          <button
            type="button"
            onClick={() => zones.length && go(zones)}
            aria-disabled={!zones.length}
            className={`flex w-full items-center justify-between rounded-xl px-5 py-4 transition-transform active:scale-[0.98] ${
              zones.length ? "bg-accent text-on-accent" : "bg-ink/[0.07] text-subtle"
            }`}
          >
            <span className="font-display text-[20px] font-extrabold uppercase tracking-wide">
              {zones.length ? `Échauffer · ${zonesLabel(zones)}` : "Touche tes zones"}
            </span>
            <span aria-hidden="true" className="font-display text-[22px] font-extrabold">→</span>
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ZONE_ORDER.map((z) => {
            const on = zones.includes(z);
            const cover = ZONE_LIFTS[z][0];
            return (
              <button
                key={z}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(z)}
                className={`flex items-center gap-2 overflow-hidden rounded-xl border-2 pr-3 text-left transition-colors ${
                  on ? "border-accent bg-accent/[0.06]" : "border-line bg-card hover:border-line-strong"
                }`}
              >
                <ExerciseFigure id={cover} label={MUSCLE_LABELS[z]} animate={on} className="h-14 w-16 shrink-0" />
                <span className="flex-1 font-display text-[18px] font-extrabold uppercase leading-none tracking-tight text-ink">{MUSCLE_LABELS[z]}</span>
                {on && <span aria-hidden="true" className="font-display text-[18px] font-extrabold text-accent">✓</span>}
              </button>
            );
          })}
        </div>
      </Sheet>
    </main>
  );
}
