import type { HomeTab } from '../types'

interface HomeTabsProps {
  active: HomeTab
  onChange: (tab: HomeTab) => void
  diaryCount: number
}

export function HomeTabs({ active, onChange, diaryCount }: HomeTabsProps) {
  const tabs: { id: HomeTab; label: string }[] = [
    { id: 'routines', label: 'Routines' },
    { id: 'progress', label: 'Progress' },
    { id: 'diary', label: diaryCount > 0 ? `Diary (${diaryCount})` : 'Diary' },
  ]

  return (
    <div className="flex rounded-xl border border-border bg-surface-overlay p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'flex-1 rounded-lg py-2 text-sm font-medium transition-colors',
            active === tab.id ? 'bg-surface-raised text-text shadow-sm' : 'text-text-muted hover:text-text',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
