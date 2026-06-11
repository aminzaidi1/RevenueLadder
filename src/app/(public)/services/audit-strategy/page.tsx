import type { Metadata } from "next"
import { TrendingUp, Check } from "lucide-react"
import { EngagementTemplate, type EngServiceSpec } from "@/components/sections/services/EngagementTemplate"

export const metadata: Metadata = {
  title: "Audit & Strategy | Revenue Ladder",
  description: "A two-week deep audit of your stack with a costed, prioritised roadmap. Fixed scope, fixed fee, plain English. Hand-built from Bangor.",
}

function AuditReport() {
  return (
    <div className="t3-report">
      <div className="t3-report-head">
        <div>
          <div className="label">Strategic Audit Report</div>
          <div className="ttl">Conwy Foods Ltd · Q1 2025</div>
          <div className="sub">audit/cfl-q1 · 12 pages · ref AUD-0214</div>
        </div>
        <div className="seal">AUD<br /><small>2 WK</small><br /><small>FIXED</small></div>
      </div>
      <div className="t3-figures">
        <div className="fig">
          <div className="lbl">Opportunities</div>
          <div className="v">14 <small>to</small> 3</div>
          <div className="ch"><Check size={11} strokeWidth={2.5} /> scored</div>
        </div>
        <div className="fig">
          <div className="lbl">Year-1 payback</div>
          <div className="v">£47<small>k</small></div>
          <div className="ch"><TrendingUp size={11} strokeWidth={2.5} /> projected</div>
        </div>
        <div className="fig">
          <div className="lbl">Confidence</div>
          <div className="v">0.86</div>
          <div className="ch"><Check size={11} strokeWidth={2.5} /> high</div>
        </div>
      </div>
      <div className="t3-deliv">
        {[
          { t: "Top-3 opportunities scored",  s: "value x confidence / effort · shown in full" },
          { t: "90-day costed roadmap",        s: "sequenced · with build briefs" },
          { t: "ROI projection · 12 months",   s: "monthly payback curve + sensitivity" },
          { t: "Risk + governance review",     s: "GDPR · vendor lock-in · do not build list" },
        ].map((r) => (
          <div className="row" key={r.t}>
            <div className="ic"><Check size={13} strokeWidth={2.25} /></div>
            <div className="meta">
              <div className="t">{r.t}</div>
              <div className="s">{r.s}</div>
            </div>
            <div className="tag">Done</div>
          </div>
        ))}
      </div>
      <div className="t3-report-foot">
        <div className="sig">
          <div className="av">RT</div>
          <div>
            <div className="nm">Rhys Thomas</div>
            <div className="rl">Audit lead · Bangor</div>
          </div>
        </div>
        <div className="stamp">Signed<br /><small>Off</small></div>
      </div>
    </div>
  )
}

