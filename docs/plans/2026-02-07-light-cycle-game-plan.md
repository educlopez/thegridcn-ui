# Light Cycle Game Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Tron Light Cycle mini-game with theme-aware colors, accessible via `/game` route and the component explorer.

**Architecture:** Pure game engine class (no React) handles grid state, bike movement, collision, and AI. A React client component wraps it with Canvas rendering, keyboard input, and theme integration. Game page uses existing HUD components for immersive framing.

**Tech Stack:** TypeScript, HTML5 Canvas, React 19, Next.js App Router, existing theme system

---

### Task 1: Game Engine — Core Types and Class Shell

**Files:**
- Create: `src/components/thegridcn/light-cycle-engine.ts`

**What to build:**

The pure TypeScript game engine with types, constructor, reset, getState, setBikeDirection (with anti-180 guard), and tick (movement + collision detection). Also includes AI decision logic.

Key types:
- `Direction = 'up' | 'down' | 'left' | 'right'`
- `Bike = { x, y, direction, nextDirection, trail: {x,y}[], alive, color }`
- `GameState = 'ready' | 'playing' | 'gameover'`
- `BikeConfig = { x, y, direction, color }`

Grid: 80x80 cells. Occupancy tracked via a `Set<string>` storing `"x,y"` keys for O(1) collision lookups.

Starting positions:
- Player (index 0): x=40, y=65, direction='up'
- AI 1 (index 1): x=15, y=15, direction='down'
- AI 2 (index 2): x=65, y=15, direction='down'

AI logic per tick:
1. Check if current direction leads to collision
2. If unsafe, collect all safe directions
3. For each safe direction, count open cells ahead (scan up to 10 cells)
4. Pick direction with most open space
5. If currently safe, 15% random chance to turn toward most open space (avoids long straight predictable lines)

Anti-180 rule: `setBikeDirection` rejects opposite of current direction.

One queued direction per tick: `nextDirection` is set by input, applied at next `tick()`.

Collision check: before moving, compute next cell. If out of bounds OR in occupancy set OR another bike's current position → bike.alive = false.

`getState()` returns: `{ bikes, gameState, winner }` — winner is null during play, index of last alive bike on gameover, or -1 if simultaneous death.

---

### Task 2: React Game Component — Canvas Rendering & Input

**Files:**
- Create: `src/components/thegridcn/light-cycle-game.tsx`

**What to build:**

`"use client"` React component that:

1. Creates a `LightCycleEngine` instance via `useRef`
2. Renders a `<canvas>` element
3. Runs a game loop via `requestAnimationFrame` at fixed tick rate (~10 ticks/sec using tick accumulator pattern)
4. Listens for keyboard input (ArrowUp/W=up, ArrowDown/S=down, ArrowLeft/A=left, ArrowRight/D=right, Enter=start/restart)
5. Reads theme colors via `useTheme()` hook — player gets current theme color, AI bikes get 2 random other theme colors

**Props:**
```typescript
interface LightCycleGameProps {
  className?: string
  autoPlay?: boolean  // AI vs AI mode for component explorer preview
  width?: number
  height?: number
}
```

**Canvas rendering per frame:**
1. Clear with `#0a0a0f` background
2. Draw grid lines: thin lines every cell, slightly brighter lines every 10 cells. Color: `rgba(theme_primary, 0.06)` and `rgba(theme_primary, 0.12)`
3. Draw trails: iterate each bike's trail, draw filled rects with `shadowBlur: 8`, `shadowColor: bike.color`
4. Draw bike heads: brighter squares (2x cell size) with `shadowBlur: 15`
5. Derez particles: on death, spawn 15 particles that spread outward and fade over 30 frames

**Overlays (drawn on canvas):**
- `READY` state: "PRESS ENTER TO START" centered text (or "WATCHING..." in autoPlay)
- `PLAYING` state: no overlay
- `GAMEOVER` state: "DEREZZED" (if player died) or "VICTORY" (if player is last alive) + "PRESS ENTER TO RESTART". In autoPlay: auto-restart after 2 seconds.

**Canvas sizing:** Accepts width/height props, defaults to 600x600. Uses devicePixelRatio for crisp rendering on retina displays.

Export the component and also add it to `src/components/thegridcn/index.ts` barrel export (if one exists, otherwise skip barrel).

---

### Task 3: Game Page Route

**Files:**
- Create: `src/app/game/page.tsx`

**What to build:**

The `/game` route page with:

1. `TronHeader` at top (standard navigation)
2. Full viewport layout, dark background, centered content, no scroll (`min-h-screen`, `overflow-hidden`)
3. `UplinkHeader` with leftText="LIGHT CYCLE ARENA" and rightText showing wins (e.g., "WINS: 3")
4. `HUDFrame` wrapping the `LightCycleGame` component
5. Controls hint below: "ARROW KEYS / WASD TO STEER • ENTER TO START" in mono font, muted color
6. Elapsed time display using a simple timer (not DerezTimer to keep deps light — just a `<span>` with font-mono showing elapsed seconds)
7. Theme switcher in corner via existing `ThemeSwitcher` component

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: "Light Cycle Arena | The Gridcn",
  description: "Enter the Grid. Race your light cycle against AI opponents in this Tron-inspired mini-game. Choose your theme, leave your trail, and be the last program standing.",
}
```

The page itself is a server component. The game canvas area is wrapped in a client component for interactivity (state for wins counter, timer, etc).

---

### Task 4: Navigation & Component Registry Updates

**Files:**
- Modify: `src/components/layout/tron-header.tsx` — add GAME nav item
- Modify: `src/lib/component-data.ts` — add light-cycle-game entry
- Modify: `src/components/components-page/previews/tron-movie-previews.tsx` — add preview
- Modify: `src/components/components-page/previews/index.ts` — re-export if needed (already auto-included via `tronMoviePreviews` spread)

**TronHeader change:**
Add `{ href: "/game", label: "GAME" }` to `defaultNavItems` array after COMPONENTS.

**Component registry change:**
Add to `componentSections["tron-movie"].items`:
```typescript
{
  id: "light-cycle-game",
  name: "light-cycle-game",
  title: "Light Cycle Game",
  type: "tron-movie",
  section: "tron-movie",
}
```

**Preview component:**
Add `LightCycleGamePreview` to `tron-movie-previews.tsx`:
- Import `LightCycleGame` component
- Render it with `autoPlay={true}`, small size (e.g., 400x400)
- Wrap in a container div
- Export as `React.memo`
- Add to `tronMoviePreviews` record with key `"light-cycle-game"`
