// Contrôles de comportement du moteur sur toutes les combinaisons de zones :
// règles de coach qui doivent toujours tenir, quelle que soit la sélection.
// Usage : node --experimental-strip-types --no-warnings --import ./scripts/bench/register.mjs scripts/bench/engine-checks.ts
import { buildSessionPlan, type PrepStep, type SessionInput } from "@/lib/session-engine";
import { ZONE_ORDER } from "@/lib/lifts";
import { POSITION } from "@/lib/prep-catalog";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

const failures: string[] = [];
const fail = (label: string, msg: string) => failures.push(`${label} : ${msg}`);
const PUSH_ONLY = new Set(["act-bras-pompes-mur", "act-pecs-pompes-reprise", "act-bras-pushdown-elastique"]);

function check(label: string, input: SessionInput) {
  const plan = buildSessionPlan(input);
  const steps = plan.phases.flatMap((p) => p.steps).filter((s): s is PrepStep => s.kind === "prep");
  const ids = steps.map((s) => s.exercise.id);
  if (new Set(ids).size !== ids.length) fail(label, `doublon ${ids.join(", ")}`);
  const moves = steps.map((s) => s.exercise.movementKey).filter(Boolean);
  if (new Set(moves).size !== moves.length) fail(label, "même mouvement deux fois");
  const min = input.short ? 3 : 4;
  if (steps.length < min) fail(label, `${steps.length} exercices seulement`);
  if (steps.length > 7) fail(label, `${steps.length} exercices, trop`);
  for (const s of steps) {
    if (s.exercise.equipment === "haltere" || s.exercise.equipment === "poulie") fail(label, `matériel à aller chercher : ${s.exercise.name}`);
    if (s.exercise.equipment === "elastique" && !input.band && !s.substituted) fail(label, `élastique sans élastique : ${s.exercise.name}`);
    if (s.exercise.contraindications.some((z) => input.pain.includes(z))) fail(label, `contre-indiqué : ${s.exercise.name}`);
    if (!POSITION[s.exercise.id]) fail(label, `position inconnue : ${s.exercise.id}`);
    if (!s.reason) fail(label, `sans raison : ${s.exercise.name}`);
  }
  // Pas de geste de poussée dans une séance de tirage seule.
  const zones = input.zones ?? [];
  if (!zones.some((z) => z === "pecs" || z === "epaules") && zones.includes("dos")) {
    for (const id of ids) if (PUSH_ONLY.has(id)) fail(label, `poussée en séance de tirage : ${id}`);
  }
  // Allers-retours au sol : au plus trois changements debout ↔ sol sur la routine.
  const level = (id: string) => (POSITION[id] === "debout" || POSITION[id] === "barre" ? 0 : 1);
  let changes = 0;
  for (let i = 1; i < ids.length; i++) if (level(ids[i]) !== level(ids[i - 1])) changes++;
  if (changes > 3) fail(label, `${changes} passages debout/sol`);
  // Toutes les zones principales reçoivent au moins une préparation.
  return plan;
}

const PAINS: BodyZone[][] = [[], ["epaule"], ["genou"], ["bas-du-dos"], ["poignets"]];
let n = 0;
for (let mask = 1; mask < 1 << ZONE_ORDER.length; mask++) {
  const zones = ZONE_ORDER.filter((_, i) => mask & (1 << i)) as MuscleGroup[];
  for (const band of [false, true]) {
    for (const short of [false, true]) {
      for (const pain of PAINS) {
        for (const variant of [0, 1]) {
          check(`${zones.join("+")}${band ? " élastique" : ""}${short ? " court" : ""}${pain.length ? " douleur " + pain : ""} v${variant}`, {
            zones,
            lifts: [],
            pain,
            band,
            short,
            variant,
          });
          n++;
        }
      }
    }
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
