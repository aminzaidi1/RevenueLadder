"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { CALL_OUTCOMES, type CallOutcome, type DbCall } from "@/lib/outreach/types"
import { CALL_OUTCOME_LABELS, CallOutcomeBadge } from "@/components/dashboard/outreach/OutcomeBadge"

interface CallsTableProps {
  calls: DbCall[]
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function truncate(s: string | null, max: number): string {
  if (!s) return ""
  return s.length <= max ? s : s.slice(0, max) + "…"
}

export function CallsTable({ calls }: CallsTableProps) {
  const [outcomeFilter, setOutcomeFilter] = useState<CallOutcome | "all">("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return calls.filter((c) => {
      if (outcomeFilter !== "all" && c.outcome !== outcomeFilter) return false
      if (from && c.call_date < from) return false
      if (to && c.call_date > to) return false
      if (query) {
        const q = query.toLowerCase()
        const hay = [c.prospect_name, c.company ?? "", c.notes ?? "", c.opener_used ?? ""].join(" ").toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [calls, outcomeFilter, from, to, query])

  return (
    <>
      <div className="ox-filter-row">
        <div className="ox-search">
          <Search size={14} strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prospect, company, notes"
          />
        </div>
        <select value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value as CallOutcome | "all")}>
          <option value="all">All outcomes</option>
          {CALL_OUTCOMES.map((o) => (
            <option key={o} value={o}>{CALL_OUTCOME_LABELS[o].label}</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        <div className="ox-filter-count">{filtered.length} of {calls.length}</div>
      </div>

      <div className="surface" style={{ marginTop: 14 }}>
        {filtered.length === 0 ? (
          <div className="ox-empty">No calls match the current filters.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prospect</th>
                <th>Outcome</th>
                <th>Duration</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmtDate(c.call_date)}</td>
                  <td>
                    <div className="nm">{c.prospect_name}</div>
                    {c.company && <div className="sub-text">{c.company}</div>}
                  </td>
                  <td><CallOutcomeBadge outcome={c.outcome} /></td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {c.duration_minutes != null ? `${c.duration_minutes}m` : <span style={{ color: "var(--rl-fg-3)" }}>—</span>}
                  </td>
                  <td style={{ maxWidth: 320 }}>
                    <div style={{ fontSize: 13, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>
                      {truncate(c.notes, 80) || <span style={{ color: "var(--rl-fg-3)" }}>—</span>}
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/dashboard/outreach/calls/${c.id}`} className="abtn outline sm">View</Link>
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
