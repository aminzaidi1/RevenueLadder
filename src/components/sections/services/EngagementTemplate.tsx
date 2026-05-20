import type { ReactNode } from "react"
import Link from "next/link"
import {
  Check, Clock, ArrowRight, Star, Sparkles, Rocket,
  Bot, Workflow, Mic, ShoppingCart, Share2, Briefcase,
  Mail, BarChart2, Shield, Pencil, BookOpen, Globe, Inbox,
  Play, RefreshCw, Target, Layers,
  MapPin, LayoutGrid, MessageSquare, Eye, TrendingUp,
  Search, Server, Code, Zap, Users,
} from "lucide-react"

type IconName = string

function Ic({ name, size = 20, strokeWidth = 2 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const props = { size, strokeWidth }
  const map: Record<string, ReactNode> = {
    bot: <Bot {...props} />, workflow: <Workflow {...props} />, mic: <Mic {...props} />,
    cart: <ShoppingCart {...props} />, share: <Share2 {...props} />, check: <Check {...props} />,
    briefcase: <Briefcase {...props} />, mail: <Mail {...props} />, clock: <Clock {...props} />,
    chart: <BarChart2 {...props} />, shield: <Shield {...props} />, pencil: <Pencil {...props} />,
    book: <BookOpen {...props} />, globe: <Globe {...props} />, inbox: <Inbox {...props} />,
    play: <Play {...props} />, rocket: <Rocket {...props} />, refresh: <RefreshCw {...props} />,
    arrow: <ArrowRight {...props} />, star: <Star {...props} />, target: <Target {...props} />,
    sparkles: <Sparkles {...props} />, layers: <Layers {...props} />, pin: <MapPin {...props} />,
    layout: <LayoutGrid {...props} />, chat: <MessageSquare {...props} />, eye: <Eye {...props} />,
    trend: <TrendingUp {...props} />, search: <Search {...props} />, server: <Server {...props} />,
    code: <Code {...props} />, zap: <Zap {...props} />, users: <Users {...props} />,
  }
  return <>{map[name] ?? <Sparkles {...props} />}</>
}

export interface EngCap {
  ic: IconName
  h: string
  p: string
  when: string
}

export interface EngCompareCell {
  txt: ReactNode
  v: "ok" | "warn" | "bad"
  label: string
}

export interface EngCompareRow {
  ic: IconName
  label: string
  cells: EngCompareCell[]
}

export interface EngCompare {
  label: string
  cols: { nm: string; sub: string; ribbon?: string }[]
  featIndex: number
  rows: EngCompareRow[]
}

export interface EngTimelineRow {
  gold?: boolean
  when: string
  stage: string
  t: string
  s: string
  av: string
  lead: string
}

export interface EngTierSection {
  h: string
  items: ReactNode[]
}

export interface EngTierItem {
  crown: string
  nm: string
  price: string
  priceSub: string
  desc: string
  feat?: boolean
  sections: EngTierSection[]
  cta: string
  btn: string
  guarantee: string
}

export interface EngMatrixRow {
  ic: IconName
  nm: string
  cells: string[]
}

export interface EngServiceSpec {
  service: string
  ic: IconName
  h1: ReactNode
  sub: string
  trustLabel?: string
  trustBadges: string[]
  secondaryCta?: string
  heroVisual: ReactNode

  capsHead: { eyebrow: string; title: ReactNode; sub: string }
  caps: EngCap[]

  proof: {
    eyebrow?: string
    h2: string
    body: string
    stats: { v: string; unit?: string; lbl: string }[]
    quote: { initials: string; name: string; role: string; text: string; meta?: string }
  }

  diveHead: { eyebrow: string; title: ReactNode; sub: string }
  diveStats: { v: string; unit?: string; lbl: string; tag?: string }[]
  compare: EngCompare
  timeline?: {
    eyebrow: string
    title: ReactNode
    rows: EngTimelineRow[]
  }

  matrix: {
    eyebrow: string
    title: ReactNode
    sub: string
    firstColLabel?: string
    tiers: { nm: string; tag: string }[]
    rows: EngMatrixRow[]
    foot?: string
  }

  tiers: {
    eyebrow: string
    title: ReactNode
    sub: string
    items: EngTierItem[]
  }
}

function renderMatrixCell(v: string) {
  if (v === "on") return <span className="cell-on"><Check size={16} strokeWidth={3} /></span>
  if (v === "off") return <span className="cell-off">·</span>
  return <span className="cell-mid">{v}</span>
}

export function EngagementTemplate({ spec }: { spec: EngServiceSpec }) {
  return (
    <div className="t3-page">
      {/* Hero */}
      <section className="container" style={{ paddingTop: 0 }}>
        <div className="sp-hero t3-hero">
          <div className="sp-hero-grid">
            <div>
              <div className="sp-eyebrow-stack">
                <span className="sp-crumb">
                  <Ic name={spec.ic} size={11} strokeWidth={2.5} />
                  Engagement Models
                  <span className="sp-crumb-sep">/</span>
                  {spec.service}
                </span>
              </div>
              <h1 className="sp-h1">{spec.h1}</h1>
              <p className="sp-sub">{spec.sub}</p>
              <div className="sp-cta-row">
                <Link href="/contact" className="btn primary lg">
                  Book a fit call <ArrowRight size={16} />
                </Link>
                {spec.secondaryCta && (
                  <Link href="/contact" className="btn outline lg">
                    <Eye size={14} /> {spec.secondaryCta}
                  </Link>
                )}
              </div>
              <div className="sp-trust-row">
                <span className="lbl">{spec.trustLabel ?? "Engagement"}</span>
                {spec.trustBadges.map((b) => (
                  <span className="badge" key={b}><span className="dot" />{b}</span>
                ))}
              </div>
            </div>
            <div>{spec.heroVisual}</div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.capsHead.eyebrow}</span>
            <h2 className="section-title">{spec.capsHead.title}</h2>
            <p className="section-sub">{spec.capsHead.sub}</p>
          </div>
          <div className="sp-caps t3-caps">
            {spec.caps.map((cap) => (
              <div className="sp-cap" key={cap.h}>
                <div className="ic"><Ic name={cap.ic} size={20} /></div>
                <h4>{cap.h}</h4>
                <p>{cap.p}</p>
                <span className="hours">
                  <Clock size={11} strokeWidth={2.5} />
                  {cap.when}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="sp-proof">
          <div>
            {spec.proof.eyebrow && <span className="eyebrow on-dark">{spec.proof.eyebrow}</span>}
            <h2 style={{ marginTop: 12 }}>{spec.proof.h2}</h2>
            <p className="body">{spec.proof.body}</p>
            <div className="sp-proof-stats">
              {spec.proof.stats.map((s) => (
                <div className="sp-proof-stat" key={s.lbl}>
                  <div className="v">{s.v}{s.unit && <small>{s.unit}</small>}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sp-proof-card">
            <div className="who">
              <div className="av">{spec.proof.quote.initials}</div>
              <div style={{ flex: 1 }}>
                <div className="nm">{spec.proof.quote.name}</div>
                <div className="rl">{spec.proof.quote.role}</div>
              </div>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} strokeWidth={0} fill="var(--rl-gold)" />
                ))}
              </div>
            </div>
            <q>{spec.proof.quote.text}</q>
            {spec.proof.quote.meta && (
              <div className="meta"><span>{spec.proof.quote.meta}</span></div>
            )}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="section warm">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.diveHead.eyebrow}</span>
            <h2 className="section-title">{spec.diveHead.title}</h2>
            <p className="section-sub">{spec.diveHead.sub}</p>
          </div>

          <div className="sp-dive-stats">
            {spec.diveStats.map((s) => (
              <div className="sp-dive-stat" key={s.lbl}>
                <div className="v">{s.v}{s.unit && <small>{s.unit}</small>}</div>
                <div className="lbl">{s.lbl}</div>
                {s.tag && <div className="tag">{s.tag}</div>}
              </div>
            ))}
          </div>

          <div className="t3-compare" style={{ marginBottom: 64 }}>
            <div className="t3-compare-head">
              <div className="label-cell">{spec.compare.label}</div>
              {spec.compare.cols.map((col, i) => (
                <div key={col.nm} className={`col${i === spec.compare.featIndex ? " us" : ""}`}>
                  {i === spec.compare.featIndex && (
                    <div className="ribbon">{col.ribbon ?? "Best fit"}</div>
                  )}
                  <div className="nm">{col.nm}</div>
                  <div className="sub">{col.sub}</div>
                </div>
              ))}
            </div>
            {spec.compare.rows.map((row, ri) => (
              <div className="t3-compare-row" key={ri}>
                <div className="label-cell">
                  <Ic name={row.ic} size={16} strokeWidth={2.25} />
                  {row.label}
                </div>
                {row.cells.map((cell, i) => (
                  <div key={i} className={i === spec.compare.featIndex ? "us-cell" : ""}>
                    <span>{cell.txt}</span>
                    <span className={`verdict ${cell.v}`}>{cell.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {spec.timeline && (
            <>
              <div className="section-head center" style={{ marginTop: 80, marginBottom: 40 }}>
                <span className="eyebrow forest">{spec.timeline.eyebrow}</span>
                <h2 className="section-title" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
                  {spec.timeline.title}
                </h2>
              </div>
              <div className="t3-timeline">
                {spec.timeline.rows.map((row, i) => (
                  <div key={i} className={`t3-tl-row${row.gold ? " gold" : ""}`}>
                    <div className="week"><b>{row.when}</b>{row.stage}</div>
                    <div className="body">
                      <div className="t">{row.t}</div>
                      <div className="s">{row.s}</div>
                    </div>
                    <div className="lead"><div className="av">{row.av}</div> {row.lead}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Capability matrix */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.matrix.eyebrow}</span>
            <h2 className="section-title">{spec.matrix.title}</h2>
            <p className="section-sub">{spec.matrix.sub}</p>
          </div>
          <div className="t3-matrix">
            <div className="t3-matrix-head">
              <div>{spec.matrix.firstColLabel ?? "Deliverable"}</div>
              {spec.matrix.tiers.map((t) => (
                <div key={t.nm}>{t.nm}<span className="w-tag">{t.tag}</span></div>
              ))}
            </div>
            {spec.matrix.rows.map((row) => (
              <div className="t3-matrix-row" key={row.nm}>
                <div><Ic name={row.ic} size={16} strokeWidth={2.25} />{row.nm}</div>
                {row.cells.map((c, i) => (
                  <div key={i}>{renderMatrixCell(c)}</div>
                ))}
              </div>
            ))}
          </div>
          {spec.matrix.foot && (
            <p style={{ marginTop: 18, textAlign: "center", fontSize: 13, color: "var(--rl-fg-3)", fontStyle: "italic" }}>
              {spec.matrix.foot}
            </p>
          )}
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="section warm" id="tiers">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.tiers.eyebrow}</span>
            <h2 className="section-title">{spec.tiers.title}</h2>
            <p className="section-sub">{spec.tiers.sub}</p>
          </div>
          <div className="t3-tiers">
            {spec.tiers.items.map((tier) => (
              <div key={tier.nm} className={`t3-tier${tier.feat ? " feat" : ""}`}>
                <div className="crown">{tier.crown}</div>
                <div className="nm">{tier.nm}</div>
                <div className="price">{tier.price}<small>{tier.priceSub}</small></div>
                <div className="desc">{tier.desc}</div>
                {tier.sections.map((sec) => (
                  <div className="t3-tier-section" key={sec.h}>
                    <div className="h">{sec.h}</div>
                    <ul>
                      {sec.items.map((it, i) => (
                        <li key={i}><Check size={14} strokeWidth={2.5} /><span>{it}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="cta">
                  <Link href="/contact" className={tier.btn}>
                    {tier.cta} <ArrowRight size={14} />
                  </Link>
                  <div className="guarantee" style={{ marginTop: 10 }}>
                    <Shield size={12} strokeWidth={2.5} />{tier.guarantee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
