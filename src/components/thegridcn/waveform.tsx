"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  bars?: number
  playing?: boolean
  variant?: "default" | "success" | "warning" | "danger"
  label?: string
  intensity?: "low" | "medium" | "high"
  audioSrc?: string
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
  low: { min: 8, max: 28 },
  medium: { min: 10, max: 40 },
  high: { min: 14, max: 48 },
}

const CONTAINER_HEIGHT = 52

export function Waveform({
  bars = 24,
  playing = true,
  variant = "default",
  label,
  intensity = "medium",
  audioSrc,
  className,
  ...props
}: WaveformProps) {
  const [heights, setHeights] = React.useState<number[]>(() =>
    Array.from({ length: bars }, () => 4)
  )
  const rafRef = React.useRef<number>(0)
  const frameRef = React.useRef(0)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const range = intensityRange[intensity]

  React.useEffect(() => {
    if (!playing) {
      setHeights(Array.from({ length: bars }, () => 4))
      cancelAnimationFrame(rafRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    function animate() {
      frameRef.current++
      const f = frameRef.current
      setHeights(
        Array.from({ length: bars }, (_, i) => {
          const wave1 = Math.sin(f * 0.06 + i * 0.5) * 0.5 + 0.5
          const wave2 = Math.sin(f * 0.1 + i * 0.3 + 2) * 0.3 + 0.3
          const noise = Math.random() * 0.2
          const combined = (wave1 + wave2 + noise) / 1.5
          return range.min + (range.max - range.min) * combined
        })
      )
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [playing, bars, range.min, range.max, audioSrc])

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
          <span className={cn("text-[9px] uppercase tracking-widest", playing ? "text-green-500 animate-pulse" : "text-foreground/40")}>
            {playing ? "LIVE" : "IDLE"}
          </span>
        </div>
      )}

      <div
        className="flex items-end justify-center gap-[2px]"
        style={{ height: CONTAINER_HEIGHT }}
      >
        {heights.map((h, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-t-sm",
              variantColor[variant],
              playing && variantGlow[variant]
            )}
            style={{
              height: Math.max(2, h),
              opacity: playing ? 0.5 + (h / CONTAINER_HEIGHT) * 0.5 : 0.2,
            }}
          />
        ))}
      </div>

      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      )}

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
