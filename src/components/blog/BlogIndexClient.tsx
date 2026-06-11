"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { type BlogPost, type BlogCategory } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog/BlogCard"

const POSTS_PER_PAGE = 9

function GlyphThumb({ glyph, glyphSub, cat, catTone, small }: {
  glyph: string
  glyphSub: string
  cat: string
  catTone?: "gold"
  small?: boolean
}) {
  const isShort = glyph.length <= 2
  return (
    <div style={{
      background: isShort
        ? "repeating-linear-gradient(-45deg, rgba(26,77,46,.06) 0 10px, rgba(26,77,46,.02) 10px 20px)"
        : "var(--rl-forest-tint)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", height: "100%",
    }}>
      <span style={{
        position: "absolute", top: 12, left: 12,
        fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em",
        color: catTone === "gold" ? "var(--rl-gold-deep)" : "var(--rl-forest)",
        background: catTone === "gold" ? "var(--rl-gold-tint)" : "var(--rl-forest-tint)",
        padding: "3px 10px", borderRadius: 9999,
      }}>
        {cat}
      </span>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
          fontSize: isShort ? (small ? 36 : 52) : (small ? 18 : 28),
          color: "var(--rl-forest)", lineHeight: 1,
        }}>
          {glyph}
        </div>
        <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginTop: 4, fontWeight: 600 }}>
          {glyphSub}
        </div>
      </div>
    </div>
  )
}


export function BlogIndexClient({ posts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const [filter, setFilter] = useState("all")
  const [page, setPage] = useState(1)

  const featured = posts.find(p => p.featured) ?? posts[0] ?? null
  const rest = posts.filter(p => p !== featured)
  const filtered = filter === "all" ? rest : rest.filter(p => p.catId === filter)
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const visiblePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleFilter(id: string) {
    setFilter(id)
    setPage(1)
  }

  return (
    <>
      {/* Header */}
      <section className="rl-blog-header" style={{ background: "var(--rl-bg)" }}>
        <div className="rl-inner">
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720, margin: "0 auto 40px", textAlign: "center", alignItems: "center" }}>
            <span style={{
              display: "inline-flex", alignItems: "center",
              fontFamily: "var(--rl-font-body)", fontSize: 11, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: ".18em",
              color: "var(--rl-forest)", background: "var(--rl-forest-tint)",
              padding: "5px 14px", borderRadius: 9999,
            }}>
              The RevenueLadder journal
            </span>
            <h1 style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, letterSpacing: "-.03em",
              color: "var(--rl-fg-1)",
            }}>
              Field notes from<br />
              the team in <em style={{ fontStyle: "italic", color: "var(--rl-forest)" }}>Bangor</em>.
            </h1>
            <p style={{ fontSize: 18, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 560 }}>
              Long-form writing on AI, automation, websites, and the engineering work
              that makes small-business growth boring on purpose.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", paddingBottom: 48 }}>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => handleFilter(c.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontFamily: "var(--rl-font-body)", fontSize: 13, fontWeight: 600,
                  padding: "8px 16px", borderRadius: 9999, cursor: "pointer",
                  border: "2px solid",
                  borderColor: filter === c.id ? "var(--rl-forest)" : "var(--rl-border-soft)",
                  background: filter === c.id ? "var(--rl-forest)" : "var(--rl-surface)",
                  color: filter === c.id ? "#fff" : "var(--rl-fg-2)",
                  transition: "all .18s ease",
                }}
              >
                {c.label}
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: filter === c.id ? "rgba(255,255,255,.2)" : "var(--rl-slate-100)",
                  color: filter === c.id ? "#fff" : "var(--rl-fg-3)",
                  padding: "1px 7px", borderRadius: 9999,
                }}>
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {filter === "all" && featured && (
        <section style={{ background: "var(--rl-bg)" }}>
          <div className="rl-inner" style={{ paddingBottom: 40 }}>
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }}>
              <div
                className={featured.coverImage ? undefined : "rl-blog-featured"}
                style={{
                  background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
                  borderRadius: 24, overflow: "hidden",
                }}
              >
                {featured.coverImage ? (
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div style={{ minHeight: 180, position: "relative" }} className="rl-blog-featured-thumb">
                    <GlyphThumb glyph={featured.glyph} glyphSub={featured.glyphSub} cat={featured.cat} catTone={featured.catTone} />
                  </div>
                )}
                <div className="rl-blog-feat-content">
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: "var(--rl-gold-deep)",
                    background: "var(--rl-gold-tint)", padding: "3px 12px", borderRadius: 9999, alignSelf: "flex-start",
                  }}>
                    Featured · {featured.date}
                  </span>
                  <h2 style={{
                    fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 800,
                    fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.2, letterSpacing: "-.02em",
                    color: "var(--rl-fg-1)",
                  }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--rl-fg-2)", lineHeight: 1.65, flex: 1 }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "var(--rl-forest)", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800,
                        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                      }}>
                        {featured.author.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-fg-1)" }}>{featured.author.name}</div>
                        <div style={{ fontSize: 12, color: "var(--rl-fg-3)" }}>{featured.author.role} · {featured.readMins} min read</div>
                      </div>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--rl-forest)" }}>
                      Read the article <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="rl-blog-posts-section" style={{ background: "var(--rl-bg)" }}>
        <div className="rl-inner">
          {visiblePosts.length > 0 ? (
            <div className="rl-grid-3" style={{ marginBottom: 48 }}>
              {visiblePosts.map(post => (
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
                  coverImage={post.coverImage}
                />
              ))}
            </div>
          ) : (
            <div style={{ padding: "80px 0", textAlign: "center", color: "var(--rl-fg-3)", fontSize: 15 }}>
              No posts in this category yet. Check back next month.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                style={{
                  width: 38, height: 38, borderRadius: 10, border: "2px solid var(--rl-border-soft)",
                  background: "var(--rl-surface)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: page === 1 ? "default" : "pointer", opacity: page === 1 ? 0.4 : 1,
                }}
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: "2px solid",
                    borderColor: page === n ? "var(--rl-forest)" : "var(--rl-border-soft)",
                    background: page === n ? "var(--rl-forest)" : "var(--rl-surface)",
                    color: page === n ? "#fff" : "var(--rl-fg-2)",
                    fontWeight: 700, fontSize: 13, cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                style={{
                  width: 38, height: 38, borderRadius: 10, border: "2px solid var(--rl-border-soft)",
                  background: "var(--rl-surface)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: page === totalPages ? "default" : "pointer", opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
