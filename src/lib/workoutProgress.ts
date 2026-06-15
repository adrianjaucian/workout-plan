import type { Exercise, Routine, WorkoutExerciseLog } from '../types'

export function getCompletedSetCount(
  exerciseId: string,
  logs: WorkoutExerciseLog[],
): number {
  return logs.find((l) => l.exerciseId === exerciseId)?.sets.length ?? 0
}

export function findOutstandingExercise(
  routine: Routine,
  logs: WorkoutExerciseLog[],
  visitedExerciseIds: Set<string>,
  pendingComplete?: { exerciseId: string; newCount: number },
): { exerciseIndex: number; setIndex: number } | null {
  for (let i = 0; i < routine.exercises.length; i++) {
    const ex = routine.exercises[i]
    if (!visitedExerciseIds.has(ex.id)) continue

    let completed = getCompletedSetCount(ex.id, logs)
    if (pendingComplete?.exerciseId === ex.id) {
      completed = pendingComplete.newCount
    }

    if (completed < ex.targetSets) {
      return { exerciseIndex: i, setIndex: completed }
    }
  }
  return null
}

export interface ExerciseProgress {
  exercise: Exercise
  exerciseIndex: number
  completedSets: number
  targetSets: number
  skippedSets: number
  isSkipped: boolean
  isComplete: boolean
  log?: WorkoutExerciseLog
}

export function getExerciseProgressList(
  routine: Routine,
  logs: WorkoutExerciseLog[],
  visitedExerciseIds: Set<string>,
  skippedExerciseIds: Set<string>,
  maxReachedIndex: number,
): ExerciseProgress[] {
  const items: ExerciseProgress[] = []

  for (let i = 0; i <= maxReachedIndex && i < routine.exercises.length; i++) {
    const ex = routine.exercises[i]
    if (!visitedExerciseIds.has(ex.id)) continue

    const log = logs.find((l) => l.exerciseId === ex.id)
    const completedSets = log?.sets.length ?? 0
    const targetSets = ex.targetSets
    const skippedSets = Math.max(0, targetSets - completedSets)
    const isComplete = completedSets >= targetSets
    const isSkipped = skippedExerciseIds.has(ex.id) && !isComplete

    items.push({
      exercise: ex,
      exerciseIndex: i,
      completedSets,
      targetSets,
      skippedSets,
      isSkipped,
      isComplete,
      log,
    })
  }

  return items
}
