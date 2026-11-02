import { buildSessionPlan } from "@/lib/session-engine";
import { LANDINGS, LANDING_SLUGS } from "@/lib/content/landings";

for (const slug of LANDING_SLUGS) {
  const l = LANDINGS[slug];
  const plan = buildSessionPlan({ zones: l.zones, lifts: [], pain: [], band: !!l.band, short: false, variant: 0 });
  const short = buildSessionPlan({ zones: l.zones, lifts: [], pain: [], band: !!l.band, short: true, variant: 0 });
  console.log(slug.padEnd(14), plan.minutes, "min", plan.phases.reduce((n, p) => n + p.steps.length, 0), "ex | court", short.minutes, "min");
}
