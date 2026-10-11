"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GuidedMode from "@/components/GuidedMode";
import { buildSessionPlan, parseSession, serializeSession, type PlanStep, type SessionPlan } from "@/lib/session-engine";

function StepCard({ step }: { step: PlanStep }) {
  if (step.kind === "ramp") {
    return (
      <li className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3.5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-bold text-white">{step.lift.name}</h3>
          <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#5A5A60]">
            {step.full ? "Montée complète" : "Rappel"}
          </span>
        </div>
        <ol className="flex flex-col gap-1.5">
          {step.lines.map((l, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3 text-[14px]">
              <span className="text-white">
                <span className="font-bold">{l.load}</span> × {l.reps}
                {l.plates && <span className="ml-2 text-[12px] text-[#5A5A60]">{l.plates} / côté</span>}
              </span>
              {step.full && <span className="shrink-0 font-mono text-[11px] text-[#5A5A60]">repos {l.restSeconds}s</span>}
            </li>
          ))}
        </ol>
        {step.note && <p className="mt-2 text-[12px] text-[#5A5A60]">{step.note}</p>}
      </li>
    );
  }
  const name = step.kind === "prep" ? step.exercise.name : step.name;
  return (
    <li className="rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-bold text-white">{name}</h3>
        <span className="shrink-0 font-mono text-[12px] font-bold text-[#A3FF12]">{step.reps}</span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">{step.instructions}</p>
      {step.kind === "prep" && (
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-[#5A5A60]">
          <span>{step.reason}</span>
          {step.substituted && <span className="text-[#A1A1A6]">Version sans élastique</span>}
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
    <main className="mx-auto min-h-screen w-full max-w-[560px] bg-[#050505] px-4 pb-36 pt-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/?${query}`} className="text-[13px] font-bold text-[#A1A1A6] hover:text-white">
          ← Modifier
        </Link>
        <button type="button" onClick={share} className="text-[13px] font-bold text-[#A1A1A6] hover:text-white">
          {copied ? "Lien copié" : "Partager"}
        </button>
      </div>

      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
        Échauffement · ≈ {plan.minutes} min
      </p>
      <h1 className="mt-2 font-sans text-[28px] font-black leading-[1.05] tracking-tight text-white">{title}</h1>

      {plan.warnings.map((w) => (
        <div key={w.zone} className="mt-5 rounded-xl border border-[#FF8A3D]/30 bg-[#FF8A3D]/[0.06] px-4 py-3">
          <p className="text-[13px] leading-relaxed text-[#FFD2B0]">{w.text}</p>
          <Link href={w.href} className="mt-1.5 inline-block text-[12px] font-bold text-[#FFB27A] underline underline-offset-4">
            Comprendre cette douleur →
          </Link>
        </div>
      ))}

      <div className="mt-8 flex flex-col gap-9">
        {plan.phases.map((phase, i) => (
          <section key={phase.key}>
            <div className="mb-3 flex items-baseline gap-3">
              <span className="font-mono text-[13px] font-black text-[#A3FF12]">{i + 1}</span>
              <h2 className="font-sans text-[19px] font-black uppercase tracking-tight text-white">{phase.title}</h2>
            </div>
            <p className="mb-3 text-[13px] leading-relaxed text-[#5A5A60]">{phase.why}</p>
            <ol className="flex flex-col gap-2">
              {phase.steps.map((s, j) => (
                <StepCard key={j} step={s} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="mt-10 text-[11px] leading-relaxed text-[#5A5A60]">
        Plan informatif, construit à partir des exigences de tes exercices. Il ne remplace pas l&apos;avis d&apos;un
        kinésithérapeute en cas de douleur installée.{" "}
        <Link href="/methodologie" className="underline underline-offset-2">
          Méthode
        </Link>
      </p>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.06] bg-[#050505]/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div className="mx-auto max-w-[560px]">
          <button
            type="button"
            onClick={() => setGuided(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#A3FF12] px-6 py-4 text-black transition-transform active:scale-[0.98]"
          >
            <span className="font-sans text-[17px] font-black tracking-tight">Démarrer, étape par étape</span>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#000" aria-hidden="true">
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

  if (!state) return <main className="min-h-screen bg-[#050505]" aria-busy="true" />;
  return <PlanContent plan={state.plan} query={state.query} />;
}
