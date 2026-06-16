import { useState } from 'react'
import { ROUTINE_TEMPLATES, TEMPLATE_GROUPS, type RoutineTemplate } from '../data/routineTemplates'
import { KPOP_TEMPLATE_SUBGROUPS } from '../data/kpopTemplates'
import { Button } from './Button'

interface TemplateSectionProps {
  onUseTemplate: (template: RoutineTemplate) => void
}

function TemplateList({
  templates,
  onUseTemplate,
}: {
  templates: RoutineTemplate[]
  onUseTemplate: (template: RoutineTemplate) => void
}) {
  return (
    <ul className="space-y-2">
      {templates.map((template) => (
        <li
          key={template.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-overlay px-3 py-2.5"
        >
          <div className="min-w-0">
            <p className="font-medium text-text">{template.name}</p>
            <p className="text-xs text-text-muted">
              {template.description} · {template.exercises.length} exercises
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
  )
}

export function TemplateSection({ onUseTemplate }: TemplateSectionProps) {
  const [starterExpanded, setStarterExpanded] = useState(false)
  const [kpopExpanded, setKpopExpanded] = useState(false)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <button
          type="button"
          onClick={() => setKpopExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <div>
            <h2 className="font-semibold text-text">K-Pop Idol Workouts</h2>
            <p className="mt-0.5 text-sm text-text-muted">
              Jungkook, Lisa, RM, Jimin, Jennie & Rosé — beginner to advanced
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-text-muted transition-transform ${kpopExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {kpopExpanded && (
          <div className="mt-4 space-y-5">
            {KPOP_TEMPLATE_SUBGROUPS.map((subgroup) => (
              <div key={subgroup.id}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {subgroup.label}
                </h3>
                <TemplateList templates={subgroup.templates} onUseTemplate={onUseTemplate} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <button
          type="button"
          onClick={() => setStarterExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <div>
            <h2 className="font-semibold text-text">Starter templates</h2>
            <p className="mt-0.5 text-sm text-text-muted">
              Push/Pull/Legs, Gym Machines, Full Body & more
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-text-muted transition-transform ${starterExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {starterExpanded && (
          <div className="mt-4 space-y-5">
            {TEMPLATE_GROUPS.map((group) => {
              const templates = ROUTINE_TEMPLATES.filter((t) => t.group === group.id)
              if (templates.length === 0) return null

              return (
                <div key={group.id}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {group.label}
                  </h3>
                  <TemplateList templates={templates} onUseTemplate={onUseTemplate} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
