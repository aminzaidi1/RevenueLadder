"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"

const SWATCHES: Array<{ hex: string; variant: "forest" | "gold"; label: string }> = [
  { hex: "#1A4D2E", variant: "forest", label: "Forest"      },
  { hex: "#0D1A10", variant: "forest", label: "Forest ink"  },
  { hex: "#143D24", variant: "forest", label: "Forest dark" },
  { hex: "#FFC425", variant: "gold",   label: "Gold"        },
  { hex: "#EDEAE5", variant: "gold",   label: "Warm white"  },
  { hex: "#1A1A1A", variant: "forest", label: "Charcoal"    },
]

function isLightHex(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
}

function CtaBlockView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const [editing, setEditing]         = useState(false)
  const [draft, setDraft]             = useState({ ...node.attrs })
  const [customHex, setCustomHex]     = useState("")
  const [showCustom, setShowCustom]   = useState(false)

  const open = () => { setDraft({ ...node.attrs }); setEditing(true) }
  const save = () => { updateAttributes(draft); setEditing(false) }

  const { heading, body, btnLabel, variant, bgColor } = node.attrs as {
    heading: string; body: string; btnLabel: string; btnUrl: string
    variant: "forest" | "gold"; bgColor: string
  }

  const applyCustomHex = () => {
    const raw = customHex.trim()
    const hex = raw.startsWith("#") ? raw : `#${raw}`
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return
    const v = isLightHex(hex) ? "gold" : "forest"
    setDraft(d => ({ ...d, bgColor: hex, variant: v }))
    setCustomHex("")
    setShowCustom(false)
  }

  const selectSwatch = (s: typeof SWATCHES[number]) => {
    setDraft(d => ({ ...d, bgColor: s.hex, variant: s.variant }))
  }

  const draftBg = draft.bgColor as string

  return (
    <NodeViewWrapper>
      <div
        className={`bl-cta-block bl-cta-block--${variant}`}
        contentEditable={false}
        style={{
          position: "relative", userSelect: "none",
          ...(bgColor ? { backgroundColor: bgColor } : {}),
        }}
      >
        <div className="nv-actions">
          <button type="button" className="tbtn" onClick={open} title="Edit"><Edit2 size={13} /></button>
          <button type="button" className="tbtn" onClick={deleteNode} title="Delete"><Trash2 size={13} /></button>
        </div>

        {editing ? (
          <div className="nv-form">
            <div className="field" style={{ marginBottom: 10 }}>
              <label>Heading</label>
              <input
                value={draft.heading as string}
                onChange={e => setDraft(d => ({ ...d, heading: e.target.value }))}
              />
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
                <input
                  value={draft.btnLabel as string}
                  onChange={e => setDraft(d => ({ ...d, btnLabel: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Button URL</label>
                <input
                  value={draft.btnUrl as string}
                  onChange={e => setDraft(d => ({ ...d, btnUrl: e.target.value }))}
                />
              </div>
            </div>

            {/* Colour picker */}
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Card colour</label>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginTop: 6 }}>
                {SWATCHES.map(s => (
                  <button
                    key={s.hex}
                    type="button"
                    title={s.label}
                    onClick={() => selectSwatch(s)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                      background: s.hex, cursor: "pointer",
                      outline: draftBg === s.hex
                        ? "2px solid var(--rl-forest)"
                        : "2px solid var(--rl-border)",
                      outlineOffset: 2,
                      border: draftBg === s.hex ? "2px solid var(--rl-gold)" : "2px solid transparent",
                    }}
                  />
                ))}

                {showCustom ? (
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <input
                      type="text"
                      maxLength={7}
                      placeholder="#1a4d2e"
                      value={customHex}
                      onChange={e => setCustomHex(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); applyCustomHex() } }}
                      autoFocus
                      style={{
                        width: 80, height: 28,
                        border: "2px solid var(--rl-border)", borderRadius: 6,
                        padding: "0 8px", fontSize: 12,
                        fontFamily: "var(--rl-font-mono)", outline: "none",
                        color: "var(--rl-fg-1)", background: "var(--rl-surface)",
                      }}
                    />
                    <button
                      type="button"
                      className="abtn primary sm"
                      onClick={applyCustomHex}
                      style={{ height: 28, padding: "0 10px", fontSize: 12 }}
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className="abtn ghost sm"
                      onClick={() => { setShowCustom(false); setCustomHex("") }}
                      style={{ height: 28, padding: "0 10px", fontSize: 12 }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    title="Custom hex colour"
                    onClick={() => setShowCustom(true)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                      border: "2px dashed var(--rl-border)",
                      background: "var(--rl-surface)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--rl-fg-2)",
                    }}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              {draftBg && (
                <button
                  type="button"
                  style={{
                    marginTop: 6, fontSize: 11, color: "var(--rl-fg-3)",
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, fontFamily: "inherit",
                  }}
                  onClick={() => setDraft(d => ({ ...d, bgColor: "", variant: "forest" }))}
                >
                  Reset to default
                </button>
              )}
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
      heading:  { default: "Ready to grow?",  parseHTML: el => el.getAttribute("data-heading")    ?? "Ready to grow?" },
      body:     { default: "",                 parseHTML: el => el.getAttribute("data-body")       ?? "" },
      btnLabel: { default: "Book a call",      parseHTML: el => el.getAttribute("data-btn-label")  ?? "Book a call" },
      btnUrl:   { default: "https://calendly.com/revenueladder/30min", parseHTML: el => el.getAttribute("data-btn-url") ?? "https://calendly.com/revenueladder/30min" },
      variant:  { default: "forest",           parseHTML: el => el.getAttribute("data-variant")    ?? "forest" },
      bgColor:  { default: "",                 parseHTML: el => el.getAttribute("data-bg-color")   ?? "" },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="cta-block"]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { heading, body, btnLabel, btnUrl, variant, bgColor } = node.attrs as Record<string, string>
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type":     "cta-block",
        "data-heading":  heading,
        "data-body":     body,
        "data-btn-label": btnLabel,
        "data-btn-url":  btnUrl,
        "data-variant":  variant,
        "data-bg-color": bgColor,
        class:           `bl-cta-block bl-cta-block--${variant}`,
        ...(bgColor ? { style: `background-color: ${bgColor}` } : {}),
      }),
      ["p",  { class: "bl-cta-block__heading" }, heading],
      ...(body ? [["p", { class: "bl-cta-block__body" }, body] as const] : []),
      ["a",  { href: btnUrl, class: "bl-cta-block__btn" }, btnLabel],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaBlockView)
  },
})
