import type { WorkoutLog } from '../types'
import {
  computePersonalRecords,
  computeStreakStats,
  computeWorkoutStats,
  exerciseMaxWeightOverTime,
  topRecordsByType,
  totalVolumeOverTime,
} from '../lib/analytics'
import { SimpleLineChart } from './SimpleLineChart'

interface ProgressDashboardProps {
  logs: WorkoutLog[]
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-4 text-center">
      <p className="text-2xl font-bold text-text">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-text">{label}</p>
      {sub && <p className="mt-1 text-xs text-text-muted">{sub}</p>}
    </div>
  )
}

function formatRecordDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const PR_TYPE_LABELS = {
  heaviest: 'Heaviest lift',
  most_reps: 'Most reps',
  set_volume: 'Best set volume',
  session_volume: 'Session volume',
} as const

export function ProgressDashboard({ logs }: ProgressDashboardProps) {
  const streaks = computeStreakStats(logs)
  const duration = computeWorkoutStats(logs)
  const allRecords = computePersonalRecords(logs)
  const heaviest = topRecordsByType(allRecords, 'heaviest', 6)
  const mostReps = topRecordsByType(allRecords, 'most_reps', 4)
  const volumeRecords = topRecordsByType(allRecords, 'session_volume', 4)

  const benchData = exerciseMaxWeightOverTime(logs, ['bench press'])
  const squatData = exerciseMaxWeightOverTime(logs, ['squat'])
  const volumeData = totalVolumeOverTime(logs)

  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-6 4 3 5-8" />
          </svg>
        </div>
        <p className="font-medium text-text">No progress data yet</p>
        <p className="mt-1 text-sm text-text-muted">
          Complete workouts and save them to your diary to unlock stats, records, and charts.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-bold text-text">Streaks</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Current streak"
            value={streaks.currentStreak}
            sub={streaks.currentStreak === 1 ? 'day' : 'days'}
          />
          <StatCard
            label="This month"
            value={streaks.monthlyWorkouts}
            sub="workouts completed"
          />
        </div>
        {streaks.longestStreak > streaks.currentStreak && (
          <p className="mt-2 text-center text-xs text-text-muted">
            Longest streak: {streaks.longestStreak} days
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-text">Training time</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Average workout" value={duration.averageDurationFormatted} />
          <StatCard label="Total training" value={duration.totalTrainingFormatted} sub={`${duration.workoutCount} sessions`} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-text">Progress charts</h2>
        <div className="space-y-3">
          <SimpleLineChart data={benchData} label="Bench press" unit="kg" color="#22c55e" />
          <SimpleLineChart data={squatData} label="Squat" unit="kg" color="#6366f1" />
          <SimpleLineChart data={volumeData} label="Total volume" unit="kg" color="#f59e0b" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-text">Personal records</h2>
        <p className="mb-4 text-sm text-text-muted">
          Automatically detected from your diary — heaviest lifts, rep PRs, and volume bests.
        </p>

        {heaviest.length > 0 && (
          <RecordGroup title="Heaviest lifts" records={heaviest} />
        )}
        {mostReps.length > 0 && (
          <RecordGroup title="Most reps" records={mostReps} />
        )}
        {volumeRecords.length > 0 && (
          <RecordGroup title="Volume records" records={volumeRecords} />
        )}

        {heaviest.length === 0 && mostReps.length === 0 && volumeRecords.length === 0 && (
          <p className="text-sm text-text-muted">
            Log weights during workouts to unlock personal records.
          </p>
        )}
      </section>
    </div>
  )
}

function RecordGroup({
  title,
  records,
}: {
  title: string
  records: ReturnType<typeof topRecordsByType>
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-text-muted">{title}</h3>
      <ul className="space-y-2">
        {records.map((r) => (
          <li
            key={`${r.type}-${r.exerciseName}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-raised px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-text">{r.exerciseName}</p>
              <p className="text-xs text-text-muted">{formatRecordDate(r.date)}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-bold text-accent">{r.detail}</p>
              <p className="text-xs text-text-muted">{PR_TYPE_LABELS[r.type]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
