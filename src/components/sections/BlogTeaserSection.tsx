import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogCard } from "@/components/blog/BlogCard"

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
            <BlogCard
              key={post.slug}
              slug={post.slug}
              cat={post.cat}
              catTone={post.catTone}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readMins}
              glyph={post.glyph}
              glyphSub={post.glyphSub}
              author={post.author}
            />
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
