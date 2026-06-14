import type { ReactNode } from "react"
import { Eyebrow } from "./Eyebrow"

export interface CaseStudyProblemProps {
  eyebrow: string
  title: ReactNode
  pullStat: { value: string; label: string }
  paragraphs: string[]
}

export function CaseStudyProblem({ eyebrow, title, pullStat, paragraphs }: CaseStudyProblemProps) {
  return (
    <section className="rl-section-pad">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.65fr)",
          gap: 64,
          alignItems: "start",
        }}>
          <div style={{ maxWidth: 360 }}>
            <Eyebrow tone="forest">{eyebrow}</Eyebrow>
            <h2 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              fontWeight: 800,
              fontSize: "clamp(28px, 3vw, 40px)",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
              marginTop: 14,
              color: "var(--rl-fg-1)",
            }}>
              {title}
            </h2>
          </div>

          <div>
            <div className="cs-pull-stat">
              <div className="cs-pull-stat-value">{pullStat.value}</div>
              <div className="cs-pull-stat-label">{pullStat.label}</div>
            </div>

            {paragraphs.map((p, i) => (
              <p key={i} style={{
                fontSize: 17,
                color: i === 0 ? "var(--rl-fg-1)" : "var(--rl-fg-2)",
                lineHeight: 1.72,
                marginBottom: i === paragraphs.length - 1 ? 0 : 22,
              }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

