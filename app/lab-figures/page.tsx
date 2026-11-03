// Page de travail (dev uniquement) : planche contact des pictogrammes réellement
// affichés par le site, en départ, milieu et arrivée. Lue par
// scripts/build-figure-sheet.mjs pour relire les postures sans navigateur.
import { notFound } from "next/navigation";
import { FigureStill } from "@/components/ExerciseFigure";
import { BANK } from "@/lib/bank";
import { buildRehabPlan, REHAB_ZONES } from "@/lib/rehab";

export const metadata = { robots: { index: false } };

export default function Lab() {
  if (process.env.NODE_ENV === "production") notFound();
  const used = new Map<string, string>();
  for (const ex of Object.values(BANK)) for (const v of Object.values(ex.variants)) if (v && typeof v === "object") used.set(v.figure, v.name);
  for (const z of REHAB_ZONES) for (const p of buildRehabPlan([z.id]).phases) for (const s of p.steps) if (s.kind === "prep") used.set(s.exercise.id, s.exercise.name);
  return (
    <main className="grid grid-cols-2 gap-2 bg-paper p-2">
      {[...used].map(([id, name], i) => (
        <div key={id} data-fig={id} className="rounded-lg bg-card p-1 ring-1 ring-line">
          <p className="text-[10px] font-bold leading-tight text-ink">{i + 1}. {name}</p>
          <div className="flex">
            {[0, 0.5, 1].map((k) => (
              <FigureStill key={k} id={id} k={k} className="h-[70px] w-1/3" />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
