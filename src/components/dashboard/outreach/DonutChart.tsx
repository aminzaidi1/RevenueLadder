interface Slice {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  data: Slice[]
  size?: number
  centerTop?: string
  centerBottom?: string
}

export function DonutChart({ data, size = 160, centerTop, centerBottom }: DonutChartProps) {
  const total = data.reduce((sum, s) => sum + s.value, 0)
  const r = 36
  const c = 2 * Math.PI * r
  const cx = 50
  const cy = 50

  if (total === 0) {
    return (
      <div className="ox-chart-donut-wrap" style={{ width: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rl-border-soft)" strokeWidth={14} />
        </svg>
        <div className="ox-chart-donut-empty">No data</div>
      </div>
    )
  }

  let offset = 0
  return (
    <div className="ox-chart-donut-wrap" style={{ width: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rl-border-soft)" strokeWidth={14} />
        {data.map((s, i) => {
          if (s.value === 0) return null
          const frac = s.value / total
          const arc = frac * c
          const dash = `${arc} ${c - arc}`
          const node = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={14}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
            >
              <title>{`${s.label}: ${s.value}`}</title>
            </circle>
          )
          offset += arc
          return node
        })}
        {(centerTop || centerBottom) && (
          <>
            {centerTop && (
              <text x={cx} y={cy - 2} textAnchor="middle" className="ox-donut-center-top">{centerTop}</text>
            )}
            {centerBottom && (
              <text x={cx} y={cy + 10} textAnchor="middle" className="ox-donut-center-bot">{centerBottom}</text>
            )}
          </>
        )}
      </svg>
    </div>
  )
}
