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

  const slices = data.map((s, i) => {
    const frac = s.value / total
    const arc = frac * c
    return { ...s, arc, index: i }
  })
  const offsets = slices.reduce<number[]>((acc, s) => {
    acc.push(acc.length === 0 ? 0 : acc[acc.length - 1] + slices[acc.length - 1].arc)
    return acc
  }, [])

  return (
    <div className="ox-chart-donut-wrap" style={{ width: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rl-border-soft)" strokeWidth={14} />
        {slices.map((s, i) => {
          if (s.value === 0) return null
          const dash = `${s.arc} ${c - s.arc}`
          return (
            <circle
              key={s.index}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={14}
              strokeDasharray={dash}
              strokeDashoffset={-offsets[i]}
              transform={`rotate(-90 ${cx} ${cy})`}
            >
              <title>{`${s.label}: ${s.value}`}</title>
            </circle>
          )
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
