const STATS = [
  {
    value: "50+",
    label: "Websites delivered",
    detail: "Across retail, professional services, hospitality, and trades.",
  },
  {
    value: "£2M+",
    label: "Revenue attributed",
    detail: "Tracked directly to websites and campaigns we built.",
  },
  {
    value: "98%",
    label: "Client retention",
    detail: "Most clients have been with us for two years or more.",
  },
  {
    value: "4.2x",
    label: "Average traffic growth",
    detail: "Measured 12 months after launch across SEO projects.",
  },
] as const

export function ResultsSection() {
  return (
    <section
      aria-labelledby="results-heading"
      style={{
        backgroundColor: "var(--rl-forest-deep)",
        backgroundImage: "var(--rl-pattern-ladder)",
      }}
      className="py-20 sm:py-24 lg:py-28"
    >
      <div
        style={{ maxWidth: "var(--rl-container)" }}
        className="mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p
            style={{
              color: "var(--rl-gold)",
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              letterSpacing: "0.12em",
            }}
            className="text-xs font-bold uppercase mb-4"
          >
            The numbers
          </p>
          <h2
            id="results-heading"
            style={{
              fontFamily: "var(--font-montserrat, var(--rl-font-display))",
              color: "var(--rl-text-on-dark)",
              fontSize: "clamp(1.75rem, 4vw, var(--rl-text-h1))",
            }}
            className="font-extrabold leading-tight"
          >
            Grounded in results, not promises.
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
          {STATS.map(({ value, label, detail }) => (
            <div
              key={label}
              style={{ borderRight: "1px solid var(--rl-border-dark)" }}
              className="flex flex-col p-6 sm:p-8 last:border-r-0"
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                  color: "var(--rl-gold)",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                }}
                className="font-black leading-none mb-2 block"
              >
                {value}
              </span>
              <span
                style={{
                  color: "var(--rl-text-on-dark)",
                  fontSize: "var(--rl-text-h4)",
                  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                }}
                className="font-bold mb-2 block"
              >
                {label}
              </span>
              <span
                style={{
                  color: "var(--rl-text-on-dark)",
                  opacity: 0.55,
                  fontSize: "var(--rl-text-body)",
                }}
                className="leading-snug block"
              >
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
