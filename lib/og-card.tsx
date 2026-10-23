import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgCardOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
}

// Mêmes codes que le site : magnésie, fonte, et la barre qui se charge disque
// après disque aux couleurs des phases (vert, jaune, bleu, puis le rouge du
// travail) — reconnaissable en vignette dans un fil Reddit ou WhatsApp.
const PAPER = "#f4f5f2";
const INK = "#1d2125";
const MUTED = "#5f666d";
const BAR = "#c4c9c6";
const PLATES: [string, number, number][] = [
  ["#2f9a48", 130, 24],
  ["#2f9a48", 130, 24],
  ["#e8b417", 168, 24],
  ["#e8b417", 168, 24],
  ["#1f5fbf", 210, 28],
  ["#1f5fbf", 210, 28],
  ["#c8202a", 210, 32],
];

// Geist (OFL), copiée depuis le paquet geist : le moteur d'images n'a sinon
// qu'une graisse, et les titres perdent toute présence.
const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function createOgCard({ eyebrow, title, subtitle }: OgCardOptions) {
  const [black, medium] = await Promise.all([font("Geist-Black.ttf"), font("Geist-Medium.ttf")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `4px solid ${INK}`, paddingBottom: 18 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 900, letterSpacing: "-0.02em" }}>
            Warmup
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: MUTED }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 700 }}>
          <div style={{ display: "flex", fontSize: 74, lineHeight: 0.94, fontWeight: 900, letterSpacing: "-0.035em" }}>
            {title}
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 30, lineHeight: 1.3, fontWeight: 500 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: MUTED, fontSize: 24, fontWeight: 500 }}>
            Gratuit, sans compte, fonctionne hors ligne
          </div>
        </div>

        {/* Barre chargée, à droite */}
        <div style={{ position: "absolute", right: 72, top: 200, display: "flex", alignItems: "center" }}>
          <div style={{ width: 40, height: 14, background: BAR, borderRadius: 4 }} />
          <div style={{ width: 12, height: 60, background: MUTED, borderRadius: 3, marginLeft: 4 }} />
          {PLATES.map(([color, h, w], i) => (
            <div key={i} style={{ width: w, height: h, background: color, borderRadius: 5, marginLeft: 5 }} />
          ))}
          <div style={{ width: 60, height: 14, background: BAR, marginLeft: 5, borderRadius: 4 }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: black, weight: 900, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
