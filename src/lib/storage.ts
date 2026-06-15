import type { Routine, WorkoutLog } from '../types'

const ROUTINES_KEY = 'workout-routines'
const LOGS_KEY = 'workout-logs'

export function loadRoutines(): Routine[] {
  try {
    const raw = localStorage.getItem(ROUTINES_KEY)
    return raw ? (JSON.parse(raw) as Routine[]) : []
  } catch {
    return []
  }
}

export function saveRoutines(routines: Routine[]): void {
  localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines))
}

export function loadWorkoutLogs(): WorkoutLog[] {
  try {
    const raw = localStorage.getItem(LOGS_KEY)
    return raw ? (JSON.parse(raw) as WorkoutLog[]) : []
  } catch {
    return []
  }
}

export function saveWorkoutLog(log: WorkoutLog): void {
  const logs = loadWorkoutLogs()
  logs.unshift(log)
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs))
}

export function deleteWorkoutLog(id: string): void {
  const logs = loadWorkoutLogs().filter((l) => l.id !== id)
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs))
}

export function getWorkoutLog(id: string): WorkoutLog | undefined {
  return loadWorkoutLogs().find((l) => l.id === id)
}

export function generateId(): string {
  return crypto.randomUUID()
}
