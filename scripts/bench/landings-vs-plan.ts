import { buildSessionPlan } from "@/lib/session-engine";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";
for (const slug of LANDING_SLUGS) {
  const l = LANDINGS[slug];
  const plan = buildSessionPlan({ zones: l.zones, template: l.template, equipment: l.equipment, lifts: [], pain: [], band: false, short: false, variant: 0 });
  const names = plan.phases.flatMap((p) => p.steps).map((s) => (s.kind === "prep" ? s.exercise.name : ""));
  console.log(`\n## ${slug} (${plan.minutes} min)\nPLAN: ${names.join(" / ")}\nEN BREF: ${l.keyAnswer}`);
}
