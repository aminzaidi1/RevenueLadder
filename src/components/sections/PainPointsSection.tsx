import { Monitor, Inbox, Clock, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"

interface PainCard {
  Icon: LucideIcon
  title: string
  quote: string
  items: string[]
}

const PAIN_CARDS: PainCard[] = [
  {
    Icon: Monitor,
    title: "A website that just sits there.",
    quote: "Spent four grand on a site two years ago. Still don't know what it does for us.",
    items: [
      "Looks fine, ranks for nothing",
      "No leads captured, no analytics wired",
      "Slow to update; you're afraid to touch it",
    ],
  },
  {
    Icon: Inbox,
    title: "Tools that talk to nobody.",
    quote: "Bookings come in by email, payments through Stripe, contacts in a spreadsheet. Nothing joins up.",
    items: [
      "Manual copy-paste between five tools",
      "Lead falls through the cracks every week",
      "No single view of what's actually happening",
    ],
  },
  {
    Icon: Clock,
    title: "Hours you'll never get back.",
    quote: "I'm the founder, the marketer, the admin, and the person answering the phone after seven.",
    items: [
      "Reposting the same content to five channels",
      "Answering the same enquiries on repeat",
      "No time left for the work that grows the business",
    ],
  },
]

export function PainPointsSection() {
  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg-warm)" }} id="why">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <SectionHeader
          eyebrow="The honest bit"
          heading={<>You don&apos;t have a strategy problem.<br />You have a <em>capacity</em> problem.</>}
          description={<>Most small-business owners we meet already know what to do. They just haven&apos;t got the hours, the team, or the right tools wired together to actually do it. Sound familiar?</>}
        />

        <div className="rl-grid-3">
          {PAIN_CARDS.map(({ Icon, title, quote, items }) => (
            <div key={title} style={{
              background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)",
              borderRadius: 20, padding: 28,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--rl-forest-tint)", color: "var(--rl-forest)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={22} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 700,
                fontSize: 20, letterSpacing: "-.015em", color: "var(--rl-fg-1)", lineHeight: 1.2,
              }}>
                {title}
              </h3>
              <blockquote style={{
                fontSize: 14, color: "var(--rl-fg-2)", fontStyle: "italic", lineHeight: 1.6,
                padding: "12px 16px", background: "var(--rl-forest-tint)",
                borderLeft: "3px solid var(--rl-forest)", borderRadius: "0 8px 8px 0", margin: 0,
              }}>
                &ldquo;{quote}&rdquo;
              </blockquote>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--rl-fg-2)", alignItems: "flex-start" }}>
                    <X size={14} strokeWidth={2.5} style={{ color: "var(--rl-error)", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 48, fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.5, color: "var(--rl-fg-2)" }}>
          You don&apos;t need another tool. You don&apos;t need another freelancer.<br />
          <span style={{ color: "var(--rl-forest)", fontWeight: 700 }}>
            You need the whole growth stack <em style={{ fontStyle: "italic" }}>handled</em>.
          </span>
        </p>
      </div>
    </section>
  )
}
