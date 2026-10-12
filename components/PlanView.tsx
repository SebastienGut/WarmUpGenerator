"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ExerciseFigure from "@/components/ExerciseFigure";
import GuidedMode from "@/components/GuidedMode";
import Plates from "@/components/Plates";
import Sheet from "@/components/Sheet";
import { LIFTS_BY_ID, sessionLabel } from "@/lib/lifts";
import { saveSession } from "@/lib/saved-sessions";
import {
  PAIN_LABELS,
  buildSessionPlan,
  parseSession,
  serializeSession,
  type PlanPhase,
  type PlanStep,
  type RampStep,
  type SessionInput,
} from "@/lib/session-engine";
import type { BodyZone } from "@/lib/warmup-data";

const ZONES = Object.keys(PAIN_LABELS) as BodyZone[];
const REPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15];

function phaseSeconds(phase: PlanPhase) {
  return phase.steps.reduce((s, st) => {
    if (st.kind !== "ramp") return s + st.seconds;
    return st.full ? s + st.lines.reduce((a, l) => a + 30 + l.restSeconds, 0) : s;
  }, 0);
}
const fmtMin = (s: number) => (s >= 60 ? `${Math.round(s / 60)} min` : `${s} s`);

function Timeline({ phases }: { phases: PlanPhase[] }) {
  const secs = phases.map(phaseSeconds);
  const total = secs.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="mt-5">
      <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">
        {phases.map((p, i) => (
          <span
            key={p.key}
            className={`anim-grow transition-[width] duration-500 ${i === phases.length - 1 ? "bg-accent" : "bg-ink"}`}
            style={
              {
                width: `${(secs[i] / total) * 100}%`,
                opacity: i === phases.length - 1 ? 1 : 0.22 + (0.5 * i) / phases.length,
                "--d": `${i * 90}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <ol className="mt-2 flex justify-between gap-2">
        {phases.map((p, i) => (
          <li key={p.key} className="min-w-0">
            <span className="block truncate font-display text-[13px] font-bold uppercase tracking-wide text-ink">{p.title}</span>
            <span className="text-[11px] text-subtle tabular">{fmtMin(secs[i])}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Ligne d'exercice : pictogramme, nom, volume. La consigne s'ouvre au tap. */
function StepRow({ step }: { step: Exclude<PlanStep, RampStep> }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = step.kind === "prep" ? step.exercise.id : "raise";
  const name = step.kind === "prep" ? step.exercise.name : step.name;
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-card">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 p-2 pr-4 text-left">
        <ExerciseFigure id={id} label={name} className="h-[60px] w-[66px] shrink-0 rounded-xl bg-ink/[0.03]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{name}</span>
          <span className="font-display text-[17px] font-bold text-accent-ink tabular">{step.reps}</span>
        </span>
        <motion.span aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} className="text-[14px] text-subtle">
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-4">
              <ExerciseFigure id={id} label={name} className="mx-auto mb-3 h-40 w-full max-w-[260px]" />
              <p className="text-[14px] leading-relaxed text-muted">{step.instructions}</p>
              {step.kind === "prep" && (
                <p className="mt-2 text-[12px] text-subtle">
                  {step.reason}
                  {step.substituted ? " · version sans élastique" : ""}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function RampCard({ step }: { step: RampStep }) {
  return (
    <li className="rounded-2xl border border-line bg-card p-2 pr-4">
      <div className="flex items-center gap-3">
        <ExerciseFigure id={step.lift.id} label={step.lift.name} className="h-[60px] w-[66px] shrink-0 rounded-xl bg-ink/[0.03]" />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[19px] font-extrabold uppercase leading-none tracking-tight text-ink">{step.lift.name}</span>
          <span className="text-[12px] text-subtle">{step.full ? "Montée complète" : "Rappel avant l'exercice"}</span>
        </span>
      </div>
      <table className="mt-2 w-full">
        <tbody>
          {step.lines.map((l, i) => (
            <tr key={i} className="border-t border-line">
              <td className="w-8 py-2 pl-2 font-display text-[14px] font-bold text-subtle tabular">{i + 1}</td>
              <td className="py-2">
                <span className="font-display text-[21px] font-bold leading-none text-ink tabular">{l.load}</span>
                <span className="ml-1.5 font-display text-[17px] font-semibold text-muted">× {l.reps}</span>
              </td>
              <td className="py-2 text-right">{l.plates && <Plates plates={l.plates} size={22} showLabel={false} />}</td>
              {step.full && <td className="w-12 py-2 text-right text-[11px] text-subtle tabular">{l.restSeconds} s</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {step.note && <p className="mt-1 pl-2 text-[12px] leading-snug text-subtle">{step.note}</p>}
    </li>
  );
}

function Chip({ children, onClick, tone = "default" }: { children: React.ReactNode; onClick: () => void; tone?: "default" | "warn" | "on" }) {
  const cls =
    tone === "warn"
      ? "border-warn bg-warn-bg text-warn-ink"
      : tone === "on"
        ? "border-ink bg-ink text-paper"
        : "border-line-strong bg-card text-ink hover:border-ink";
  return (
    <button type="button" onClick={onClick} className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${cls}`}>
      {children}
    </button>
  );
}

function Toggle({ on, onChange, title }: { on: boolean; onChange: (v: boolean) => void; title: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between py-3.5 text-left">
      <span className="text-[16px] font-semibold text-ink">{title}</span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-faint"}`}>
        <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow-sm ${on ? "right-1" : "left-1"}`} />
      </span>
    </button>
  );
}

function PlanContent({ initial }: { initial: SessionInput }) {
  const router = useRouter();
  const [input, setInput] = useState(initial);
  const [weight, setWeight] = useState(initial.workWeight ? String(initial.workWeight) : "");
  const [adjusting, setAdjusting] = useState(false);
  const [guided, setGuided] = useState(false);
  const [copied, setCopied] = useState(false);
  const plan = useMemo(() => buildSessionPlan(input), [input]);
  const first = LIFTS_BY_ID[input.lifts[0]];
  const loaded = first.loading !== "poids-du-corps";
  const label = sessionLabel(input.lifts);

  // Chaque réglage réécrit l'URL (partage, retour arrière) et la séance récente.
  const update = useCallback(
    (patch: Partial<SessionInput>) => {
      const next = { ...input, ...patch };
      const q = serializeSession(next);
      setInput(next);
      router.replace(`/plan?${q}`, { scroll: false });
      saveSession({ query: q, label: sessionLabel(next.lifts) });
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
          {loaded && (
            <Chip onClick={() => setAdjusting(true)} tone={input.workWeight ? "on" : "default"}>
              {input.workWeight ? `${String(input.workWeight).replace(".", ",")} kg × ${input.workReps}` : "+ Ma charge"}
            </Chip>
          )}
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
              {phase.steps.map((s, j) => (s.kind === "ramp" ? <RampCard key={j} step={s} /> : <StepRow key={`${s.kind === "prep" ? s.exercise.id : "r"}${j}`} step={s} />))}
            </ol>
          </section>
        ))}
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
        <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">Exercices</p>
        <ol className="mb-6 divide-y divide-line rounded-xl border border-line bg-card">
          {input.lifts.map((id, i) => (
            <li key={id} className="flex items-center gap-2 py-1 pl-1 pr-2">
              <ExerciseFigure id={id} label={LIFTS_BY_ID[id].name} animate={false} className="h-11 w-12 shrink-0" />
              <span className="flex-1 text-[14px] font-semibold text-ink">{LIFTS_BY_ID[id].name}</span>
              {i > 0 && (
                <button type="button" onClick={() => update({ lifts: [id, ...input.lifts.filter((x) => x !== id)] })} aria-label={`Mettre ${LIFTS_BY_ID[id].name} en premier`} className="rounded-md px-2 py-1 text-[16px] text-subtle hover:text-ink">
                  ↑
                </button>
              )}
              {input.lifts.length > 1 && (
                <button type="button" onClick={() => update({ lifts: input.lifts.filter((x) => x !== id) })} aria-label={`Retirer ${LIFTS_BY_ID[id].name}`} className="rounded-md px-2 py-1 text-[18px] text-subtle hover:text-ink">
                  ×
                </button>
              )}
            </li>
          ))}
        </ol>

        {loaded && (
          <>
            <p className="mb-2 font-display text-[15px] font-bold uppercase tracking-wide text-subtle">1re série · {first.name}</p>
            <div className="mb-6 flex items-end gap-3">
              <label className="flex flex-1 items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
                <input
                  inputMode="decimal"
                  value={weight}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d.,]/g, "");
                    setWeight(v);
                    const kg = Number(v.replace(",", "."));
                    update({ workWeight: kg > 0 && kg < 600 ? kg : undefined });
                  }}
                  placeholder="—"
                  aria-label="Charge de ta première série, en kilos"
                  className="w-full min-w-0 bg-transparent font-display text-[44px] font-extrabold leading-none text-ink outline-none tabular placeholder:text-faint"
                />
                <span className="font-display text-[20px] font-bold text-subtle">kg</span>
              </label>
              <span className="pb-2 font-display text-[26px] font-bold text-subtle">×</span>
              <label className="flex items-baseline border-b-2 border-line-strong pb-1 focus-within:border-accent">
                <select
                  value={input.workReps}
                  onChange={(e) => update({ workReps: Number(e.target.value) })}
                  aria-label="Répétitions"
                  className="appearance-none bg-transparent font-display text-[44px] font-extrabold leading-none text-ink outline-none tabular"
                >
                  {REPS.map((r) => (
                    <option key={r} value={r} className="bg-card text-[16px]">
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}

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
    if (!input.lifts.length) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'URL n'existe qu'au client
    setInitial(input);
  }, [router]);

  if (!initial) return <main className="min-h-screen" aria-busy="true" />;
  return <PlanContent initial={initial} />;
}
