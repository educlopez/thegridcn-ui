export type Direction = "up" | "down" | "left" | "right"

export type GamePhase = "ready" | "countdown" | "playing" | "gameover"

export interface Bike {
  x: number
  y: number
  direction: Direction
  nextDirection: Direction
  trail: { x: number; y: number }[]
  alive: boolean
  color: string
}

export interface BikeConfig {
  x: number
  y: number
  direction: Direction
  color: string
}

export interface EngineState {
  bikes: Bike[]
  phase: GamePhase
  winner: number | null // bike index, -1 if draw, null if not over
}

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}

const DELTA: Record<Direction, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
}

const ALL_DIRECTIONS: Direction[] = ["up", "down", "left", "right"]

function cellKey(x: number, y: number): string {
  return `${x},${y}`
}

export class LightCycleEngine {
  readonly gridSize: number
  private initialConfigs: BikeConfig[]
  bikes: Bike[]
  phase: GamePhase
  winner: number | null
  private occupied: Set<string>

  constructor(gridSize: number, configs: BikeConfig[]) {
    this.gridSize = gridSize
    this.initialConfigs = configs
    this.bikes = []
    this.phase = "ready"
    this.winner = null
    this.occupied = new Set()
    this.initBikes()
  }

  private initBikes() {
    this.occupied.clear()
    this.bikes = this.initialConfigs.map((cfg) => {
      this.occupied.add(cellKey(cfg.x, cfg.y))
      return {
        x: cfg.x,
        y: cfg.y,
        direction: cfg.direction,
        nextDirection: cfg.direction,
        trail: [{ x: cfg.x, y: cfg.y }],
        alive: true,
        color: cfg.color,
      }
    })
  }

  reset() {
    this.phase = "ready"
    this.winner = null
    this.initBikes()
  }

  start() {
    this.phase = "playing"
  }

  setBikeDirection(bikeIndex: number, dir: Direction) {
    const bike = this.bikes[bikeIndex]
    if (!bike || !bike.alive) return
    // Prevent 180-degree reversal
    if (OPPOSITE[bike.direction] === dir) return
    bike.nextDirection = dir
  }

  updateBikeColor(bikeIndex: number, color: string) {
    const bike = this.bikes[bikeIndex]
    if (bike) bike.color = color
  }

  tick() {
    if (this.phase !== "playing") return

    // Apply queued directions
    for (const bike of this.bikes) {
      if (bike.alive) {
        bike.direction = bike.nextDirection
      }
    }

    // Run AI for non-player bikes (index > 0)
    for (let i = 1; i < this.bikes.length; i++) {
      if (this.bikes[i].alive) {
        this.runAI(i)
      }
    }

    // Move all alive bikes simultaneously
    const nextPositions: { x: number; y: number }[] = []
    for (const bike of this.bikes) {
      if (!bike.alive) {
        nextPositions.push({ x: bike.x, y: bike.y })
        continue
      }
      const delta = DELTA[bike.direction]
      nextPositions.push({ x: bike.x + delta.dx, y: bike.y + delta.dy })
    }

    // Check collisions for each bike
    for (let i = 0; i < this.bikes.length; i++) {
      const bike = this.bikes[i]
      if (!bike.alive) continue

      const next = nextPositions[i]

      // Wall collision
      if (next.x < 0 || next.x >= this.gridSize || next.y < 0 || next.y >= this.gridSize) {
        bike.alive = false
        continue
      }

      // Trail collision (check against existing occupied cells)
      if (this.occupied.has(cellKey(next.x, next.y))) {
        bike.alive = false
        continue
      }

      // Head-to-head collision (two bikes moving into the same cell)
      for (let j = 0; j < this.bikes.length; j++) {
        if (i === j || !this.bikes[j].alive) continue
        if (next.x === nextPositions[j].x && next.y === nextPositions[j].y) {
          bike.alive = false
          break
        }
      }
    }

    // Apply moves for surviving bikes
    for (let i = 0; i < this.bikes.length; i++) {
      const bike = this.bikes[i]
      if (!bike.alive) continue
      const next = nextPositions[i]
      bike.x = next.x
      bike.y = next.y
      bike.trail.push({ x: next.x, y: next.y })
      this.occupied.add(cellKey(next.x, next.y))
    }

    // Check win condition — game ends when player dies OR only 1 bike remains
    const playerDead = !this.bikes[0].alive
    const aliveBikes = this.bikes.filter((b) => b.alive)
    if (playerDead || aliveBikes.length <= 1) {
      this.phase = "gameover"
      if (playerDead) {
        // Player lost — winner is -2 to signal player elimination
        this.winner = -2
      } else if (aliveBikes.length === 1) {
        this.winner = this.bikes.indexOf(aliveBikes[0])
      } else {
        this.winner = -1 // draw
      }
    }
  }

  private runAI(bikeIndex: number) {
    const bike = this.bikes[bikeIndex]
    const currentDir = bike.direction

    // Check if current direction is safe
    const currentSafe = this.isDirectionSafe(bike, currentDir)

    // If safe, small chance to proactively turn toward open space
    if (currentSafe && Math.random() > 0.15) return

    // Find all safe directions (excluding opposite of current)
    const safeDirs = ALL_DIRECTIONS.filter(
      (d) => d !== OPPOSITE[currentDir] && this.isDirectionSafe(bike, d)
    )

    if (safeDirs.length === 0) {
      // No safe moves - bike will die next tick
      return
    }

    // Pick the direction with the most open space ahead
    let bestDir = safeDirs[0]
    let bestSpace = -1
    for (const d of safeDirs) {
      const space = this.countOpenSpace(bike, d)
      if (space > bestSpace) {
        bestSpace = space
        bestDir = d
      }
    }

    bike.nextDirection = bestDir
    bike.direction = bestDir
  }

  private isDirectionSafe(bike: Bike, dir: Direction): boolean {
    const delta = DELTA[dir]
    const nx = bike.x + delta.dx
    const ny = bike.y + delta.dy
    if (nx < 0 || nx >= this.gridSize || ny < 0 || ny >= this.gridSize) return false
    if (this.occupied.has(cellKey(nx, ny))) return false
    // Check if another alive bike is at that position
    for (const other of this.bikes) {
      if (other !== bike && other.alive && other.x === nx && other.y === ny) return false
    }
    return true
  }

  private countOpenSpace(bike: Bike, dir: Direction): number {
    const delta = DELTA[dir]
    let x = bike.x
    let y = bike.y
    let count = 0
    for (let i = 0; i < 15; i++) {
      x += delta.dx
      y += delta.dy
      if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) break
      if (this.occupied.has(cellKey(x, y))) break
      count++
    }
    return count
  }

  getState(): EngineState {
    return {
      bikes: this.bikes,
      phase: this.phase,
      winner: this.winner,
    }
  }
}
