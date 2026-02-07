"use client"

import * as React from "react"
import { LightCycleEngine, type Direction, type GamePhase, type BikeConfig } from "./light-cycle-engine"
import { useTheme, themes } from "@/components/theme/theme-provider"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

export interface LightCycleGameProps {
  className?: string
  autoPlay?: boolean
  width?: number
  height?: number
  rivals?: number // 1-4 AI opponents
  tickRate?: number // ticks per second (speed)
  onGameEnd?: (winner: "player" | "ai" | "draw") => void
  onPhaseChange?: (phase: GamePhase) => void
}

const GRID_SIZE = 80
const COUNTDOWN_SECONDS = 3

// AI bike starting positions spread across the arena
const AI_SPAWNS: { x: number; y: number; direction: Direction }[] = [
  { x: 15, y: 15, direction: "down" },
  { x: 65, y: 15, direction: "down" },
  { x: 15, y: 65, direction: "up" },
  { x: 65, y: 65, direction: "up" },
]

function getThemeColors(currentThemeId: string, rivalCount: number) {
  const current = themes.find((t) => t.id === currentThemeId)
  const playerColor = current?.color ?? "#00d4ff"

  const others = themes.filter((t) => t.id !== currentThemeId)
  const shuffled = others.sort(() => Math.random() - 0.5)
  const aiColors = shuffled.slice(0, rivalCount).map((t) => t.color)

  // Fill remaining with fallback colors if needed
  const fallbacks = ["#ff3333", "#ff6600", "#ffd700", "#0066ff"]
  while (aiColors.length < rivalCount) {
    aiColors.push(fallbacks[aiColors.length % fallbacks.length])
  }

  return { playerColor, aiColors }
}

function createEngine(playerColor: string, aiColors: string[]) {
  const configs: BikeConfig[] = [
    { x: 40, y: 65, direction: "up", color: playerColor },
    ...aiColors.map((color, i) => ({
      ...AI_SPAWNS[i % AI_SPAWNS.length],
      color,
    })),
  ]
  return new LightCycleEngine(GRID_SIZE, configs)
}

