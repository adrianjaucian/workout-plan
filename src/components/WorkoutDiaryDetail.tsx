import type { CompletedSet, WorkoutLog } from '../types'
import { formatWorkoutDate, formatWorkoutTime, getWorkoutStats } from '../lib/workoutLog'
import { Button } from './Button'
import { Layout } from './Layout'

function formatSetSummary(set: CompletedSet, timed: boolean): string {
  const amount = timed ? `${set.reps}s` : `${set.reps}`
  if (set.weight != null && set.weight > 0) return `${set.weight} kg × ${amount}`
  return amount
}

interface WorkoutDiaryDetailProps {
  log: WorkoutLog
  onBack: () => void
  onDelete: () => void
}

export function WorkoutDiaryDetail({ log, onBack, onDelete }: WorkoutDiaryDetailProps) {
  const stats = getWorkoutStats(log)

  const handleDelete = () => {
    if (confirm('Delete this workout from your diary?')) onDelete()
  }

  return (
    <Layout
      title="Workout"
      onBack={onBack}
      action={
        <Button variant="ghost" className="!px-3 !py-2 text-danger" onClick={handleDelete}>
          Delete
        </Button>
      }
    >
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-text">{log.routineName}</h2>
          <p className="mt-1 text-sm text-text-muted">
            {formatWorkoutDate(log.completedAt)} at {formatWorkoutTime(log.completedAt)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-border bg-surface-raised p-3 text-center">
            <p className="text-lg font-bold text-text">{stats.duration}</p>
            <p className="text-xs text-text-muted">Duration</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-3 text-center">
            <p className="text-lg font-bold text-text">{stats.totalSets}</p>
            <p className="text-xs text-text-muted">Sets</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-3 text-center">
            <p className="text-lg font-bold text-text">{stats.totalReps}</p>
            <p className="text-xs text-text-muted">Reps</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-4">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
            Exercises
          </h3>
          <ul className="space-y-4">
            {log.exercises.map((entry) => (
              <li key={entry.exerciseId}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-text">{entry.exerciseName}</p>
                  <p className="shrink-0 text-xs text-text-muted">
                    {entry.sets.length} set{entry.sets.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {entry.sets.length > 0 && (
                  <p className="mt-1 text-sm text-text-muted">
                    {entry.sets.map((s) => formatSetSummary(s, entry.timed ?? false)).join(' · ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
