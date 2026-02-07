"use client"

import * as React from "react"
import { LightCycleGame } from "@/components/thegridcn/light-cycle-game"
import { HUDFrame, UplinkHeader, AnomalyBanner } from "@/components/thegridcn"
import { ThemeSwitcher } from "@/components/theme"
import type { GamePhase } from "@/components/thegridcn/light-cycle-engine"
import { cn } from "@/lib/utils"

interface Difficulty {
  id: string
  label: string
  rivals: number
  tickRate: number
  description: string
}

const DIFFICULTIES: Difficulty[] = [
  { id: "easy", label: "EASY", rivals: 1, tickRate: 8, description: "1 RIVAL / SLOW" },
  { id: "medium", label: "MEDIUM", rivals: 2, tickRate: 10, description: "2 RIVALS / NORMAL" },
  { id: "hard", label: "HARD", rivals: 3, tickRate: 13, description: "3 RIVALS / FAST" },
  { id: "insane", label: "INSANE", rivals: 4, tickRate: 16, description: "4 RIVALS / EXTREME" },
]

export function GameArena() {
  const [wins, setWins] = React.useState(0)
  const [elapsed, setElapsed] = React.useState(0)
  const [phase, setPhase] = React.useState<GamePhase>("ready")
  const [derezzed, setDerezzed] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState(DIFFICULTIES[1])
  const [gameKey, setGameKey] = React.useState(0)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const showReadyOverlay = phase === "ready" && !derezzed
  const playing = phase === "playing"

  const handleGameEnd = React.useCallback(
    (winner: "player" | "ai" | "draw") => {
      if (winner === "player") {
        setWins((w) => w + 1)
      } else if (winner === "ai") {
        setDerezzed(true)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    },
    []
  )

  const handlePhaseChange = React.useCallback((newPhase: GamePhase) => {
    setPhase(newPhase)
    if (newPhase === "playing") {
      setDerezzed(false)
      setElapsed(0)
      if (timerRef.current) clearInterval(timerRef.current)
      const start = Date.now()
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    }
    if (newPhase === "ready" || newPhase === "countdown") {
      setDerezzed(false)
      setElapsed(0)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const handleRestart = React.useCallback(() => {
    setDerezzed(false)
    setGameKey((k) => k + 1)
  }, [])

  // Listen for Enter key on overlays (ready + derezzed)
  React.useEffect(() => {
    if (!derezzed && !showReadyOverlay) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (derezzed) {
          handleRestart()
        }
        // For ready state, the game component itself handles Enter → countdown
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [derezzed, showReadyOverlay, handleRestart])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6">
      {/* Top HUD bar */}
      <div className="w-full max-w-[632px]">
        <UplinkHeader
          leftText="LIGHT CYCLE ARENA"
          rightText={`WINS: ${wins} ${playing ? `• ${formatTime(elapsed)}` : ""}`}
        />
      </div>

      {/* Difficulty selector */}
      <div className="flex items-center gap-1">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              if (!playing) setDifficulty(d)
            }}
            disabled={playing}
            className={cn(
              "relative px-3 py-1.5 font-mono text-[10px] tracking-widest transition-all",
              "border",
              difficulty.id === d.id
                ? "border-primary bg-primary/15 text-primary"
                : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-primary/70",
              playing && "cursor-not-allowed opacity-50"
            )}
          >
            {d.label}
            {difficulty.id === d.id && (
              <span className="absolute -bottom-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Difficulty description */}
      <div className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
        {difficulty.description}
      </div>

      {/* Game canvas in HUD frame */}
      <div className="relative inline-block">
        <HUDFrame label="GAME GRID">
          <LightCycleGame
            key={gameKey}
            width={600}
            height={600}
            rivals={difficulty.rivals}
            tickRate={difficulty.tickRate}
            onGameEnd={handleGameEnd}
            onPhaseChange={handlePhaseChange}
            className="max-w-full"
          />
        </HUDFrame>

        {/* READY overlay with AnomalyBanner */}
        {showReadyOverlay && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-8">
            <AnomalyBanner
              title="LIGHT CYCLE"
              subtitle="ENTER THE GRID"
            />
            <span className="font-mono text-[9px] tracking-widest text-amber-500/40">
              PRESS ENTER TO START
            </span>
          </div>
        )}

        {/* DEREZZED overlay with AnomalyBanner */}
        {derezzed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-8">
            <AnomalyBanner
              title="DEREZZED"
              subtitle="PROGRAM TERMINATED"
            />
            <button
              onClick={handleRestart}
              className="border border-amber-500/50 bg-amber-500/10 px-6 py-2.5 font-mono text-xs tracking-[0.3em] text-amber-500 transition-all hover:border-amber-500 hover:bg-amber-500/20"
            >
              RESTART CYCLE
            </button>
            <span className="font-mono text-[9px] tracking-widest text-amber-500/40">
              PRESS ENTER TO CONTINUE
            </span>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-muted-foreground">
        <span>ARROW KEYS / WASD TO STEER</span>
        <span className="text-primary/30">|</span>
        <span>ENTER TO START</span>
      </div>

      {/* Theme switcher */}
      <div className="mt-2">
        <ThemeSwitcher />
      </div>
    </main>
  )
}
