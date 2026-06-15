import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudyCTAProps } from "./types"

export function CaseStudyCTA({ eyebrow, title, body, primary, secondary }: CaseStudyCTAProps) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", paddingBottom: 80 }} className="rl-px">
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--rl-grad-hero), var(--rl-forest-ink)",
        borderRadius: 32,
        padding: "80px 64px",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "var(--rl-pattern-dots-dark)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: -150, top: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: "var(--rl-pattern-ladder)",
          opacity: 0.28,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <span style={{
            display: "inline-block",
            fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-gold)",
            padding: "4px 12px",
            background: "rgba(255,196,37,.10)",
            border: "1px solid rgba(255,196,37,.20)",
            borderRadius: 6,
          }}>
            {eyebrow}
          </span>

          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontWeight: 900,
            fontSize: "clamp(34px, 4.0vw, 54px)",
            lineHeight: 1.05, letterSpacing: "-.03em",
            color: "#fff",
            maxWidth: 720, margin: "16px auto 0",
          }}>
            {title}
          </h2>

          <p style={{
            fontSize: 17, color: "rgba(255,255,255,.58)", lineHeight: 1.58,
            maxWidth: 520, margin: "18px auto 0",
          }}>
            {body}
          </p>

          <div style={{
            display: "flex", gap: 12, justifyContent: "center",
            flexWrap: "wrap", marginTop: 32,
          }}>
            <a
              href={primary.href}
              {...(primary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 52, padding: "0 24px",
                fontFamily: "var(--rl-font-body)",
                fontWeight: 700, fontSize: 15,
                borderRadius: 14,
                background: "var(--rl-gold)",
                color: "var(--rl-forest)",
                textDecoration: "none",
                boxShadow: "var(--rl-shadow-gold)",
              }}
            >
              {primary.label} <ArrowRight size={16} aria-hidden="true" />
            </a>
            {secondary && (
              <Link href={secondary.href} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 52, padding: "0 24px",
                fontFamily: "var(--rl-font-body)",
                fontWeight: 700, fontSize: 15,
                borderRadius: 14,
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,.20)",
                textDecoration: "none",
              }}>
                {secondary.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