const spec: EngServiceSpec = {
  service: "Audit & Strategy",
  ic: "target",
  h1: <>A 2-week audit.<br />A 12-page <em>roadmap</em>.<br />Costed, in writing.</>,
  sub: "No strategy theatre. We spend two weeks inside your stack -- sales, ops, web, AI -- and ship a written audit with scored opportunities, costed builds, and projected payback.",
  secondaryCta: "See a sample audit",
  trustBadges: ["24 audits delivered · 2023-25", "22 progressed to build", "Fixed fee · no extras", "Money-back if it does not change a decision"],
  heroVisual: <AuditReport />,

  capsHead: {
    eyebrow: "What is in every audit",
    title: <>Six deliverables. <em>Signed off.</em></>,
    sub: "Audit & Strategy is a single, fixed-scope engagement -- not a discovery call dressed up. You get six concrete deliverables in a written report, with the audit lead's name on the cover.",
  },
  caps: [
    { ic: "layers",    when: "wk 1", h: "Stack + data audit",       p: "What you have, where it lives, what is leaking. Honest assessment of your tools, your data, your integrations." },
    { ic: "target",    when: "wk 1", h: "14 ideas scored",           p: "Every credible AI, automation, web, or content opportunity -- including the ones we will recommend you do not pursue." },
    { ic: "briefcase", when: "wk 2", h: "Top-3 build briefs",       p: "Three highest-ROI opportunities, written up as briefs you could hand to any engineer. Your team, ours, or another agency entirely." },
    { ic: "chart",     when: "wk 2", h: "Costed ROI projection",    p: "Build cost, monthly cost, projected payback, confidence interval. The maths shown -- not trust us." },
    { ic: "shield",    when: "wk 2", h: "Risk + governance review", p: "Where AI should not go. GDPR exposure. Vendor lock-in. The do-not-build list, with reasons." },
    { ic: "pin",       when: "wk 2", h: "90-minute walkthrough",    p: "A real call with the audit lead. Plain English, your questions, no slide-by-slide presentation theatre." },
  ],

  proof: {
    eyebrow: "Real numbers",
    h2: "24 audits delivered. 22 went to build.",
    body: "Of the 24 audits we have delivered since 2023, 22 progressed to a build phase -- with us, with another agency, or in-house. Two recommended doing nothing yet; both clients came back the following year.",
    stats: [
      { v: "24",              lbl: "Audits delivered · 2023-25" },
      { v: "22", unit: "/24", lbl: "Progressed to build" },
      { v: "£840", unit: "k", lbl: "Year-1 payback projected · aggregate" },
    ],
    quote: {
      initials: "CW",
      name: "Carys Wynne",
      role: "Founder · Conwy Foods · audited Feb 2025",
      text: "We had been told for two years we needed an AI strategy. RL spent a fortnight in our stack and wrote 12 pages of plain English -- three things to build, three things to ignore, two we should fix manually instead. It paid for itself before we had signed the first build.",
      meta: "Audit + build phase · 9 months in",
    },
  },

  diveHead: {
    eyebrow: "Why our audit, not theirs",
    title: <>Three places <em>most audits</em><br />quietly run out of road.</>,
    sub: "Strategy work either ends in a deck nobody re-opens or a quote you cannot evaluate. Our audit is built to avoid both -- and to be useful regardless of who you build with.",
  },
  diveStats: [
    { v: "2",    unit: "wk", lbl: "Total elapsed time",            tag: "Same for every audit" },
    { v: "~5",   unit: "h",  lbl: "Of your team's time required",  tag: "Mostly access setup" },
    { v: "£3.4", unit: "k",  lbl: "Fixed fee, all-in",             tag: "+ VAT · no extras" },
  ],
  compare: {
    label: "What it costs you",
    featIndex: 3,
    cols: [
      { nm: "Big-4 consultant",   sub: "£60k engagement · 8 weeks" },
      { nm: "Boutique agency",    sub: "Free · discovery" },
      { nm: "Friend who does AI", sub: "Pint money" },
      { nm: "RL Audit",           sub: "£3,400 · 2 weeks", ribbon: "Best fit" },
    ],
    rows: [
      {
        ic: "briefcase", label: "What you get",
        cells: [
          { txt: "PowerPoint · 60 slides · transform",                                          v: "warn", label: "Glossy · vague"    },
          { txt: "Pitch deck for their own services",                                            v: "bad",  label: "Sales doc"         },
          { txt: "A WhatsApp paragraph",                                                         v: "warn", label: "Helpful · partial" },
          { txt: <>12-page <strong>written report</strong> · scored ideas · costed roadmap</>,  v: "ok",   label: "In writing"        },
        ],
      },
      {
        ic: "clock", label: "Time to delivered",
        cells: [
          { txt: "6-12 weeks · multiple workshops",               v: "bad",  label: "Slow"         },
          { txt: "1 hour · let's book the build",                 v: "warn", label: "Quick · light" },
          { txt: "Whenever they're free",                         v: "warn", label: "Variable"      },
          { txt: <><strong>2 weeks · same as advertised</strong></>, v: "ok", label: "Fixed"       },
        ],
      },
      {
        ic: "target", label: "Independent of build",
        cells: [
          { txt: "Yes (but very expensive)",              v: "ok",  label: "Yes"         },
          { txt: "No · audit IS their pitch",             v: "bad", label: "Conflicted"  },
          { txt: "N/A · no formal output",                v: "warn", label: "N/A"        },
          { txt: "Yes · take it elsewhere if you like",   v: "ok",  label: "Independent" },
        ],
      },
      {
        ic: "chart", label: "Costed payback projection",
        cells: [
          { txt: "Yes · but the maths is theirs",                           v: "warn", label: "Yes · opaque" },
          { txt: "A number · no working shown",                              v: "bad",  label: "Vague"        },
          { txt: "No",                                                       v: "bad",  label: "No"           },
          { txt: <><strong>Yes</strong> · maths shown · sensitivity included</>, v: "ok", label: "Transparent" },
        ],
      },
      {
        ic: "shield", label: "Money-back if useless",
        cells: [
          { txt: "No",                           v: "bad",  label: "No"  },
          { txt: "No (it was free)",             v: "warn", label: "N/A" },
          { txt: "N/A",                          v: "warn", label: "N/A" },
          { txt: "Yes · if no decision changes", v: "ok",   label: "100%" },
        ],
      },
    ],
  },
  timeline: {
    eyebrow: "Inside the two weeks",
    title: <>A <em>fixed</em> timeline.<br />Same every audit.</>,
    rows: [
      { gold: true, when: "D0",     stage: "Sign-off", t: "Fixed fee paid · audit window booked",              s: "Calendar slot reserved · access checklist sent",              av: "RT", lead: "Rhys"   },
      {             when: "D1-D3",  stage: "Access",   t: "Access + discovery interviews (3)",                 s: "You grant read-only access · we interview key team members",  av: "TB", lead: "Tom"    },
      {             when: "D3-D7",  stage: "Audit",    t: "Stack audit · sales, ops, web, AI surface",         s: "Quiet work in our office · ~5h of your team's time",          av: "EW", lead: "Eira"   },
      {             when: "D7-D9",  stage: "Score",    t: "14 ideas scored · 3 picked for roadmap",            s: "Open scoring sheet shared in real-time · you see every no",   av: "RT", lead: "Rhys"   },
      {             when: "D9-D12", stage: "Write",    t: "Roadmap + briefs + ROI projection written",         s: "12-page report drafted · edited · fact-checked",              av: "CJ", lead: "Catrin" },
      { gold: true, when: "D14",   stage: "Deliver",  t: "90-min walkthrough · written report handed over",   s: "Audit signed off · you choose whether to build with us",      av: "RT", lead: "Rhys"   },
    ],
  },

  matrix: {
    eyebrow: "Three audit sizes",
    title: <>Pick the audit that <em>fits</em><br />what you need to decide.</>,
    sub: "All three audits are fixed-fee, fixed-timeline, and independent of any build phase. Bigger audits cover more surface, more interviews, more depth.",
    firstColLabel: "What's in it",
    tiers: [
      { nm: "Quick",     tag: "£1,400 · 5 days"  },
      { nm: "Standard",  tag: "£3,400 · 2 weeks" },
      { nm: "Strategic", tag: "£8,200 · 4 weeks" },
    ],
    rows: [
      { ic: "layers",    nm: "Stack audit · breadth",          cells: ["Single surface (web OR ops OR AI)", "Full surface · sales, ops, web, AI", "Full surface + competitor + market"] },
      { ic: "briefcase", nm: "Stakeholder interviews",         cells: ["1", "3", "Up to 8"] },
      { ic: "target",    nm: "Ideas scored",                    cells: ["6", "14", "24+"] },
      { ic: "briefcase", nm: "Build briefs written",            cells: ["1", "3", "3 + 18-month plan"] },
      { ic: "chart",     nm: "ROI projection horizon",         cells: ["6 months", "12 months", "3 years · with cohorts"] },
      { ic: "shield",    nm: "Risk + governance review",       cells: ["off", "on", "on · with policy draft"] },
      { ic: "pin",       nm: "Walkthrough call",                cells: ["45 min", "90 min", "Half-day on-site"] },
      { ic: "sparkles",  nm: "Quarterly check-in (12 months)", cells: ["off", "off", "on"] },
    ],
    foot: "Prices ex-VAT. Money-back across all three audits if you do not change a decision.",
  },

  tiers: {
    eyebrow: "Three audit tiers",
    title: <>Pick a starting point.<br />Move <em>between</em> them any time.</>,
    sub: "Most clients start with Standard. If you are unsure, the Quick audit lets us scope a Standard later with the smaller fee credited.",
    items: [
      {
        crown: "Quick",
        nm: "Quick audit",
        price: "£1,400",
        priceSub: " + VAT · 5 working days",
        desc: "A focused one-surface audit. We pick a single area -- web, ops, or AI -- and run a tight 5-day review with one written deliverable.",
        sections: [
          { h: "Scope",        items: [<><strong>One surface only</strong> (web · ops · AI)</>,  <>1 stakeholder interview</>,                                  <><strong>6 ideas</strong> scored · 1 build brief</>] },
          { h: "Deliverables", items: [<><strong>6-page report</strong>, in writing</>,            <>45-minute walkthrough</>] },
          { h: "Credit",       items: [<>Full fee credited if you upgrade to Standard within 90 days</>] },
        ],
        cta: "Start with Quick",
        btn: "btn primary lg",
        guarantee: "Money-back if no decision changes",
      },
      {
        feat: true,
        crown: "Most popular",
        nm: "Standard audit",
        price: "£3,400",
        priceSub: " + VAT · 2 weeks",
        desc: "The full audit. Sales, ops, web, AI surface -- 14 opportunities scored, top 3 written up as build briefs, 12-month ROI projection.",
        sections: [
          { h: "Scope",        items: [<><strong>Full surface</strong> · sales · ops · web · AI</>, <>3 stakeholder interviews</>,                              <><strong>14 ideas</strong> scored · 3 build briefs</>] },
          { h: "Deliverables", items: [<><strong>12-page report</strong>, in writing</>,            <>90-minute walkthrough</>,                                <>Costed roadmap + ROI projection · 12 months</>,        <>Risk + governance review</>] },
          { h: "Credit",       items: [<>£1,000 credit toward any RL build engagement within 6 months</>] },
        ],
        cta: "Book Standard audit",
        btn: "btn accent lg",
        guarantee: "Money-back if no decision changes",
      },
      {
        crown: "Strategic",
        nm: "Strategic audit",
        price: "£8,200",
        priceSub: " + VAT · 4 weeks",
        desc: "A 4-week deep audit. Adds competitor + market analysis, longer ROI horizon (3 years), and quarterly check-ins for 12 months after.",
        sections: [
          { h: "Scope",        items: [<><strong>Full surface</strong> + competitor + market</>,   <>Up to 8 stakeholder interviews</>,                        <><strong>24+ ideas</strong> scored · 18-month plan</>] },
          { h: "Deliverables", items: [<><strong>24-page report</strong>, in writing</>,           <>Half-day on-site walkthrough</>,                         <>3-year ROI projection · cohorted</>,                   <>Governance review · with policy draft</>] },
          { h: "Aftercare",    items: [<><strong>4 quarterly check-ins</strong> · 12 months · included</>] },
        ],
        cta: "Book Strategic audit",
        btn: "btn primary lg",
        guarantee: "Money-back if no decision changes",
      },
    ],
  },
}

export default function AuditStrategyPage() {
  return <EngagementTemplate spec={spec} />
}
