# Light Cycle Mini-Game Design

## Summary

A Tron Light Cycle mini-game integrated into Project Ares. Player controls a bike (colored from active theme) and battles 2 AI bikes (colored from other themes). Classic rules: bikes leave light trails, hit any trail or wall = derezzed, last standing wins.

## Decisions

- **Location**: Dedicated `/game` route + listed in component explorer
- **Rendering**: 2D HTML5 Canvas (top-down grid view)
- **Controls**: Arrow keys + WASD, desktop only
- **Player color**: Active theme's primary color
- **AI colors**: Random from other themes in the palette
- **Page layout**: Full immersive — dark background, HUD components framing the canvas

## File Structure

```
src/components/thegridcn/light-cycle-engine.ts  — Pure game logic (no React)
src/components/thegridcn/light-cycle-game.tsx    — React canvas component
src/app/game/page.tsx                            — Game page route
```

## Game Engine (`light-cycle-engine.ts`)

Pure TypeScript class, no React dependencies.

### Types

- `Direction`: `'up' | 'down' | 'left' | 'right'`
- `Bike`: `{ x, y, direction, trail: [x,y][], alive, color }`
- `GameState`: `'ready' | 'playing' | 'gameover'`

### Class: `LightCycleEngine`

- **Constructor**: `(gridSize: number, bikes: BikeConfig[])`
- **tick()**: Advances all bikes one cell, checks collisions
- **setBikeDirection(bikeIndex, direction)**: Queues a turn (prevents 180-degree reversal)
- **reset()**: Resets all bikes to starting positions
- **getState()**: Returns current snapshot for rendering

### AI Logic

Per AI bike per tick:
1. Check if current direction is safe (no wall/trail ahead)
2. If unsafe, pick the safe direction with the most open space
3. Small random chance to turn even when safe (avoids predictable lines)
4. No pathfinding — simple but challenging enough

### Starting Positions

- Player: bottom-center, facing up
- AI 1: top-left, facing down
- AI 2: top-right, facing down
- Spread apart for reaction time

### Rules

- Grid is discrete (100x100 cells), one cell per tick
- Anti-180 rule: can't reverse into your own trail
- One direction change queued per tick
- Collision = out of bounds, any trail cell, or another bike's position
- Tick rate: ~10-12 ticks/second

## React Component (`light-cycle-game.tsx`)

Client component wrapping the engine.

### Props

- `className?: string`
- `onGameEnd?: (winner: 'player' | 'ai') => void`

### Internals

- Canvas ref for drawing
- `useTheme()` hook for active theme color
- Engine instance via `useRef`
- `requestAnimationFrame` loop for rendering
- Keyboard listener for arrow keys + WASD

### Theme Integration

- Player gets current theme color via `themes` array from theme provider
- AI bikes get 2 randomly picked colors from remaining 5 themes
- Colors update live on theme switch

### Canvas Rendering (per frame)

1. Clear canvas with dark background
2. Draw grid lines (subtle, low opacity)
3. Draw all trails with glow effect (`shadowBlur: 8-12px`)
4. Draw bike heads as brighter squares with stronger glow
5. Draw derez explosion on bike death (brief particle burst)

### Game Flow

1. Mount → "PRESS ENTER TO START" overlay
2. Enter → 3-second countdown
3. Countdown ends → engine ticks
4. Game over → "DEREZZED" or "VICTORY" overlay, Enter to restart
5. Win counter persists across rounds

## Game Page (`src/app/game/page.tsx`)

- Full viewport, dark background, no scroll
- `HUDFrame` wrapping the canvas
- `UplinkHeader`: "LIGHT CYCLE ARENA" left, win count right
- Canvas centered, square aspect ratio, max ~600-700px
- Controls hint below: "ARROW KEYS / WASD TO STEER"
- `DerezTimer` showing elapsed round time
- Theme switcher accessible
- Standard `TronHeader` for navigation

## Navigation Updates

- Add "GAME" link to `TronHeader` between COMPONENTS and GitHub
- Register component in `src/lib/component-data.ts` under Tron Movie category
- Component explorer preview: smaller auto-playing AI vs AI demo

## Metadata

- Title: "Light Cycle Arena | The Gridcn"
- Description fitting the Tron theme
