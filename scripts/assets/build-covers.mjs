// Vignettes des cartes de l'accueil : l'image de démonstration la plus parlante de
// chaque séance, détourée (fond papier rendu transparent par remplissage depuis les
// bords, les contours noirs du dessin servent de barrière) et recadrée au plus près.
// Usage : node scripts/assets/build-covers.mjs
import sharp from "sharp";

const PAPER = [247, 246, 242];
const TOL = 34; // écart toléré avec le papier (ombre du sol comprise)
const COVERS = {
  push: "developpe-couche-depart",
  pull: "tractions-arrivee",
  legs: "squat-arrivee",
  haut: "developpe-militaire-arrivee",
  full: "souleve-de-terre-depart",
};

for (const [id, src] of Object.entries(COVERS)) {
  const { data, info } = await sharp(`public/demos/${src}.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const near = (i) => Math.abs(data[i] - PAPER[0]) + Math.abs(data[i + 1] - PAPER[1]) + Math.abs(data[i + 2] - PAPER[2]) < TOL * 3 / 2;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p] || !near(p * 4)) continue;
    seen[p] = 1;
    data[p * 4 + 3] = 0;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  // Poches de fond enfermées par le dessin (sous un banc, dans un cadre) : toute zone
  // papier assez grande part aussi ; les petites (blanc des chaussures, reflets) restent.
  const MIN = Math.round(w * h * 0.004);
  const comp = new Uint8Array(w * h);
  for (let s0 = 0; s0 < w * h; s0++) {
    if (seen[s0] || comp[s0] || !near(s0 * 4)) continue;
    const region = [];
    const st = [s0];
    comp[s0] = 1;
    while (st.length) {
      const p = st.pop();
      region.push(p);
      const x = p % w;
      for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p >= w ? p - w : -1, p < w * (h - 1) ? p + w : -1]) {
        if (q < 0 || comp[q] || seen[q] || !near(q * 4)) continue;
        comp[q] = 1;
        st.push(q);
      }
    }
    if (region.length >= MIN) for (const p of region) { seen[p] = 1; data[p * 4 + 3] = 0; }
  }
  // Lisière : les pixels clairs collés au fond deviennent semi-transparents (pas de halo blanc sur l'aplat).
  for (let p = 0; p < w * h; p++) {
    if (seen[p]) continue;
    const x = p % w;
    const edge = (x > 0 && seen[p - 1]) || (x < w - 1 && seen[p + 1]) || (p >= w && seen[p - w]) || (p < w * (h - 1) && seen[p + w]);
    if (edge && near(p * 4)) data[p * 4 + 3] = 90;
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .resize(360, 360, { fit: "inside" })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(`public/demos/accueil/${id}.webp`);
  console.log(id, "←", src);
}
