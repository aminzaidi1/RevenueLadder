import type { MetadataRoute } from "next"

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
