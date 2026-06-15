import { useCallback, useEffect, useState } from 'react'
import type { WorkoutLog } from '../types'
import { deleteWorkoutLog, loadWorkoutLogs } from '../lib/storage'

export function useWorkoutLogs() {
  const [logs, setLogs] = useState<WorkoutLog[]>([])

  const refresh = useCallback(() => {
    setLogs(loadWorkoutLogs())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const removeLog = useCallback(
    (id: string) => {
      deleteWorkoutLog(id)
      refresh()
    },
    [refresh],
  )

  return { logs, refresh, removeLog }
}
