"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme"

// Complementary colors for each theme
const complementaryColors: Record<string, { border: string; bg: string; text: string; textMuted: string }> = {
  ares: { border: "border-cyan-500/30", bg: "bg-cyan-500/5", text: "text-cyan-400", textMuted: "text-cyan-400/70" },
  tron: { border: "border-orange-500/30", bg: "bg-orange-500/5", text: "text-orange-400", textMuted: "text-orange-400/70" },
  clu: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-400", textMuted: "text-blue-400/70" },
  athena: { border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-400", textMuted: "text-purple-400/70" },
  aphrodite: { border: "border-green-500/30", bg: "bg-green-500/5", text: "text-green-400", textMuted: "text-green-400/70" },
  poseidon: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-400", textMuted: "text-amber-400/70" },
}

// Uplink status bar - exactly like "UPLINK: ORBITAL RELAY CHANNEL 27A | RADAR CROSS SECTION"
interface UplinkHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftText: string
  rightText?: string
}

export function UplinkHeader({
  leftText,
  rightText,
  className,
  ...props
}: UplinkHeaderProps) {
  const { theme } = useTheme()
  const complementary = complementaryColors[theme] || complementaryColors.tron

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y px-4 py-1.5 font-mono text-[10px] tracking-widest",
        complementary.border,
        complementary.bg,
        className
      )}
      {...props}
    >
      <span className={complementary.text}>{leftText}</span>
      {rightText && <span className={complementary.textMuted}>{rightText}</span>}
    </div>
  )
}

// Arrival countdown panel - like "EVE KIM ARRIVAL: 00:38 MINUTES"
interface ArrivalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  time: string
  unit?: string
}

export function ArrivalPanel({
  title,
  subtitle,
  time,
  unit = "MINUTES",
  className,
  ...props
}: ArrivalPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Dot pattern decoration left */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      {/* Dot pattern decoration right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      <div className="px-12 py-4 text-center">
        {subtitle && (
          <div className="mb-1 font-mono text-[9px] tracking-widest text-muted-foreground">
            {subtitle}
          </div>
        )}
        <div className="font-mono text-sm tracking-wider text-foreground">
          {title}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span
            className="bg-red-500/90 px-4 py-1 font-mono text-xl font-bold tracking-wider text-white"
            style={{ textShadow: "0 0 10px rgba(239, 68, 68, 0.5)" }}
          >
            {time}
          </span>
          <span className="font-mono text-sm tracking-wider text-foreground">
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

// Large movie-style elapsed timer
interface MovieTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  primary: string
  secondary?: string
  label?: string
}

export function MovieTimer({
  primary,
  secondary,
  label = "ELAPSED",
  className,
  ...props
}: MovieTimerProps) {
  return (
    <div className={cn("text-center font-mono", className)} {...props}>
      <div className="flex items-baseline justify-center">
        <span
          className="text-5xl font-light tracking-[0.15em] text-foreground glow-text md:text-7xl lg:text-8xl"
        >
          {primary}
        </span>
        <span className="ml-4 text-lg tracking-[0.3em] text-muted-foreground md:text-xl lg:text-2xl">
          {label}
        </span>
      </div>
      {secondary && (
        <div
          className="mt-2 text-2xl tracking-[0.2em] text-primary/80 glow-text md:text-3xl lg:text-4xl"
        >
          {secondary}
        </div>
      )}
    </div>
  )
}

// "ANOMALY FOUND" amber banner
interface AnomalyAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

export function AnomalyAlert({
  text = "ANOMALY FOUND",
  className,
  ...props
}: AnomalyAlertProps) {
  return (
    <div
      className={cn(
        "inline-block bg-amber-500 px-8 py-2 font-mono text-lg font-bold tracking-[0.2em] text-black",
        className
      )}
      style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}
      {...props}
    >
      {text}
    </div>
  )
}

// Map marker with vertical beam - like "ARES", "ATHENA", "EVE" markers
interface BeamMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  sublabel?: string
  beamColor?: "red" | "cyan" | "amber" | "primary"
  coordinates?: string
}

export function BeamMarker({
  label,
  sublabel,
  beamColor = "red",
  coordinates,
  className,
  ...props
}: BeamMarkerProps) {
  const colors = {
    red: {
      beam: "from-red-500 to-transparent",
      bg: "bg-red-500/90",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    },
    cyan: {
      beam: "from-cyan-500 to-transparent",
      bg: "bg-cyan-500/90",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    },
    amber: {
      beam: "from-amber-500 to-transparent",
      bg: "bg-amber-500/90",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",
    },
    primary: {
      beam: "from-primary to-transparent",
      bg: "bg-primary/90",
      glow: "shadow-[0_0_20px_var(--primary)]",
    },
  }

  const color = colors[beamColor]

  return (
    <div className={cn("relative flex flex-col items-center", className)} {...props}>
      {/* Vertical beam */}
      <div
        className={cn("h-24 w-0.5 bg-gradient-to-t", color.beam)}
        style={{ filter: "blur(1px)" }}
      />

      {/* Label box */}
      <div
        className={cn(
          "relative px-4 py-1 font-mono text-sm font-bold tracking-wider text-white",
          color.bg,
          color.glow
        )}
      >
        {label}
        {/* Corner brackets */}
        <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-white/50" />
        <div className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-white/50" />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-white/50" />
        <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-white/50" />
      </div>

      {/* Sublabel */}
      {sublabel && (
        <div className="mt-1 font-mono text-[9px] tracking-widest text-muted-foreground">
          {sublabel}
        </div>
      )}

      {/* Pointer line */}
      <div className={cn("h-4 w-0.5", beamColor === "cyan" ? "bg-cyan-500" : "bg-red-500")} />

      {/* Coordinates */}
      {coordinates && (
        <div className="mt-1 font-mono text-[8px] text-muted-foreground">
          {coordinates}
        </div>
      )}
    </div>
  )
}

