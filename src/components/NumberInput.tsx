import { useEffect, useRef, useState } from 'react'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 999,
  step: _step,
  className = '',
}: NumberInputProps) {
  const [draft, setDraft] = useState(String(value))
  const replacingRef = useRef(false)

  useEffect(() => {
    if (!replacingRef.current) {
      setDraft(String(value))
    }
  }, [value])

  const clamp = (n: number) => Math.min(max, Math.max(min, n))

  const commit = (raw: string) => {
    if (raw === '') {
      setDraft(String(value))
      return
    }
    onChange(clamp(Number(raw)))
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={draft}
      onFocus={() => {
        replacingRef.current = true
        setDraft('')
      }}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, '')
        setDraft(digits)
        if (digits !== '') {
          replacingRef.current = false
          onChange(clamp(Number(digits)))
        }
      }}
      onBlur={() => {
        replacingRef.current = false
        commit(draft)
      }}
      className={className}
    />
  )
}
