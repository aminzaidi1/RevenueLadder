import type { Metadata } from "next"
import Link from "next/link"
import { listEmails, localYmd } from "@/lib/supabase/outreach"
import { EmailsTable } from "@/components/dashboard/outreach/EmailsTable"
import { LogEmailButton } from "@/components/dashboard/outreach/LogEmailButton"

export const metadata: Metadata = { title: "Emails | Outreach | Revenue Ladder" }

export default async function OutreachEmailsPage() {
  const emails = await listEmails()
  const today = localYmd()
  const todays = emails.filter((e) => e.email_date === today).length

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Emails</span>
          </div>
          <div className="tb-r">
            <LogEmailButton />
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Emails</h1>
            <div className="sub">
              {emails.length} total{todays > 0 ? ` · ${todays} today` : ""}
            </div>
          </div>
        </div>

        <EmailsTable emails={emails} />
      </div>
    </>
  )
}
