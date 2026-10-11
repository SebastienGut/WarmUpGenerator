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

// Mêmes codes que le site : papier, encre, accent vermillon, et la barre
// chargée aux couleurs des disques de compétition — reconnaissable en
// vignette dans un fil Reddit ou WhatsApp.
const PAPER = "#f3f0e8";
const INK = "#17150f";
const MUTED = "#55514a";
const ACCENT = "#d23a14";
const PLATES: [string, number, number][] = [
  ["#d3272b", 200, 34],
  ["#1f5fbf", 200, 30],
  ["#e8b417", 172, 26],
  ["#2f9a48", 144, 22],
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
            WARMUP<span style={{ color: ACCENT }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 900, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 820 }}>
          <div style={{ display: "flex", fontSize: 74, lineHeight: 0.94, fontWeight: 900, letterSpacing: "-0.035em", textTransform: "uppercase" }}>
            {title}
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 30, lineHeight: 1.3, fontWeight: 500 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: MUTED, fontSize: 24, fontWeight: 500 }}>
            Gratuit · sans compte · fonctionne hors ligne
          </div>
        </div>

        {/* Barre chargée, à droite */}
        <div style={{ position: "absolute", right: 72, top: 190, display: "flex", alignItems: "center" }}>
          <div style={{ width: 70, height: 14, background: "#bdb6a7", borderRadius: 4 }} />
          {PLATES.map(([color, h, w], i) => (
            <div key={i} style={{ width: w, height: h, background: color, borderRadius: 6, marginLeft: 6 }} />
          ))}
          <div style={{ width: 40, height: 22, background: "#bdb6a7", marginLeft: 6, borderRadius: 4 }} />
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
