"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  delay?: number
  children: React.ReactElement
  className?: string
}

export function Tooltip({ content, side = "top", delay = 200, children, className }: TooltipProps) {
  const [visible, setVisible] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  function show() {
    timerRef.current = setTimeout(() => setVisible(true), delay)
  }

  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  React.useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          data-slot="tron-tooltip"
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded border border-primary/30 bg-card/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/80 shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.1)] backdrop-blur-sm",
            positionClasses[side],
            className
          )}
        >
          {/* Corner ticks */}
          <span className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-primary/50" />
          <span className="pointer-events-none absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-primary/50" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-primary/50" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-primary/50" />
          {content}
        </span>
      )}
    </span>
  )
}
