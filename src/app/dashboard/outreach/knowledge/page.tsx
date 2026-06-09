import type { Metadata } from "next"
import Link from "next/link"
import { listKnowledge } from "@/lib/supabase/outreach"
import { KnowledgeEditor } from "@/components/dashboard/outreach/KnowledgeEditor"

export const metadata: Metadata = { title: "Knowledge base | Outreach | Revenue Ladder" }

export default async function OutreachKnowledgePage() {
  const docs = await listKnowledge()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">Knowledge base</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Knowledge base</h1>
            <div className="sub">Shared context. Read by Claude Code when it grades calls and writes reports.</div>
          </div>
        </div>

        <div className="ox-knowledge-grid">
          {docs.map((doc) => (
            <KnowledgeEditor key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </>
  )
}
