import type { RoutineTemplate } from './routineTemplates'

type KPopTemplate = RoutineTemplate & { group: 'kpop' }

function kpop(
  id: string,
  name: string,
  description: string,
  exercises: RoutineTemplate['exercises'],
): KPopTemplate {
  return { id, name, description, group: 'kpop', exercises }
}

// ─── Jungkook ───────────────────────────────────────────────────────────────

export const JUNGKOOK_TEMPLATES: KPopTemplate[] = [
  kpop(
    'jungkook-beginner',
    'Jungkook — Beginner',
    '3 rounds · 60s rest between rounds',
    [
      { libraryId: 'brisk-walk', targetSets: 1, targetReps: 300, restSeconds: 0 },
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 60, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', targetSets: 3, targetReps: 20, restSeconds: 60 },
      { libraryId: 'crunch', targetSets: 3, targetReps: 15, restSeconds: 45 },
      { libraryId: 'walking-lunge', name: 'Lunges (per leg)', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { libraryId: 'plank', targetSets: 3, targetReps: 30, restSeconds: 60 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 3, targetReps: 20, restSeconds: 45 },
      { libraryId: 'burpee', targetSets: 3, targetReps: 5, restSeconds: 60 },
    ],
  ),
  kpop(
    'jungkook-intermediate',
    'Jungkook — Intermediate',
    '2 rounds · higher volume',
    [
      { libraryId: 'brisk-walk', targetSets: 1, targetReps: 300, restSeconds: 0 },
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 90, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', targetSets: 2, targetReps: 50, restSeconds: 60 },
      { libraryId: 'bicycle-crunch', name: 'Ab Reps', targetSets: 2, targetReps: 20, restSeconds: 45 },
      { libraryId: 'walking-lunge', targetSets: 2, targetReps: 20, restSeconds: 60 },
      { libraryId: 'plank', targetSets: 2, targetReps: 45, restSeconds: 60 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 2, targetReps: 30, restSeconds: 45 },
      { libraryId: 'burpee', targetSets: 2, targetReps: 10, restSeconds: 60 },
    ],
  ),
  kpop(
    'jungkook-advanced',
    'Jungkook Challenge',
    'Advanced · single-round challenge',
    [
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 120, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', name: 'Squats', targetSets: 1, targetReps: 100, restSeconds: 90 },
      { libraryId: 'bicycle-crunch', name: 'Ab Reps', targetSets: 1, targetReps: 30, restSeconds: 60 },
      { libraryId: 'walking-lunge', name: 'Lunges', targetSets: 2, targetReps: 20, restSeconds: 60 },
      { libraryId: 'plank', name: 'Plank', targetSets: 1, targetReps: 60, restSeconds: 60 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 2, targetReps: 60, restSeconds: 45 },
      { libraryId: 'burpee', targetSets: 1, targetReps: 15, restSeconds: 60 },
    ],
  ),
]

// ─── Lisa ───────────────────────────────────────────────────────────────────

export const LISA_TEMPLATES: KPopTemplate[] = [
  kpop(
    'lisa-beginner',
    'Lisa — Beginner',
    'Dance & core · 2 rounds',
    [
      { libraryId: 'dance-cardio', name: 'Dance Cardio Warm-up', targetSets: 1, targetReps: 180, restSeconds: 30 },
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 60, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', targetSets: 2, targetReps: 12, restSeconds: 45 },
      { libraryId: 'glute-bridge', targetSets: 2, targetReps: 12, restSeconds: 45 },
      { libraryId: 'bicycle-crunch', targetSets: 2, targetReps: 15, restSeconds: 40 },
      { libraryId: 'mountain-climber', targetSets: 2, targetReps: 15, restSeconds: 40 },
      { libraryId: 'side-leg-raise', name: 'Side Leg Raises (each side)', targetSets: 2, targetReps: 12, restSeconds: 40 },
      { libraryId: 'plank', targetSets: 2, targetReps: 20, restSeconds: 45 },
      { libraryId: 'dance-cardio', name: 'Dance Cardio Finisher', targetSets: 1, targetReps: 180, restSeconds: 0 },
    ],
  ),
  kpop(
    'lisa-intermediate',
    'Lisa — Dance & Core',
    'Dancer-focused · 3 rounds',
    [
      { libraryId: 'dance-cardio', name: 'Dance Cardio Warm-up', targetSets: 1, targetReps: 180, restSeconds: 30 },
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 90, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', targetSets: 3, targetReps: 15, restSeconds: 45 },
      { libraryId: 'glute-bridge', targetSets: 3, targetReps: 15, restSeconds: 45 },
      { libraryId: 'bicycle-crunch', targetSets: 3, targetReps: 20, restSeconds: 40 },
      { libraryId: 'mountain-climber', targetSets: 3, targetReps: 20, restSeconds: 40 },
      { libraryId: 'side-leg-raise', name: 'Side Leg Raises (each side)', targetSets: 3, targetReps: 15, restSeconds: 40 },
      { libraryId: 'plank', targetSets: 3, targetReps: 30, restSeconds: 45 },
      { libraryId: 'dance-cardio', name: 'Dance Cardio Finisher', targetSets: 1, targetReps: 300, restSeconds: 0 },
    ],
  ),
  kpop(
    'lisa-advanced',
    'Lisa — Advanced',
    'Dance & core · 4 rounds + long finisher',
    [
      { libraryId: 'dance-cardio', name: 'Dance Cardio Warm-up', targetSets: 1, targetReps: 300, restSeconds: 30 },
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 120, restSeconds: 30 },
      { libraryId: 'bodyweight-squat', targetSets: 4, targetReps: 20, restSeconds: 40 },
      { libraryId: 'glute-bridge', targetSets: 4, targetReps: 20, restSeconds: 40 },
      { libraryId: 'bicycle-crunch', targetSets: 4, targetReps: 25, restSeconds: 35 },
      { libraryId: 'mountain-climber', targetSets: 4, targetReps: 25, restSeconds: 35 },
      { libraryId: 'side-leg-raise', name: 'Side Leg Raises (each side)', targetSets: 4, targetReps: 20, restSeconds: 35 },
      { libraryId: 'plank', targetSets: 4, targetReps: 45, restSeconds: 40 },
      { libraryId: 'dance-cardio', name: 'Dance Cardio Finisher', targetSets: 1, targetReps: 300, restSeconds: 0 },
    ],
  ),
]

