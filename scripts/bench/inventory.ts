import { exercises } from "@/lib/warmup-data";
for (const e of exercises) {
  console.log([e.id, e.name, e.category, (e.prepRoles ?? []).join("+"), (e.prepFocus ?? []).join("+"), e.equipment, e.trainingValue ?? "-", e.reps ?? e.durationSeconds + "s", (e.muscles ?? []).join("+")].join(" | "));
}
console.log(exercises.length);
