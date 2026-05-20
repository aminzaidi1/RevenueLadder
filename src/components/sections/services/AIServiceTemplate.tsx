import type { ReactNode } from "react"
import Link from "next/link"
import {
  Bot, Workflow, Mic, ShoppingCart, Share2, Check, Briefcase, Mail, Clock,
  BarChart2, Shield, Pencil, BookOpen, Globe, Inbox, Play, Rocket,
  RefreshCw, ArrowDown, ArrowRight, Star, Target, Sparkles, Layers,
  MapPin, LayoutGrid, MessageSquare, ChevronDown, Eye, TrendingUp,
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
    arrowDown: <ArrowDown {...props} />, arrow: <ArrowRight {...props} />, arrowR: <ArrowRight {...props} />,
    star: <Star {...props} />, target: <Target {...props} />, sparkles: <Sparkles {...props} />,
    layers: <Layers {...props} />, pin: <MapPin {...props} />, layout: <LayoutGrid {...props} />,
    chat: <MessageSquare {...props} />, chevDown: <ChevronDown {...props} />, eye: <Eye {...props} />,
    trend: <TrendingUp {...props} />, search: <Search {...props} />, server: <Server {...props} />,
    code: <Code {...props} />, zap: <Zap {...props} />, users: <Users {...props} />,
  }
  return <>{map[name] ?? <Sparkles {...props} />}</>
}

export interface AICap {
  ic: IconName
  h: string
  p: string
  kicker?: string
}

export interface AIProof {
  eyebrow?: string
  h2: string
  body: string
  stats: { v: string; unit?: string; lbl: string }[]
  quote: { initials: string; name: string; role: string; text: string; meta?: string }
}

export interface AIDiveRow {
  eyebrow: string
  h3: string
  body: string
  bullets: string[]
  visual: ReactNode
}

export interface AIHubNode { ic: IconName; lbl: string; x: number; y: number }
export interface AIIntCat  { ic: IconName; h: string; sub: string; logos: { nm: string; color: string }[] }

export interface AIEngage {
  setup:   { label: string; price: string; priceSub: string; lines: string[] }
  monthly: { label: string; price: string; priceSub: string; lines: string[] }
  ctaCopy?: string
}

export interface AIServiceSpec {
  service:  string
  ic:       IconName
  h1:       ReactNode
  sub:      string
  trustBadges?: string[]
  secondaryCta?: string
  heroVisual:   ReactNode

  capsHead?: { eyebrow?: string; title: ReactNode; sub?: string }
  caps:      AICap[]

  proof: AIProof

  diveHead?: { eyebrow?: string; title?: ReactNode; sub?: string }
  diveStats?: { v: string; unit?: string; lbl: string; tag?: string }[]
  diveRows:  AIDiveRow[]

  hubNodes:  AIHubNode[]
  intCats:   AIIntCat[]

  engage: AIEngage
}

