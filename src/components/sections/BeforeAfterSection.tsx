import { X, CheckCircle, ArrowRight, Star } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"

const BEFORE_TASKS = [
  "Reply to enquiry from Wednesday",
  "Schedule next week's Instagram",
  "Update prices on the website",
  "Chase invoice for Coleg Menai",
  "Write blog post about new service",
  "Fix the contact form (again)",
  "Reconcile Stripe payouts",
]

const AFTER_CHECKLIST = [
  "Website monitored, updated, indexed weekly",
  "Voice agent answers and books outside hours",
  "Leads land in one inbox, ranked by intent",
  "Social pipeline runs on a 12-week schedule",
  "Monthly written report: what worked, what next",
  "A real person to ring on the bad days",
]

const AVATAR_CLUSTER = [
  { initials: "EW", bg: "rgba(255,196,37,.25)", color: "var(--rl-gold)" },
  { initials: "DM", bg: "rgba(26,77,46,.5)",    color: "#fff" },
  { initials: "RT", bg: "rgba(148,163,184,.25)", color: "#fff" },
]

export function BeforeAfterSection() {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg)" }} id="before-after">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <SectionHeader
          eyebrow="Before &amp; after"
          heading={<>What your <em>Monday</em> looks like<br />before and after we get involved.</>}
          eyebrowVariant="neutral"
        />

        <div className="rl-grid-2">

          <div style={{
            background: "var(--rl-surface)", border: "2px solid var(--rl-border)",
            borderRadius: 24, padding: 32,
          }}>
            <span style={{
              display: "inline-block", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: ".14em", color: "var(--rl-error)", background: "var(--rl-error-bg)",
              border: "1px solid var(--rl-error-border)", padding: "4px 12px", borderRadius: 9999, marginBottom: 18,
            }}>
              Before
            </span>
            <h3 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
              fontSize: 22, letterSpacing: "-.02em", color: "var(--rl-fg-1)", marginBottom: 10,
            }}>
              Your to-do list, on repeat.
            </h3>
            <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.6, marginBottom: 22 }}>
              Eleven open tabs. A note app full of half-finished posts. The same seven jobs that quietly slide to next week.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 22 }}>
              {BEFORE_TASKS.map((task) => (
                <li key={task} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--rl-fg-2)", alignItems: "center" }}>
                  <X size={14} strokeWidth={2.5} style={{ color: "var(--rl-error)", flexShrink: 0 }} />
                  {task}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "var(--rl-fg-3)", fontStyle: "italic" }}>
              …and the list resets at 9am tomorrow.
            </p>
          </div>

          <div style={{
            background: "var(--rl-forest-ink)", border: "2px solid var(--rl-border-dark)",
            borderRadius: 24, padding: 32, color: "#fff",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-dots-dark)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: ".14em", color: "var(--rl-success)", background: "rgba(34,197,94,.14)",
                border: "1px solid rgba(34,197,94,.25)", padding: "4px 12px", borderRadius: 9999, marginBottom: 18,
              }}>
                After
              </span>
              <h3 style={{
                fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
                fontSize: 22, letterSpacing: "-.02em", color: "#fff", marginBottom: 10,
              }}>
                A team that&apos;s already on it.
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.6, marginBottom: 22 }}>
                Same business. Same Monday. Different operating model. We handle the execution while you do the work only you can do.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 26 }}>
                {AFTER_CHECKLIST.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,.85)", alignItems: "center" }}>
                    <CheckCircle size={14} strokeWidth={2.5} style={{ color: "var(--rl-success)", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.10)", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex" }}>
                    {AVATAR_CLUSTER.map(({ initials, bg, color }, i) => (
                      <div key={initials} style={{
                        width: 28, height: 28, borderRadius: "50%",
                        border: "2px solid var(--rl-forest-ink)",
                        background: bg, color,
                        marginLeft: i === 0 ? 0 : -8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, fontWeight: 800,
                        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                      }}>
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>
                    Your retainer team, kicked off in 7 days.
                  </span>
                </div>
                <a href="#how" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--rl-gold)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  See how it works <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 28, background: "var(--rl-surface)",
          border: "2px solid var(--rl-border-soft)", borderRadius: 20,
          padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "var(--rl-forest-tint)", color: "var(--rl-forest)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800,
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            flexShrink: 0,
          }}>
            EW
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <blockquote style={{ fontSize: 15, color: "var(--rl-fg-1)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
              &ldquo;We came to RevenueLadder with a half-built Squarespace and a Google Sheet full of leads.
              Six weeks later we had a real site, a voice agent picking up out-of-hours bookings, and a Monday
              morning where I actually drink my coffee before opening the laptop.&rdquo;
            </blockquote>
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--rl-fg-3)" }}>
              <b style={{ color: "var(--rl-fg-2)" }}>Eleri Williams</b> · Co-founder, Aber Coffee Co. · Aberystwyth
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
