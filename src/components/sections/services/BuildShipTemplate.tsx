import type { ReactNode } from "react"
import Link from "next/link"
import {
  Check, Play, Rocket, RefreshCw, ArrowRight, Star, Sparkles, Layers,
  MapPin, LayoutGrid, MessageSquare, Eye, TrendingUp, Search, Server,
  Code, Zap, Users, Bot, Workflow, Mic, ShoppingCart, Share2, Briefcase,
  Mail, Clock, BarChart2, Shield, Pencil, BookOpen, Globe, Inbox, Target,
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
    map: <MapPin {...props} />, layout: <LayoutGrid {...props} />, chat: <MessageSquare {...props} />,
    eye: <Eye {...props} />, trend: <TrendingUp {...props} />, search: <Search {...props} />,
    server: <Server {...props} />, code: <Code {...props} />, zap: <Zap {...props} />, users: <Users {...props} />,
  }
  return <>{map[name] ?? <Sparkles {...props} />}</>
}

export interface BSCap {
  num: string
  ic: IconName
  h: string
  p: string
  pct: number
  pctLabel: string
}

export interface BSProof {
  eyebrow?: string
  h2: string
  body: string
  stats: { v: string; unit?: string; lbl: string }[]
  quote: { initials: string; name: string; role: string; text: string; meta?: string }
}

export interface BSDiveRow {
  eyebrow: string
  h3: ReactNode
  p: string
  items: string[]
  visual: ReactNode
  reverse?: boolean
}

export interface BSHubNode { ic: IconName; lbl: string; x: number; y: number }
export interface BSPlatformCat { ic: IconName; h: string; sub: string; logos: { nm: string; color: string }[] }

export interface BSEngagePanel {
  ic: IconName
  h: string
  price: string
  priceSub: string
  p: string
  items: string[]
}

export interface BSServiceSpec {
  service: string
  ic: IconName
  h1: ReactNode
  sub: string
  trustLabel?: string
  trustBadges: string[]
  secondaryCta?: string
  heroVisual: ReactNode

  capsHead: { eyebrow: string; title: ReactNode; sub?: string }
  caps: BSCap[]

  proof: BSProof

  diveHead: { eyebrow: string; title: ReactNode; sub?: string }
  diveStats?: { v: string; unit?: string; lbl: string; tag?: string }[]
  diveRows: BSDiveRow[]

  integrateHead: { eyebrow: string; title: ReactNode; sub?: string }
  hubNodes: BSHubNode[]
  hubCenter: { ic: IconName; nm: string; tg: string }
  platformCats: BSPlatformCat[]

  engageHead: { eyebrow: string; title: ReactNode; sub?: string }
  engageSetup: BSEngagePanel
  engageMonthly: BSEngagePanel
  engageCta: { title: string; sub: string }
}

