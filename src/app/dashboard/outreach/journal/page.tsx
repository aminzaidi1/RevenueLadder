import type { Metadata } from "next"
import Link from "next/link"
import { PenSquare } from "lucide-react"
import { listJournal, localYmd } from "@/lib/supabase/outreach"
import { JournalList } from "@/components/dashboard/outreach/JournalList"

export const metadata: Metadata = { title: "Journal | Outreach | Revenue Ladder" }

export default async function OutreachJournalPage() {
  const entries = await listJournal()
  const today = localYmd()
  const todays = entries.filter((e) => e.entry_date === today).length

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Journal</span>
          </div>
          <div className="tb-r">
            <Link href="/dashboard/outreach/journal/new" className="abtn primary sm">
              <PenSquare size={13} strokeWidth={2} /> New entry
            </Link>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Journal</h1>
            <div className="sub">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}{todays > 0 ? ` · ${todays} today` : ""}
            </div>
          </div>
        </div>

        <JournalList entries={entries} />
      </div>
    </>
  )
}
