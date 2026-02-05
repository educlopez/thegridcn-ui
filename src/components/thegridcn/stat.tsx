"use client"

import { cn } from "@/lib/utils"

interface StatProps {
  label: string
  value: string | number
  unit?: string
  direction?: "up" | "down" | "neutral"
}

export function Stat({ label, value, unit, direction }: StatProps) {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="text-[10px] uppercase tracking-widest text-foreground/80">
        {label}
      </span>
      <span
        className={cn(
          "text-lg font-bold",
          direction === "up" && "text-green-500",
          direction === "down" && "text-red-500",
          direction === "neutral" && "text-primary"
        )}
      >
        {direction === "up" && "▲"}
        {direction === "down" && "▼"}
        {value}
        {unit && <span className="ml-1 text-sm opacity-70">{unit}</span>}
      </span>
    </div>
  )
}
