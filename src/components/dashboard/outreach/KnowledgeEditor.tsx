"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle, XCircle, Save } from "lucide-react"
import type { DbKnowledge, KnowledgeKey } from "@/lib/outreach/types"

interface Toast { id: number; kind: "ok" | "err"; msg: string }

interface KnowledgeEditorProps {
  doc: DbKnowledge
}

function formatStamp(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

export function KnowledgeEditor({ doc }: KnowledgeEditorProps) {
  const router = useRouter()
  const [content, setContent] = useState(doc.content)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const dirty = content !== doc.content

  const addToast = (kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/outreach/knowledge/${doc.key as KnowledgeKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { error?: string }).error ?? "Save failed")
      }
      addToast("ok", "Saved.")
      router.refresh()
    } catch (e) {
      addToast("err", e instanceof Error ? e.message : "Save failed.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="ox-knowledge-section">
      <div className="ox-knowledge-hd">
        <div>
          <h2>{doc.title}</h2>
          <div className="ox-knowledge-meta">
            Updated {formatStamp(doc.updated_at)}
          </div>
        </div>
        <button type="button" className="abtn primary sm" onClick={handleSave} disabled={saving || !dirty}>
          {saving ? <Loader2 size={13} strokeWidth={2} /> : <Save size={13} strokeWidth={2} />}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <textarea
        className="ox-knowledge-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write in markdown. Reps will read this in the same view they edit it."
      />

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
