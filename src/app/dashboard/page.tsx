import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Inbox, TrendingUp, Eye, ArrowRight, PenSquare, MessageSquare } from "lucide-react"
import { getBlogStats } from "@/lib/supabase/blog"

export const metadata: Metadata = { title: "Overview | Revenue Ladder" }

export default async function DashboardPage() {
  const stats = await getBlogStats()

  const STATS = [
    {
      lbl: "Published posts",
      v: String(stats.publishedCount),
      chg: `${stats.draftCount} draft${stats.draftCount === 1 ? "" : "s"}`,
      up: stats.publishedCount > 0,
      icon: FileText,
      gold: false,
    },
    {
      lbl: "Total blog views",
      v: stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}k` : String(stats.totalViews),
      chg: "Across all published posts",
      up: stats.totalViews > 0,
      icon: Eye,
      gold: false,
    },
    {
      lbl: "Pending comments",
      v: String(stats.pendingComments),
      chg: stats.pendingComments > 0 ? "Awaiting moderation" : "All clear",
      up: stats.pendingComments === 0,
      icon: MessageSquare,
      gold: stats.pendingComments > 0,
    },
    {
      lbl: "Contact submissions",
      v: "--",
      chg: "Coming soon",
      up: false,
      icon: Inbox,
      gold: false,
    },
  ]

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <span>Revenue Ladder</span>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Overview</span>
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
            <h1>Overview</h1>
            <div className="sub">Welcome back. Here is what is happening on the site.</div>
          </div>
        </div>

        <h2 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          Key metrics
        </h2>
        <div className="stat-grid">
          {STATS.map(({ lbl, v, chg, up, icon: Icon, gold }) => (
            <div key={lbl} className="stat">
              <div className="top">
                <div className="lbl">{lbl}</div>
                <div className={`icb${gold ? " gold" : ""}`}>
                  <Icon size={16} strokeWidth={2} />
                </div>
              </div>
              <div className="v">{v}</div>
              <div className={`chg ${up ? "up" : "dn"}`}>
                <TrendingUp size={11} strokeWidth={2.5} />
                {chg}
              </div>
            </div>
          ))}
        </div>

        <div className="row-2">
          <div className="surface">
            <div className="surface-hd">
              <h3>Top posts by views</h3>
              <Link href="/dashboard/blog" style={{ fontSize: 12, color: "var(--rl-forest)", fontWeight: 700, textDecoration: "none" }}>
                View all
              </Link>
            </div>
            {stats.topPosts.length === 0 ? (
              <div style={{ padding: "32px 22px", color: "var(--rl-fg-3)", fontSize: 13 }}>
                No published posts yet.
              </div>
            ) : (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Post</th>
                    <th style={{ textAlign: "right" }}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topPosts.map((p) => (
                    <tr key={p.slug}>
                      <td>
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          style={{ color: "var(--rl-fg-1)", fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                        >
                          {p.title}
                        </Link>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span style={{ fontFamily: "var(--rl-font-mono)", fontSize: 13, fontWeight: 700, color: "var(--rl-forest)" }}>
                          {p.views.toLocaleString("en-GB")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="surface">
              <div className="surface-hd"><h3>Quick links</h3></div>
              <div className="surface-bd" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/dashboard/blog" className="abtn outline" style={{ justifyContent: "flex-start" }}>
                  <FileText size={14} strokeWidth={2} /> Manage blog posts
                  <ArrowRight size={13} style={{ marginLeft: "auto" }} />
                </Link>
                <Link href="/dashboard/blog/comments" className="abtn outline" style={{ justifyContent: "flex-start" }}>
                  <MessageSquare size={14} strokeWidth={2} /> Moderate comments
                  {stats.pendingComments > 0 && (
                    <span className="bdg bdg-wa" style={{ marginLeft: "auto" }}>{stats.pendingComments}</span>
                  )}
                </Link>
                <Link href="/dashboard/contacts" className="abtn outline" style={{ justifyContent: "flex-start" }}>
                  <Inbox size={14} strokeWidth={2} /> View contact submissions
                  <ArrowRight size={13} style={{ marginLeft: "auto" }} />
                </Link>
                <Link href="/" target="_blank" className="abtn ghost" style={{ justifyContent: "flex-start" }}>
                  <Eye size={14} strokeWidth={2} /> View public site
                </Link>
              </div>
            </div>

            <div className="help-card">
              <h4>Ready to publish?</h4>
              <p>Write in the blog editor, set status to Draft, and publish when ready. Tags and excerpt are required before publishing.</p>
              <Link href="/dashboard/blog/new" className="abtn accent sm">
                New post <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
