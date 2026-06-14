import Image from "next/image"
import { Target } from "lucide-react"
import type { CSSProperties } from "react"
import type { CaseStudyHeroProps } from "./types"

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 12px",
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  color: "rgba(255,255,255,.78)",
  letterSpacing: ".04em",
}

const cardRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(255,255,255,.05)",
  borderRadius: 12,
}

const cardIconStyle: CSSProperties = {
  width: 32, height: 32, borderRadius: 9,
  background: "rgba(255,196,37,.10)",
  color: "var(--rl-gold)",
  display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0,
}

const labelStyle: CSSProperties = {
  flex: 1,
  fontSize: 13,
  fontWeight: 600,
  color: "rgba(255,255,255,.82)",
  lineHeight: 1.3,
}

const sublabelStyle: CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 500,
  color: "rgba(255,255,255,.40)",
  marginTop: 2,
}

const pillBase: CSSProperties = {
  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
  fontWeight: 800,
  fontSize: 12,
  padding: "4px 10px",
  borderRadius: 999,
  whiteSpace: "nowrap",
}

const pillStyles: Record<"done" | "run", CSSProperties> = {
  done: { ...pillBase, background: "rgba(255,196,37,.12)", color: "var(--rl-gold)", border: "1px solid rgba(255,196,37,.22)" },
  run:  { ...pillBase, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.78)", border: "1px solid rgba(255,255,255,.10)" },
}

export function CaseStudyHero({
  badges,
  eyebrow,
  title,
  subtitle,
  logoSrc,
  logoAlt,
  metaLines,
  card,
}: CaseStudyHeroProps) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
      <div style={{
        position: "relative",
        margin: "24px 0 0",
        overflow: "hidden",
        borderRadius: 32,
        background: "var(--rl-grad-hero), var(--rl-forest-ink)",
        color: "#fff",
      }} className="rl-hero-slab">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "var(--rl-pattern-dots-dark)", backgroundSize: "24px 24px" }} />
        <div style={{
          position: "absolute", right: -100, top: -120, width: 460, height: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,196,37,.22) 0%, transparent 60%)",
          filter: "blur(8px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2 }} className="rl-hero-grid">
          {/* Left */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {badges.map((b, i) => (
                <span key={b} style={badgeStyle}>
                  {i === 0 && <Target size={11} aria-hidden="true" />}
                  {b}
                </span>
              ))}
            </div>

            <div style={{
              fontSize: 12, fontWeight: 800, letterSpacing: ".20em",
              textTransform: "uppercase", color: "rgba(255,255,255,.38)",
              marginBottom: 10,
            }}>
              {eyebrow}
            </div>

            <h1 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              fontWeight: 900,
              fontSize: "clamp(44px, 6vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-.035em",
              color: "#fff",
              margin: 0,
            }}>
              {title}
            </h1>

            <p style={{
              fontSize: 17,
              color: "rgba(255,255,255,.62)",
              lineHeight: 1.58,
              marginTop: 20,
              maxWidth: 460,
            }}>
              {subtitle}
            </p>

            <div style={{
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}>
              <div style={{
                background: "#fff",
                borderRadius: 12,
                padding: "10px 22px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 12px rgba(0,0,0,.25)",
              }}>
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={160}
                  height={48}
                  style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", lineHeight: 1.65 }}>
                {metaLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < metaLines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right card */}
          <div>
            <div style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20,
              padding: 24,
            }}>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                paddingBottom: 16,
                borderBottom: "1px solid rgba(255,255,255,.06)",
                marginBottom: 16,
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                    fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: "-.01em",
                  }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.40)", marginTop: 3 }}>
                    {card.sub}
                  </div>
                </div>
                {card.statusLabel && (
                  <span className="cs-status-live">
                    <span className="cs-status-live-dot" aria-hidden="true" />
                    {card.statusLabel}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {card.rows.map((row, i) => {
                  if (row.kind === "beforeAfter") {
                    return (
                      <div key={i} style={{ ...cardRowStyle, flexDirection: "column", alignItems: "stretch", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={cardIconStyle}>{row.icon}</div>
                          <div style={labelStyle}>
                            {row.label}
                            {row.sub && <small style={sublabelStyle}>{row.sub}</small>}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <BeforeAfterBox kind="before" {...row.before} />
                          <span style={{ color: "rgba(255,255,255,.30)", fontSize: 16, flexShrink: 0 }} aria-hidden="true">&rarr;</span>
                          <BeforeAfterBox kind="after" {...row.after} />
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div key={i} style={cardRowStyle}>
                      <div style={cardIconStyle}>{row.icon}</div>
                      <div style={labelStyle}>
                        {row.label}
                        {row.sub && <small style={sublabelStyle}>{row.sub}</small>}
                      </div>
                      {row.pill && (
                        <span style={pillStyles[row.pill.variant ?? "done"]}>{row.pill.text}</span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, paddingTop: 16, marginTop: 16,
                borderTop: "1px solid rgba(255,255,255,.06)",
              }}>
                <div style={{ display: "inline-flex" }}>
                  {card.avatars.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        width: 26, height: 26, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                        fontWeight: 800, fontSize: 10,
                        border: "2px solid var(--rl-forest-ink)",
                        marginLeft: i === 0 ? 0 : -8,
                        background: a.tone === "gold" ? "var(--rl-gold)" : "var(--rl-forest)",
                        color: a.tone === "gold" ? "var(--rl-forest-ink)" : "var(--rl-gold)",
                      }}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.40)" }}>{card.footMeta}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BeforeAfterBox({
  kind, label, value, sub,
}: { kind: "before" | "after"; label: string; value: string; sub?: string }) {
  const isBefore = kind === "before"
  return (
    <div style={{
      flex: 1, borderRadius: 9, padding: "9px 10px", textAlign: "center",
      background: isBefore ? "rgba(255,255,255,.04)" : "rgba(255,196,37,.08)",
      border: isBefore ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(255,196,37,.24)",
    }}>
      <div style={{
        fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 3,
        color: isBefore ? "rgba(255,255,255,.28)" : "rgba(255,196,37,.60)",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
        fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em",
        fontSize: isBefore ? 17 : 28,
        color: isBefore ? "rgba(255,255,255,.32)" : "var(--rl-gold)",
        textDecoration: isBefore ? "line-through" : "none",
        textDecorationColor: isBefore ? "color-mix(in srgb, var(--rl-error) 50%, transparent)" : undefined,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontSize: 9, marginTop: 3,
          color: isBefore ? "rgba(255,255,255,.22)" : "rgba(255,196,37,.50)",
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}
