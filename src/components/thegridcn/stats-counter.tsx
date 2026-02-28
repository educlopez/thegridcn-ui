"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CounterItem {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface StatsCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CounterItem[]
  columns?: 2 | 3 | 4
}

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1200
          const start = performance.now()
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(value * eased))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-mono text-3xl font-bold tabular-nums text-foreground">
      {prefix}{display.toLocaleString()}{suffix}
    </div>
  )
}

export function StatsCounter({
  items,
  columns = 3,
  className,
  ...props
}: StatsCounterProps) {
  const gridCols: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }

  return (
    <div
      data-slot="tron-stats-counter"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className={cn("grid divide-x divide-border/30", gridCols[columns])}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <AnimatedNumber value={item.value} prefix={item.prefix} suffix={item.suffix} />
            <span className="text-[10px] uppercase tracking-widest text-foreground/50">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/30" />
    </div>
  )
}
