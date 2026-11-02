// Affiche les routines produites par le moteur pour un banc de cas, à relire
// comme un coach. Usage : node --experimental-strip-types --import ./scripts/bench/register.mjs scripts/bench/plans.ts
import { buildSessionPlan, type SessionInput } from "@/lib/session-engine";
import type { MuscleGroup } from "@/lib/warmup-data";

const CASES: [string, Partial<SessionInput> & { zones: MuscleGroup[] }][] = [
  ["Push", { zones: ["pecs", "epaules", "bras"] }],
  ["Pull", { zones: ["dos", "bras"] }],
  ["Jambes", { zones: ["jambes", "fessiers"] }],
  ["Haut du corps", { zones: ["pecs", "dos", "epaules"] }],
  ["Bas du corps", { zones: ["jambes", "fessiers", "core"] }],
  ["Full body", { zones: ["pecs", "dos", "jambes", "fessiers"] }],
  ["Pecs seuls", { zones: ["pecs"] }],
  ["Bras seuls", { zones: ["bras"] }],
  ["Épaules + élastique", { zones: ["epaules"], band: true }],
  ["Jambes, genou sensible", { zones: ["jambes", "fessiers"], pain: ["genou"] }],
  ["Push court", { zones: ["pecs", "epaules", "bras"], short: true }],
];

const posOf = (d: string) =>
  /allongé|sur le dos|sur le ventre|au sol,|dos au sol/i.test(d) ? "sol" : /quatre pattes|quadrupédie|planche|pompe/i.test(d) ? "4 pattes/appui" : /assis/i.test(d) ? "assis" : "debout";

for (const [name, c] of CASES) {
  const plan = buildSessionPlan({ lifts: [], pain: [], band: false, short: false, variant: 0, ...c });
  console.log(`\n=== ${name} — ${plan.minutes} min`);
  for (const ph of plan.phases) {
    for (const s of ph.steps) {
      if (s.kind === "prep") console.log(`  ${ph.title.padEnd(13)} ${s.exercise.name.padEnd(48)} ${s.reps.padEnd(20)} [${posOf(s.exercise.description)}${s.exercise.equipment !== "aucun" ? ", " + s.exercise.equipment : ""}] ${s.reason}`);
      else if (s.kind === "raise") console.log(`  ${ph.title.padEnd(13)} ${s.name}`);
    }
  }
}
