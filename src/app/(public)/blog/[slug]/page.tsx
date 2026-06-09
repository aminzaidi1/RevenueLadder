import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Check, ArrowRight, Mail, Zap } from "lucide-react"
import { getBlogPost, listBlogPosts } from "@/lib/supabase/blog"
import { mapDbPost, type BlogCategory } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog/BlogCard"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: "Post not found | RevenueLadder" }
  return {
    title: post.meta_title ?? `${post.title} | RevenueLadder`,
    description: post.meta_description ?? post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const dbPost = await getBlogPost(slug)
  if (!dbPost) notFound()

  const post = mapDbPost(dbPost)

  const allDbPosts = await listBlogPosts({ publishedOnly: true })
  const allPosts = allDbPosts.map(mapDbPost)
  const sameCat = allPosts.filter((p) => p.slug !== slug && p.catId === post.catId)
  const otherCat = allPosts.filter((p) => p.slug !== slug && p.catId !== post.catId)
  const related = [...sameCat, ...otherCat].slice(0, 3)

  const catCounts = new Map<string, { label: string; count: number }>()
  for (const p of allPosts) {
    const existing = catCounts.get(p.catId)
    if (existing) existing.count++
    else catCounts.set(p.catId, { label: p.cat, count: 1 })
  }
  const categories: BlogCategory[] = Array.from(catCounts.entries()).map(([id, { label, count }]) => ({
    id, label, count,
  }))

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
              {dbPost.cover_image_url ? (
                <img
                  src={dbPost.cover_image_url}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="cap">
                  <b>{post.glyph}</b>
                  {post.glyphSub} · {post.cat.toLowerCase()}
                </div>
              )}
            </div>

            <div
              className="bl-article"
              dangerouslySetInnerHTML={{ __html: dbPost.content }}
            />

            <div className="bl-author-bio">
              <div className="av">{post.author.initials}</div>
              <div>
                <div className="nm">{post.author.name}</div>
                <div className="rl">{post.author.role}</div>
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
              {categories.map((c) => (
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
              <BlogCard
                key={p.slug}
                slug={p.slug}
                cat={p.cat}
                catTone={p.catTone}
                title={p.title}
                excerpt={p.excerpt}
                date={p.date}
                readingTime={p.readMins}
                glyph={p.glyph}
                glyphSub={p.glyphSub}
                author={p.author}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
