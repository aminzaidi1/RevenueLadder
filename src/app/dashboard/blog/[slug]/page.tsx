import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPost } from "@/lib/supabase/blog"
import { BlogPostForm } from "@/components/dashboard/BlogPostForm"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  return { title: post ? `Edit: ${post.title} | Revenue Ladder` : "Post not found" }
}

export default async function EditBlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) notFound()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/blog">Blog</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{post.title}</span>
          </div>
          <div className="tb-r">
            <span className={`bdg ${post.published ? "bdg-ok" : "bdg-wa"}`}>
              {post.published ? "Published" : "Draft"}
            </span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Edit post</h1>
            <div className="sub mono" style={{ fontSize: 12 }}>/{post.slug}</div>
          </div>
        </div>

        <BlogPostForm post={post} />
      </div>
    </>
  )
}
