import type { ReactNode } from "react"
import type { CaseStudyWorkCard } from "./types"
import { Eyebrow } from "./Eyebrow"

export interface CaseStudyWorkProps {
  eyebrow: string
  title: ReactNode
  sub?: string
  cards: CaseStudyWorkCard[]
}

export function CaseStudyWork({ eyebrow, title, sub, cards }: CaseStudyWorkProps) {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-surface)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontWeight: 800,
            fontSize: "clamp(28px, 3vw, 40px)",
            letterSpacing: "-.025em",
            lineHeight: 1.1,
            marginTop: 14,
            color: "var(--rl-fg-1)",
          }}>{title}</h2>
          {sub && (
            <p style={{
              fontSize: 17, color: "var(--rl-fg-2)", lineHeight: 1.6,
              marginTop: 16, maxWidth: 580,
            }}>{sub}</p>
          )}
        </div>

        <div className="rl-grid-2">
          {cards.map((card, i) => (
            <WorkCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ card }: { card: CaseStudyWorkCard }) {
  const dark = !!card.dark
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      background: dark ? "var(--rl-forest-ink)" : "var(--rl-surface)",
      border: dark ? "2px solid transparent" : "2px solid var(--rl-border-soft)",
      borderRadius: 24,
      padding: 36,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      color: dark ? "#fff" : undefined,
    }}>
      {dark && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--rl-pattern-ladder)",
          opacity: 0.18, pointerEvents: "none",
        }} />
      )}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: dark ? "rgba(255,196,37,.12)" : "var(--rl-forest-tint)",
          color: dark ? "var(--rl-gold)" : "var(--rl-forest)",
        }}>
          {card.icon}
        </div>
        <h3 style={{
          fontFamily: "var(--font-montserrat, var(--rl-font-display))",
          fontWeight: 800, fontSize: 26,
          letterSpacing: "-.025em",
          color: dark ? "#fff" : "var(--rl-fg-1)",
          lineHeight: 1.1,
        }}>
          {card.title}
        </h3>
        {card.paragraphs.map((p, j) => (
          <p key={j} style={{
            fontSize: 15,
            color: dark ? "rgba(255,255,255,.62)" : "var(--rl-fg-2)",
            lineHeight: 1.68,
          }}>{p}</p>
        ))}
        {card.extra}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px", borderRadius: 12,
          fontSize: 13, fontWeight: 700,
          marginTop: "auto",
          color: dark ? "var(--rl-gold)" : "var(--rl-forest)",
          background: dark ? "rgba(255,196,37,.10)" : "var(--rl-forest-tint)",
          border: dark ? "1px solid rgba(255,196,37,.18)" : "none",
        }}>
          {card.result.icon}
          {card.result.text}
        </div>
      </div>
    </div>
  )
}

export function CaseStudyWorkKeywordBlock({
  primaryEyebrow = "Primary",
  secondaryEyebrow = "Also ranks for",
  primary,
  tags,
}: {
  primaryEyebrow?: string
  secondaryEyebrow?: string
  primary: { term: string; rank: string; tone?: "gold" | "forest" }[]
  tags: string[]
}) {
  return (
    <div style={{
      background: "rgba(26,77,46,.04)",
      borderRadius: 14,
      border: "1.5px solid var(--rl-border-soft)",
      padding: "16px 18px",
      marginTop: 8,
      display: "grid",
      gridTemplateColumns: "152px 1fr",
      gap: 14,
      alignItems: "start",
    }}>
      <div>
        <div style={smallEyebrow}>{primaryEyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {primary.map((p) => (
            <div key={p.term} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 8, padding: "7px 10px",
              background: "var(--rl-surface)",
              borderRadius: 8,
              border: "1px solid var(--rl-border-soft)",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--rl-fg-1)", fontStyle: "italic" }}>
                &ldquo;{p.term}&rdquo;
              </span>
              <span style={{
                fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                fontWeight: 900, fontSize: 14, whiteSpace: "nowrap", letterSpacing: "-.01em",
                color: p.tone === "forest" ? "var(--rl-forest)" : "var(--rl-gold-deep)",
              }}>
                {p.rank}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={smallEyebrow}>{secondaryEyebrow}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignContent: "flex-start" }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 600, color: "var(--rl-fg-2)",
              background: "var(--rl-surface)",
              border: "1px solid var(--rl-border-soft)",
              borderRadius: 999, padding: "3px 9px",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CaseStudyWorkCaps({ caps }: { caps: { icon: ReactNode; label: string }[] }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 8,
      padding: "16px 0 4px",
      borderTop: "1px solid rgba(255,255,255,.08)",
      marginTop: 4,
    }}>
      {caps.map((c) => (
        <span key={c.label} style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "8px 14px",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.10)",
          borderRadius: 999,
          fontSize: 13, fontWeight: 600,
          color: "rgba(255,255,255,.82)",
        }}>
          <span style={{ color: "var(--rl-gold)", display: "inline-flex", flexShrink: 0 }}>{c.icon}</span>
          {c.label}
        </span>
      ))}
    </div>
  )
}

const smallEyebrow = {
  fontSize: 9, fontWeight: 800,
  textTransform: "uppercase" as const, letterSpacing: ".18em",
  color: "var(--rl-gold-deep)", marginBottom: 8,
}
