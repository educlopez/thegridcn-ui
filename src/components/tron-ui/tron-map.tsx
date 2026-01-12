"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TronMapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  variant?: "default" | "primary" | "danger" | "highlight"
  coordinates?: string
  showBeam?: boolean
}

export function TronMapMarker({
  label,
  variant = "default",
  coordinates,
  showBeam = false,
  className,
  ...props
}: TronMapMarkerProps) {
  const variantStyles = {
    default: {
      bg: "bg-muted/80",
      border: "border-muted-foreground/50",
      text: "text-foreground",
    },
    primary: {
      bg: "bg-cyan-500/20",
      border: "border-cyan-500",
      text: "text-cyan-500",
    },
    danger: {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-500",
    },
    highlight: {
      bg: "bg-primary/20",
      border: "border-primary",
      text: "text-primary",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)} {...props}>
      {/* Beam effect */}
      {showBeam && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 h-32 w-0.5 -translate-x-1/2",
            variant === "danger" && "bg-gradient-to-t from-red-500 to-transparent",
            variant === "primary" && "bg-gradient-to-t from-cyan-500 to-transparent",
            variant === "highlight" && "bg-gradient-to-t from-primary to-transparent",
            variant === "default" && "bg-gradient-to-t from-muted-foreground to-transparent"
          )}
        />
      )}

      {/* Marker label */}
      <div
        className={cn(
          "relative rounded border px-3 py-1 font-mono text-sm font-bold uppercase tracking-wider",
          styles.bg,
          styles.border,
          styles.text
        )}
      >
        {/* Corner decorations */}
        <div className="absolute -left-px -top-px h-2 w-2 border-l border-t border-current opacity-50" />
        <div className="absolute -right-px -top-px h-2 w-2 border-r border-t border-current opacity-50" />
        <div className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-current opacity-50" />
        <div className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-current opacity-50" />

        {label}
      </div>

      {/* Pointer */}
      <div
        className={cn(
          "h-4 w-0.5",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Dot */}
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Coordinates */}
      {coordinates && (
        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
          {coordinates}
        </div>
      )}
    </div>
  )
}

interface TronCoordinateDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: number
  bearing?: string
  latitude?: string
  longitude?: string
  label?: string
}

export function TronCoordinateDisplay({
  heading = 0,
  bearing = "NE",
  latitude,
  longitude,
  label,
  className,
  ...props
}: TronCoordinateDisplayProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end font-mono text-sm",
        className
      )}
      {...props}
    >
      {/* Heading */}
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-primary">
          {heading}°
        </span>
        <span className="text-xs text-muted-foreground">{`${String(Math.floor(Math.random() * 200)).padStart(3, "0")}`}</span>
        <span className="font-bold text-primary">{bearing}</span>
      </div>

      {/* Lat/Long */}
      {(latitude || longitude) && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {latitude && <span>LAT {latitude}</span>}
          {latitude && longitude && <span> · </span>}
          {longitude && <span>LNG {longitude}</span>}
        </div>
      )}

      {/* Label */}
      {label && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
      )}
    </div>
  )
}

interface TronRadarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  targets?: { x: number; y: number; label?: string }[]
  sweepEnabled?: boolean
  sweepSpeed?: number
}

