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
  private aiLevel: number // 0=Easy, 1=Medium, 2=Hard, 3=Insane

  constructor(gridSize: number, configs: BikeConfig[], aiLevel: number = 1) {
    this.gridSize = gridSize
    this.initialConfigs = configs
    this.aiLevel = aiLevel
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

    // Difficulty-based flood-fill limits
    const floodLimits = [40, 80, 120, 150]
    const floodLimit = floodLimits[this.aiLevel] ?? 80

    // Easy mode: 30% chance to skip evaluation and just go straight
    if (this.aiLevel < 1 && Math.random() < 0.3) {
      if (this.isDirectionSafe(bike, currentDir)) return
    }

    // Find all safe directions (not opposite, next cell safe, has at least one exit)
    const safeDirs = ALL_DIRECTIONS.filter(
      (d) => d !== OPPOSITE[currentDir] && this.isDirectionSafe(bike, d)
    )

    if (safeDirs.length === 0) return // no safe moves

    // Score each safe direction
    const player = this.bikes[0]
    const playerDist = Math.abs(bike.x - player.x) + Math.abs(bike.y - player.y)

    let bestDir = safeDirs[0]
    let bestScore = -1

    for (const d of safeDirs) {
      const delta = DELTA[d]
      const nx = bike.x + delta.dx
      const ny = bike.y + delta.dy

      // Base score: reachable cells via flood-fill
      let score = this.countReachable(nx, ny, floodLimit)

      // Continuity bonus: prefer going straight (reduces jitter)
      if (d === currentDir) {
        score *= 1.15
      }

      // Player targeting (Medium+): bias toward cutting off player
      if (this.aiLevel >= 2 && player.alive && playerDist <= 20) {
        const playerDelta = DELTA[player.direction]
        // Target where the player is heading
        const targetX = player.x + playerDelta.dx * 5
        const targetY = player.y + playerDelta.dy * 5
        const distBefore = Math.abs(bike.x - targetX) + Math.abs(bike.y - targetY)
        const distAfter = Math.abs(nx - targetX) + Math.abs(ny - targetY)
        if (distAfter < distBefore) {
          const strength = this.aiLevel >= 3 ? 1.25 : 1.12
          score *= strength
        }
      }

      // Wall-hugging bonus (Hard+): prefer directions with a wall/trail on one side
      if (this.aiLevel >= 2) {
        const perpDirs = d === "up" || d === "down"
          ? ["left", "right"] as Direction[]
          : ["up", "down"] as Direction[]
        let hasAdjacentWall = false
        for (const pd of perpDirs) {
          const pdelta = DELTA[pd]
          const ax = nx + pdelta.dx
          const ay = ny + pdelta.dy
          if (
            ax < 0 || ax >= this.gridSize || ay < 0 || ay >= this.gridSize ||
            this.occupied.has(cellKey(ax, ay))
          ) {
            hasAdjacentWall = true
            break
          }
        }
        if (hasAdjacentWall) {
          score *= 1.08
        }
      }

      if (score > bestScore) {
        bestScore = score
        bestDir = d
      }
    }

    // Only change direction if current is unsafe OR the best option is significantly better
    if (safeDirs.includes(currentDir)) {
      const currentDelta = DELTA[currentDir]
      const cnx = bike.x + currentDelta.dx
      const cny = bike.y + currentDelta.dy
      let currentScore = this.countReachable(cnx, cny, floodLimit)
      currentScore *= 1.15 // same continuity bonus

      // Stay on current direction if it's within 70% of the best
      if (currentScore >= bestScore * 0.7) {
        return
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
    // Verify at least one exit exists from the next cell (avoid 1-cell dead ends)
    let hasExit = false
    for (const d of ALL_DIRECTIONS) {
      if (d === OPPOSITE[dir]) continue // don't count going back
      const dd = DELTA[d]
      const ex = nx + dd.dx
      const ey = ny + dd.dy
      if (ex < 0 || ex >= this.gridSize || ey < 0 || ey >= this.gridSize) continue
      if (this.occupied.has(cellKey(ex, ey))) continue
      hasExit = true
      break
    }
    return hasExit
  }

  private countReachable(startX: number, startY: number, limit: number): number {
    const visited = new Set<string>()
    const queue: [number, number][] = [[startX, startY]]
    const startKey = cellKey(startX, startY)
    // Don't count start if it's occupied (shouldn't be, but guard)
    if (this.occupied.has(startKey)) return 0
    visited.add(startKey)

    while (queue.length > 0 && visited.size < limit) {
      const [cx, cy] = queue.shift()!
      for (const d of ALL_DIRECTIONS) {
        const delta = DELTA[d]
        const nx = cx + delta.dx
        const ny = cy + delta.dy
        if (nx < 0 || nx >= this.gridSize || ny < 0 || ny >= this.gridSize) continue
        const key = cellKey(nx, ny)
        if (visited.has(key) || this.occupied.has(key)) continue
        visited.add(key)
        if (visited.size >= limit) break
        queue.push([nx, ny])
      }
    }

    return visited.size
  }

  getState(): EngineState {
    return {
      bikes: this.bikes,
      phase: this.phase,
      winner: this.winner,
    }
  }
}
