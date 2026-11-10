// Contrôles du moteur v3 sur toutes les sélections : règles qui doivent toujours
// tenir, quels que soient la séance, le matériel et les douleurs.
// Usage : node --experimental-strip-types --no-warnings --import ./scripts/bench/register.mjs scripts/bench/engine-checks.ts
import { BANK, type Equipment } from "@/lib/bank";
import { ALTERNATIVES } from "@/lib/routines";
import { SESSION_TEMPLATES, ZONE_ORDER } from "@/lib/lifts";
import { MAX_STEPS, SHORT_STEPS } from "@/lib/routines";
import { applySwap, buildSessionPlan, type PrepStep, type SessionInput } from "@/lib/session-engine";
import { FIGURES } from "@/lib/figures";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

const failures: string[] = [];
let n = 0;
const fail = (label: string, msg: string) => failures.push(`${label} : ${msg}`);

function check(label: string, input: SessionInput) {
  const plan = buildSessionPlan(input);
  const steps = plan.phases.flatMap((p) => p.steps).filter((s): s is PrepStep => s.kind === "prep");
  const ids = steps.map((s) => s.exercise.bankId);
  const eq = input.equipment ?? "gym";
  if (plan.phases.some((p) => p.key !== "mobility" && p.key !== "activation")) fail(label, "phase hors mobilité/activation");
  if (new Set(ids).size !== ids.length) fail(label, `doublon ${ids.join(", ")}`);
  const base = steps.filter((st) => !st.exercise.bankId.startsWith("soin-"));
  if (steps.length - base.length > input.pain.length * 2) fail(label, "trop d'ajouts pour la zone sensible");
  if (base.length > (input.short ? SHORT_STEPS : MAX_STEPS)) fail(label, `${steps.length} exercices, trop`);
  if (steps.length < (input.short ? 2 : 3) && !input.pain.length) fail(label, `${steps.length} exercices seulement`);
  for (const s of steps) {
    const ex = BANK[s.exercise.bankId];
    if (!ex && !s.exercise.bankId.startsWith("soin-")) fail(label, `hors banque : ${s.exercise.bankId}`);
    else if (ex) {
      const v = ex.variants[eq];
      if (!s.substituted && (typeof v !== "object" || v === null)) fail(label, `variante absente prise quand même : ${s.exercise.name}`);
      if ((ex.avoid ?? []).some((z) => input.pain.includes(z as BodyZone))) fail(label, `contre-indiqué : ${s.exercise.name}`);
    }
    if (eq !== "gym" && /poulie|banc|haltère/i.test(s.exercise.name)) fail(label, `matériel de salle : ${s.exercise.name}`);
    if (eq === "none" && /élastique/i.test(s.exercise.name)) fail(label, `élastique sans élastique : ${s.exercise.name}`);
    if (!FIGURES[s.exercise.id]) fail(label, `pictogramme manquant : ${s.exercise.id}`);
    if (!s.reason || !s.reps || !s.instructions) fail(label, `incomplet : ${s.exercise.name}`);
  }
  // Mobilité avant activation.
  const keys = plan.phases.map((p) => p.key);
  if (keys.indexOf("activation") !== -1 && keys.indexOf("mobility") > keys.indexOf("activation")) fail(label, "activation avant mobilité");
  // Règles bras : Push = triceps, Pull = biceps.
  if (input.template === "push" && ids.includes("curl-marteau")) fail(label, "biceps en séance Push");
  if (input.template === "pull" && ids.includes("extension-triceps")) fail(label, "triceps en séance Pull");
  if (!Object.keys(input.swaps ?? {}).length && !input.template && input.zones?.includes("bras") && eq !== "none" && !input.pain.length && !(input.short && input.zones.length > SHORT_STEPS)) {
    if (!ids.includes("curl-marteau") && !ids.includes("extension-triceps")) fail(label, "bras choisis sans biceps ni triceps");
  }
  return plan;
}

/** Le plan de référence, puis chaque remplacement ↻ proposé, jusqu'au bout de son cycle. */
function checkWithSwaps(label: string, input: SessionInput) {
  const plan = check(label, input);
  n++;
  const prep = (p: typeof plan) => p.phases.flatMap((ph) => ph.steps).filter((s): s is PrepStep => s.kind === "prep");
  const base = (p: typeof plan) => prep(p).filter((s) => !s.exercise.bankId.startsWith("soin-"));
  const all = prep(plan);
  for (const step of all) {
    if (!step.swap) continue;
    const slot = step.swap.slot;
    let next = applySwap(input, step.swap);
    const visited = new Set([step.exercise.bankId]);
    for (let i = 0; i < 6; i++) {
      const after = check(`${label} ↻${slot}`, next);
      n++;
      const flat = prep(after);
      if (base(after).length !== base(plan).length) fail(`${label} ↻${slot}`, "le remplacement change le nombre d'exercices");
      const moved = flat.find((s) => s.swap?.slot === slot);
      if (!moved || visited.has(moved.exercise.bankId)) break;
      visited.add(moved.exercise.bankId);
      next = applySwap(next, moved.swap!);
    }
  }
}

for (const [id, alts] of Object.entries(ALTERNATIVES)) {
  if (!BANK[id]) fail("alternatives", `hors banque : ${id}`);
  for (const alt of alts) {
    if (!BANK[alt]) fail("alternatives", `hors banque : ${alt}`);
    else if (BANK[id] && BANK[alt].phase !== BANK[id].phase) fail("alternatives", `phase différente : ${id} / ${alt}`);
  }
}

const EQ: Equipment[] = ["gym", "band", "none"];
const PAINS: BodyZone[][] = [[], ["epaule"], ["genou"], ["bas-du-dos"], ["poignets"]];
for (const t of SESSION_TEMPLATES) {
  for (const equipment of EQ) for (const short of [false, true]) for (const pain of PAINS) {
    checkWithSwaps(`${t.id} ${equipment}${short ? " court" : ""}${pain.length ? " " + pain : ""}`, { template: t.id, zones: t.zones, lifts: [], pain, band: false, equipment, short });
  }
}
for (let mask = 1; mask < 1 << ZONE_ORDER.length; mask++) {
  const zones = ZONE_ORDER.filter((_, i) => mask & (1 << i)) as MuscleGroup[];
  for (const equipment of EQ) for (const short of [false, true]) for (const pain of PAINS) {
    checkWithSwaps(`${zones.join("+")} ${equipment}${short ? " court" : ""}${pain.length ? " " + pain : ""}`, { zones, lifts: [], pain, band: false, equipment, short });
  }
}
// Anciennes URL par exercice.
for (const lift of ["squat", "developpe-couche", "souleve-de-terre", "tractions"]) check(`exercice ${lift}`, { lifts: [lift], pain: [], band: false, short: false });

const unique = [...new Set(failures.map((f) => f.split(" : ").slice(1).join(" : ")))];
console.log(`${n} routines contrôlées, ${failures.length} écarts`);
for (const u of unique.slice(0, 40)) {
  const count = failures.filter((f) => f.endsWith(u)).length;
  const sample = failures.find((f) => f.endsWith(u))!.split(" : ")[0];
  console.log(`  ${count}× ${u}   (ex. ${sample})`);
}
process.exitCode = failures.length ? 1 : 0;
