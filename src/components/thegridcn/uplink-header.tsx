"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface UplinkHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftText: string
  rightText?: string
  variant?: "cyan" | "orange" | "blue" | "purple" | "green" | "amber"
}

const variantStyles = {
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/5", text: "text-cyan-400", textMuted: "text-cyan-400/70" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/5", text: "text-orange-400", textMuted: "text-orange-400/70" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-400", textMuted: "text-blue-400/70" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-400", textMuted: "text-purple-400/70" },
  green: { border: "border-green-500/30", bg: "bg-green-500/5", text: "text-green-400", textMuted: "text-green-400/70" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-400", textMuted: "text-amber-400/70" },
}

export function UplinkHeader({
  leftText,
  rightText,
  variant = "cyan",
  className,
  ...props
}: UplinkHeaderProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y px-4 py-1.5 font-mono text-[10px] tracking-widest",
        styles.border,
        styles.bg,
        className
      )}
      {...props}
    >
      <span className={styles.text}>{leftText}</span>
      {rightText && <span className={styles.textMuted}>{rightText}</span>}
    </div>
  )
}
