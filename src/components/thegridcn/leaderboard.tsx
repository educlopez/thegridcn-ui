"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { UplinkHeader } from "./uplink-header"
import type { LeaderboardEntry } from "@/lib/leaderboard"
import { themes } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils"

const GodAvatar3D = dynamic(
  () => import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
)

function CharacterAvatar({ character }: { character?: string }) {
  const theme = character ? themes.find((t) => t.id === character) : null
  if (!theme) {
    return <span className="inline-block h-5 w-5 rounded border border-primary/10 bg-primary/5" />
  }
  return (
    <div className="group relative h-5 w-5">
      <div
        className="h-5 w-5 overflow-hidden rounded"
        style={{ backgroundColor: `${theme.color}15` }}
      >
        <GodAvatar3D themeId={theme.id} color={theme.color} size={20} />
      </div>
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded border border-primary/30 bg-black/90 px-2 py-0.5 font-mono text-[9px] tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
        {theme.name.toUpperCase()}
      </span>
    </div>
  )
}

interface LeaderboardProps {
  refreshKey?: number
}

export function Leaderboard({ refreshKey = 0 }: LeaderboardProps) {
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setEntries(data.entries ?? [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  return (
    <div className="w-full">
      <UplinkHeader leftText="LEADERBOARD" rightText="TOP 10" />

      <div className="border-x border-b border-primary/20 bg-card/30">
        {/* Table header */}
        <div className="grid grid-cols-[3rem_2rem_1fr_5rem_5rem] gap-2 border-b border-primary/10 px-3 py-1.5 font-mono text-[9px] tracking-widest text-muted-foreground/60">
          <span>RANK</span>
          <span></span>
          <span>ALIAS</span>
          <span className="text-right">TIME</span>
          <span className="text-right">MODE</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6 font-mono text-[10px] tracking-widest text-muted-foreground/40">
            LOADING...
          </div>
        ) : entries.length === 0 ? (
          <div className="flex items-center justify-center py-6 font-mono text-[10px] tracking-widest text-muted-foreground/40">
            NO RECORDS FOUND
          </div>
        ) : (
          entries.map((entry, i) => (
            <div
              key={`${entry.alias}-${entry.time}-${i}`}
              className={cn(
                "grid grid-cols-[3rem_2rem_1fr_5rem_5rem] items-center gap-2 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors",
                i === 0
                  ? "bg-primary/10 text-primary"
                  : i < 3
                    ? "text-primary/80"
                    : "text-foreground/70",
                i < entries.length - 1 && "border-b border-primary/5"
              )}
            >
              <span className="text-muted-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CharacterAvatar character={entry.character} />
              <span className="font-bold">{entry.alias}</span>
              <span className="text-right">{formatTime(entry.time)}</span>
              <span className="text-right text-[9px] uppercase text-muted-foreground/60">
                {entry.difficulty}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
