import { Bot, Heart, CheckCircle } from "lucide-react"

const AI_ITEMS = [
  "Drafts copy in your tone, ready to be edited",
  "Routes inbound enquiries by intent and value",
  "Answers tier-1 questions on phone, chat, and email, 24/7",
  "Watches the website for broken pages and slow pages",
  "Schedules social content across five channels",
  "Pulls weekly reports nobody has to write",
  "Catches anomalies — a 30% drop in form submits — before you do",
]

const HUMAN_ITEMS = [
  "Strategy: what to build next and why",
  "Design and brand decisions that the AI shouldn't make",
  "Engineering: code that'll still work in five years",
  "Edits every customer-facing word before it ships",
  "A real person to ring when something's on fire",
]

export function AiVsHumanSection() {
  return (
    <section style={{ padding: "112px 0", background: "var(--rl-bg)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, margin: "0 auto 56px", textAlign: "center", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-fg-3)", background: "var(--rl-slate-100)",
            padding: "5px 14px", borderRadius: 9999,
          }}>
            The honest split
          </span>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
            fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-.025em",
            color: "var(--rl-fg-1)",
          }}>
            AI does the repetitive bit.<br />
            <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>Humans do the bit that matters.</em>
          </h2>
          <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 640 }}>
            We&apos;re not selling you &ldquo;AI&rdquo;. We&apos;re selling you a team that uses AI where it saves you money,
            and uses experienced humans where it earns you trust. Here&apos;s where the line falls.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-cols-1 lg:grid-cols-2">

          <div style={{
            background: "var(--rl-forest-ink)", borderRadius: 24, padding: 36,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-dots-dark)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-ladder)", opacity: 0.2, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,196,37,.14)", color: "var(--rl-gold)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}>
                <Bot size={26} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
                fontSize: 24, letterSpacing: "-.02em", color: "#fff", marginBottom: 8,
              }}>
                The AI engine.
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.6, marginBottom: 24 }}>
                Always-on. Boring on purpose. Quiet until it shouldn&apos;t be.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                {AI_ITEMS.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,.78)", alignItems: "flex-start" }}>
                    <CheckCircle size={14} strokeWidth={2.5} style={{ color: "var(--rl-gold)", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
            borderRadius: 24, padding: 36,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "var(--rl-forest-tint)", color: "var(--rl-forest)",
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
            }}>
              <Heart size={26} />
            </div>
            <h3 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
              fontSize: 24, letterSpacing: "-.02em", color: "var(--rl-fg-1)", marginBottom: 8,
            }}>
              The team in Bangor.
            </h3>
            <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.6, marginBottom: 24 }}>
              Six people. Two decades of agency experience. One Slack channel that&apos;s yours.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {HUMAN_ITEMS.map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--rl-fg-2)", alignItems: "flex-start" }}>
                  <CheckCircle size={14} strokeWidth={2.5} style={{ color: "var(--rl-forest)", flexShrink: 0, marginTop: 2 }} />
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--rl-border-soft)", fontSize: 12, color: "var(--rl-fg-3)" }}>
              Office hours · Mon–Fri, 9–5. Out-of-hours cover for live-incident clients on the Scale tier.
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
