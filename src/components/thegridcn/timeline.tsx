"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  title: string
  description?: string
  date?: string
  status?: "completed" | "active" | "upcoming"
  icon?: React.ReactNode
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
  label?: string
}

const statusConfig: Record<string, { dot: string; glow: string; line: string }> = {
  completed: {
    dot: "bg-primary border-primary/60",
    glow: "shadow-[0_0_6px_var(--primary)]",
    line: "bg-primary/40",
  },
  active: {
    dot: "bg-primary border-primary",
    glow: "shadow-[0_0_10px_var(--primary)]",
    line: "bg-primary/20",
  },
  upcoming: {
    dot: "bg-foreground/10 border-foreground/20",
    glow: "",
    line: "bg-foreground/10",
  },
}

export function Timeline({
  items,
  label,
  className,
  ...props
}: TimelineProps) {
  const [revealedIdx, setRevealedIdx] = React.useState(-1)
  React.useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      setRevealedIdx(idx)
      idx++
      if (idx >= items.length) clearInterval(interval)
    }, 120)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div
      data-slot="tron-timeline"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="mb-4 text-[10px] uppercase tracking-widest text-foreground/50">
          {label}
        </div>
      )}

      <div className="relative space-y-0">
        {items.map((item, i) => {
          const status = item.status || "upcoming"
          const config = statusConfig[status]
          return (
            <div
              key={i}
              className={cn(
                "relative flex gap-4 pb-6 transition-all duration-400",
                i <= revealedIdx ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
            >
              {/* Timeline line + dot */}
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                    config.dot, config.glow,
                    status === "active" && "animate-pulse"
                  )}
                  style={{ animationDuration: "2s" }}
                >
                  {item.icon ? (
                    <span className="text-[10px]">{item.icon}</span>
                  ) : status === "completed" ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                    </svg>
                  ) : null}
                </div>
                {i < items.length - 1 && (
                  <div className={cn("mt-1 w-px flex-1", config.line)} />
                )}
              </div>

              {/* Content */}
              <div className="-mt-0.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-mono text-sm font-medium text-foreground/90">
                    {item.title}
                  </h4>
                  {item.date && (
                    <span className="font-mono text-[9px] text-foreground/30">
                      {item.date}
                    </span>
                  )}
                  {status === "active" && (
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-primary shadow-[0_0_4px_var(--primary)]">
                      CURRENT
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-1 text-xs leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
