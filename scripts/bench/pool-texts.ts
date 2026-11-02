import { exercises } from "@/lib/warmup-data";
import { COVERS } from "@/lib/prep-catalog";
for (const e of exercises.filter((x) => COVERS[x.id])) console.log(`\n${e.id} — ${e.name} [${e.reps ?? e.durationSeconds + "s"}, ${e.durationSeconds}s]\n  ${e.description}${e.fallback ? "\n  SANS ÉLASTIQUE: " + e.fallback : ""}`);
