import type { MetadataRoute } from "next"
import { listBlogPosts } from "@/lib/supabase/blog"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"
const STATIC_DATE = new Date("2026-05-22")

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                                          lastModified: STATIC_DATE, changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/pricing`,                             lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/services`,                            lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/contact`,                             lastModified: STATIC_DATE, changeFrequency: "yearly",  priority: 0.8 },
  { url: `${BASE}/blog`,                                lastModified: STATIC_DATE, changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/about`,                               lastModified: STATIC_DATE, changeFrequency: "yearly",  priority: 0.6 },
  { url: `${BASE}/services/web-development`,            lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/web-app-development`,        lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/seo`,                        lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/marketing-automation`,       lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/voice-agents`,               lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/chatbots`,                   lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/personalised-ai-agents`,     lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/ai-consultation`,            lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/automated-social-media`,     lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/content-generation`,         lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/devops-hosting`,             lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/audit-strategy`,             lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/project-build`,              lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/services/retainer`,                   lastModified: STATIC_DATE, changeFrequency: "monthly", priority: 0.7 },
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
