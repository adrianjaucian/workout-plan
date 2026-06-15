import { useCallback, useEffect, useState } from 'react'
import type { Exercise, Routine } from '../types'
import { generateId, loadRoutines, saveRoutines } from '../lib/storage'

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([])

  useEffect(() => {
    setRoutines(loadRoutines())
  }, [])

  const persist = useCallback((next: Routine[]) => {
    setRoutines(next)
    saveRoutines(next)
  }, [])

  const createRoutine = useCallback(
    (name: string, exercises: Exercise[] = []): Routine => {
      const now = new Date().toISOString()
      const routine: Routine = {
        id: generateId(),
        name,
        exercises,
        createdAt: now,
        updatedAt: now,
      }
      persist([routine, ...loadRoutines()])
      return routine
    },
    [persist],
  )

  const updateRoutine = useCallback(
    (id: string, updates: Partial<Pick<Routine, 'name' | 'exercises'>>) => {
      const next = loadRoutines().map((r) =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r,
      )
      persist(next)
    },
    [persist],
  )

  const deleteRoutine = useCallback(
    (id: string) => {
      persist(loadRoutines().filter((r) => r.id !== id))
    },
    [persist],
  )

  const duplicateRoutine = useCallback(
    (id: string): Routine | null => {
      const source = loadRoutines().find((r) => r.id === id)
      if (!source) return null

      const now = new Date().toISOString()
      const copy: Routine = {
        id: generateId(),
        name: `${source.name} (copy)`,
        exercises: source.exercises.map((e) => ({ ...e, id: generateId() })),
        createdAt: now,
        updatedAt: now,
      }
      persist([copy, ...loadRoutines()])
      return copy
    },
    [persist],
  )

  const getRoutine = useCallback((id: string) => {
    return loadRoutines().find((r) => r.id === id) ?? null
  }, [])

  return {
    routines,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    duplicateRoutine,
    getRoutine,
  }
}