// ─── RM ─────────────────────────────────────────────────────────────────────

export const RM_TEMPLATES: KPopTemplate[] = [
  kpop(
    'rm-beginner',
    'RM — Beginner Strength',
    'Light weights · 2 sets × 10 reps',
    [
      { libraryId: 'goblet-squat', targetSets: 2, targetReps: 10, restSeconds: 75 },
      { libraryId: 'dumbbell-bench-press', targetSets: 2, targetReps: 10, restSeconds: 75 },
      { libraryId: 'dumbbell-row', targetSets: 2, targetReps: 10, restSeconds: 75 },
      { libraryId: 'dumbbell-shoulder-press', targetSets: 2, targetReps: 10, restSeconds: 75 },
      { libraryId: 'farmer-carry', targetSets: 2, targetReps: 30, restSeconds: 60 },
    ],
  ),
  kpop(
    'rm-intermediate',
    'RM — Strength Builder',
    'Gym focus · 3 sets × 8–12 reps',
    [
      { libraryId: 'barbell-squat', targetSets: 3, targetReps: 10, restSeconds: 90 },
      { libraryId: 'barbell-bench-press', targetSets: 3, targetReps: 10, restSeconds: 90 },
      { libraryId: 'dumbbell-row', targetSets: 3, targetReps: 10, restSeconds: 75 },
      { libraryId: 'overhead-press', targetSets: 3, targetReps: 10, restSeconds: 90 },
      { libraryId: 'farmer-carry', targetSets: 3, targetReps: 45, restSeconds: 60 },
    ],
  ),
  kpop(
    'rm-advanced',
    'RM — Advanced Strength',
    'Heavy compounds · 4 sets × 6–8 reps',
    [
      { libraryId: 'barbell-squat', targetSets: 4, targetReps: 6, restSeconds: 120 },
      { libraryId: 'barbell-bench-press', targetSets: 4, targetReps: 6, restSeconds: 120 },
      { libraryId: 'barbell-row', targetSets: 4, targetReps: 8, restSeconds: 90 },
      { libraryId: 'overhead-press', targetSets: 4, targetReps: 6, restSeconds: 120 },
      { libraryId: 'farmer-carry', targetSets: 4, targetReps: 60, restSeconds: 60 },
    ],
  ),
]