export function BuildShipTemplate({ spec }: { spec: BSServiceSpec }) {
  return (
    <div className="t2-page">
      {/* Hero */}
      <section className="container" style={{ paddingTop: 0 }}>
        <div className="sp-hero t2-hero">
          <div className="sp-hero-grid">
            <div>
              <div className="sp-eyebrow-stack">
                <span className="sp-crumb">
                  <Ic name={spec.ic} size={11} strokeWidth={2.5} />
                  Build &amp; Ship
                  <span className="sp-crumb-sep">/</span>
                  {spec.service}
                </span>
              </div>
              <h1 className="sp-h1">{spec.h1}</h1>
              <p className="sp-sub">{spec.sub}</p>
              <div className="sp-cta-row">
                <Link href="/contact" className="btn primary lg">
                  Book a build call <ArrowRight size={16} />
                </Link>
                {spec.secondaryCta && (
                  <Link href="/contact" className="btn outline lg">
                    <Play size={14} /> {spec.secondaryCta}
                  </Link>
                )}
              </div>
              <div className="sp-trust-row">
                <span className="lbl">{spec.trustLabel ?? "Built on"}</span>
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
            {spec.capsHead.sub && <p className="section-sub">{spec.capsHead.sub}</p>}
          </div>
          <div className="sp-caps t2-caps">
            {spec.caps.map((cap) => (
              <div className="sp-cap" key={cap.num} data-num={cap.num}>
                <div className="ic"><Ic name={cap.ic} size={20} /></div>
                <h4>{cap.h}</h4>
                <p>{cap.p}</p>
                <div className="bar-row">
                  <span>{cap.pctLabel}</span>
                  <div className="bar"><i style={{ width: `${cap.pct}%` }} /></div>
                  <span>{cap.pct}%</span>
                </div>
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
            {spec.proof.quote.meta && <div className="meta"><span>{spec.proof.quote.meta}</span></div>}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="section warm">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.diveHead.eyebrow}</span>
            <h2 className="section-title">{spec.diveHead.title}</h2>
            {spec.diveHead.sub && <p className="section-sub">{spec.diveHead.sub}</p>}
          </div>
          {spec.diveStats && (
            <div className="sp-dive-stats">
              {spec.diveStats.map((s) => (
                <div className="sp-dive-stat" key={s.lbl}>
                  <div className="v">{s.v}{s.unit && <small>{s.unit}</small>}</div>
                  <div className="lbl">{s.lbl}</div>
                  {s.tag && <div className="tag">{s.tag}</div>}
                </div>
              ))}
            </div>
          )}
          {spec.diveRows.map((row, i) => (
            <div key={i} className={`sp-dive-row${row.reverse ? " reverse" : ""}`}>
              <div className="sp-dive-text">
                <span className="eyebrow forest" style={{ marginBottom: 14 }}>{row.eyebrow}</span>
                <h3>{row.h3}</h3>
                <p>{row.p}</p>
                <ul>
                  {row.items.map((b) => (
                    <li key={b}><Check size={14} strokeWidth={2.5} />{b}</li>
                  ))}
                </ul>
              </div>
              <div className="sp-dive-visual">{row.visual}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations hub */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow forest">{spec.integrateHead.eyebrow}</span>
            <h2 className="section-title">{spec.integrateHead.title}</h2>
            {spec.integrateHead.sub && <p className="section-sub">{spec.integrateHead.sub}</p>}
          </div>
          <div className="sp-hub t2-hub">
            <svg className="sp-hub-svg" viewBox="0 0 760 380" preserveAspectRatio="none">
              {spec.hubNodes.map((n, i) => {
                const nx = (n.x / 100) * 760 + 32
                const ny = (n.y / 100) * 380 + 32
                return (
                  <line key={i} x1={380} y1={190} x2={nx} y2={ny}
                    stroke="rgba(26,77,46,0.18)" strokeWidth="1" strokeDasharray="4 4" />
                )
              })}
            </svg>
            {spec.hubNodes.map((n, i) => (
              <div className="sp-hub-node" key={i} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <Ic name={n.ic} size={22} strokeWidth={2} />
                <span className="lbl">{n.lbl}</span>
              </div>
            ))}
            <div className="sp-hub-center">
              <Ic name={spec.hubCenter.ic} size={32} strokeWidth={2} />
              <div className="nm">{spec.hubCenter.nm}</div>
              <div className="tg">{spec.hubCenter.tg}</div>
            </div>
          </div>
          <div className="sp-cats">
            {spec.platformCats.map((cat) => (
              <div className="sp-cat" key={cat.h}>
                <div className="sp-cat-head">
                  <div className="ic"><Ic name={cat.ic} size={20} /></div>
                  <div>
                    <h4>{cat.h}</h4>
                    <div className="sub">{cat.sub}</div>
                  </div>
                </div>
                <div className="sp-cat-logos">
                  {cat.logos.map((l) => (
                    <span className="sp-cat-logo" key={l.nm}>
                      <span className="swatch" style={{ background: l.color }} />
                      {l.nm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="section warm">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{spec.engageHead.eyebrow}</span>
            <h2 className="section-title">{spec.engageHead.title}</h2>
            {spec.engageHead.sub && <p className="section-sub">{spec.engageHead.sub}</p>}
          </div>
          <div className="sp-engage">
            <div className="sp-engage-panel">
              <div className="ic"><Ic name={spec.engageSetup.ic} size={22} /></div>
              <h3>{spec.engageSetup.h}</h3>
              <div className="price">
                {spec.engageSetup.price} <small>{spec.engageSetup.priceSub}</small>
              </div>
              <p>{spec.engageSetup.p}</p>
              <ul>
                {spec.engageSetup.items.map((l) => (
                  <li key={l}><Check size={14} strokeWidth={2.5} />{l}</li>
                ))}
              </ul>
            </div>
            <div className="sp-engage-panel dark">
              <div className="ic"><Ic name={spec.engageMonthly.ic} size={22} /></div>
              <h3>{spec.engageMonthly.h}</h3>
              <div className="price">
                {spec.engageMonthly.price} <small>{spec.engageMonthly.priceSub}</small>
              </div>
              <p>{spec.engageMonthly.p}</p>
              <ul>
                {spec.engageMonthly.items.map((l) => (
                  <li key={l}><Check size={14} strokeWidth={2.5} />{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sp-engage-cta-bar">
            <div className="copy">
              {spec.engageCta.title}
              <small>{spec.engageCta.sub}</small>
            </div>
            <Link href="/contact" className="btn primary">
              Book a call <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
