"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SignalIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  strength: number
  bars?: number
  label?: string
  showValue?: boolean
  status?: "connected" | "weak" | "disconnected"
}

const statusColor: Record<string, { bar: string; text: string; dot: string }> = {
  connected: {
    bar: "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]",
    text: "text-green-500",
    dot: "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]",
  },
  weak: {
    bar: "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]",
    text: "text-amber-500",
    dot: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
  },
  disconnected: {
    bar: "bg-red-500",
    text: "text-red-500",
    dot: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]",
  },
}

function autoStatus(strength: number): "connected" | "weak" | "disconnected" {
  if (strength <= 0) return "disconnected"
  if (strength < 40) return "weak"
  return "connected"
}

export function SignalIndicator({
  strength,
  bars = 5,
  label,
  showValue = false,
  status,
  className,
  ...props
}: SignalIndicatorProps) {
  const clamped = Math.max(0, Math.min(100, strength))
  const resolvedStatus = status ?? autoStatus(clamped)
  const colors = statusColor[resolvedStatus]
  const filledBars = Math.round((clamped / 100) * bars)

  // Staggered bar reveal
  const [visibleBars, setVisibleBars] = React.useState(0)
  React.useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current++
      setVisibleBars(current)
      if (current >= filledBars) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [filledBars])

  return (
    <div
      data-slot="tron-signal-indicator"
      className={cn(
        "relative inline-flex items-center gap-3 overflow-hidden rounded border border-primary/30 bg-card/80 px-3 py-2 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Status dot */}
      <div className={cn(
        "h-2 w-2 shrink-0 rounded-full",
        colors.dot,
        resolvedStatus === "disconnected" && "animate-pulse"
      )} />

      {/* Label */}
      {label && (
        <span className="text-[10px] uppercase tracking-widest text-foreground/80">
          {label}
        </span>
      )}

      {/* Bars */}
      <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
        {Array.from({ length: bars }, (_, i) => {
          const filled = i < visibleBars
          const barHeight = 6 + ((i + 1) / bars) * 14
          return (
            <div
              key={i}
              className={cn(
                "w-1.5 rounded-t-sm transition-all duration-200",
                filled ? colors.bar : "bg-foreground/15"
              )}
              style={{ height: barHeight }}
            />
          )
        })}
      </div>

      {/* Value */}
      {showValue && (
        <span className={cn("font-mono text-xs font-bold tabular-nums", colors.text)}>
          {Math.round(clamped)}%
        </span>
      )}

      {/* Status label */}
      <span className={cn("text-[9px] uppercase tracking-widest", colors.text)}>
        {resolvedStatus}
      </span>
    </div>
  )
}
