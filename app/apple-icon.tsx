import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a2f4f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 130,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
            display: "flex",
          }}
        >
          D
        </div>
        <div
          style={{
            width: 92,
            height: 8,
            background: "#c8102e",
            marginTop: 8,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
