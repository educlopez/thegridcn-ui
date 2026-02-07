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

// --- AI Personality system ---

type AIPersonality = "hunter" | "waller" | "survivor" | "cutoff"

interface AIProfile {
  personality: AIPersonality
  floodLimit: number
  continuityBonus: number
  stickThreshold: number
  // Targeting
  targetRange: number
  targetStrength: number
  // Territory warfare
  territoryCutBonus: number  // bonus when stepping into player's reachable space
  parallelWallBonus: number  // bonus for running parallel to player nearby
  frontalBlockBonus: number  // bonus for blocking player's forward path
  // Wall hugging
  wallHugBonus: number
  // Rival avoidance
  rivalAvoidRange: number
  rivalAvoidStrength: number
  // Lookahead depth for trail avoidance
  trailLookahead: number
  // Easy mode
  randomSkipChance: number
}

const PERSONALITY_ORDER: AIPersonality[] = ["hunter", "waller", "survivor", "cutoff"]

function buildAIProfile(personality: AIPersonality, aiLevel: number): AIProfile {
  const s = Math.min(aiLevel / 3, 1) // 0..1 difficulty scale

  switch (personality) {
    case "hunter":
      // Chases player aggressively, closes distance, cuts into player territory
      return {
        personality,
        floodLimit: 60 + Math.round(90 * s),
        continuityBonus: 1.05 + 0.05 * s,
        stickThreshold: 0.5 + 0.15 * s,
        targetRange: 15 + Math.round(25 * s),
        targetStrength: 1.2 + 0.3 * s,
        territoryCutBonus: 1.3 + 0.4 * s,
        parallelWallBonus: 1.1 + 0.2 * s,
        frontalBlockBonus: 1.05 + 0.15 * s,
        wallHugBonus: 1.0,
        rivalAvoidRange: 6 + Math.round(4 * s),
        rivalAvoidStrength: 0.85,
        trailLookahead: 2 + Math.round(s),
        randomSkipChance: aiLevel < 1 ? 0.3 : 0,
      }
    case "waller":
      // Encloser — builds walls around the player to box them in
      return {
        personality,
        floodLimit: 50 + Math.round(100 * s),
        continuityBonus: 1.2 + 0.1 * s,
        stickThreshold: 0.6 + 0.15 * s,
        targetRange: 15 + Math.round(20 * s),
        targetStrength: 1.1 + 0.2 * s,
        territoryCutBonus: 1.3 + 0.35 * s,
        parallelWallBonus: 1.3 + 0.3 * s,
        frontalBlockBonus: 1.2 + 0.25 * s,
        wallHugBonus: 1.15 + 0.15 * s,
        rivalAvoidRange: 8 + Math.round(4 * s),
        rivalAvoidStrength: 0.8,
        trailLookahead: 2 + Math.round(s),
        randomSkipChance: aiLevel < 1 ? 0.35 : 0,
      }
    case "survivor":
      // Space squeezer — claims maximum territory to starve the player out
      return {
        personality,
        floodLimit: 80 + Math.round(70 * s),
        continuityBonus: 1.1 + 0.1 * s,
        stickThreshold: 0.55 + 0.2 * s,
        targetRange: 12 + Math.round(18 * s),
        targetStrength: 1.1 + 0.15 * s,
        territoryCutBonus: 1.25 + 0.35 * s,
        parallelWallBonus: 1.1 + 0.15 * s,
        frontalBlockBonus: 1.1 + 0.15 * s,
        wallHugBonus: 1.05 + 0.1 * s,
        rivalAvoidRange: 10 + Math.round(6 * s),
        rivalAvoidStrength: 0.75 - 0.05 * s,
        trailLookahead: 3 + Math.round(s),
        randomSkipChance: aiLevel < 1 ? 0.25 : 0,
      }
    case "cutoff":
      // Predicts player path and races ahead to block it with walls
      return {
        personality,
        floodLimit: 70 + Math.round(80 * s),
        continuityBonus: 1.08 + 0.07 * s,
        stickThreshold: 0.45 + 0.2 * s,
        targetRange: 20 + Math.round(20 * s),
        targetStrength: 1.25 + 0.35 * s,
        territoryCutBonus: 1.35 + 0.4 * s,
        parallelWallBonus: 1.15 + 0.2 * s,
        frontalBlockBonus: 1.3 + 0.3 * s,
        wallHugBonus: 1.05 + 0.08 * s,
        rivalAvoidRange: 5 + Math.round(5 * s),
        rivalAvoidStrength: 0.9,
        trailLookahead: 2 + Math.round(s * 2),
        randomSkipChance: aiLevel < 1 ? 0.3 : 0,
      }
  }
}

export class LightCycleEngine {
  readonly gridSize: number
  private initialConfigs: BikeConfig[]
  bikes: Bike[]
  phase: GamePhase
  winner: number | null
  private occupied: Set<string>
  private aiLevel: number
  private aiProfiles: AIProfile[]
  // Shared AI state computed once per tick
  private playerReachable: Set<string> = new Set()

