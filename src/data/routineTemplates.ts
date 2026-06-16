import type { Exercise } from '../types'
import { getLibraryExercise } from '../data/exerciseLibrary'
import { categoryUsesWeight } from '../lib/equipment'
import { DEFAULT_REST_SECONDS } from '../lib/constants'
import { generateId } from '../lib/storage'
import { KPOP_TEMPLATES } from './kpopTemplates'

export interface TemplateExercise {
  libraryId: string
  name?: string
  targetSets?: number
  targetReps?: number
  restSeconds?: number
}

export type TemplateGroup = 'ppl' | 'upper-lower' | 'full-body' | 'beginner' | 'machines' | 'kpop'

export interface RoutineTemplate {
  id: string
  name: string
  description: string
  group: TemplateGroup
  exercises: TemplateExercise[]
}

const STARTER_TEMPLATES: RoutineTemplate[] = [
  {
    id: 'push-day',
    name: 'Push Day',
    description: 'Chest, shoulders & triceps',
    group: 'ppl',
    exercises: [
      { libraryId: 'barbell-bench-press' },
      { libraryId: 'overhead-press' },
      { libraryId: 'dumbbell-shoulder-press' },
      { libraryId: 'cable-fly' },
      { libraryId: 'tricep-pushdown' },
    ],
  },
  {
    id: 'pull-day',
    name: 'Pull Day',
    description: 'Back & biceps',
    group: 'ppl',
    exercises: [
      { libraryId: 'barbell-deadlift' },
      { libraryId: 'barbell-row' },
      { libraryId: 'lat-pulldown' },
      { libraryId: 'face-pull' },
      { libraryId: 'dumbbell-curl' },
    ],
  },
  {
    id: 'leg-day',
    name: 'Leg Day',
    description: 'Quads, hamstrings & glutes',
    group: 'ppl',
    exercises: [
      { libraryId: 'barbell-squat' },
      { libraryId: 'romanian-deadlift' },
      { libraryId: 'leg-press' },
      { libraryId: 'leg-curl' },
      { libraryId: 'glute-bridge' },
    ],
  },
  {
    id: 'upper-body',
    name: 'Upper Body',
    description: 'Full upper-body session',
    group: 'upper-lower',
    exercises: [
      { libraryId: 'barbell-bench-press' },
      { libraryId: 'barbell-row' },
      { libraryId: 'overhead-press' },
      { libraryId: 'lat-pulldown' },
      { libraryId: 'tricep-pushdown' },
      { libraryId: 'dumbbell-curl' },
    ],
  },
  {
    id: 'lower-body',
    name: 'Lower Body',
    description: 'Full lower-body session',
    group: 'upper-lower',
    exercises: [
      { libraryId: 'barbell-squat' },
      { libraryId: 'romanian-deadlift' },
      { libraryId: 'leg-press' },
      { libraryId: 'leg-curl' },
      { libraryId: 'goblet-squat' },
    ],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Balanced whole-body workout',
    group: 'full-body',
    exercises: [
      { libraryId: 'barbell-squat' },
      { libraryId: 'barbell-bench-press' },
      { libraryId: 'barbell-row' },
      { libraryId: 'overhead-press' },
      { libraryId: 'plank' },
    ],
  },
  {
    id: 'beginner-strength',
    name: 'Beginner Strength',
    description: 'Simple compound movements to start',
    group: 'beginner',
    exercises: [
      { libraryId: 'goblet-squat' },
      { libraryId: 'dumbbell-bench-press' },
      { libraryId: 'seated-row' },
      { libraryId: 'dumbbell-shoulder-press' },
      { libraryId: 'glute-bridge' },
    ],
  },
  {
    id: 'machine-upper',
    name: 'Machine Upper Body',
    description: 'Chest press, pulldown & seated row',
    group: 'machines',
    exercises: [
      { libraryId: 'chest-press-machine' },
      { libraryId: 'lat-pulldown' },
      { libraryId: 'seated-row' },
      { libraryId: 'tricep-pushdown' },
    ],
  },
  {
    id: 'machine-lower',
    name: 'Machine Lower Body',
    description: 'Smith squat, leg press & leg curl',
    group: 'machines',
    exercises: [
      { libraryId: 'smith-squat' },
      { libraryId: 'leg-press' },
      { libraryId: 'leg-curl' },
    ],
  },
  {
    id: 'machine-full-body',
    name: 'Machine Full Body',
    description: 'Full workout using gym machines only',
    group: 'machines',
    exercises: [
      { libraryId: 'chest-press-machine' },
      { libraryId: 'lat-pulldown' },
      { libraryId: 'leg-press' },
      { libraryId: 'seated-row' },
      { libraryId: 'leg-curl' },
    ],
  },
  {
    id: 'machine-beginner',
    name: 'Machine Beginner',
    description: 'Easy intro — 3 staple machines',
    group: 'machines',
    exercises: [
      { libraryId: 'chest-press-machine' },
      { libraryId: 'lat-pulldown' },
      { libraryId: 'leg-press' },
    ],
  },
]

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [...STARTER_TEMPLATES, ...KPOP_TEMPLATES]

export const TEMPLATE_GROUPS: { id: Exclude<TemplateGroup, 'kpop'>; label: string }[] = [
  { id: 'machines', label: 'Gym Machines' },
  { id: 'ppl', label: 'Push / Pull / Legs' },
  { id: 'upper-lower', label: 'Upper / Lower' },
  { id: 'full-body', label: 'Full Body' },
  { id: 'beginner', label: 'Beginner Strength' },
]

export function exercisesFromTemplate(template: RoutineTemplate): Exercise[] {
  return template.exercises.map((item) => {
    const lib = getLibraryExercise(item.libraryId)
    if (!lib) {
      return {
        id: generateId(),
        name: item.name ?? item.libraryId,
        targetSets: item.targetSets ?? 3,
        targetReps: item.targetReps ?? 10,
        restSeconds: item.restSeconds ?? DEFAULT_REST_SECONDS,
        trackingMode: 'reps',
      }
    }

    const trackingMode = lib.unit === 'seconds' ? 'timer' : 'reps'

    return {
      id: generateId(),
      libraryId: lib.id,
      name: item.name ?? lib.name,
      targetSets: item.targetSets ?? lib.targetSets,
      targetReps: item.targetReps ?? lib.targetReps,
      restSeconds: item.restSeconds ?? lib.restSeconds,
      trackWeight: categoryUsesWeight(lib.category),
      trackingMode,
    }
  })
}
