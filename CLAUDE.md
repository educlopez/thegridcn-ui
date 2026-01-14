# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Project Ares (The Gridcn) is a Tron: Ares inspired shadcn/ui theme system featuring Greek god color schemes, 3D effects, and movie-accurate UI components. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Commands

```bash
pnpm dev      # Start development server (port 3000)
pnpm build    # Build for production
pnpm start    # Run production server
pnpm lint     # Run ESLint checks
```

Package manager: **pnpm**

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - 55+ shadcn/ui base components
- `src/components/tron-ui/` - Custom Tron movie-inspired UI elements (TronDataCard, TronHUD, TronAlert, etc.)
- `src/components/tron-3d/` - Three.js 3D components (TronGrid3D, TronTunnel) - always dynamically imported with `ssr: false`
- `src/components/tron-effects/` - Visual effects (CircuitBackground, GlowContainer, Scanlines)
- `src/components/theme/` - Theme provider and switcher using React Context
- `src/components/showcase/` - Component showcase sections for homepage
- `src/components/components-page/` - Component explorer UI
- `src/lib/` - Utilities (`utils.ts` with `cn()` function) and component registry

### Theme System

Six Greek god-inspired themes with oklch() color space:
- **Ares** (red, default), **Tron** (cyan), **Clu** (orange), **Athena** (gold), **Aphrodite** (pink), **Poseidon** (blue)

Themes use CSS variables via `data-theme` attribute on `<html>`. Theme state persists in localStorage under key `project-ares-theme`.

### Key Patterns

- **Client components**: Use `"use client"` directive for theme switching and interactive features
- **Dynamic imports for 3D**: Three.js components must use `dynamic(() => import(...), { ssr: false })` to avoid SSR issues
- **Path alias**: `@/*` maps to `./src/*`
- **Component styling**: Uses Class Variance Authority (cva) patterns from shadcn/ui

### Environment Variables

No environment variables are required. The `/components` route is always accessible.

### Fonts

- **Orbitron** - Display/heading font (Tron-style)
- **Rajdhani** - Body text
- **Geist Mono** - Monospace/code
