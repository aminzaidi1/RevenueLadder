"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"

function CtaBlockView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ ...node.attrs })

  const open = () => { setDraft({ ...node.attrs }); setEditing(true) }
  const save = () => { updateAttributes(draft); setEditing(false) }

  const { heading, body, btnLabel, variant } = node.attrs as {
    heading: string; body: string; btnLabel: string; btnUrl: string; variant: "forest" | "gold"
  }

  return (
    <NodeViewWrapper>
      <div
        className={`bl-cta-block bl-cta-block--${variant}`}
        contentEditable={false}
        style={{ position: "relative", userSelect: "none" }}
      >
        <div className="nv-actions">
          <button type="button" className="tbtn" onClick={open} title="Edit"><Edit2 size={13} /></button>
          <button type="button" className="tbtn" onClick={deleteNode} title="Delete"><Trash2 size={13} /></button>
        </div>

        {editing ? (
          <div className="nv-form">
            <div className="field" style={{ marginBottom: 10 }}>
              <label>Heading</label>
              <input value={draft.heading as string} onChange={e => setDraft(d => ({ ...d, heading: e.target.value }))} />
            </div>
            <div className="field" style={{ marginBottom: 10 }}>
              <label>Body text</label>
              <textarea
                value={draft.body as string}
                onChange={e => setDraft(d => ({ ...d, body: e.target.value }))}
                style={{ minHeight: 64 }}
              />
            </div>
            <div className="form-row" style={{ marginBottom: 10 }}>
              <div className="field">
                <label>Button label</label>
                <input value={draft.btnLabel as string} onChange={e => setDraft(d => ({ ...d, btnLabel: e.target.value }))} />
              </div>
              <div className="field">
                <label>Button URL</label>
                <input value={draft.btnUrl as string} onChange={e => setDraft(d => ({ ...d, btnUrl: e.target.value }))} />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Style</label>
              <select value={draft.variant as string} onChange={e => setDraft(d => ({ ...d, variant: e.target.value }))}>
                <option value="forest">Dark (forest)</option>
                <option value="gold">Light (gold)</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="abtn primary sm" onClick={save}>Save</button>
              <button type="button" className="abtn ghost sm" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p className="bl-cta-block__heading">{heading || "CTA heading"}</p>
            {body && <p className="bl-cta-block__body">{body}</p>}
            <span className="bl-cta-block__btn">{btnLabel || "Book a call"}</span>
          </>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export const CtaBlock = Node.create({
  name: "ctaBlock",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      heading:  { default: "Ready to grow?",  parseHTML: el => el.getAttribute("data-heading")   ?? "Ready to grow?" },
      body:     { default: "",                 parseHTML: el => el.getAttribute("data-body")      ?? "" },
      btnLabel: { default: "Book a call",      parseHTML: el => el.getAttribute("data-btn-label") ?? "Book a call" },
      btnUrl:   { default: "/contact",         parseHTML: el => el.getAttribute("data-btn-url")   ?? "/contact" },
      variant:  { default: "forest",           parseHTML: el => el.getAttribute("data-variant")   ?? "forest" },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="cta-block"]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { heading, body, btnLabel, btnUrl, variant } = node.attrs as Record<string, string>
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "cta-block",
        "data-heading": heading,
        "data-body": body,
        "data-btn-label": btnLabel,
        "data-btn-url": btnUrl,
        "data-variant": variant,
        class: `bl-cta-block bl-cta-block--${variant}`,
      }),
      ["p", { class: "bl-cta-block__heading" }, heading],
      ...(body ? [["p", { class: "bl-cta-block__body" }, body]] : []),
      ["a", { href: btnUrl, class: "bl-cta-block__btn" }, btnLabel],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaBlockView)
  },
})
