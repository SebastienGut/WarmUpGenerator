"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chip, EquipmentPicker, PhaseMark, StepRow, Timeline, fmtMin, phaseSeconds } from "@/components/PlanParts";
import { EQUIPMENT_LABELS } from "@/lib/bank";
import { saveEquipment } from "@/lib/equipment-pref";
import GuidedMode from "@/components/GuidedMode";
import { REHAB_ZONES } from "@/lib/rehab";
import { saveSession } from "@/lib/saved-sessions";
import {
  PAIN_LABELS,
  buildSessionPlan,
  parseSession,
  serializeSession,
  type SessionInput,
} from "@/lib/session-engine";

function PlanContent({ initial }: { initial: SessionInput }) {
  const router = useRouter();
  const [input, setInput] = useState(initial);
  const [guided, setGuided] = useState(false);
  const [copied, setCopied] = useState(false);
  const plan = useMemo(() => buildSessionPlan(input), [input]);
  const label = plan.title;

  // Chaque réglage réécrit l'URL (partage, retour arrière) et la séance récente.
  const update = useCallback(
    (patch: Partial<SessionInput>) => {
      const next = { ...input, ...patch };
      const q = serializeSession(next);
      setInput(next);
      router.replace(`/plan?${q}`, { scroll: false });
      saveSession({ query: q, label: buildSessionPlan(next).title });
    },
    [input, router],
  );

  useEffect(() => {
    document.title = `Échauffement ${label} · Warmup`;
  }, [label]);

  async function share() {
    try {
      if (navigator.share) return await navigator.share({ title: `Échauffement ${label}`, url: window.location.href });
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // partage annulé
    }
  }

  const steps = plan.phases.reduce((n, p) => n + p.steps.length, 0);
  const startButton = (
    <button
      type="button"
      onClick={() => setGuided(true)}
      className="flex w-full items-center justify-between rounded-full bg-black px-7 py-4 text-white transition-transform active:scale-[0.98]"
    >
      <span className="font-display text-[26px] leading-none">C&apos;est parti</span>
      <span className="flex items-center gap-3">
        <span className="font-display text-[20px] leading-none tabular">{plan.minutes} min</span>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
          <path d="M0 0 L14 8 L0 16 Z" />
        </svg>
      </span>
    </button>
  );

  return (
    <>
    {/* Bandeau d'affiche : la séance, en grand, avec l'essentiel. */}
    <header className="bg-accent px-5 pb-7 pt-3 text-white sm:px-8">
      <div className="mx-auto max-w-[1080px]">
        <nav className="flex items-center justify-between">
          <Link href="/" aria-label="Autre séance" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-[22px] hover:bg-white/15">
            ←
          </Link>
          <button type="button" onClick={share} className="rounded-full px-3 py-2 text-[14px] font-semibold text-white/90 hover:bg-white/15 hover:text-white">
            {copied ? "Lien copié" : "Partager"}
          </button>
        </nav>
        <p className="mt-2 text-[12px] font-bold tracking-[0.08em] text-white">TON ÉCHAUFFEMENT</p>
        <h1 className="poster mt-1 font-display text-[54px] leading-[0.92] sm:text-[72px]">{label}</h1>
        <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-bold">
          <span className="rounded-full bg-white/[0.18] px-3 py-1.5 tabular">{plan.minutes} min</span>
          <span className="rounded-full bg-white/[0.18] px-3 py-1.5 tabular">{steps} exercices</span>
          <span className="rounded-full bg-white/[0.18] px-3 py-1.5">{EQUIPMENT_LABELS[plan.equipment]}</span>
        </div>
      </div>
    </header>
    <main className="mx-auto w-full max-w-[1080px] px-5 pb-32 pt-2 sm:px-8 lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 lg:pb-16">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <Timeline phases={plan.phases} />

        {/* Réglages utiles en salle : le matériel disponible, et une autre version. */}
        <div className="mt-5 flex flex-col items-start gap-3">
          <div className="w-full">
            <EquipmentPicker
              value={plan.equipment}
              onChange={(v) => {
                saveEquipment(v);
                update({ equipment: v, band: v === "band" });
              }}
            />
          </div>
          <Chip onClick={() => update({ variant: ((input.variant ?? 0) + 1) % 997 })}>↻ Varier</Chip>
        </div>

        {/* Zone sensible : ajoute un ou deux exercices doux à la préparation (pas une séance de soin). */}
        <div className="mt-5">
          <p className="mb-2 text-[13px] font-semibold text-subtle">Une zone sensible à préparer en plus ?</p>
          <div className="flex flex-wrap gap-2">
            {REHAB_ZONES.map((z) => {
              const on = input.pain.includes(z.id);
              return (
                <Chip key={z.id} tone={on ? "warn" : "default"} onClick={() => update({ pain: on ? input.pain.filter((p) => p !== z.id) : [...input.pain, z.id] })}>
                  {on ? `✓ ${z.label}` : z.label}
                </Chip>
              );
            })}
          </div>
          {input.pain.length > 0 && (
            <p className="mt-3 rounded-xl bg-warn-bg px-4 py-3 text-[13px] leading-relaxed text-warn-ink">
              Un ou deux exercices doux ajoutés pour {input.pain.map((z) => PAIN_LABELS[z].toLowerCase()).join(" et ")}. Garde la gêne sous 3 sur 10,
              pendant l&apos;échauffement comme pendant la séance. Douleur vive ou qui dure : consulte un kiné ou un médecin.
              {plan.warnings[0] && (
                <>
                  {" "}
                  <Link href={plan.warnings[0].href} className="font-semibold underline underline-offset-2">
                    En savoir plus
                  </Link>
                </>
              )}
            </p>
          )}
        </div>

        <div className="mt-6 hidden lg:block">{startButton}</div>
      </aside>

      <div className="mt-8 lg:mt-14">
        {plan.phases.map((phase) => (
          <section key={phase.key + (input.variant ?? 0)} className="mb-8">
            <h2 className="mb-2 flex items-center gap-3">
              <PhaseMark phase={phase.key} />
              <span className="poster font-display text-[26px] leading-none text-ink">{phase.title}</span>
              <span className="ml-auto text-[13px] text-subtle tabular">{fmtMin(phaseSeconds(phase))}</span>
            </h2>
            <ol className="flex flex-col gap-2">
              {phase.steps.map((s, j) => (s.kind === "ramp" ? null : <StepRow key={`${s.kind === "prep" ? s.exercise.id : "r"}${j}`} step={s} phase={phase.key} />))}
            </ol>
          </section>
        ))}
        <Link
          href={plan.lifts[0] ? `/series-approche?ex=${plan.lifts[0].id}` : "/series-approche"}
          className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-ink"
        >
          <PhaseMark phase="ramp" />
          <span>
            <span className="block font-display text-[19px] font-extrabold leading-none tracking-tight text-ink">Ensuite : tes séries d&apos;approche</span>
            <span className="mt-1 block text-[13px] text-subtle">Sur ton premier exercice lourd, à partir de ta charge du jour.</span>
          </span>
        </Link>
        <p className="text-[12px] leading-relaxed text-subtle">
          Ne remplace pas l&apos;avis d&apos;un kiné en cas de douleur installée.{" "}
          <Link href="/methodologie" className="underline underline-offset-2 hover:text-ink">
            Méthode
          </Link>
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto max-w-[560px]">{startButton}</div>
      </div>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </main>
    </>
  );
}

export default function PlanView() {
  const router = useRouter();
  const [initial, setInitial] = useState<SessionInput | null>(null);

  // Le plan ne dépend que de l'URL : calculé sur l'appareil, hors ligne.
  useEffect(() => {
    const input = parseSession(Object.fromEntries(new URLSearchParams(window.location.search)));
    if (!input.lifts.length && !input.zones?.length) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'URL n'existe qu'au client
    setInitial(input);
  }, [router]);

  if (!initial) return <main className="min-h-screen" aria-busy="true" />;
  return <PlanContent initial={initial} />;
}
