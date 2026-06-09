"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, X, CheckCircle, XCircle } from "lucide-react"
import { EMAIL_OUTCOMES, localYmd, type DbEmail, type EmailOutcome } from "@/lib/outreach/types"
import { EMAIL_OUTCOME_LABELS } from "@/components/dashboard/outreach/OutcomeBadge"

interface Toast { id: number; kind: "ok" | "err"; msg: string }

interface EmailLogFormProps {
  initial?: DbEmail
  onClose: () => void
}

const today = () => localYmd()

export function EmailLogForm({ initial, onClose }: EmailLogFormProps) {
  const router = useRouter()
  const isEdit = !!initial

  const [prospectName, setProspectName] = useState(initial?.prospect_name ?? "")
  const [company, setCompany] = useState(initial?.company ?? "")
  const [subject, setSubject] = useState(initial?.subject_line ?? "")
  const [sequenceStep, setSequenceStep] = useState(initial?.sequence_step ?? 1)
  const [emailDate, setEmailDate] = useState(initial?.email_date ?? today())
  const [outcome, setOutcome] = useState<EmailOutcome>(initial?.outcome ?? "no_reply")
  const [notes, setNotes] = useState(initial?.notes ?? "")
  const [body, setBody] = useState(initial?.body ?? "")

  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }

  const handleSave = async () => {
    if (!prospectName.trim() || !subject.trim()) {
      addToast("err", "Prospect and subject line are required.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        prospect_name: prospectName.trim(),
        company: company.trim() || null,
        subject_line: subject.trim(),
        sequence_step: sequenceStep,
        email_date: emailDate,
        outcome,
        notes: notes.trim() || null,
        body: body.trim() || null,
      }
      const url = isEdit ? `/api/outreach/emails/${initial!.id}` : "/api/outreach/emails"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { error?: string }).error ?? "Save failed")
      }
      addToast("ok", isEdit ? "Email updated." : "Email logged.")
      router.refresh()
      onClose()
    } catch (e) {
      addToast("err", e instanceof Error ? e.message : "Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="ox-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ox-modal">
        <div className="ox-modal-hd">
          <div>
            <div className="ox-modal-eyebrow">Outreach</div>
            <h3>{isEdit ? "Edit email" : "Log email"}</h3>
          </div>
          <button type="button" className="ox-modal-x" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="ox-modal-bd">
          <div className="form-row thirds">
            <div className="field">
              <label htmlFor="ef-name">Prospect</label>
              <input id="ef-name" type="text" value={prospectName} onChange={(e) => setProspectName(e.target.value)} placeholder="Full name" autoFocus />
            </div>
            <div className="field">
              <label htmlFor="ef-company">Company</label>
              <input id="ef-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
            </div>
            <div className="field">
              <label htmlFor="ef-date">Date</label>
              <input id="ef-date" type="date" value={emailDate} onChange={(e) => setEmailDate(e.target.value)} />
            </div>
          </div>

          <div className="form-row thirds" style={{ marginTop: 12 }}>
            <div className="field" style={{ gridColumn: "span 2" }}>
              <label htmlFor="ef-subject">Subject line</label>
              <input id="ef-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What the prospect saw in their inbox" />
            </div>
            <div className="field">
              <label htmlFor="ef-step">Sequence step</label>
              <input id="ef-step" type="number" min={1} value={sequenceStep} onChange={(e) => setSequenceStep(Math.max(1, parseInt(e.target.value, 10) || 1))} />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="ef-outcome">Outcome</label>
              <select id="ef-outcome" value={outcome} onChange={(e) => setOutcome(e.target.value as EmailOutcome)}>
                {EMAIL_OUTCOMES.map((o) => (
                  <option key={o} value={o}>{EMAIL_OUTCOME_LABELS[o].label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="ef-notes">Notes</label>
              <input id="ef-notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything to track" />
            </div>
          </div>

          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="ef-body">Body</label>
            <textarea id="ef-body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Paste the email body for later review." style={{ minHeight: 160 }} />
          </div>
        </div>

        <div className="ox-modal-ft">
          <button type="button" className="abtn ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="abtn primary" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 size={14} strokeWidth={2} />}
            {saving ? "Saving..." : isEdit ? "Save changes" : "Log email"}
          </button>
        </div>
      </div>

      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`}>
            {t.kind === "ok" ? <CheckCircle size={15} /> : <XCircle size={15} />}
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  )
}
