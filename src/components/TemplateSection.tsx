import { useState } from 'react'
import { ROUTINE_TEMPLATES, TEMPLATE_GROUPS, type RoutineTemplate } from '../data/routineTemplates'
import { Button } from './Button'

interface TemplateSectionProps {
  onUseTemplate: (template: RoutineTemplate) => void
}

export function TemplateSection({ onUseTemplate }: TemplateSectionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div>
          <h2 className="font-semibold text-text">Starter templates</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            Push/Pull/Legs, Upper/Lower, Full Body & more
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4 space-y-5">
          {TEMPLATE_GROUPS.map((group) => {
            const templates = ROUTINE_TEMPLATES.filter((t) => t.group === group.id)
            if (templates.length === 0) return null

            return (
              <div key={group.id}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {group.label}
                </h3>
                <ul className="space-y-2">
                  {templates.map((template) => (
                    <li
                      key={template.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-overlay px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-text">{template.name}</p>
                        <p className="text-xs text-text-muted">
                          {template.description} · {template.libraryExerciseIds.length} exercises
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        className="shrink-0 px-3 py-1.5 text-xs"
                        onClick={() => onUseTemplate(template)}
                      >
                        Use
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
