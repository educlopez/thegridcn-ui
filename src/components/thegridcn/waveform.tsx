"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  bars?: number
  playing?: boolean
  variant?: "default" | "success" | "warning" | "danger"
  label?: string
  intensity?: "low" | "medium" | "high"
}

const variantColor: Record<string, string> = {
  default: "bg-primary",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
}

const variantGlow: Record<string, string> = {
  default: "shadow-[0_0_6px_var(--primary)]",
  success: "shadow-[0_0_6px_rgba(34,197,94,0.5)]",
  warning: "shadow-[0_0_6px_rgba(245,158,11,0.5)]",
  danger: "shadow-[0_0_6px_rgba(239,68,68,0.5)]",
}

const intensityRange = {
  low: { min: 15, max: 50 },
  medium: { min: 20, max: 80 },
  high: { min: 30, max: 100 },
}

export function Waveform({
  bars = 24,
  playing = true,
  variant = "default",
  label,
  intensity = "medium",
  className,
  ...props
}: WaveformProps) {
  const [heights, setHeights] = React.useState<number[]>(() =>
    Array.from({ length: bars }, () => 20)
  )
  const rafRef = React.useRef<number>(0)
  const range = intensityRange[intensity]

  React.useEffect(() => {
    if (!playing) {
      // Settle to low bars
      setHeights(Array.from({ length: bars }, () => 8))
      return
    }

    let frame = 0
    function animate() {
      frame++
      setHeights((prev) =>
        prev.map((h, i) => {
          // Create wave pattern using sin with offset per bar
          const wave = Math.sin(frame * 0.08 + i * 0.4) * 0.5 + 0.5
          const noise = Math.random() * 0.3
          const target = range.min + (range.max - range.min) * (wave + noise) / 1.3
          // Smooth interpolation
          return h + (target - h) * 0.15
        })
      )
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, bars, range.min, range.max])

  return (
    <div
      data-slot="tron-waveform"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-3 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-foreground/80">
            {label}
          </span>
          <span className={cn("text-[9px] uppercase tracking-widest", playing ? "text-green-500" : "text-foreground/40")}>
            {playing ? "LIVE" : "IDLE"}
          </span>
        </div>
      )}

      <div className="flex items-end justify-center gap-[2px]" style={{ height: 48 }}>
        {heights.map((h, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-t-sm transition-[height] duration-75",
              variantColor[variant],
              playing && variantGlow[variant]
            )}
            style={{
              height: `${Math.max(4, h)}%`,
              opacity: playing ? 0.6 + (h / 100) * 0.4 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