// De-resolution countdown - like "TIME TO DE-RESOLUTION: 16:48"
interface DerezCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  time: string
  milliseconds?: string
}

export function DerezCountdown({
  time,
  milliseconds,
  className,
  ...props
}: DerezCountdownProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end font-mono",
        className
      )}
      {...props}
    >
      <span className="text-[9px] tracking-widest text-primary/70">
        TIME TO DE-RESOLUTION
      </span>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold tracking-wider text-primary [text-shadow:0_0_2px_oklch(from_var(--primary)_l_c_h/0.3),0_0_4px_oklch(from_var(--primary)_l_c_h/0.3)]">
          {time}
        </span>
        {milliseconds && (
          <span className="ml-0.5 text-lg text-primary/70">-{milliseconds}</span>
        )}
      </div>
    </div>
  )
}

// Regen indicator - ">>> REGEN <<<"
export function RegenIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 font-mono text-sm tracking-widest text-cyan-500",
        className
      )}
    >
      <span className="animate-pulse">&gt;&gt;&gt;</span>
      <span>REGEN</span>
      <span className="animate-pulse">&lt;&lt;&lt;</span>
    </div>
  )
}

// Speed indicator with arrow
interface SpeedDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  speed: number
  direction?: "up" | "down"
}

export function SpeedDisplay({
  speed,
  direction = "up",
  className,
  ...props
}: SpeedDisplayProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-1 font-mono", className)}
      {...props}
    >
      <span
        className="text-3xl font-bold text-amber-500"
        style={{ textShadow: "0 0 15px rgba(245, 158, 11, 0.4)" }}
      >
        {speed}
      </span>
      <span className="text-2xl text-amber-500">
        {direction === "up" ? "↑" : "↓"}
      </span>
    </div>
  )
}

// Progress timeline with markers - like the bottom bar in analysis view
interface TimelineBarProps extends React.HTMLAttributes<HTMLDivElement> {
  markers: { id: string; position: number; active?: boolean }[]
  progress: number
  leftLabel?: string
  rightLabel?: string
}

export function TimelineBar({
  markers,
  progress,
  leftLabel,
  rightLabel,
  className,
  ...props
}: TimelineBarProps) {
  return (
    <div className={cn("font-mono", className)} {...props}>
      {/* Main bar */}
      <div className="relative h-6 border border-border/50 bg-card/30">
        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full bg-primary/20"
          style={{ width: `${progress}%` }}
        />

        {/* Progress indicator (red line) */}
        <div
          className="absolute top-0 h-full w-1 bg-red-500"
          style={{ left: `${progress}%` }}
        />

        {/* Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute top-0 flex h-full flex-col items-center justify-center"
            style={{ left: `${marker.position}%` }}
          >
            <div
              className={cn(
                "h-3 w-px",
                marker.active ? "bg-primary" : "bg-muted-foreground/50"
              )}
            />
            <span className="absolute -bottom-4 text-[8px] text-muted-foreground">
              {marker.id}
            </span>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="mt-1 flex items-center justify-between text-[9px] text-muted-foreground">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

// Data field with vertical line - like the dossier cards
interface DataFieldProps {
  label: string
  value: string
  highlighted?: boolean
}

export function DataField({ label, value, highlighted }: DataFieldProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-1 h-full w-0.5 self-stretch bg-primary/50" />
      <div>
        <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
          {label}
        </div>
        <div
          className={cn(
            "font-mono text-sm tracking-wider",
            highlighted ? "text-amber-500" : "text-foreground"
          )}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

// Dossier card - like "AJAY SINGH" profile
interface DossierCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  name: string
  fields: { label: string; value: string; highlighted?: boolean }[]
}

export function DossierCard({
  category,
  name,
  fields,
  className,
  ...props
}: DossierCardProps) {
  return (
    <div
      className={cn(
        "relative border border-primary/30 bg-background/80 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {/* Category header */}
      <div className="border-b border-primary/20 px-4 py-2">
        <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
          {category}
        </div>
      </div>

      {/* Name with vertical line */}
      <div className="flex items-center gap-3 border-b border-primary/20 px-4 py-3">
        <div className="h-8 w-1 bg-primary" />
        <span
          className="font-mono text-xl font-bold tracking-wider text-foreground"
          style={{ textShadow: "0 0 20px var(--primary)" }}
        >
          {name}
        </span>
      </div>

      {/* Fields */}
      <div className="space-y-3 p-4">
        {fields.map((field, i) => (
          <DataField key={i} {...field} />
        ))}
      </div>
    </div>
  )
}

// Floating panel with depth effect - like the analysis view panels
interface FloatingWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: 1 | 2 | 3
}

export function FloatingWindow({
  depth = 1,
  children,
  className,
  ...props
}: FloatingWindowProps) {
  const depthStyles = {
    1: "opacity-100 scale-100",
    2: "opacity-80 scale-95 -translate-y-2",
    3: "opacity-60 scale-90 -translate-y-4",
  }

  return (
    <div
      className={cn(
        "border border-primary/30 bg-background/90 backdrop-blur-md transition-all",
        depthStyles[depth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Grid map overlay
export function GridMap({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {/* Main grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Secondary finer grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  )
}
