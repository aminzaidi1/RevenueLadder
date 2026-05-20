import type { Metadata } from "next"
import Link from "next/link"
import { Inbox, Mail, MailOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { ContactSubmission } from "@/types/database"

export const metadata: Metadata = { title: "Contact submissions | Revenue Ladder" }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max) + "…"
}

export default async function DashboardContactsPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  const submissions: ContactSubmission[] = error ? [] : (data ?? [])
  const unread = submissions.filter((s) => !s.read).length

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Contacts</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Contact submissions</h1>
            <div className="sub">
              {submissions.length} total{unread > 0 ? ` · ${unread} unread` : ""}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8, color: "#b91c1c", fontSize: 14, marginBottom: 20 }}>
            Failed to load submissions. Please refresh.
          </div>
        )}

        {submissions.length === 0 && !error ? (
          <div className="surface" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 32px", textAlign: "center" }}>
            <Inbox size={36} color="var(--rl-fg-3)" strokeWidth={1.5} />
            <div style={{ fontSize: 15, color: "var(--rl-fg-2)" }}>No submissions yet.</div>
          </div>
        ) : (
          <div className="surface">
            <table className="tbl">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Budget</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} style={{ opacity: s.read ? 0.7 : 1 }}>
                    <td style={{ width: 28 }}>
                      {s.read
                        ? <MailOpen size={14} color="var(--rl-fg-3)" />
                        : <Mail size={14} color="var(--rl-forest)" />
                      }
                    </td>
                    <td>
                      <div className="nm">{s.name}</div>
                      {s.company && <div className="sub-text">{s.company}</div>}
                    </td>
                    <td>
                      <a href={`mailto:${s.email}`} style={{ fontSize: 13, color: "var(--rl-forest)", textDecoration: "none" }}>{s.email}</a>
                      {s.phone && <div className="sub-text">{s.phone}</div>}
                    </td>
                    <td>{s.service ?? <span style={{ color: "var(--rl-fg-3)" }}>{"—"}</span>}</td>
                    <td>{s.budget ?? <span style={{ color: "var(--rl-fg-3)" }}>{"—"}</span>}</td>
                    <td style={{ maxWidth: 260 }}>
                      <div style={{ fontSize: 13, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>{truncate(s.message, 80)}</div>
                    </td>
                    <td style={{ whiteSpace: "nowrap", fontSize: 13, color: "var(--rl-fg-2)" }}>{formatDate(s.created_at)}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {s.read && <span className="bdg bdg-p">Read</span>}
                        {s.replied && <span className="bdg" style={{ background: "var(--rl-forest-tint)", color: "var(--rl-forest)" }}>Replied</span>}
                        {!s.read && <span className="bdg" style={{ background: "var(--rl-gold-tint)", color: "var(--rl-gold-deep)" }}>New</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
