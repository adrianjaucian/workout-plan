import type { ReactNode } from 'react'

export const TEAL = '#48A9A6'
export const TEAL_DARK = '#3A8A88'
export const OUTLINE = '#263238'
export const SKIN = '#FAFAFA'
export const GREY = '#CFD8DC'
export const GREY_DARK = '#90A4AE'
export const BG = '#FFFFFF'

export type MuscleRegion =
  | 'chest'
  | 'back'
  | 'lats'
  | 'traps'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves'

const FRONT_HIGHLIGHTS: Record<MuscleRegion, string | null> = {
  chest: 'M16 22 Q20 20 24 22 Q24 28 20 30 Q16 28 16 22',
  shoulders: 'M12 18 Q14 16 16 18 M24 18 Q26 16 28 18',
  biceps: 'M11 24 Q12 28 13 32 M27 24 Q28 28 29 32',
  triceps: null,
  forearms: 'M10 32 Q11 36 12 40 M28 32 Q29 36 30 40',
  core: 'M17 30 Q20 29 23 30 Q23 38 20 40 Q17 38 17 30',
  quads: 'M16 42 Q18 40 20 42 Q20 52 18 54 Q16 52 16 42 M20 42 Q22 40 24 42 Q24 52 22 54 Q20 52 20 42',
  calves: 'M16 54 Q18 53 20 54 L20 60 Q18 61 16 60 Z M20 54 Q22 53 24 54 L24 60 Q22 61 20 60 Z',
  glutes: null,
  back: null,
  lats: null,
  traps: null,
  hamstrings: null,
}

const BACK_HIGHLIGHTS: Record<MuscleRegion, string | null> = {
  back: 'M17 24 Q20 22 23 24 Q23 34 20 36 Q17 34 17 24',
  lats: 'M14 26 Q16 30 17 34 M26 26 Q24 30 23 34',
  traps: 'M17 16 Q20 14 23 16 Q23 22 20 23 Q17 22 17 16',
  glutes: 'M16 38 Q20 36 24 38 Q24 44 20 46 Q16 44 16 38',
  hamstrings: 'M16 46 Q18 44 20 46 Q20 54 18 56 Q16 54 16 46 M20 46 Q22 44 24 46 Q24 54 22 56 Q20 54 20 46',
  calves: 'M16 56 Q18 55 20 56 L20 62 Q18 63 16 62 Z M20 56 Q22 55 24 56 L24 62 Q22 63 20 62 Z',
  triceps: 'M11 24 Q12 28 13 32 M27 24 Q28 28 29 32',
  shoulders: 'M12 18 Q14 16 16 18 M24 18 Q26 16 28 18',
  chest: null,
  biceps: null,
  forearms: null,
  core: null,
  quads: null,
}

export function DiagramSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden>
      <rect width="200" height="150" fill={BG} />
      {children}
    </svg>
  )
}

export function MuscleMap({ regions }: { regions: MuscleRegion[] }) {
  return (
    <g transform="translate(6, 6)">
      <g transform="scale(0.9)">
        <MiniBody view="front" />
        <g>
          {regions.map((r) => {
            const d = FRONT_HIGHLIGHTS[r]
            return d ? <path key={`f-${r}`} d={d} fill={TEAL} opacity={0.9} /> : null
          })}
        </g>
      </g>
      <g transform="translate(34, 0) scale(0.9)">
        <MiniBody view="back" />
        <g>
          {regions.map((r) => {
            const d = BACK_HIGHLIGHTS[r]
            return d ? <path key={`b-${r}`} d={d} fill={TEAL} opacity={0.9} /> : null
          })}
        </g>
      </g>
    </g>
  )
}

function MiniBody({ view }: { view: 'front' | 'back' }) {
  return (
    <g stroke={GREY_DARK} strokeWidth="1" fill={GREY} opacity={0.55}>
      <circle cx="20" cy="8" r="5" fill={GREY} />
      <path d="M14 14 Q20 12 26 14 L25 36 Q20 38 15 36 Z" fill={GREY} />
      <line x1="14" y1="16" x2="8" y2="28" />
      <line x1="8" y1="28" x2="6" y2="38" />
      <line x1="26" y1="16" x2="32" y2="28" />
      <line x1="32" y1="28" x2="34" y2="38" />
      <line x1="17" y1="36" x2="15" y2="52" />
      <line x1="15" y1="52" x2="14" y2="64" />
      <line x1="23" y1="36" x2="25" y2="52" />
      <line x1="25" y1="52" x2="26" y2="64" />
      {view === 'back' && <line x1="17" y1="14" x2="23" y2="14" strokeWidth="0.8" />}
    </g>
  )
}

