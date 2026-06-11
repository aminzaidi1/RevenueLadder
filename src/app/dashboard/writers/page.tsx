import type { Metadata } from "next"
import Link from "next/link"
import { PenSquare, AtSign, Globe } from "lucide-react"
import { listWriters } from "@/lib/supabase/blog"

export const metadata: Metadata = { title: "Writers | Revenue Ladder" }

export default async function WritersPage() {
  const writers = await listWriters()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Writers</span>
          </div>
          <div className="tb-r">
            <Link href="/dashboard/writers/new" className="abtn primary sm">
              <PenSquare size={13} strokeWidth={2} /> New writer
            </Link>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Writers</h1>
            <div className="sub">{writers.length} {writers.length === 1 ? "profile" : "profiles"}</div>
          </div>
        </div>

        <div className="surface">
          {writers.length === 0 ? (
            <div style={{ padding: "48px 22px", textAlign: "center", color: "var(--rl-fg-3)", fontSize: 14 }}>
              No writers yet.{" "}
              <Link href="/dashboard/writers/new" style={{ color: "var(--rl-forest)", fontWeight: 700 }}>
                Add the first writer
              </Link>
            </div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  <th>Writer</th>
                  <th>Email</th>
                  <th>Social</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {writers.map((w) => {
                  const initials = w.name.trim().split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").slice(0, 2).join("")
                  return (
                    <tr key={w.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          {w.avatar_url ? (
                            <img
                              src={w.avatar_url}
                              alt={w.name}
                              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                            />
                          ) : (
                            <div className="wr-list-av">{initials}</div>
                          )}
                          <div>
                            <div className="nm">{w.name}</div>
                            {(w.role || w.bio) && (
                              <div className="sub-text" style={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {w.role ?? w.bio}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        {w.email
                          ? <span style={{ fontFamily: "var(--rl-font-mono)", fontSize: 12 }}>{w.email}</span>
                          : <span style={{ color: "var(--rl-fg-3)", fontSize: 12 }}>None</span>
                        }
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          {w.twitter_handle && (
                            <Link
                              href={`https://twitter.com/${w.twitter_handle}`}
                              target="_blank"
                              className="abtn ghost sm"
                              title={`@${w.twitter_handle}`}
                            >
                              <AtSign size={13} strokeWidth={2} />
                            </Link>
                          )}
                          {w.linkedin_url && (
                            <Link
                              href={w.linkedin_url}
                              target="_blank"
                              className="abtn ghost sm"
                              title="LinkedIn"
                            >
                              <Globe size={13} strokeWidth={2} />
                            </Link>
                          )}
                          {!w.twitter_handle && !w.linkedin_url && (
                            <span style={{ color: "var(--rl-fg-3)", fontSize: 12 }}>None</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <Link href={`/dashboard/writers/${w.id}`} className="abtn outline sm">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
