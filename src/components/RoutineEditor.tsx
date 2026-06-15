import { useState } from 'react'
import type { Exercise, Routine } from '../types'
import { getDiagramId, getLibraryExercise, type LibraryExercise } from '../data/exerciseLibrary'
import { categoryUsesWeight, shouldTrackWeight } from '../lib/equipment'
import { targetDescription, usesTimer } from '../lib/exerciseTracking'
import { generateId } from '../lib/storage'
import { Button } from './Button'
import { ExerciseDiagram } from './ExerciseDiagram'
import { ExercisePicker } from './ExercisePicker'
import { Layout } from './Layout'

interface RoutineEditorProps {
  routine: Routine | null
  onSave: (name: string, exercises: Exercise[]) => void
  onBack: () => void
}

function emptyExercise(): Exercise {
  return {
    id: generateId(),
    name: '',
    targetSets: 3,
    targetReps: 10,
    restSeconds: 60,
  }
}

function DragHandle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-muted">
      <circle cx="9" cy="7" r="1.5" />
      <circle cx="15" cy="7" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="17" r="1.5" />
      <circle cx="15" cy="17" r="1.5" />
    </svg>
  )
}

export function RoutineEditor({ routine, onSave, onBack }: RoutineEditorProps) {
  const initialExercises = routine?.exercises.length ? routine.exercises : [emptyExercise()]
  const [name, setName] = useState(routine?.name ?? '')
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    routine?.exercises.length ? null : initialExercises[0]?.id ?? null,
  )
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const updateExercise = (
    id: string,
    field: keyof Exercise,
    value: string | number | boolean | undefined,
  ) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    )
  }

  const applyLibraryExercise = (id: string, lib: LibraryExercise | null) => {
    setExercises((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e
        if (!lib) {
          return { ...e, libraryId: undefined }
        }
        return {
          ...e,
          libraryId: lib.id,
          name: lib.name,
          targetSets: lib.targetSets,
          targetReps: lib.targetReps,
          restSeconds: lib.restSeconds,
          trackWeight: categoryUsesWeight(lib.category),
          trackingMode: lib.unit === 'seconds' ? 'timer' : 'reps',
        }
      }),
    )
    if (lib) setExpandedExerciseId(null)
  }

  const addExercise = () => {
    const newExercise = emptyExercise()
    setExercises((prev) => [newExercise, ...prev])
    setExpandedExerciseId(newExercise.id)
  }

  const removeExercise = (id: string) => {
    setExercises((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev))
    if (expandedExerciseId === id) setExpandedExerciseId(null)
  }

  const reorderExercises = (from: number, to: number) => {
    if (from === to) return
    setExercises((prev) => {
      const copy = [...prev]
      const [item] = copy.splice(from, 1)
      copy.splice(to, 0, item)
      return copy
    })
  }

  const handleSave = () => {
    const trimmedName = name.trim() || 'Untitled Routine'
    const validExercises = exercises
      .map((e) => ({ ...e, name: e.name.trim() }))
      .filter((e) => e.name.length > 0)
    onSave(trimmedName, validExercises)
  }

  const isConfigured = (exercise: Exercise) => exercise.name.trim().length > 0

  return (
    <Layout
      title={routine ? 'Edit Routine' : 'New Routine'}
      onBack={onBack}
      action={
        <Button variant="ghost" className="!px-3 !py-2" onClick={handleSave}>
          Save
        </Button>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-muted">Routine name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Upper Body, Morning Mat Flow"
            className="w-full rounded-xl border border-border bg-surface-overlay px-4 py-3 text-text placeholder:text-text-muted/50 outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-text-muted">Exercises</h2>
            <button
              type="button"
              onClick={addExercise}
              className="text-sm font-medium text-accent hover:text-accent-dim"
            >
              + Add exercise
            </button>
          </div>

          {exercises.map((exercise, index) => {
            const lib = getLibraryExercise(exercise.libraryId)
            const displayName = lib && exercise.name === lib.name ? '' : exercise.name
            const expanded = expandedExerciseId === exercise.id
            const configured = isConfigured(exercise)
            const diagramId = getDiagramId(exercise.libraryId, exercise.name)
            const isDragging = dragIndex === index
            const isDragOver = dragOverIndex === index && dragIndex !== index

            if (configured && !expanded) {
              return (
                <div
                  key={exercise.id}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOverIndex(index)
                  }}
                  onDragLeave={() => setDragOverIndex(null)}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (dragIndex !== null) reorderExercises(dragIndex, index)
                    setDragIndex(null)
                    setDragOverIndex(null)
                  }}
                  className={[
                    'flex items-center gap-2 rounded-xl border bg-surface-raised p-2.5 transition-colors',
                    isDragging ? 'opacity-40' : '',
                    isDragOver ? 'border-accent bg-accent-muted/30' : 'border-border',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    draggable
                    data-drag-handle
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => {
                      setDragIndex(null)
                      setDragOverIndex(null)
                    }}
                    className="cursor-grab touch-none px-0.5 active:cursor-grabbing"
                    aria-label="Drag to reorder"
                  >
                    <DragHandle />
                  </button>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-overlay text-xs font-bold text-text-muted">
                    {index + 1}
                  </span>
                  {diagramId && (
                    <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border">
                      <ExerciseDiagram diagramId={diagramId} compact />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedExerciseId(exercise.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm font-medium text-text">{exercise.name}</p>
                    <p className="text-xs text-text-muted">
                      {exercise.targetSets} sets · {targetDescription(exercise)} · {exercise.restSeconds}s rest
                    </p>
                  </button>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      className="shrink-0 rounded-lg p-1.5 text-text-muted hover:bg-surface-overlay hover:text-danger"
                      aria-label="Remove exercise"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )
            }

            return (
              <div
                key={exercise.id}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOverIndex(index)
                }}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  if (dragIndex !== null) reorderExercises(dragIndex, index)
                  setDragIndex(null)
                  setDragOverIndex(null)
                }}
                className={[
                  'rounded-2xl border bg-surface-raised p-4 transition-colors',
                  isDragging ? 'opacity-40' : '',
                  isDragOver ? 'border-accent' : 'border-border',
                ].join(' ')}
              >
                <div className="mb-3 flex items-center gap-2">
                  <button
                    type="button"
                    draggable
                    data-drag-handle
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => {
                      setDragIndex(null)
                      setDragOverIndex(null)
                    }}
                    className="cursor-grab touch-none shrink-0 px-0.5 active:cursor-grabbing"
                    aria-label="Drag to reorder"
                  >
                    <DragHandle />
                  </button>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface-overlay text-xs font-bold text-text-muted">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-text">
                    {exercise.name || 'New exercise'}
                  </span>
                  {configured && (
                    <button
                      type="button"
                      onClick={() => setExpandedExerciseId(null)}
                      className="shrink-0 rounded-lg px-2 py-1 text-xs text-text-muted hover:bg-surface-overlay hover:text-text"
                    >
                      Minimise
                    </button>
                  )}
                </div>

                <ExercisePicker
                  value={exercise.libraryId}
                  customName={displayName}
                  minimizeDiagram={configured}
                  onSelect={(lib) => applyLibraryExercise(exercise.id, lib)}
                  onCustomName={(custom) => {
                    updateExercise(exercise.id, 'name', custom)
                    if (custom && exercise.libraryId) {
                      const currentLib = getLibraryExercise(exercise.libraryId)
                      if (currentLib && custom !== currentLib.name) {
                        updateExercise(exercise.id, 'libraryId', undefined)
                      }
                    }
                  }}
                />

                <div className="mt-3 space-y-2">
                  <label className="block text-xs text-text-muted">Track by</label>
                  <div className="flex rounded-lg border border-border bg-surface-overlay p-0.5">
                    <button
                      type="button"
                      onClick={() => updateExercise(exercise.id, 'trackingMode', 'reps')}
                      className={[
                        'flex-1 rounded-md py-1.5 text-xs font-medium transition-colors',
                        !usesTimer(exercise) ? 'bg-surface-raised text-text' : 'text-text-muted',
                      ].join(' ')}
                    >
                      Reps
                    </button>
                    <button
                      type="button"
                      onClick={() => updateExercise(exercise.id, 'trackingMode', 'timer')}
                      className={[
                        'flex-1 rounded-md py-1.5 text-xs font-medium transition-colors',
                        usesTimer(exercise) ? 'bg-surface-raised text-text' : 'text-text-muted',
                      ].join(' ')}
                    >
                      Timer
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Sets</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={exercise.targetSets}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'targetSets', Math.max(1, +e.target.value || 1))
                      }
                      className="w-full rounded-lg border border-border bg-surface-overlay px-3 py-2 text-center text-text outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">
                      {usesTimer(exercise) ? 'Duration (s)' : 'Reps'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={exercise.targetReps}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'targetReps', Math.max(1, +e.target.value || 1))
                      }
                      className="w-full rounded-lg border border-border bg-surface-overlay px-3 py-2 text-center text-text outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Rest (s)</label>
                    <input
                      type="number"
                      min={0}
                      max={600}
                      step={5}
                      value={exercise.restSeconds}
                      onChange={(e) =>
                        updateExercise(exercise.id, 'restSeconds', Math.max(0, +e.target.value || 0))
                      }
                      className="w-full rounded-lg border border-border bg-surface-overlay px-3 py-2 text-center text-text outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-2 rounded-xl border border-border bg-surface-overlay/50 p-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
                    <input
                      type="checkbox"
                      checked={exercise.trackWeight ?? shouldTrackWeight(exercise)}
                      onChange={(e) => updateExercise(exercise.id, 'trackWeight', e.target.checked)}
                      className="h-4 w-4 rounded accent-accent"
                    />
                    Track weight (kg)
                  </label>
                  {(exercise.trackWeight ?? shouldTrackWeight(exercise)) && (
                    <div>
                      <label className="mb-1 block text-xs text-text-muted">
                        Default weight (kg) — optional
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={999}
                        step={0.5}
                        value={exercise.defaultWeight ?? ''}
                        placeholder="e.g. 20"
                        onChange={(e) => {
                          const v = e.target.value
                          updateExercise(
                            exercise.id,
                            'defaultWeight',
                            v === '' ? undefined : Math.max(0, +v || 0),
                          )
                        }}
                        className="w-full rounded-lg border border-border bg-surface-overlay px-3 py-2 text-sm text-text outline-none focus:border-accent"
                      />
                    </div>
                  )}
                </div>

                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(exercise.id)}
                    className="mt-3 text-xs text-danger hover:underline"
                  >
                    Remove exercise
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <Button fullWidth onClick={handleSave}>
          Save Routine
        </Button>
      </div>
    </Layout>
  )
}
