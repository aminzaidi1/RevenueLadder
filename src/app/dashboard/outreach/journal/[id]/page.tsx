import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getJournal } from "@/lib/supabase/outreach"
import { JournalForm } from "@/components/dashboard/outreach/JournalForm"

export const metadata: Metadata = { title: "Edit journal entry | Outreach | Revenue Ladder" }

type Params = { params: Promise<{ id: string }> }

export default async function EditJournalEntryPage({ params }: Params) {
  const { id } = await params
  const entry = await getJournal(id)
  if (!entry) notFound()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach/journal">Journal</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{entry.name}</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Edit entry</h1>
            <div className="sub">{entry.name} · {new Date(entry.entry_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
          </div>
        </div>

        <JournalForm initial={entry} />
      </div>
    </>
  )
}
