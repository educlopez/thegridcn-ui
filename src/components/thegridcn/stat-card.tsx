"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  unit?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  sparkline?: number[]
}

const trendColor: Record<string, string> = {
  up: "text-green-500",
  down: "text-red-500",
  neutral: "text-foreground/50",
}

const trendIcon: Record<string, string> = {
  up: "▲",
  down: "▼",
  neutral: "—",
}

const sparklineStroke: Record<string, string> = {
  up: "rgb(34,197,94)",
  down: "rgb(239,68,68)",
  neutral: "var(--primary)",
}

export function StatCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  sparkline,
  className,
  ...props
}: StatCardProps) {
  // Animate counter
  const numericValue = typeof value === "number" ? value : null
  const [displayValue, setDisplayValue] = React.useState(numericValue ? 0 : null)

  React.useEffect(() => {
    if (numericValue === null) return
    const target = numericValue
    const duration = 600
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [numericValue])

  // Build sparkline path
  let sparklinePath = ""
  let sparklineAreaPath = ""
  if (sparkline && sparkline.length > 1) {
    const w = 80
    const h = 28
    const maxVal = Math.max(...sparkline)
    const minVal = Math.min(...sparkline)
    const range = maxVal - minVal || 1
    const points = sparkline.map((v, i) => ({
      x: (i / (sparkline.length - 1)) * w,
      y: h - ((v - minVal) / range) * (h - 4) - 2,
    }))
    sparklinePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
    sparklineAreaPath = sparklinePath + ` L${w},${h} L0,${h} Z`
  }

  return (
    <div
      data-slot="tron-stat-card"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-foreground/60">
            {title}
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold text-foreground tabular-nums">
              {displayValue !== null ? displayValue : value}
            </span>
            {unit && (
              <span className="font-mono text-sm text-foreground/50">{unit}</span>
            )}
          </div>
          {trend && (
            <div className={cn("mt-1 flex items-center gap-1 font-mono text-xs", trendColor[trend])}>
              <span>{trendIcon[trend]}</span>
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
        </div>

        {sparkline && sparkline.length > 1 && (
          <svg width={80} height={28} className="shrink-0 opacity-70">
            <path d={sparklineAreaPath} fill={sparklineStroke[trend ?? "neutral"]} opacity={0.1} />
            <path
              d={sparklinePath}
              fill="none"
              stroke={sparklineStroke[trend ?? "neutral"]}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
