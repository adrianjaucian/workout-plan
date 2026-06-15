import { diagrams } from './diagrams'
import { DiagramSvg, Head, Limb } from './diagrams/primitives'

function GenericDiagram() {
  return (
    <DiagramSvg>
      <Head cx={100} cy={48} />
      <Limb x1={100} y1={55} x2={100} y2={95} />
      <Limb x1={100} y1={68} x2={76} y2={84} />
      <Limb x1={100} y1={68} x2={124} y2={84} />
      <Limb x1={100} y1={95} x2={86} y2={118} />
      <Limb x1={100} y1={95} x2={114} y2={118} />
    </DiagramSvg>
  )
}

interface ExerciseDiagramProps {
  diagramId?: string
  className?: string
  label?: string
  compact?: boolean
}

export function ExerciseDiagram({ diagramId, className = '', label, compact = false }: ExerciseDiagramProps) {
  const render = diagramId ? diagrams[diagramId] : undefined

  if (compact) {
    return (
      <div className={`h-full w-full bg-white ${className}`} aria-hidden>
        {render ? render() : <GenericDiagram />}
      </div>
    )
  }

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-white ${className}`}
      aria-label={label ? `${label} diagram` : 'Exercise diagram'}
    >
      <div className="aspect-[4/3] w-full bg-white">
        {render ? render() : <GenericDiagram />}
      </div>
      {label && (
        <figcaption className="border-t border-[#48A9A6]/30 bg-[#48A9A6]/10 px-3 py-2 text-center text-xs font-medium text-[#3A8A88]">
          {label}
        </figcaption>
      )}
    </figure>
  )
}
