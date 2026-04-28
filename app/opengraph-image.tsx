import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Warmup Generator — Échauffement musculation gratuit & personnalisé";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Halo lime top */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 0,
            right: 0,
            height: 500,
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(163, 255, 18, 0.22), transparent 70%)",
          }}
        />
        {/* Halo lime bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 500,
            height: 400,
            background:
              "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(163, 255, 18, 0.12), transparent 70%)",
          }}
        />

        {/* Top row: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "rgba(163, 255, 18, 0.10)",
              border: "1.5px solid rgba(163, 255, 18, 0.25)",
            }}
          >
            {/* Lightning bolt */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#A3FF12">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            Warmup / Generator
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#5A5A60",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 24,
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            Plan personnalisé · 30 secondes · Gratuit
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Échauffement</span>
            <span>
              musculation
            </span>
            <span
              style={{
                color: "#A3FF12",
                fontStyle: "italic",
              }}
            >
              sur mesure.
            </span>
          </div>
        </div>

        {/* Bottom row: tagline */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#A1A1A6",
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            Adapté à tes muscles, ton objectif, tes zones sensibles.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 26px",
              borderRadius: 999,
              background: "#A3FF12",
              color: "#000",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#000">
              <path d="M0 0 L14 8 L0 16 Z" />
            </svg>
            Démarrer
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
