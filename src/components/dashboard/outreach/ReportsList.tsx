"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { DbReport } from "@/lib/outreach/types"

interface ReportsListProps {
  reports: DbReport[]
}

function fmtStamp(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function typeLabel(t: string): string {
  return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export function ReportsList({ reports }: ReportsListProps) {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const types = useMemo(() => Array.from(new Set(reports.map((r) => r.type))).sort(), [reports])

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false
      if (from && r.created_at.slice(0, 10) < from) return false
      if (to && r.created_at.slice(0, 10) > to) return false
      return true
    })
  }, [reports, typeFilter, from, to])

  if (reports.length === 0) {
    return (
      <div className="surface ox-empty-card">
        <div className="ox-empty-title">No reports yet.</div>
        <div className="ox-empty-sub">Claude Code writes reports here. Once it runs an analysis the output will appear in this list.</div>
      </div>
    )
  }

  return (
    <>
      <div className="ox-filter-row">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>{typeLabel(t)}</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        <div className="ox-filter-count">{filtered.length} of {reports.length}</div>
      </div>

      <div className="ox-reports-list">
        {filtered.length === 0 ? (
          <div className="ox-empty">No reports match the current filters.</div>
        ) : (
          filtered.map((r) => (
            <Link key={r.id} href={`/dashboard/outreach/reports/${r.id}`} className="ox-report-row">
              <div className="ox-report-row-main">
                <div className="ox-report-row-title">{r.title}</div>
                <div className="ox-report-row-meta">
                  <span className="bdg bdg-p">{typeLabel(r.type)}</span>
                  <span>{fmtStamp(r.created_at)}</span>
                </div>
              </div>
              <ChevronRight size={16} strokeWidth={2} className="ox-report-row-arrow" />
            </Link>
          ))
        )}
      </div>
    </>
  )
}
