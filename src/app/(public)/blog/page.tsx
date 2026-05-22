import type { Metadata } from "next"
import { BlogIndexClient } from "@/components/blog/BlogIndexClient"

export const metadata: Metadata = {
  title: "Blog | Revenue Ladder",
  description:
    "Long-form writing on AI, automation, websites, and the engineering work that makes small-business growth boring on purpose. From the team in Bangor, Wales.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Revenue Ladder",
    description:
      "Long-form writing on AI, automation, websites, and the engineering work that makes small-business growth boring on purpose.",
    url: "/blog",
  },
}

export default function BlogIndexPage() {
  return <BlogIndexClient />
}
