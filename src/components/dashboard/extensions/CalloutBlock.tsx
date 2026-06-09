"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"

function CalloutBlockView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ ...node.attrs })

  const open = () => { setDraft({ ...node.attrs }); setEditing(true) }
  const save = () => { updateAttributes(draft); setEditing(false) }

  const { icon, heading, body, tone } = node.attrs as {
    icon: string; heading: string; body: string; tone: "default" | "forest" | "gold"
  }

  return (
    <NodeViewWrapper>
      <div
        className={`bl-callout bl-callout--${tone}`}
        contentEditable={false}
        style={{ position: "relative", userSelect: "none" }}
      >
        <div className="nv-actions">
          <button type="button" className="tbtn" onClick={open} title="Edit"><Edit2 size={13} /></button>
          <button type="button" className="tbtn" onClick={deleteNode} title="Delete"><Trash2 size={13} /></button>
        </div>

        {editing ? (
          <div className="nv-form">
            <div className="form-row" style={{ marginBottom: 10 }}>
              <div className="field">
                <label>Icon / emoji</label>
                <input
                  value={draft.icon as string}
                  onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))}
                  placeholder="e.g. ✅"
                  style={{ fontFamily: "sans-serif" }}
                />
              </div>
              <div className="field">
                <label>Tone</label>
                <select value={draft.tone as string} onChange={e => setDraft(d => ({ ...d, tone: e.target.value }))}>
                  <option value="default">Neutral</option>
                  <option value="forest">Forest (green)</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 10 }}>
              <label>Heading</label>
              <input value={draft.heading as string} onChange={e => setDraft(d => ({ ...d, heading: e.target.value }))} />
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Body</label>
              <textarea
                value={draft.body as string}
                onChange={e => setDraft(d => ({ ...d, body: e.target.value }))}
                style={{ minHeight: 72 }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="abtn primary sm" onClick={save}>Save</button>
              <button type="button" className="abtn ghost sm" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            {icon && <span className="bl-callout__icon">{icon}</span>}
            <div className="bl-callout__content">
              {heading && <p className="bl-callout__heading">{heading}</p>}
              {body && <p className="bl-callout__body">{body}</p>}
              {!icon && !heading && !body && (
                <p className="bl-callout__body" style={{ opacity: 0.4 }}>Callout card -- click Edit to fill in.</p>
              )}
            </div>
          </>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export const CalloutBlock = Node.create({
  name: "calloutBlock",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      icon:    { default: "",        parseHTML: el => el.getAttribute("data-icon")    ?? "" },
      heading: { default: "",        parseHTML: el => el.getAttribute("data-heading") ?? "" },
      body:    { default: "",        parseHTML: el => el.getAttribute("data-body")    ?? "" },
      tone:    { default: "default", parseHTML: el => el.getAttribute("data-tone")    ?? "default" },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="callout-block"]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { icon, heading, body, tone } = node.attrs as Record<string, string>
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "callout-block",
        "data-icon": icon,
        "data-heading": heading,
        "data-body": body,
        "data-tone": tone,
        class: `bl-callout bl-callout--${tone}`,
      }),
      ...(icon ? [["span", { class: "bl-callout__icon" }, icon]] : []),
      ["div", { class: "bl-callout__content" },
        ...(heading ? [["p", { class: "bl-callout__heading" }, heading]] : []),
        ...(body    ? [["p", { class: "bl-callout__body" }, body]]      : []),
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutBlockView)
  },
})
