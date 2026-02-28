"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DataStreamEntry {
  timestamp?: string
  text: string
  type?: "info" | "warning" | "error" | "success"
}

interface DataStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: DataStreamEntry[]
  title?: string
  maxVisible?: number
  streaming?: boolean
}

const typeColor: Record<string, string> = {
  info: "text-primary",
  warning: "text-amber-500",
  error: "text-red-500",
  success: "text-green-500",
}

const typeDot: Record<string, string> = {
  info: "bg-primary",
  warning: "bg-amber-500",
  error: "bg-red-500",
  success: "bg-green-500",
}

export function DataStream({
  entries,
  title = "DATA STREAM",
  maxVisible = 8,
  streaming = true,
  className,
  ...props
}: DataStreamProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [visibleEntries, setVisibleEntries] = React.useState<DataStreamEntry[]>([])

  // Staggered entry reveal
  React.useEffect(() => {
    setVisibleEntries([])
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= entries.length) {
        clearInterval(interval)
        return
      }
      setVisibleEntries((prev) => [...prev, entries[idx]])
      idx++
    }, 300)
    return () => clearInterval(interval)
  }, [entries])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleEntries])

  return (
    <div
      data-slot="tron-data-stream"
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
        {streaming && (
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
        )}
        <span className="text-[10px] uppercase tracking-widest text-foreground/80">
          {title}
        </span>
        <span className="ml-auto font-mono text-[10px] text-foreground/40">
          {visibleEntries.length}/{entries.length}
        </span>
      </div>

      {/* Entries */}
      <div
        ref={scrollRef}
        className="space-y-0 overflow-y-auto font-mono text-xs"
        style={{ maxHeight: maxVisible * 28 }}
      >
        {visibleEntries.map((entry, i) => {
          const type = entry.type ?? "info"
          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-2 border-b border-border/20 px-4 py-1.5",
                "animate-[fadeSlideIn_0.3s_ease-out]"
              )}
            >
              <div className={cn("mt-1.5 h-1 w-1 shrink-0 rounded-full", typeDot[type])} />
              {entry.timestamp && (
                <span className="shrink-0 text-foreground/40">{entry.timestamp}</span>
              )}
              <span className={cn("leading-relaxed", typeColor[type])}>{entry.text}</span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
