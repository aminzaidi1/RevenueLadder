"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2, CheckCircle, XCircle, Upload, AtSign, Globe } from "lucide-react"
import type { WriterProfile } from "@/lib/supabase/blog"

interface Toast { id: number; kind: "ok" | "err"; msg: string }
interface WriterFormProps { writer?: WriterProfile }

export function WriterForm({ writer }: WriterFormProps) {
  const router = useRouter()
  const isEdit = !!writer

  const [name, setName] = useState(writer?.name ?? "")
  const [role, setRole] = useState(writer?.role ?? "")
  const [email, setEmail] = useState(writer?.email ?? "")
  const [bio, setBio] = useState(writer?.bio ?? "")
  const [avatarUrl, setAvatarUrl] = useState(writer?.avatar_url ?? "")
  const [twitterHandle, setTwitterHandle] = useState(writer?.twitter_handle ?? "")
  const [linkedinUrl, setLinkedinUrl] = useState(writer?.linkedin_url ?? "")

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const addToast = useCallback((kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  const handleAvatarUpload = async (file: File) => {
    setAvatarUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload/avatar", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Upload failed")
      const { url } = await res.json() as { url: string }
      setAvatarUrl(url)
    } catch {
      addToast("err", "Avatar upload failed.")
    } finally {
      setAvatarUploading(false)
    }
  }

  const buildPayload = () => ({
    name: name.trim(),
    role: role.trim() || null,
    email: email.trim() || null,
    bio: bio.trim() || null,
    avatar_url: avatarUrl.trim() || null,
    twitter_handle: twitterHandle.trim() || null,
    linkedin_url: linkedinUrl.trim() || null,
  })

  const handleSave = async () => {
    if (!name.trim()) {
      addToast("err", "Name is required.")
      return
    }

    setSaving(true)
    try {
      const url = isEdit ? `/api/writers/${writer.id}` : "/api/writers"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { error?: string }).error ?? "Save failed")
      }

      addToast("ok", isEdit ? "Writer updated." : "Writer created.")

      if (!isEdit) {
        const created = await res.json() as { id: string }
        router.push(`/dashboard/writers/${created.id}`)
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
    if (!window.confirm(`Delete "${writer.name}"? Posts linked to this writer will lose the profile link.`)) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/writers/${writer.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      router.push("/dashboard/writers")
      router.refresh()
    } catch {
      addToast("err", "Delete failed. Try again.")
    } finally {
      setDeleting(false)
    }
  }

  const initials = name.trim().split(/\s+/).map((p) => p[0]?.toUpperCase() ?? "").slice(0, 2).join("") || "?"

  return (
    <>
      <div className="wr-form">
        <div className="form-body">
          <div className="form-main">
            <div className="form-card">
              <div className="form-card-title">Profile</div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="wr-name">Name</label>
                <input
                  id="wr-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  autoFocus={!isEdit}
                />
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="wr-role">Role</label>
                <input
                  id="wr-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Head of content · Bangor"
                />
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="wr-email">Email</label>
                <input
                  id="wr-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@revenueladder.co.uk"
                />
              </div>
              <div className="field">
                <label htmlFor="wr-bio">Bio</label>
                <textarea
                  id="wr-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Short biography shown on blog posts."
                  style={{ minHeight: 96 }}
                />
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title">Social</div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="wr-twitter">
                  <AtSign size={11} style={{ display: "inline", marginRight: 4 }} />
                  Twitter / X handle
                </label>
                <input
                  id="wr-twitter"
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value.replace(/^@/, ""))}
                  placeholder="handle (no @)"
                />
              </div>
              <div className="field">
                <label htmlFor="wr-linkedin">
                  <Globe size={11} style={{ display: "inline", marginRight: 4 }} />
                  LinkedIn URL
                </label>
                <input
                  id="wr-linkedin"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="abtn primary" onClick={handleSave} disabled={saving}>
                {saving && <Loader2 size={14} strokeWidth={2} />}
                {saving ? "Saving..." : isEdit ? "Save changes" : "Create writer"}
              </button>
              <button type="button" className="abtn ghost" onClick={() => router.push("/dashboard/writers")}>
                Cancel
              </button>
              {isEdit && (
                <>
                  <div className="sep" />
                  <button type="button" className="abtn danger" onClick={handleDelete} disabled={deleting}>
                    {deleting ? <Loader2 size={14} strokeWidth={2} /> : <Trash2 size={14} strokeWidth={2} />}
                    Delete writer
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="form-side">
            <div className="form-card">
              <div className="form-card-title">Avatar</div>
              <div className="wr-avatar-wrap">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name || "Avatar preview"} className="wr-avatar-preview" />
                ) : (
                  <div className="wr-avatar-placeholder">{initials}</div>
                )}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleAvatarUpload(file)
                    e.target.value = ""
                  }}
                />
                <button
                  type="button"
                  className="abtn outline sm"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarUploading}
                  style={{ width: "100%", marginTop: 10 }}
                >
                  {avatarUploading
                    ? <><Loader2 size={13} strokeWidth={2} /> Uploading...</>
                    : <><Upload size={13} strokeWidth={2} /> {avatarUrl ? "Replace photo" : "Upload photo"}</>
                  }
                </button>
                {avatarUrl && (
                  <button
                    type="button"
                    className="abtn ghost sm"
                    onClick={() => setAvatarUrl("")}
                    style={{ width: "100%", marginTop: 4 }}
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`}>
            {t.kind === "ok"
              ? <CheckCircle size={15} strokeWidth={2} />
              : <XCircle size={15} strokeWidth={2} />
            }
            {t.msg}
          </div>
        ))}
      </div>
    </>
  )
}
