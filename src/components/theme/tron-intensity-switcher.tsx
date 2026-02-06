"use client"

import * as React from "react"
import { useTheme, tronIntensities, type TronIntensity } from "./theme-provider"
import { cn } from "@/lib/utils"

// Map for O(1) intensity lookups
const intensityById = new Map(tronIntensities.map((i) => [i.id, i]))
const intensityIndexById = new Map(tronIntensities.map((i, idx) => [i.id, idx]))

const intensityIcons: Record<TronIntensity, React.ReactNode> = {
  none: (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2" />
    </svg>
  ),
  light: (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
      <circle cx="12" cy="12" r="8" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  medium: (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" strokeWidth="1.5" opacity="0.5" />
      <circle cx="12" cy="12" r="9" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  heavy: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  ),
}

export function TronIntensitySwitcher() {
  const { tronIntensity, setTronIntensity } = useTheme()

  return (
    <div className="flex flex-wrap gap-2">
      {tronIntensities.map((i) => (
        <button
          key={i.id}
          onClick={() => setTronIntensity(i.id)}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300",
            "hover:glow-sm",
            tronIntensity === i.id
              ? "border-primary bg-primary/10 glow-sm"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <span
            className={cn(
              "transition-all duration-300 group-hover:scale-110",
              tronIntensity === i.id ? "text-primary" : "text-muted-foreground"
            )}
          >
            {intensityIcons[i.id]}
          </span>
          <span className="text-sm font-medium">{i.name}</span>
        </button>
      ))}
    </div>
  )
}

export function TronIntensitySwitcherCompact() {
  const { tronIntensity, setTronIntensity } = useTheme()

  return (
    <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
      {tronIntensities.map((i) => (
        <button
          key={i.id}
          onClick={() => setTronIntensity(i.id)}
          title={`${i.name} - ${i.description}`}
          className={cn(
            "relative rounded-md px-2 py-1 text-xs font-medium transition-all duration-300",
            tronIntensity === i.id
              ? "bg-primary/20 text-primary glow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {i.name}
        </button>
      ))}
    </div>
  )
}

export function TronIntensitySwitcherSlider() {
  const { tronIntensity, setTronIntensity } = useTheme()
  const currentIndex = intensityIndexById.get(tronIntensity) ?? 0
  const currentIntensity = tronIntensities[currentIndex]

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10)
    setTronIntensity(tronIntensities[index].id)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Tron Intensity</span>
        <span className="text-sm text-primary">{currentIntensity?.name}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max={tronIntensities.length - 1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
        />
        <div className="mt-1 flex justify-between px-0.5">
          {tronIntensities.map((i) => (
            <span key={i.id} className="text-[10px] text-muted-foreground">
              {i.name}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{currentIntensity?.description}</p>
    </div>
  )
}

export function TronIntensityToggle() {
  const { tronIntensity, setTronIntensity } = useTheme()

  const cycleIntensity = () => {
    const currentIndex = intensityIndexById.get(tronIntensity) ?? 0
    const nextIndex = (currentIndex + 1) % tronIntensities.length
    setTronIntensity(tronIntensities[nextIndex].id)
  }

  const currentIntensity = intensityById.get(tronIntensity)

  return (
    <button
      onClick={cycleIntensity}
      title={`Tron Intensity: ${currentIntensity?.name} - Click to cycle`}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300",
        "hover:glow-sm hover:border-primary",
        tronIntensity !== "none"
          ? "border-primary/50 bg-primary/10"
          : "border-border bg-card"
      )}
    >
      <span
        className={cn(
          "transition-all duration-300",
          tronIntensity !== "none" ? "text-primary" : "text-muted-foreground"
        )}
      >
        {intensityIcons[tronIntensity]}
      </span>
      <span className="text-sm font-medium">{currentIntensity?.name}</span>
    </button>
  )
}
