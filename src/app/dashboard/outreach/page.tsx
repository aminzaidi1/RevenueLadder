import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, Mail, NotebookPen, FileText, BookOpen } from "lucide-react"
import {
  listCalls,
  listEmails,
  listJournal,
  listReports,
  CALL_OUTCOMES,
  EMAIL_OUTCOMES,
  localYmd,
  type DbCall,
  type CallOutcome,
} from "@/lib/supabase/outreach"
import { BarChart } from "@/components/dashboard/outreach/BarChart"
import { DonutChart } from "@/components/dashboard/outreach/DonutChart"
import { LogCallButton } from "@/components/dashboard/outreach/LogCallButton"
import { CALL_OUTCOME_LABELS, EMAIL_OUTCOME_LABELS } from "@/components/dashboard/outreach/OutcomeBadge"

export const metadata: Metadata = { title: "Outreach | Revenue Ladder" }

const OUTCOME_COLOURS: Record<CallOutcome, string> = {
  booked:         "var(--rl-forest)",
  callback:       "var(--rl-gold)",
  not_interested: "#dc2626",
  no_answer:      "#9ca3af",
  left_vm:        "#6b7280",
}

function shortDay(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

function fmtStamp(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  })
}

function buildCallVolume(calls: DbCall[], days = 30) {
  const buckets = new Map<string, number>()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    buckets.set(localYmd(d), 0)
  }
  for (const c of calls) {
    if (buckets.has(c.call_date)) {
      buckets.set(c.call_date, (buckets.get(c.call_date) ?? 0) + 1)
    }
  }
  return Array.from(buckets.entries()).map(([key, value]) => ({
    label: shortDay(new Date(key)),
    value,
    tooltip: `${key}: ${value} call${value === 1 ? "" : "s"}`,
  }))
}

