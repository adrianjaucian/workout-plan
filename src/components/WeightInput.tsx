import { useEffect, useRef, useState } from 'react'

interface WeightInputProps {
  weight: number | ''
  onChange: (weight: number | '') => void
}

export function WeightInput({ weight, onChange }: WeightInputProps) {
  const [draft, setDraft] = useState(weight === '' ? '' : String(weight))
  const replacingRef = useRef(false)

  useEffect(() => {
    if (!replacingRef.current) {
      setDraft(weight === '' ? '' : String(weight))
    }
  }, [weight])

  return (
    <div className="mb-4 border-b border-border pb-4">
      <label className="mb-2 block text-center text-sm font-medium text-text-muted">
        Weight (kg) <span className="font-normal">— optional</span>
      </label>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            const n = weight === '' ? 0 : Number(weight)
            onChange(Math.max(0, n - 2.5))
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-overlay text-lg font-bold text-text hover:bg-border"
        >
          −
        </button>
        <input
          type="text"
          inputMode="decimal"
          value={draft}
          placeholder="—"
          onFocus={() => {
            replacingRef.current = true
            setDraft('')
          }}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d.]/g, '')
            setDraft(v)
            replacingRef.current = false
            if (v === '') onChange('')
            else onChange(Math.max(0, +v || 0))
          }}
          onBlur={() => {
            replacingRef.current = false
            if (draft === '') onChange('')
          }}
          className="w-20 rounded-xl border border-border bg-surface-overlay py-2 text-center font-mono text-xl font-bold text-text outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={() => {
            const n = weight === '' ? 0 : Number(weight)
            onChange(n + 2.5)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-overlay text-lg font-bold text-text hover:bg-border"
        >
          +
        </button>
      </div>
    </div>
  )
}
