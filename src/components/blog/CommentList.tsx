import type { BlogComment } from "@/lib/supabase/blog"

export function CommentList({ comments }: { comments: BlogComment[] }) {
  if (comments.length === 0) return null

  return (
    <div className="bl-comments">
      <h3 className="bl-comments-hd">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </h3>
      <div className="bl-comment-list">
        {comments.map((c) => {
          const date = new Date(c.created_at).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
          })
          const initials = c.author_name.trim().split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").slice(0, 2).join("")
          return (
            <div key={c.id} className="bl-comment">
              <div className="bl-comment-av">{initials}</div>
              <div className="bl-comment-body">
                <div className="bl-comment-meta">
                  <span className="bl-comment-author">{c.author_name}</span>
                  <span className="bl-comment-date">{date}</span>
                </div>
                <p className="bl-comment-text">{c.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
