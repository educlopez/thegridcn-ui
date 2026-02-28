"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  size?: "sm" | "md" | "lg"
  label?: string
  variant?: "default" | "success" | "warning" | "danger"
  showValue?: boolean
  animated?: boolean
}

const sizeConfig = {
  sm: { dim: 80, stroke: 4, fontSize: 14, labelSize: "text-[8px]", tickR: 2 },
  md: { dim: 120, stroke: 5, fontSize: 20, labelSize: "text-[10px]", tickR: 3 },
  lg: { dim: 160, stroke: 6, fontSize: 28, labelSize: "text-xs", tickR: 4 },
}

const variantColor = {
  default: "var(--primary)",
  success: "rgb(34,197,94)",
  warning: "rgb(245,158,11)",
  danger: "rgb(239,68,68)",
}

const variantText = {
  default: "text-primary",
  success: "text-green-500",
  warning: "text-amber-500",
  danger: "text-red-500",
}

export function ProgressRing({
  value,
  size = "md",
  label,
  variant = "default",
  showValue = true,
  animated = true,
  className,
  ...props
}: ProgressRingProps) {
  const filterId = React.useId()
  const clamped = Math.max(0, Math.min(100, value))
  const config = sizeConfig[size]
  const radius = (config.dim - config.stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const center = config.dim / 2
  const color = variantColor[variant]

  // Animate from 0 to target value on mount
  const [displayValue, setDisplayValue] = React.useState(animated ? 0 : clamped)
  const [mounted, setMounted] = React.useState(!animated)

  React.useEffect(() => {
    if (!animated) {
      setDisplayValue(clamped)
      return
    }
    // Trigger mount animation on next frame
    const raf = requestAnimationFrame(() => {
      setMounted(true)
      setDisplayValue(clamped)
    })
    return () => cancelAnimationFrame(raf)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update display value when prop changes (after initial mount)
  React.useEffect(() => {
    if (mounted) setDisplayValue(clamped)
  }, [clamped, mounted])

  // Animate the counter number
  const [countValue, setCountValue] = React.useState(animated ? 0 : clamped)
  React.useEffect(() => {
    if (!animated) {
      setCountValue(clamped)
      return
    }
    const duration = 700
    const start = performance.now()
    const from = 0

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCountValue(Math.round(from + (clamped - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [clamped, animated])

  const offset = circumference - (displayValue / 100) * circumference

  // Outer tick marks ring
  const tickRadius = radius + config.stroke + config.tickR + 2
  const tickCount = 36

  return (
    <div
      data-slot="tron-progress-ring"
      className={cn("inline-flex flex-col items-center gap-1", className)}
      {...props}
    >
      <svg width={config.dim + config.tickR * 4 + 8} height={config.dim + config.tickR * 4 + 8}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${config.tickR * 2 + 4}, ${config.tickR * 2 + 4})`}>
          {/* Rotating tick marks ring */}
          <g className="animate-[spin_30s_linear_infinite]" style={{ transformOrigin: `${center}px ${center}px` }}>
            {Array.from({ length: tickCount }, (_, i) => {
              const angle = (i * 360) / tickCount
              const rad = (angle * Math.PI) / 180
              const isMajor = i % 9 === 0
              const len = isMajor ? config.tickR * 2 : config.tickR
              const innerR = tickRadius - len
              return (
                <line
                  key={i}
                  x1={center + innerR * Math.cos(rad)}
                  y1={center + innerR * Math.sin(rad)}
                  x2={center + tickRadius * Math.cos(rad)}
                  y2={center + tickRadius * Math.sin(rad)}
                  stroke={color}
                  strokeWidth={isMajor ? 1.5 : 0.5}
                  opacity={isMajor ? 0.6 : 0.2}
                />
              )
            })}
          </g>

          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-foreground/10"
          />

          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={`url(#${CSS.escape(filterId)})`}
            transform={`rotate(-90 ${center} ${center})`}
            className="transition-all duration-700 ease-out"
          />

          {/* Pulsing glow arc (duplicate, thicker, lower opacity) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke * 3}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            className="animate-pulse transition-all duration-700 ease-out"
            opacity={0.1}
          />

          {/* Center text */}
          {showValue && (
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="central"
              className={cn("font-mono font-bold", variantText[variant])}
              fill="currentColor"
              fontSize={config.fontSize}
            >
              {countValue}%
            </text>
          )}
        </g>
      </svg>

      {label && (
        <span
          className={cn(
            "uppercase tracking-widest text-foreground/80",
            config.labelSize
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
