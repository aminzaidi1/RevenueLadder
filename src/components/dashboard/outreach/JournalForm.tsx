"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { localYmd, type DbJournal } from "@/lib/outreach/types"

interface Toast { id: number; kind: "ok" | "err"; msg: string }

interface JournalFormProps {
  initial?: DbJournal
  defaultName?: string
}

const today = () => localYmd()

export function JournalForm({ initial, defaultName }: JournalFormProps) {
  const router = useRouter()
  const isEdit = !!initial

  const [name, setName] = useState(initial?.name ?? defaultName ?? "")
  const [entryDate, setEntryDate] = useState(initial?.entry_date ?? today())
  const [worked, setWorked] = useState(initial?.what_worked ?? "")
  const [notWorked, setNotWorked] = useState(initial?.what_didnt_work ?? "")
  const [mindset, setMindset] = useState(initial?.mindset_note ?? "")
  const [focus, setFocus] = useState(initial?.focus_tomorrow ?? "")

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }

  const handleSave = async () => {
    if (!name.trim()) {
      addToast("err", "Name is required.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        name: name.trim(),
        entry_date: entryDate,
        what_worked: worked.trim() || null,
        what_didnt_work: notWorked.trim() || null,
        mindset_note: mindset.trim() || null,
        focus_tomorrow: focus.trim() || null,
      }
      const url = isEdit ? `/api/outreach/journal/${initial!.id}` : "/api/outreach/journal"
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
      addToast("ok", isEdit ? "Entry saved." : "Entry created.")
      if (!isEdit) {
        const created = await res.json() as DbJournal
        router.push(`/dashboard/outreach/journal?focus=${created.id}`)
      } else {
        router.refresh()
      }
    } catch (e) {
      addToast("err", e instanceof Error ? e.message : "Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!isEdit) return
    if (!window.confirm("Delete this journal entry? This cannot be undone.")) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/outreach/journal/${initial!.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      router.push("/dashboard/outreach/journal")
      router.refresh()
    } catch {
      addToast("err", "Delete failed. Try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="ox-journal-editor">
        <div className="ox-journal-meta">
          <div className="field" style={{ flex: 1 }}>
            <label htmlFor="jf-name">Name</label>
            <input id="jf-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Who is writing" />
          </div>
          <div className="field">
            <label htmlFor="jf-date">Date</label>
            <input id="jf-date" type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
          </div>
        </div>

        <JournalSection
          id="jf-worked"
          label="What worked today"
          value={worked}
          onChange={setWorked}
          placeholder="The wins. The lines that landed. The behaviours to repeat."
        />
        <JournalSection
          id="jf-not-worked"
          label="What didn't work"
          value={notWorked}
          onChange={setNotWorked}
          placeholder="Where you stalled. What you'd do differently."
        />
        <JournalSection
          id="jf-mindset"
          label="Mindset note"
          value={mindset}
          onChange={setMindset}
          placeholder="How you felt today. Energy, headspace, anything off."
        />
        <JournalSection
          id="jf-focus"
          label="Focus for tomorrow"
          value={focus}
          onChange={setFocus}
          placeholder="One thing to do better next session."
        />

        <div className="form-actions">
          <button type="button" className="abtn primary" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 size={14} strokeWidth={2} />}
            {saving ? "Saving..." : isEdit ? "Save entry" : "Create entry"}
          </button>
          <button
            type="button"
            className="abtn ghost"
            onClick={() => router.push("/dashboard/outreach/journal")}
          >
            Cancel
          </button>
          {isEdit && (
            <>
              <div className="sep" />
              <button type="button" className="abtn danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? <Loader2 size={14} strokeWidth={2} /> : <Trash2 size={14} strokeWidth={2} />}
                Delete
              </button>
            </>
          )}
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
    </>
  )
}

function JournalSection({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="ox-journal-section">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}
