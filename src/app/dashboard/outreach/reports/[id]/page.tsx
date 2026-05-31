import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getReport } from "@/lib/supabase/outreach"
import { MarkdownRender } from "@/components/dashboard/outreach/MarkdownRender"

export const metadata: Metadata = { title: "Report | Outreach | Revenue Ladder" }

type Params = { params: Promise<{ id: string }> }

function fmtStamp(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function typeLabel(t: string): string {
  return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function ReportDetailPage({ params }: Params) {
  const { id } = await params
  const report = await getReport(id)
  if (!report) notFound()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach/reports">Reports</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{report.title}</span>
          </div>
          <div className="tb-r">
            <Link href="/dashboard/outreach/reports" className="abtn ghost sm">
              <ArrowLeft size={13} strokeWidth={2} /> Back
            </Link>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>{report.title}</h1>
            <div className="sub">
              <span className="bdg bdg-p" style={{ marginRight: 8 }}>{typeLabel(report.type)}</span>
              {fmtStamp(report.created_at)}
            </div>
          </div>
        </div>

        <div className="form-card ox-report-content">
          <MarkdownRender source={report.content || "_This report has no content yet._"} />
        </div>
      </div>
    </>
  )
}
