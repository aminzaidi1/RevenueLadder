import type { Metadata } from "next"
import Link from "next/link"
import { CtaSection } from "@/components/sections/CtaSection"

export const metadata: Metadata = {
  title: "Privacy policy | RevenueLadder",
  description:
    "How RevenueLadder collects, uses, and protects your personal data. UK GDPR-compliant privacy notice for clients and website visitors.",
  alternates: { canonical: "/privacy-policy" },
}

const TOC = [
  { id: "who-we-are", label: "Who we are" },
  { id: "data-we-collect", label: "Data we collect" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "legal-basis", label: "Legal basis" },
  { id: "sharing", label: "Sharing your data" },
  { id: "retention", label: "Retention" },
  { id: "your-rights", label: "Your rights" },
  { id: "cookies", label: "Cookies" },
  { id: "third-parties", label: "Third-party services" },
  { id: "changes", label: "Changes to this policy" },
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

const h3: React.CSSProperties = {
  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
  fontWeight: 700,
  fontSize: 15,
  color: "var(--rl-fg-1)",
  marginTop: 20,
  marginBottom: 8,
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

export default function PrivacyPolicyPage() {
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
            Privacy policy
          </h1>
          <p style={{ fontSize: 13, color: "var(--rl-fg-3)", marginBottom: 18 }}>
            Last updated 19 June 2026
          </p>
          <p style={{ fontSize: 17, color: "var(--rl-fg-2)", lineHeight: 1.65, maxWidth: 620 }}>
            This policy explains what personal data RevenueLadder collects, why we collect it, and how we protect it. We keep things plain and do not hide anything in the small print.
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
              <nav aria-label="Privacy policy contents">
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

            <h2 id="who-we-are" style={{ ...h2, borderTop: "none", paddingTop: 0, marginTop: 0 }}>Who we are</h2>
            <p style={p}>
              RevenueLadder Ltd (company number 14528221) is the data controller for personal data collected through this website and in connection with our services. We are registered at Studio 4, The Foundry, Bangor, Gwynedd LL57.
            </p>
            <p style={p}>
              Data enquiries:{" "}
              <Link href="mailto:hello@revenueladder.co.uk" style={{ color: "var(--rl-forest)", fontWeight: 600 }}>
                hello@revenueladder.co.uk
              </Link>
            </p>

            <h2 id="data-we-collect" style={h2}>Data we collect</h2>
            <p style={p}>We collect personal data in the following situations:</p>

            <h3 style={h3}>When you contact us or book a call</h3>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>Name, email address, phone number</li>
              <li style={{ listStyleType: "disc" }}>Company name and website URL</li>
              <li style={{ listStyleType: "disc" }}>Details of your business needs, as shared by you</li>
            </ul>

            <h3 style={h3}>When you become a client</h3>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>Contact and billing details</li>
              <li style={{ listStyleType: "disc" }}>Information about your systems, accounts, and workflows necessary to deliver the agreed services</li>
              <li style={{ listStyleType: "disc" }}>Communications sent between us during the engagement</li>
            </ul>

            <h3 style={h3}>When you visit our website</h3>
            <p style={p}>
              Our website does not use tracking cookies or behavioural analytics. Our hosting provider (Vercel) may log basic technical data -- such as IP address and browser type -- for security and infrastructure purposes. We do not store or analyse this data ourselves.
            </p>

            <h2 id="how-we-use-it" style={h2}>How we use it</h2>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>To respond to your enquiries and quote for work</li>
              <li style={{ listStyleType: "disc" }}>To deliver, manage, and invoice for services you have engaged us for</li>
              <li style={{ listStyleType: "disc" }}>To send service-related updates and information relevant to your engagement</li>
              <li style={{ listStyleType: "disc" }}>To comply with our legal and financial obligations</li>
              <li style={{ listStyleType: "disc" }}>To improve how we work and communicate (using aggregated, non-identifiable insights only)</li>
            </ul>
            <p style={p}>
              We do not send unsolicited marketing emails. If you opt in to receive updates from us, you can unsubscribe at any time.
            </p>

            <h2 id="legal-basis" style={h2}>Legal basis for processing</h2>
            <p style={p}>
              Under UK GDPR, we rely on the following legal bases:
            </p>

            <h3 style={h3}>Contract</h3>
            <p style={p}>
              Processing is necessary to perform the contract you have entered into with us, or to take steps at your request before entering a contract.
            </p>

            <h3 style={h3}>Legitimate interests</h3>
            <p style={p}>
              We process enquiry and contact data on the basis of our legitimate interest in responding to potential clients. We have assessed that this interest is not outweighed by your rights and freedoms.
            </p>

            <h3 style={h3}>Legal obligation</h3>
            <p style={p}>
              We retain financial and invoicing records to comply with HMRC requirements and applicable UK tax law.
            </p>

            <h3 style={h3}>Consent</h3>
            <p style={p}>
              Where we send you marketing communications, we will ask for your explicit consent beforehand. You may withdraw that consent at any time by emailing us.
            </p>

            <h2 id="sharing" style={h2}>Sharing your data</h2>
            <p style={p}>
              We do not sell your data. We share it only where necessary, with:
            </p>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Supabase</strong> -- our database and authentication provider, operating on EU infrastructure
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Calendly</strong> -- used for appointment scheduling when you book a call
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Vercel</strong> -- our hosting and infrastructure provider
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>HMRC and our accountants</strong> -- where required for tax compliance
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Professional advisers</strong> (solicitors, accountants) -- bound by confidentiality obligations
              </li>
            </ul>
            <p style={p}>
              Where data is transferred outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR.
            </p>

            <h2 id="retention" style={h2}>Retention</h2>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>
                Enquiry data from contacts who do not become clients: deleted after 12 months of no further contact.
              </li>
              <li style={{ listStyleType: "disc" }}>
                Client project data and communications: retained for 6 years from project completion, in accordance with UK tax law.
              </li>
              <li style={{ listStyleType: "disc" }}>
                Financial records and invoices: retained for 6 years as required by HMRC.
              </li>
            </ul>
            <p style={p}>
              You may request earlier deletion of your data where we have no legal obligation to retain it.
            </p>

            <h2 id="your-rights" style={h2}>Your rights</h2>
            <p style={p}>
              Under UK GDPR, you have the following rights:
            </p>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Access</strong> -- request a copy of the personal data we hold about you
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Rectification</strong> -- ask us to correct inaccurate or incomplete data
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Erasure</strong> -- request deletion of your data where we have no legal basis to retain it
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Restriction</strong> -- ask us to limit how we process your data in certain circumstances
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Portability</strong> -- receive your data in a structured, machine-readable format
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Objection</strong> -- object to processing based on legitimate interests
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Withdraw consent</strong> -- at any time, where processing is based on consent
              </li>
            </ul>
            <p style={p}>
              To exercise any of these rights, email{" "}
              <Link href="mailto:hello@revenueladder.co.uk" style={{ color: "var(--rl-forest)", fontWeight: 600 }}>
                hello@revenueladder.co.uk
              </Link>
              . We will respond within 30 days.
            </p>
            <p style={p}>
              If you are not satisfied with our response, you may lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rl-forest)", fontWeight: 600 }}>
                ico.org.uk
              </a>
              .
            </p>

            <h2 id="cookies" style={h2}>Cookies</h2>
            <p style={p}>
              Our public website does not use tracking cookies, advertising cookies, or behavioural profiling. We do not run third-party analytics such as Google Analytics.
            </p>
            <p style={p}>
              The dashboard area of the site (accessible only to authenticated RevenueLadder team members) uses strictly necessary session cookies to maintain your logged-in state. These are not shared with third parties and are deleted when you log out or close your browser.
            </p>

            <h2 id="third-parties" style={h2}>Third-party services</h2>
            <p style={p}>
              The following services are used as part of our website and operations. Each has its own privacy policy governing how they handle data:
            </p>
            <ul style={ul}>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Supabase</strong> -- database infrastructure and authentication
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Calendly</strong> -- appointment scheduling (activated when you click &quot;Book a call&quot;)
              </li>
              <li style={{ listStyleType: "disc" }}>
                <strong style={{ color: "var(--rl-fg-1)" }}>Vercel</strong> -- website hosting, CDN, and deployment
              </li>
            </ul>
            <p style={p}>
              We encourage you to review each provider&apos;s privacy policy if you have concerns about how they process your data.
            </p>

            <h2 id="changes" style={h2}>Changes to this policy</h2>
            <p style={p}>
              We may update this policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Where changes are material, we will notify active clients by email.
            </p>

            <h2 id="contact" style={h2}>Contact</h2>
            <p style={p}>
              Data enquiries:{" "}
              <Link href="mailto:hello@revenueladder.co.uk" style={{ color: "var(--rl-forest)", fontWeight: 600 }}>
                hello@revenueladder.co.uk
              </Link>
            </p>
            <p style={p}>
              RevenueLadder Ltd, Studio 4, The Foundry, Bangor, Gwynedd LL57
            </p>

            <p style={{
              ...p,
              marginTop: 32, paddingTop: 24,
              borderTop: "1px solid var(--rl-border)",
              color: "var(--rl-fg-3)", fontSize: 13,
            }}>
              See also:{" "}
              <Link href="/terms-of-service" style={{ color: "var(--rl-forest)" }}>
                Terms of service
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
