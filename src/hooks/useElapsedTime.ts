import { useEffect, useState } from 'react'

export function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}min`
}

interface ElapsedOptions {
  pausedMs?: number
  pauseStartedAt?: number | null
}

export function useElapsedSeconds(startedAt: string, options?: ElapsedOptions): number {
  const pausedMs = options?.pausedMs ?? 0
  const pauseStartedAt = options?.pauseStartedAt ?? null

  const [elapsed, setElapsed] = useState(() => {
    const extraPaused = pauseStartedAt ? Date.now() - pauseStartedAt : 0
    return Math.floor((Date.now() - new Date(startedAt).getTime() - pausedMs - extraPaused) / 1000)
  })

  useEffect(() => {
    const tick = () => {
      const extraPaused = pauseStartedAt ? Date.now() - pauseStartedAt : 0
      setElapsed(
        Math.floor((Date.now() - new Date(startedAt).getTime() - pausedMs - extraPaused) / 1000),
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [startedAt, pausedMs, pauseStartedAt])

  return elapsed
}
