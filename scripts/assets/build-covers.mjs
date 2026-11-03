// Vignettes des cartes de l'accueil : l'image de démonstration la plus parlante de
// chaque séance, recadrée au plus près du personnage, sur fond papier carré.
// Usage : node scripts/assets/build-covers.mjs
import sharp from "sharp";

const PAPER = "#f7f6f2";
const COVERS = {
  push: "developpe-couche-depart",
  pull: "tractions-arrivee",
  legs: "squat-arrivee",
  haut: "developpe-militaire-arrivee",
  full: "souleve-de-terre-depart",
};

for (const [id, src] of Object.entries(COVERS)) {
  const trimmed = await sharp(`public/demos/${src}.webp`).trim({ background: PAPER, threshold: 18 }).toBuffer({ resolveWithObject: true });
  // sharp redimensionne avant d'étendre : on ajuste dans le carré, puis on ajoute la marge.
  await sharp(trimmed.data)
    .resize(296, 296, { fit: "contain", background: PAPER })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: PAPER })
    .webp({ quality: 82 })
    .toFile(`public/demos/covers/${id}.webp`);
  console.log(id, "←", src);
}
