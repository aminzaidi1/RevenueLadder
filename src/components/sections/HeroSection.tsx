import Link from "next/link"
import { ArrowRight, Play, Zap, CheckCircle, Shield, Globe, Mic, Workflow, BarChart2, Inbox } from "lucide-react"

const PANEL_ROWS = [
  { icon: Globe,    label: "Website launch · Aber Coffee Co.",   sub: "Theme + CMS + 11 pages",          badge: "done",  badgeText: "Live" },
  { icon: Mic,      label: "Voice agent · Snowdon Trails",        sub: "Booking flow + handoff to staff",  badge: "done",  badgeText: "Live" },
  { icon: Workflow, label: "Lead pipeline · Bryn Eira B&B",       sub: "Form → CRM → Slack alert",         badge: "run",   badgeText: "Running" },
  { icon: BarChart2,label: "SEO audit · Dovey Marina",            sub: "Top 10 pages indexed, 4 fixes",    badge: "run",   badgeText: "Running" },
  { icon: Inbox,    label: "Social pipeline · Conwy Foods",       sub: "12 posts scheduled this week",     badge: "queue", badgeText: "Queued" },
]

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  done:  { background: "rgba(34,197,94,.12)",  color: "#86efac" },
  run:   { background: "rgba(255,196,37,.12)", color: "var(--rl-gold)" },
  queue: { background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.55)" },
}

const CITIES = ["Bangor", "Cardiff", "Conwy", "Swansea", "Manchester", "Bristol", "Aberystwyth", "Liverpool", "Wrexham", "Newport"]

const STATS = [
  { v: "48", suffix: "+", label: "Welsh & UK SMEs scaling with us" },
  { v: "£2.4", suffix: "m", label: "Client revenue automated · 2025" },
  { v: "97",  suffix: "%", label: "Voice-agent uptime, 12-month avg" },
  { v: "30",  suffix: "d", label: "From kickoff to a live launch" },
]

