export type ExerciseCategory =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'mat'

export interface LibraryExercise {
  id: string
  name: string
  category: ExerciseCategory
  diagramId: string
  targetSets: number
  targetReps: number
  restSeconds: number
  unit?: 'reps' | 'seconds'
}

export const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  barbell: 'Barbell & Plates',
  dumbbell: 'Dumbbells',
  machine: 'Machines',
  cable: 'Cables',
  bodyweight: 'Bodyweight',
  mat: 'Mat & Floor',
}

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  // Barbell
  { id: 'barbell-bench-press', name: 'Barbell Bench Press', category: 'barbell', diagramId: 'bench-press', targetSets: 4, targetReps: 8, restSeconds: 90 },
  { id: 'barbell-squat', name: 'Barbell Back Squat', category: 'barbell', diagramId: 'barbell-squat', targetSets: 4, targetReps: 6, restSeconds: 120 },
  { id: 'barbell-deadlift', name: 'Barbell Deadlift', category: 'barbell', diagramId: 'deadlift', targetSets: 3, targetReps: 5, restSeconds: 120 },
  { id: 'barbell-row', name: 'Barbell Row', category: 'barbell', diagramId: 'barbell-row', targetSets: 4, targetReps: 8, restSeconds: 90 },
  { id: 'overhead-press', name: 'Overhead Press', category: 'barbell', diagramId: 'overhead-press', targetSets: 4, targetReps: 8, restSeconds: 90 },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'barbell', diagramId: 'romanian-deadlift', targetSets: 3, targetReps: 10, restSeconds: 90 },

  // Dumbbell
  { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', category: 'dumbbell', diagramId: 'dumbbell-bench', targetSets: 4, targetReps: 10, restSeconds: 75 },
  { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', category: 'dumbbell', diagramId: 'dumbbell-shoulder-press', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'dumbbell-curl', name: 'Dumbbell Bicep Curl', category: 'dumbbell', diagramId: 'dumbbell-curl', targetSets: 3, targetReps: 12, restSeconds: 60 },
  { id: 'dumbbell-lunge', name: 'Dumbbell Lunge', category: 'dumbbell', diagramId: 'dumbbell-lunge', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'dumbbell', diagramId: 'dumbbell-row', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'goblet-squat', name: 'Goblet Squat', category: 'dumbbell', diagramId: 'goblet-squat', targetSets: 3, targetReps: 12, restSeconds: 75 },
  { id: 'farmer-carry', name: 'Farmer Carry', category: 'dumbbell', diagramId: 'farmer-carry', targetSets: 3, targetReps: 45, restSeconds: 60, unit: 'seconds' },

  // Machines
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'machine', diagramId: 'lat-pulldown', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'leg-press', name: 'Leg Press', category: 'machine', diagramId: 'leg-press', targetSets: 4, targetReps: 10, restSeconds: 90 },
  { id: 'seated-row', name: 'Seated Cable Row', category: 'machine', diagramId: 'seated-row', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'leg-curl', name: 'Leg Curl', category: 'machine', diagramId: 'leg-curl', targetSets: 3, targetReps: 12, restSeconds: 60 },
  { id: 'chest-press-machine', name: 'Chest Press Machine', category: 'machine', diagramId: 'chest-press-machine', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'smith-squat', name: 'Smith Machine Squat', category: 'machine', diagramId: 'smith-squat', targetSets: 4, targetReps: 8, restSeconds: 90 },

  // Cables
  { id: 'cable-fly', name: 'Cable Fly', category: 'cable', diagramId: 'cable-fly', targetSets: 3, targetReps: 12, restSeconds: 60 },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'cable', diagramId: 'tricep-pushdown', targetSets: 3, targetReps: 12, restSeconds: 60 },
  { id: 'face-pull', name: 'Face Pull', category: 'cable', diagramId: 'face-pull', targetSets: 3, targetReps: 15, restSeconds: 60 },
  { id: 'cable-curl', name: 'Cable Bicep Curl', category: 'cable', diagramId: 'cable-curl', targetSets: 3, targetReps: 12, restSeconds: 60 },

  // Bodyweight
  { id: 'pull-up', name: 'Pull-up', category: 'bodyweight', diagramId: 'pull-up', targetSets: 3, targetReps: 8, restSeconds: 90 },
  { id: 'push-up', name: 'Push-up', category: 'bodyweight', diagramId: 'push-up', targetSets: 3, targetReps: 15, restSeconds: 60 },
  { id: 'dip', name: 'Dip', category: 'bodyweight', diagramId: 'dip', targetSets: 3, targetReps: 10, restSeconds: 75 },
  { id: 'chin-up', name: 'Chin-up', category: 'bodyweight', diagramId: 'chin-up', targetSets: 3, targetReps: 8, restSeconds: 90 },
  { id: 'bodyweight-squat', name: 'Bodyweight Squat', category: 'bodyweight', diagramId: 'barbell-squat', targetSets: 3, targetReps: 20, restSeconds: 60 },
  { id: 'walking-lunge', name: 'Walking Lunge', category: 'bodyweight', diagramId: 'dumbbell-lunge', targetSets: 3, targetReps: 10, restSeconds: 60 },
  { id: 'burpee', name: 'Burpee', category: 'bodyweight', diagramId: 'burpee', targetSets: 3, targetReps: 5, restSeconds: 60 },
  { id: 'step-up', name: 'Step-up', category: 'bodyweight', diagramId: 'step-up', targetSets: 3, targetReps: 12, restSeconds: 45 },

  // Mat
  { id: 'plank', name: 'Plank', category: 'mat', diagramId: 'plank', targetSets: 3, targetReps: 45, restSeconds: 45, unit: 'seconds' },
  { id: 'crunch', name: 'Crunch', category: 'mat', diagramId: 'crunch', targetSets: 3, targetReps: 20, restSeconds: 45 },
  { id: 'russian-twist', name: 'Russian Twist', category: 'mat', diagramId: 'russian-twist', targetSets: 3, targetReps: 20, restSeconds: 45 },
  { id: 'leg-raise', name: 'Leg Raise', category: 'mat', diagramId: 'leg-raise', targetSets: 3, targetReps: 12, restSeconds: 45 },
  { id: 'bird-dog', name: 'Bird Dog', category: 'mat', diagramId: 'bird-dog', targetSets: 3, targetReps: 10, restSeconds: 45 },
  { id: 'glute-bridge', name: 'Glute Bridge', category: 'mat', diagramId: 'glute-bridge', targetSets: 3, targetReps: 15, restSeconds: 45 },
  { id: 'cat-cow', name: 'Cat-Cow Stretch', category: 'mat', diagramId: 'cat-cow', targetSets: 2, targetReps: 10, restSeconds: 30, unit: 'seconds' },
  { id: 'childs-pose', name: "Child's Pose", category: 'mat', diagramId: 'childs-pose', targetSets: 2, targetReps: 30, restSeconds: 30, unit: 'seconds' },
  { id: 'dead-bug', name: 'Dead Bug', category: 'mat', diagramId: 'dead-bug', targetSets: 3, targetReps: 10, restSeconds: 45 },
  { id: 'mountain-climber', name: 'Mountain Climbers', category: 'mat', diagramId: 'mountain-climber', targetSets: 3, targetReps: 20, restSeconds: 45 },
  { id: 'bicycle-crunch', name: 'Bicycle Crunch', category: 'mat', diagramId: 'bicycle-crunch', targetSets: 3, targetReps: 20, restSeconds: 45 },
  { id: 'side-plank', name: 'Side Plank', category: 'mat', diagramId: 'side-plank', targetSets: 3, targetReps: 20, restSeconds: 45, unit: 'seconds' },
  { id: 'side-leg-raise', name: 'Side Leg Raise', category: 'mat', diagramId: 'side-leg-raise', targetSets: 3, targetReps: 15, restSeconds: 40 },
  { id: 'pilates-roll-up', name: 'Pilates Roll-up', category: 'mat', diagramId: 'pilates-roll-up', targetSets: 3, targetReps: 10, restSeconds: 45 },
  { id: 'brisk-walk', name: 'Brisk Walk', category: 'mat', diagramId: 'brisk-walk', targetSets: 1, targetReps: 300, restSeconds: 0, unit: 'seconds' },
  { id: 'dynamic-stretch', name: 'Dynamic Stretching', category: 'mat', diagramId: 'dynamic-stretch', targetSets: 1, targetReps: 60, restSeconds: 30, unit: 'seconds' },
  { id: 'dance-cardio', name: 'Dance Cardio', category: 'mat', diagramId: 'dance-cardio', targetSets: 1, targetReps: 180, restSeconds: 30, unit: 'seconds' },
  { id: 'stretch-flow', name: 'Stretch Flow', category: 'mat', diagramId: 'stretch-flow', targetSets: 1, targetReps: 120, restSeconds: 0, unit: 'seconds' },
  { id: 'jump-rope', name: 'Jump Rope', category: 'mat', diagramId: 'jump-rope', targetSets: 3, targetReps: 45, restSeconds: 40, unit: 'seconds' },
]

const libraryById = new Map(EXERCISE_LIBRARY.map((e) => [e.id, e]))

export function getLibraryExercise(id: string | undefined): LibraryExercise | undefined {
  if (!id) return undefined
  return libraryById.get(id)
}

export function getDiagramId(libraryId: string | undefined, name: string): string | undefined {
  if (libraryId) {
    return libraryById.get(libraryId)?.diagramId
  }
  const match = EXERCISE_LIBRARY.find((e) => e.name.toLowerCase() === name.toLowerCase())
  return match?.diagramId
}

export const CATEGORIES_ORDER: ExerciseCategory[] = [
  'barbell',
  'dumbbell',
  'machine',
  'cable',
  'bodyweight',
  'mat',
]

export function exercisesByCategory(): Record<ExerciseCategory, LibraryExercise[]> {
  const grouped = {} as Record<ExerciseCategory, LibraryExercise[]>
  for (const cat of CATEGORIES_ORDER) {
    grouped[cat] = EXERCISE_LIBRARY.filter((e) => e.category === cat)
  }
  return grouped
}
