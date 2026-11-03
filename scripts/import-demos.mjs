// Importe les images de démonstration (générées par IA, voir docs/demos-ia.md).
//
// Entrée : brand/demos/{clé}-depart.(png|jpg|jpeg|webp) et {clé}-arrivee.(…)
// Sortie : public/demos/{clé}-depart.webp, {clé}-arrivee.webp (cadre 4:3, fond papier,
//          800 px de large) et lib/demos.ts (liste des clés complètes).
// Une clé n'est publiée que si ses deux images existent.
// Usage : node scripts/import-demos.mjs
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";

const SRC = "brand/demos";
const OUT = "public/demos";
const W = 800, H = 600;
const PAPER = { r: 247, g: 246, b: 242, alpha: 1 };

if (!existsSync(SRC)) mkdirSync(SRC, { recursive: true });
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const byKey = new Map();
for (const f of files) {
  const m = f.match(/^(.+)-(depart|arrivee)\.(png|jpe?g|webp)$/i);
  if (!m) {
    console.warn(`ignoré (nom attendu {clé}-depart|arrivee) : ${f}`);
    continue;
  }
  const [, key, pos] = m;
  byKey.set(key, { ...byKey.get(key), [pos.toLowerCase()]: `${SRC}/${f}` });
}

const done = {};
for (const [key, pair] of [...byKey].sort()) {
  if (!pair.depart || !pair.arrivee) {
    console.warn(`incomplet, non publié : ${key} (il manque ${pair.depart ? "arrivee" : "depart"})`);
    continue;
  }
  for (const pos of ["depart", "arrivee"]) {
    // 1. Retire les marges uniformes et met le dessin à l'échelle (marge de 30 px).
    const { data, info } = await sharp(pair[pos])
      .flatten({ background: PAPER })
      .trim({ threshold: 18 })
      .resize(W - 60, H - 60, { fit: "inside" })
      .toBuffer({ resolveWithObject: true });
    // 2. Le centre dans un cadre fixe 4:3, fond papier : toutes les démos ont la même taille.
    const left = Math.floor((W - info.width) / 2), top = Math.floor((H - info.height) / 2);
    await sharp(data)
      .extend({ left, right: W - info.width - left, top, bottom: H - info.height - top, background: PAPER })
      .webp({ quality: 82 })
      .toFile(`${OUT}/${key}-${pos}.webp`);
  }
  done[key] = [W, H];
}

const body = Object.entries(done).map(([k, v]) => `  "${k}": [${v.join(", ")}],`).join("\n");
writeFileSync(
  "lib/demos.ts",
  `// Généré par scripts/import-demos.mjs : ne pas modifier à la main.
// Images de démonstration disponibles (clé → [largeur, hauteur]) ; les autres
// exercices gardent leur pictogramme.
export const DEMOS: Record<string, [number, number]> = {${body ? `\n${body}\n` : ""}};
`,
);
console.log(`${Object.keys(done).length} démonstrations publiées.`);