export function HeroSection() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
      {/* Dark hero slab */}
      <div className="rl-hero-slab" style={{
        position: "relative", margin: "24px 0 0", overflow: "hidden",
        borderRadius: 32, background: "var(--rl-grad-hero)", color: "#fff",
      }}>
        {/* Backgrounds */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "var(--rl-pattern-dots-dark)", backgroundSize: "24px 24px" }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "var(--rl-pattern-ladder)", opacity: 0.35,
          WebkitMaskImage: "linear-gradient(to bottom-left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
          maskImage: "linear-gradient(to bottom-left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
        }} />
        <div style={{
          position: "absolute", right: -100, top: -120, width: 460, height: 460,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255,196,37,.22) 0%, transparent 60%)",
          filter: "blur(8px)", pointerEvents: "none",
        }} />

        {/* 60/40 grid */}
        <div style={{ position: "relative", zIndex: 2 }} className="rl-hero-grid">
          {/* Left */}
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {[
                { icon: Zap, text: "AI that does the work" },
                { icon: CheckCircle, text: "Hand-built in Bangor" },
                { icon: Shield, text: "30-day money-back" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontWeight: 700, letterSpacing: ".04em",
                  background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.85)",
                  border: "1px solid rgba(255,255,255,.10)",
                  padding: "6px 12px", borderRadius: 999,
                }}>
                  <Icon size={12} style={{ color: "var(--rl-gold)" }} />
                  {text}
                </span>
              ))}
            </div>

            <h1 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
              fontSize: "clamp(48px, 6vw, 84px)", lineHeight: 1.0, letterSpacing: "-.035em", color: "#fff",
            }}>
              Stop Managing.<br />
              <em style={{ fontStyle: "italic", color: "var(--rl-gold)", fontWeight: 900 }}>Start Climbing.</em>
            </h1>

            <p style={{ fontSize: 19, color: "rgba(255,255,255,.66)", lineHeight: 1.6, maxWidth: 560, marginTop: 26 }}>
              We build the systems, automations, and digital infrastructure that let small businesses compete like enterprises — without the overhead.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--rl-gold)", color: "var(--rl-forest)",
                fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 15,
                height: 50, padding: "0 26px", borderRadius: 14,
                boxShadow: "0 2px 8px rgba(255,196,37,.30)",
                textDecoration: "none",
              }}>
                Book a 30-min call <ArrowRight size={16} />
              </Link>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,.30)",
                fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 15,
                height: 50, padding: "0 26px", borderRadius: 14, cursor: "pointer",
              }}>
                <Play size={14} /> Watch 2-min demo
              </button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 40, flexWrap: "wrap", fontSize: 12, color: "rgba(255,255,255,.5)", alignItems: "center" }}>
              <div><b style={{ color: "#fff", fontWeight: 700 }}>48</b> SMEs scaling</div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.25)" }} />
              <div><b style={{ color: "#fff", fontWeight: 700 }}>£2.4m</b> client revenue automated</div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.25)" }} />
              <div><b style={{ color: "#fff", fontWeight: 700 }}>4.9★</b> across 36 reviews</div>
            </div>
          </div>

          {/* Right — status panel */}
          <div style={{
            borderRadius: 20, background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.10)",
            boxShadow: "0 30px 80px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08)",
            backdropFilter: "blur(20px)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>This week, on your business</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", fontFamily: "var(--rl-font-mono)", marginTop: 2 }}>app.revenueladder.co.uk / live</div>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em",
                color: "#86efac", background: "rgba(34,197,94,.12)", padding: "4px 10px", borderRadius: 999,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 0 3px rgba(34,197,94,.18)", display: "inline-block" }} />
                All systems
              </div>
            </div>

            {PANEL_ROWS.map(({ icon: Icon, label, sub, badge, badgeText }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 13 }}>
                <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(255,196,37,.10)", color: "var(--rl-gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "rgba(255,255,255,.85)", fontWeight: 600 }}>{label}</div>
                  <div style={{ color: "rgba(255,255,255,.4)", fontWeight: 500, fontSize: 11, marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", padding: "3px 8px", borderRadius: 999, ...BADGE_STYLES[badge] }}>
                  {badgeText}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
              <div style={{ display: "flex" }}>
                {[
                  { bg: "rgba(255,196,37,.20)", color: "var(--rl-gold)", text: "RL" },
                  { bg: "rgba(34,197,94,.20)",  color: "#86efac",         text: "EW" },
                  { bg: "rgba(148,163,184,.20)", color: "#cbd5e1",        text: "DM" },
                  { bg: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.45)", text: "+3" },
                ].map(({ bg, color, text }, i) => (
                  <div key={text} style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: "2px solid var(--rl-forest-ink)", background: bg,
                    marginLeft: i === 0 ? 0 : -8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color,
                    fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                  }}>
                    {text}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                Your team. <span style={{ color: "var(--rl-gold)", fontWeight: 700 }}>On it, today.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker band */}
      <div className="hidden sm:flex" style={{
        marginTop: 40, alignItems: "center", gap: 24,
        padding: "20px 28px", background: "var(--rl-surface)",
        border: "2px solid var(--rl-border-soft)", borderRadius: 18, overflow: "hidden",
      }}>
        <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--rl-fg-3)", paddingRight: 24, borderRight: "1px solid var(--rl-border-soft)" }}>
          Trusted by SMEs across
        </div>
        <div style={{ display: "flex", gap: 36, fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800, fontSize: 16, color: "var(--rl-fg-2)", flexWrap: "nowrap", overflow: "hidden", letterSpacing: "-.01em" }}>
          {CITIES.map((city, i) => (
            <span key={city} style={{ whiteSpace: "nowrap", opacity: 0.75, color: i % 2 === 1 ? "var(--rl-forest)" : undefined }}>
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Stat strip */}
      <div className="rl-grid-4" style={{
        padding: "32px 0", marginTop: 24,
        borderTop: "1px solid var(--rl-border-soft)", borderBottom: "1px solid var(--rl-border-soft)",
      }}>
        {STATS.map(({ v, suffix, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900, fontSize: 40, letterSpacing: "-.025em", color: "var(--rl-forest)", lineHeight: 1, display: "flex", alignItems: "baseline", gap: 4 }}>
              {v}<small style={{ fontSize: 18, color: "var(--rl-gold-deep)" }}>{suffix}</small>
            </div>
            <div style={{ fontSize: 12, color: "var(--rl-fg-2)" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
