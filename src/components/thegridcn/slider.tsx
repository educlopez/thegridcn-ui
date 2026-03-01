"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: string
  showValue?: boolean
  disabled?: boolean
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = false,
  disabled = false,
  className,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const current = controlledValue ?? internalValue
  const percent = ((current - min) / (max - min)) * 100

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value)
    if (controlledValue === undefined) setInternalValue(v)
    onChange?.(v)
  }

  return (
    <div
      data-slot="tron-slider"
      className={cn("space-y-1.5", disabled && "opacity-40", className)}
      {...props}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-mono text-[10px] tabular-nums text-primary">
              {current}
            </span>
          )}
        </div>
      )}

      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div className="absolute h-1 w-full rounded-full bg-primary/10" />

        {/* Filled track */}
        <div
          className="absolute h-1 rounded-full bg-primary/40 shadow-[0_0_6px_rgba(var(--primary-rgb,0,180,255),0.3)]"
          style={{ width: `${percent}%` }}
        />

        {/* Tick marks at 0%, 25%, 50%, 75%, 100% */}
        {[0, 25, 50, 75, 100].map((p) => (
          <div
            key={p}
            className={cn(
              "absolute top-1/2 h-2 w-px -translate-y-1/2",
              p <= percent ? "bg-primary/40" : "bg-primary/10"
            )}
            style={{ left: `${p}%` }}
          />
        ))}

        {/* Native range input (invisible) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        {/* Custom thumb */}
        <div
          className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary bg-card shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.4)]"
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  )
}
