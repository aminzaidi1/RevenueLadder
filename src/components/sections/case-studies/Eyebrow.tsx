import type { ReactNode } from "react"

export function Eyebrow({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "forest" }) {
  return (
    <span className={tone === "forest" ? "cs-eyebrow is-forest" : "cs-eyebrow"}>
      {children}
    </span>
  )
}
