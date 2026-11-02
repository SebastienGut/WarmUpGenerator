"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExerciseFigure from "@/components/ExerciseFigure";
import Plates from "@/components/Plates";
import Sheet from "@/components/Sheet";
import { LIFTS_BY_ID, SESSION_TEMPLATES, ZONE_LIFTS, ZONE_ORDER, zonesLabel } from "@/lib/lifts";
import { buildSessionPlan, serializeSession } from "@/lib/session-engine";
import { compositionOf, loadSessions, removeSession, saveSession, type SavedSession } from "@/lib/saved-sessions";
import { MUSCLE_LABELS, type MuscleGroup } from "@/lib/warmup-data";

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

  // Routine stable : la même séance redonne le même plan. Si elle a déjà été
  // faite sur cet appareil, on rouvre sa dernière version (réglages compris) ;
  // la variation reste un choix (↻ Varier sur le plan).
  const go = (z: MuscleGroup[]) => {
    const fresh = serializeSession({ zones: z, lifts: [], pain: [], band: false, short: false, variant: 0 });
    const q = loadSessions().find((s) => compositionOf(s.query) === compositionOf(fresh))?.query ?? fresh;
    saveSession({ query: q, label: zonesLabel(z) });
    router.push(`/plan?${q}`);
  };
  const toggle = (z: MuscleGroup) => setZones((s) => (s.includes(z) ? s.filter((x) => x !== z) : [...s, z]));

  // Couleur de chaque séance type : un aplat de disque par carte, texte lisible dessus.
  const CARD: Record<string, { bg: string; fg: string; vars: Record<string, string> }> = {
    push: { bg: "bg-accent", fg: "text-white", vars: { "--ink": "#fff", "--accent": "#141414", "--faint": "rgba(255,255,255,.45)", "--line": "rgba(255,255,255,.3)", "--subtle": "#fff" } },
    pull: { bg: "bg-blue", fg: "text-white", vars: { "--ink": "#fff", "--accent": "#141414", "--faint": "rgba(255,255,255,.45)", "--line": "rgba(255,255,255,.3)", "--subtle": "#fff" } },
    legs: { bg: "bg-green", fg: "text-white", vars: { "--ink": "#fff", "--accent": "#141414", "--faint": "rgba(255,255,255,.45)", "--line": "rgba(255,255,255,.3)", "--subtle": "#fff" } },
    haut: { bg: "bg-yellow", fg: "text-[#141414]", vars: { "--ink": "#141414", "--accent": "#c8202a", "--faint": "rgba(0,0,0,.25)", "--line": "rgba(0,0,0,.2)", "--subtle": "#141414" } },
    bas: { bg: "bg-black", fg: "text-white", vars: { "--ink": "#fff", "--accent": "#e8b417", "--faint": "rgba(255,255,255,.4)", "--line": "rgba(255,255,255,.25)", "--subtle": "#fff" } },
    full: { bg: "bg-card ring-2 ring-inset ring-ink", fg: "text-ink", vars: {} },
  };

  return (
    <main className="w-full pb-16">
      {/* Bandeau d'affiche : la question, en grand. */}
      <section className="relative overflow-hidden bg-blue px-5 pb-9 pt-5 text-white sm:px-8 sm:pb-12">
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full border-[34px] border-white/[0.12]" />
        <div className="relative mx-auto max-w-[1080px]">
          <header className="mb-9 flex items-baseline justify-between sm:mb-12">
            <span className="font-display text-[24px] leading-none">Warmup</span>
            <Link href="/series-approche" className="text-[14px] font-semibold text-white/90 hover:text-white">
              Séries d&apos;approche
            </Link>
          </header>
          <h1>
            <span className="block text-[13px] font-bold tracking-[0.08em] text-white/85">ÉCHAUFFEMENT MUSCULATION</span>
            <span className="poster mt-2 font-display text-[64px] leading-[0.92] sm:text-[96px]">
              Tu entraînes
              <br />
              quoi&nbsp;?
            </span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-[16px] text-white/90">Touche ta séance, ton échauffement est prêt.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-3 sm:px-8">
        {saved.length > 0 && (
          <div className="-mx-3 mt-4 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {saved.map((s) => (
              <span key={s.query} className="flex shrink-0 items-center rounded-full bg-ink/[0.07]">
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

        <section aria-label="Séances types" className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {SESSION_TEMPLATES.map((t) => {
            const c = CARD[t.id] ?? CARD.full;
            const minutes = buildSessionPlan({ zones: t.zones, lifts: [], pain: [], band: false, short: false, variant: 0 }).minutes;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.zones)}
                className={`relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl p-3.5 text-left transition-transform active:scale-[0.97] sm:min-h-[150px] ${c.bg} ${c.fg}`}
              >
                <span className="text-[12px] font-bold opacity-90">{minutes} min</span>
                <span style={c.vars as React.CSSProperties} className="absolute right-1 top-2 opacity-90">
                  <ExerciseFigure id={t.cover} label={LIFTS_BY_ID[t.cover].name} animate={false} className="h-[64px] w-[74px]" />
                </span>
                <span className="relative">
                  <span className="poster font-display text-[30px] leading-[0.95] sm:text-[34px]">{t.label}</span>
                  <span className="mt-1 block truncate text-[12px] font-medium opacity-85">{t.hint}</span>
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="flex min-h-[132px] flex-col justify-between rounded-2xl border-2 border-dashed border-line-strong p-3.5 text-left text-ink transition-transform active:scale-[0.97] sm:min-h-[150px]"
          >
            <span className="text-[12px] font-bold text-subtle">Au choix</span>
            <span>
              <span className="poster font-display text-[30px] leading-[0.95] sm:text-[34px]">Mes zones +</span>
              <span className="mt-1 block text-[12px] font-medium text-subtle">Choisis exactement ce que tu travailles</span>
            </span>
          </button>
        </section>

        {/* Second outil, distinct : la montée en charge sur un exercice précis. */}
        <Link
          href="/series-approche"
          className="mt-8 flex items-center gap-5 rounded-3xl bg-black px-6 py-6 text-white transition-transform active:scale-[0.99] sm:px-8"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-bold tracking-[0.08em] text-white/70">L&apos;AUTRE OUTIL</span>
            <span className="poster mt-1 font-display text-[30px] leading-none">Séries d&apos;approche</span>
            <span className="mt-2 block max-w-[40ch] text-[14px] text-white/80">Ta charge de travail du jour, et la montée en charge disque par disque pour y arriver.</span>
          </span>
          <span className="shrink-0" aria-hidden="true">
            <Plates plates={[25, 20, 5, 2.5]} size={52} showLabel={false} />
          </span>
        </Link>
      </div>

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