// ─── Jimin ──────────────────────────────────────────────────────────────────

export const JIMIN_TEMPLATES: KPopTemplate[] = [
  kpop(
    'jimin-beginner',
    'Jimin — Beginner Core',
    'Core & mobility · 2 rounds',
    [
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 60, restSeconds: 30 },
      { libraryId: 'russian-twist', targetSets: 2, targetReps: 15, restSeconds: 40 },
      { libraryId: 'leg-raise', targetSets: 2, targetReps: 10, restSeconds: 45 },
      { libraryId: 'plank', targetSets: 2, targetReps: 20, restSeconds: 45 },
      { libraryId: 'walking-lunge', targetSets: 2, targetReps: 10, restSeconds: 45 },
      { libraryId: 'stretch-flow', targetSets: 1, targetReps: 90, restSeconds: 0 },
    ],
  ),
  kpop(
    'jimin-intermediate',
    'Jimin — Core & Mobility',
    'Core stability · 3 rounds',
    [
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 90, restSeconds: 30 },
      { libraryId: 'russian-twist', targetSets: 3, targetReps: 20, restSeconds: 40 },
      { libraryId: 'leg-raise', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { libraryId: 'plank', targetSets: 3, targetReps: 30, restSeconds: 45 },
      { libraryId: 'walking-lunge', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { libraryId: 'stretch-flow', targetSets: 1, targetReps: 120, restSeconds: 0 },
    ],
  ),
  kpop(
    'jimin-advanced',
    'Jimin — Advanced Core',
    'Core stability · 4 rounds',
    [
      { libraryId: 'dynamic-stretch', targetSets: 1, targetReps: 120, restSeconds: 30 },
      { libraryId: 'russian-twist', targetSets: 4, targetReps: 25, restSeconds: 35 },
      { libraryId: 'leg-raise', targetSets: 4, targetReps: 15, restSeconds: 40 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 4, targetReps: 30, restSeconds: 40 },
      { libraryId: 'walking-lunge', targetSets: 4, targetReps: 15, restSeconds: 40 },
      { libraryId: 'stretch-flow', targetSets: 1, targetReps: 180, restSeconds: 0 },
    ],
  ),
]

// ─── Jennie ─────────────────────────────────────────────────────────────────

export const JENNIE_TEMPLATES: KPopTemplate[] = [
  kpop(
    'jennie-beginner',
    'Jennie — Beginner Pilates',
    'Pilates-inspired · 2 rounds',
    [
      { libraryId: 'dead-bug', targetSets: 2, targetReps: 8, restSeconds: 40 },
      { libraryId: 'bird-dog', targetSets: 2, targetReps: 8, restSeconds: 40 },
      { libraryId: 'glute-bridge', targetSets: 2, targetReps: 12, restSeconds: 40 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 2, targetReps: 15, restSeconds: 40 },
      { libraryId: 'pilates-roll-up', targetSets: 2, targetReps: 8, restSeconds: 45 },
    ],
  ),
  kpop(
    'jennie-intermediate',
    'Jennie — Pilates Flow',
    'Pilates-inspired · 3 rounds',
    [
      { libraryId: 'dead-bug', targetSets: 3, targetReps: 10, restSeconds: 40 },
      { libraryId: 'bird-dog', targetSets: 3, targetReps: 10, restSeconds: 40 },
      { libraryId: 'glute-bridge', targetSets: 3, targetReps: 15, restSeconds: 40 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 3, targetReps: 20, restSeconds: 40 },
      { libraryId: 'pilates-roll-up', targetSets: 3, targetReps: 10, restSeconds: 45 },
    ],
  ),
  kpop(
    'jennie-advanced',
    'Jennie — Advanced Pilates',
    'Pilates flow · 4 rounds',
    [
      { libraryId: 'dead-bug', targetSets: 4, targetReps: 12, restSeconds: 35 },
      { libraryId: 'bird-dog', targetSets: 4, targetReps: 12, restSeconds: 35 },
      { libraryId: 'glute-bridge', targetSets: 4, targetReps: 20, restSeconds: 35 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 4, targetReps: 30, restSeconds: 35 },
      { libraryId: 'pilates-roll-up', targetSets: 4, targetReps: 12, restSeconds: 40 },
    ],
  ),
]

