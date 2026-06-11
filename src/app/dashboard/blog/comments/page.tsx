import type { Metadata } from "next"
import Link from "next/link"
import { listAllCommentsWithPost } from "@/lib/supabase/blog"
import { CommentModerationTable } from "@/components/dashboard/CommentModerationTable"

export const metadata: Metadata = { title: "Comments | Revenue Ladder" }

export default async function CommentsPage() {
  const comments = await listAllCommentsWithPost()
  const pending = comments.filter((c) => !c.approved).length

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Comments</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Comments</h1>
            <div className="sub">
              {comments.length} total
              {pending > 0 && (
                <span style={{ marginLeft: 8 }}>
                  <span className="bdg bdg-wa">{pending} pending</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="surface">
          <CommentModerationTable comments={comments} />
        </div>
      </div>
    </>
  )
}
