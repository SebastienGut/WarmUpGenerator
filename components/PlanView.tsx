"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GuidedMode from "@/components/GuidedMode";
import Plates from "@/components/Plates";
import { sessionLabel } from "@/lib/lifts";
import {
  buildSessionPlan,
  parseSession,
  serializeSession,
  type PlanPhase,
  type PlanStep,
  type RampStep,
  type SessionPlan,
} from "@/lib/session-engine";

function phaseSeconds(phase: PlanPhase) {
  return phase.steps.reduce((s, st) => {
    if (st.kind !== "ramp") return s + st.seconds;
    return st.full ? s + st.lines.reduce((a, l) => a + 30 + l.restSeconds, 0) : s;
  }, 0);
}

function fmtDuration(s: number) {
  const m = Math.round(s / 60);
  return m >= 1 ? `${m} min` : `${s} s`;
}

/** Répartition du temps : on voit d'un coup d'œil où va l'échauffement. */
function Timeline({ phases }: { phases: PlanPhase[] }) {
  const secs = phases.map(phaseSeconds);
  const total = secs.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="mt-6">
      <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">
        {phases.map((p, i) => (
          <span
            key={p.key}
            className={i === phases.length - 1 ? "bg-accent" : "bg-ink"}
            style={{ width: `${(secs[i] / total) * 100}%`, opacity: i === phases.length - 1 ? 1 : 0.25 + (0.55 * i) / phases.length }}
          />
        ))}
      </div>
      <ol className="mt-2.5 flex justify-between gap-2">
        {phases.map((p, i) => (
          <li key={p.key} className="flex min-w-0 flex-col">
            <span className="truncate font-display text-[13px] font-bold uppercase tracking-wide text-ink">{p.title}</span>
            <span className="tabular text-[11px] text-subtle">{fmtDuration(secs[i])}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RampTable({ step }: { step: RampStep }) {
  return (
    <li className="py-4">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[20px] font-bold uppercase leading-none tracking-wide text-ink">{step.lift.name}</h3>
        <span className="text-[11px] font-medium text-subtle">{step.full ? "Montée complète" : "Rappel avant l'exercice"}</span>
      </div>
      <table className="w-full text-left">
        <tbody>
          {step.lines.map((l, i) => (
            <tr key={i} className="border-t border-line first:border-t-0">
              <td className="w-7 py-2 align-middle font-display text-[15px] font-bold text-subtle tabular">{i + 1}</td>
              <td className="py-2 align-middle">
                <span className="font-display text-[22px] font-bold leading-none text-ink tabular">{l.load}</span>
                <span className="ml-1.5 font-display text-[18px] font-semibold text-muted">× {l.reps}</span>
              </td>
              <td className="py-2 text-right align-middle">
                {l.plates ? <Plates plates={l.plates} size={22} /> : null}
              </td>
              {step.full && (
                <td className="w-14 py-2 text-right align-middle text-[11px] text-subtle tabular">{l.restSeconds} s</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {step.note && <p className="mt-2 text-[12px] leading-relaxed text-subtle">{step.note}</p>}
    </li>
  );
}

function StepRow({ step }: { step: PlanStep }) {
  if (step.kind === "ramp") return <RampTable step={step} />;
  const name = step.kind === "prep" ? step.exercise.name : step.name;
  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[16px] font-semibold leading-snug text-ink">{name}</h3>
        <span className="shrink-0 font-display text-[17px] font-bold text-accent-ink tabular">{step.reps}</span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{step.instructions}</p>
      {step.kind === "prep" && (
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-subtle">
          <span>{step.reason}</span>
          {step.substituted && <span className="font-medium text-muted">· version sans élastique</span>}
        </p>
      )}
    </li>
  );
}

function PlanContent({ plan, query }: { plan: SessionPlan; query: string }) {
  const [guided, setGuided] = useState(false);
  const [copied, setCopied] = useState(false);
  const title = plan.lifts.map((l) => l.name).join(" · ");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Échauffement : ${title}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Partage annulé : rien à faire.
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[560px] px-5 pb-36 pt-5">
      <nav className="mb-8 flex items-center justify-between text-[14px] font-medium">
        <Link href={`/?${query}`} className="text-muted hover:text-ink">
          ← Modifier
        </Link>
        <button type="button" onClick={share} className="text-muted hover:text-ink">
          {copied ? "Lien copié" : "Partager"}
        </button>
      </nav>

      <header className="border-b-2 border-ink pb-6">
        <p className="text-[13px] font-medium text-subtle">Échauffement · environ {plan.minutes} minutes</p>
        <h1 className="mt-2 font-display text-[44px] font-extrabold uppercase leading-[0.9] tracking-tight text-ink">
          {sessionLabel(plan.lifts.map((l) => l.id))}
        </h1>
        {plan.lifts.length > 1 && <p className="mt-2 text-[15px] leading-snug text-muted">{title}</p>}
        <Timeline phases={plan.phases} />
      </header>

      {plan.warnings.map((w) => (
        <aside key={w.zone} className="mt-6 border-l-[3px] border-warn bg-warn-bg px-4 py-3.5">
          <p className="text-[14px] leading-relaxed text-warn-ink">{w.text}</p>
          <Link href={w.href} className="mt-1.5 inline-block text-[13px] font-semibold text-warn underline underline-offset-4">
            Comprendre cette douleur
          </Link>
        </aside>
      ))}

      <div className="mt-4">
        {plan.phases.map((phase, i) => (
          <section key={phase.key} className="border-b border-line-strong pt-8 pb-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[30px] font-extrabold leading-none text-accent tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[26px] font-extrabold uppercase leading-none tracking-tight text-ink">
                {phase.title}
              </h2>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">{phase.why}</p>
            <ol className="mt-1 divide-y divide-line">
              {phase.steps.map((s, j) => (
                <StepRow key={j} step={s} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-subtle">
        Plan construit à partir des exigences de tes exercices. Il ne remplace pas l&apos;avis d&apos;un kinésithérapeute
        en cas de douleur installée.{" "}
        <Link href="/methodologie" className="underline underline-offset-2 hover:text-ink">
          Voir la méthode
        </Link>
      </p>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div className="mx-auto max-w-[560px]">
          <button
            type="button"
            onClick={() => setGuided(true)}
            className="flex w-full items-center justify-between rounded-xl bg-accent px-6 py-4 text-on-accent transition-transform active:scale-[0.98]"
          >
            <span className="font-display text-[22px] font-extrabold uppercase tracking-wide">Démarrer l&apos;échauffement</span>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M0 0 L14 8 L0 16 Z" />
            </svg>
          </button>
        </div>
      </div>

      {guided && <GuidedMode plan={plan} onClose={() => setGuided(false)} />}
    </main>
  );
}

export default function PlanView() {
  const router = useRouter();
  const [state, setState] = useState<{ plan: SessionPlan; query: string } | null>(null);

  // Le plan ne dépend que de l'URL : calculé sur l'appareil, il fonctionne
  // hors ligne et ne coûte aucun appel serveur.
  useEffect(() => {
    const input = parseSession(Object.fromEntries(new URLSearchParams(window.location.search)));
    if (!input.lifts.length) {
      router.replace("/");
      return;
    }
    const plan = buildSessionPlan(input);
    document.title = `Échauffement : ${plan.lifts.map((l) => l.name).join(", ")} · Warmup`;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'URL n'existe qu'au client
    setState({ plan, query: serializeSession(input) });
  }, [router]);

  if (!state) return <main className="min-h-screen" aria-busy="true" />;
  return <PlanContent plan={state.plan} query={state.query} />;
}
