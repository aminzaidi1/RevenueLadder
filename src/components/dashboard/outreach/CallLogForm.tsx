"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, X, CheckCircle, XCircle } from "lucide-react"
import { CALL_OUTCOMES, localYmd, type CallOutcome, type DbCall } from "@/lib/outreach/types"
import { CALL_OUTCOME_LABELS } from "@/components/dashboard/outreach/OutcomeBadge"

interface Toast { id: number; kind: "ok" | "err"; msg: string }

interface CallLogFormProps {
  initial?: DbCall
  onClose: () => void
}

const today = () => localYmd()

export function CallLogForm({ initial, onClose }: CallLogFormProps) {
  const router = useRouter()
  const isEdit = !!initial

  const [prospectName, setProspectName] = useState(initial?.prospect_name ?? "")
  const [company, setCompany] = useState(initial?.company ?? "")
  const [callDate, setCallDate] = useState(initial?.call_date ?? today())
  const [duration, setDuration] = useState(initial?.duration_minutes != null ? String(initial.duration_minutes) : "")
  const [outcome, setOutcome] = useState<CallOutcome>(initial?.outcome ?? "no_answer")
  const [opener, setOpener] = useState(initial?.opener_used ?? "")
  const [objection, setObjection] = useState(initial?.main_objection ?? "")
  const [notes, setNotes] = useState(initial?.notes ?? "")
  const [energy, setEnergy] = useState(initial?.energy_level ?? 3)
  const [confidence, setConfidence] = useState(initial?.confidence_level ?? 3)
  const [transcript, setTranscript] = useState(initial?.transcript ?? "")

  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }

  const handleSave = async () => {
    if (!prospectName.trim()) {
      addToast("err", "Prospect name is required.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        prospect_name: prospectName.trim(),
        company: company.trim() || null,
        call_date: callDate,
        duration_minutes: duration ? parseInt(duration, 10) : null,
        outcome,
        opener_used: opener.trim() || null,
        main_objection: objection.trim() || null,
        notes: notes.trim() || null,
        energy_level: energy,
        confidence_level: confidence,
        transcript: transcript.trim() || null,
      }

      const url = isEdit ? `/api/outreach/calls/${initial!.id}` : "/api/outreach/calls"
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

      addToast("ok", isEdit ? "Call updated." : "Call logged.")
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
            <h3>{isEdit ? "Edit call" : "Log call"}</h3>
          </div>
          <button type="button" className="ox-modal-x" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="ox-modal-bd">
          <div className="form-row thirds">
            <div className="field">
              <label htmlFor="cf-name">Prospect</label>
              <input id="cf-name" type="text" value={prospectName} onChange={(e) => setProspectName(e.target.value)} placeholder="Full name" autoFocus />
            </div>
            <div className="field">
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
            </div>
            <div className="field">
              <label htmlFor="cf-date">Date</label>
              <input id="cf-date" type="date" value={callDate} onChange={(e) => setCallDate(e.target.value)} />
            </div>
          </div>

          <div className="form-row thirds" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="cf-outcome">Outcome</label>
              <select id="cf-outcome" value={outcome} onChange={(e) => setOutcome(e.target.value as CallOutcome)}>
                {CALL_OUTCOMES.map((o) => (
                  <option key={o} value={o}>{CALL_OUTCOME_LABELS[o].label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-duration">Duration (min)</label>
              <input id="cf-duration" type="number" min={0} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="0" />
            </div>
            <div className="field">
              <label>Energy / Confidence</label>
              <div className="ox-rating-row">
                <RatingPicker value={energy} onChange={setEnergy} hint="Energy" />
                <RatingPicker value={confidence} onChange={setConfidence} hint="Confidence" />
              </div>
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="cf-opener">Opener used</label>
              <input id="cf-opener" type="text" value={opener} onChange={(e) => setOpener(e.target.value)} placeholder="The line that started the call" />
            </div>
            <div className="field">
              <label htmlFor="cf-obj">Main objection</label>
              <input id="cf-obj" type="text" value={objection} onChange={(e) => setObjection(e.target.value)} placeholder="What pushed back" />
            </div>
          </div>

          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="cf-notes">Notes</label>
            <textarea id="cf-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything worth remembering for next time." style={{ minHeight: 90 }} />
          </div>

          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="cf-transcript">Transcript (optional)</label>
            <textarea id="cf-transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Paste from your dialer." style={{ minHeight: 140, fontFamily: "var(--rl-font-mono)", fontSize: 12.5 }} />
          </div>
        </div>

        <div className="ox-modal-ft">
          <button type="button" className="abtn ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="abtn primary" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 size={14} strokeWidth={2} />}
            {saving ? "Saving..." : isEdit ? "Save changes" : "Log call"}
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

function RatingPicker({ value, onChange, hint }: { value: number; onChange: (n: number) => void; hint: string }) {
  return (
    <div className="ox-rating" title={hint}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`ox-rating-dot${n <= value ? " on" : ""}`}
          onClick={() => onChange(n)}
          aria-label={`${hint} ${n}`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
