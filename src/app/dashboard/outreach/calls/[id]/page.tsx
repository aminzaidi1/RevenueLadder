import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getCall } from "@/lib/supabase/outreach"
import { CallOutcomeBadge } from "@/components/dashboard/outreach/OutcomeBadge"

export const metadata: Metadata = { title: "Call detail | Outreach | Revenue Ladder" }

type Params = { params: Promise<{ id: string }> }

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export default async function CallDetailPage({ params }: Params) {
  const { id } = await params
  const call = await getCall(id)
  if (!call) notFound()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach">Outreach</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/outreach/calls">Calls</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{call.prospect_name}</span>
          </div>
          <div className="tb-r">
            <Link href="/dashboard/outreach/calls" className="abtn ghost sm">
              <ArrowLeft size={13} strokeWidth={2} /> Back
            </Link>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>{call.prospect_name}</h1>
            <div className="sub">
              {call.company ? `${call.company} · ` : ""}{fmtDate(call.call_date)}
            </div>
          </div>
          <div className="head-actions">
            <CallOutcomeBadge outcome={call.outcome} />
          </div>
        </div>

        <div className="ox-detail-grid">
          <div className="form-card">
            <div className="form-card-title">Snapshot</div>
            <div className="ox-detail-meta">
              <Meta label="Duration" value={call.duration_minutes != null ? `${call.duration_minutes} min` : "—"} />
              <Meta label="Energy" value={call.energy_level != null ? `${call.energy_level} / 5` : "—"} />
              <Meta label="Confidence" value={call.confidence_level != null ? `${call.confidence_level} / 5` : "—"} />
              <Meta label="Logged" value={fmtDate(call.created_at)} />
            </div>
          </div>

          {(call.opener_used || call.main_objection) && (
            <div className="form-card">
              <div className="form-card-title">In the call</div>
              {call.opener_used && (
                <div className="ox-detail-block">
                  <div className="ox-detail-lbl">Opener used</div>
                  <div className="ox-detail-val">{call.opener_used}</div>
                </div>
              )}
              {call.main_objection && (
                <div className="ox-detail-block">
                  <div className="ox-detail-lbl">Main objection</div>
                  <div className="ox-detail-val">{call.main_objection}</div>
                </div>
              )}
            </div>
          )}

          {call.notes && (
            <div className="form-card">
              <div className="form-card-title">Notes</div>
              <div className="ox-detail-prose">{call.notes}</div>
            </div>
          )}

          {call.transcript && (
            <div className="form-card">
              <div className="form-card-title">Transcript</div>
              <pre className="ox-transcript">{call.transcript}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="ox-meta-item">
      <div className="ox-meta-lbl">{label}</div>
      <div className="ox-meta-val">{value}</div>
    </div>
  )
}