export function StepBadge({ n, x, y }: { n: 1 | 2; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill={TEAL} />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fill={BG}
        fontSize="9"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {n}
      </text>
    </g>
  )
}

export function MoveArrow({
  d,
  dashed,
}: {
  d: string
  dashed?: boolean
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={TEAL}
      strokeWidth="2"
      strokeLinecap="round"
      markerEnd="url(#arrow)"
      strokeDasharray={dashed ? '4 3' : undefined}
    />
  )
}

export function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={TEAL} />
      </marker>
    </defs>
  )
}

export function Head({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={SKIN} stroke={OUTLINE} strokeWidth="1.8" />
}

export function Limb({
  x1,
  y1,
  x2,
  y2,
  w = 4.5,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  w?: number
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={OUTLINE}
      strokeWidth={w}
      strokeLinecap="round"
    />
  )
}

export function TealShorts({ d }: { d: string }) {
  return <path d={d} fill={TEAL} stroke={OUTLINE} strokeWidth="1.5" />
}

export function Torso({ d }: { d: string }) {
  return <path d={d} fill={SKIN} stroke={OUTLINE} strokeWidth="1.8" strokeLinejoin="round" />
}

export function Barbell({
  x,
  y,
  length,
  plate = 6,
}: {
  x: number
  y: number
  length: number
  plate?: number
}) {
  const x2 = x + length
  return (
    <g>
      <line x1={x} y1={y} x2={x2} y2={y} stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      <rect x={x - plate} y={y - plate} width={plate * 2} height={plate * 2} fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1" />
      <rect x={x2 - plate} y={y - plate} width={plate * 2} height={plate * 2} fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1" />
    </g>
  )
}

export function Dumbbell({ cx, cy, vertical }: { cx: number; cy: number; vertical?: boolean }) {
  if (vertical) {
    return (
      <g>
        <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke={OUTLINE} strokeWidth="2" />
        <rect x={cx - 5} y={cy - 14} width="10" height="8" fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1.5" />
        <rect x={cx - 5} y={cy + 6} width="10" height="8" fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1.5" />
      </g>
    )
  }
  return (
    <g>
      <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={OUTLINE} strokeWidth="2" />
      <rect x={cx - 14} y={cy - 5} width="8" height="10" fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1.5" />
      <rect x={cx + 6} y={cy - 5} width="8" height="10" fill={TEAL} stroke={OUTLINE} strokeWidth="1.2" rx="1.5" />
    </g>
  )
}

export function Bench({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="6" fill={GREY_DARK} stroke={OUTLINE} strokeWidth="1.2" rx="1" />
      <line x1={x + 12} y1={y + 6} x2={x + 12} y2={y + 18} stroke={OUTLINE} strokeWidth="2.5" />
      <line x1={x + w - 12} y1={y + 6} x2={x + w - 12} y2={y + 18} stroke={OUTLINE} strokeWidth="2.5" />
    </g>
  )
}

export function Mat({ y = 128 }: { y?: number }) {
  return <rect x="20" y={y} width="160" height="5" fill={TEAL} opacity="0.25" rx="1" />
}

export function CableLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={GREY_DARK} strokeWidth="1.5" strokeDasharray="3 2" />
}

export function MachineFrame({ d, opacity = 0.35 }: { d: string; opacity?: number }) {
  return <path d={d} fill={GREY} stroke={OUTLINE} strokeWidth="1.2" opacity={opacity} />
}

export function DiagramFrame({ children, muscles }: { children: ReactNode; muscles: MuscleRegion[] }) {
  return (
    <DiagramSvg>
      <ArrowDefs />
      <MuscleMap regions={muscles} />
      {children}
    </DiagramSvg>
  )
}
