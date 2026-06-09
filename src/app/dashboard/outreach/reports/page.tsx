import type { Metadata } from "next"
import Link from "next/link"
import { listReports } from "@/lib/supabase/outreach"
import { ReportsList } from "@/components/dashboard/outreach/ReportsList"

export const metadata: Metadata = { title: "Reports | Outreach | Revenue Ladder" }

export default async function OutreachReportsPage() {
  const reports = await listReports()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Reports</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Reports</h1>
            <div className="sub">
              Written by Claude Code. Read-only here.
            </div>
          </div>
        </div>

        <ReportsList reports={reports} />
      </div>
    </>
  )
}
