import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PrGuaranteeSection() {
  return (
    <section style={{ padding: "0 0 112px" }}>
      <div className="container">
        <div className="pr-guarantee">
          <div className="pr-seal">
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div className="num">30</div>
              <div className="lbl">day<br />money-back</div>
            </div>
          </div>
          <div>
            <h2>
              Try us for thirty days.<br />
              If it&apos;s not <em>obviously worth it</em>, we&apos;ll refund the lot.
            </h2>
            <p>
              We&apos;re confident enough in the work to put the first month under a
              plain-English money-back guarantee. If, four weeks in, you don&apos;t
              feel the retainer is paying for itself -- in time saved, leads earned,
              or just the relief of nobody asking you for a Facebook post -- we
              refund it. No clauses, no clawbacks.
            </p>
            <p>
              We&apos;ve offered this since we started. Nobody&apos;s claimed it in four
              years. We mention it on the pricing page so you can decide whether
              to bother reading any further.
            </p>
            <Link href="/case-studies" className="link">
              Read customer stories <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
