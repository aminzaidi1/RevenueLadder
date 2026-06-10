import Image from "next/image"

const LOGOS = [
  { src: "/assets/icons/zapier.png",          alt: "Zapier" },
  { src: "/assets/icons/calendar.png",        alt: "Google Calendar" },
  { src: "/assets/icons/hubspot.png",         alt: "HubSpot" },
  { src: "/assets/icons/salesforce.png",      alt: "Salesforce" },
  { src: "/assets/icons/sheets.png",          alt: "Google Sheets" },
  { src: "/assets/icons/slack.png",           alt: "Slack" },
  { src: "/assets/icons/gohighlevel.svg",     alt: "GoHighLevel" },
  { src: "/assets/icons/make.png",            alt: "Make" },
  { src: "/assets/icons/twilio.png",          alt: "Twilio" },
  { src: "/assets/icons/cal.png",             alt: "Cal.com" },
  { src: "/assets/icons/notion.svg",          alt: "Notion" },
  { src: "/assets/icons/drive.png",           alt: "Google Drive" },
  { src: "/assets/icons/n8n.png",             alt: "n8n" },
  { src: "/assets/icons/monday.svg",          alt: "Monday.com" },
  { src: "/assets/icons/gmail-icon-3.svg",    alt: "Gmail" },
  { src: "/assets/icons/mailchimp-icon-3.svg",alt: "Mailchimp" },
  { src: "/assets/icons/shopify-icon-3.svg",  alt: "Shopify" },
  { src: "/assets/icons/airtable.svg",        alt: "Airtable" },
  { src: "/assets/icons/c-aws.svg",           alt: "AWS" },
  { src: "/assets/icons/meta.svg",            alt: "Meta" },
  { src: "/assets/icons/paypal.svg",          alt: "PayPal" },
  { src: "/assets/icons/stripe.svg",          alt: "Stripe" },
  { src: "/assets/icons/supabase.svg",        alt: "Supabase" },
  { src: "/assets/icons/telegram.svg",        alt: "Telegram" },
]

interface IntegrationsTickerProps {
  eyebrow?: string
}

export function IntegrationsTicker({
  eyebrow = "Works with your existing stack",
}: IntegrationsTickerProps) {
  return (
    <div style={{ padding: "48px 0" }}>
      <style>{`
        @keyframes int-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .int-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: int-scroll 38s linear infinite;
        }

        .int-card {
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          border: 1px solid var(--rl-border-soft);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: var(--rl-surface);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .int-card:hover {
          border-color: var(--rl-forest);
          box-shadow: 0 6px 20px rgba(26,77,46,0.10);
        }
        .int-card img {
          width: 56px;
          height: 56px;
          object-fit: contain;
          filter: grayscale(1) brightness(0.55);
          transition: filter 0.3s ease;
        }
        .int-card:hover img {
          filter: grayscale(0) brightness(1);
        }
        .int-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      {/* Eyebrow */}
      <p style={{
        textAlign: "center",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        color: "var(--rl-fg-3)",
        marginBottom: 28,
      }}>
        {eyebrow}
      </p>

      {/* Scrolling viewport */}
      <div className="int-viewport">
        <div className="int-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="int-card">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
