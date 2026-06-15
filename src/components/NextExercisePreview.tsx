import type { Exercise } from '../types'
import { getDiagramId } from '../data/exerciseLibrary'
import { targetDescription } from '../lib/exerciseTracking'
import { ExerciseDiagram } from './ExerciseDiagram'

interface NextExercisePreviewProps {
  exercise: Exercise
  setNumber: number
  totalSets: number
  isSameExercise: boolean
}

export function NextExercisePreview({
  exercise,
  setNumber,
  totalSets,
  isSameExercise,
}: NextExercisePreviewProps) {
  const diagramId = getDiagramId(exercise.libraryId, exercise.name)

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Up next</p>
      <div className="mt-3 flex gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border">
          <ExerciseDiagram diagramId={diagramId} compact />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-sm font-medium text-accent">
            {isSameExercise ? `Set ${setNumber} of ${totalSets}` : 'Next exercise · Set 1'}
          </p>
          <h3 className="mt-0.5 truncate font-semibold text-text">{exercise.name}</h3>
          <p className="mt-1 text-sm text-text-muted">
            Target: {targetDescription(exercise)}
          </p>
        </div>
      </div>
    </div>
  )
}
