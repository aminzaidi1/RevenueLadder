interface BarChartProps {
  data: { label: string; value: number; tooltip?: string }[]
  height?: number
  showXLabels?: number
}

export function BarChart({ data, height = 160, showXLabels = 6 }: BarChartProps) {
  if (data.length === 0) {
    return (
      <div className="ox-chart-empty" style={{ height }}>
        No data yet.
      </div>
    )
  }

  const max = Math.max(1, ...data.map((d) => d.value))
  const barW = 100 / data.length
  const labelEvery = Math.max(1, Math.floor(data.length / showXLabels))

  return (
    <div className="ox-chart-bar" style={{ height }}>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        width="100%"
        height={height}
        role="img"
        aria-label="Daily call volume"
      >
        {data.map((d, i) => {
          const h = (d.value / max) * (height - 24)
          const x = i * barW
          const y = height - 20 - h
          return (
            <g key={i}>
              <rect
                x={x + barW * 0.15}
                y={y}
                width={barW * 0.7}
                height={Math.max(h, d.value > 0 ? 2 : 0)}
                fill="var(--rl-forest)"
                opacity={d.value > 0 ? 0.95 : 0.1}
                rx={1.2}
              >
                {d.tooltip && <title>{d.tooltip}</title>}
              </rect>
            </g>
          )
        })}
      </svg>
      <div className="ox-chart-bar-labels">
        {data.map((d, i) => (
          <div key={i} className="ox-chart-bar-lbl">
            {i % labelEvery === 0 ? d.label : ""}
          </div>
        ))}
      </div>
    </div>
  )
}
