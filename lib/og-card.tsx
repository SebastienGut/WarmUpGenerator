import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgCardOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function createOgCard({ eyebrow, title, subtitle }: OgCardOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 16%, rgba(163,255,18,0.24), transparent 30%), radial-gradient(circle at 90% 92%, rgba(163,255,18,0.14), transparent 34%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 18,
              background: "rgba(163,255,18,0.10)",
              border: "1px solid rgba(163,255,18,0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#A3FF12">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.18em" }}>
              WARMUP GENERATOR
            </div>
            <div style={{ color: "#A3FF12", fontSize: 18, fontWeight: 800, letterSpacing: "0.12em" }}>
              {eyebrow}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          <div
            style={{
              maxWidth: 960,
              fontSize: 82,
              lineHeight: 0.9,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          <div style={{ maxWidth: 860, color: "#D7D7DA", fontSize: 30, lineHeight: 1.25, fontWeight: 650 }}>
            {subtitle}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 24,
            color: "#A1A1A6",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <span>Plans gratuits en 5 minutes</span>
          <span style={{ color: "#A3FF12" }}>Sans inscription</span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
