import type { Exercise } from '../types'
import { getLibraryExercise } from '../data/exerciseLibrary'

export type TrackingMode = 'reps' | 'timer'

export function usesTimer(exercise: Exercise): boolean {
  if (exercise.trackingMode === 'timer') return true
  if (exercise.trackingMode === 'reps') return false
  return getLibraryExercise(exercise.libraryId)?.unit === 'seconds'
}

export function trackingLabel(exercise: Exercise): string {
  return usesTimer(exercise) ? 'sec' : 'reps'
}

export function targetDescription(exercise: Exercise): string {
  return usesTimer(exercise)
    ? `${exercise.targetReps} sec`
    : `${exercise.targetReps} reps`
}
