"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  size = "md",
  disabled = false,
  className,
  ...props
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isChecked = controlledChecked ?? internalChecked

  function toggle() {
    if (disabled) return
    const next = !isChecked
    if (controlledChecked === undefined) setInternalChecked(next)
    onChange?.(next)
  }

  const sizes = {
    sm: { track: "h-4 w-8", thumb: "h-3 w-3", translate: "translate-x-4" },
    md: { track: "h-5 w-10", thumb: "h-3.5 w-3.5", translate: "translate-x-5" },
    lg: { track: "h-6 w-12", thumb: "h-4.5 w-4.5", translate: "translate-x-6" },
  }

  const s = sizes[size]

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        data-slot="tron-toggle"
        onClick={toggle}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-all duration-200",
          s.track,
          disabled && "cursor-not-allowed opacity-40",
          isChecked
            ? "border-primary/40 bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb,0,180,255),0.2)]"
            : "border-primary/15 bg-card/60"
        )}
        {...props}
      >
        {/* Track glow */}
        {isChecked && (
          <span className="absolute inset-0 rounded-full bg-primary/10" />
        )}

        {/* Thumb */}
        <span
          className={cn(
            "relative inline-block rounded-full border transition-all duration-200",
            s.thumb,
            isChecked
              ? cn(s.translate, "ml-0.5 border-primary bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb,0,180,255),0.5)]")
              : "ml-0.5 border-foreground/20 bg-foreground/30"
          )}
        />
      </button>

      {label && (
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest transition-colors",
            isChecked ? "text-primary" : "text-foreground/40"
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