  constructor(gridSize: number, configs: BikeConfig[], aiLevel: number = 1) {
    this.gridSize = gridSize
    this.initialConfigs = configs
    this.aiLevel = aiLevel
    this.bikes = []
    this.phase = "ready"
    this.winner = null
    this.occupied = new Set()
    this.aiProfiles = []
    for (let i = 1; i < configs.length; i++) {
      const personality = PERSONALITY_ORDER[(i - 1) % PERSONALITY_ORDER.length]
      this.aiProfiles.push(buildAIProfile(personality, aiLevel))
    }
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

    // Pre-compute player's reachable territory (shared by all AI bikes)
    this.computePlayerTerritory()

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

      // Trail collision
      if (this.occupied.has(cellKey(next.x, next.y))) {
        bike.alive = false
        continue
      }

      // Head-to-head collision
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

    // Check win condition
    const playerDead = !this.bikes[0].alive
    const aliveBikes = this.bikes.filter((b) => b.alive)
    if (playerDead || aliveBikes.length <= 1) {
      this.phase = "gameover"
      if (playerDead) {
        this.winner = -2
      } else if (aliveBikes.length === 1) {
        this.winner = this.bikes.indexOf(aliveBikes[0])
      } else {
        this.winner = -1
      }
    }
  }

  // Compute the set of cells the player can reach — AI uses this to invade/cut territory
  private computePlayerTerritory() {
    this.playerReachable = new Set()
    const player = this.bikes[0]
    if (!player.alive) return

    const limit = 200
    const queue: [number, number][] = [[player.x, player.y]]
    const startKey = cellKey(player.x, player.y)
    this.playerReachable.add(startKey)

    while (queue.length > 0 && this.playerReachable.size < limit) {
      const [cx, cy] = queue.shift()!
      for (const d of ALL_DIRECTIONS) {
        const delta = DELTA[d]
        const nx = cx + delta.dx
        const ny = cy + delta.dy
        if (nx < 0 || nx >= this.gridSize || ny < 0 || ny >= this.gridSize) continue
        const key = cellKey(nx, ny)
        if (this.playerReachable.has(key) || this.occupied.has(key)) continue
        this.playerReachable.add(key)
        if (this.playerReachable.size >= limit) break
        queue.push([nx, ny])
      }
    }
  }

