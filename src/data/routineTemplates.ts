import type { Exercise } from '../types'
import { getLibraryExercise } from '../data/exerciseLibrary'
import { categoryUsesWeight } from '../lib/equipment'
import { generateId } from '../lib/storage'

export interface RoutineTemplate {
  id: string
  name: string
  description: string
  group: 'ppl' | 'upper-lower' | 'full-body' | 'beginner'
  libraryExerciseIds: string[]
}

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: 'push-day',
    name: 'Push Day',
    description: 'Chest, shoulders & triceps',
    group: 'ppl',
    libraryExerciseIds: [
      'barbell-bench-press',
      'overhead-press',
      'dumbbell-shoulder-press',
      'cable-fly',
      'tricep-pushdown',
    ],
  },
  {
    id: 'pull-day',
    name: 'Pull Day',
    description: 'Back & biceps',
    group: 'ppl',
    libraryExerciseIds: [
      'barbell-deadlift',
      'barbell-row',
      'lat-pulldown',
      'face-pull',
      'dumbbell-curl',
    ],
  },
  {
    id: 'leg-day',
    name: 'Leg Day',
    description: 'Quads, hamstrings & glutes',
    group: 'ppl',
    libraryExerciseIds: [
      'barbell-squat',
      'romanian-deadlift',
      'leg-press',
      'leg-curl',
      'glute-bridge',
    ],
  },
  {
    id: 'upper-body',
    name: 'Upper Body',
    description: 'Full upper-body session',
    group: 'upper-lower',
    libraryExerciseIds: [
      'barbell-bench-press',
      'barbell-row',
      'overhead-press',
      'lat-pulldown',
      'tricep-pushdown',
      'dumbbell-curl',
    ],
  },
  {
    id: 'lower-body',
    name: 'Lower Body',
    description: 'Full lower-body session',
    group: 'upper-lower',
    libraryExerciseIds: [
      'barbell-squat',
      'romanian-deadlift',
      'leg-press',
      'leg-curl',
      'goblet-squat',
    ],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Balanced whole-body workout',
    group: 'full-body',
    libraryExerciseIds: [
      'barbell-squat',
      'barbell-bench-press',
      'barbell-row',
      'overhead-press',
      'plank',
    ],
  },
  {
    id: 'beginner-strength',
    name: 'Beginner Strength',
    description: 'Simple compound movements to start',
    group: 'beginner',
    libraryExerciseIds: [
      'goblet-squat',
      'dumbbell-bench-press',
      'seated-row',
      'dumbbell-shoulder-press',
      'glute-bridge',
    ],
  },
]

export const TEMPLATE_GROUPS: { id: RoutineTemplate['group']; label: string }[] = [
  { id: 'ppl', label: 'Push / Pull / Legs' },
  { id: 'upper-lower', label: 'Upper / Lower' },
  { id: 'full-body', label: 'Full Body' },
  { id: 'beginner', label: 'Beginner Strength' },
]

export function exercisesFromTemplate(template: RoutineTemplate): Exercise[] {
  return template.libraryExerciseIds.map((libId) => {
    const lib = getLibraryExercise(libId)
    if (!lib) {
      return {
        id: generateId(),
        name: libId,
        targetSets: 3,
        targetReps: 10,
        restSeconds: 60,
      }
    }

    return {
      id: generateId(),
      libraryId: lib.id,
      name: lib.name,
      targetSets: lib.targetSets,
      targetReps: lib.targetReps,
      restSeconds: lib.restSeconds,
      trackWeight: categoryUsesWeight(lib.category),
      trackingMode: lib.unit === 'seconds' ? 'timer' : 'reps',
    }
  })
}
