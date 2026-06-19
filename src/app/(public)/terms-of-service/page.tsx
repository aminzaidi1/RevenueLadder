import type { Metadata } from "next"
import Link from "next/link"
import { CtaSection } from "@/components/sections/CtaSection"

export const metadata: Metadata = {
  title: "Terms of service | RevenueLadder",
  description:
    "Terms and conditions governing your engagement with RevenueLadder for web design, automation, and digital marketing services.",
  alternates: { canonical: "/terms-of-service" },
}

const TOC = [
  { id: "services", label: "Services" },
  { id: "payment", label: "Payment" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "liability", label: "Limitation of liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing law" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact" },
]

const h2: React.CSSProperties = {
  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
  fontWeight: 800,
  fontSize: 21,
  color: "var(--rl-fg-1)",
  letterSpacing: "-.02em",
  borderTop: "1px solid var(--rl-border)",
  paddingTop: 32,
  marginTop: 48,
  marginBottom: 16,
}

const p: React.CSSProperties = {
  marginBottom: 14,
}

const ul: React.CSSProperties = {
  paddingLeft: 22,
  marginBottom: 14,
  display: "flex",
  flexDirection: "column",
  gap: 6,
}

export default function TermsOfServicePage() {
  return (
    <>
      <section style={{ maxWidth: 1240, margin: "0 auto", paddingTop: 24 }} className="rl-px">
        <div style={{ maxWidth: 760, padding: "48px 0 40px" }}>
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".18em",
            color: "var(--rl-forest)",
            padding: "4px 12px",
            background: "rgba(26,77,46,.08)",
            border: "1px solid rgba(26,77,46,.18)",
            borderRadius: 6,
          }}>
            Legal
          </span>
          <h1 style={{
            fontFamily: "var(--font-montserrat, var(--rl-font-display))",
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 48px)",
            letterSpacing: "-.03em",
            lineHeight: 1.05,
            marginTop: 16,
            marginBottom: 12,
            color: "var(--rl-fg-1)",
          }}>
            Terms of service
          </h1>
          <p style={{ fontSize: 13, color: "var(--rl-fg-3)", marginBottom: 18 }}>
            Last updated 19 June 2026
          </p>
          <p style={{ fontSize: 17, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 620 }}>
            These terms govern your engagement with RevenueLadder. By accepting a proposal or engaging our services, you agree to them.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", paddingBottom: 80 }} className="rl-px">
        <div className="lg:flex lg:gap-16 lg:items-start">

          <aside className="hidden lg:block" style={{ flexShrink: 0, width: 210, position: "sticky", top: 96 }}>
            <div style={{
              background: "var(--rl-surface)",
              border: "1px solid var(--rl-border)",
              borderRadius: 12,
              padding: "18px 20px",
            }}>
              <p style={{
                fontSize: 10, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: ".16em",
                color: "var(--rl-fg-3)", marginBottom: 12,
              }}>
                Contents
              </p>
              <nav aria-label="Terms of service contents">
                <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                  {TOC.map(({ id, label }) => (
                    <li key={id}>
                      <a href={`#${id}`} style={{
                        fontSize: 13, color: "var(--rl-fg-2)",
                        textDecoration: "none", display: "block", padding: "2px 0",
                      }}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <div style={{
            flex: 1, minWidth: 0, maxWidth: 680,
            fontSize: 15, color: "var(--rl-fg-2)", lineHeight: 1.75,
          }}>

            <p style={p}>
              RevenueLadder Ltd, company number 14528221, registered in Wales ("RevenueLadder", "we", "us", "our"). Our studio is at Studio 4, The Foundry, Bangor, Gwynedd LL57. These terms apply alongside any written proposal or scope of work agreed between us.
            </p>

            <h2 id="services" style={h2}>Services</h2>
            <p style={p}>
              RevenueLadder provides web design and development, marketing automation, search engine optimisation, content creation, social media management, AI consultation and implementation, and retained support services for Welsh and UK businesses.
            </p>
            <p style={p}>
              All work commences following your written acceptance of a proposal or statement of work. Any changes to agreed scope must be confirmed in writing before additional work begins and may incur additional charges.
            </p>
            <p style={p}>
              Timelines quoted are estimates based on the information available at the time. We will keep you informed of any material changes. We expect timely feedback and access to systems required to complete the work.
            </p>

            <h2 id="payment" style={h2}>Payment</h2>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>
                Projects over £500 require a 50% deposit before work commences. Deposits are non-refundable once work has begun.
              </li>
              <li style={{ listStyleType: "disc" }}>
                The remaining balance is due on project completion, prior to handover of files or site launch.
              </li>
              <li style={{ listStyleType: "disc" }}>
                Retainer invoices are issued monthly in advance and payable within 14 days of the invoice date.
              </li>
              <li style={{ listStyleType: "disc" }}>
                Late payments accrue interest at 8% above the Bank of England base rate per annum, under the Late Payment of Commercial Debts (Interest) Act 1998.
              </li>
              <li style={{ listStyleType: "disc" }}>
                We reserve the right to suspend work on any engagement where an invoice is more than 21 days overdue.
              </li>
            </ul>
            <p style={p}>
              All prices are quoted in GBP and are exclusive of VAT unless stated otherwise.
            </p>

            <h2 id="intellectual-property" style={h2}>Intellectual property</h2>
            <p style={p}>
              All work produced by RevenueLadder remains our intellectual property until payment is received in full. Upon receipt of full payment, intellectual property in the agreed deliverables transfers to you.
            </p>
            <p style={p}>
              We retain the right to display completed work in our portfolio, case studies, and marketing materials unless you request otherwise in writing before project completion.
            </p>
            <p style={p}>
              Third-party software, frameworks, themes, plugins, and stock assets used in your project remain subject to their own licences. You are responsible for ensuring ongoing compliance with those licences after handover.
            </p>
            <p style={p}>
              Our proprietary automation systems, workflow templates, and internal tooling remain RevenueLadder's intellectual property regardless of payment, unless explicitly licensed to you in a separate written agreement.
            </p>

            <h2 id="acceptable-use" style={h2}>Acceptable use</h2>
            <p style={p}>
              You agree not to use RevenueLadder's deliverables or services to:
            </p>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>Engage in unlawful, deceptive, fraudulent, or harmful activity</li>
              <li style={{ listStyleType: "disc" }}>Publish content that is defamatory, harassing, hateful, or that infringes the intellectual property rights of any third party</li>
              <li style={{ listStyleType: "disc" }}>Send unsolicited commercial messages in breach of applicable law, including the Privacy and Electronic Communications Regulations</li>
              <li style={{ listStyleType: "disc" }}>Distribute malware or engage in activity that could compromise the security of third-party systems</li>
              <li style={{ listStyleType: "disc" }}>Resell or sublicence RevenueLadder's proprietary methods, templates, or systems without our written permission</li>
            </ul>
            <p style={p}>
              We reserve the right to refuse or terminate services if we reasonably believe they are being used for any prohibited purpose.
            </p>

            <h2 id="liability" style={h2}>Limitation of liability</h2>
            <p style={p}>
              RevenueLadder's total liability to you in connection with any engagement is limited to the total fees you have paid for that engagement in the 12 months preceding the claim.
            </p>
            <p style={p}>
              We are not liable for indirect, consequential, or special losses, including lost profits, lost data, loss of business opportunity, or reputational damage, even where we have been advised of the possibility of such losses.
            </p>
            <p style={p}>
              Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by law.
            </p>
            <p style={p}>
              We make no warranty that third-party platforms -- including hosting providers, CMS systems, or marketing tools -- will remain available or uninterrupted.
            </p>

            <h2 id="termination" style={h2}>Termination</h2>
            <p style={p}>
              Either party may terminate a project with 14 days' written notice. If you terminate a project in progress, you are liable for all work completed up to the date of termination. Deposits are non-refundable once work has commenced.
            </p>
            <p style={p}>
              Retainer agreements may be cancelled with 30 days' written notice, taking effect at the end of the current monthly billing period.
            </p>
            <p style={p}>
              RevenueLadder may terminate immediately without notice if you materially breach these terms, fail to pay within 30 days of a due date, or if continuing the engagement would require us to act unlawfully.
            </p>
            <p style={p}>
              On termination, all outstanding amounts become immediately payable. We will deliver completed work to you once final payment is received.
            </p>

            <h2 id="governing-law" style={h2}>Governing law</h2>
            <p style={p}>
              These terms and any disputes arising from them are governed by the law of England and Wales. Both parties submit to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 id="changes" style={h2}>Changes to these terms</h2>
            <p style={p}>
              We may update these terms from time to time. When we do, we will update the "Last updated" date above. For active clients, material changes will be communicated by email with at least 14 days' notice. Continued use of our services after the effective date constitutes acceptance of the revised terms.
            </p>

            <h2 id="contact" style={h2}>Contact</h2>
            <p style={p}>
              Questions about these terms should be sent to{" "}
              <Link href="mailto:hello@revenueladder.co.uk" style={{ color: "var(--rl-forest)", fontWeight: 600 }}>
                hello@revenueladder.co.uk
              </Link>{" "}
              or in writing to RevenueLadder Ltd, Studio 4, The Foundry, Bangor, Gwynedd LL57.
            </p>

            <p style={{
              ...p,
              marginTop: 32, paddingTop: 24,
              borderTop: "1px solid var(--rl-border)",
              color: "var(--rl-fg-3)", fontSize: 13,
            }}>
              See also:{" "}
              <Link href="/privacy-policy" style={{ color: "var(--rl-forest)" }}>
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