export function TronRadar({
  size = 200,
  targets = [],
  sweepEnabled = true,
  sweepSpeed = 3,
  className,
  ...props
}: TronRadarProps) {
  const [rotation, setRotation] = React.useState(0)

  React.useEffect(() => {
    if (!sweepEnabled) return

    let animationFrameId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Rotate based on sweepSpeed (degrees per second = 360 / sweepSpeed)
      const degreesPerMs = 360 / (sweepSpeed * 1000)
      setRotation((prev) => (prev + deltaTime * degreesPerMs) % 360)

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [sweepEnabled, sweepSpeed])

  // Calculate target visibility based on sweep position
  const getTargetOpacity = (targetX: number, targetY: number) => {
    // Convert target position to angle from center
    const dx = targetX - 50
    const dy = targetY - 50
    let targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
    if (targetAngle < 0) targetAngle += 360

    // Calculate angle difference
    let angleDiff = rotation - targetAngle
    if (angleDiff < 0) angleDiff += 360

    // Target is bright when sweep just passed, fades over 120 degrees
    if (angleDiff < 120) {
      return 1 - angleDiff / 120
    }
    return 0.15
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-full bg-background/80", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          {/* Sweep gradient */}
          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for targets */}
          <filter id="targetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for sweep */}
          <clipPath id="radarClip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </defs>

        {/* Background fill */}
        <circle
          cx="50"
          cy="50"
          r="48"
          className="fill-primary/5"
        />

        {/* Range circles */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          className="stroke-primary/30"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          className="stroke-primary/25"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="24"
          fill="none"
          className="stroke-primary/25"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="none"
          className="stroke-primary/25"
          strokeWidth="0.5"
        />

        {/* Crosshairs */}
        <line
          x1="50"
          y1="2"
          x2="50"
          y2="98"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />
        <line
          x1="2"
          y1="50"
          x2="98"
          y2="50"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />

        {/* Diagonal lines */}
        <line
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          className="stroke-primary/15"
          strokeWidth="0.5"
        />
        <line
          x1="85"
          y1="15"
          x2="15"
          y2="85"
          className="stroke-primary/15"
          strokeWidth="0.5"
        />

        {/* Sweep effect */}
        {sweepEnabled && (
          <g clipPath="url(#radarClip)">
            {/* Sweep trail (cone shape) */}
            <path
              d={`M 50 50 L 50 2 A 48 48 0 0 1 ${50 + 48 * Math.sin((45 * Math.PI) / 180)} ${50 - 48 * Math.cos((45 * Math.PI) / 180)} Z`}
              fill="url(#sweepGradient)"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "50px 50px",
              }}
            />

            {/* Sweep line */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="2"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "50px 50px",
                filter: "drop-shadow(0 0 2px var(--primary))",
              }}
            />
          </g>
        )}

        {/* Center dot */}
        <circle cx="50" cy="50" r="2.5" className="fill-primary" filter="url(#targetGlow)" />

        {/* Targets with dynamic opacity */}
        {targets.map((target, i) => {
          const opacity = sweepEnabled ? getTargetOpacity(target.x, target.y) : 0.8
          return (
            <g key={i} style={{ opacity: Math.max(0.15, opacity) }}>
              {/* Outer ring */}
              <circle
                cx={target.x}
                cy={target.y}
                r="5"
                fill="none"
                className="stroke-red-500"
                strokeWidth="0.75"
                style={{ opacity: opacity * 0.6 }}
              />
              {/* Inner dot */}
              <circle
                cx={target.x}
                cy={target.y}
                r="2"
                className="fill-red-500"
                filter={opacity > 0.5 ? "url(#targetGlow)" : undefined}
              />
              {/* Label */}
              {target.label && opacity > 0.3 && (
                <text
                  x={target.x + 7}
                  y={target.y + 1}
                  className="fill-red-500"
                  fontSize="6"
                  fontFamily="monospace"
                  style={{ opacity }}
                >
                  {target.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Outer ring (border) */}
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          className="stroke-primary"
          strokeWidth="1.5"
        />

        {/* Cardinal direction markers */}
        <text x="50" y="8" textAnchor="middle" className="fill-primary/60" fontSize="5" fontFamily="monospace">N</text>
        <text x="50" y="96" textAnchor="middle" className="fill-primary/60" fontSize="5" fontFamily="monospace">S</text>
        <text x="7" y="51.5" textAnchor="middle" className="fill-primary/60" fontSize="5" fontFamily="monospace">W</text>
        <text x="93" y="51.5" textAnchor="middle" className="fill-primary/60" fontSize="5" fontFamily="monospace">E</text>
      </svg>
    </div>
  )
}
