import { Quote } from "lucide-react"
import type { CaseStudyTestimonial as CaseStudyTestimonialData } from "./types"

export function CaseStudyTestimonial({ quote, attribution, location }: CaseStudyTestimonialData) {
  return (
    <section style={{ padding: "48px 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--rl-forest-ink)",
          borderRadius: 32,
          padding: "72px 64px",
          textAlign: "center",
          border: "2px solid rgba(255,255,255,.06)",
          borderTop: "4px solid var(--rl-gold)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "var(--rl-pattern-dots-dark)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: -80, right: -80,
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,196,37,.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <div style={{
              color: "var(--rl-gold)", opacity: 0.35,
              display: "flex", justifyContent: "center",
              marginBottom: 24,
            }}>
              <Quote size={52} strokeWidth={1.5} aria-hidden="true" />
            </div>

            <blockquote style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 40px)",
              lineHeight: 1.32,
              letterSpacing: "-.018em",
              color: "#fff",
              fontStyle: "italic",
              maxWidth: 860,
              margin: "0 auto",
            }}>
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div style={{
              marginTop: 32,
              fontSize: 15, color: "rgba(255,255,255,.85)", fontWeight: 700,
            }}>
              {attribution}
            </div>
            {location && (
              <div style={{
                fontSize: 12, color: "rgba(255,255,255,.40)",
                marginTop: 8, letterSpacing: ".04em",
              }}>
                {location}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
