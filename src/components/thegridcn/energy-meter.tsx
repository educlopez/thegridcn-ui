"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EnergyMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  segments?: number
  label?: string
  orientation?: "horizontal" | "vertical"
  showValue?: boolean
}

function getVariant(value: number) {
  if (value < 30) return "critical"
  if (value <= 60) return "warning"
  return "primary"
}

const variantColors = {
  primary: {
    filled: "bg-primary shadow-[0_0_8px_var(--primary)]",
    text: "text-primary",
  },
  warning: {
    filled: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    text: "text-amber-500",
  },
  critical: {
    filled: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    text: "text-red-500",
  },
}

export function EnergyMeter({
  value,
  segments = 10,
  label,
  orientation = "horizontal",
  showValue = false,
  className,
  ...props
}: EnergyMeterProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const filledCount = Math.round((clamped / 100) * segments)
  const variant = getVariant(clamped)
  const colors = variantColors[variant]
  const isVertical = orientation === "vertical"

  // Staggered segment fill animation
  const [visibleCount, setVisibleCount] = React.useState(0)

  React.useEffect(() => {
    if (filledCount === 0) {
      setVisibleCount(0)
      return
    }
    let current = 0
    const interval = setInterval(() => {
      current++
      setVisibleCount(current)
      if (current >= filledCount) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [filledCount])

  // Animate counter
  const [displayPercent, setDisplayPercent] = React.useState(0)
  React.useEffect(() => {
    const duration = filledCount * 60 + 100
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPercent(Math.round(clamped * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [clamped, filledCount])

  return (
    <div
      data-slot="tron-energy-meter"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-3 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Label + Value header */}
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <span className="text-[10px] uppercase tracking-widest text-foreground/80">
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn("font-mono text-sm font-bold tabular-nums", colors.text)}>
              {displayPercent}%
            </span>
          )}
        </div>
      )}

      {/* Segments */}
      <div
        className={cn(
          "flex gap-1",
          isVertical && "flex-col-reverse items-center"
        )}
      >
        {Array.from({ length: segments }, (_, i) => {
          const isFilled = i < visibleCount
          const isLast = i === visibleCount - 1
          return (
            <div
              key={i}
              className={cn(
                "rounded-sm transition-all",
                isVertical ? "h-2 w-full" : "h-6 flex-1",
                isFilled
                  ? cn(colors.filled, "duration-150")
                  : "bg-foreground/10 duration-300",
                isFilled && variant === "critical" && "animate-pulse",
                isLast && "scale-y-110"
              )}
            />
          )
        })}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
