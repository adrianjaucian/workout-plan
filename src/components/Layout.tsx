import type { ReactNode } from 'react'

interface LayoutProps {
  title?: string
  onBack?: () => void
  children: ReactNode
  action?: ReactNode
}

export function Layout({ title, onBack, children, action }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
      {(title || onBack || action) && (
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm">
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-surface-overlay hover:text-text"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {title && <h1 className="flex-1 truncate text-lg font-semibold text-text">{title}</h1>}
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <main className="flex-1 px-4 py-4">{children}</main>
    </div>
  )
}
