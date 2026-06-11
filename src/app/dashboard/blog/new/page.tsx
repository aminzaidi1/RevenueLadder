import type { Metadata } from "next"
import Link from "next/link"
import { listWriters } from "@/lib/supabase/blog"
import { BlogPostForm } from "@/components/dashboard/BlogPostForm"

export const metadata: Metadata = { title: "New post | Revenue Ladder" }

export default async function NewBlogPostPage() {
  const writers = await listWriters()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/blog">Blog</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">New post</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>New post</h1>
            <div className="sub">Draft saved automatically when you click Save</div>
          </div>
        </div>

        <BlogPostForm writers={writers} />
      </div>
    </>
  )
}