export default async function OutreachOverviewPage() {
  const [calls, emails, journal, reports] = await Promise.all([
    listCalls(),
    listEmails(),
    listJournal(),
    listReports(),
  ])

  const volume = buildCallVolume(calls, 30)
  const totalLast30 = volume.reduce((s, d) => s + d.value, 0)

  const outcomeCounts = CALL_OUTCOMES.reduce<Record<CallOutcome, number>>((acc, o) => {
    acc[o] = 0
    return acc
  }, { booked: 0, callback: 0, not_interested: 0, no_answer: 0, left_vm: 0 })

  for (const c of calls) outcomeCounts[c.outcome] += 1
  const totalDecided = outcomeCounts.booked + outcomeCounts.callback + outcomeCounts.not_interested
  const winRate = totalDecided > 0 ? Math.round((outcomeCounts.booked / totalDecided) * 100) : 0

  const repliedCount = emails.filter((e) =>
    e.outcome === "replied_positive" || e.outcome === "replied_negative" || e.outcome === "meeting_booked"
  ).length
  const replyRate = emails.length > 0 ? Math.round((repliedCount / emails.length) * 100) : 0

  const journalByName = journal.reduce<Record<string, number>>((acc, j) => {
    acc[j.name] = (acc[j.name] ?? 0) + 1
    return acc
  }, {})
  const journalRanked = Object.entries(journalByName).sort((a, b) => b[1] - a[1])

  const recentReports = reports.slice(0, 5)

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Outreach</span>
          </div>
          <div className="tb-r">
            <LogCallButton />
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Outreach</h1>
            <div className="sub">A calm read on what you have done, what is working, and where to push.</div>
          </div>
        </div>

        <div className="stat-grid">
          <Stat icon={PhoneCall} label="Calls (30 days)" value={String(totalLast30)} sub={`${calls.length} total logged`} />
          <Stat icon={Mail} label="Email reply rate" value={`${replyRate}%`} sub={`${repliedCount} of ${emails.length} replied`} gold />
          <Stat icon={NotebookPen} label="Journal entries" value={String(journal.length)} sub={`${journalRanked.length} ${journalRanked.length === 1 ? "rep" : "reps"} writing`} />
          <Stat icon={FileText} label="Win rate" value={`${winRate}%`} sub={`${outcomeCounts.booked} booked of ${totalDecided} decided`} gold />
        </div>

        <div className="row-2">
          <div className="surface">
            <div className="surface-hd">
              <h3>Call volume</h3>
              <span className="meta">Last 30 days</span>
            </div>
            <div className="surface-bd">
              <BarChart data={volume} />
            </div>
          </div>

          <div className="surface">
            <div className="surface-hd">
              <h3>Outcome breakdown</h3>
              <span className="meta">All time</span>
            </div>
            <div className="surface-bd" style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <DonutChart
                data={CALL_OUTCOMES.map((o) => ({
                  label: CALL_OUTCOME_LABELS[o].label,
                  value: outcomeCounts[o],
                  color: OUTCOME_COLOURS[o],
                }))}
                centerTop={`${calls.length}`}
                centerBottom="calls"
              />
              <div className="ox-legend">
                {CALL_OUTCOMES.map((o) => (
                  <div key={o} className="ox-legend-row">
                    <span className="ox-legend-swatch" style={{ background: OUTCOME_COLOURS[o] }} />
                    <span className="ox-legend-lbl">{CALL_OUTCOME_LABELS[o].label}</span>
                    <span className="ox-legend-val">{outcomeCounts[o]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row-2">
          <div className="surface">
            <div className="surface-hd">
              <h3>Journal activity</h3>
              <span className="meta">By rep</span>
            </div>
            <div className="surface-bd">
              {journalRanked.length === 0 ? (
                <div className="ox-empty">No entries yet.</div>
              ) : (
                <div className="ox-journal-rank">
                  {journalRanked.map(([name, count]) => {
                    const max = journalRanked[0][1]
                    const pct = Math.round((count / max) * 100)
                    return (
                      <div key={name} className="ox-journal-rank-row">
                        <div className="ox-journal-rank-name">{name}</div>
                        <div className="ox-journal-rank-bar">
                          <div className="ox-journal-rank-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="ox-journal-rank-count">{count}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="surface">
            <div className="surface-hd">
              <h3>Recent reports</h3>
              <Link href="/dashboard/outreach/reports" className="meta" style={{ textDecoration: "none" }}>
                View all
              </Link>
            </div>
            <div className="surface-bd">
              {recentReports.length === 0 ? (
                <div className="ox-empty">No reports yet. Claude Code writes them here.</div>
              ) : (
                <div className="ox-mini-reports">
                  {recentReports.map((r) => (
                    <Link key={r.id} href={`/dashboard/outreach/reports/${r.id}`} className="ox-mini-report">
                      <div>
                        <div className="ox-mini-report-title">{r.title}</div>
                        <div className="ox-mini-report-meta">{fmtStamp(r.created_at)}</div>
                      </div>
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ox-shortcut-row">
          <Shortcut href="/dashboard/outreach/calls" icon={PhoneCall} title="Calls" desc="Log and review every dial." />
          <Shortcut href="/dashboard/outreach/emails" icon={Mail} title="Emails" desc="Subject lines, sequences, replies." />
          <Shortcut href="/dashboard/outreach/journal" icon={NotebookPen} title="Journal" desc="Reflect. The patterns surface here." />
          <Shortcut href="/dashboard/outreach/knowledge" icon={BookOpen} title="Knowledge base" desc="Shared context Claude reads from." />
        </div>

        {emails.length > 0 && (
          <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginTop: 20 }}>
            Email outcomes: {EMAIL_OUTCOMES.map((o) => `${EMAIL_OUTCOME_LABELS[o].label} ${emails.filter((e) => e.outcome === o).length}`).join(" · ")}
          </div>
        )}
      </div>
    </>
  )
}

function Stat({ icon: Icon, label, value, sub, gold }: { icon: typeof PhoneCall; label: string; value: string; sub: string; gold?: boolean }) {
  return (
    <div className="stat">
      <div className="top">
        <div className="lbl">{label}</div>
        <div className={`icb${gold ? " gold" : ""}`}>
          <Icon size={16} strokeWidth={2} />
        </div>
      </div>
      <div className="v">{value}</div>
      <div className="chg" style={{ color: "var(--rl-fg-3)" }}>{sub}</div>
    </div>
  )
}

function Shortcut({ href, icon: Icon, title, desc }: { href: string; icon: typeof PhoneCall; title: string; desc: string }) {
  return (
    <Link href={href} className="ox-shortcut">
      <div className="ox-shortcut-ic"><Icon size={16} strokeWidth={2} /></div>
      <div className="ox-shortcut-body">
        <div className="ox-shortcut-title">{title}</div>
        <div className="ox-shortcut-desc">{desc}</div>
      </div>
      <ArrowRight size={14} strokeWidth={2} className="ox-shortcut-arrow" />
    </Link>
  )
}