export const LightCycleGame = React.memo(function LightCycleGame({
  className,
  autoPlay = false,
  width = 600,
  height = 600,
  rivals = 2,
  tickRate = 10,
  onGameEnd,
  onPhaseChange,
}: LightCycleGameProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const engineRef = React.useRef<LightCycleEngine | null>(null)
  const particlesRef = React.useRef<Particle[]>([])
  const lastTickRef = React.useRef(0)
  const countdownRef = React.useRef(0)
  const countdownStartRef = React.useRef(0)
  const animFrameRef = React.useRef(0)
  const autoRestartTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevPhaseRef = React.useRef<GamePhase>("ready")

  // Keep rivals/tickRate in refs so the game loop always reads the latest values
  const rivalsRef = React.useRef(rivals)
  const tickRateRef = React.useRef(tickRate)
  rivalsRef.current = rivals
  tickRateRef.current = tickRate

  const { theme } = useTheme()

  // Initialize engine
  React.useEffect(() => {
    const { playerColor, aiColors } = getThemeColors(theme, rivalsRef.current)
    engineRef.current = createEngine(playerColor, aiColors)

    if (autoPlay) {
      startCountdown()
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      if (autoRestartTimerRef.current) clearTimeout(autoRestartTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Rebuild engine when rivals change (only between games)
  React.useEffect(() => {
    const engine = engineRef.current
    if (!engine) return
    // Only rebuild if we're in ready state (not mid-game)
    if (engine.phase !== "ready" && engine.phase !== "gameover") return
    const { playerColor, aiColors } = getThemeColors(theme, rivals)
    engineRef.current = createEngine(playerColor, aiColors)
    particlesRef.current = []
  }, [rivals, theme])

  // Update player color on theme change
  React.useEffect(() => {
    const engine = engineRef.current
    if (!engine) return
    const current = themes.find((t) => t.id === theme)
    if (current) {
      engine.updateBikeColor(0, current.color)
    }
  }, [theme])

  function startCountdown() {
    const engine = engineRef.current
    if (!engine) return
    engine.phase = "countdown"
    countdownRef.current = COUNTDOWN_SECONDS
    countdownStartRef.current = performance.now()
  }

  function startGame() {
    const engine = engineRef.current
    if (!engine) return
    engine.start()
    lastTickRef.current = performance.now()
  }

  function resetGame() {
    const { playerColor, aiColors } = getThemeColors(theme, rivalsRef.current)
    engineRef.current = createEngine(playerColor, aiColors)
    particlesRef.current = []
    if (autoRestartTimerRef.current) {
      clearTimeout(autoRestartTimerRef.current)
      autoRestartTimerRef.current = null
    }
    startCountdown()
  }

  // Keyboard input
  React.useEffect(() => {
    if (autoPlay) return

    function handleKeyDown(e: KeyboardEvent) {
      const engine = engineRef.current
      if (!engine) return

      const state = engine.getState()

      if (e.key === "Enter") {
        if (state.phase === "ready") {
          startCountdown()
        } else if (state.phase === "gameover") {
          resetGame()
        }
        return
      }

      if (state.phase !== "playing") return

      const keyMap: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      }

      const dir = keyMap[e.key]
      if (dir) {
        e.preventDefault()
        engine.setBikeDirection(0, dir)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, theme])

  // Main game/render loop
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle DPR for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const cellW = width / GRID_SIZE
    const cellH = height / GRID_SIZE

    function spawnDerezParticles(x: number, y: number, color: string) {
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20
        const speed = 1 + Math.random() * 3
        particlesRef.current.push({
          x: x * cellW + cellW / 2,
          y: y * cellH + cellH / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.floor(Math.random() * 15),
          color,
        })
      }
    }

    let prevAlive: boolean[] = []

    function gameLoop(now: number) {
      const engine = engineRef.current
      if (!engine) {
        animFrameRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const state = engine.getState()
      const currentTickInterval = 1000 / tickRateRef.current

      // Notify phase changes
      if (state.phase !== prevPhaseRef.current) {
        prevPhaseRef.current = state.phase
        onPhaseChange?.(state.phase)
      }

      // Handle countdown
      if (state.phase === "countdown") {
        const elapsed = now - countdownStartRef.current
        const remaining = COUNTDOWN_SECONDS - Math.floor(elapsed / 1000)
        countdownRef.current = remaining
        if (remaining <= 0) {
          startGame()
        }
      }

      // Handle game ticks
      if (state.phase === "playing") {
        const elapsed = now - lastTickRef.current
        if (elapsed >= currentTickInterval) {
          // Track alive states before tick
          prevAlive = state.bikes.map((b) => b.alive)

          engine.tick()

          // Auto-move player in autoPlay mode
          if (autoPlay) {
            const bike = engine.bikes[0]
            if (bike.alive) {
              const dirs: Direction[] = ["up", "down", "left", "right"]
              const opposite: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" }
              const safeDirs = dirs.filter((d) => {
                if (d === opposite[bike.direction]) return false
                const delta = { up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 } }
                const nx = bike.x + delta[d].dx
                const ny = bike.y + delta[d].dy
                if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return false
                for (const b of engine.bikes) {
                  for (const t of b.trail) {
                    if (t.x === nx && t.y === ny) return false
                  }
                }
                return true
              })
              if (safeDirs.length > 0) {
                let bestDir = safeDirs[0]
                let bestCount = 0
                for (const d of safeDirs) {
                  const delta = { up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 } }
                  let count = 0
                  let cx = bike.x, cy = bike.y
                  for (let s = 0; s < 15; s++) {
                    cx += delta[d].dx
                    cy += delta[d].dy
                    if (cx < 0 || cx >= GRID_SIZE || cy < 0 || cy >= GRID_SIZE) break
                    let blocked = false
                    for (const b of engine.bikes) {
                      for (const t of b.trail) {
                        if (t.x === cx && t.y === cy) { blocked = true; break }
                      }
                      if (blocked) break
                    }
                    if (blocked) break
                    count++
                  }
                  if (count > bestCount) {
                    bestCount = count
                    bestDir = d
                  }
                }
                if (Math.random() < 0.15 || !safeDirs.includes(bike.direction)) {
                  engine.setBikeDirection(0, bestDir)
                }
              }
            }
          }

          // Spawn particles for newly dead bikes
          const newState = engine.getState()
          for (let i = 0; i < newState.bikes.length; i++) {
            if (prevAlive[i] && !newState.bikes[i].alive) {
              spawnDerezParticles(newState.bikes[i].x, newState.bikes[i].y, newState.bikes[i].color)
            }
          }

          // Handle game over
          if (newState.phase === "gameover") {
            if (onGameEnd) {
              if (newState.winner === 0) onGameEnd("player")
              else if (newState.winner === -1) onGameEnd("draw")
              else onGameEnd("ai") // includes -2 (player dead)
            }
            if (autoPlay) {
              autoRestartTimerRef.current = setTimeout(() => {
                resetGame()
              }, 2000)
            }
          }

          lastTickRef.current = now
        }
      }

      // === RENDER ===
      if (!ctx) return

      // Background
      ctx.fillStyle = "#08080c"
      ctx.fillRect(0, 0, width, height)

      // Grid lines
      const bikes = engine.getState().bikes
      const primaryColor = bikes[0]?.color ?? "#00d4ff"

      ctx.strokeStyle = hexToRgba(primaryColor, 0.06)
      ctx.lineWidth = 0.5
      for (let i = 0; i <= GRID_SIZE; i++) {
        const x = i * cellW
        const y = i * cellH
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Major grid lines every 10 cells
      ctx.strokeStyle = hexToRgba(primaryColor, 0.12)
      ctx.lineWidth = 0.8
      for (let i = 0; i <= GRID_SIZE; i += 10) {
        const x = i * cellW
        const y = i * cellH
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Arena border
      ctx.strokeStyle = hexToRgba(primaryColor, 0.3)
      ctx.lineWidth = 2
      ctx.strokeRect(0, 0, width, height)

      // Draw trails
      ctx.save()
      for (const bike of bikes) {
        if (bike.trail.length === 0) continue
        ctx.shadowColor = bike.color
        ctx.shadowBlur = 8
        ctx.fillStyle = bike.alive ? bike.color : hexToRgba(bike.color, 0.3)

        for (const cell of bike.trail) {
          ctx.fillRect(cell.x * cellW, cell.y * cellH, cellW, cellH)
        }
      }
      ctx.restore()

      // Draw bike heads (brighter, larger glow)
      ctx.save()
      for (const bike of bikes) {
        if (!bike.alive) continue
        ctx.shadowColor = bike.color
        ctx.shadowBlur = 18
        ctx.fillStyle = "#ffffff"
        const headSize = cellW * 1.5
        const offset = (headSize - cellW) / 2
        ctx.fillRect(
          bike.x * cellW - offset,
          bike.y * cellH - offset,
          headSize,
          headSize
        )
        // Inner color
        ctx.shadowBlur = 12
        ctx.fillStyle = bike.color
        ctx.fillRect(bike.x * cellW, bike.y * cellH, cellW, cellH)
      }
      ctx.restore()

      // Draw particles
      ctx.save()
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life--

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = p.life / 45
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.fillStyle = hexToRgba(p.color, alpha)
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3)
      }
      ctx.restore()

      // Draw overlays
      const currentState = engine.getState()
      if (currentState.phase === "ready") {
        if (autoPlay) {
          drawOverlay(ctx, width, height, primaryColor, "INITIALIZING...")
        } else {
          // Just dim — the arena handles the ready overlay
          ctx.fillStyle = "rgba(0,0,0,0.6)"
          ctx.fillRect(0, 0, width, height)
        }
      } else if (currentState.phase === "countdown") {
        const num = Math.max(1, countdownRef.current)
        drawOverlay(ctx, width, height, primaryColor, String(num))
      } else if (currentState.phase === "gameover") {
        let text: string
        if (autoPlay) {
          const w = currentState.winner
          text = w !== null && w >= 0 ? `BIKE ${w + 1} WINS` : "DRAW"
        } else {
          if (currentState.winner === 0) text = "VICTORY"
          else if (currentState.winner === -1) text = "DRAW"
          else text = "" // Don't show canvas text — the arena handles the DEREZZED overlay
        }
        const sub = autoPlay ? "RESTARTING..." : (text ? "PRESS ENTER TO RESTART" : "")
        if (text || autoPlay) {
          drawOverlayWithSub(ctx, width, height, primaryColor, text, sub)
        } else {
          // Just dim the background for the external overlay
          ctx.fillStyle = "rgba(0,0,0,0.6)"
          ctx.fillRect(0, 0, width, height)
        }
      }

      animFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animFrameRef.current = requestAnimationFrame(gameLoop)

    return () => cancelAnimationFrame(animFrameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, autoPlay])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width, height, display: "block" }}
    />
  )
})

// --- Drawing helpers ---

function drawOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  text: string
) {
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0, 0, w, h)

  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 20
  ctx.fillStyle = color
  ctx.font = `bold ${Math.floor(w / 15)}px Orbitron, monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, w / 2, h / 2)
  ctx.restore()
}

function drawOverlayWithSub(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  text: string,
  sub: string
) {
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0, 0, w, h)

  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 20
  ctx.fillStyle = color
  ctx.font = `bold ${Math.floor(w / 12)}px Orbitron, monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, w / 2, h / 2 - 20)

  ctx.shadowBlur = 10
  ctx.font = `${Math.floor(w / 30)}px Orbitron, monospace`
  ctx.fillStyle = hexToRgba(color, 0.7)
  ctx.fillText(sub, w / 2, h / 2 + 30)
  ctx.restore()
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
