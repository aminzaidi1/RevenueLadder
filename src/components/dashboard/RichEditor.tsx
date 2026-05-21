"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import { useRef, useState } from "react"
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Link2, Minus, Undo, Redo,
  ImageIcon, Megaphone, StickyNote, Loader2,
} from "lucide-react"
import { CtaBlock } from "@/components/dashboard/extensions/CtaBlock"
import { CalloutBlock } from "@/components/dashboard/extensions/CalloutBlock"

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichEditor({ value, onChange, placeholder = "Write your post here..." }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imgPickerOpen, setImgPickerOpen] = useState(false)
  const [imgTab, setImgTab] = useState<"upload" | "url">("upload")
  const [imgUrl, setImgUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder }),
      Image.configure({ HTMLAttributes: { class: "" } }),
      CtaBlock,
      CalloutBlock,
    ],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: { attributes: { class: "ProseMirror" } },
  })

  if (!editor) return null

  const addLink = () => {
    const url = window.prompt("URL")
    if (!url) return
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const insertImageUrl = () => {
    if (!imgUrl.trim()) return
    editor.chain().focus().setImage({ src: imgUrl.trim() }).run()
    setImgUrl("")
    setImgPickerOpen(false)
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Upload failed")
      const { url } = await res.json() as { url: string }
      editor.chain().focus().setImage({ src: url }).run()
      setImgPickerOpen(false)
    } catch {
      window.alert("Image upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const insertCta = () => {
    editor.chain().focus().insertContent({ type: "ctaBlock" }).run()
  }

  const insertCallout = () => {
    editor.chain().focus().insertContent({ type: "calloutBlock" }).run()
  }

  return (
    <div className="editor-wrap">
      <div className="editor-toolbar">
        <button type="button" className={`tbtn${editor.isActive("bold") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <Bold size={14} strokeWidth={2.5} />
        </button>
        <button type="button" className={`tbtn${editor.isActive("italic") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <Italic size={14} strokeWidth={2.5} />
        </button>

        <div className="sep-v" />

        <button type="button" className={`tbtn${editor.isActive("heading", { level: 2 }) ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
          <Heading2 size={14} strokeWidth={2} />
        </button>
        <button type="button" className={`tbtn${editor.isActive("heading", { level: 3 }) ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
          <Heading3 size={14} strokeWidth={2} />
        </button>

        <div className="sep-v" />

        <button type="button" className={`tbtn${editor.isActive("bulletList") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          <List size={14} strokeWidth={2} />
        </button>
        <button type="button" className={`tbtn${editor.isActive("orderedList") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
          <ListOrdered size={14} strokeWidth={2} />
        </button>

        <div className="sep-v" />

        <button type="button" className={`tbtn${editor.isActive("blockquote") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
          <Quote size={14} strokeWidth={2} />
        </button>
        <button type="button" className={`tbtn${editor.isActive("code") ? " on" : ""}`}
          onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
          <Code size={14} strokeWidth={2} />
        </button>
        <button type="button" className={`tbtn${editor.isActive("link") ? " on" : ""}`}
          onClick={addLink} title="Link">
          <Link2 size={14} strokeWidth={2} />
        </button>
        <button type="button" className="tbtn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          <Minus size={14} strokeWidth={2} />
        </button>

        <div className="sep-v" />

        {/* Image insert */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className={`tbtn${imgPickerOpen ? " on" : ""}`}
            onClick={() => setImgPickerOpen(v => !v)}
            title="Insert image"
          >
            <ImageIcon size={14} strokeWidth={2} />
          </button>

          {imgPickerOpen && (
            <div className="img-picker">
              <div className="img-picker-tabs">
                <button type="button" className={`img-picker-tab${imgTab === "upload" ? " on" : ""}`}
                  onClick={() => setImgTab("upload")}>Upload file</button>
                <button type="button" className={`img-picker-tab${imgTab === "url" ? " on" : ""}`}
                  onClick={() => setImgTab("url")}>Paste URL</button>
              </div>

              {imgTab === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                      e.target.value = ""
                    }}
                  />
                  <button
                    type="button"
                    className="abtn outline sm"
                    style={{ width: "100%" }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading
                      ? <><Loader2 size={13} strokeWidth={2} /> Uploading...</>
                      : <><ImageIcon size={13} strokeWidth={2} /> Choose image</>
                    }
                  </button>
                  <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginTop: 6 }}>
                    JPG, PNG, WebP, GIF -- max 5 MB
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="url"
                    style={{ flex: 1, height: 36, border: "2px solid var(--rl-border)", borderRadius: 8, padding: "0 10px", fontSize: 13, outline: "none" }}
                    placeholder="https://..."
                    value={imgUrl}
                    onChange={e => setImgUrl(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); insertImageUrl() } }}
                    autoFocus
                  />
                  <button type="button" className="abtn primary sm" onClick={insertImageUrl}>Insert</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA block */}
        <button type="button" className="tbtn" onClick={insertCta} title="Insert CTA block">
          <Megaphone size={14} strokeWidth={2} />
        </button>

        {/* Callout card */}
        <button type="button" className="tbtn" onClick={insertCallout} title="Insert callout card">
          <StickyNote size={14} strokeWidth={2} />
        </button>

        <div className="sep-v" />

        <button type="button" className="tbtn"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()} title="Undo">
          <Undo size={14} strokeWidth={2} />
        </button>
        <button type="button" className="tbtn"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()} title="Redo">
          <Redo size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
