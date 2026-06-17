import { useCallback, useEffect, useRef, useState } from 'react'

export function useRestTimer() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    clear()
    setIsRunning(false)
    setSecondsLeft(0)
  }, [clear])

  const pause = useCallback(() => {
    clear()
    setIsRunning(false)
  }, [clear])

  const resume = useCallback(() => {
    setSecondsLeft((prev) => {
      if (prev <= 0) return prev
      clear()
      setIsRunning(true)
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((current) => {
          if (current <= 1) {
            clear()
            setIsRunning(false)
            return 0
          }
          return current - 1
        })
      }, 1000)
      return prev
    })
  }, [clear])

  const start = useCallback(
    (seconds: number) => {
      clear()
      setSecondsLeft(seconds)
      setIsRunning(true)
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clear()
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    },
    [clear],
  )

  const addTime = useCallback((seconds: number) => {
    setSecondsLeft((prev) => prev + seconds)
  }, [])

  const subtractTime = useCallback(
    (seconds: number) => {
      setSecondsLeft((prev) => {
        const next = Math.max(0, prev - seconds)
        if (next === 0) {
          clear()
          setIsRunning(false)
        }
        return next
      })
    },
    [clear],
  )

  useEffect(() => () => clear(), [clear])

  return { secondsLeft, isRunning, start, stop, pause, resume, addTime, subtractTime }
}
