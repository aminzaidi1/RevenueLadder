import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudySummary } from "./types"

export function CaseStudyIndexCard({ summary }: { summary: CaseStudySummary }) {
  return (
    <Link
      href={`/case-studies/${summary.slug}`}
      style={{
        position: "relative",
        background: "var(--rl-surface)",
        border: "2px solid var(--rl-border-soft)",
        borderRadius: 24,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{
        display: "flex", gap: 6, flexWrap: "wrap",
        fontSize: 11, fontWeight: 700,
        color: "var(--rl-gold-deep)",
        textTransform: "uppercase", letterSpacing: ".12em",
      }}>
        {summary.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <h3 style={{
        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
        fontWeight: 800, fontSize: 28,
        letterSpacing: "-.025em", color: "var(--rl-fg-1)",
        lineHeight: 1.1,
      }}>
        {summary.client}
      </h3>
      <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.55 }}>
        {summary.headline}
      </p>
      <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.55 }}>
        {summary.blurb}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        padding: "16px 0",
        borderTop: "1px solid var(--rl-border-soft)",
        borderBottom: "1px solid var(--rl-border-soft)",
      }}>
        {summary.stats.map((s) => (
          <div key={s.label}>
            <div style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              fontWeight: 900, fontSize: 24,
              letterSpacing: "-.02em", color: "var(--rl-forest)", lineHeight: 1,
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: "var(--rl-fg-2)", marginTop: 4, lineHeight: 1.3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <span style={{
        marginTop: "auto",
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 13, fontWeight: 700,
        color: "var(--rl-forest)",
      }}>
        Read the case study <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  )
}
