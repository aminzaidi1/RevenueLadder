import type { Metadata } from "next"
import Link from "next/link"
import { PenSquare, Eye, FileText } from "lucide-react"
import { listBlogPosts } from "@/lib/supabase/blog"

export const metadata: Metadata = { title: "Blog posts | Revenue Ladder" }

export default async function DashboardBlogPage() {
  const posts = await listBlogPosts()

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
            <div className="sub">{posts.length} {posts.length === 1 ? "post" : "posts"}</div>
          </div>
        </div>

        <div className="surface">
          {posts.length === 0 ? (
            <div style={{ padding: "48px 22px", textAlign: "center", color: "var(--rl-fg-3)", fontSize: 14 }}>
              No posts yet.{" "}
              <Link href="/dashboard/blog/new" style={{ color: "var(--rl-forest)", fontWeight: 700 }}>
                Create your first post
              </Link>
            </div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="nm">{post.title}</div>
                      <div className="sub-text mono">/{post.slug}</div>
                    </td>
                    <td>
                      {post.category
                        ? <span className="bdg bdg-p">{post.category}</span>
                        : <span style={{ color: "var(--rl-fg-3)", fontSize: 12 }}>None</span>
                      }
                    </td>
                    <td>
                      <div className="nm">{post.author}</div>
                      {post.author_role && <div className="sub-text">{post.author_role}</div>}
                    </td>
                    <td>
                      {post.published
                        ? <span className="bdg bdg-ok">Published</span>
                        : <span className="bdg bdg-wa">Draft</span>
                      }
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        {post.published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="abtn ghost sm"
                            title="View post"
                          >
                            <Eye size={13} strokeWidth={2} />
                          </Link>
                        )}
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
          )}
        </div>
      </div>
    </>
  )
}
