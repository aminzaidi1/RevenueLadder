import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export interface BlogCardProps {
  slug: string
  cat: string
  catTone?: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  glyph: string
  glyphSub: string
  author: { initials: string; name: string }
  coverImage?: string | null
}

export function BlogCard({
  slug,
  cat,
  catTone,
  title,
  excerpt,
  date,
  readingTime,
  glyph,
  glyphSub,
  author,
  coverImage,
}: BlogCardProps) {
  const isShortGlyph = glyph.length <= 2
  const thumbBg = coverImage
    ? undefined
    : isShortGlyph
      ? "repeating-linear-gradient(-45deg, rgba(26,77,46,.06) 0 10px, rgba(26,77,46,.02) 10px 20px)"
      : "var(--rl-forest-tint)"

  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
      <article style={{
        background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
        borderRadius: 20, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column",
        transition: "all var(--rl-dur-slow) var(--rl-ease-out)",
      }}>
        <div style={{
          height: 140, background: thumbBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <span style={{
            position: "absolute", top: 12, left: 12, zIndex: 1,
            fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em",
            color: catTone === "gold" ? "var(--rl-gold-deep)" : "var(--rl-forest)",
            background: catTone === "gold" ? "var(--rl-gold-tint)" : "var(--rl-forest-tint)",
            padding: "3px 10px", borderRadius: 9999,
          }}>
            {cat}
          </span>
          {coverImage ? (
            <Image src={coverImage} alt={title} fill style={{ objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
                fontSize: isShortGlyph ? 52 : 28, color: "var(--rl-forest)", lineHeight: 1,
              }}>
                {glyph}
              </div>
              <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginTop: 4, fontWeight: 600 }}>
                {glyphSub}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--rl-fg-3)" }}>
            <span>{date}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
            <span>{readingTime} min read</span>
          </div>
          <h3 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
            fontSize: 16, lineHeight: 1.3, letterSpacing: "-.01em", color: "var(--rl-fg-1)",
          }}>
            {title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.6, flex: 1 }}>
            {excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--rl-border-soft)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "var(--rl-forest-tint)", color: "var(--rl-forest)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 800,
                fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              }}>
                {author.initials}
              </div>
              <span style={{ fontSize: 12, color: "var(--rl-fg-3)" }}>{author.name}</span>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--rl-forest)", fontWeight: 700 }}>
              Read more <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
