"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[]
  width?: number
  height?: number
  variant?: "default" | "success" | "warning" | "danger"
  showArea?: boolean
  animated?: boolean
}

const variantStroke: Record<string, string> = {
  default: "var(--primary)",
  success: "rgb(34,197,94)",
  warning: "rgb(245,158,11)",
  danger: "rgb(239,68,68)",
}

export function Sparkline({
  data,
  width = 120,
  height = 32,
  variant = "default",
  showArea = true,
  animated = true,
  className,
  ...props
}: SparklineProps) {
  const filterId = React.useId()
  const stroke = variantStroke[variant]

  if (data.length < 2) return null

  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1
  const pad = 2

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (v - minVal) / range) * (height - pad * 2),
  }))

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const areaPath = linePath + ` L${width - pad},${height} L${pad},${height} Z`

  // Animate: draw the line from left to right
  const pathRef = React.useRef<SVGPathElement>(null)

  React.useEffect(() => {
    if (!animated || !pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    // Trigger animation
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 1s ease-out"
      path.style.strokeDashoffset = "0"
    })
  }, [animated, data])

  return (
    <div
      data-slot="tron-sparkline"
      className={cn("inline-block", className)}
      {...props}
    >
      <svg width={width} height={height}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {showArea && (
          <path d={areaPath} fill={stroke} opacity={0.08} />
        )}

        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${CSS.escape(filterId)})`}
        />

        {/* End dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={2.5}
          fill={stroke}
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}
