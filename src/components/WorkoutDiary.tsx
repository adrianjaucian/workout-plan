import type { WorkoutLog } from '../types'
import { formatWorkoutTime, getWorkoutStats, groupLogsByDate } from '../lib/workoutLog'

interface WorkoutDiaryProps {
  logs: WorkoutLog[]
  onSelect: (id: string) => void
}

export function WorkoutDiary({ logs, onSelect }: WorkoutDiaryProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </div>
        <p className="font-medium text-text">No workouts logged yet</p>
        <p className="mt-1 text-sm text-text-muted">
          Complete a routine and it will appear here as a diary entry.
        </p>
      </div>
    )
  }

  const groups = groupLogsByDate(logs)

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.date}>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {group.label}
          </h2>
          <ul className="space-y-2">
            {group.logs.map((log) => {
              const stats = getWorkoutStats(log)
              return (
                <li key={log.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(log.id)}
                    className="w-full rounded-2xl border border-border bg-surface-raised p-4 text-left transition-colors hover:border-accent/40 hover:bg-surface-overlay"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-text">{log.routineName}</p>
                        <p className="mt-0.5 text-sm text-text-muted">
                          {formatWorkoutTime(log.completedAt)}
                          {' · '}
                          {stats.duration}
                        </p>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0 text-text-muted"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                    <p className="mt-2 text-xs text-text-muted">
                      {stats.exerciseCount} exercise{stats.exerciseCount !== 1 ? 's' : ''}
                      {' · '}
                      {stats.totalSets} sets
                      {' · '}
                      {stats.totalReps} reps
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
