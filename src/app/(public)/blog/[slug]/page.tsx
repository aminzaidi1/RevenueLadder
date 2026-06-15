import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Check, ArrowRight, Mail, Zap, AtSign, Globe } from "lucide-react"
import { getBlogPostWithWriter, listBlogPosts, listComments } from "@/lib/supabase/blog"
import { mapDbPost, type BlogCategory } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog/BlogCard"
import { CommentList } from "@/components/blog/CommentList"
import { CommentForm } from "@/components/blog/CommentForm"
import { ViewTracker } from "@/components/blog/ViewTracker"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostWithWriter(slug)
  if (!post) return { title: "Post not found | Revenue Ladder" }
  return {
    title: post.meta_title ?? `${post.title} | Revenue Ladder`,
    description: post.meta_description ?? post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const dbPost = await getBlogPostWithWriter(slug)
  if (!dbPost) notFound()

  const post = mapDbPost(dbPost)
  const writer = dbPost.writer_profiles

  const [allDbPosts, comments] = await Promise.all([
    listBlogPosts({ publishedOnly: true }),
    listComments({ postId: dbPost.id, approvedOnly: true }),
  ])

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

  const displayName = writer?.name ?? post.author.name
  const displayRole = post.author.role
  const avatarUrl = writer?.avatar_url ?? null
  const authorInitials = post.author.initials

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    author: {
      "@type": "Person",
      name: displayName,
      jobTitle: displayRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Revenue Ladder",
      url: "https://revenueladder.co.uk",
    },
    dateModified: dbPost.updated_at,
    url: `https://revenueladder.co.uk/blog/${slug}`,
    ...(dbPost.cover_image_url ? { image: dbPost.cover_image_url } : {}),
  }

  return (
    <>
      <ViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <section className="container">
        <div className="bl-post-wrap">
          <article className="bl-post">
            <div className="bl-post-head">
              <span className={`bl-post-cat${post.catTone === "gold" ? "" : " forest"}`}>
                {post.cat}
              </span>
              <h1>{post.title}</h1>
              <div className="bl-byline">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="av-img" />
                ) : (
                  <div className="av">{authorInitials}</div>
                )}
                <div>
                  <div className="nm">{displayName}</div>
                  <div className="rl">{displayRole}</div>
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
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="av-img av-img-lg" />
              ) : (
                <div className="av">{authorInitials}</div>
              )}
              <div>
                <div className="nm">{displayName}</div>
                <div className="rl">{displayRole}</div>
                {writer?.bio && <div className="bio">{writer.bio}</div>}
                <div className="links">
                  {writer?.twitter_handle && (
                    <Link
                      href={`https://twitter.com/${writer.twitter_handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <AtSign size={14} />
                    </Link>
                  )}
                  {writer?.linkedin_url && (
                    <Link
                      href={writer.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Globe size={14} />
                    </Link>
                  )}
                  <Link href="/contact" aria-label="Email"><Mail size={14} /></Link>
                </div>
              </div>
            </div>

            <CommentList comments={comments} />
            <CommentForm slug={slug} />
          </article>

          <aside className="bl-side">
            <div className="bl-side-cta">
              <span className="eyebrow"><Zap size={11} strokeWidth={2.5} /> Book a call</span>
              <h4>Want this kind of work running in your business?</h4>
              <p>
                30-minute call with the team in Bangor. We will walk your stack and send a written
                plan within 48 hours.
              </p>
              <a href="https://calendly.com/revenueladder/30min" target="_blank" rel="noopener noreferrer" className="btn accent">
                Book a 30-min call <ArrowRight size={14} />
              </a>
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
                coverImage={p.coverImage}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