// ─── Rosé ───────────────────────────────────────────────────────────────────

export const ROSE_TEMPLATES: KPopTemplate[] = [
  kpop(
    'rose-beginner',
    'Rosé — Beginner Endurance',
    'Cardio & stamina · 2 rounds',
    [
      { libraryId: 'brisk-walk', targetSets: 1, targetReps: 180, restSeconds: 30 },
      { libraryId: 'walking-lunge', targetSets: 2, targetReps: 10, restSeconds: 45 },
      { libraryId: 'step-up', targetSets: 2, targetReps: 10, restSeconds: 45 },
      { libraryId: 'jump-rope', targetSets: 2, targetReps: 30, restSeconds: 45 },
      { libraryId: 'bodyweight-squat', targetSets: 2, targetReps: 15, restSeconds: 45 },
      { libraryId: 'plank', targetSets: 2, targetReps: 20, restSeconds: 45 },
    ],
  ),
  kpop(
    'rose-intermediate',
    'Rosé — Endurance',
    'Cardio & stamina · 3 rounds',
    [
      { libraryId: 'brisk-walk', targetSets: 1, targetReps: 300, restSeconds: 30 },
      { libraryId: 'walking-lunge', targetSets: 3, targetReps: 12, restSeconds: 40 },
      { libraryId: 'step-up', targetSets: 3, targetReps: 12, restSeconds: 40 },
      { libraryId: 'jump-rope', targetSets: 3, targetReps: 45, restSeconds: 40 },
      { libraryId: 'bodyweight-squat', targetSets: 3, targetReps: 20, restSeconds: 40 },
      { libraryId: 'plank', targetSets: 3, targetReps: 30, restSeconds: 40 },
    ],
  ),
  kpop(
    'rose-advanced',
    'Rosé — Advanced Endurance',
    'High stamina · 4 rounds + plank variations',
    [
      { libraryId: 'brisk-walk', targetSets: 1, targetReps: 300, restSeconds: 30 },
      { libraryId: 'walking-lunge', targetSets: 4, targetReps: 15, restSeconds: 35 },
      { libraryId: 'step-up', targetSets: 4, targetReps: 15, restSeconds: 35 },
      { libraryId: 'jump-rope', targetSets: 4, targetReps: 60, restSeconds: 35 },
      { libraryId: 'bodyweight-squat', targetSets: 4, targetReps: 25, restSeconds: 35 },
      { libraryId: 'plank', targetSets: 4, targetReps: 45, restSeconds: 35 },
      { libraryId: 'side-plank', name: 'Side Plank (each side)', targetSets: 4, targetReps: 30, restSeconds: 35 },
    ],
  ),
]

export const KPOP_TEMPLATE_SUBGROUPS = [
  { id: 'jungkook', label: 'Jungkook', templates: JUNGKOOK_TEMPLATES },
  { id: 'lisa', label: 'Lisa', templates: LISA_TEMPLATES },
  { id: 'rm', label: 'BTS RM', templates: RM_TEMPLATES },
  { id: 'jimin', label: 'BTS Jimin', templates: JIMIN_TEMPLATES },
  { id: 'jennie', label: 'BLACKPINK Jennie', templates: JENNIE_TEMPLATES },
  { id: 'rose', label: 'BLACKPINK Rosé', templates: ROSE_TEMPLATES },
] as const

export const KPOP_TEMPLATES: KPopTemplate[] = KPOP_TEMPLATE_SUBGROUPS.flatMap((g) => g.templates)
