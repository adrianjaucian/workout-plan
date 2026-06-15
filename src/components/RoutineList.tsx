import type { Routine } from '../types'
import type { RoutineTemplate } from '../data/routineTemplates'
import { getRoutineEquipment } from '../lib/equipment'
import { Button } from './Button'
import { TemplateSection } from './TemplateSection'

interface RoutineListProps {
  routines: Routine[]
  onCreate: () => void
  onUseTemplate: (template: RoutineTemplate) => void
  onEdit: (id: string) => void
  onStart: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

export function RoutineList({
  routines,
  onCreate,
  onUseTemplate,
  onEdit,
  onStart,
  onDuplicate,
  onDelete,
}: RoutineListProps) {
  return (
    <div className="space-y-6">
      <TemplateSection onUseTemplate={onUseTemplate} />

      <div className="pt-2">
        <h2 className="text-lg font-bold text-text">Your routines</h2>
      </div>

      <Button fullWidth onClick={onCreate}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Routine
      </Button>

      {routines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted text-accent">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16" />
              <circle cx="6.5" cy="6.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
          </div>
          <p className="font-medium text-text">No routines yet</p>
          <p className="mt-1 text-sm text-text-muted">Create your first gym or mat workout routine.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {routines.map((routine) => {
            const equipment = getRoutineEquipment(routine)
            return (
            <li
              key={routine.id}
              className="rounded-2xl border border-border bg-surface-raised p-4"
            >
              <div className="mb-3">
                <h2 className="font-semibold text-text">{routine.name}</h2>
                <p className="mt-0.5 text-sm text-text-muted">
                  {routine.exercises.length} exercise{routine.exercises.length !== 1 ? 's' : ''}
                  {routine.exercises.length > 0 && (
                    <>
                      {' · '}
                      {routine.exercises.reduce((sum, e) => sum + e.targetSets, 0)} total sets
                    </>
                  )}
                </p>
                {equipment.length > 0 && (
                  <div className="mt-2">
                    <p className="mb-1.5 text-xs font-medium text-text-muted">Equipment needed</p>
                    <div className="flex flex-wrap gap-1.5">
                      {equipment.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-border bg-surface-overlay px-2 py-0.5 text-xs text-text"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  className="flex-1"
                  onClick={() => onStart(routine.id)}
                  disabled={routine.exercises.length === 0}
                >
                  Start
                </Button>
                <Button variant="secondary" onClick={() => onEdit(routine.id)}>
                  Edit
                </Button>
                <Button variant="ghost" onClick={() => onDuplicate(routine.id)} title="Duplicate routine">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </Button>
                <Button variant="ghost" onClick={() => onDelete(routine.id)} title="Delete routine">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                  </svg>
                </Button>
              </div>
            </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
