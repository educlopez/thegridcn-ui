"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NumberInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: string
  disabled?: boolean
}

export function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  label,
  disabled = false,
  className,
  ...props
}: NumberInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const current = controlledValue ?? internalValue

  function update(v: number) {
    const clamped = Math.min(max, Math.max(min, v))
    if (controlledValue === undefined) setInternalValue(clamped)
    onChange?.(clamped)
  }

  return (
    <div
      data-slot="tron-number-input"
      className={cn("space-y-1", disabled && "opacity-40", className)}
      {...props}
    >
      {label && (
        <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground/40">
          {label}
        </span>
      )}

      <div className="inline-flex items-stretch rounded border border-primary/20 bg-card/60 backdrop-blur-sm">
        <button
          type="button"
          disabled={disabled || current <= min}
          onClick={() => update(current - step)}
          className="flex w-8 items-center justify-center border-r border-primary/15 text-foreground/30 transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
            <path d="M0 1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <input
          type="text"
          inputMode="numeric"
          value={current}
          disabled={disabled}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (!isNaN(v)) update(v)
          }}
          className="w-16 bg-transparent py-1.5 text-center font-mono text-xs tabular-nums text-foreground/70 outline-none"
        />

        <button
          type="button"
          disabled={disabled || current >= max}
          onClick={() => update(current + step)}
          className="flex w-8 items-center justify-center border-l border-primary/15 text-foreground/30 transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M0 4h8M4 0v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
