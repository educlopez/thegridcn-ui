"use client"

import * as React from "react"
import { UplinkHeader } from "./uplink-header"
import type { LeaderboardEntry } from "@/lib/leaderboard"
import { cn } from "@/lib/utils"

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
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem] gap-2 border-b border-primary/10 px-3 py-1.5 font-mono text-[9px] tracking-widest text-muted-foreground/60">
          <span>RANK</span>
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
                "grid grid-cols-[3rem_1fr_5rem_5rem] gap-2 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors",
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
