import type { ReactNode } from "react"

interface Props {
  eyebrow: string
  heading: ReactNode
  description?: ReactNode
  eyebrowVariant?: "forest" | "neutral"
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  eyebrowVariant = "forest",
}: Props) {
  const eyebrowStyle =
    eyebrowVariant === "neutral"
      ? { color: "var(--rl-fg-3)" as const, background: "var(--rl-slate-100)" as const }
      : undefined

  return (
    <div className="section-head center">
      <span
        className={eyebrowVariant === "forest" ? "eyebrow forest" : "eyebrow"}
        style={eyebrowStyle}
      >
        {eyebrow}
      </span>
      <h2 className="section-title">{heading}</h2>
      {description && <p className="section-sub">{description}</p>}
    </div>
  )
}
