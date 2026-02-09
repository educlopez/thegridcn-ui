"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { LightCycleGame } from "@/components/thegridcn/light-cycle-game"
import { HUDFrame, UplinkHeader, AnomalyBanner, Leaderboard, AliasInput } from "@/components/thegridcn"
import { toast } from "sonner"
import { selectableThemes, useTheme } from "@/components/theme"
import type { GamePhase } from "@/components/thegridcn/light-cycle-engine"
import { cn } from "@/lib/utils"

const GodAvatar3D = dynamic(
  () => import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
)

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
  const [showAliasInput, setShowAliasInput] = React.useState(false)
  const [leaderboardKey, setLeaderboardKey] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const elapsedRef = React.useRef(0)
  const sessionTokenRef = React.useRef<string | null>(null)
  const sessionPromiseRef = React.useRef<Promise<string | null> | null>(null)

  const { theme, setTheme } = useTheme()

  const showReadyOverlay = phase === "ready" && !derezzed
  const playing = phase === "playing"

  const handleGameEnd = React.useCallback(
    (winner: "player" | "ai" | "draw") => {
      if (winner === "player") {
        setWins((w) => w + 1)
        setShowAliasInput(true)
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
      elapsedRef.current = 0
      if (timerRef.current) clearInterval(timerRef.current)
      const start = Date.now()
      timerRef.current = setInterval(() => {
        const t = Math.floor((Date.now() - start) / 1000)
        elapsedRef.current = t
        setElapsed(t)
      }, 1000)

      // Request session token for anti-cheat validation
      sessionTokenRef.current = null
      sessionPromiseRef.current = fetch("/api/leaderboard/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty: difficulty.id }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const token = data?.token ?? null
          sessionTokenRef.current = token
          return token
        })
        .catch(() => {
          return null
        })
    }
    if (newPhase === "ready" || newPhase === "countdown") {
      setDerezzed(false)
      setElapsed(0)
      elapsedRef.current = 0
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [difficulty.id])

  const handleRestart = React.useCallback(() => {
    setDerezzed(false)
    setShowAliasInput(false)
    setPhase("ready")
    setGameKey((k) => k + 1)
  }, [])

  const handleAliasSubmit = React.useCallback(
    async (alias: string) => {
      setSubmitting(true)
      try {
        // Wait for session token if it hasn't arrived yet
        if (!sessionTokenRef.current && sessionPromiseRef.current) {
          await sessionPromiseRef.current
        }

        if (!sessionTokenRef.current) {
          toast.error("Session expired. Score not submitted.")
          setSubmitting(false)
          setShowAliasInput(false)
          return
        }

        const res = await fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            alias,
            time: elapsedRef.current,
            difficulty: difficulty.id,
            character: theme,
            token: sessionTokenRef.current,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const rankMsg = data.rank ? ` Rank #${data.rank}!` : ""
          toast.success(`Score submitted!${rankMsg}`)
          setLeaderboardKey((k) => k + 1)
        } else {
          const data = await res.json()
          toast.error(data.error ?? "Failed to submit score")
        }
      } catch {
        toast.error("Failed to submit score")
      } finally {
        setSubmitting(false)
        setShowAliasInput(false)
      }
    },
    [difficulty.id]
  )

  const handleAliasCancel = React.useCallback(() => {
    setShowAliasInput(false)
  }, [])

  // Listen for Enter key on overlays (ready + derezzed)
  React.useEffect(() => {
    if (!derezzed && !showReadyOverlay) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (derezzed) {
          handleRestart()
        }
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

      {/* Game canvas in HUD frame */}
      <div className="relative inline-block">
        <HUDFrame label="GAME GRID">
          <LightCycleGame
            key={gameKey}
            width={600}
            height={600}
            rivals={difficulty.rivals}
            tickRate={difficulty.tickRate}
            aiLevel={DIFFICULTIES.indexOf(difficulty)}
            onGameEnd={handleGameEnd}
            onPhaseChange={handlePhaseChange}
            className="max-w-full"
          />
        </HUDFrame>

        {/* READY overlay with AnomalyBanner + Character selector */}
        {showReadyOverlay && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 overflow-y-auto p-6">
            <AnomalyBanner
              title="LIGHT CYCLE"
              subtitle="ENTER THE GRID"
            />

            {/* Difficulty selector */}
            <div className="w-full max-w-[400px]">
              <div className="mb-1.5 text-center font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
                SELECT DIFFICULTY
              </div>
              <div className="flex items-center justify-center gap-1">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "relative px-3 py-1.5 font-mono text-[10px] tracking-widest transition-all",
                      "border",
                      difficulty.id === d.id
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-primary/70"
                    )}
                  >
                    {d.label}
                    {difficulty.id === d.id && (
                      <span className="absolute -bottom-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-1 text-center font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
                {difficulty.description}
              </div>
            </div>

            {/* Character selector */}
            <div className="w-full max-w-[400px]">
              <div className="mb-1.5 text-center font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
                SELECT IDENTITY
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {selectableThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "group relative flex flex-col items-center rounded border p-1.5 transition-all",
                      theme === t.id
                        ? "border-primary bg-primary/10"
                        : "border-primary/20 bg-card/20 hover:border-primary/50 hover:bg-card/40"
                    )}
                  >
                    {theme === t.id && (
                      <>
                        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-primary" />
                        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-primary" />
                        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary" />
                        <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary" />
                      </>
                    )}
                    <div
                      className={cn(
                        "relative mb-1 overflow-hidden rounded",
                        theme === t.id ? "ring-1 ring-primary/50" : ""
                      )}
                      style={{ backgroundColor: `${t.color}10` }}
                    >
                      <GodAvatar3D themeId={t.id} color={t.color} size={40} />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[7px] tracking-wider",
                        theme === t.id ? "text-primary" : "text-foreground"
                      )}
                    >
                      {t.name.toUpperCase()}
                    </span>
                    {theme === t.id && (
                      <span className="absolute -top-1 right-0.5 font-mono text-[7px] text-primary">
                        ●
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

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

        {/* WIN alias input overlay */}
        {showAliasInput && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70 p-8">
            <AnomalyBanner
              title="VICTORY"
              subtitle={`SURVIVED ${formatTime(elapsed)}`}
            />
            {submitting ? (
              <span className="font-mono text-[10px] tracking-widest text-primary/60">
                TRANSMITTING...
              </span>
            ) : (
              <AliasInput
                onSubmit={handleAliasSubmit}
                onCancel={handleAliasCancel}
              />
            )}
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-muted-foreground">
        <span>ARROW KEYS / WASD TO STEER</span>
        <span className="text-primary/30">|</span>
        <span>ENTER TO START</span>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-[632px]">
        <Leaderboard refreshKey={leaderboardKey} />
      </div>

    </main>
  )
}
