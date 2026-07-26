import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0E14",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#E8EAED",
            letterSpacing: -1,
          }}
        >
          AR<span style={{ color: "#00D9B5" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
