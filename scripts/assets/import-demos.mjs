// Importe les images de démonstration (générées par IA, voir docs/guides/demos-ia.md).
//
// Entrée : brand/demos/{clé}-depart.(png|jpg|jpeg|webp) et {clé}-arrivee.(…),
//          ou brand/demos/raw/{clé}.png (image double, départ à gauche, arrivée à droite)
// Sortie : public/demos/{clé}-depart.webp, {clé}-arrivee.webp (cadre 4:3, fond papier,
//          800 px de large) et lib/demos.ts (liste des clés complètes).
// Une clé n'est publiée que si ses deux images existent.
// Usage : node scripts/assets/import-demos.mjs
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";

const SRC = "brand/demos";
const OUT = "public/demos";
const W = 800, H = 600;
const PAPER = { r: 247, g: 246, b: 242, alpha: 1 };

// Ramène le fond de l'image (moyenne des quatre coins) à la couleur papier du site :
// les générations varient légèrement de teinte d'une image à l'autre.
async function paperize(file) {
  const img = sharp(file).flatten({ background: PAPER });
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
  const sum = [0, 0, 0];
  let n = 0;
  for (const [cx, cy] of [[0, 0], [info.width - 12, 0], [0, info.height - 12], [info.width - 12, info.height - 12]])
    for (let y = cy; y < cy + 12; y++)
      for (let x = cx; x < cx + 12; x++) {
        const i = (y * info.width + x) * info.channels;
        for (let c = 0; c < 3; c++) sum[c] += data[i + c];
        n++;
      }
  const target = [PAPER.r, PAPER.g, PAPER.b];
  return img.linear(sum.map((v, c) => target[c] / (v / n)), [0, 0, 0]);
}

if (!existsSync(SRC)) mkdirSync(SRC, { recursive: true });
mkdirSync(OUT, { recursive: true });

// Images doubles (brand/demos/raw/{clé}.png : départ à gauche, arrivée à droite) :
// découpées sur la colonne vide la plus proche du centre.
const RAW = `${SRC}/raw`;
const SPLIT = `${SRC}/split`; // moitiés découpées des images doubles (fichiers intermédiaires)
const framed = new Set(); // clés déjà cadrées en commun : pas de recadrage individuel
if (existsSync(RAW)) {
  for (const f of readdirSync(RAW).filter((f) => /^[a-z0-9-]+\.(png|jpe?g|webp)$/i.test(f) && f !== "douleur.png")) { // douleur : image unique de la carte d'accueil (build-covers)
    const key = f.replace(/\.(png|jpe?g|webp)$/i, "");
    const base = await (await paperize(`${RAW}/${f}`)).png().toBuffer();
    const { data, info } = await sharp(base).greyscale().raw().toBuffer({ resolveWithObject: true });
    let best = Math.floor(info.width / 2), bestInk = Infinity;
    for (let x = Math.floor(info.width * 0.35); x < info.width * 0.65; x++) {
      let ink = 0;
      for (let y = 0; y < info.height; y++) if (data[y * info.width + x] < 200) ink++;
      // À encre égale, préfère la colonne la plus centrée.
      const score = ink * 1000 + Math.abs(x - info.width / 2);
      if (score < bestInk) (bestInk = score), (best = x);
    }
    // Cadre commun aux deux moitiés (union des zones dessinées) : même échelle et même
    // ligne de sol, pour que l'alternance départ/arrivée ne fasse pas sauter le personnage.
    const box = (x0, x1) => {
      let l = x1, r = x0, t = info.height, btm = 0;
      for (let y = 0; y < info.height; y++)
        for (let x = x0; x < x1; x++)
          if (data[y * info.width + x] < 225) {
            if (x - x0 < l) l = x - x0;
            if (x - x0 > r) r = x - x0;
            if (y < t) t = y;
            if (y > btm) btm = y;
          }
      return { l, r, t, btm };
    };
    const a = box(0, best), b = box(best, info.width);
    const l = Math.min(a.l, b.l), r = Math.max(a.r, b.r), t = Math.min(a.t, b.t), btm = Math.max(a.btm, b.btm);
    const width = Math.min(r - l + 1, best - l, info.width - best - l), height = btm - t + 1;
    mkdirSync(SPLIT, { recursive: true });
    await sharp(base).extract({ left: l, top: t, width, height }).png().toFile(`${SPLIT}/${key}-depart.png`);
    await sharp(base).extract({ left: best + l, top: t, width, height }).png().toFile(`${SPLIT}/${key}-arrivee.png`);
    framed.add(key);
  }
}

// Paires posées à la main dans brand/demos/, puis moitiés découpées (prioritaires).
const files = [SRC, SPLIT]
  .filter((d) => existsSync(d))
  .flatMap((d) => readdirSync(d).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).map((f) => ({ d, f })));
const byKey = new Map();
for (const { d, f } of files) {
  const m = f.match(/^(.+)-(depart|arrivee)\.(png|jpe?g|webp)$/i);
  if (!m) {
    console.warn(`ignoré (nom attendu {clé}-depart|arrivee) : ${f}`);
    continue;
  }
  const [, key, pos] = m;
  byKey.set(key, { ...byKey.get(key), [pos.toLowerCase()]: `${d}/${f}` });
}

const done = {};
for (const [key, pair] of [...byKey].sort()) {
  if (!pair.depart || !pair.arrivee) {
    console.warn(`incomplet, non publié : ${key} (il manque ${pair.depart ? "arrivee" : "depart"})`);
    continue;
  }
  for (const pos of ["depart", "arrivee"]) {
    // 1. Retire les marges uniformes et met le dessin à l'échelle (marge de 30 px).
    let img = framed.has(key) ? sharp(pair[pos]) : await paperize(pair[pos]);
    if (!framed.has(key)) img = img.trim({ threshold: 18 });
    const { data, info } = await img.resize(W - 60, H - 60, { fit: "inside" }).toBuffer({ resolveWithObject: true });
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
  `// Généré par scripts/assets/import-demos.mjs : ne pas modifier à la main.
// Images de démonstration disponibles (clé → [largeur, hauteur]) ; les autres
// exercices gardent leur pictogramme.
export const DEMOS: Record<string, [number, number]> = {${body ? `\n${body}\n` : ""}};
`,
);
console.log(`${Object.keys(done).length} démonstrations publiées.`);
