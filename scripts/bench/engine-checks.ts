// Contrôles du moteur v3 sur toutes les sélections : règles qui doivent toujours
// tenir, quels que soient la séance, le matériel et les douleurs.
// Usage : node --experimental-strip-types --no-warnings --import ./scripts/bench/register.mjs scripts/bench/engine-checks.ts
import { BANK, type Equipment } from "@/lib/bank";
import { SESSION_TEMPLATES, ZONE_ORDER } from "@/lib/lifts";
import { MAX_STEPS, SHORT_STEPS } from "@/lib/routines";
import { buildSessionPlan, type PrepStep, type SessionInput } from "@/lib/session-engine";
import { FIGURES } from "@/lib/figures";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

const failures: string[] = [];
const fail = (label: string, msg: string) => failures.push(`${label} : ${msg}`);

function check(label: string, input: SessionInput) {
  const plan = buildSessionPlan(input);
  const steps = plan.phases.flatMap((p) => p.steps).filter((s): s is PrepStep => s.kind === "prep");
  const ids = steps.map((s) => s.exercise.bankId);
  const eq = input.equipment ?? "gym";
  if (plan.phases.some((p) => p.key !== "mobility" && p.key !== "activation")) fail(label, "phase hors mobilité/activation");
  if (new Set(ids).size !== ids.length) fail(label, `doublon ${ids.join(", ")}`);
  if (steps.length > (input.short ? SHORT_STEPS : MAX_STEPS)) fail(label, `${steps.length} exercices, trop`);
  const onlyArmsBare = eq === "none" && (input.zones ?? []).every((z) => z === "bras");
  if (steps.length < (input.short ? 2 : 3) && !input.pain.length && !onlyArmsBare) fail(label, `${steps.length} exercices seulement`);
  for (const s of steps) {
    const ex = BANK[s.exercise.bankId];
    if (!ex) fail(label, `hors banque : ${s.exercise.bankId}`);
    else {
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
  if (!input.template && input.zones?.includes("bras") && eq !== "none" && !input.pain.length && !(input.short && input.zones.length > SHORT_STEPS)) {
    if (!ids.includes("curl-marteau") && !ids.includes("extension-triceps")) fail(label, "bras choisis sans biceps ni triceps");
  }
  return plan;
}

const EQ: Equipment[] = ["gym", "band", "none"];
const PAINS: BodyZone[][] = [[], ["epaule"], ["genou"], ["bas-du-dos"], ["poignets"]];
let n = 0;
for (const t of SESSION_TEMPLATES) {
  for (const equipment of EQ) for (const short of [false, true]) for (const pain of PAINS) for (const variant of [0, 1]) {
    check(`${t.id} ${equipment}${short ? " court" : ""}${pain.length ? " " + pain : ""} v${variant}`, { template: t.id, zones: t.zones, lifts: [], pain, band: false, equipment, short, variant });
    n++;
  }
}
for (let mask = 1; mask < 1 << ZONE_ORDER.length; mask++) {
  const zones = ZONE_ORDER.filter((_, i) => mask & (1 << i)) as MuscleGroup[];
  for (const equipment of EQ) for (const short of [false, true]) for (const pain of PAINS) for (const variant of [0, 1]) {
    check(`${zones.join("+")} ${equipment}${short ? " court" : ""}${pain.length ? " " + pain : ""} v${variant}`, { zones, lifts: [], pain, band: false, equipment, short, variant });
    n++;
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
