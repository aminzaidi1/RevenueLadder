import { Briefcase, ShoppingCart, Home, Heart, Coffee, Scale, Wrench, Sparkles, GraduationCap, Cloud, ArrowRight, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Industry {
  Icon: LucideIcon
  nm: string
}

const INDUSTRIES: Industry[] = [
  { Icon: Briefcase,    nm: "Coaches & Consultants" },
  { Icon: ShoppingCart, nm: "E-commerce & Retail" },
  { Icon: Home,         nm: "Real Estate" },
  { Icon: Heart,        nm: "Healthcare & Wellness" },
  { Icon: Coffee,       nm: "Restaurants & Hospitality" },
  { Icon: Scale,        nm: "Legal & Finance" },
  { Icon: Wrench,       nm: "Home Services & Trades" },
  { Icon: Sparkles,     nm: "Agencies & Freelancers" },
  { Icon: GraduationCap, nm: "Education & Online Courses" },
  { Icon: Cloud,        nm: "SaaS & Tech Startups" },
]

export function IndustriesSection() {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg-warm)" }} id="industries">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, margin: "0 auto 56px", textAlign: "center", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-forest)", background: "var(--rl-forest-tint)",
            padding: "5px 14px", borderRadius: 9999,
          }}>
            Who we work with
          </span>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
            fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-.025em",
            color: "var(--rl-fg-1)",
          }}>
            Built for any small business that wants to grow<br />
            without <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>hiring a marketing team.</em>
          </h2>
          <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 640 }}>
            We work across ten industries because the playbook overlaps more than the brochure-makers like to admit.
            The website, the automations, the reporting — different copy, same engine.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
          {INDUSTRIES.map(({ Icon, nm }) => (
            <div key={nm} style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
              borderRadius: 9999, padding: "10px 18px",
              fontSize: 14, fontWeight: 600, color: "var(--rl-fg-1)",
            }}>
              <Icon size={15} style={{ color: "var(--rl-forest)", flexShrink: 0 }} />
              {nm}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "var(--rl-forest)", fontWeight: 700, fontSize: 14, textDecoration: "none",
          }}>
            View industry case studies <ArrowRight size={14} />
          </a>
        </div>

        <div style={{
          background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
          borderRadius: 20, padding: "28px 32px",
          display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "var(--rl-forest-tint)", color: "var(--rl-forest)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800,
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            flexShrink: 0,
          }}>
            DM
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <blockquote style={{ fontSize: 15, color: "var(--rl-fg-1)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
              &ldquo;We were burning two days a week on bookings and rescheduling. After RevenueLadder set up the
              voice agent and tied it into our calendar, both of us got our Tuesdays back. That alone paid the
              retainer for the year.&rdquo;
            </blockquote>
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--rl-fg-3)" }}>
              <b style={{ color: "var(--rl-fg-2)" }}>David Morgan</b> · Founder, Snowdon Trails Ltd. · Conwy
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} style={{ fill: "var(--rl-gold)", color: "var(--rl-gold)" }} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--rl-fg-3)" }}>Trustpilot · verified</div>
          </div>
        </div>

      </div>
    </section>
  )
}
