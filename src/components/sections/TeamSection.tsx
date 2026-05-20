import { Sparkles, ArrowRight } from "lucide-react"

const HUMANS = [
  { initials: "RT", nm: "Rhys Thomas",    rl: "Founder & Strategy" },
  { initials: "EW", nm: "Eira Wynne",     rl: "Lead Engineer" },
  { initials: "DM", nm: "Dafydd Morris",  rl: "Design & Brand" },
  { initials: "CJ", nm: "Catrin Jenkins", rl: "SEO & Content" },
  { initials: "AP", nm: "Alaw Pugh",      rl: "Automations" },
  { initials: "TB", nm: "Tom Buckley",    rl: "Client Success" },
]

const AGENTS = [
  { initials: "SC", nm: "Scout",   rl: "Pipeline triage" },
  { initials: "DR", nm: "Drafter", rl: "Copywriting first-pass" },
  { initials: "RN", nm: "Ranger",  rl: "Site monitoring" },
  { initials: "CL", nm: "Caller",  rl: "Voice agent runtime" },
]

const AVATAR_COLORS = [
  { bg: "var(--rl-forest)", color: "#fff" },
  { bg: "rgba(26,77,46,.18)", color: "var(--rl-forest)" },
  { bg: "var(--rl-slate-200)", color: "var(--rl-slate-700)" },
  { bg: "rgba(26,77,46,.10)", color: "var(--rl-forest)" },
  { bg: "var(--rl-gold-tint)", color: "var(--rl-gold-deep)" },
  { bg: "var(--rl-slate-100)", color: "var(--rl-slate-600)" },
]

export function TeamSection() {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg)" }} id="team">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, margin: "0 auto 56px", textAlign: "center", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-fg-3)", background: "var(--rl-slate-100)",
            padding: "5px 14px", borderRadius: 9999,
          }}>
            The people
          </span>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
            fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-.025em",
            color: "var(--rl-fg-1)",
          }}>
            Six humans in Bangor.<br />
            <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>Four AI agents that work for them.</em>
          </h2>
          <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 640 }}>
            A small, senior team is the only way a retainer this broad works. We stay small on purpose — and we
            let the agents handle the work that shouldn&apos;t have a person&apos;s name on it.
          </p>
        </div>

        <div className="rl-grid-6" style={{ marginBottom: 28 }}>
          {HUMANS.map(({ initials, nm, rl }, idx) => (
            <div key={nm} style={{
              background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
              borderRadius: 16, padding: "20px 16px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: AVATAR_COLORS[idx % AVATAR_COLORS.length].bg,
                color: AVATAR_COLORS[idx % AVATAR_COLORS.length].color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 900,
                fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                border: "3px solid var(--rl-border-soft)",
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-fg-1)", lineHeight: 1.3 }}>{nm}</div>
                <div style={{ fontSize: 12, color: "var(--rl-fg-3)", marginTop: 3 }}>{rl}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em",
                color: "var(--rl-forest)", background: "var(--rl-forest-tint)",
                padding: "3px 10px", borderRadius: 9999,
              }}>
                In Bangor
              </span>
            </div>
          ))}
        </div>

        <div className="rl-grid-4" style={{ maxWidth: 720, margin: "0 auto 36px" }}>
          {AGENTS.map(({ initials, nm, rl }) => (
            <div key={nm} style={{
              background: "var(--rl-surface)", border: "2px solid var(--rl-gold-tint-2)",
              borderRadius: 16, padding: "20px 16px", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "var(--rl-gold-tint)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 900, color: "var(--rl-gold-deep)",
                fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                border: "3px solid var(--rl-gold-tint-2)",
                backgroundImage: "repeating-linear-gradient(135deg, rgba(255,196,37,.10) 0 6px, rgba(255,196,37,.04) 6px 12px)",
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-fg-1)", lineHeight: 1.3 }}>{nm}</div>
                <div style={{ fontSize: 12, color: "var(--rl-fg-3)", marginTop: 3 }}>{rl}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em",
                color: "var(--rl-gold-deep)", background: "var(--rl-gold-tint)",
                padding: "3px 10px", borderRadius: 9999,
              }}>
                AI agent
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
            borderRadius: 9999, padding: "10px 20px",
            fontSize: 13, color: "var(--rl-fg-2)",
          }}>
            <Sparkles size={14} style={{ color: "var(--rl-gold-deep)" }} />
            <span>
              <b style={{ color: "var(--rl-fg-1)" }}>6 humans</b> · <b style={{ color: "var(--rl-fg-1)" }}>4 agents</b> · one Slack channel that&apos;s yours from day one
            </span>
          </div>
          <div style={{ marginTop: 18 }}>
            <a href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: "var(--rl-forest)", fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}>
              Meet the team in full <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
