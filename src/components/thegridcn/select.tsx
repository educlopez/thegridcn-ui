"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function Select({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select...",
  label,
  disabled = false,
  className,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const current = controlledValue ?? internalValue
  const selectedLabel = options.find((o) => o.value === current)?.label

  function select(value: string) {
    if (controlledValue === undefined) setInternalValue(value)
    onChange?.(value)
    setOpen(false)
  }

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div
      ref={ref}
      data-slot="tron-select"
      className={cn("relative", disabled && "opacity-40", className)}
      {...props}
    >
      {label && (
        <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-foreground/40">
          {label}
        </span>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded border bg-card/60 px-3 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm transition-all",
          open
            ? "border-primary/40 shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]"
            : "border-primary/20 hover:border-primary/30",
          selectedLabel ? "text-foreground/70" : "text-foreground/25"
        )}
      >
        {selectedLabel || placeholder}
        <svg
          width="8" height="8" viewBox="0 0 8 8" fill="none"
          className={cn("text-foreground/30 transition-transform", open && "rotate-180")}
        >
          <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded border border-primary/30 bg-card/95 py-1 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.06)] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => !option.disabled && select(option.value)}
              className={cn(
                "relative flex w-full items-center gap-2 px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-widest transition-colors",
                option.disabled && "cursor-not-allowed opacity-30",
                option.value === current
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/50 hover:bg-primary/5 hover:text-foreground/70"
              )}
            >
              {option.value === current && (
                <span className="h-1 w-1 rounded-full bg-primary" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
