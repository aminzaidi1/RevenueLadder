import { ImageResponse } from "next/og"

export const alt = "Revenue Ladder — Welsh Web & Automation Agency"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D1A10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Ladder stripe accent on the right */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "320px",
            background:
              "repeating-linear-gradient(90deg, rgba(255,196,37,0.06) 0px, rgba(255,196,37,0.06) 2px, transparent 2px, transparent 40px)",
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            color: "#FFC425",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 24px 0",
          }}
        >
          Welsh Web &amp; Automation Agency
        </p>

        {/* Brand name */}
        <h1
          style={{
            color: "#EDEAE5",
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 28px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Revenue{" "}
          <span style={{ color: "#FFC425" }}>Ladder</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: "#EDEAE5",
            opacity: 0.65,
            fontSize: 26,
            margin: 0,
            maxWidth: 640,
          }}
        >
          Precision-built websites, automation, and SEO for Welsh businesses.
        </p>

        {/* Domain */}
        <p
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            color: "#FFC425",
            opacity: 0.55,
            fontSize: 18,
            margin: 0,
          }}
        >
          revenueladder.co.uk
        </p>
      </div>
    ),
    { ...size }
  )
}
