import { MessageSquare, Paintbrush, Code2, TrendingUp } from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discover",
    description:
      "We start by understanding your business, your customers, and what success looks like for you. No assumptions. Good questions.",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Design",
    description:
      "We design around your goals, not trends. Every layout decision has a reason. You approve before a line of code is written.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Clean, fast, accessible code. We build for performance and for the long term, not for a quick handoff.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow",
    description:
      "Launch is the starting point, not the finish line. We track results, report honestly, and keep improving what matters.",
  },
] as const

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      style={{ backgroundColor: "var(--rl-bg)" }}
      className="py-20 sm:py-24 lg:py-28"
    >
      <div
        style={{ maxWidth: "var(--rl-container)" }}
        className="mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p
            style={{
              color: "var(--rl-forest)",
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              letterSpacing: "0.12em",
            }}
            className="text-xs font-bold uppercase mb-4"
          >
            How we work
          </p>
          <h2
            id="process-heading"
            style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              color: "var(--rl-charcoal)",
              fontSize: "clamp(1.75rem, 4vw, var(--rl-text-h1))",
            }}
            className="font-extrabold leading-tight mb-4"
          >
            A process built for results, not for looking busy.
          </h2>
          <p
            style={{
              color: "var(--rl-charcoal)",
              opacity: 0.65,
              fontSize: "var(--rl-text-body-lg)",
            }}
            className="leading-relaxed"
          >
            Four stages. No surprises. You are kept in the loop at every point.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="flex flex-col">
              {/* Number + icon row */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  style={{
                    fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                    color: "var(--rl-forest)",
                    opacity: 0.2,
                    fontSize: "2.5rem",
                  }}
                  className="font-black leading-none tabular-nums"
                >
                  {number}
                </span>
                <div
                  style={{ backgroundColor: "var(--rl-forest)" }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                >
                  <Icon
                    size={18}
                    style={{ color: "var(--rl-gold)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                  color: "var(--rl-charcoal)",
                  fontSize: "var(--rl-text-h3)",
                }}
                className="font-bold mb-3"
              >
                {title}
              </h3>

              <p
                style={{
                  color: "var(--rl-charcoal)",
                  opacity: 0.65,
                  fontSize: "var(--rl-text-body)",
                }}
                className="leading-relaxed"
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
