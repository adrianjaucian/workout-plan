import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CompletedSet, Routine, WorkoutExerciseLog } from '../types'
import { getDiagramId } from '../data/exerciseLibrary'
import { shouldTrackWeight } from '../lib/equipment'
import { targetDescription, usesTimer } from '../lib/exerciseTracking'
import { generateId, saveWorkoutLog } from '../lib/storage'
import { playTimerComplete, playWorkoutComplete, resumeAudio } from '../lib/sounds'
import {
  findOutstandingExercise,
  getCompletedSetCount,
  getExerciseProgressList,
} from '../lib/workoutProgress'
import { useRestTimer } from '../hooks/useRestTimer'
import { formatElapsed, useElapsedSeconds } from '../hooks/useElapsedTime'
import { Button } from './Button'
import { CountdownTimer } from './CountdownTimer'
import { ExpandableDiagram } from './ExpandableDiagram'
import { ExerciseNavigator } from './ExerciseNavigator'
import { Layout } from './Layout'
import { NextExercisePreview } from './NextExercisePreview'
import { RestTimer } from './RestTimer'
import { WorkoutProgressPanel } from './WorkoutProgressPanel'
import { WeightInput } from './WeightInput'

interface WorkoutSessionProps {
  routine: Routine
  onFinish: (savedToDiary: boolean) => void
  onBack: () => void
}

type Phase = 'active' | 'timed' | 'rest' | 'complete'

