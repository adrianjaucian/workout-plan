import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-surface font-semibold hover:bg-accent-dim active:scale-[0.98]',
  secondary:
    'bg-surface-overlay text-text border border-border hover:bg-border/50 active:scale-[0.98]',
  ghost: 'text-text-muted hover:text-text hover:bg-surface-overlay active:scale-[0.98]',
  danger: 'bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25 active:scale-[0.98]',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm transition-all disabled:opacity-40 disabled:pointer-events-none',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
