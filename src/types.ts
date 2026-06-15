export interface Exercise {
  id: string
  name: string
  libraryId?: string
  targetSets: number
  targetReps: number
  restSeconds: number
  trackWeight?: boolean
  defaultWeight?: number
  trackingMode?: 'reps' | 'timer'
}

export interface Routine {
  id: string
  name: string
  exercises: Exercise[]
  createdAt: string
  updatedAt: string
}

export interface CompletedSet {
  setNumber: number
  reps: number
  weight?: number
}

export interface WorkoutExerciseLog {
  exerciseId: string
  exerciseName: string
  sets: CompletedSet[]
  timed?: boolean
}

export interface WorkoutLog {
  id: string
  routineId: string
  routineName: string
  startedAt: string
  completedAt: string
  exercises: WorkoutExerciseLog[]
}

export type HomeTab = 'routines' | 'progress' | 'diary'

export type View =
  | { type: 'home'; tab: HomeTab }
  | { type: 'edit'; routineId: string | null }
  | { type: 'workout'; routineId: string }
  | { type: 'diary-entry'; logId: string }
