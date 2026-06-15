import type { Exercise, Routine } from '../types'
import {
  getLibraryExercise,
  type ExerciseCategory,
} from '../data/exerciseLibrary'

const WEIGHT_CATEGORIES: ExerciseCategory[] = ['barbell', 'dumbbell', 'machine', 'cable']

export const EQUIPMENT_LABELS: Record<ExerciseCategory, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbells',
  machine: 'Machines',
  cable: 'Cable machine',
  bodyweight: 'Bodyweight only',
  mat: 'Exercise mat',
}

export function getExerciseEquipment(exercise: Exercise): string | null {
  const lib = getLibraryExercise(exercise.libraryId)
  if (!lib) return null
  return EQUIPMENT_LABELS[lib.category]
}

export function getRoutineEquipment(routine: Routine): string[] {
  const items = new Set<string>()
  for (const ex of routine.exercises) {
    const eq = getExerciseEquipment(ex)
    if (eq) items.add(eq)
  }
  return Array.from(items)
}

export function shouldTrackWeight(exercise: Exercise): boolean {
  if (exercise.trackWeight !== undefined) return exercise.trackWeight
  const lib = getLibraryExercise(exercise.libraryId)
  if (!lib) return false
  return categoryUsesWeight(lib.category)
}

export function categoryUsesWeight(category: ExerciseCategory): boolean {
  return WEIGHT_CATEGORIES.includes(category)
}

export function defaultTrackWeight(exercise: Exercise): boolean {
  return shouldTrackWeight(exercise)
}
