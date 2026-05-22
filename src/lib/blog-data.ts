export interface BlogAuthor {
  initials: string
  name: string
  role: string
}

export interface BlogPost {
  slug: string
  cat: string
  catId: string
  catTone?: "gold"
  title: string
  excerpt: string
  date: string
  readMins: number
  author: BlogAuthor
  glyph: string
  glyphSub: string
  featured?: boolean
}

export interface BlogCategory {
  id: string
  label: string
  count: number
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all",   label: "All",          count: 12 },
  { id: "ai",    label: "AI",           count: 4  },
  { id: "auto",  label: "Automation",   count: 3  },
  { id: "web",   label: "Web Dev",      count: 2  },
  { id: "seo",   label: "SEO",          count: 2  },
  { id: "cases", label: "Case studies", count: 1  },
]

import type { DbBlogPost } from "@/lib/supabase/blog"

export function mapDbPost(db: DbBlogPost): BlogPost {
  const cat = db.category ?? "General"
  const catId = cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  const nameParts = db.author.trim().split(/\s+/)
  const initials = nameParts.map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2)
  const date = new Date(db.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  })
  return {
    slug: db.slug,
    cat,
    catId,
    catTone: cat === "AI" || cat === "Case Studies" ? "gold" : undefined,
    title: db.title,
    excerpt: db.excerpt ?? "",
    date,
    readMins: db.reading_time_minutes ?? 5,
    author: { initials, name: db.author, role: db.author_role ?? "" },
    glyph: cat.slice(0, 3).toUpperCase(),
    glyphSub: cat,
    featured: db.featured,
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "welsh-voice-agents-bryn",
    cat: "AI", catId: "ai", catTone: "gold",
    title: "Why a Welsh voice agent answers the phone better than a London call-centre",
    excerpt: "Eleven Llanrwsts in our call data. Six valid towns. Five wrong ones. Here is what we learned training a voice agent on Welsh-English calls.",
    date: "12 May 2026", readMins: 8,
    author: { initials: "CJ", name: "Catrin Jenkins", role: "Head of content · Bangor" },
    glyph: "B", glyphSub: "Voice / AI",
    featured: true,
  },
  {
    slug: "pipeline-to-revenue",
    cat: "Automation", catId: "auto",
    title: "Pipeline-to-revenue: what 38 lead flows have taught us",
    excerpt: "A field guide to building automation that survives Monday morning. Patterns we keep reusing across 38 live pipelines.",
    date: "06 May 2026", readMins: 6,
    author: { initials: "AP", name: "Alaw Pugh", role: "Lead automations engineer" },
    glyph: "38", glyphSub: "Pipelines",
  },
  {
    slug: "lighthouse-not-vanity",
    cat: "Web Dev", catId: "web",
    title: "Lighthouse 96, not vanity: how we keep clients fast in year two",
    excerpt: "Most sites slow down the moment the agency leaves the room. Why ours don't — and the budgets we enforce in CI.",
    date: "29 Apr 2026", readMins: 7,
    author: { initials: "EW", name: "Eira Wynne", role: "Lead engineer" },
    glyph: "96", glyphSub: "Performance",
  },
  {
    slug: "seo-without-the-snake-oil",
    cat: "SEO", catId: "seo",
    title: "SEO without the snake oil: what to spend your budget on",
    excerpt: "A 1,400-word reality check on SEO retainers, with the four budget lines we recommend and the three we cut.",
    date: "22 Apr 2026", readMins: 9,
    author: { initials: "CJ", name: "Catrin Jenkins", role: "Head of content · Bangor" },
    glyph: "seo", glyphSub: "SEO",
  },
  {
    slug: "snowdon-trails-case",
    cat: "Case Studies", catId: "cases", catTone: "gold",
    title: "How Snowdon Trails took 80 bookings in the three weeks Bryn went live",
    excerpt: "A long-form case study with the numbers, the build log, and David Morgan's favourite Bryn moment.",
    date: "15 Apr 2026", readMins: 11,
    author: { initials: "RT", name: "Rhys Thomas", role: "Founder" },
    glyph: "80", glyphSub: "Bookings",
  },
  {
    slug: "ai-detector-zero",
    cat: "AI", catId: "ai", catTone: "gold",
    title: "Why we still ship long-form content that no AI detector flags",
    excerpt: "A pipeline note. Voice profiles, senior editing, owner sign-off — and the bit that actually catches the smell.",
    date: "08 Apr 2026", readMins: 5,
    author: { initials: "CJ", name: "Catrin Jenkins", role: "Head of content · Bangor" },
    glyph: "0", glyphSub: "Detector flags",
  },
  {
    slug: "agent-permissions",
    cat: "AI", catId: "ai", catTone: "gold",
    title: "The boring guide to AI-agent permissions (read this before you build one)",
    excerpt: "A short primer on scoping what agents can read and write. Skip it and you will skip the audit, too.",
    date: "01 Apr 2026", readMins: 6,
    author: { initials: "EW", name: "Eira Wynne", role: "Lead engineer" },
    glyph: "AI", glyphSub: "Governance",
  },
  {
    slug: "webflow-or-wordpress",
    cat: "Web Dev", catId: "web",
    title: "Webflow or WordPress, in 2026",
    excerpt: "The decision tree we actually use on every client. Spoiler: it is not always the trendy answer.",
    date: "25 Mar 2026", readMins: 5,
    author: { initials: "EW", name: "Eira Wynne", role: "Lead engineer" },
    glyph: "CMS", glyphSub: "Decision tree",
  },
  {
    slug: "cart-recovery-rates",
    cat: "Automation", catId: "auto",
    title: "Cart-recovery rates across 8 UK stores — what actually moves them",
    excerpt: "A breakdown of cadence, copy, channel mix, and the one timing change that doubled our median.",
    date: "18 Mar 2026", readMins: 7,
    author: { initials: "AP", name: "Alaw Pugh", role: "Lead automations engineer" },
    glyph: "12%", glyphSub: "Median recovery",
  },
  {
    slug: "local-seo-bangor",
    cat: "SEO", catId: "seo",
    title: "A 30-minute local SEO setup for any Welsh small business",
    excerpt: "Google Business, NAP citations, schema, and the three local-pack tweaks worth doing tonight.",
    date: "11 Mar 2026", readMins: 4,
    author: { initials: "CJ", name: "Catrin Jenkins", role: "Head of content · Bangor" },
    glyph: "local", glyphSub: "Local",
  },
  {
    slug: "one-bill-instead-of-five",
    cat: "Automation", catId: "auto",
    title: "Why we charge one bill instead of five (and how the maths actually works)",
    excerpt: "A founder note on retainer pricing. Why bundling beats unbundling for small businesses — and what it gives up.",
    date: "04 Mar 2026", readMins: 6,
    author: { initials: "RT", name: "Rhys Thomas", role: "Founder" },
    glyph: "1/5", glyphSub: "Pricing",
  },
  {
    slug: "gdpr-uk-residency",
    cat: "AI", catId: "ai", catTone: "gold",
    title: "GDPR and UK data residency for AI — a checklist that fits on one page",
    excerpt: "The ten things we tick off before any agent goes anywhere near client data.",
    date: "25 Feb 2026", readMins: 5,
    author: { initials: "EW", name: "Eira Wynne", role: "Lead engineer" },
    glyph: "GB", glyphSub: "Compliance",
  },
]
