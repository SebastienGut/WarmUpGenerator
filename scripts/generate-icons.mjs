// Génère les icônes de l'application (PWA, Apple, logo du schema Organization)
// dans l'identité du site : un disque de 25 kg vu de face, rouge compétition,
// sur fond papier. Usage : node scripts/generate-icons.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const PAPER = "#f3f0e8";
const INK = "#17150f";
const RED = "#d3272b";

/** `disc` : part de l'icône occupée par le disque (zone sûre réduite pour maskable). */
function icon(size, disc) {
  const d = Math.round(size * disc);
  const hub = Math.round(d * 0.3);
  const ring = Math.max(2, Math.round(d * 0.06));
  return new ImageResponse(
    h(
      "div",
      { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: PAPER } },
      h(
        "div",
        {
          style: {
            width: d,
            height: d,
            borderRadius: d / 2,
            background: RED,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // anneau intérieur, comme le rebord moulé d'un vrai disque
            boxShadow: `inset 0 0 0 ${Math.round(d * 0.08)}px rgba(0,0,0,0.12)`,
          },
        },
        h("div", { style: { width: hub, height: hub, borderRadius: hub / 2, background: PAPER, border: `${ring}px solid ${INK}` } }),
      ),
    ),
    { width: size, height: size },
  );
}

const out = [
  ["public/icons/logo-pwa-192.png", 192, 0.82],
  ["public/icons/logo-pwa-512.png", 512, 0.82],
  ["public/icons/logo-pwa-maskable-512.png", 512, 0.6],
  ["public/icons/maskable-512.png", 512, 0.6],
  ["public/icons/logo-apple-touch.png", 180, 0.74],
  ["app/apple-icon.png", 180, 0.74],
  ["public/logo.png", 512, 0.82],
];

for (const [file, size, disc] of out) {
  const buf = Buffer.from(await icon(size, disc).arrayBuffer());
  await fs.writeFile(path.resolve(file), buf);
  console.log(`${file}  ${size}px  ${buf.length} o`);
}
