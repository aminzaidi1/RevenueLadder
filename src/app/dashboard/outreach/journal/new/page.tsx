import type { Metadata } from "next"
import Link from "next/link"
import { JournalForm } from "@/components/dashboard/outreach/JournalForm"

export const metadata: Metadata = { title: "New journal entry | Outreach | Revenue Ladder" }

export default function NewJournalEntryPage() {
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
            <span className="bc-cur">New entry</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>New journal entry</h1>
            <div className="sub">Reflect on today. Patterns surface from the cumulative honesty of these.</div>
          </div>
        </div>

        <JournalForm />
      </div>
    </>
  )
}
