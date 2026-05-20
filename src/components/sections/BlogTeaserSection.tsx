import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  slug: string
  cat: string
  catTone?: string
  title: string
  excerpt: string
  date: string
  readMins: number
  author: { initials: string; name: string }
  glyph: string
  glyphSub: string
}

const POSTS: BlogPost[] = [
  {
    slug: "welsh-voice-agents-bryn",
    cat: "AI", catTone: "gold",
    title: "Why a Welsh voice agent answers the phone better than a London call-centre",
    excerpt: "Eleven Llanrwsts in our call data. Six valid towns. Five wrong ones. Here is what we learned training a voice agent on Welsh-English calls.",
    date: "12 May 2026", readMins: 8,
    author: { initials: "CJ", name: "Catrin Jenkins" },
    glyph: "B", glyphSub: "Voice / AI",
  },
  {
    slug: "pipeline-to-revenue",
    cat: "Automation",
    title: "Pipeline-to-revenue: what 38 lead flows have taught us",
    excerpt: "A field guide to building automation that survives Monday morning. Patterns we keep reusing across 38 live pipelines.",
    date: "6 May 2026", readMins: 6,
    author: { initials: "AP", name: "Alaw Pugh" },
    glyph: "38", glyphSub: "Pipelines",
  },
  {
    slug: "lighthouse-not-vanity",
    cat: "Web Dev",
    title: "Lighthouse 96, not vanity: how we keep clients fast in year two",
    excerpt: "Most sites slow down the moment the agency leaves the room. Why ours don't — and the budgets we enforce in CI.",
    date: "29 Apr 2026", readMins: 7,
    author: { initials: "EW", name: "Eira Wynne" },
    glyph: "96", glyphSub: "Performance",
  },
]

function BlogCard({ post }: { post: BlogPost }) {
  const isShortGlyph = post.glyph.length <= 2
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
      <article style={{
        background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
        borderRadius: 20, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column",
        transition: "all var(--rl-dur-slow) var(--rl-ease-out)",
      }}>
        {/* Thumbnail */}
        <div style={{
          height: 140,
          background: isShortGlyph
            ? "repeating-linear-gradient(-45deg, rgba(26,77,46,.06) 0 10px, rgba(26,77,46,.02) 10px 20px)"
            : "var(--rl-forest-tint)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em",
            color: post.catTone === "gold" ? "var(--rl-gold-deep)" : "var(--rl-forest)",
            background: post.catTone === "gold" ? "var(--rl-gold-tint)" : "var(--rl-forest-tint)",
            padding: "3px 10px", borderRadius: 9999,
          }}>
            {post.cat}
          </span>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
              fontSize: isShortGlyph ? 52 : 28, color: "var(--rl-forest)", lineHeight: 1,
            }}>
              {post.glyph}
            </div>
            <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginTop: 4, fontWeight: 600 }}>
              {post.glyphSub}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--rl-fg-3)" }}>
            <span>{post.date}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
            <span>{post.readMins} min read</span>
          </div>
          <h3 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
            fontSize: 16, lineHeight: 1.3, letterSpacing: "-.01em", color: "var(--rl-fg-1)",
          }}>
            {post.title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--rl-fg-2)", lineHeight: 1.6, flex: 1 }}>
            {post.excerpt}
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
                {post.author.initials}
              </div>
              <span style={{ fontSize: 12, color: "var(--rl-fg-3)" }}>{post.author.name}</span>
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

export function BlogTeaserSection() {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg-warm)" }} id="blog">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, margin: "0 auto 56px", textAlign: "center", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-forest)", background: "var(--rl-forest-tint)",
            padding: "5px 14px", borderRadius: 9999,
          }}>
            From the workshop
          </span>
          <h2 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
            fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-.025em",
            color: "var(--rl-fg-1)",
          }}>
            What we&apos;re <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>writing</em> about,<br />
            this quarter.
          </h2>
          <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 560 }}>
            Field notes from the team in Bangor. AI, automations, websites, and the boring engineering bits
            that make them work in year two.
          </p>
        </div>

        <div className="rl-grid-3" style={{ marginBottom: 40 }}>
          {POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/blog" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: "var(--rl-forest)",
            border: "2px solid var(--rl-forest)", fontFamily: "var(--rl-font-body)",
            fontWeight: 600, fontSize: 15, height: 50, padding: "0 28px", borderRadius: 14,
            textDecoration: "none",
          }}>
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
