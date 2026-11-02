// Affiche les routines du moteur v3 (séance type × matériel, puis quelques
// compositions « Mes zones »), à relire comme un coach : exercice, variante,
// dose, ordre, utilité, remplacement.
// Usage : node --experimental-strip-types --no-warnings --import ./scripts/bench/register.mjs scripts/bench/plans.ts
import { BANK, EQUIPMENT_LABELS, type Equipment } from "@/lib/bank";
import { SESSION_TEMPLATES } from "@/lib/lifts";
import { buildSessionPlan, type PrepStep, type SessionInput } from "@/lib/session-engine";

const EQ: Equipment[] = ["gym", "band", "none"];

function print(name: string, input: Partial<SessionInput>) {
  const plan = buildSessionPlan({ zones: [], lifts: [], pain: [], band: false, short: false, variant: 0, ...input });
  console.log(`\n=== ${name} — ${plan.minutes} min, ${EQUIPMENT_LABELS[plan.equipment]}`);
  for (const ph of plan.phases) {
    for (const s of ph.steps as PrepStep[]) {
      const pos = BANK[s.exercise.bankId].position;
      console.log(`  ${ph.title.padEnd(11)} ${s.exercise.name.padEnd(46)} ${s.reps.padEnd(17)} [${pos}]${s.substituted ? " (remplace)" : ""}`);
    }
  }
}

for (const t of SESSION_TEMPLATES) for (const equipment of EQ) print(t.label, { template: t.id, zones: t.zones, equipment });

const ZONE_CASES: [string, Partial<SessionInput>][] = [
  ["Pecs seuls", { zones: ["pecs"] }],
  ["Bras seuls", { zones: ["bras"] }],
  ["Dos + bras (mes zones)", { zones: ["dos", "bras"] }],
  ["Épaules, sans matériel", { zones: ["epaules"], equipment: "none" }],
  ["Jambes + fessiers, genou sensible", { zones: ["jambes", "fessiers"], pain: ["genou"] }],
  ["Tout", { zones: ["pecs", "dos", "epaules", "bras", "jambes", "fessiers", "core"] }],
  ["Push court", { template: "push", zones: ["pecs", "epaules", "bras"], short: true }],
  ["Full body court", { template: "full", zones: ["pecs", "dos", "jambes", "fessiers"], short: true }],
];
for (const [name, c] of ZONE_CASES) print(name, c);
