import type { Metadata } from "next"
import Link from "next/link"
import { listCalls, localYmd } from "@/lib/supabase/outreach"
import { CallsTable } from "@/components/dashboard/outreach/CallsTable"
import { LogCallButton } from "@/components/dashboard/outreach/LogCallButton"

export const metadata: Metadata = { title: "Calls | Outreach | Revenue Ladder" }

export default async function OutreachCallsPage() {
  const calls = await listCalls()
  const today = localYmd()
  const todays = calls.filter((c) => c.call_date === today).length

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Calls</span>
          </div>
          <div className="tb-r">
            <LogCallButton />
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Calls</h1>
            <div className="sub">
              {calls.length} total{todays > 0 ? ` · ${todays} today` : ""}
            </div>
          </div>
        </div>

        <CallsTable calls={calls} />
      </div>
    </>
  )
}
