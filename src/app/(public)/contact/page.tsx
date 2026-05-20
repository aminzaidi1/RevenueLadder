import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/ContactForm"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact — RevenueLadder",
  description: "Get in touch with RevenueLadder. Tell us about your project and we will respond within one working day.",
}

const STEPS = [
  { n: "01", title: "We review your enquiry", body: "Every submission is read personally — no auto-responses, no sales scripts." },
  { n: "02", title: "Discovery call", body: "A focused 30-minute call to understand your goals, constraints, and timeline." },
  { n: "03", title: "Proposal", body: "A clear, fixed-price proposal within 48 hours of the discovery call." },
  { n: "04", title: "We get to work", body: "Kick-off within days, not weeks. You have a direct line to your build team throughout." },
]

export default function ContactPage() {
  return (
    <main style={{ background: "var(--rl-bg)", minHeight: "100vh" }}>
      <section className="rl-px" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 0 96px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--rl-forest)", marginBottom: 12 }}>
            Contact
          </p>
          <h1 style={{ fontFamily: "var(--rl-font-display)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "var(--rl-fg-1)", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-.02em" }}>
            Let&apos;s talk about your project
          </h1>
          <p style={{ fontSize: 17, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 560 }}>
            We work with Welsh and UK small businesses that are serious about growth. Tell us where you are and where you want to be.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="rl-contact-grid">

          {/* Left: form card */}
          <div style={{ background: "var(--rl-surface)", borderRadius: "var(--rl-radius-lg)", padding: "40px", boxShadow: "0 2px 16px rgba(0,0,0,.06)" }}>
            <h2 style={{ fontFamily: "var(--rl-font-display)", fontSize: 22, fontWeight: 800, color: "var(--rl-fg-1)", marginBottom: 28, letterSpacing: "-.01em" }}>
              Send an enquiry
            </h2>
            <ContactForm />
          </div>

          {/* Right: sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* What happens next card */}
            <div style={{ background: "var(--rl-forest-ink)", borderRadius: "var(--rl-radius-lg)", padding: "36px 32px" }}>
              <h2 style={{ fontFamily: "var(--rl-font-display)", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 28, letterSpacing: "-.01em" }}>
                What happens next
              </h2>
              <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 24 }}>
                {STEPS.map(({ n, title, body }, i) => (
                  <li key={n} style={{ display: "flex", gap: 16 }}>
                    <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: i === 0 ? "var(--rl-gold)" : "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? "var(--rl-forest-ink)" : "rgba(255,255,255,.5)", letterSpacing: ".04em" }}>{n}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.55 }}>{body}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 8, color: "var(--rl-gold)", fontSize: 13, fontWeight: 600 }}>
                <ArrowRight size={14} />
                <span>Typical response: same working day</span>
              </div>
            </div>

            {/* Contact details card */}
            <div style={{ background: "var(--rl-surface)", borderRadius: "var(--rl-radius-lg)", padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,.06)" }}>
              <h3 style={{ fontFamily: "var(--rl-font-display)", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--rl-fg-3)", marginBottom: 20 }}>
                Find us
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MapPin size={16} color="var(--rl-forest)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>Studio 4, The Foundry<br />Bangor, Gwynedd LL57</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Phone size={16} color="var(--rl-forest)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--rl-fg-2)" }}>+44 (0) 1248 000 000</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Mail size={16} color="var(--rl-forest)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--rl-fg-2)" }}>hello@revenueladder.co.uk</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Clock size={16} color="var(--rl-forest)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--rl-fg-2)" }}>Mon to Fri, 9am to 5pm GMT</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
