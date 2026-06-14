import type { Metadata } from "next"
import { CaseStudyIndexCard } from "@/components/sections/case-studies/CaseStudyIndexCard"
import { CaseStudyCTA } from "@/components/sections/case-studies/CaseStudyCTA"
import { Eyebrow } from "@/components/sections/case-studies/Eyebrow"
import { CASE_STUDIES } from "@/data/case-studies"

export const metadata: Metadata = {
  title: "Case studies | RevenueLadder",
  description:
    "Welsh and UK SMEs we have helped grow. Real numbers, written up plainly. Built from Bangor.",
}

export default function CaseStudiesIndexPage() {
  return (
    <>
      <section style={{ maxWidth: 1240, margin: "0 auto", paddingTop: 24 }} className="rl-px">
        <div style={{ maxWidth: 760, padding: "48px 0 32px" }}>
          <Eyebrow tone="forest">Case studies</Eyebrow>
          <h1 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontWeight: 900,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            letterSpacing: "-.03em",
            lineHeight: 1.05,
            marginTop: 14,
            color: "var(--rl-fg-1)",
          }}>
            Real Welsh businesses.<br />
            <span style={{ color: "var(--rl-forest)" }}>Numbers that hold.</span>
          </h1>
          <p style={{
            fontSize: 17, color: "var(--rl-fg-2)", lineHeight: 1.65,
            marginTop: 18, maxWidth: 620,
          }}>
            Plain write-ups of work we have shipped. What the business needed, what we built,
            and what changed afterwards. No hype, no padded vanity metrics.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", paddingBottom: 80 }} className="rl-px">
        <div className="rl-grid-2">
          {CASE_STUDIES.map((cs) => (
            <CaseStudyIndexCard key={cs.slug} summary={cs} />
          ))}
        </div>
      </section>

      <CaseStudyCTA
        eyebrow="Ready when you are"
        title={<>Ready to be the <em style={{ color: "var(--rl-gold)", fontStyle: "italic" }}>next case study?</em></>}
        body="Book a free 30-minute strategy call. Written plan within 48 hours. No obligation."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See all services", href: "/services" }}
      />
    </>
  )
}
