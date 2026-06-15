import type { CompletedSet, WorkoutLog } from '../types'

export interface PersonalRecord {
  type: 'heaviest' | 'most_reps' | 'set_volume' | 'session_volume'
  exerciseName: string
  value: number
  detail: string
  date: string
  workoutId: string
}

export interface ChartPoint {
  date: string
  value: number
}

export interface WorkoutStats {
  averageDurationMinutes: number
  totalTrainingMinutes: number
  totalTrainingFormatted: string
  averageDurationFormatted: string
  workoutCount: number
}

export interface StreakStats {
  currentStreak: number
  monthlyWorkouts: number
  longestStreak: number
}

function normalizeName(name: string): string {
  return name.toLowerCase().trim()
}

function setVolume(set: CompletedSet, timed?: boolean): number {
  if (timed) return 0
  if (set.weight && set.weight > 0) {
    return set.weight * set.reps
  }
  return 0
}

function exerciseSessionVolume(sets: CompletedSet[], timed?: boolean): number {
  return sets.reduce((sum, s) => sum + setVolume(s, timed), 0)
}

function workoutTotalVolume(log: WorkoutLog): number {
  return log.exercises.reduce((sum, ex) => sum + exerciseSessionVolume(ex.sets, ex.timed), 0)
}

function dateKey(iso: string): string {
  return iso.split('T')[0]
}

export function computePersonalRecords(logs: WorkoutLog[]): PersonalRecord[] {
  const heaviest = new Map<string, PersonalRecord>()
  const mostReps = new Map<string, PersonalRecord>()
  const setVolumeBest = new Map<string, PersonalRecord>()
  const sessionVolumeBest = new Map<string, PersonalRecord>()

  for (const log of logs) {
    const date = log.completedAt
    for (const ex of log.exercises) {
      const key = normalizeName(ex.exerciseName)
      if (ex.timed) continue

      for (const set of ex.sets) {
        if (set.weight && set.weight > 0) {
          const existing = heaviest.get(key)
          if (!existing || set.weight > existing.value) {
            heaviest.set(key, {
              type: 'heaviest',
              exerciseName: ex.exerciseName,
              value: set.weight,
              detail: `${set.weight} kg`,
              date,
              workoutId: log.id,
            })
          }

          const vol = set.weight * set.reps
          const volExisting = setVolumeBest.get(key)
          if (vol > 0 && (!volExisting || vol > volExisting.value)) {
            setVolumeBest.set(key, {
              type: 'set_volume',
              exerciseName: ex.exerciseName,
              value: vol,
              detail: `${set.weight} kg × ${set.reps}`,
              date,
              workoutId: log.id,
            })
          }
        }

        const repExisting = mostReps.get(key)
        if (!ex.timed && (!repExisting || set.reps > repExisting.value)) {
          mostReps.set(key, {
            type: 'most_reps',
            exerciseName: ex.exerciseName,
            value: set.reps,
            detail: `${set.reps} reps`,
            date,
            workoutId: log.id,
          })
        }
      }

      const sessionVol = exerciseSessionVolume(ex.sets, ex.timed)
      const sessExisting = sessionVolumeBest.get(key)
      if (sessionVol > 0 && (!sessExisting || sessionVol > sessExisting.value)) {
        sessionVolumeBest.set(key, {
          type: 'session_volume',
          exerciseName: ex.exerciseName,
          value: sessionVol,
          detail: `${Math.round(sessionVol)} kg volume`,
          date,
          workoutId: log.id,
        })
      }
    }
  }

  const all = [
    ...heaviest.values(),
    ...mostReps.values(),
    ...setVolumeBest.values(),
    ...sessionVolumeBest.values(),
  ]

  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function topRecordsByType(
  records: PersonalRecord[],
  type: PersonalRecord['type'],
  limit = 5,
): PersonalRecord[] {
  const byExercise = new Map<string, PersonalRecord>()
  for (const r of records.filter((rec) => rec.type === type)) {
    const key = normalizeName(r.exerciseName)
    const existing = byExercise.get(key)
    if (!existing || r.value > existing.value) byExercise.set(key, r)
  }
  return [...byExercise.values()].sort((a, b) => b.value - a.value).slice(0, limit)
}

function matchesKeywords(name: string, keywords: string[]): boolean {
  const n = normalizeName(name)
  return keywords.some((k) => n.includes(k))
}

export function exerciseMaxWeightOverTime(
  logs: WorkoutLog[],
  keywords: string[],
): ChartPoint[] {
  const byDate = new Map<string, number>()

  for (const log of logs) {
    const dk = dateKey(log.completedAt)
    for (const ex of log.exercises) {
      if (!matchesKeywords(ex.exerciseName, keywords)) continue
      for (const set of ex.sets) {
        if (set.weight && set.weight > 0) {
          byDate.set(dk, Math.max(byDate.get(dk) ?? 0, set.weight))
        }
      }
    }
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }))
}

export function totalVolumeOverTime(logs: WorkoutLog[]): ChartPoint[] {
  const byDate = new Map<string, number>()

  for (const log of logs) {
    const dk = dateKey(log.completedAt)
    const vol = workoutTotalVolume(log)
    if (vol > 0) {
      byDate.set(dk, (byDate.get(dk) ?? 0) + vol)
    }
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value: Math.round(value) }))
}

export function computeWorkoutStats(logs: WorkoutLog[]): WorkoutStats {
  if (logs.length === 0) {
    return {
      averageDurationMinutes: 0,
      totalTrainingMinutes: 0,
      totalTrainingFormatted: '0 min',
      averageDurationFormatted: '0 min',
      workoutCount: 0,
    }
  }

  let totalSeconds = 0
  for (const log of logs) {
    totalSeconds +=
      (new Date(log.completedAt).getTime() - new Date(log.startedAt).getTime()) / 1000
  }

  const totalTrainingMinutes = Math.round(totalSeconds / 60)
  const averageDurationMinutes = Math.round(totalTrainingMinutes / logs.length)

  return {
    averageDurationMinutes,
    totalTrainingMinutes,
    totalTrainingFormatted: formatDurationMinutes(totalTrainingMinutes),
    averageDurationFormatted: formatDurationMinutes(averageDurationMinutes),
    workoutCount: logs.length,
  }
}

function formatDurationMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function computeStreakStats(logs: WorkoutLog[]): StreakStats {
  if (logs.length === 0) {
    return { currentStreak: 0, monthlyWorkouts: 0, longestStreak: 0 }
  }

  const dates = [...new Set(logs.map((l) => dateKey(l.completedAt)))].sort()
  const dateSet = new Set(dates)

  const now = new Date()
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthlyWorkouts = logs.filter((l) => dateKey(l.completedAt).startsWith(monthPrefix)).length

  let longestStreak = 1
  let run = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000)
    if (diffDays === 1) {
      run++
      longestStreak = Math.max(longestStreak, run)
    } else if (diffDays > 1) {
      run = 1
    }
  }

  let currentStreak = 0
  const today = dateKey(now.toISOString())
  const yesterday = dateKey(new Date(now.getTime() - 86400000).toISOString())

  let cursor: string | null = null
  if (dateSet.has(today)) cursor = today
  else if (dateSet.has(yesterday)) cursor = yesterday

  if (cursor) {
    currentStreak = 1
    let d = new Date(cursor)
    while (true) {
      d = new Date(d.getTime() - 86400000)
      const key = dateKey(d.toISOString())
      if (dateSet.has(key)) currentStreak++
      else break
    }
  }

  return { currentStreak, monthlyWorkouts, longestStreak }
}
