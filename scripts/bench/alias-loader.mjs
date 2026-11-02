// Résout l'alias « @/ » (racine du projet) et les imports sans extension pour
// exécuter le moteur avec node --experimental-strip-types, sans dépendance.
import { existsSync } from "node:fs";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve as resolvePath, dirname } from "node:path";

const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..", "..");

export async function resolve(specifier, context, next) {
  let target = null;
  if (specifier.startsWith("@/")) target = resolvePath(ROOT, specifier.slice(2));
  else if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:"))
    target = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier);
  if (target) {
    for (const ext of ["", ".ts", ".tsx", "/index.ts"]) {
      if (existsSync(target + ext) && !(ext === "" && !/\.[cm]?[jt]sx?$/.test(target))) return next(pathToFileURL(target + ext).href, context);
    }
  }
  return next(specifier, context);
}
