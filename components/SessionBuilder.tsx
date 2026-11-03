"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { FigureStill } from "@/components/ExerciseFigure";
import Sheet from "@/components/Sheet";
import { SESSION_TEMPLATES, zonesLabel } from "@/lib/lifts";
import { REHAB_ZONES } from "@/lib/rehab";
import { buildSessionPlan, parseSession, serializeSession } from "@/lib/session-engine";
import { loadEquipment } from "@/lib/equipment-pref";
import { compositionOf, loadSessions, removeSession, saveSession, type SavedSession } from "@/lib/saved-sessions";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

// Habillage des cartes de séance : démonstration détourée posée sur l'aplat
// (public/demos/accueil, scripts/assets/build-covers.mjs), validée par Seb le 3 nov. 2026 ;
// l'ancien pictogramme reste disponible ("picto").
export type CardCovers = "picto" | "photo";

export default function SessionBuilder({ covers = "photo" }: { covers?: CardCovers }) {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedSession[]>([]);
  const [picking, setPicking] = useState(false);
  const [pains, setPains] = useState<BodyZone[]>([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Échauffements récents : stockés sur l'appareil, donc lus après hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(loadSessions());
  }, []);

  // Routine stable : la même séance redonne le même plan. Si elle a déjà été
  // faite sur cet appareil, on rouvre sa dernière version (réglages compris) ;
  // la variation reste un choix (↻ Varier sur le plan).
  // Le matériel est un réglage de l'appareil : il prime sur celui de la séance rouverte.
  const go = (z: MuscleGroup[], template?: string, label = zonesLabel(z)) => {
    const equipment = loadEquipment();
    const fresh = serializeSession({ zones: z, template, lifts: [], pain: [], band: false, equipment, short: false, variant: 0 });
    const prev = loadSessions().find((s) => compositionOf(s.query) === compositionOf(fresh))?.query;
    const q = prev ? serializeSession({ ...parseSession(Object.fromEntries(new URLSearchParams(prev))), equipment }) : fresh;
    saveSession({ query: q, label });
    router.push(`/plan?${q}`);
  };
  const toggle = (z: BodyZone) => setPains((s) => (s.includes(z) ? s.filter((x) => x !== z) : [...s, z]));
  const canCare = pains.length > 0 && agreed;

  // Pictogramme de chaque carte : l'exercice phare de la séance, figé à l'instant
  // où il se reconnaît le mieux (squat en bas, traction en haut…).
  const COVER: Record<string, { id: string; k: number }> = {
    push: { id: "developpe-couche", k: 0 },
    pull: { id: "tractions", k: 1 },
    legs: { id: "squat", k: 1 },
    haut: { id: "developpe-militaire", k: 1 },
    full: { id: "souleve-de-terre", k: 0.45 },
  };
  // « Bas du corps » doublonnait « Jambes » sur l'accueil : la séance reste servie
  // par sa page /echauffement/bas-du-corps et par ses anciens liens.
  const templates = SESSION_TEMPLATES.filter((t) => t.id !== "bas");

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
      <section className="relative overflow-hidden bg-blue px-5 pb-6 pt-4 text-white sm:px-8 sm:pb-12 sm:pt-5">
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full border-[34px] border-white/[0.12]" />
        <div className="relative mx-auto max-w-[1080px]">
          <header className="mb-4 flex items-center justify-between sm:mb-10">
            <Logo />
            <Link href="/series-approche" className="text-[14px] font-semibold text-white hover:underline">
              Séries d&apos;approche
            </Link>
          </header>
          <h1 className="poster font-display text-[54px] leading-[1.04] sm:text-[96px]">
            Tu entraînes
            <br />
            quoi&nbsp;?
          </h1>
          <p className="mt-3 max-w-[34rem] text-balance text-white sm:mt-4">
            <strong className="block text-[17px] font-bold leading-snug sm:text-[22px]">La longévité du sportif commence ici.</strong>
            <span className="mt-0.5 block text-[15px] sm:mt-1 sm:text-[16px]">Choisis ta séance, obtiens ton échauffement sur mesure.</span>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-3 sm:px-8">
        <section aria-label="Séances types" className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {templates.map((t) => {
            const c = CARD[t.id] ?? CARD.full;
            const minutes = buildSessionPlan({ zones: t.zones, template: t.id, lifts: [], pain: [], band: false, short: false, variant: 0 }).minutes;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.zones, t.id, t.label)}
                className={`relative flex min-h-[124px] flex-col justify-between overflow-hidden rounded-2xl p-3.5 text-left transition-transform active:scale-[0.97] sm:min-h-[160px] ${c.bg} ${c.fg}`}
              >
                <span className="text-[12px] font-bold">{minutes} min</span>
                {covers === "photo" ? (
                  // eslint-disable-next-line @next/next/no-img-element -- vignette statique déjà optimisée
                  <img src={`/demos/accueil/${t.id}.webp`} alt="" width={360} height={360} className={`pointer-events-none absolute right-2 top-2 w-[64%] object-contain object-right-top ${t.id === "full" ? "h-[60px] sm:h-[84px]" : "h-[70px] sm:h-[92px]"}`} />
                ) : (
                  <span style={c.vars as React.CSSProperties} className="absolute right-1 top-2 opacity-90">
                    <FigureStill id={COVER[t.id]?.id ?? t.cover} k={COVER[t.id]?.k ?? 0} className="h-[64px] w-[74px]" />
                  </span>
                )}
                <span className="relative">
                  <span className="poster font-display text-[28px] leading-[0.95] sm:text-[34px]">{t.label}</span>
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="relative flex min-h-[124px] flex-col justify-end overflow-hidden rounded-2xl border-2 border-dashed border-line-strong p-3.5 text-left text-ink transition-transform active:scale-[0.97] sm:min-h-[160px]"
          >
            {covers === "photo" && (
              // Titre sur deux lignes : la figure (debout, étroite) prend la colonne de droite.
              // eslint-disable-next-line @next/next/no-img-element -- vignette statique déjà optimisée
              <img src="/demos/accueil/douleur.webp" alt="" width={360} height={360} className="pointer-events-none absolute bottom-2 right-1 top-2 w-[21%] object-contain object-right-top" />
            )}
            <span className="relative poster font-display text-[28px] leading-[0.95] sm:text-[34px]">Une douleur&nbsp;?</span>
          </button>
        </section>

        {saved.length > 0 && (
          <div className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
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

        {/* Second outil, distinct : la montée en charge sur un exercice précis. */}
        <Link
          href="/series-approche"
          className="mt-6 flex items-end gap-5 overflow-hidden rounded-3xl bg-black px-5 pb-5 pt-5 text-white transition-transform active:scale-[0.99] sm:px-8"
        >
          <span className="min-w-0 flex-1">
            <span className="poster block font-display text-[28px] leading-none sm:text-[32px]">Séries d&apos;approche</span>
            <span className="mt-2 block max-w-[34ch] text-[14px] leading-snug text-white">
              Ta charge du jour, et les paliers pour y arriver, disques compris.
            </span>
          </span>
          {/* La montée en escalier : paliers qui grandissent jusqu'à la série de travail (rouge). */}
          <span aria-hidden="true" className="flex shrink-0 items-end gap-1">
            {[18, 28, 38, 48, 62].map((h, i, a) => (
              <span key={h} className={`w-3 rounded-t-[3px] ${i === a.length - 1 ? "bg-accent" : "bg-white"}`} style={{ height: h }} />
            ))}
          </span>
        </Link>
      </div>

      <Sheet
        open={picking}
        onClose={() => setPicking(false)}
        title="Une douleur ?"
        footer={
          <button
            type="button"
            onClick={() => canCare && router.push(`/routine-douleur?z=${pains.join(",")}`)}
            aria-disabled={!canCare}
            className={`flex w-full items-center justify-between rounded-full px-6 py-4 transition-transform active:scale-[0.98] ${
              canCare ? "bg-black text-white" : "bg-ink/[0.07] text-subtle"
            }`}
          >
            <span className="font-display text-[20px] leading-none">{!pains.length ? "Touche la zone qui gêne" : agreed ? "Voir ma routine" : "Coche la règle des 3 sur 10"}</span>
          </button>
        }
      >
        <p className="mb-4 text-[15px] leading-relaxed text-muted">
          Une routine plus longue et plus douce que l&apos;échauffement : mobilité lente et renforcement léger autour de
          l&apos;articulation qui gêne.
        </p>
        <div className="flex flex-wrap gap-2">
          {REHAB_ZONES.map((z) => {
            const on = pains.includes(z.id);
            return (
              <button
                key={z.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(z.id)}
                className={`rounded-full border-2 px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                  on ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink"
                }`}
              >
                {z.label}
              </button>
            );
          })}
        </div>
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-warn-bg p-4 text-warn-ink">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-black" />
          <span className="text-[14px] leading-relaxed">
            <strong className="block font-bold">Ma douleur reste sous 3 sur 10.</strong>
            Si elle monte, je réduis l&apos;amplitude.
          </span>
        </label>
      </Sheet>
    </main>
  );
}
