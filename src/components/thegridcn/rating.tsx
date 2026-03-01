"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
  showValue?: boolean
}

const sizeConfig: Record<string, { dim: number; gap: string; text: string }> = {
  sm: { dim: 12, gap: "gap-0.5", text: "text-[9px]" },
  md: { dim: 16, gap: "gap-1", text: "text-[10px]" },
  lg: { dim: 20, gap: "gap-1.5", text: "text-xs" },
}

const variantColors: Record<string, { active: string; glow: string }> = {
  default: { active: "text-primary", glow: "drop-shadow-[0_0_3px_var(--primary)]" },
  success: { active: "text-green-500", glow: "drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]" },
  warning: { active: "text-amber-500", glow: "drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]" },
  danger: { active: "text-red-500", glow: "drop-shadow-[0_0_3px_rgba(239,68,68,0.5)]" },
}

function DiamondIcon({ filled, dim, color, glow }: { filled: boolean; dim: number; color: string; glow: string }) {
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 16 16"
      className={cn(
        "transition-all duration-300",
        filled ? cn(color, glow) : "text-foreground/15"
      )}
    >
      <path
        d="M8 1l5 5-5 8-5-8 5-5z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Rating({
  value,
  max = 5,
  label,
  size = "md",
  variant = "default",
  showValue = false,
  className,
  ...props
}: RatingProps) {
  const config = sizeConfig[size]
  const colors = variantColors[variant]

  // Animate reveal
  const [revealedIdx, setRevealedIdx] = React.useState(-1)
  React.useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      setRevealedIdx(idx)
      idx++
      if (idx >= max) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [max])

  return (
    <div
      data-slot="tron-rating"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {label && (
        <span className={cn("font-mono uppercase tracking-widest text-foreground/40", config.text)}>
          {label}
        </span>
      )}
      <div className={cn("flex items-center", config.gap)}>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={cn(
              "transition-all duration-200",
              i <= revealedIdx ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
          >
            <DiamondIcon
              filled={i < value}
              dim={config.dim}
              color={colors.active}
              glow={colors.glow}
            />
          </span>
        ))}
      </div>
      {showValue && (
        <span className={cn("font-mono tabular-nums text-foreground/50", config.text)}>
          {value}/{max}
        </span>
      )}
    </div>
  )
}
