import { ChevronDown } from "lucide-react"

const FAQ = [
  {
    q: "What's the minimum commitment?",
    a: "There isn't one. Every retainer is 30-day rolling -- pause or cancel any month with 30 days' notice. We've never had a client locked into a long contract because we've never written one.",
    pills: null as string[] | null,
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes -- any month. Tell us by the 1st and the new tier kicks in the following month. No upgrade tax, no awkward re-quoting, no SOW theatre.",
    pills: ["Up · Assist to Delegate", "Down · Elevate to Delegate", "Pause · 30 days notice"],
  },
  {
    q: "What if a month's not earning the retainer back?",
    a: "We'll tell you. The Friday update flags it explicitly when something isn't working. We'd rather pivot the work -- or recommend you pause -- than collect money for output that isn't moving anything. Two clients have paused on our recommendation and resumed within a quarter.",
    pills: null,
  },
  {
    q: "Do you offer one-off projects without the retainer?",
    a: "Yes -- see the power-ups above. Voice-agent builds, website rebuilds, audit-and-strategy weeks all run as fixed-scope, fixed-price projects. Most clients start with one of those before moving to a retainer.",
    pills: null,
  },
  {
    q: "Are there hidden costs? VAT, software licences, telephony?",
    a: "No hidden costs. The retainer is the retainer. Two clarifications: VAT is added at 20% on top of the listed price. Telephony / SMS / hosting for voice agents is passed through at cost from Twilio and Cloudflare -- you see the invoices.",
    pills: null,
  },
  {
    q: "Who actually does the work? Is it outsourced?",
    a: "Six people in Bangor. No outsourcing, no contractors, no offshore pod we don't talk to. The AI agents on our roster are tools we built and tune ourselves; the work that matters has a person's name on it.",
    pills: null,
  },
  {
    q: "Can you work in Welsh?",
    a: "Yes -- Cymraeg builds, bilingual content models, Welsh-English voice agents. Our voice agent 'Bryn' handles Welsh pronouns and Welsh place names properly, including the ones that defeat most off-the-shelf voice tech.",
    pills: null,
  },
]

export function PrFAQSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow forest">Common questions</span>
          <h2 className="section-title">
            The bits people <em>actually ask</em>.
          </h2>
          <p className="section-sub">
            The short list of questions we field on every fit call. If yours
            isn&apos;t here, book the call -- we&apos;ll answer it in plain English.
          </p>
        </div>

        <div className="pr-faq">
          {FAQ.map((item, i) => (
            <details key={item.q} {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span>{item.q}</span>
                <span className="chev">
                  <ChevronDown size={14} strokeWidth={2.5} />
                </span>
              </summary>
              <div className="answer">{item.a}</div>
              {item.pills && (
                <div className="answer" style={{ paddingTop: 0 }}>
                  <div className="keys">
                    {item.pills.map((pill) => (
                      <span className="pill" key={pill}>{pill}</span>
                    ))}
                  </div>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
