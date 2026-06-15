import type { CompletedSet } from '../types'
import { usesTimer } from '../lib/exerciseTracking'
import type { ExerciseProgress } from '../lib/workoutProgress'

function formatSetSummary(set: CompletedSet, timed: boolean): string {
  const amount = timed ? `${set.reps}s` : `${set.reps}`
  if (set.weight != null && set.weight > 0) return `${set.weight} kg × ${amount}`
  return amount
}

interface WorkoutProgressPanelProps {
  items: ExerciseProgress[]
}

export function WorkoutProgressPanel({ items }: WorkoutProgressPanelProps) {
  if (items.length === 0) return null

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
        Progress
      </h3>
      <ul className="space-y-3">
        {items.map((item) => {
          const timed = item.log?.timed ?? usesTimer(item.exercise)
          const setsLabel = `${item.completedSets}/${item.targetSets} sets`

          return (
            <li key={item.exercise.id}>
              <div className="flex items-start justify-between gap-2 text-sm">
                <span className="font-medium text-text">{item.exercise.name}</span>
                <span
                  className={[
                    'shrink-0 text-xs font-medium',
                    item.isComplete
                      ? 'text-accent'
                      : item.isSkipped
                        ? 'text-warning'
                        : 'text-text-muted',
                  ].join(' ')}
                >
                  {setsLabel}
                  {item.isSkipped && item.skippedSets > 0 && (
                    <span className="font-normal"> · {item.skippedSets} skipped</span>
                  )}
                </span>
              </div>
              {item.log && item.log.sets.length > 0 && (
                <p className="mt-0.5 text-xs text-text-muted">
                  {item.log.sets.map((s) => formatSetSummary(s, timed)).join(' · ')}
                </p>
              )}
              {item.isSkipped && item.completedSets === 0 && (
                <p className="mt-0.5 text-xs text-warning">Skipped</p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
