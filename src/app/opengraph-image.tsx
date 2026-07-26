import { ImageResponse } from "next/og";
import { personal } from "@/lib/data";

export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0E14",
          backgroundImage:
            "linear-gradient(#1E2430 1px, transparent 1px), linear-gradient(90deg, #1E2430 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 15% 30%, rgba(0,217,181,0.16), transparent 55%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 600,
            color: "#00D9B5",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          AR<span style={{ color: "#00D9B5" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#E8EAED",
            marginTop: 28,
            letterSpacing: -2,
          }}
        >
          {personal.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#8B92A3",
            marginTop: 20,
            maxWidth: 900,
          }}
        >
          {personal.role}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["Java", "Spring Boot", "REST APIs", "Python"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#8B92A3",
                border: "1px solid #2A3140",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
