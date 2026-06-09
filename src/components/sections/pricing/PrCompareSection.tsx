import { Fragment } from "react"
import { Briefcase, Layers, Clock, RefreshCw, Shield } from "lucide-react"
import { TIERS } from "@/lib/pricing-data"

const ROWS = [
  {
    icon: Briefcase,
    label: "Real monthly cost",
    diy:    { text: "£0 cash · 12h of your evenings",              verdict: "warn", vtext: "Hidden cost" },
    hire:   { text: "£3,200 salary · £900 overhead · £400 tools",  verdict: "bad",  vtext: "£4,500+" },
    agency: { text: "£8,000--£15,000 + change orders",             verdict: "bad",  vtext: "£10k+" },
    us:     { text: "£1,800--£5,400 all-in · one bill",            verdict: "ok",   vtext: "Predictable" },
  },
  {
    icon: Layers,
    label: "Skills covered",
    diy:    { text: "Whatever you're already good at",              verdict: "bad",  vtext: "1 person" },
    hire:   { text: "Generalist marketing",                         verdict: "warn", vtext: "1 person · juggling" },
    agency: { text: "Account managers + outsourced execution",      verdict: "warn", vtext: "Layered" },
    us:     { text: "5 seniors -- strategy, eng, SEO, content, ops", verdict: "ok",  vtext: "Five seniors" },
  },
  {
    icon: Clock,
    label: "Time from sign-up to shipping",
    diy:    { text: "Evenings only",                                verdict: "warn", vtext: "Slow" },
    hire:   { text: "Hire + onboard + ramp",                        verdict: "bad",  vtext: "3--6 months" },
    agency: { text: "Kickoff + SOW + scope drift",                  verdict: "warn", vtext: "4--8 weeks" },
    us:     { text: "Sign-off to live deliverables",                verdict: "ok",   vtext: "7 days" },
  },
  {
    icon: RefreshCw,
    label: "When priorities change",
    diy:    { text: "Reshuffle your week",                          verdict: "warn", vtext: "Manual" },
    hire:   { text: "Re-train, sometimes re-hire",                  verdict: "bad",  vtext: "Slow + awkward" },
    agency: { text: "New SOW, new quote",                           verdict: "bad",  vtext: "Slow" },
    us:     { text: "Tell us. Hours move on Monday.",               verdict: "ok",   vtext: "Instant" },
  },
  {
    icon: Shield,
    label: "Risk & commitment",
    diy:    { text: "Burnout · missed work",                        verdict: "bad",  vtext: "High" },
    hire:   { text: "Employment + redundancy",                      verdict: "bad",  vtext: "High" },
    agency: { text: "6--12 month contracts, exit fees",             verdict: "bad",  vtext: "High" },
    us:     { text: "30-day rolling · pause any month",             verdict: "ok",   vtext: "Low" },
  },
]

export function PrCompareSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow forest">Side-by-side</span>
          <h2 className="section-title">
            The maths is usually <em>obvious</em>.<br />
            The relationship is the bit nobody talks about.
          </h2>
          <p className="section-sub">
            Most small businesses already pay for the work in fragments -- one
            freelancer, one agency, one tool, a part-timer. Here&apos;s how the four
            paths compare.
          </p>
        </div>

        <div className="pr-quick-compare">
          <div className="head" />
          <div className="head">DIY<span className="sub">You + your evenings</span></div>
          <div className="head">Full-time hire<span className="sub">£3,200 + overhead</span></div>
          <div className="head">Traditional agency<span className="sub">£8k--£15k retainer</span></div>
          <div className="head us">RevenueLadder<span className="sub">From £{TIERS[0].monthly.toLocaleString("en-GB")} / mo</span></div>

          {ROWS.map(({ icon: Icon, label, diy, hire, agency, us }) => (
            <Fragment key={label}>
              <div className="row-label">
                <Icon size={16} strokeWidth={2.25} />{label}
              </div>
              <div className="cell">
                {diy.text}<div className={`verdict ${diy.verdict}`}>{diy.vtext}</div>
              </div>
              <div className="cell">
                {hire.text}<div className={`verdict ${hire.verdict}`}>{hire.vtext}</div>
              </div>
              <div className="cell">
                {agency.text}<div className={`verdict ${agency.verdict}`}>{agency.vtext}</div>
              </div>
              <div className="cell us">
                {us.text}<div className={`verdict ${us.verdict}`}>{us.vtext}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
