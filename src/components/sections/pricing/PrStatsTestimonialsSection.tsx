import { Star } from "lucide-react"

const STATS = [
  { v: "14,200", suffix: "+",    label: "Automated tasks completed · 2024--25" },
  { v: "48",     suffix: "",     label: "Welsh & UK SMEs scaling with us" },
  { v: "4",      suffix: " yrs", label: "Building automation in Bangor" },
  { v: "4.9",    suffix: "★",   label: "Trustpilot · 36 verified reviews" },
]

const TESTIMONIALS = [
  {
    av: "EW",
    name: "Eleri Williams",
    role: "Co-founder · Aber Coffee Co.",
    quote: "Quoted four weeks, scoped it tight, went live on the Friday they said. More booking enquiries in a fortnight than the last six months.",
  },
  {
    av: "DM",
    name: "David Morgan",
    role: "Founder · Snowdon Trails Ltd.",
    quote: "We used to lose Saturday-morning callers to the place down the road. Bryn answers on the second ring, books a deposit, sends a Welsh confirmation.",
  },
  {
    av: "CW",
    name: "Carys Wynne",
    role: "Founder · Conwy Foods",
    quote: "Rebuilt us on Shopify in five weeks. Cart recovery became our second-best sales channel by month two. Friday report is the most-read email I get.",
  },
]

export function PrStatsSection() {
  return (
    <section style={{ padding: "64px 0 0" }}>
      <div className="container">
        <div className="pr-stats">
          {STATS.map(({ v, suffix, label }) => (
            <div key={label}>
              <div className="v">
                {v}<small>{suffix}</small>
              </div>
              <div className="lbl">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PrTestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow forest">From recent clients</span>
          <h2 className="section-title">
            Three reasons it <em>actually works</em>.
          </h2>
        </div>

        <div className="pr-tt">
          {TESTIMONIALS.map((t) => (
            <div className="pr-tt-card" key={t.name}>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} strokeWidth={0} style={{ fill: "var(--rl-gold)" }} />
                ))}
              </div>
              <q>{t.quote}</q>
              <div className="who">
                <div className="av">{t.av}</div>
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="rl">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