export function WorkoutSession({ routine, onFinish, onBack }: WorkoutSessionProps) {
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [setIndex, setSetIndex] = useState(0)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState<number | ''>('')
  const [phase, setPhase] = useState<Phase>('active')
  const [logs, setLogs] = useState<WorkoutExerciseLog[]>([])
  const [startedAt] = useState(() => new Date().toISOString())
  const [restTotal, setRestTotal] = useState(0)
  const [setTimerTotal, setSetTimerTotal] = useState(0)
  const workoutCompletePlayed = useRef(false)
  const [maxReachedIndex, setMaxReachedIndex] = useState(0)
  const [visitedExerciseIds, setVisitedExerciseIds] = useState<Set<string>>(() =>
    new Set(routine.exercises[0] ? [routine.exercises[0].id] : []),
  )
  const [skippedExerciseIds, setSkippedExerciseIds] = useState<Set<string>>(new Set())

  const timer = useRestTimer()
  const elapsedSeconds = useElapsedSeconds(startedAt)
  const exercise = routine.exercises[exerciseIndex]
  const diagramId = getDiagramId(exercise.libraryId, exercise.name)
  const isTimed = usesTimer(exercise)
  const tracksWeight = shouldTrackWeight(exercise)
  const completedOnCurrent = getCompletedSetCount(exercise.id, logs)
  const isLastSet = setIndex >= exercise.targetSets - 1
  const isLastExercise = exerciseIndex >= routine.exercises.length - 1

  const completedExerciseIds = useMemo(() => {
    const ids = new Set<string>()
    for (const ex of routine.exercises) {
      if (getCompletedSetCount(ex.id, logs) >= ex.targetSets) ids.add(ex.id)
    }
    return ids
  }, [logs, routine.exercises])

  const partialExerciseIds = useMemo(() => {
    const ids = new Set<string>()
    for (const ex of routine.exercises) {
      const count = getCompletedSetCount(ex.id, logs)
      if (count > 0 && count < ex.targetSets) ids.add(ex.id)
    }
    return ids
  }, [logs, routine.exercises])

  const progressItems = useMemo(
    () =>
      getExerciseProgressList(
        routine,
        logs,
        visitedExerciseIds,
        skippedExerciseIds,
        maxReachedIndex,
      ),
    [routine, logs, visitedExerciseIds, skippedExerciseIds, maxReachedIndex],
  )

  const markVisited = useCallback((index: number) => {
    const ex = routine.exercises[index]
    if (!ex) return
    setVisitedExerciseIds((prev) => new Set(prev).add(ex.id))
    setMaxReachedIndex((m) => Math.max(m, index))
  }, [routine.exercises])

  const nextPreview = (() => {
    if (!isLastSet) {
      return {
        exercise,
        setNumber: setIndex + 2,
        totalSets: exercise.targetSets,
        isSameExercise: true,
      }
    }
    const nextExercise = routine.exercises[exerciseIndex + 1]
    if (!nextExercise) {
      return {
        exercise,
        setNumber: exercise.targetSets,
        totalSets: exercise.targetSets,
        isSameExercise: true,
      }
    }
    return {
      exercise: nextExercise,
      setNumber: 1,
      totalSets: nextExercise.targetSets,
      isSameExercise: false,
    }
  })()

  useEffect(() => {
    if (!exercise) return
    setReps(exercise.targetReps)
    const log = logs.find((l) => l.exerciseId === exercise.id)
    const lastWeight = log?.sets.at(-1)?.weight
    const nextWeight = lastWeight ?? exercise.defaultWeight
    setWeight(nextWeight != null && nextWeight > 0 ? nextWeight : '')
  }, [exerciseIndex, exercise, logs])

  const recordSet = useCallback(
    (completedReps: number, completedWeight: number | undefined, setNumber: number) => {
      const entry: CompletedSet = {
        setNumber,
        reps: completedReps,
        ...(completedWeight != null && completedWeight > 0 ? { weight: completedWeight } : {}),
      }
      const timed = usesTimer(exercise)
      setLogs((prev) => {
        const existing = prev.find((l) => l.exerciseId === exercise.id)
        if (existing) {
          return prev.map((l) =>
            l.exerciseId === exercise.id ? { ...l, sets: [...l.sets, entry], timed } : l,
          )
        }
        return [
          ...prev,
          {
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            sets: [entry],
            timed,
          },
        ]
      })
      setSkippedExerciseIds((prev) => {
        if (!prev.has(exercise.id)) return prev
        const next = new Set(prev)
        next.delete(exercise.id)
        return next
      })
    },
    [exercise],
  )

  const goToSet = useCallback(
    (exIndex: number, setIdx: number) => {
      timer.stop()
      setRestTotal(0)
      setSetTimerTotal(0)
      setExerciseIndex(exIndex)
      setSetIndex(setIdx)
      setPhase('active')
      markVisited(exIndex)
    },
    [timer, markVisited],
  )

  const tryFinishOrContinue = useCallback(
    (currentLogs: WorkoutExerciseLog[], pendingComplete?: { exerciseId: string; newCount: number }) => {
      const outstanding = findOutstandingExercise(
        routine,
        currentLogs,
        visitedExerciseIds,
        pendingComplete,
      )

      if (outstanding) {
        goToSet(outstanding.exerciseIndex, outstanding.setIndex)
        return
      }

      const nextForwardIndex = exerciseIndex + 1
      if (nextForwardIndex < routine.exercises.length) {
        const nextEx = routine.exercises[nextForwardIndex]
        goToSet(nextForwardIndex, getCompletedSetCount(nextEx.id, currentLogs))
        return
      }

      setPhase('complete')
    },
    [routine, visitedExerciseIds, exerciseIndex, goToSet],
  )

  const advanceAfterRest = useCallback(() => {
    if (!isLastSet) {
      setSetIndex((i) => i + 1)
      setPhase('active')
      return
    }

    const newCount = completedOnCurrent + 1
    tryFinishOrContinue(logs, { exerciseId: exercise.id, newCount })
  }, [isLastSet, completedOnCurrent, exercise.id, logs, tryFinishOrContinue])

  const proceedWithLogs = useCallback(
    (currentLogs: WorkoutExerciseLog[], newCount: number) => {
      if (newCount < exercise.targetSets) {
        if (exercise.restSeconds > 0) {
          setRestTotal(exercise.restSeconds)
          timer.start(exercise.restSeconds)
          setPhase('rest')
        } else {
          setSetIndex(setIndex + 1)
          setPhase('active')
        }
        return
      }

      tryFinishOrContinue(currentLogs, { exerciseId: exercise.id, newCount })
    },
    [exercise, setIndex, timer, tryFinishOrContinue],
  )

  const buildUpdatedLogs = (
    completedValue: number,
    parsedWeight: number | undefined,
    setNumber: number,
  ): WorkoutExerciseLog[] => {
    const entry: CompletedSet = {
      setNumber,
      reps: completedValue,
      ...(parsedWeight != null && parsedWeight > 0 ? { weight: parsedWeight } : {}),
    }
    const timed = usesTimer(exercise)
    const existing = logs.find((l) => l.exerciseId === exercise.id)
    if (existing) {
      return logs.map((l) =>
        l.exerciseId === exercise.id ? { ...l, sets: [...l.sets, entry], timed } : l,
      )
    }
    return [
      ...logs,
      { exerciseId: exercise.id, exerciseName: exercise.name, sets: [entry], timed },
    ]
  }

  const handleCompleteSet = () => {
    resumeAudio()
    const parsedWeight = weight === '' ? undefined : Number(weight)
    const setNumber = completedOnCurrent + 1
    recordSet(reps, parsedWeight, setNumber)
    proceedWithLogs(buildUpdatedLogs(reps, parsedWeight, setNumber), setNumber)
  }

  const handleTimedSetComplete = useCallback(
    (secondsCompleted: number) => {
      const parsedWeight = weight === '' ? undefined : Number(weight)
      const setNumber = completedOnCurrent + 1
      recordSet(secondsCompleted, parsedWeight, setNumber)
      proceedWithLogs(buildUpdatedLogs(secondsCompleted, parsedWeight, setNumber), setNumber)
    },
    [weight, completedOnCurrent, recordSet, proceedWithLogs, logs, exercise],
  )

  const timedCompleteRef = useRef(handleTimedSetComplete)
  timedCompleteRef.current = handleTimedSetComplete

  const handleStartTimedSet = () => {
    resumeAudio()
    setSetTimerTotal(exercise.targetReps)
    timer.start(exercise.targetReps)
    setPhase('timed')
  }

  const handleSkipTimedSet = () => {
    timer.stop()
    const elapsed = Math.max(1, setTimerTotal - timer.secondsLeft)
    setSetTimerTotal(0)
    setPhase('active')
    handleTimedSetComplete(elapsed)
  }

  const handleSkipExercise = () => {
    if (!confirm(`Skip remaining sets of "${exercise.name}"?`)) return
    timer.stop()
    setRestTotal(0)
    setSetTimerTotal(0)
    setSkippedExerciseIds((prev) => new Set(prev).add(exercise.id))
    markVisited(exerciseIndex)

    const nextIndex = exerciseIndex + 1
    if (nextIndex < routine.exercises.length) {
      const nextEx = routine.exercises[nextIndex]
      const nextCompleted = getCompletedSetCount(nextEx.id, logs)
      goToSet(nextIndex, nextCompleted)
      return
    }

    const outstanding = findOutstandingExercise(routine, logs, visitedExerciseIds)
    if (outstanding) {
      const resumeSameExercise =
        outstanding.exerciseIndex === exerciseIndex &&
        outstanding.setIndex === completedOnCurrent
      if (!resumeSameExercise) {
        goToSet(outstanding.exerciseIndex, outstanding.setIndex)
        return
      }
    }
    setPhase('complete')
  }

  const handleSkipRest = () => {
    timer.stop()
    setRestTotal(0)
    advanceAfterRest()
  }

  useEffect(() => {
    if (phase === 'rest' && !timer.isRunning && timer.secondsLeft === 0 && restTotal > 0) {
      playTimerComplete()
      setRestTotal(0)
      advanceAfterRest()
    }
  }, [phase, timer.isRunning, timer.secondsLeft, restTotal, advanceAfterRest])

  useEffect(() => {
    if (phase === 'timed' && !timer.isRunning && timer.secondsLeft === 0 && setTimerTotal > 0) {
      playTimerComplete()
      setSetTimerTotal(0)
      setPhase('active')
      timedCompleteRef.current(exercise.targetReps)
    }
  }, [phase, timer.isRunning, timer.secondsLeft, setTimerTotal, exercise.targetReps])

  useEffect(() => {
    if (phase === 'complete' && !workoutCompletePlayed.current) {
      workoutCompletePlayed.current = true
      playWorkoutComplete()
    }
  }, [phase])

  useEffect(() => {
    const unlock = () => resumeAudio()
    document.addEventListener('pointerdown', unlock, { once: true })
    return () => document.removeEventListener('pointerdown', unlock)
  }, [])

  const goToExercise = useCallback(
    (index: number) => {
      const ex = routine.exercises[index]
      const completed = getCompletedSetCount(ex.id, logs)
      goToSet(index, completed)
    },
    [routine.exercises, logs, goToSet],
  )

  const handleSaveToDiary = () => {
    saveWorkoutLog({
      id: generateId(),
      routineId: routine.id,
      routineName: routine.name,
      startedAt,
      completedAt: new Date().toISOString(),
      exercises: logs,
    })
    onFinish(true)
  }

  const handleDismiss = () => {
    onFinish(false)
  }

  const totalSets = routine.exercises.reduce((sum, e) => sum + e.targetSets, 0)
  const completedSets = logs.reduce((sum, l) => sum + l.sets.length, 0)
  const progressPercent = totalSets > 0 ? (completedSets / totalSets) * 100 : 0

  if (phase === 'complete') {
    const totalReps = logs.reduce((sum, l) => sum + l.sets.reduce((s, set) => s + set.reps, 0), 0)
    const allProgress = getExerciseProgressList(
      routine,
      logs,
      visitedExerciseIds,
      skippedExerciseIds,
      routine.exercises.length - 1,
    )
    return (
      <Layout title="Workout Complete" onBack={handleDismiss}>
        <div className="space-y-6 py-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-muted text-accent">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Great work!</h2>
            <p className="mt-1 text-text-muted">{routine.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-surface-raised p-4">
              <p className="text-2xl font-bold text-text">{completedSets}</p>
              <p className="text-sm text-text-muted">Sets completed</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-raised p-4">
              <p className="text-2xl font-bold text-text">{totalReps}</p>
              <p className="text-sm text-text-muted">Total reps</p>
            </div>
          </div>

          <div className="text-left">
            <WorkoutProgressPanel items={allProgress} />
          </div>

          <div className="space-y-2">
            <Button fullWidth onClick={handleSaveToDiary}>
              Save to diary
            </Button>
            <Button variant="ghost" fullWidth onClick={handleDismiss}>
              Done without saving
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      title={routine.name}
      onBack={() => {
        if (confirm('Leave workout? Progress will not be saved.')) onBack()
      }}
    >
      <div className="flex gap-3">
        <div className="min-w-0 flex-1 space-y-5">
          <div>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs text-text-muted">
              <span>
                Exercise {exerciseIndex + 1} of {routine.exercises.length}
              </span>
              <span>{Math.round(progressPercent)}%</span>
              <span className="font-mono tabular-nums">{formatElapsed(elapsedSeconds)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-overlay">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {phase === 'rest' ? (
            <>
              <RestTimer
                secondsLeft={timer.secondsLeft}
                isRunning={timer.isRunning}
                totalSeconds={restTotal}
                onSkip={handleSkipRest}
                onAddTime={timer.addTime}
                onSubtractTime={timer.subtractTime}
              />
              <NextExercisePreview
                exercise={nextPreview.exercise}
                setNumber={nextPreview.setNumber}
                totalSets={nextPreview.totalSets}
                isSameExercise={nextPreview.isSameExercise}
              />
            </>
          ) : phase === 'timed' ? (
            <>
              <div className="rounded-2xl border border-border bg-surface-raised p-5">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Set {setIndex + 1} of {exercise.targetSets}
                </p>
                <h2 className="mt-1 text-xl font-bold text-text">{exercise.name}</h2>
              </div>
              <CountdownTimer
                label="Exercise timer"
                variant="exercise"
                secondsLeft={timer.secondsLeft}
                isRunning={timer.isRunning}
                totalSeconds={setTimerTotal}
                onSkip={handleSkipTimedSet}
                skipLabel="End set early"
              />
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-border bg-surface-raised p-5">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Set {setIndex + 1} of {exercise.targetSets}
                </p>
                <ExpandableDiagram diagramId={diagramId} label={exercise.name}>
                  <div className="min-w-0 flex-1 pt-1">
                    <h2 className="text-xl font-bold leading-tight text-text">{exercise.name}</h2>
                    <p className="mt-1 text-sm text-text-muted">
                      Target: {targetDescription(exercise)}
                    </p>
                  </div>
                </ExpandableDiagram>
              </div>

              {isTimed ? (
                <div className="rounded-2xl border border-border bg-surface-raised p-5 text-center">
                  {tracksWeight && (
                    <WeightInput weight={weight} onChange={setWeight} />
                  )}
                  <p className="text-sm text-text-muted">Hold or perform for</p>
                  <p className="mt-1 font-mono text-4xl font-bold tabular-nums text-text">
                    {Math.floor(exercise.targetReps / 60)}:{(exercise.targetReps % 60).toString().padStart(2, '0')}
                  </p>
                  <Button fullWidth className="mt-4" onClick={handleStartTimedSet}>
                    Start timer
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface-raised p-5">
                  {tracksWeight && <WeightInput weight={weight} onChange={setWeight} />}

                  <label className="mb-3 block text-center text-sm font-medium text-text-muted">
                    Reps completed
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setReps((r) => Math.max(0, r - 1))}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-overlay text-2xl font-bold text-text transition-colors hover:bg-border"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={999}
                      value={reps}
                      onChange={(e) => setReps(Math.max(0, +e.target.value || 0))}
                      className="w-24 rounded-xl border border-border bg-surface-overlay py-3 text-center font-mono text-4xl font-bold text-text outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setReps((r) => r + 1)}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-overlay text-2xl font-bold text-text transition-colors hover:bg-border"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 flex justify-center gap-2">
                    {[5, 8, 10, 12, 15].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReps(n)}
                        className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          reps === n
                            ? 'bg-accent text-surface font-semibold'
                            : 'bg-surface-overlay text-text-muted hover:text-text'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isTimed && (
                <Button fullWidth onClick={handleCompleteSet}>
                  {isLastSet && isLastExercise ? 'Finish Workout' : 'Complete Set'}
                </Button>
              )}
              <Button variant="ghost" fullWidth onClick={handleSkipExercise}>
                Skip exercise
              </Button>
            </>
          )}

          <WorkoutProgressPanel items={progressItems} />
        </div>

        <ExerciseNavigator
          exercises={routine.exercises}
          currentIndex={exerciseIndex}
          completedExerciseIds={completedExerciseIds}
          skippedExerciseIds={skippedExerciseIds}
          partialExerciseIds={partialExerciseIds}
          onSelect={goToExercise}
        />
      </div>
    </Layout>
  )
}
