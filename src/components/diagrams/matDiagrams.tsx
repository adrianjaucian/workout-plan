import type { ReactNode } from 'react'
import { DiagramFrame, Head, Limb, Mat, MoveArrow, StepBadge, TealShorts, Torso } from './primitives'

export const matDiagrams: Record<string, () => ReactNode> = {
  plank: () => (
    <DiagramFrame muscles={['core', 'shoulders']}>
      <Mat />
      <Torso d="M42 82 Q100 78 158 82 L160 88 Q100 92 40 88 Z" />
      <Head cx={164} cy={80} />
      <Limb x1={42} y1={84} x2={36} y2={104} />
      <Limb x1={158} y1={84} x2={164} y2={104} />
      <StepBadge n={1} x={42} y={72} />
      <StepBadge n={2} x={42} y={72} />
      <text x={100} y={68} textAnchor="middle" fill="#48A9A6" fontSize="8" fontWeight="600">
        Hold
      </text>
    </DiagramFrame>
  ),

  crunch: () => (
    <DiagramFrame muscles={['core']}>
      <Mat />
      <path d="M52 108 Q82 58 118 72" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={122} cy={68} />
      <path d="M52 108 Q70 100 80 88" fill="#FAFAFA" stroke="#263238" strokeWidth="1.8" />
      <TealShorts d="M78 86 L92 88 L90 96 L76 94 Z" />
      <Limb x1={52} y1={108} x2={46} y2={118} />
      <Limb x1={100} y1={82} x2={112} y2={104} />
      <StepBadge n={1} x={42} y={100} />
      <StepBadge n={2} x={42} y={68} />
      <MoveArrow d="M38 98 Q28 80 38 62" />
    </DiagramFrame>
  ),

  'russian-twist': () => (
    <DiagramFrame muscles={['core']}>
      <Mat />
      <path d="M72 100 Q100 72 128 100" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={100} cy={74} />
      <path d="M82 88 Q100 82 118 88" fill="#FAFAFA" stroke="#263238" strokeWidth="1.8" />
      <TealShorts d="M86 86 L114 86 L116 96 L84 96 Z" />
      <Limb x1={84} y1={90} x2={68} y2={96} />
      <Limb x1={116} y1={90} x2={132} y2={96} />
      <rect x={64} y={92} width="10" height="10" fill="#48A9A6" stroke="#263238" strokeWidth="1.2" rx="2" />
      <StepBadge n={1} x={42} y={88} />
      <StepBadge n={2} x={155} y={88} />
      <MoveArrow d="M38 86 Q20 72 38 58" />
      <MoveArrow d="M162 86 Q180 72 162 58" />
    </DiagramFrame>
  ),

  'leg-raise': () => (
    <DiagramFrame muscles={['core']}>
      <Mat />
      <Torso d="M78 108 Q100 106 122 108 L120 96 Q100 94 80 96 Z" />
      <Head cx={126} cy={104} />
      <Limb x1={78} y1={108} x2={72} y2={118} />
      <Limb x1={118} y1={96} x2={132} y2={52} />
      <Limb x1={132} y1={52} x2={148} y2={44} />
      <TealShorts d="M82 94 L118 94 L120 104 L80 104 Z" />
      <StepBadge n={1} x={42} y={100} />
      <StepBadge n={2} x={42} y={52} />
      <MoveArrow d="M38 98 Q28 72 38 46" />
    </DiagramFrame>
  ),

  'bird-dog': () => (
    <DiagramFrame muscles={['core', 'glutes', 'back']}>
      <Mat />
      <Torso d="M72 88 Q100 84 128 88 L130 94 Q100 98 70 94 Z" />
      <Head cx={66} cy={86} />
      <Limb x1={72} y1={90} x2={56} y2={104} />
      <Limb x1={128} y1={90} x2={144} y2={104} />
      <Limb x1={74} y1={88} x2={48} y2={62} />
      <Limb x1={126} y1={88} x2={152} y2={58} />
      <TealShorts d="M88 92 L112 92 L114 100 L86 100 Z" />
      <StepBadge n={1} x={42} y={88} />
      <StepBadge n={2} x={155} y={58} />
      <MoveArrow d="M150 86 Q162 70 154 52" />
    </DiagramFrame>
  ),

  'glute-bridge': () => (
    <DiagramFrame muscles={['glutes', 'hamstrings', 'core']}>
      <Mat />
      <path d="M58 108 Q100 58 142 108" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={100} cy={64} />
      <TealShorts d="M88 78 L112 78 L114 88 L86 88 Z" />
      <Limb x1={58} y1={108} x2={52} y2={118} />
      <Limb x1={142} y1={108} x2={148} y2={118} />
      <StepBadge n={1} x={42} y={100} />
      <StepBadge n={2} x={42} y={62} />
      <MoveArrow d="M38 98 Q28 78 38 58" />
    </DiagramFrame>
  ),

  'cat-cow': () => (
    <DiagramFrame muscles={['core', 'back']}>
      <Mat />
      <path d="M52 92 Q78 58 100 88 Q122 118 148 88" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={48} cy={90} />
      <TealShorts d="M82 86 L118 86 L120 96 L80 96 Z" />
      <Limb x1={52} y1={92} x2={46} y2={108} />
      <Limb x1={148} y1={88} x2={154} y2={108} />
      <StepBadge n={1} x={42} y={72} />
      <StepBadge n={2} x={155} y={108} />
      <MoveArrow d="M38 70 Q28 82 38 94" />
      <MoveArrow d="M162 106 Q172 94 162 82" />
    </DiagramFrame>
  ),

  'childs-pose': () => (
    <DiagramFrame muscles={['back', 'core']}>
      <Mat />
      <path d="M62 108 Q100 82 138 108" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={56} cy={104} />
      <Limb x1={62} y1={108} x2={50} y2={118} />
      <Limb x1={138} y1={108} x2={150} y2={118} />
      <Limb x1={56} y1={102} x2={44} y2={108} />
      <TealShorts d="M88 96 L112 96 L114 106 L86 106 Z" />
      <text x={100} y={76} textAnchor="middle" fill="#48A9A6" fontSize="8" fontWeight="600">
        Stretch
      </text>
    </DiagramFrame>
  ),

  'dead-bug': () => (
    <DiagramFrame muscles={['core']}>
      <Mat />
      <Torso d="M78 96 Q100 92 122 96 L120 104 Q100 108 80 104 Z" />
      <Head cx={100} cy={78} />
      <TealShorts d="M84 94 L116 94 L118 104 L82 104 Z" />
      <Limb x1={80} y1={98} x2={56} y2={68} />
      <Limb x1={120} y1={98} x2={144} y2={72} />
      <Limb x1={80} y1={104} x2={54} y2={108} />
      <Limb x1={120} y1={104} x2={146} y2={108} />
      <StepBadge n={1} x={42} y={96} />
      <StepBadge n={2} x={155} y={66} />
      <MoveArrow d="M150 94 Q162 78 152 62" />
    </DiagramFrame>
  ),

  'mountain-climber': () => (
    <DiagramFrame muscles={['core', 'quads', 'shoulders']}>
      <Torso d="M58 72 Q100 68 142 72 L144 78 Q100 82 56 78 Z" />
      <Head cx={148} cy={70} />
      <TealShorts d="M78 76 L122 76 L124 82 L76 82 Z" />
      <Limb x1={58} y1={74} x2={52} y2={100} />
      <Limb x1={142} y1={74} x2={148} y2={100} />
      <Limb x1={100} y1={74} x2={118} y2={52} />
      <Limb x1={52} y1={100} x2={48} y2={112} />
      <Limb x1={148} y1={100} x2={152} y2={112} />
      <StepBadge n={1} x={155} y={58} />
      <StepBadge n={2} x={42} y={58} />
      <MoveArrow d="M150 56 Q138 44 150 32" />
      <MoveArrow d="M38 56 Q50 44 38 32" />
    </DiagramFrame>
  ),

  'bicycle-crunch': () => (
    <DiagramFrame muscles={['core']}>
      <Mat />
      <path d="M62 108 Q88 68 118 78" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <Head cx={122} cy={74} />
      <TealShorts d="M86 84 L108 86 L106 96 L84 94 Z" />
      <Limb x1={100} y1={84} x2={128} y2={68} />
      <Limb x1={88} y1={90} x2={62} y2={108} />
      <Limb x1={62} y1={108} x2={56} y2={118} />
      <StepBadge n={1} x={155} y={72} />
      <StepBadge n={2} x={42} y={100} />
      <MoveArrow d="M150 70 Q162 86 154 102" />
      <MoveArrow d="M38 98 Q26 82 34 66" />
    </DiagramFrame>
  ),
}
