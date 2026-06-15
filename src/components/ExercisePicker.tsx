import { useEffect, useRef, useState } from 'react'
import {
  CATEGORIES_ORDER,
  CATEGORY_LABELS,
  EXERCISE_LIBRARY,
  exercisesByCategory,
  type LibraryExercise,
} from '../data/exerciseLibrary'
import { ExerciseDiagram } from './ExerciseDiagram'
import { ExpandableDiagram } from './ExpandableDiagram'

interface ExercisePickerProps {
  value?: string
  onSelect: (exercise: LibraryExercise | null) => void
  onCustomName?: (name: string) => void
  customName?: string
  minimizeDiagram?: boolean
}

export function ExercisePicker({
  value,
  onSelect,
  onCustomName,
  customName = '',
  minimizeDiagram = false,
}: ExercisePickerProps) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const grouped = exercisesByCategory()

  const selected = value ? EXERCISE_LIBRARY.find((e) => e.id === value) : undefined

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filterLower = filter.toLowerCase()
  const filteredCategories = CATEGORIES_ORDER.map((cat) => ({
    category: cat,
    exercises: grouped[cat].filter(
      (e) =>
        !filterLower ||
        e.name.toLowerCase().includes(filterLower) ||
        CATEGORY_LABELS[cat].toLowerCase().includes(filterLower),
    ),
  })).filter((g) => g.exercises.length > 0)

  const handleSelect = (exercise: LibraryExercise) => {
    onSelect(exercise)
    setOpen(false)
    setFilter('')
  }

  return (
    <div ref={containerRef} className="space-y-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-overlay px-3 py-2.5 text-left text-sm transition-colors hover:border-accent/50"
        >
          <span className={selected ? 'text-text' : 'text-text-muted'}>
            {selected ? selected.name : 'Choose from exercise library…'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 right-0 z-20 mt-1 max-h-72 overflow-hidden rounded-xl border border-border bg-surface-raised shadow-lg">
            <div className="border-b border-border p-2">
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search exercises…"
                className="w-full rounded-lg border border-border bg-surface-overlay px-3 py-2 text-sm text-text outline-none placeholder:text-text-muted/50 focus:border-accent"
                autoFocus
              />
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filteredCategories.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-text-muted">No exercises found</p>
              ) : (
                filteredCategories.map(({ category, exercises }) => (
                  <div key={category}>
                    <p className="sticky top-0 bg-surface-raised px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      {CATEGORY_LABELS[category]}
                    </p>
                    {exercises.map((exercise) => (
                      <button
                        key={exercise.id}
                        type="button"
                        onClick={() => handleSelect(exercise)}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-overlay ${
                          value === exercise.id ? 'bg-accent-muted text-accent' : 'text-text'
                        }`}
                      >
                        <span className="h-8 w-11 shrink-0 overflow-hidden rounded-md border border-border">
                          <ExerciseDiagram diagramId={exercise.diagramId} compact />
                        </span>
                        <span className="flex-1">{exercise.name}</span>
                        <span className="shrink-0 text-xs text-text-muted">
                          {exercise.targetSets}×{exercise.targetReps}
                          {exercise.unit === 'seconds' ? 's' : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1 block text-xs text-text-muted">Or enter custom name</label>
        <input
          type="text"
          value={customName}
          onChange={(e) => {
            onCustomName?.(e.target.value)
            if (e.target.value && value) onSelect(null)
          }}
          placeholder="Custom exercise name"
          className="w-full rounded-xl border border-border bg-surface-overlay px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50 outline-none focus:border-accent"
        />
      </div>

      {selected && minimizeDiagram && (
        <ExpandableDiagram diagramId={selected.diagramId} label={selected.name} standalone />
      )}

      {selected && !minimizeDiagram && (
        <ExerciseDiagram diagramId={selected.diagramId} label={selected.name} />
      )}
    </div>
  )
}
