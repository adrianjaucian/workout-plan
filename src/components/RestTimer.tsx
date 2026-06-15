import { CountdownTimer } from './CountdownTimer'

interface RestTimerProps {
  secondsLeft: number
  isRunning: boolean
  totalSeconds: number
  onSkip: () => void
  onAddTime: (seconds: number) => void
  onSubtractTime: (seconds: number) => void
}

export function RestTimer(props: RestTimerProps) {
  return (
    <CountdownTimer
      label="Rest"
      variant="rest"
      skipLabel={props.isRunning ? 'Skip Rest' : 'Continue'}
      {...props}
    />
  )
}
