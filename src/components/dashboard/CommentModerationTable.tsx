"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, X, Trash2, Loader2, ExternalLink } from "lucide-react"
import type { BlogCommentWithPost } from "@/lib/supabase/blog"

interface Props { comments: BlogCommentWithPost[] }

export function CommentModerationTable({ comments: initial }: Props) {
  const router = useRouter()
  const [comments, setComments] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)

  const approve = async (comment: BlogCommentWithPost) => {
    const slug = comment.blog_posts?.slug
    if (!slug) return
    setLoading(comment.id)
    try {
      const res = await fetch(`/api/blog/${slug}/comments/${comment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !comment.approved }),
      })
      if (res.ok) {
        setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, approved: !c.approved } : c))
        router.refresh()
      }
    } finally {
      setLoading(null)
    }
  }

  const remove = async (comment: BlogCommentWithPost) => {
    const slug = comment.blog_posts?.slug
    if (!slug) return
    if (!window.confirm("Delete this comment? This cannot be undone.")) return
    setLoading(comment.id)
    try {
      const res = await fetch(`/api/blog/${slug}/comments/${comment.id}`, { method: "DELETE" })
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== comment.id))
        router.refresh()
      }
    } finally {
      setLoading(null)
    }
  }

  if (comments.length === 0) {
    return (
      <div style={{ padding: "48px 22px", textAlign: "center", color: "var(--rl-fg-3)", fontSize: 14 }}>
        No comments yet.
      </div>
    )
  }

  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>Post</th>
          <th>Commenter</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {comments.map((c) => {
          const isLoading = loading === c.id
          const date = new Date(c.created_at).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
          })
          return (
            <tr key={c.id}>
              <td>
                {c.blog_posts ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div className="nm" style={{ fontSize: 12, maxWidth: 160 }}>{c.blog_posts.title}</div>
                    <Link
                      href={`/blog/${c.blog_posts.slug}`}
                      target="_blank"
                      style={{ color: "var(--rl-fg-3)", display: "flex" }}
                      title="View post"
                    >
                      <ExternalLink size={11} strokeWidth={2} />
                    </Link>
                  </div>
                ) : (
                  <span style={{ color: "var(--rl-fg-3)", fontSize: 12 }}>Unknown post</span>
                )}
              </td>
              <td>
                <div className="nm">{c.author_name}</div>
                <div className="sub-text">{c.author_email}</div>
              </td>
              <td style={{ maxWidth: 320 }}>
                <div style={{ fontSize: 13, color: "var(--rl-fg-1)", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {c.content}
                </div>
              </td>
              <td>
                <span style={{ fontFamily: "var(--rl-font-mono)", fontSize: 11, color: "var(--rl-fg-3)" }}>
                  {date}
                </span>
              </td>
              <td>
                {c.approved
                  ? <span className="bdg bdg-ok">Approved</span>
                  : <span className="bdg bdg-wa">Pending</span>
                }
              </td>
              <td>
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    className={`abtn sm ${c.approved ? "outline" : "primary"}`}
                    onClick={() => approve(c)}
                    disabled={isLoading}
                    title={c.approved ? "Unapprove" : "Approve"}
                  >
                    {isLoading ? <Loader2 size={12} strokeWidth={2} /> : c.approved ? <X size={12} strokeWidth={2.5} /> : <Check size={12} strokeWidth={2.5} />}
                    {c.approved ? "Unapprove" : "Approve"}
                  </button>
                  <button
                    type="button"
                    className="abtn ghost sm"
                    onClick={() => remove(c)}
                    disabled={isLoading}
                    title="Delete"
                  >
                    <Trash2 size={12} strokeWidth={2} />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
