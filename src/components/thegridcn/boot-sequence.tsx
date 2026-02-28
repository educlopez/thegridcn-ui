"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BootStep {
  label: string
  duration?: number
}

interface BootSequenceProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: BootStep[]
  title?: string
  onComplete?: () => void
  autoStart?: boolean
}

export function BootSequence({
  steps,
  title = "SYSTEM BOOT",
  onComplete,
  autoStart = true,
  className,
  ...props
}: BootSequenceProps) {
  const [currentStep, setCurrentStep] = React.useState(-1)
  const [stepStates, setStepStates] = React.useState<("pending" | "loading" | "done")[]>(
    steps.map(() => "pending")
  )
  const completedRef = React.useRef(false)

  React.useEffect(() => {
    if (!autoStart) return

    let idx = 0
    let cancelled = false

    function runStep() {
      if (cancelled || idx >= steps.length) return
      const step = steps[idx]
      const i = idx

      setCurrentStep(i)
      setStepStates((prev) => {
        const next = [...prev]
        next[i] = "loading"
        return next
      })

      setTimeout(() => {
        if (cancelled) return
        setStepStates((prev) => {
          const next = [...prev]
          next[i] = "done"
          return next
        })
        idx++
        if (idx < steps.length) {
          setTimeout(runStep, 150)
        } else if (!completedRef.current) {
          completedRef.current = true
          onComplete?.()
        }
      }, step.duration ?? 600)
    }

    const timer = setTimeout(runStep, 400)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [steps, autoStart, onComplete])

  const progress = steps.length
    ? Math.round((stepStates.filter((s) => s === "done").length / steps.length) * 100)
    : 0

  return (
    <div
      data-slot="tron-boot-sequence"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2">
        <span className="text-[10px] uppercase tracking-widest text-foreground/80">
          {title}
        </span>
        <span className="ml-auto font-mono text-[10px] text-primary tabular-nums">
          {progress}%
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-0 p-4 font-mono text-xs">
        {steps.map((step, i) => {
          const state = stepStates[i]
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 py-1 transition-opacity duration-300",
                state === "pending" && "opacity-30",
                state === "loading" && "opacity-100",
                state === "done" && "opacity-70"
              )}
            >
              {/* Status indicator */}
              <span className="w-4 shrink-0 text-center">
                {state === "done" && <span className="text-green-500">&#10003;</span>}
                {state === "loading" && <span className="animate-pulse text-primary">&#9679;</span>}
                {state === "pending" && <span className="text-foreground/20">&#9675;</span>}
              </span>

              <span className={cn(
                "uppercase tracking-wider",
                state === "loading" && "text-primary",
                state === "done" && "text-foreground/70",
                state === "pending" && "text-foreground/30"
              )}>
                {step.label}
              </span>

              {state === "done" && (
                <span className="ml-auto text-green-500/60">OK</span>
              )}
              {state === "loading" && (
                <span className="ml-auto animate-pulse text-primary/60">...</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="border-t border-border/50 px-4 py-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_6px_var(--primary)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
