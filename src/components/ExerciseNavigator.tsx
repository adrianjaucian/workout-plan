import type { Exercise } from '../types'

interface ExerciseNavigatorProps {
  exercises: Exercise[]
  currentIndex: number
  completedExerciseIds: Set<string>
  skippedExerciseIds: Set<string>
  partialExerciseIds: Set<string>
  onSelect: (index: number) => void
}

export function ExerciseNavigator({
  exercises,
  currentIndex,
  completedExerciseIds,
  skippedExerciseIds,
  partialExerciseIds,
  onSelect,
}: ExerciseNavigatorProps) {
  return (
    <nav className="flex w-[4.5rem] shrink-0 flex-col" aria-label="Exercise list">
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        Exercises
      </p>
      <div className="flex max-h-[calc(100dvh-10rem)] flex-col gap-1.5 overflow-y-auto pr-0.5">
        {exercises.map((ex, index) => {
          const isCurrent = index === currentIndex
          const isDone = completedExerciseIds.has(ex.id)
          const isSkipped = skippedExerciseIds.has(ex.id) && !isDone
          const isPartial = partialExerciseIds.has(ex.id) && !isDone && !isSkipped

          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => onSelect(index)}
              title={ex.name}
              className={[
                'rounded-lg border px-1.5 py-2 text-left text-[10px] leading-tight transition-colors',
                isCurrent
                  ? 'border-accent bg-accent-muted font-semibold text-accent'
                  : isDone
                    ? 'border-border bg-surface-overlay text-text-muted'
                    : isSkipped
                      ? 'border-warning/40 bg-warning/10 text-warning'
                      : isPartial
                        ? 'border-border bg-surface-overlay text-text'
                        : 'border-border bg-surface-raised text-text hover:border-accent/40 hover:bg-surface-overlay',
              ].join(' ')}
            >
              <span className="line-clamp-4 break-words">{ex.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
