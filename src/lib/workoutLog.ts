import type { WorkoutLog } from '../types'

export function formatWorkoutDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatWorkoutTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatWorkoutDuration(startedAt: string, completedAt: string): string {
  const seconds = Math.floor(
    (new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000,
  )
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  const remainMins = mins % 60
  return remainMins > 0 ? `${hours}h ${remainMins}m` : `${hours}h`
}

export function getWorkoutStats(log: WorkoutLog) {
  const totalSets = log.exercises.reduce((sum, e) => sum + e.sets.length, 0)
  const totalReps = log.exercises.reduce(
    (sum, e) => sum + e.sets.reduce((s, set) => s + set.reps, 0),
    0,
  )
  return {
    exerciseCount: log.exercises.length,
    totalSets,
    totalReps,
    duration: formatWorkoutDuration(log.startedAt, log.completedAt),
  }
}

export function groupLogsByDate(logs: WorkoutLog[]): { date: string; label: string; logs: WorkoutLog[] }[] {
  const groups = new Map<string, WorkoutLog[]>()

  for (const log of logs) {
    const date = log.completedAt.split('T')[0]
    const existing = groups.get(date)
    if (existing) existing.push(log)
    else groups.set(date, [log])
  }

  return Array.from(groups.entries()).map(([date, dateLogs]) => ({
    date,
    label: formatWorkoutDate(dateLogs[0].completedAt),
    logs: dateLogs,
  }))
}
