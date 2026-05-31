"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import type { DbJournal } from "@/lib/outreach/types"

interface JournalListProps {
  entries: DbJournal[]
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function JournalList({ entries }: JournalListProps) {
  const [nameFilter, setNameFilter] = useState<string>("all")
  const [query, setQuery] = useState("")

  const names = useMemo(() => Array.from(new Set(entries.map((e) => e.name))).sort(), [entries])

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (nameFilter !== "all" && e.name !== nameFilter) return false
      if (query) {
        const q = query.toLowerCase()
        const hay = [e.what_worked ?? "", e.what_didnt_work ?? "", e.mindset_note ?? "", e.focus_tomorrow ?? "", e.name].join(" ").toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [entries, nameFilter, query])

  if (entries.length === 0) {
    return (
      <div className="surface ox-empty-card">
        <div className="ox-empty-title">No entries yet.</div>
        <div className="ox-empty-sub">Start writing — the journal is where the patterns surface.</div>
        <Link href="/dashboard/outreach/journal/new" className="abtn primary sm" style={{ marginTop: 14 }}>
          New entry
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="ox-filter-row">
        <div className="ox-search">
          <Search size={14} strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entries"
          />
        </div>
        <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
          <option value="all">All reps</option>
          {names.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <div className="ox-filter-count">{filtered.length} of {entries.length}</div>
      </div>

      <div className="ox-journal-list">
        {filtered.length === 0 ? (
          <div className="ox-empty">No entries match.</div>
        ) : (
          filtered.map((e) => (
            <Link key={e.id} href={`/dashboard/outreach/journal/${e.id}`} className="ox-journal-card">
              <div className="ox-journal-card-hd">
                <div className="ox-journal-card-name">{e.name}</div>
                <div className="ox-journal-card-date">{fmtDate(e.entry_date)}</div>
              </div>
              {e.what_worked && (
                <Section title="What worked" body={e.what_worked} />
              )}
              {e.what_didnt_work && (
                <Section title="What didn't work" body={e.what_didnt_work} />
              )}
              {e.mindset_note && (
                <Section title="Mindset" body={e.mindset_note} />
              )}
              {e.focus_tomorrow && (
                <Section title="Focus for tomorrow" body={e.focus_tomorrow} />
              )}
            </Link>
          ))
        )}
      </div>
    </>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="ox-journal-card-section">
      <div className="ox-journal-card-lbl">{title}</div>
      <div className="ox-journal-card-body">{body}</div>
    </div>
  )
}
