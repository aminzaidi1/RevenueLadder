import { Check, Sparkles, Workflow, Briefcase, Target, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type CellValue = "on" | "off" | string

interface MatrixGroup {
  icon: LucideIcon
  title: string
  rows: [string, CellValue, CellValue, CellValue][]
}

const GROUPS: MatrixGroup[] = [
  {
    icon: Sparkles,
    title: "The AI team",
    rows: [
      ["Content drafting (in your voice)",    "on",           "on",           "on"],
      ["Lead-triage + routing",               "on",           "on",           "on"],
      ["Voice agent runtime",                 "off",          "1 agent",      "3 agents"],
      ["Chatbot runtime",                     "add-on",       "1 bot",        "3 bots"],
      ["Custom AI agent on your data",        "off",          "add-on",       "on"],
    ],
  },
  {
    icon: Workflow,
    title: "AI execution capacity",
    rows: [
      ["Social posts / month",                "8",            "20",           "Unlimited"],
      ["Long-form articles / month",          "1",            "4",            "8+"],
      ["Email + nurture flows",               "Standard",     "Pro",          "Pro + custom"],
      ["Integrations · active automations",   "2",            "6",            "Unlimited"],
      ["Analytics digests (Slack / email)",   "Weekly",       "Daily",        "Daily + alerts"],
    ],
  },
  {
    icon: Briefcase,
    title: "Human specialists",
    rows: [
      ["Senior account lead",                 "on",           "on",           "on · dedicated"],
      ["Engineering hours / mo",              "6",            "14",           "30"],
      ["SEO + content hours / mo",            "6",            "14",           "30"],
      ["Design + creative hours / mo",        "4",            "8",            "16"],
      ["Turnaround on small jobs",            "3 days",       "Same day",     "4-hour SLA"],
    ],
  },
  {
    icon: Target,
    title: "Strategy & support",
    rows: [
      ["Cadence calls",                       "Weekly Slack", "Mon + Fri update", "Daily Slack"],
      ["Quarterly strategy day",              "off",          "Video",        "On-site"],
      ["Written monthly report",              "on",           "on · pro",     "on + board pack"],
      ["Annual roadmap",                      "off",          "off",          "on"],
      ["Pause / change tier",                 "30 days notice", "30 days notice", "30 days notice"],
    ],
  },
  {
    icon: Server,
    title: "Technology",
    rows: [
      ["Managed hosting (Cloudflare UK)",     "add-on",       "on",           "on"],
      ["Uptime + perf monitoring",            "Office hours", "Office hours", "24/7 on-call"],
      ["Security + backups",                  "Weekly",       "Daily",        "Daily + DR plan"],
      ["Pilot access to new RL services",     "off",          "on",           "on · priority"],
      ["Data residency · GDPR + UK only",     "on",           "on",           "on"],
    ],
  },
]

function Cell({ value, featured }: { value: CellValue; featured: boolean }) {
  const cls = featured ? "cell-feat" : ""
  if (value === "on")  return <div className={cls}><span className="cell-on"><Check size={18} strokeWidth={3} /></span></div>
  if (value === "off") return <div className={cls}><span className="cell-off">·</span></div>
  return <div className={cls}><span className="cell-val">{value}</span></div>
}

export function PrMatrixSection() {
  return (
    <section className="section warm">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow forest">Detail · every feature</span>
          <h2 className="section-title">
            What&apos;s in each tier, in <em>full</em>.
          </h2>
          <p className="section-sub">
            Every retainer line item, laid out so you can pick the tier that
            fits this quarter without having to email us for the small print.
          </p>
        </div>

        <div className="pr-matrix-outer">
        <div className="pr-matrix">
          <div className="pr-matrix-head">
            <div className="row-h">Feature</div>
            <div className="col">
              <div className="nm">Assist</div>
              <div className="p">£1,800 / mo</div>
            </div>
            <div className="col feat">
              <div className="ribbon">Best fit</div>
              <div className="nm">Delegate</div>
              <div className="p">£3,400 / mo</div>
            </div>
            <div className="col">
              <div className="nm">Elevate</div>
              <div className="p">£5,400 / mo</div>
            </div>
          </div>

          {GROUPS.map((group) => (
            <div className="pr-matrix-group" key={group.title}>
              <div className="group-title">
                <group.icon size={14} strokeWidth={2.5} />
                {group.title}
              </div>
              {group.rows.map((row) => (
                <div className="pr-matrix-row" key={row[0]}>
                  <div className="label-cell">{row[0]}</div>
                  <Cell value={row[1]} featured={false} />
                  <Cell value={row[2]} featured={true} />
                  <Cell value={row[3]} featured={false} />
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
