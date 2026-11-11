import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Aplat de l'affiche : mêmes couleurs que les bandeaux des pages (app/globals.css). */
export type OgTone = "red" | "blue" | "green" | "yellow" | "black";

interface OgCardOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: OgTone;
}

// Direction B, « affiche de compétition » : un grand aplat aux couleurs des disques,
// titre en Anton, et les disques en pastilles rondes, poids écrit dessus (comme le
// composant Plates). Pas de barre chargée dessinée (refusée par Seb).
// Les couleurs reprennent les tokens de app/globals.css : le moteur d'images ne lit
// pas les variables CSS.
const PAPER = "#f7f6f2";
const INK = "#141414";
const MUTED = "#45474b";
const TONES: Record<OgTone, { bg: string; fg: string }> = {
  red: { bg: "#c8202a", fg: "#ffffff" },
  blue: { bg: "#1f5fbf", fg: "#ffffff" },
  green: { bg: "#1e7a37", fg: "#ffffff" },
  yellow: { bg: "#e8b417", fg: "#141414" },
  black: { bg: "#141414", fg: "#ffffff" },
};
// Disques de compétition : 25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc.
const PLATES: { kg: string; bg: string; fg: string; size: number }[] = [
  { kg: "25", bg: "#d3272b", fg: "#ffffff", size: 112 },
  { kg: "20", bg: "#1f5fbf", fg: "#ffffff", size: 100 },
  { kg: "15", bg: "#e8b417", fg: "#141414", size: 88 },
  { kg: "10", bg: "#2f9a48", fg: "#ffffff", size: 76 },
  { kg: "5", bg: "#f4f2ec", fg: "#141414", size: 64 },
];

const asset = (...p: string[]) => readFile(join(process.cwd(), ...p));

export async function createOgCard({ eyebrow, title, subtitle, tone = "blue" }: OgCardOptions) {
  // Anton (OFL) pour les titres, Geist (OFL) pour le texte : fichiers locaux, le
  // moteur d'images ne charge pas les polices du site.
  const [anton, medium, logo] = await Promise.all([
    asset("assets/fonts", "Anton-Regular.ttf"),
    asset("assets/fonts", "Geist-Medium.ttf"),
    asset("public", "logo-mark.png"),
  ]);
  const { bg, fg } = TONES[tone];
  const titleSize = title.length > 30 ? 82 : title.length > 22 ? 96 : 110;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: PAPER, fontFamily: "Geist" }}>
        {/* Aplat d'affiche */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 392, background: bg, color: fg, padding: "44px 72px 46px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- rendu par le moteur d'images, pas par le navigateur */}
              <img src={`data:image/png;base64,${logo.toString("base64")}`} width={80} height={48} alt="" />
              <div style={{ display: "flex", flexDirection: "column", fontFamily: "Anton", fontSize: 30, lineHeight: 0.95 }}>
                <span>Warmup</span>
                <span>Generator</span>
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 500 }}>{eyebrow}</div>
          </div>
          <div style={{ display: "flex", fontFamily: "Anton", fontSize: titleSize, lineHeight: 0.95, maxWidth: 1060, transform: "skewX(-6deg)", marginLeft: 8 }}>
            {title}
          </div>
        </div>

        {/* Pied : accroche et disques */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", padding: "0 72px", color: INK }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
            <div style={{ display: "flex", fontSize: 28, lineHeight: 1.25, fontWeight: 500 }}>{subtitle}</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 500, color: MUTED }}>Gratuit, sans compte, hors ligne</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {PLATES.map((p) => (
              <div
                key={p.kg}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: p.size,
                  height: p.size,
                  borderRadius: p.size,
                  background: p.bg,
                  color: p.fg,
                  border: p.kg === "5" ? `3px solid ${INK}` : "none",
                  fontFamily: "Anton",
                  fontSize: Math.round(p.size * 0.36),
                }}
              >
                {p.kg}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
