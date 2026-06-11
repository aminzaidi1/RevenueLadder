"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2, CheckCircle, XCircle, Upload } from "lucide-react"
import { RichEditor } from "@/components/dashboard/RichEditor"
import type { DbBlogPost } from "@/lib/supabase/blog"

const CATEGORIES = [
  { value: "AI", label: "AI" },
  { value: "Automation", label: "Automation" },
  { value: "Web Dev", label: "Web Dev" },
  { value: "SEO", label: "SEO" },
  { value: "Case Studies", label: "Case Studies" },
]

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

interface Toast { id: number; kind: "ok" | "err"; msg: string }

interface BlogPostFormProps {
  post?: DbBlogPost
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const isEdit = !!post
  const slugTouched = useRef(isEdit)

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const [author, setAuthor] = useState(post?.author ?? "")
  const [authorRole, setAuthorRole] = useState(post?.author_role ?? "")
  const [category, setCategory] = useState(post?.category ?? "")
  const [readMins, setReadMins] = useState(String(post?.reading_time_minutes ?? ""))
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "")
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "")
  const [metaDesc, setMetaDesc] = useState(post?.meta_description ?? "")
  const [published, setPublished] = useState(post?.published ?? false)
  const [featured, setFeatured] = useState(post?.featured ?? false)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const coverInputRef = useRef<HTMLInputElement>(null)

  const addToast = useCallback((kind: "ok" | "err", msg: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, kind, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  const handleCoverUpload = async (file: File) => {
    setCoverUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Upload failed")
      const { url } = await res.json() as { url: string }
      setCoverUrl(url)
    } catch {
      addToast("err", "Cover image upload failed.")
    } finally {
      setCoverUploading(false)
    }
  }

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slugTouched.current) {
      setSlug(toSlug(v))
    }
  }

  const handleSlugChange = (v: string) => {
    slugTouched.current = true
    setSlug(v)
  }

  const buildPayload = () => ({
    title: title.trim(),
    slug: slug.trim(),
    excerpt: excerpt.trim() || null,
    content,
    author: author.trim(),
    author_role: authorRole.trim() || null,
    category: category || null,
    reading_time_minutes: readMins ? parseInt(readMins, 10) : null,
    cover_image_url: coverUrl.trim() || null,
    meta_title: metaTitle.trim() || null,
    meta_description: metaDesc.trim() || null,
    published,
    featured,
    tags: null,
  })

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !author.trim()) {
      addToast("err", "Title, slug, and author are required.")
      return
    }

    setSaving(true)
    try {
      const url = isEdit ? `/api/blog/${post.slug}` : "/api/blog"
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

      addToast("ok", isEdit ? "Post updated." : "Post created.")

      if (!isEdit) {
        const created = await res.json() as { slug: string }
        router.push(`/dashboard/blog/${created.slug}`)
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
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/blog/${post.slug}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      router.push("/dashboard/blog")
      router.refresh()
    } catch {
      addToast("err", "Delete failed. Try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="post-form">
        <div className="form-body">
          <div className="form-main">
            <div className="form-card">
              <div className="field">
                <label htmlFor="pf-title">Title</label>
                <input
                  id="pf-title"
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title"
                  autoFocus={!isEdit}
                />
              </div>
              <div style={{ marginTop: 12 }} className="field">
                <label htmlFor="pf-slug">Slug</label>
                <input
                  id="pf-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="post-slug"
                />
                <div className="slug-preview">
                  revenueladder.co.uk/blog/<span>{slug || "..."}</span>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="field">
                <label htmlFor="pf-excerpt">Excerpt</label>
                <textarea
                  id="pf-excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="One or two sentences that appear in blog listings."
                  style={{ minHeight: 80 }}
                />
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title">Content</div>
              <RichEditor
                value={content}
                onChange={setContent}
                placeholder="Write your post here..."
              />
            </div>

            <div className="form-card">
              <div className="form-card-title">SEO</div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="pf-meta-title">Meta title</label>
                  <input
                    id="pf-meta-title"
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Defaults to post title"
                  />
                </div>
                <div className="field">
                  <label htmlFor="pf-cover">Cover image</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      id="pf-cover"
                      type="url"
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                      placeholder="https://... or upload below"
                      style={{ flex: 1 }}
                    />
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) handleCoverUpload(file)
                        e.target.value = ""
                      }}
                    />
                    <button
                      type="button"
                      className="abtn outline sm"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={coverUploading}
                      title="Upload cover image"
                      style={{ flexShrink: 0 }}
                    >
                      {coverUploading
                        ? <Loader2 size={13} strokeWidth={2} />
                        : <Upload size={13} strokeWidth={2} />
                      }
                    </button>
                  </div>
                  {coverUrl && (
                    <img
                      src={coverUrl}
                      alt="Cover preview"
                      style={{ marginTop: 8, height: 72, borderRadius: 8, objectFit: "cover", border: "2px solid var(--rl-border-soft)" }}
                    />
                  )}
                </div>
              </div>
              <div style={{ marginTop: 12 }} className="field">
                <label htmlFor="pf-meta-desc">Meta description</label>
                <textarea
                  id="pf-meta-desc"
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Defaults to excerpt"
                  style={{ minHeight: 72 }}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="abtn primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving && <Loader2 size={14} strokeWidth={2} />}
                {saving ? "Saving..." : isEdit ? "Save changes" : "Create post"}
              </button>
              <button
                type="button"
                className="abtn ghost"
                onClick={() => router.push("/dashboard/blog")}
              >
                Cancel
              </button>
              {isEdit && (
                <>
                  <div className="sep" />
                  <button
                    type="button"
                    className="abtn danger"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting
                      ? <Loader2 size={14} strokeWidth={2} />
                      : <Trash2 size={14} strokeWidth={2} />
                    }
                    Delete post
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="form-side">
            <div className="form-card">
              <div className="form-card-title">Status</div>
              <div className="toggle-field">
                <div>
                  <div className="toggle-lbl">Published</div>
                  <div className="toggle-sub">Visible on the public blog</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <span className="toggle-track" />
                </label>
              </div>
              <div className="toggle-field">
                <div>
                  <div className="toggle-lbl">Featured</div>
                  <div className="toggle-sub">Pinned at top of blog listing</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <span className="toggle-track" />
                </label>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title">Details</div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="pf-cat">Category</label>
                <select
                  id="pf-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">No category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="pf-read">Read time (minutes)</label>
                <input
                  id="pf-read"
                  type="number"
                  min={1}
                  max={60}
                  value={readMins}
                  onChange={(e) => setReadMins(e.target.value)}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title">Author</div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="pf-author">Name</label>
                <input
                  id="pf-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="field">
                <label htmlFor="pf-role">Role</label>
                <input
                  id="pf-role"
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Lead engineer"
                />
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
