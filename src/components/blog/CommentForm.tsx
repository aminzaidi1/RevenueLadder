"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"

interface Props { slug: string }

export function CommentForm({ slug }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim() || !content.trim()) {
      setError("All fields are required.")
      return
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_name: name.trim(), author_email: email.trim(), content: content.trim() }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bl-comment-success">
        <CheckCircle size={22} strokeWidth={2} />
        <div>
          <div className="bl-comment-success-title">Comment submitted</div>
          <div className="bl-comment-success-sub">Your comment is awaiting moderation and will appear once approved.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bl-comment-form-wrap">
      <h3 className="bl-comments-hd">Leave a comment</h3>
      <form className="bl-comment-form" onSubmit={handleSubmit} noValidate>
        <div className="bl-cf-row">
          <div className="bl-cf-field">
            <label htmlFor="cf-name">Name</label>
            <input
              id="cf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="bl-cf-field">
            <label htmlFor="cf-email">Email <span className="bl-cf-note">(not published)</span></label>
            <input
              id="cf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="bl-cf-field">
          <label htmlFor="cf-content">Comment</label>
          <textarea
            id="cf-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
          />
        </div>
        {error && <div className="bl-cf-error">{error}</div>}
        <button type="submit" className="bl-cf-submit" disabled={submitting}>
          {submitting && <Loader2 size={14} strokeWidth={2} />}
          {submitting ? "Submitting..." : "Post comment"}
        </button>
      </form>
    </div>
  )
}
