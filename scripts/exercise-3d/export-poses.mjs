// Exporte les postures des pictogrammes (lib/figures.ts) en JSON pour Blender.
// Usage : node --experimental-strip-types scripts/exercise-3d/export-poses.mjs <sortie.json>
import { writeFileSync } from "node:fs";
import { FIGURES, FALLBACK_FIGURE } from "../../lib/figures.ts";

const out = process.argv[2] ?? "scripts/exercise-3d/poses.json";
writeFileSync(out, JSON.stringify({ ...FIGURES, _fallback: FALLBACK_FIGURE }, null, 1));
console.log(`${Object.keys(FIGURES).length} figures -> ${out}`);
