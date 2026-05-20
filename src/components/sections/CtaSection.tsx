import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CtaSection() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px 64px" }}>
      <div style={{
        background: "var(--rl-grad-hero)", color: "#fff",
        borderRadius: 32, padding: "80px 60px",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-dots-dark)", backgroundSize: "26px 26px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -150, top: -120, width: 480, height: 480, backgroundImage: "var(--rl-pattern-ladder)", opacity: 0.35, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-gold)", background: "rgba(255,196,37,.12)",
            padding: "5px 14px", borderRadius: 9999, marginBottom: 18,
          }}>
            Ready when you are
          </span>

          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
            fontSize: "clamp(38px, 4.5vw, 60px)", lineHeight: 1.05, letterSpacing: "-.03em",
            maxWidth: 800, margin: "0 auto",
          }}>
            Stop running the admin.<br />
            <em style={{ fontStyle: "italic", color: "var(--rl-gold)", fontWeight: 900 }}>Start running the business.</em>
          </h2>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,.62)", lineHeight: 1.55, marginTop: 18, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
            A 30-minute call. We&apos;ll walk your stack, tell you what&apos;s leaking, and send you a written plan within 48 hours. No hard pitch. From £499 / mo, with a 30-day money-back.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--rl-gold)", color: "var(--rl-forest)",
              fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 16,
              height: 58, padding: "0 32px", borderRadius: 16,
              boxShadow: "0 2px 8px rgba(255,196,37,.30)",
              textDecoration: "none",
            }}>
              Book a 30-min strategy call <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,.30)",
              fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 16,
              height: 58, padding: "0 32px", borderRadius: 16,
              textDecoration: "none",
            }}>
              See pricing <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,.5)", display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {["30-day money-back", "No long-term contract", "Cancel anytime"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <CheckCircle size={12} style={{ color: "var(--rl-gold)" }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