  private runAI(bikeIndex: number) {
    const bike = this.bikes[bikeIndex]
    const profile = this.aiProfiles[bikeIndex - 1]
    const currentDir = bike.direction

    // Random skip (Easy only)
    if (profile.randomSkipChance > 0 && Math.random() < profile.randomSkipChance) {
      if (this.isDirectionSafe(bike, currentDir)) return
    }

    // Find all safe directions
    const safeDirs = ALL_DIRECTIONS.filter(
      (d) => d !== OPPOSITE[currentDir] && this.isDirectionSafe(bike, d)
    )

    if (safeDirs.length === 0) return

    const player = this.bikes[0]
    const playerDist = Math.abs(bike.x - player.x) + Math.abs(bike.y - player.y)
    const playerDelta = DELTA[player.direction]

    let bestDir = safeDirs[0]
    let bestScore = -1

    for (const d of safeDirs) {
      const delta = DELTA[d]
      const nx = bike.x + delta.dx
      const ny = bike.y + delta.dy

      // --- Base: reachable space ---
      let score = this.countReachable(nx, ny, profile.floodLimit)

      // --- Continuity bonus ---
      if (d === currentDir) {
        score *= profile.continuityBonus
      }

      // --- Territory invasion: bonus for stepping into player's reachable area ---
      if (profile.territoryCutBonus > 1.0 && player.alive) {
        if (this.playerReachable.has(cellKey(nx, ny))) {
          score *= profile.territoryCutBonus
        }
      }

      // --- Player targeting: move toward player's predicted path ---
      if (profile.targetRange > 0 && player.alive && playerDist <= profile.targetRange) {
        const lookAhead = profile.personality === "cutoff" ? 10 : 5
        const targetX = player.x + playerDelta.dx * lookAhead
        const targetY = player.y + playerDelta.dy * lookAhead
        const distBefore = Math.abs(bike.x - targetX) + Math.abs(bike.y - targetY)
        const distAfter = Math.abs(nx - targetX) + Math.abs(ny - targetY)
        if (distAfter < distBefore) {
          score *= profile.targetStrength
        }
        // Hunter: also bonus for closing direct distance
        if (profile.personality === "hunter") {
          const directAfter = Math.abs(nx - player.x) + Math.abs(ny - player.y)
          if (directAfter < playerDist) {
            score *= 1.0 + (profile.targetStrength - 1.0) * 0.5
          }
        }
      }

      // --- Parallel wall-building: run alongside player to create a blocking wall ---
      if (profile.parallelWallBonus > 1.0 && player.alive && playerDist <= 15) {
        const isParallel = d === player.direction || d === OPPOSITE[player.direction]
        // Check if we're on an adjacent lane (perpendicular distance is small)
        const perpDist = (player.direction === "up" || player.direction === "down")
          ? Math.abs(bike.x - player.x)
          : Math.abs(bike.y - player.y)
        if (isParallel && perpDist <= 5 && perpDist >= 1) {
          score *= profile.parallelWallBonus
        }
      }

      // --- Frontal blocking: if ahead of player, move perpendicular to build a wall ---
      if (profile.frontalBlockBonus > 1.0 && player.alive && playerDist <= 20) {
        const isAhead = this.isAheadOfPlayer(bike.x, bike.y, player)
        const isPerpendicular =
          ((player.direction === "up" || player.direction === "down") && (d === "left" || d === "right")) ||
          ((player.direction === "left" || player.direction === "right") && (d === "up" || d === "down"))
        if (isAhead && isPerpendicular) {
          score *= profile.frontalBlockBonus
        }
      }

      // --- Wall-hugging ---
      if (profile.wallHugBonus > 1.0) {
        const perpDirs = d === "up" || d === "down"
          ? ["left", "right"] as Direction[]
          : ["up", "down"] as Direction[]
        let adjacentWalls = 0
        for (const pd of perpDirs) {
          const pdelta = DELTA[pd]
          const ax = nx + pdelta.dx
          const ay = ny + pdelta.dy
          if (
            ax < 0 || ax >= this.gridSize || ay < 0 || ay >= this.gridSize ||
            this.occupied.has(cellKey(ax, ay))
          ) {
            adjacentWalls++
          }
        }
        if (adjacentWalls === 1) {
          score *= profile.wallHugBonus
        } else if (adjacentWalls === 2) {
          score *= profile.personality === "waller" ? profile.wallHugBonus * 0.95 : 0.85
        }
      }

      // --- Rival avoidance ---
      if (profile.rivalAvoidRange > 0) {
        for (let r = 1; r < this.bikes.length; r++) {
          if (r === bikeIndex || !this.bikes[r].alive) continue
          const rival = this.bikes[r]
          const rivalDist = Math.abs(bike.x - rival.x) + Math.abs(bike.y - rival.y)
          if (rivalDist <= profile.rivalAvoidRange) {
            const distAfter = Math.abs(nx - rival.x) + Math.abs(ny - rival.y)
            if (distAfter < rivalDist) {
              score *= profile.rivalAvoidStrength
            }
          }
        }
      }

      // --- Multi-cell trail lookahead: penalize if path ahead is short ---
      if (profile.trailLookahead > 1) {
        let lookX = nx
        let lookY = ny
        let clearAhead = 0
        for (let step = 0; step < profile.trailLookahead; step++) {
          lookX += delta.dx
          lookY += delta.dy
          if (lookX < 0 || lookX >= this.gridSize || lookY < 0 || lookY >= this.gridSize) break
          if (this.occupied.has(cellKey(lookX, lookY))) break
          clearAhead++
        }
        if (clearAhead < profile.trailLookahead) {
          // Path ahead is short — penalize proportionally
          score *= 0.5 + 0.5 * (clearAhead / profile.trailLookahead)
        }
      }

      if (score > bestScore) {
        bestScore = score
        bestDir = d
      }
    }

    // Stick with current direction if it's competitive
    if (safeDirs.includes(currentDir)) {
      const currentDelta = DELTA[currentDir]
      const cnx = bike.x + currentDelta.dx
      const cny = bike.y + currentDelta.dy
      let currentScore = this.countReachable(cnx, cny, profile.floodLimit)
      currentScore *= profile.continuityBonus

      // Add territory cut bonus to current direction too for fair comparison
      if (profile.territoryCutBonus > 1.0 && this.bikes[0].alive) {
        if (this.playerReachable.has(cellKey(cnx, cny))) {
          currentScore *= profile.territoryCutBonus
        }
      }

      if (currentScore >= bestScore * profile.stickThreshold) {
        return
      }
    }

    bike.nextDirection = bestDir
    bike.direction = bestDir
  }

  // Check if position (bx,by) is ahead of the player in their travel direction
  private isAheadOfPlayer(bx: number, by: number, player: Bike): boolean {
    switch (player.direction) {
      case "up": return by < player.y
      case "down": return by > player.y
      case "left": return bx < player.x
      case "right": return bx > player.x
    }
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
    // Check for head-on collision: another bike moving into the same cell
    for (const other of this.bikes) {
      if (other !== bike && other.alive) {
        const od = DELTA[other.direction]
        if (other.x + od.dx === nx && other.y + od.dy === ny) return false
      }
    }
    // Verify at least one exit exists from the next cell (avoid 1-cell dead ends)
    let hasExit = false
    for (const d of ALL_DIRECTIONS) {
      if (d === OPPOSITE[dir]) continue
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
