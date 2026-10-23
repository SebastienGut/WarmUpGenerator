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
      <header className="mb-10 flex items-baseline justify-between sm:mb-14">
        <span className="font-display text-[22px] font-extrabold leading-none tracking-tight text-ink">Warmup</span>
        <Link href="/series-approche" className="text-[14px] font-medium text-muted hover:text-ink">
          Séries d&apos;approche
        </Link>
      </header>

      {/* Le mot-clé principal ouvre le H1 ; la question reste le message visible. */}
      <h1 className="text-ink">
        <span className="block text-[15px] font-semibold text-subtle">Échauffement musculation</span>
        <span className="mt-1 block font-display text-[40px] font-extrabold leading-[0.95] tracking-tight sm:text-[60px]">Tu entraînes quoi&nbsp;?</span>
      </h1>
      <p className="mt-3 max-w-[34ch] text-[16px] text-muted">Touche ta séance, ton échauffement de 6 minutes est prêt.</p>

      {saved.length > 0 && (
        <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {saved.map((s) => (
            <span key={s.query} className="flex shrink-0 items-center rounded-full bg-ink/[0.06]">
              <Link href={`/plan?${s.query}`} className="flex items-center gap-2 py-2 pl-4 pr-2 text-[14px] font-semibold text-ink">
                <span aria-hidden="true" className="text-subtle">↻</span>
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

      {/* Les séances types : de grandes lignes à toucher du pouce, pas une grille de cartes. */}
      <section aria-label="Séances types" className="mt-7 border-t border-line lg:grid lg:grid-cols-3 lg:gap-x-8">
        {SESSION_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.zones)}
            className="group flex w-full items-center gap-4 border-b border-line py-2 text-left transition-colors active:bg-ink/[0.04]"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[28px] font-extrabold leading-none tracking-tight text-ink transition-transform duration-200 group-hover:translate-x-1 sm:text-[32px] lg:text-[26px]">
                {t.label}
              </span>
              <span className="mt-1.5 block truncate text-[13px] text-subtle">{t.hint}</span>
            </span>
            <ExerciseFigure id={t.cover} label={LIFTS_BY_ID[t.cover].name} animate={false} className="h-[72px] w-[84px] shrink-0" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="group flex w-full items-center gap-4 border-b border-line py-5 text-left transition-colors active:bg-ink/[0.04]"
        >
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[28px] font-extrabold leading-none tracking-tight text-subtle transition-colors group-hover:text-ink sm:text-[32px] lg:text-[26px]">
              Mes zones
            </span>
            <span className="mt-1.5 block text-[13px] text-subtle">Choisis exactement ce que tu travailles</span>
          </span>
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-[22px] text-ink">
            +
          </span>
        </button>
      </section>

      {/* Second outil, distinct : la montée en charge sur un exercice précis. */}
      <Link
        href="/series-approche"
        className="mt-12 flex items-center gap-5 rounded-3xl bg-ink px-6 py-6 text-paper transition-transform active:scale-[0.99] sm:px-8"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold text-paper/70">L&apos;autre outil</span>
          <span className="mt-1 block font-display text-[26px] font-extrabold leading-none tracking-tight">Séries d&apos;approche</span>
          <span className="mt-2 block max-w-[40ch] text-[14px] text-paper/80">Ta charge de travail du jour, et la montée en charge disque par disque pour y arriver.</span>
        </span>
        <span className="shrink-0" aria-hidden="true">
          <Plates plates={[25, 20, 5, 2.5]} size={52} showLabel={false} />
        </span>
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
            <span className="font-display text-[19px] font-extrabold tracking-tight">{zones.length ? "Voir mon échauffement" : "Touche tes zones"}</span>
            {zones.length > 0 && <span className="truncate pl-3 text-[13px] font-semibold">{zonesLabel(zones)}</span>}
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
                  on ? "border-ink bg-card" : "border-transparent bg-ink/[0.045] hover:border-line-strong"
                }`}
              >
                <ExerciseFigure id={cover} label={MUSCLE_LABELS[z]} animate={on} className="h-14 w-16 shrink-0" />
                <span className="min-w-0 flex-1 truncate font-display text-[16px] font-extrabold leading-none tracking-tight text-ink">{MUSCLE_LABELS[z]}</span>
                {on && <span aria-hidden="true" className="text-[16px] font-bold text-ink">✓</span>}
              </button>
            );
          })}
        </div>
      </Sheet>
    </main>
  );
}
