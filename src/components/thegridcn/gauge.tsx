"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  min?: number
  max?: number
  label?: string
  unit?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
}

const sizeConfig = {
  sm: { dim: 100, stroke: 6, needle: 30, fontSize: 14, labelSize: "text-[8px]" },
  md: { dim: 150, stroke: 8, needle: 48, fontSize: 22, labelSize: "text-[10px]" },
  lg: { dim: 200, stroke: 10, needle: 65, fontSize: 30, labelSize: "text-xs" },
}

const variantColor: Record<string, string> = {
  default: "var(--primary)",
  success: "rgb(34,197,94)",
  warning: "rgb(245,158,11)",
  danger: "rgb(239,68,68)",
}

const variantText: Record<string, string> = {
  default: "text-primary",
  success: "text-green-500",
  warning: "text-amber-500",
  danger: "text-red-500",
}

function autoVariant(pct: number): "default" | "success" | "warning" | "danger" {
  if (pct >= 85) return "danger"
  if (pct >= 60) return "warning"
  return "default"
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  size = "md",
  variant,
  className,
  ...props
}: GaugeProps) {
  const filterId = React.useId()
  const config = sizeConfig[size]
  const center = config.dim / 2
  const radius = center - config.stroke - 4

  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const resolvedVariant = variant ?? autoVariant(pct)
  const color = variantColor[resolvedVariant]

  // Arc from -225deg to +45deg (270 degree sweep)
  const startAngle = -225
  const sweepAngle = 270
  const arcLength = (sweepAngle / 360) * 2 * Math.PI * radius
  const filledLength = (pct / 100) * arcLength
  const emptyLength = arcLength - filledLength

  // Needle angle
  const needleAngle = startAngle + (pct / 100) * sweepAngle

  // Animated value
  const [displayValue, setDisplayValue] = React.useState(0)
  const [needleDeg, setNeedleDeg] = React.useState(startAngle)

  React.useEffect(() => {
    const duration = 800
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(min + (value - min) * eased))
      setNeedleDeg(startAngle + (pct * eased / 100) * sweepAngle)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, min, pct, startAngle, sweepAngle])

  // Tick marks
  const tickCount = 9
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = startAngle + (i / (tickCount - 1)) * sweepAngle
    const rad = (angle * Math.PI) / 180
    const inner = radius - config.stroke - 2
    const outer = radius - 2
    return { angle, rad, inner, outer, major: i % 2 === 0 }
  })

  return (
    <div
      data-slot="tron-gauge"
      className={cn("inline-flex flex-col items-center gap-1", className)}
      {...props}
    >
      <svg width={config.dim} height={config.dim * 0.7}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(0, ${-config.dim * 0.15})`}>
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${2 * Math.PI * radius - arcLength}`}
            strokeDashoffset={-((2 * Math.PI * radius - arcLength) / 2 + arcLength)}
            className="text-foreground/10"
            transform={`rotate(${startAngle + sweepAngle} ${center} ${center})`}
          />

          {/* Filled arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={`${filledLength} ${2 * Math.PI * radius - filledLength}`}
            strokeDashoffset={-((2 * Math.PI * radius - arcLength) / 2 + arcLength)}
            transform={`rotate(${startAngle + sweepAngle} ${center} ${center})`}
            filter={`url(#${CSS.escape(filterId)})`}
            className="transition-all duration-700 ease-out"
          />

          {/* Glow arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke * 3}
            strokeLinecap="round"
            strokeDasharray={`${filledLength} ${2 * Math.PI * radius - filledLength}`}
            strokeDashoffset={-((2 * Math.PI * radius - arcLength) / 2 + arcLength)}
            transform={`rotate(${startAngle + sweepAngle} ${center} ${center})`}
            className="animate-pulse"
            opacity={0.08}
          />

          {/* Tick marks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={center + t.inner * Math.cos(t.rad)}
              y1={center + t.inner * Math.sin(t.rad)}
              x2={center + t.outer * Math.cos(t.rad)}
              y2={center + t.outer * Math.sin(t.rad)}
              stroke={color}
              strokeWidth={t.major ? 1.5 : 0.5}
              opacity={t.major ? 0.6 : 0.25}
            />
          ))}

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={center + config.needle * Math.cos((needleDeg * Math.PI) / 180)}
            y2={center + config.needle * Math.sin((needleDeg * Math.PI) / 180)}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            filter={`url(#${CSS.escape(filterId)})`}
          />

          {/* Center dot */}
          <circle cx={center} cy={center} r={3} fill={color} />

          {/* Value text */}
          <text
            x={center}
            y={center + config.needle * 0.45}
            textAnchor="middle"
            dominantBaseline="central"
            className={cn("font-mono font-bold", variantText[resolvedVariant])}
            fill="currentColor"
            fontSize={config.fontSize}
          >
            {displayValue}
            {unit && (
              <tspan fontSize={config.fontSize * 0.5} opacity={0.7}>
                {" "}{unit}
              </tspan>
            )}
          </text>
        </g>
      </svg>

      {label && (
        <span className={cn("uppercase tracking-widest text-foreground/80", config.labelSize)}>
          {label}
        </span>
      )}
    </div>
  )
}
