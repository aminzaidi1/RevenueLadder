"use client"

import { Globe, Search, PenTool, Share2, Mail, Mic, MessageSquare, Workflow, Bot, Layers, Server, Sparkles, CheckCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Service {
  icon: LucideIcon
  h: string
  items: string[]
}

const SERVICES: Service[] = [
  {
    icon: Globe, h: "Your website, built and maintained",
    items: ["New pages and sections shipped fast", "CMS so your team can update it", "Weekly updates so nothing goes stale", "Mobile-perfect, fast-loading by default"],
  },
  {
    icon: Search, h: "Your search rankings, climbing",
    items: ["Technical audit in month one", "Local and service-page strategy", "Content briefed, written, and indexed", "A two-minute monthly report you actually read"],
  },
  {
    icon: PenTool, h: "Your copy, written and ready to use",
    items: ["Web pages that sell, not just sit there", "Blog posts driving organic traffic", "Ad copy tested and optimised", "Lead magnets your audience actually wants"],
  },
  {
    icon: Share2, h: "Your social pipeline, running every week",
    items: ["Posts written, designed, and scheduled", "Reels and carousels cut from your long-form", "Captions in your voice, not a bot's", "Cross-posted to five channels, automatically"],
  },
  {
    icon: Mail, h: "Your emails going out on autopilot",
    items: ["Nurture sequences warming leads while you sleep", "Sales emails that convert, not collect opens", "Newsletters your list actually reads", "Follow-ups that never fall through the cracks"],
  },
  {
    icon: Mic, h: "Your phones answered, even at 11pm",
    items: ["UK-accent voice agent, on 24/7", "Calendar-aware booking and rescheduling", "Hand-off to a human when it matters", "Voicemail summaries straight to your inbox"],
  },
  {
    icon: MessageSquare, h: "Your enquiries triaged, day or night",
    items: ["Chatbots trained on your site, docs, and FAQs", "Booking and qualifying handled on the page", "Hand-off to inbox or WhatsApp", "Every transcript readable in one place"],
  },
  {
    icon: Workflow, h: "Your tools, finally talking to each other",
    items: ["CRM workflows that actually work", "Zapier, Make, and direct API integrations", "Client onboarding on autopilot", "Internal alerts the team can't ignore"],
  },
  {
    icon: Bot, h: "Your AI agents, working in the background",
    items: ["Custom agents on your own data", "Drafts emails, summarises calls, files notes", "Live where your team already works", "Quiet on the boring days, fast on the bad ones"],
  },
  {
    icon: Layers, h: "Your internal app, built to fit",
    items: ["Tools that replace your spreadsheet", "Auth, billing, integrations baked in", "Built to hand over, not lock in", "Designed by people who will use it daily"],
  },
  {
    icon: Server, h: "Your hosting and uptime, looked after",
    items: ["Managed hosting on UK infrastructure", "Backups, SSL, weekly health checks", "Live monitoring with on-call cover", "A real person on the phone when it breaks"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="rl-section-pad" style={{ background: "var(--rl-bg-warm)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, margin: "0 auto 56px", textAlign: "center", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-forest)", background: "var(--rl-forest-tint)",
            padding: "5px 14px", borderRadius: 9999,
          }}>
            What&apos;s running for you
          </span>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
            fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-.025em",
            color: "var(--rl-fg-1)",
          }}>
            Everything a small business needs —{" "}
            <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>handled.</em>
          </h2>
          <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 640 }}>
            Not a list of services. A list of things you&apos;ll never have to worry about again.
          </p>
        </div>

        <div className="rl-grid-3">
          {SERVICES.map(({ icon: Icon, h, items }) => (
            <div key={h} style={{
              background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
              borderRadius: 20, padding: 26,
              display: "flex", flexDirection: "column", gap: 14,
              transition: "all var(--rl-dur-slow) var(--rl-ease-out)",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "var(--rl-gold)"
                el.style.boxShadow = "var(--rl-shadow-lg)"
                el.style.transform = "translateY(-3px)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "var(--rl-border-soft)"
                el.style.boxShadow = ""
                el.style.transform = ""
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--rl-forest-tint)", color: "var(--rl-forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700, fontSize: 18, letterSpacing: "-.01em", color: "var(--rl-fg-1)", minHeight: 44, lineHeight: 1.2 }}>
                {h}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, paddingTop: 4 }}>
                {items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>
                    <CheckCircle size={13} strokeWidth={2.5} style={{ color: "var(--rl-forest)", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured dark tile */}
          <div style={{
            background: "var(--rl-forest-ink)", border: "2px solid transparent",
            borderRadius: 20, padding: 26,
            display: "flex", flexDirection: "column", gap: 14,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-ladder)", opacity: 0.35, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,196,37,.16)", color: "var(--rl-gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={20} />
              </div>
              <h4 style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700, fontSize: 18, letterSpacing: "-.01em", color: "#fff" }}>
                Something we haven&apos;t listed?
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, paddingTop: 4 }}>
                {[
                  "Bring us the brief; we'll quote it",
                  "Fixed price, fixed scope, no retainer-creep",
                  "30-day money-back, same as everything else",
                  "Hand-built from Bangor, like the rest of it",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,.78)", lineHeight: 1.5 }}>
                    <CheckCircle size={13} strokeWidth={2.5} style={{ color: "var(--rl-gold)", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{ color: "var(--rl-gold)", fontWeight: 700, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, textDecoration: "none" }}>
                Tell us what you need
              </a>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 40, fontStyle: "italic", fontSize: 15, color: "var(--rl-fg-2)" }}>
          …and a handful we don&apos;t put on the brochure. Bring us the brief.
        </p>
      </div>
    </section>
  )
}
