import { useEffect, useState, type ReactNode } from 'react'
import { ExerciseDiagram } from './ExerciseDiagram'

interface ExpandableDiagramProps {
  diagramId?: string
  label?: string
  children?: ReactNode
  standalone?: boolean
}

export function ExpandableDiagram({ diagramId, label, children, standalone = false }: ExpandableDiagramProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <div className={standalone ? '' : 'mt-2 space-y-3'}>
      {expanded && (
        <div className="space-y-2">
          <ExerciseDiagram diagramId={diagramId} label={label} />
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="w-full rounded-lg py-1.5 text-xs text-text-muted transition-colors hover:bg-surface-overlay hover:text-text"
          >
            Collapse diagram
          </button>
        </div>
      )}

      {standalone ? (
        <div className="flex shrink-0 flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="h-14 w-20 overflow-hidden rounded-lg border border-border transition-colors hover:border-accent/50"
            aria-label={
              expanded
                ? 'Collapse exercise diagram'
                : label
                  ? `Expand ${label} diagram`
                  : 'Expand exercise diagram'
            }
            aria-expanded={expanded}
          >
            <ExerciseDiagram diagramId={diagramId} compact />
          </button>
          <span className="text-[10px] leading-none text-text-muted">
            {expanded ? 'Collapse' : 'Expand'}
          </span>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="flex shrink-0 flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="h-16 w-20 overflow-hidden rounded-lg border border-border transition-colors hover:border-accent/50"
              aria-label={
                expanded
                  ? 'Collapse exercise diagram'
                  : label
                    ? `Expand ${label} diagram`
                    : 'Expand exercise diagram'
              }
              aria-expanded={expanded}
            >
              <ExerciseDiagram diagramId={diagramId} compact />
            </button>
            <span className="text-[10px] leading-none text-text-muted">
              {expanded ? 'Collapse' : 'Expand'}
            </span>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
