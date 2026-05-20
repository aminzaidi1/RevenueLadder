import type { Metadata } from "next"
import Link from "next/link"
import { PenSquare, Eye, FileText } from "lucide-react"
import { BLOG_POSTS } from "@/lib/blog-data"

export const metadata: Metadata = { title: "Blog posts | Revenue Ladder" }

export default function DashboardBlogPage() {
  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Blog</span>
          </div>
          <div className="tb-r">
            <Link href="/dashboard/blog/new" className="abtn primary sm">
              <PenSquare size={13} strokeWidth={2} /> New post
            </Link>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Blog posts</h1>
            <div className="sub">{BLOG_POSTS.length} posts</div>
          </div>
        </div>

        <div className="surface">
          <table className="tbl">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {BLOG_POSTS.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <div className="nm">{post.title}</div>
                    <div className="sub-text mono">/{post.slug}</div>
                  </td>
                  <td>
                    <span className="bdg bdg-p">{post.cat}</span>
                  </td>
                  <td>
                    <div className="nm">{post.author.name}</div>
                    <div className="sub-text">{post.author.role}</div>
                  </td>
                  <td>{post.date}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="abtn ghost sm"
                        title="View post"
                      >
                        <Eye size={13} strokeWidth={2} />
                      </Link>
                      <Link
                        href={`/dashboard/blog/${post.slug}`}
                        className="abtn outline sm"
                        title="Edit post"
                      >
                        <FileText size={13} strokeWidth={2} /> Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
