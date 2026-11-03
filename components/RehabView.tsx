"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GuidedMode from "@/components/GuidedMode";
import { PhaseMark, StepRow, Timeline, fmtMin, phaseSeconds } from "@/components/PlanParts";
import { buildRehabPlan, parseRehabZones } from "@/lib/rehab";
import type { BodyZone } from "@/lib/warmup-data";

function RehabContent({ zones }: { zones: BodyZone[] }) {
  const [guided, setGuided] = useState(false);
  const plan = useMemo(() => buildRehabPlan(zones), [zones]);
  const steps = plan.phases.reduce((n, p) => n + p.steps.length, 0);

  useEffect(() => {
    document.title = `Routine douleur ${plan.title} · Warmup`;
  }, [plan.title]);

  const startButton = (
    <button
      type="button"
      onClick={() => setGuided(true)}
      className="flex w-full items-center justify-between rounded-full bg-black px-7 py-4 text-white transition-transform active:scale-[0.98]"
    >
      <span className="font-display text-[26px] leading-none">C&apos;est parti</span>
      <span className="font-display text-[20px] leading-none tabular">{plan.minutes} min ▶</span>
    </button>
  );

  return (
    <>
      <header className="bg-green px-5 pb-7 pt-3 text-white sm:px-8">
        <div className="mx-auto max-w-[1080px]">
          <nav className="flex items-center">
            <Link href="/" aria-label="Accueil" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-[22px] hover:bg-white/15">
              ←
            </Link>
          </nav>
          <p className="mt-2 text-[12px] font-bold tracking-[0.08em] text-white">ROUTINE DOULEUR</p>
          <h1 className="poster mt-1 font-display text-[54px] leading-[0.96] sm:text-[72px]">{plan.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-bold">
            <span className="rounded-full bg-white/[0.18] px-3 py-1.5 tabular">{plan.minutes} min</span>
            <span className="rounded-full bg-white/[0.18] px-3 py-1.5 tabular">{steps} exercices</span>
            <span className="rounded-full bg-white/[0.18] px-3 py-1.5">Sans matériel</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1080px] px-5 pb-32 pt-2 sm:px-8 lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 lg:pb-16">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Timeline phases={plan.phases} />
          <div className="mt-5 rounded-2xl bg-warn-bg px-5 py-4 text-warn-ink">
            <p className="font-display text-[22px] leading-none">La règle : sous 3 sur 10</p>
            <p className="mt-2 text-[14px] leading-relaxed">
              Pendant et après chaque exercice, la douleur reste faible. Si elle monte, réduis l&apos;amplitude ou passe à
              l&apos;exercice suivant. Lentement, sans à-coups.
            </p>
          </div>
          <div className="mt-6 hidden lg:block">{startButton}</div>
        </aside>

        <div className="mt-8 lg:mt-14">
          {plan.phases.map((phase) => (
            <section key={phase.key} className="mb-8">
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
          <p className="text-[12px] leading-relaxed text-subtle">
            Pour aller plus loin sur ta zone :{" "}
            <Link href="/douleur" className="underline underline-offset-2 hover:text-ink">
              Guides douleur
            </Link>
          </p>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-[560px]">{startButton}</div>
        </div>

        {guided && <GuidedMode plan={plan} care onClose={() => setGuided(false)} />}
      </main>
    </>
  );
}

export default function RehabView() {
  const router = useRouter();
  const [zones, setZones] = useState<BodyZone[] | null>(null);

  // Routine calculée sur l'appareil à partir de l'URL (?z=genou,epaule).
  useEffect(() => {
    const z = parseRehabZones(new URLSearchParams(window.location.search).get("z") ?? "");
    if (!z.length) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'URL n'existe qu'au client
    setZones(z);
  }, [router]);

  if (!zones) return <main className="min-h-dvh bg-paper" />;
  return <RehabContent zones={zones} />;
}
