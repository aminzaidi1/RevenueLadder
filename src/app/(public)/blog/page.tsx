import type { Metadata } from "next"
import { BlogIndexClient } from "@/components/blog/BlogIndexClient"
import { listBlogPosts } from "@/lib/supabase/blog"
import { mapDbPost, type BlogCategory } from "@/lib/blog-data"

export const revalidate = 60

export const metadata: Metadata = {
  title: "AI, automation & web design blog | Revenue Ladder",
  description:
    "Long-form writing on AI, automation, websites, and the engineering work that makes small-business growth boring on purpose. From the team in Bangor, Wales.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI, automation & web design blog | Revenue Ladder",
    description:
      "Long-form writing on AI, automation, websites, and the engineering work that makes small-business growth boring on purpose.",
    url: "/blog",
  },
}

export default async function BlogIndexPage() {
  const dbPosts = await listBlogPosts({ publishedOnly: true })
  const posts = dbPosts.map(mapDbPost)

  const catCounts = new Map<string, { label: string; count: number }>()
  for (const p of posts) {
    const existing = catCounts.get(p.catId)
    if (existing) existing.count++
    else catCounts.set(p.catId, { label: p.cat, count: 1 })
  }
  const categories: BlogCategory[] = [
    { id: "all", label: "All", count: posts.length },
    ...Array.from(catCounts.entries()).map(([id, { label, count }]) => ({ id, label, count })),
  ]

  return <BlogIndexClient posts={posts} categories={categories} />
}
