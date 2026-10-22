"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chip, StepRow, Timeline, Toggle, fmtMin, phaseSeconds } from "@/components/PlanParts";
import GuidedMode from "@/components/GuidedMode";
import Sheet from "@/components/Sheet";
import { ZONE_ORDER } from "@/lib/lifts";
import { saveSession } from "@/lib/saved-sessions";
import {
  PAIN_LABELS,
  buildSessionPlan,
  parseSession,
  serializeSession,
  type SessionInput,
} from "@/lib/session-engine";
import { MUSCLE_LABELS, type BodyZone, type MuscleGroup } from "@/lib/warmup-data";

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];

function PlanContent({ initial }: { initial: SessionInput }) {
  const router = useRouter();
  const [input, setInput] = useState(initial);
  const [adjusting, setAdjusting] = useState(false);
  const [guided, setGuided] = useState(false);
  const [copied, setCopied] = useState(false);
  const plan = useMemo(() => buildSessionPlan(input), [input]);
  const label = plan.title;
  const zones = input.zones ?? [];

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
      className="flex w-full items-center justify-between rounded-2xl bg-accent px-6 py-4 text-on-accent transition-transform active:scale-[0.98]"
    >
      <span className="font-display text-[22px] font-extrabold uppercase tracking-wide">Démarrer</span>
      <span className="flex items-center gap-3">
        <span className="font-display text-[18px] font-bold opacity-90 tabular">{plan.minutes} min</span>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
          <path d="M0 0 L14 8 L0 16 Z" />
        </svg>
      </span>
    </button>
  );

  return (
    <main className="mx-auto w-full max-w-[1080px] px-5 pb-32 pt-4 sm:px-8 lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 lg:pb-16">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <nav className="flex items-center justify-between">
          <Link href="/" aria-label="Autre séance" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-[22px] text-ink hover:bg-ink/[0.06]">
            ←
          </Link>
          <button type="button" onClick={share} className="rounded-full px-3 py-2 text-[14px] font-semibold text-muted hover:bg-ink/[0.06] hover:text-ink">
            {copied ? "Lien copié" : "Partager"}
          </button>
        </nav>

        <h1 className="mt-3 font-display text-[46px] font-extrabold uppercase leading-[0.88] tracking-tight text-ink">{label}</h1>
        <p className="mt-2 text-[14px] text-subtle">
          {plan.minutes} min · {steps} étapes
        </p>
        <Timeline phases={plan.phases} />

        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <Chip onClick={() => setAdjusting(true)} tone={input.pain.length ? "warn" : "default"}>
            {input.pain.length ? input.pain.map((z) => PAIN_LABELS[z]).join(", ") : "Ça coince ?"}
          </Chip>
          <Chip onClick={() => setAdjusting(true)}>{input.short ? "Version courte" : "Complet"}</Chip>
          <Chip onClick={() => update({ variant: ((input.variant ?? 0) + 1) % 997 })}>↻ Varier</Chip>
        </div>

        {plan.warnings.map((w) => (
          <p key={w.zone} className="mt-4 rounded-xl bg-warn-bg px-4 py-3 text-[13px] leading-relaxed text-warn-ink">
            {PAIN_LABELS[w.zone]} : garde la douleur sous 3/10 pendant la montée, sinon reste à la charge confortable.{" "}
            <Link href={w.href} className="font-semibold underline underline-offset-2">
              En savoir plus
            </Link>
          </p>
        ))}

        <div className="mt-6 hidden lg:block">{startButton}</div>
      </aside>

      <div className="mt-8 lg:mt-14">
        {plan.phases.map((phase, i) => (
          <section
            key={phase.key + (input.variant ?? 0)}
            className="anim-rise mb-7"
            style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
          >
            <h2 className="mb-3 flex items-baseline gap-2.5">
              <span className="font-display text-[22px] font-extrabold leading-none text-accent tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink">{phase.title}</span>
              <span className="ml-auto text-[12px] text-subtle tabular">{fmtMin(phaseSeconds(phase))}</span>
            </h2>
            <ol className="flex flex-col gap-2">
              {phase.steps.map((s, j) => (s.kind === "ramp" ? null : <StepRow key={`${s.kind === "prep" ? s.exercise.id : "r"}${j}`} step={s} />))}
            </ol>
          </section>
        ))}
        <Link
          href={plan.lifts[0] ? `/series-approche?ex=${plan.lifts[0].id}` : "/series-approche"}
          className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-ink"
        >
          <span>
            <span className="block font-display text-[19px] font-extrabold uppercase leading-none tracking-tight text-ink">Ensuite : tes séries d&apos;approche</span>
            <span className="mt-1 block text-[13px] text-subtle">Sur ton premier exercice lourd, à partir de ta charge du jour.</span>
          </span>
          <span aria-hidden="true" className="font-display text-[22px] font-extrabold text-ink">→</span>
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

      <Sheet open={adjusting} onClose={() => setAdjusting(false)} title="Ajuster" footer={<button type="button" onClick={() => setAdjusting(false)} className="w-full rounded-xl bg-ink py-4 font-display text-[20px] font-extrabold uppercase tracking-wide text-paper">Voir le plan</button>}>
        <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">Zones</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {ZONE_ORDER.map((z: MuscleGroup) => {
            const on = zones.includes(z);
            return (
              <Chip
                key={z}
                tone={on ? "on" : "default"}
                onClick={() => {
                  // Passer par les zones abandonne l'éventuel exercice précis.
                  const base = zones.length ? zones : [];
                  const next = on ? base.filter((x) => x !== z) : [...base, z];
                  if (next.length) update({ zones: next, lifts: [] });
                }}
              >
                {MUSCLE_LABELS[z]}
              </Chip>
            );
          })}
        </div>
        <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">Ça coince ?</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const on = input.pain.includes(z);
            return (
              <Chip key={z} tone={on ? "warn" : "default"} onClick={() => update({ pain: on ? input.pain.filter((p) => p !== z) : [...input.pain, z] })}>
                {PAIN_LABELS[z]}
              </Chip>
            );
          })}
        </div>
        <div className="divide-y divide-line border-y border-line">
          <Toggle on={input.band} onChange={(v) => update({ band: v })} title="J'ai un élastique" />
          <Toggle on={input.short} onChange={(v) => update({ short: v })} title="Version courte (5 min)" />
        </div>
      </Sheet>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </main>
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
