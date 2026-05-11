import { ImageResponse } from "next/og";

export const alt = "DECORATHERM — Isolation thermique extérieure & ravalement de façade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a2f4f",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle red accent corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            height: 220,
            background: "#c8102e",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "#c8102e",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 32,
            display: "flex",
          }}
        >
          DECORATHERM · Qualibat RGE
        </div>

        {/* Big headline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1.02,
            marginBottom: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Isolation & ravalement</div>
          <div style={{ display: "flex" }}>de façade.</div>
        </div>

        {/* Subline */}
        <div
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: 880,
            display: "flex",
          }}
        >
          Installateur certifié · ITE, isolation intérieure & ravalement · France entière
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 32, height: 3, background: "#c8102e" }} />
          decoratherm.com
        </div>
      </div>
    ),
    { ...size }
  );
}
