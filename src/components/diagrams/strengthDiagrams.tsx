import type { ReactNode } from 'react'
import {
  Barbell,
  Bench,
  CableLine,
  DiagramFrame,
  Dumbbell,
  Head,
  Limb,
  MachineFrame,
  Mat,
  MoveArrow,
  StepBadge,
  TealShorts,
  Torso,
} from './primitives'

export const diagrams: Record<string, () => ReactNode> = {
  'bench-press': () => (
    <DiagramFrame muscles={['chest', 'triceps', 'shoulders']}>
      <Bench x={35} y={98} w={130} />
      <Torso d="M78 78 Q100 72 122 78 Q125 88 100 92 Q75 88 78 78" />
      <Head cx={100} cy={68} />
      <Limb x1={78} y1={82} x2={58} y2={92} />
      <Limb x1={122} y1={82} x2={142} y2={92} />
      <Barbell x={52} y={90} length={96} />
      <TealShorts d="M88 90 L112 90 L115 100 L85 100 Z" />
      <Limb x1={90} y1={100} x2={88} y2={98} w={3.5} />
      <Limb x1={110} y1={100} x2={112} y2={98} w={3.5} />
      <StepBadge n={1} x={148} y={78} />
      <StepBadge n={2} x={148} y={58} />
      <MoveArrow d="M142 76 Q130 62 142 52" />
    </DiagramFrame>
  ),

  'barbell-squat': () => (
    <DiagramFrame muscles={['quads', 'glutes', 'core']}>
      <Barbell x={55} y={38} length={90} />
      <Head cx={100} cy={52} />
      <Torso d="M90 60 Q100 58 110 60 L108 88 Q100 90 92 88 Z" />
      <TealShorts d="M90 86 L110 86 L112 96 L88 96 Z" />
      <Limb x1={92} y1={96} x2={82} y2={118} />
      <Limb x1={108} y1={96} x2={118} y2={118} />
      <Limb x1={94} y1={64} x2={72} y2={42} />
      <Limb x1={106} y1={64} x2={128} y2={42} />
      <StepBadge n={1} x={155} y={70} />
      <StepBadge n={2} x={155} y={100} />
      <MoveArrow d="M150 72 L150 98" />
    </DiagramFrame>
  ),

  deadlift: () => (
    <DiagramFrame muscles={['back', 'hamstrings', 'glutes', 'traps']}>
      <Barbell x={48} y={112} length={104} />
      <Head cx={108} cy={58} />
      <Torso d="M98 66 Q108 64 118 66 L120 92 Q108 96 96 92 Z" />
      <TealShorts d="M96 90 L120 90 L122 100 L94 100 Z" />
      <Limb x1={98} y1={78} x2={72} y2={108} />
      <Limb x1={118} y1={78} x2={128} y2={108} />
      <Limb x1={100} y1={100} x2={88} y2={112} />
      <Limb x1={116} y1={100} x2={128} y2={112} />
      <StepBadge n={1} x={42} y={72} />
      <StepBadge n={2} x={42} y={108} />
      <MoveArrow d="M38 74 Q30 90 38 106" />
    </DiagramFrame>
  ),

  'barbell-row': () => (
    <DiagramFrame muscles={['back', 'lats', 'biceps']}>
      <Barbell x={42} y={108} length={116} />
      <Head cx={100} cy={42} />
      <Torso d="M88 50 Q100 48 112 50 L115 82 Q100 86 85 82 Z" />
      <TealShorts d="M86 80 L114 80 L116 92 L84 92 Z" />
      <Limb x1={88} y1={58} x2={68} y2={78} />
      <Limb x1={112} y1={58} x2={132} y2={78} />
      <Limb x1={86} y1={92} x2={78} y2={112} />
      <Limb x1={114} y1={92} x2={122} y2={112} />
      <Limb x1={90} y1={72} x2={72} y2={106} />
      <Limb x1={110} y1={72} x2={128} y2={106} />
      <StepBadge n={1} x={155} y={100} />
      <StepBadge n={2} x={155} y={72} />
      <MoveArrow d="M150 98 Q140 82 150 68" />
    </DiagramFrame>
  ),

  'overhead-press': () => (
    <DiagramFrame muscles={['shoulders', 'triceps', 'core']}>
      <Barbell x={62} y={28} length={76} />
      <Head cx={100} cy={48} />
      <Torso d="M88 56 Q100 54 112 56 L110 96 Q100 98 90 96 Z" />
      <TealShorts d="M90 94 L110 94 L112 108 L88 108 Z" />
      <Limb x1={90} y1={64} x2={68} y2={32} />
      <Limb x1={110} y1={64} x2={132} y2={32} />
      <Limb x1={92} y1={108} x2={86} y2={124} />
      <Limb x1={108} y1={108} x2={114} y2={124} />
      <StepBadge n={1} x={148} y={58} />
      <StepBadge n={2} x={148} y={28} />
      <MoveArrow d="M142 56 Q130 40 142 26" />
    </DiagramFrame>
  ),

  'romanian-deadlift': () => (
    <DiagramFrame muscles={['hamstrings', 'glutes', 'back']}>
      <Barbell x={52} y={100} length={96} />
      <Head cx={112} cy={48} />
      <Torso d="M100 56 Q112 52 122 58 L118 88 Q108 92 98 88 Z" />
      <TealShorts d="M98 86 L118 86 L120 96 L96 96 Z" />
      <Limb x1={100} y1={64} x2={78} y2={98} />
      <Limb x1={120} y1={64} x2={132} y2={98} />
      <Limb x1={100} y1={96} x2={92} y2={112} />
      <Limb x1={116} y1={96} x2={124} y2={112} />
      <StepBadge n={1} x={42} y={68} />
      <StepBadge n={2} x={42} y={98} />
      <MoveArrow d="M38 70 L38 96" />
    </DiagramFrame>
  ),

  'dumbbell-bench': () => (
    <DiagramFrame muscles={['chest', 'triceps', 'shoulders']}>
      <Bench x={35} y={98} w={130} />
      <Torso d="M78 78 Q100 72 122 78 Q125 88 100 92 Q75 88 78 78" />
      <Head cx={100} cy={68} />
      <Limb x1={78} y1={82} x2={52} y2={78} />
      <Limb x1={122} y1={82} x2={148} y2={78} />
      <Dumbbell cx={48} cy={76} />
      <Dumbbell cx={152} cy={76} />
      <TealShorts d="M88 90 L112 90 L115 100 L85 100 Z" />
      <StepBadge n={1} x={162} y={78} />
      <StepBadge n={2} x={162} y={58} />
      <MoveArrow d="M156 76 Q144 62 156 52" />
    </DiagramFrame>
  ),

  'dumbbell-shoulder-press': () => (
    <DiagramFrame muscles={['shoulders', 'triceps']}>
      <Head cx={100} cy={46} />
      <Torso d="M88 54 Q100 52 112 54 L110 94 Q100 96 90 94 Z" />
      <TealShorts d="M90 92 L110 92 L112 106 L88 106 Z" />
      <Limb x1={90} y1={62} x2={68} y2={30} />
      <Limb x1={110} y1={62} x2={132} y2={30} />
      <Dumbbell cx={64} cy={28} vertical />
      <Dumbbell cx={136} cy={28} vertical />
      <Limb x1={92} y1={106} x2={86} y2={122} />
      <Limb x1={108} y1={106} x2={114} y2={122} />
      <StepBadge n={1} x={148} y={56} />
      <StepBadge n={2} x={148} y={26} />
      <MoveArrow d="M142 54 Q130 38 142 24" />
    </DiagramFrame>
  ),

  'dumbbell-curl': () => (
    <DiagramFrame muscles={['biceps', 'forearms']}>
      <Head cx={100} cy={38} />
      <Torso d="M90 46 Q100 44 110 46 L108 100 Q100 102 92 100 Z" />
      <TealShorts d="M92 98 L108 98 L110 112 L90 112 Z" />
      <Limb x1={92} y1={112} x2={88} y2={126} />
      <Limb x1={108} y1={112} x2={112} y2={126} />
      <path d="M88 72 Q72 68 72 48" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M112 72 Q128 68 128 48" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <Dumbbell cx={70} cy={46} />
      <Dumbbell cx={130} cy={46} />
      <StepBadge n={1} x={62} y={72} />
      <StepBadge n={2} x={62} y={44} />
      <MoveArrow d="M58 70 Q50 56 58 42" />
    </DiagramFrame>
  ),

  'dumbbell-lunge': () => (
    <DiagramFrame muscles={['quads', 'glutes']}>
      <Head cx={100} cy={36} />
      <Torso d="M90 44 Q100 42 110 44 L108 78 Q100 80 92 78 Z" />
      <TealShorts d="M90 76 L110 76 L112 86 L88 86 Z" />
      <Limb x1={92} y1={58} x2={72} y2={68} />
      <Limb x1={108} y1={58} x2={128} y2={68} />
      <Dumbbell cx={68} cy={68} />
      <Dumbbell cx={132} cy={68} />
      <Limb x1={96} y1={86} x2={78} y2={112} />
      <Limb x1={104} y1={86} x2={128} y2={104} />
      <Limb x1={128} y1={104} x2={142} y2={118} />
      <StepBadge n={1} x={155} y={82} />
      <StepBadge n={2} x={155} y={108} />
      <MoveArrow d="M150 84 L150 106" />
    </DiagramFrame>
  ),

  'dumbbell-row': () => (
    <DiagramFrame muscles={['back', 'lats', 'biceps']}>
      <Bench x={50} y={88} w={100} />
      <Head cx={88} cy={38} />
      <Torso d="M78 46 Q88 44 98 46 L100 78 Q88 82 76 78 Z" />
      <TealShorts d="M76 76 L100 76 L102 86 L74 86 Z" />
      <Limb x1={78} y1={54} x2={62} y2={72} />
      <Limb x1={98} y1={54} x2={114} y2={72} />
      <Limb x1={76} y1={86} x2={68} y2={108} />
      <Limb x1={100} y1={86} x2={108} y2={108} />
      <Limb x1={82} y1={68} x2={72} y2={88} />
      <Dumbbell cx={128} cy={72} />
      <StepBadge n={1} x={148} y={82} />
      <StepBadge n={2} x={148} y={62} />
      <MoveArrow d="M142 80 Q132 68 142 56" />
    </DiagramFrame>
  ),

  'goblet-squat': () => (
    <DiagramFrame muscles={['quads', 'glutes', 'core']}>
      <Head cx={100} cy={40} />
      <Torso d="M90 48 Q100 46 110 48 L108 82 Q100 84 92 82 Z" />
      <TealShorts d="M90 80 L110 80 L112 92 L88 92 Z" />
      <Limb x1={92} y1={58} x2={78} y2={68} />
      <Limb x1={108} y1={58} x2={122} y2={68} />
      <rect x={92} y={62} width="16" height="20" fill="#48A9A6" stroke="#263238" strokeWidth="1.5" rx="3" />
      <Limb x1={92} y1={92} x2={84} y2={114} />
      <Limb x1={108} y1={92} x2={116} y2={114} />
      <StepBadge n={1} x={155} y={68} />
      <StepBadge n={2} x={155} y={98} />
      <MoveArrow d="M150 70 L150 96" />
    </DiagramFrame>
  ),

  'lat-pulldown': () => (
    <DiagramFrame muscles={['lats', 'back', 'biceps']}>
      <MachineFrame d="M82 12 L118 12 L118 24 L82 24 Z" />
      <CableLine x1={100} y1={24} x2={100} y2={38} />
      <Barbell x={68} y={40} length={64} plate={5} />
      <Head cx={100} cy={54} />
      <Torso d="M88 62 Q100 60 112 62 L110 96 Q100 98 90 96 Z" />
      <TealShorts d="M90 94 L110 94 L112 108 L88 108 Z" />
      <Limb x1={90} y1={68} x2={72} y2={44} />
      <Limb x1={110} y1={68} x2={128} y2={44} />
      <MachineFrame d="M55 108 L145 108 L145 128 L55 128 Z" opacity={0.5} />
      <StepBadge n={1} x={152} y={48} />
      <StepBadge n={2} x={152} y={72} />
      <MoveArrow d="M146 46 L146 70" />
    </DiagramFrame>
  ),

  'leg-press': () => (
    <DiagramFrame muscles={['quads', 'glutes']}>
      <MachineFrame d="M35 118 L165 118 L155 48 L45 58 Z" opacity={0.45} />
      <Head cx={78} cy={62} />
      <Torso d="M68 70 Q78 68 88 70 L86 92 Q78 94 70 92 Z" />
      <TealShorts d="M70 90 L86 90 L88 98 L68 98 Z" />
      <Limb x1={72} y1={78} x2={58} y2={96} />
      <Limb x1={84} y1={78} x2={98} y2={96} />
      <Limb x1={68} y1={98} x2={52} y2={108} w={5} />
      <Limb x1={88} y1={98} x2={104} y2={108} w={5} />
      <rect x={48} y={100} width="60" height="10" fill="#48A9A6" opacity="0.6" stroke="#263238" strokeWidth="1" rx="2" />
      <StepBadge n={1} x={155} y={88} />
      <StepBadge n={2} x={155} y={68} />
      <MoveArrow d="M150 86 Q140 74 150 62" />
    </DiagramFrame>
  ),

  'seated-row': () => (
    <DiagramFrame muscles={['back', 'lats', 'biceps']}>
      <MachineFrame d="M52 108 L148 108 L148 128 L52 128 Z" opacity={0.5} />
      <Head cx={100} cy={52} />
      <Torso d="M88 60 Q100 58 112 60 L110 100 Q100 102 90 100 Z" />
      <TealShorts d="M90 98 L110 98 L112 108 L88 108 Z" />
      <Limb x1={90} y1={68} x2={72} y2={78} />
      <Limb x1={110} y1={68} x2={128} y2={78} />
      <CableLine x1={155} y1={28} x2={155} y2={72} />
      <Dumbbell cx={155} cy={76} />
      <StepBadge n={1} x={42} y={72} />
      <StepBadge n={2} x={42} y={52} />
      <MoveArrow d="M38 70 Q28 58 38 46" />
    </DiagramFrame>
  ),

  'leg-curl': () => (
    <DiagramFrame muscles={['hamstrings']}>
      <MachineFrame d="M38 72 L162 72 L162 118 L38 118 Z" opacity={0.4} />
      <Torso d="M72 78 Q100 74 128 78 Q130 86 100 90 Q70 86 72 78" />
      <Head cx={130} cy={76} />
      <Limb x1={72} y1={84} x2={58} y2={96} />
      <Limb x1={128} y1={84} x2={142} y2={96} />
      <path d="M78 90 Q100 108 122 88" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <rect x={118} y={84} width="28" height="10" fill="#48A9A6" opacity="0.7" stroke="#263238" strokeWidth="1" rx="2" />
      <StepBadge n={1} x={42} y={96} />
      <StepBadge n={2} x={42} y={76} />
      <MoveArrow d="M38 94 Q28 82 38 70" />
    </DiagramFrame>
  ),

  'chest-press-machine': () => (
    <DiagramFrame muscles={['chest', 'triceps', 'shoulders']}>
      <MachineFrame d="M48 52 L152 52 L152 118 L48 118 Z" opacity={0.4} />
      <Head cx={100} cy={58} />
      <Torso d="M88 66 Q100 64 112 66 L110 100 Q100 102 90 100 Z" />
      <TealShorts d="M90 98 L110 98 L112 108 L88 108 Z" />
      <Limb x1={88} y1={74} x2={62} y2={80} />
      <Limb x1={112} y1={74} x2={138} y2={80} />
      <Dumbbell cx={56} cy={80} />
      <Dumbbell cx={144} cy={80} />
      <StepBadge n={1} x={42} y={72} />
      <StepBadge n={2} x={42} y={52} />
      <MoveArrow d="M38 70 Q28 58 38 46" />
    </DiagramFrame>
  ),

  'smith-squat': () => (
    <DiagramFrame muscles={['quads', 'glutes']}>
      <line x1={72} y1={18} x2={72} y2={122} stroke="#90A4AE" strokeWidth="3" />
      <line x1={128} y1={18} x2={128} y2={122} stroke="#90A4AE" strokeWidth="3" />
      <Barbell x={62} y={36} length={76} />
      <Head cx={100} cy={52} />
      <Torso d="M90 60 Q100 58 110 60 L108 88 Q100 90 92 88 Z" />
      <TealShorts d="M90 86 L110 86 L112 96 L88 96 Z" />
      <Limb x1={92} y1={96} x2={84} y2={118} />
      <Limb x1={108} y1={96} x2={116} y2={118} />
      <Limb x1={94} y1={64} x2={72} y2={38} />
      <Limb x1={106} y1={64} x2={128} y2={38} />
      <StepBadge n={1} x={155} y={70} />
      <StepBadge n={2} x={155} y={100} />
      <MoveArrow d="M150 72 L150 98" />
    </DiagramFrame>
  ),

  'cable-fly': () => (
    <DiagramFrame muscles={['chest', 'shoulders']}>
      <CableLine x1={28} y1={22} x2={28} y2={52} />
      <CableLine x1={172} y1={22} x2={172} y2={52} />
      <CableLine x1={28} y1={52} x2={68} y2={72} />
      <CableLine x1={172} y1={52} x2={132} y2={72} />
      <Head cx={100} cy={54} />
      <Torso d="M88 62 Q100 60 112 62 L110 102 Q100 104 90 102 Z" />
      <TealShorts d="M90 100 L110 100 L112 114 L88 114 Z" />
      <Limb x1={90} y1={70} x2={68} y2={74} />
      <Limb x1={110} y1={70} x2={132} y2={74} />
      <circle cx={68} cy={74} r="5" fill="#48A9A6" stroke="#263238" strokeWidth="1.2" />
      <circle cx={132} cy={74} r="5" fill="#48A9A6" stroke="#263238" strokeWidth="1.2" />
      <Limb x1={92} y1={114} x2={88} y2={126} />
      <Limb x1={108} y1={114} x2={112} y2={126} />
      <StepBadge n={1} x={42} y={68} />
      <StepBadge n={2} x={42} y={88} />
      <MoveArrow d="M38 66 Q28 78 38 90" />
    </DiagramFrame>
  ),

  'tricep-pushdown': () => (
    <DiagramFrame muscles={['triceps']}>
      <CableLine x1={100} y1={12} x2={100} y2={42} />
      <Head cx={100} cy={52} />
      <Torso d="M90 60 Q100 58 110 60 L108 104 Q100 106 92 104 Z" />
      <TealShorts d="M92 102 L108 102 L110 116 L90 116 Z" />
      <Limb x1={92} y1={68} x2={82} y2={86} />
      <Limb x1={108} y1={68} x2={118} y2={86} />
      <rect x={92} y={84} width="16" height="12" fill="#48A9A6" stroke="#263238" strokeWidth="1.2" rx="2" />
      <Limb x1={92} y1={116} x2={88} y2={128} />
      <Limb x1={108} y1={116} x2={112} y2={128} />
      <StepBadge n={1} x={148} y={78} />
      <StepBadge n={2} x={148} y={102} />
      <MoveArrow d="M142 76 L142 100" />
    </DiagramFrame>
  ),

  'face-pull': () => (
    <DiagramFrame muscles={['shoulders', 'back', 'traps']}>
      <CableLine x1={100} y1={12} x2={100} y2={38} />
      <Head cx={100} cy={50} />
      <Torso d="M88 58 Q100 56 112 58 L110 102 Q100 104 90 102 Z" />
      <TealShorts d="M90 100 L110 100 L112 114 L88 114 Z" />
      <Limb x1={90} y1={66} x2={72} y2={48} />
      <Limb x1={110} y1={66} x2={128} y2={48} />
      <circle cx={72} cy={48} r="4" fill="#48A9A6" stroke="#263238" strokeWidth="1" />
      <circle cx={128} cy={48} r="4" fill="#48A9A6" stroke="#263238" strokeWidth="1" />
      <Limb x1={92} y1={114} x2={88} y2={126} />
      <Limb x1={108} y1={114} x2={112} y2={126} />
      <StepBadge n={1} x={42} y={58} />
      <StepBadge n={2} x={42} y={42} />
      <MoveArrow d="M38 56 Q28 46 38 36" />
    </DiagramFrame>
  ),

  'cable-curl': () => (
    <DiagramFrame muscles={['biceps', 'forearms']}>
      <CableLine x1={100} y1={12} x2={100} y2={38} />
      <Head cx={100} cy={44} />
      <Torso d="M90 52 Q100 50 110 52 L108 104 Q100 106 92 104 Z" />
      <TealShorts d="M92 102 L108 102 L110 116 L90 116 Z" />
      <path d="M88 68 Q72 62 76 42" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx={76} cy={40} r="4" fill="#48A9A6" stroke="#263238" strokeWidth="1" />
      <Limb x1={92} y1={116} x2={88} y2={128} />
      <Limb x1={108} y1={116} x2={112} y2={128} />
      <StepBadge n={1} x={62} y={66} />
      <StepBadge n={2} x={62} y={40} />
      <MoveArrow d="M58 64 Q48 50 58 36" />
    </DiagramFrame>
  ),

  'pull-up': () => (
    <DiagramFrame muscles={['lats', 'back', 'biceps']}>
      <line x1={58} y1={18} x2={142} y2={18} stroke="#263238" strokeWidth="4" strokeLinecap="round" />
      <line x1={58} y1={18} x2={58} y2={28} stroke="#263238" strokeWidth="2.5" />
      <line x1={142} y1={18} x2={142} y2={28} stroke="#263238" strokeWidth="2.5" />
      <Head cx={100} cy={46} />
      <Torso d="M90 54 Q100 52 110 54 L108 96 Q100 98 92 96 Z" />
      <TealShorts d="M92 94 L108 94 L110 108 L90 108 Z" />
      <Limb x1={92} y1={60} x2={62} y2={22} />
      <Limb x1={108} y1={60} x2={138} y2={22} />
      <Limb x1={92} y1={108} x2={88} y2={124} />
      <Limb x1={108} y1={108} x2={112} y2={124} />
      <StepBadge n={1} x={155} y={72} />
      <StepBadge n={2} x={155} y={48} />
      <MoveArrow d="M150 70 Q140 56 150 42" />
    </DiagramFrame>
  ),

  'push-up': () => (
    <DiagramFrame muscles={['chest', 'triceps', 'shoulders', 'core']}>
      <Head cx={158} cy={66} />
      <Torso d="M52 68 Q100 64 148 66 L150 72 Q100 76 50 72 Z" />
      <TealShorts d="M72 72 L128 72 L130 78 L70 78 Z" />
      <Limb x1={52} y1={70} x2={46} y2={96} />
      <Limb x1={148} y1={70} x2={154} y2={96} />
      <Limb x1={46} y1={96} x2={42} y2={108} />
      <Limb x1={154} y1={96} x2={158} y2={108} />
      <Mat y={108} />
      <StepBadge n={1} x={42} y={78} />
      <StepBadge n={2} x={42} y={58} />
      <MoveArrow d="M38 76 Q28 64 38 52" />
    </DiagramFrame>
  ),

  dip: () => (
    <DiagramFrame muscles={['triceps', 'chest', 'shoulders']}>
      <line x1={52} y1={22} x2={52} y2={52} stroke="#263238" strokeWidth="3" />
      <line x1={148} y1={22} x2={148} y2={52} stroke="#263238" strokeWidth="3" />
      <line x1={52} y1={52} x2={148} y2={52} stroke="#263238" strokeWidth="4" />
      <Head cx={100} cy={66} />
      <Torso d="M90 74 Q100 72 110 74 L108 108 Q100 110 92 108 Z" />
      <TealShorts d="M92 106 L108 106 L110 118 L90 118 Z" />
      <Limb x1={92} y1={80} x2={54} y2={54} />
      <Limb x1={108} y1={80} x2={146} y2={54} />
      <Limb x1={92} y1={118} x2={88} y2={128} />
      <Limb x1={108} y1={118} x2={112} y2={128} />
      <StepBadge n={1} x={42} y={78} />
      <StepBadge n={2} x={42} y={58} />
      <MoveArrow d="M38 76 Q28 64 38 52" />
    </DiagramFrame>
  ),

  'chin-up': () => (
    <DiagramFrame muscles={['biceps', 'lats', 'back']}>
      <line x1={58} y1={18} x2={142} y2={18} stroke="#263238" strokeWidth="4" strokeLinecap="round" />
      <Head cx={100} cy={50} />
      <Torso d="M90 58 Q100 56 110 58 L108 100 Q100 102 92 100 Z" />
      <TealShorts d="M92 98 L108 98 L110 112 L90 112 Z" />
      <path d="M92 62 Q68 36 64 20" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M108 62 Q132 36 136 20" fill="none" stroke="#263238" strokeWidth="4.5" strokeLinecap="round" />
      <Limb x1={92} y1={112} x2={88} y2={126} />
      <Limb x1={108} y1={112} x2={112} y2={126} />
      <StepBadge n={1} x={155} y={72} />
      <StepBadge n={2} x={155} y={48} />
      <MoveArrow d="M150 70 Q140 56 150 42" />
    </DiagramFrame>
  ),
}
