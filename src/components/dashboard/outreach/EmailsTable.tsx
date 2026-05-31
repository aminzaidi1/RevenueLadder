"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { EMAIL_OUTCOMES, type DbEmail, type EmailOutcome } from "@/lib/outreach/types"
import { EMAIL_OUTCOME_LABELS, EmailOutcomeBadge } from "@/components/dashboard/outreach/OutcomeBadge"

interface EmailsTableProps {
  emails: DbEmail[]
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function truncate(s: string | null, max: number): string {
  if (!s) return ""
  return s.length <= max ? s : s.slice(0, max) + "…"
}

export function EmailsTable({ emails }: EmailsTableProps) {
  const [outcomeFilter, setOutcomeFilter] = useState<EmailOutcome | "all">("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return emails.filter((e) => {
      if (outcomeFilter !== "all" && e.outcome !== outcomeFilter) return false
      if (from && e.email_date < from) return false
      if (to && e.email_date > to) return false
      if (query) {
        const q = query.toLowerCase()
        const hay = [e.prospect_name, e.company ?? "", e.subject_line, e.notes ?? ""].join(" ").toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [emails, outcomeFilter, from, to, query])

  return (
    <>
      <div className="ox-filter-row">
        <div className="ox-search">
          <Search size={14} strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prospect, subject, notes"
          />
        </div>
        <select value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value as EmailOutcome | "all")}>
          <option value="all">All outcomes</option>
          {EMAIL_OUTCOMES.map((o) => (
            <option key={o} value={o}>{EMAIL_OUTCOME_LABELS[o].label}</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        <div className="ox-filter-count">{filtered.length} of {emails.length}</div>
      </div>

      <div className="surface" style={{ marginTop: 14 }}>
        {filtered.length === 0 ? (
          <div className="ox-empty">No emails match the current filters.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prospect</th>
                <th>Subject</th>
                <th>Step</th>
                <th>Outcome</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmtDate(e.email_date)}</td>
                  <td>
                    <div className="nm">{e.prospect_name}</div>
                    {e.company && <div className="sub-text">{e.company}</div>}
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: "var(--rl-fg-1)", fontWeight: 600 }}>{truncate(e.subject_line, 60)}</div>
                  </td>
                  <td><span className="bdg bdg-p">#{e.sequence_step}</span></td>
                  <td><EmailOutcomeBadge outcome={e.outcome} /></td>
                  <td style={{ maxWidth: 240 }}>
                    <div style={{ fontSize: 13, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>
                      {truncate(e.notes, 60) || <span style={{ color: "var(--rl-fg-3)" }}>—</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
