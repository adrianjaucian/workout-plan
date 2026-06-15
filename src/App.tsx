import { useState } from 'react'
import type { View } from './types'
import { useRoutines } from './hooks/useRoutines'
import { useWorkoutLogs } from './hooks/useWorkoutLogs'
import { getWorkoutLog } from './lib/storage'
import { exercisesFromTemplate } from './data/routineTemplates'
import { HomeTabs } from './components/HomeTabs'
import { Layout } from './components/Layout'
import { RoutineList } from './components/RoutineList'
import { RoutineEditor } from './components/RoutineEditor'
import { WorkoutDiary } from './components/WorkoutDiary'
import { WorkoutDiaryDetail } from './components/WorkoutDiaryDetail'
import { WorkoutSession } from './components/WorkoutSession'
import { ProgressDashboard } from './components/ProgressDashboard'

function App() {
  const [view, setView] = useState<View>({ type: 'home', tab: 'routines' })
  const { routines, createRoutine, updateRoutine, deleteRoutine, duplicateRoutine, getRoutine } =
    useRoutines()
  const { logs, refresh, removeLog } = useWorkoutLogs()

  if (view.type === 'edit') {
    const routine = view.routineId ? getRoutine(view.routineId) : null
    return (
      <RoutineEditor
        routine={routine}
        onSave={(name, exercises) => {
          if (view.routineId) {
            updateRoutine(view.routineId, { name, exercises })
          } else {
            createRoutine(name, exercises)
          }
          setView({ type: 'home', tab: 'routines' })
        }}
        onBack={() => setView({ type: 'home', tab: 'routines' })}
      />
    )
  }

  if (view.type === 'workout') {
    const routine = getRoutine(view.routineId)
    if (!routine || routine.exercises.length === 0) {
      setView({ type: 'home', tab: 'routines' })
      return null
    }
    return (
      <WorkoutSession
        routine={routine}
        onFinish={(savedToDiary) => {
          if (savedToDiary) refresh()
          setView({ type: 'home', tab: savedToDiary ? 'diary' : 'routines' })
        }}
        onBack={() => setView({ type: 'home', tab: 'routines' })}
      />
    )
  }

  if (view.type === 'diary-entry') {
    const log = getWorkoutLog(view.logId)
    if (!log) {
      setView({ type: 'home', tab: 'diary' })
      return null
    }
    return (
      <WorkoutDiaryDetail
        log={log}
        onBack={() => setView({ type: 'home', tab: 'diary' })}
        onDelete={() => {
          removeLog(log.id)
          setView({ type: 'home', tab: 'diary' })
        }}
      />
    )
  }

  const tabDescriptions = {
    routines: 'Track sets, reps, and rest — gym or mat workouts, your way.',
    progress: 'Personal records, charts, streaks, and training time.',
    diary: 'Your workout diary — every completed session saved here.',
  } as const

  return (
    <Layout>
      <div className="space-y-5">
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-text">Workout Plan</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-accent">
            Build your own routines
          </p>
          <p className="mt-1 text-sm text-text-muted">{tabDescriptions[view.tab]}</p>
        </div>

        <HomeTabs
          active={view.tab}
          onChange={(tab) => setView({ type: 'home', tab })}
          diaryCount={logs.length}
        />

        {view.tab === 'routines' && (
          <RoutineList
            routines={routines}
            onCreate={() => setView({ type: 'edit', routineId: null })}
            onUseTemplate={(template) => {
              const routine = createRoutine(template.name, exercisesFromTemplate(template))
              setView({ type: 'edit', routineId: routine.id })
            }}
            onEdit={(id) => setView({ type: 'edit', routineId: id })}
            onStart={(id) => setView({ type: 'workout', routineId: id })}
            onDuplicate={(id) => {
              const copy = duplicateRoutine(id)
              if (copy) setView({ type: 'edit', routineId: copy.id })
            }}
            onDelete={(id) => {
              if (confirm('Delete this routine?')) deleteRoutine(id)
            }}
          />
        )}

        {view.tab === 'progress' && <ProgressDashboard logs={logs} />}

        {view.tab === 'diary' && (
          <WorkoutDiary
            logs={logs}
            onSelect={(id) => setView({ type: 'diary-entry', logId: id })}
          />
        )}
      </div>
    </Layout>
  )
}

export default App
