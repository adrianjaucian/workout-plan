import type { ChartPoint } from '../lib/analytics'

interface SimpleLineChartProps {
  data: ChartPoint[]
  label: string
  unit?: string
  color?: string
  height?: number
}

function formatShortDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function SimpleLineChart({
  data,
  label,
  unit = '',
  color = '#6366f1',
  height = 140,
}: SimpleLineChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface-overlay p-4">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="mt-3 text-sm text-text-muted">No data yet — log workouts with weights to see progress.</p>
      </div>
    )
  }

  const width = 320
  const padX = 28
  const padY = 24
  const chartW = width - padX * 2
  const chartH = height - padY * 2

  const values = data.map((d) => d.value)
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal || 1

  const points = data.map((d, i) => {
    const x = padX + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW)
    const y = padY + chartH - ((d.value - minVal) / range) * chartH
    return { x, y, ...d }
  })

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')

  const latest = data[data.length - 1]
  const first = data[0]

  return (
    <div className="rounded-xl border border-border bg-surface-overlay p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-lg font-bold text-text">
          {latest.value}
          {unit && <span className="ml-0.5 text-sm font-normal text-text-muted">{unit}</span>}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-2 w-full"
        role="img"
        aria-label={`${label} chart`}
      >
        <line
          x1={padX}
          y1={padY + chartH}
          x2={padX + chartW}
          y2={padY + chartH}
          stroke="currentColor"
          className="text-border"
          strokeWidth="1"
        />
        {data.length > 1 && (
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polyline}
          />
        )}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
        ))}
      </svg>

      <div className="mt-1 flex justify-between text-xs text-text-muted">
        <span>{formatShortDate(first.date)}</span>
        {data.length > 1 && <span>{formatShortDate(latest.date)}</span>}
      </div>
    </div>
  )
}
