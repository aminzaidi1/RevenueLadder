import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Inbox, TrendingUp, Eye, ArrowRight, PenSquare, UserPlus, CheckCircle } from "lucide-react"

export const metadata: Metadata = { title: "Overview | Revenue Ladder" }

const STATS = [
  { lbl: "Published posts",    v: "12",   chg: "+2 this month",   up: true,  icon: FileText,     gold: false },
  { lbl: "Draft posts",        v: "3",    chg: "Awaiting review",  up: false, icon: PenSquare,    gold: true  },
  { lbl: "Contact submissions",v: "8",    chg: "+3 this week",    up: true,  icon: Inbox,        gold: false },
  { lbl: "Blog page views",    v: "1.4k", chg: "+18% vs last mo", up: true,  icon: Eye,          gold: false },
]

const ACTIVITY = [
  { icon: FileText,    bg: "var(--rl-forest-tint)", color: "var(--rl-forest)",   t: <><strong>Welsh Voice Agents</strong> post published</>,     m: "Today, 09:41 · Catrin Jenkins" },
  { icon: Inbox,       bg: "var(--rl-gold-tint)",   color: "var(--rl-gold-deep)",t: <><strong>New contact</strong> from Conwy Foods Ltd</>,       m: "Today, 08:15 · via /contact" },
  { icon: PenSquare,   bg: "var(--rl-forest-tint)", color: "var(--rl-forest)",   t: <><strong>Pipeline to Revenue</strong> draft saved</>,        m: "Yesterday, 16:30 · Alaw Pugh" },
  { icon: UserPlus,    bg: "var(--rl-gold-tint)",   color: "var(--rl-gold-deep)",t: <><strong>New contact</strong> from Snowdon Trails</>,        m: "Yesterday, 14:02 · via /contact" },
  { icon: CheckCircle, bg: "var(--rl-forest-tint)", color: "var(--rl-forest)",   t: <><strong>Lighthouse 96</strong> post published</>,           m: "2 days ago · Eira Wynne" },
]

export default function DashboardPage() {
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
              <h3>Recent activity</h3>
              <span className="meta">Last 7 days</span>
            </div>
            <div className="feed">
              {ACTIVITY.map(({ icon: Icon, bg, color, t, m }, i) => (
                <div key={i} className="feed-row">
                  <div className="dot-ic" style={{ background: bg, color }}>
                    <Icon size={15} strokeWidth={2} />
                  </div>
                  <div className="body">
                    <div className="t">{t}</div>
                    <div className="m">{m}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="surface">
              <div className="surface-hd"><h3>Quick links</h3></div>
              <div className="surface-bd" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/dashboard/blog" className="abtn outline" style={{ justifyContent: "flex-start" }}>
                  <FileText size={14} strokeWidth={2} /> Manage blog posts
                  <ArrowRight size={13} style={{ marginLeft: "auto" }} />
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

