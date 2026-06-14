import type { ReactNode } from "react"
import { Check } from "lucide-react"
import type { CaseStudyKeyword, CaseStudyStat } from "./types"
import { Eyebrow } from "./Eyebrow"

export interface CaseStudyResultsProps {
  eyebrow: string
  title: ReactNode
  stats: CaseStudyStat[]
  context?: string
  keywords?: CaseStudyKeyword[]
}

const TIER_POS: Record<NonNullable<CaseStudyKeyword["tier"]>, { color: string; size: number; weight: number }> = {
  "":      { color: "var(--rl-fg-2)",        size: 13, weight: 700 },
  "top-1": { color: "var(--rl-gold-deep)",   size: 16, weight: 900 },
  "top-2": { color: "var(--rl-forest)",      size: 15, weight: 900 },
  "top-3": { color: "var(--rl-slate-600)",   size: 14, weight: 800 },
}

export function CaseStudyResults({ eyebrow, title, stats, context, keywords }: CaseStudyResultsProps) {
  return (
    <section className="rl-section-pad">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <Eyebrow tone="forest">{eyebrow}</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontWeight: 800,
            fontSize: "clamp(28px, 3vw, 40px)",
            letterSpacing: "-.025em",
            lineHeight: 1.1,
            marginTop: 14,
            color: "var(--rl-fg-1)",
          }}>{title}</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} />
          ))}
        </div>

        {context && (
          <p style={{
            fontSize: 16, color: "var(--rl-fg-2)", lineHeight: 1.72,
            maxWidth: 720, marginBottom: 48,
          }}>
            {context}
          </p>
        )}

        {keywords && keywords.length > 0 && (
          <div style={{
            background: "var(--rl-surface)",
            border: "2px solid var(--rl-border-soft)",
            borderRadius: 24,
            overflow: "hidden",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px",
              padding: "14px 24px",
              background: "var(--rl-forest-tint)",
              borderBottom: "2px solid var(--rl-border-soft)",
            }}>
              <span style={kwHeadSpan}>Keyword</span>
              <span style={kwHeadSpan}>Position</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {keywords.map(({ keyword, position, tier }, i) => {
                const t = tier ?? ""
                const tierStyles = TIER_POS[t]
                return (
                  <div key={keyword} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px",
                    padding: "13px 24px",
                    alignItems: "center",
                    borderBottom: i < keywords.length - 1 ? "1px solid var(--rl-border-soft)" : "none",
                  }}>
                    <span style={{
                      fontSize: 13,
                      fontWeight: t === "top-1" ? 700 : 600,
                      color: "var(--rl-fg-1)",
                      fontStyle: "italic",
                    }}>
                      &ldquo;{keyword}&rdquo;
                    </span>
                    <span style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                      ...tierStyles,
                    }}>
                      {t === "" && (
                        <span style={{ color: "var(--rl-success)", display: "flex" }}>
                          <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                      )}
                      {position}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: CaseStudyStat }) {
  const featured = !!stat.featured
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      background: featured ? "var(--rl-forest-ink)" : "var(--rl-surface)",
      border: featured ? "2px solid transparent" : "2px solid var(--rl-border-soft)",
      borderRadius: 20,
      padding: "32px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      {featured && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--rl-pattern-ladder)",
          opacity: 0.22, pointerEvents: "none",
        }} />
      )}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 10,
          background: featured ? "rgba(255,196,37,.12)" : "var(--rl-forest-tint)",
          color: featured ? "var(--rl-gold)" : "var(--rl-forest)",
        }}>
          {stat.icon}
        </div>
        <div style={{
          fontFamily: "var(--font-montserrat, var(--rl-font-display))",
          fontWeight: 900, fontSize: 56,
          letterSpacing: "-.04em", lineHeight: 1,
          color: featured ? "var(--rl-gold)" : "var(--rl-forest)",
        }}>
          {stat.value}
        </div>
        {stat.unit && (
          <span style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontSize: 17, fontWeight: 700,
            color: featured ? "rgba(255,255,255,.50)" : "var(--rl-gold-deep)",
            display: "block", marginTop: 4,
          }}>
            {stat.unit}
          </span>
        )}
        <div style={{
          fontSize: 13, fontWeight: 500, lineHeight: 1.45, marginTop: 4,
          color: featured ? "rgba(255,255,255,.50)" : "var(--rl-fg-2)",
        }}>
          {stat.label}
        </div>
      </div>
    </div>
  )
}

const kwHeadSpan = {
  fontSize: 10, fontWeight: 800,
  textTransform: "uppercase" as const, letterSpacing: ".18em",
  color: "var(--rl-forest)",
}
