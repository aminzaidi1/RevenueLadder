import type { MetadataRoute } from "next"
import { listBlogPosts } from "@/lib/supabase/blog"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"
const d = (s: string) => new Date(s)

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                                          lastModified: d("2026-05-22"), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/pricing`,                             lastModified: d("2026-05-01"), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/services`,                            lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/contact`,                             lastModified: d("2026-01-15"), changeFrequency: "yearly",  priority: 0.8 },
  { url: `${BASE}/blog`,                                lastModified: d("2026-05-22"), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/case-studies`,                        lastModified: d("2026-06-13"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/case-studies/arrow-taxi-bangor`,      lastModified: d("2026-06-13"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about`,                               lastModified: d("2026-01-15"), changeFrequency: "yearly",  priority: 0.6 },
  { url: `${BASE}/services/web-development`,            lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/web-app-development`,        lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/seo`,                        lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/marketing-automation`,       lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/voice-agents`,               lastModified: d("2026-04-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/chatbots`,                   lastModified: d("2026-04-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/personalised-ai-agents`,     lastModified: d("2026-04-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/ai-consultation`,            lastModified: d("2026-04-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/automated-social-media`,     lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/content-generation`,         lastModified: d("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/devops-hosting`,             lastModified: d("2026-03-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/audit-strategy`,             lastModified: d("2026-03-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/project-build`,              lastModified: d("2026-03-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/retainer`,                   lastModified: d("2026-05-01"), changeFrequency: "monthly", priority: 0.7 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listBlogPosts({ publishedOnly: true })
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...STATIC_ROUTES, ...blogEntries]
}
