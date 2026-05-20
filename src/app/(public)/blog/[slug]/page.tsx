import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Check, ArrowRight, Mail, Zap } from "lucide-react"
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-data"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: "Post not found | RevenueLadder" }
  return {
    title: `${post.title} | RevenueLadder`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const sameCat = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.catId === post.catId)
  const otherCat = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.catId !== post.catId)
  const related = [...sameCat, ...otherCat].slice(0, 3)

  return (
    <>
      <section className="container">
        <div className="bl-post-wrap">
          <article className="bl-post">
            <div className="bl-post-head">
              <span className={`bl-post-cat${post.catTone === "gold" ? "" : " forest"}`}>
                {post.cat}
              </span>
              <h1>{post.title}</h1>
              <div className="bl-byline">
                <div className="av">{post.author.initials}</div>
                <div>
                  <div className="nm">{post.author.name}</div>
                  <div className="rl">{post.author.role}</div>
                </div>
                <div className="meta">
                  <span><Clock size={12} strokeWidth={2.5} /> {post.readMins} min read</span>
                  <span><Check size={12} strokeWidth={2.5} /> {post.date}</span>
                </div>
              </div>
            </div>

            <div className="bl-hero-img">
              <div className="cap">
                <b>{post.glyph}</b>
                {post.glyphSub} · {post.cat.toLowerCase()} · 1600x900
              </div>
            </div>

            <div className="bl-article">
              <p>
                {post.excerpt} Most teams looking at this problem reach for the same three answers,
                and most of those answers cost more than the problem itself. Here is what we actually
                shipped, and the bits we would do differently if we were starting over.
              </p>
              <p>
                Across the last twelve months we have shipped this work for fourteen Welsh and UK
                small businesses -- restaurants in Conwy, e-commerce shops in Cardiff, a coaching
                practice in Bristol, a trades business in Swansea. The pattern is consistent enough
                now that we can write the playbook in a single article.
              </p>

              <h2>The mistake most teams make first</h2>
              <p>
                It is rarely the obvious one. Most teams start by buying the tool -- Twilio, Klaviyo,
                HubSpot -- and then try to bend their business around what the tool wants. That works
                for the first two weeks and falls apart in month two, when the edge cases arrive and
                the documentation runs out.
              </p>
              <p>
                We start from the other side: write down the actual sentences your customers say on
                the phone, the actual lines in your support inbox, the actual events that get someone
                to buy. Then we pick a tool -- or build one -- to fit that shape.
              </p>

              <h3>Three patterns that keep working</h3>
              <ul>
                <li>
                  <strong>Lead-time over latency.</strong> Customers care less about how fast a
                  system replies and more about how predictable the reply is. A 6-hour SLA you always
                  hit beats a 4-hour SLA you sometimes miss.
                </li>
                <li>
                  <strong>Plain English over jargon.</strong> Every automation we ship gets a
                  one-line description any team member could read aloud. If we cannot write that
                  line, the automation is too clever.
                </li>
                <li>
                  <strong>Single source of truth.</strong> One CRM, one calendar, one inbox. Synced
                  everywhere, edited in one place. Sounds obvious, almost nobody does it.
                </li>
              </ul>

              <div className="bl-pull">
                <q>
                  The best automation is the one your team forgets is there. The worst one is the
                  one that drafts a five-paragraph reply to a &quot;thanks&quot; email.
                </q>
                <div className="attr">-- Eira Wynne, Lead Engineer</div>
              </div>

              <h2>What the data actually shows</h2>
              <p>
                We track three numbers on every retainer. Time-to-first-reply on inbound. Percentage
                of inbound that needs human review. Revenue attributable to automated work, against
                the same cohort the year before. The trends are almost monotonic in the first six
                months, then flatten -- which is where the tuning retainer does its real job.
              </p>

              <div className="bl-inline-img">
                chart · time-to-first-reply across 14 clients · last 12 months · 1600x900
              </div>

              <h3>What we would tell our past selves</h3>
              <p>
                Spend more time on the brief. Less on the demo. Demos sell projects; briefs ship
                them. The difference between a happy client at month three and a frustrated one is
                almost always &quot;did we scope this properly in writing in week one&quot;.
              </p>
              <p>
                Be honest about what AI cannot do. The team in Bangor has shipped voice agents that
                book holidays, chatbots that triage support, and drafters that write our newsletter.
                None of them are sentient. All of them are useful. Knowing the difference between
                those two sentences is most of the job.
              </p>
              <p>
                If you want to talk through a specific use case, the team picks up the phone -- or,
                more accurately, our voice agent does, and hands you over inside thirty seconds.
                Saturdays included.
              </p>
            </div>

            <div className="bl-author-bio">
              <div className="av">{post.author.initials}</div>
              <div>
                <div className="nm">{post.author.name}</div>
                <div className="rl">{post.author.role}</div>
                <div className="bio">
                  Writes most of the long-form on the RevenueLadder journal. Based in Bangor, North
                  Wales. If it involves plain English and a real number, it probably came from here.
                </div>
                <div className="links">
                  <Link href="/contact" aria-label="Email"><Mail size={14} /></Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="bl-side">
            <div className="bl-side-cta">
              <span className="eyebrow"><Zap size={11} strokeWidth={2.5} /> Book a call</span>
              <h4>Want this kind of work running in your business?</h4>
              <p>
                30-minute call with the team in Bangor. We will walk your stack and send a written
                plan within 48 hours.
              </p>
              <Link href="/contact" className="btn accent">
                Book a 30-min call <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bl-side-block">
              <h5>Related posts</h5>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="bl-related-item">
                  <div className="thumb">{r.glyph.length <= 4 ? r.glyph : ""}</div>
                  <div>
                    <div className="t">{r.title}</div>
                    <div className="d">{r.date} · {r.readMins} min</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bl-side-block">
              <h5>Categories</h5>
              {BLOG_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <Link key={c.id} href={`/blog?cat=${c.id}`} className="bl-cat-link">
                  {c.label}
                  <span className="count">{c.count}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section warm" style={{ marginTop: 64 }}>
        <div className="container">
          <div className="bl-related-head">
            <h2>You might also <em>like</em>.</h2>
            <Link href="/blog">
              View all posts <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="bl-related-grid">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="bl-card">
                <div className="bl-thumb">
                  <span className={`cat${p.catTone === "gold" ? " gold" : ""}`}>{p.cat}</span>
                  <span className="glyph">{p.glyph}<small>{p.glyphSub}</small></span>
                </div>
                <div className="bl-body">
                  <div className="bl-meta">
                    <span>{p.date}</span>
                    <span className="dot" />
                    <span>{p.readMins} min read</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="excerpt">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
