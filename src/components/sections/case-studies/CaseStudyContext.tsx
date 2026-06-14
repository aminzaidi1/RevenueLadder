import type { CaseStudyContextItem } from "./types"

export function CaseStudyContext({ items }: { items: CaseStudyContextItem[] }) {
  return (
    <div style={{ maxWidth: 1240, margin: "32px auto 0" }} className="rl-px">
      <div style={{
        position: "relative",
        background: "var(--rl-forest-ink)",
        borderRadius: 24,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "var(--rl-pattern-dots-dark)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", padding: "36px 40px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}>
            {items.map((it, i) => (
              <div
                key={it.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  paddingRight: 24,
                  borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 11,
                  background: "rgba(255,196,37,.10)",
                  color: "var(--rl-gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {it.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: ".18em",
                    color: "var(--rl-gold)", marginBottom: 6,
                  }}>
                    {it.label}
                  </div>
                  <div style={{
                    fontSize: 15, fontWeight: 600,
                    color: "#fff", lineHeight: 1.45,
                  }}>
                    {it.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