export function AIServiceTemplate({ spec }: { spec: AIServiceSpec }) {
  return (
    <div className="t1-page">
      {/* Hero */}
      <section className="container" style={{ paddingTop: 0 }}>
        <div className="sp-hero t1-hero">
          <div className="sp-hero-grid">
            <div>
              <div className="sp-eyebrow-stack">
                <span className="sp-crumb">
                  <Bot size={11} strokeWidth={2.5} />
                  AI &amp; Automation
                  <span className="sp-crumb-sep">/</span>
                  {spec.service}
                </span>
              </div>
              <h1 className="sp-h1">{spec.h1}</h1>
              <p className="sp-sub">{spec.sub}</p>
              <div className="sp-cta-row">
                <Link href="/contact" className="btn accent lg">
                  Book a call <ArrowRight size={16} />
                </Link>
                {spec.secondaryCta && (
                  <Link href="/contact" className="btn ghost-light lg">
                    <Play size={14} /> {spec.secondaryCta}
                  </Link>
                )}
              </div>
              {spec.trustBadges && (
                <div className="sp-trust-row">
                  <span className="lbl">Trusted by</span>
                  {spec.trustBadges.map((b) => (
                    <span className="badge" key={b}><span className="dot" />{b}</span>
                  ))}
                </div>
              )}
            </div>
            <div>{spec.heroVisual}</div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          {spec.capsHead && (
            <div className="section-head center">
              {spec.capsHead.eyebrow && <span className="eyebrow">{spec.capsHead.eyebrow}</span>}
              <h2 className="section-title">{spec.capsHead.title}</h2>
              {spec.capsHead.sub && <p className="section-sub">{spec.capsHead.sub}</p>}
            </div>
          )}
          <div className="sp-caps t1-caps">
            {spec.caps.map((cap) => (
              <div className="sp-cap" key={cap.h}>
                <div className="ic"><Ic name={cap.ic} size={20} /></div>
                {cap.kicker && <div className="kicker">{cap.kicker}</div>}
                <h4>{cap.h}</h4>
                <p>{cap.p}</p>
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
          {spec.diveHead && (
            <div className="section-head center">
              {spec.diveHead.eyebrow && <span className="eyebrow forest">{spec.diveHead.eyebrow}</span>}
              {spec.diveHead.title && <h2 className="section-title">{spec.diveHead.title}</h2>}
              {spec.diveHead.sub && <p className="section-sub">{spec.diveHead.sub}</p>}
            </div>
          )}
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
            <div key={i} className={`sp-dive-row${i % 2 === 1 ? " reverse" : ""}`}>
              <div className="sp-dive-text">
                <span className="eyebrow forest" style={{ marginBottom: 14 }}>{row.eyebrow}</span>
                <h3>{row.h3}</h3>
                <p>{row.body}</p>
                <ul>
                  {row.bullets.map((b) => (
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
            <span className="eyebrow forest">Connects to your stack</span>
            <h2 className="section-title">Works where your business already runs.</h2>
          </div>
          <div className="sp-hub t1-hub">
            <svg className="sp-hub-svg" viewBox="0 0 760 380" preserveAspectRatio="none">
              {spec.hubNodes.map((n, i) => {
                const nx = (n.x / 100) * 760 + 32
                const ny = (n.y / 100) * 380 + 32
                return (
                  <line key={i} x1={380} y1={190} x2={nx} y2={ny}
                    stroke="rgba(255,196,37,0.25)" strokeWidth="1" strokeDasharray="4 4" />
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
              <Ic name={spec.ic} size={32} strokeWidth={2} />
              <div className="nm">{spec.service}</div>
              <div className="tg">RL AI Stack</div>
            </div>
          </div>
          <div className="sp-cats">
            {spec.intCats.map((cat) => (
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
            <span className="eyebrow">How we engage</span>
            <h2 className="section-title">Start once. Keep it running.</h2>
          </div>
          <div className="sp-engage">
            <div className="sp-engage-panel">
              <div className="ic"><Rocket size={22} /></div>
              <h3>{spec.engage.setup.label}</h3>
              <div className="price">
                {spec.engage.setup.price} <small>{spec.engage.setup.priceSub}</small>
              </div>
              <ul>
                {spec.engage.setup.lines.map((l) => (
                  <li key={l}><Check size={14} strokeWidth={2.5} />{l}</li>
                ))}
              </ul>
            </div>
            <div className="sp-engage-panel dark">
              <div className="ic"><RefreshCw size={22} /></div>
              <h3>{spec.engage.monthly.label}</h3>
              <div className="price">
                {spec.engage.monthly.price} <small>{spec.engage.monthly.priceSub}</small>
              </div>
              <ul>
                {spec.engage.monthly.lines.map((l) => (
                  <li key={l}><Check size={14} strokeWidth={2.5} />{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sp-engage-cta-bar">
            <div className="copy">
              {spec.engage.ctaCopy ?? `Ready to add ${spec.service.toLowerCase()} to your business?`}
              <small>Book a 30-minute call -- we&apos;ll tell you exactly what it would take.</small>
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
