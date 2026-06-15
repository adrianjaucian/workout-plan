import { Button } from './Button'

interface CountdownTimerProps {
  label: string
  secondsLeft: number
  isRunning: boolean
  totalSeconds: number
  onSkip: () => void
  onAddTime?: (seconds: number) => void
  onSubtractTime?: (seconds: number) => void
  skipLabel?: string
  variant?: 'rest' | 'exercise'
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function CountdownTimer({
  label,
  secondsLeft,
  isRunning,
  totalSeconds,
  onSkip,
  onAddTime,
  onSubtractTime,
  skipLabel,
  variant = 'rest',
}: CountdownTimerProps) {
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 100
  const isExercise = variant === 'exercise'

  return (
    <div
      className={[
        'rounded-2xl border p-6 text-center',
        isExercise
          ? 'border-warning/30 bg-warning/10'
          : 'border-accent/30 bg-accent-muted',
      ].join(' ')}
    >
      <p
        className={[
          'text-sm font-medium uppercase tracking-wider',
          isExercise ? 'text-warning' : 'text-accent',
        ].join(' ')}
      >
        {label}
      </p>
      <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-text">
        {formatTime(secondsLeft)}
      </p>

      <div className="mx-auto mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-surface-overlay">
        <div
          className={[
            'h-full rounded-full transition-all duration-1000 ease-linear',
            isExercise ? 'bg-warning' : 'bg-accent',
          ].join(' ')}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {onSubtractTime && (
          <>
            <Button variant="secondary" onClick={() => onSubtractTime(15)}>
              −15s
            </Button>
            <Button variant="secondary" onClick={() => onSubtractTime(30)}>
              −30s
            </Button>
          </>
        )}
        {onAddTime && (
          <>
            <Button variant="secondary" onClick={() => onAddTime(15)}>
              +15s
            </Button>
            <Button variant="secondary" onClick={() => onAddTime(30)}>
              +30s
            </Button>
          </>
        )}
        <Button variant="primary" onClick={onSkip}>
          {skipLabel ?? (isRunning ? 'Skip' : 'Continue')}
        </Button>
      </div>
    </div>
  )
}
