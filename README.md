# The GridCN

[![License: MIT](https://img.shields.io/badge/License-MIT-black?style=flat-square)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-0af?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn compatible](https://img.shields.io/badge/shadcn-compatible-111?style=flat-square)](https://ui.shadcn.com/)

![hero](docs/images/hero.png)

> A Tron: Ares inspired theme system for shadcn/ui. Grid-native components, six Greek-god color schemes, three.js effects, and a copy-paste registry that plugs into the shadcn CLI.

---

## What is this

The GridCN turns plain shadcn/ui into a neon, glass-HUD design system modeled after _Tron: Ares_. It ships 55+ base components, 90+ Tron-flavored components (HUDs, radars, timers, maps, 3D grids), and six themes built on `oklch()` CSS variables — all installable one-by-one through `npx shadcn add`.

Nothing is locked behind a package. Every component is raw TSX you own, just like shadcn/ui itself. The site at [thegridcn.com](https://thegridcn.com) is both the showcase and the registry.

## Features

- Six themes · Ares, Tron, Clu, Athena, Aphrodite, Poseidon
- 145+ components · base UI + Tron-specific HUD/3D/effects
- shadcn CLI native · install any component with `npx shadcn add`
- Token export · `pnpm tokens:build` emits per-theme CSS + JSON under `public/tokens/`
- Three.js integration · Grid3D, Tunnel, GridFloor, always SSR-safe
- Copy-paste friendly · full source visible in the showcase with one-click copy

## Quick start

Three ways to use The GridCN, from lightest touch to full clone.

### 1. Live preview

Browse every component with live switching across the six themes at [thegridcn.com/components](https://thegridcn.com/components). Each card shows the rendered component, its variants, and the source.

### 2. Copy a single component

1. Open the component at [thegridcn.com/components](https://thegridcn.com/components).
2. Switch to any theme to preview the styling.
3. Click the copy button on the source block.
4. Paste into your own `components/` directory. Install listed peer deps if any.

### 3. Install via the registry (recommended)

The site exposes a shadcn-compatible registry. Register the namespace once in your `components.json`:

```json
{
  "registries": {
    "@thegridcn": "https://thegridcn.com/r/{name}.json"
  }
}
```

Then install anything by short name:

```bash
npx shadcn@latest add @thegridcn/button
npx shadcn@latest add @thegridcn/data-card
npx shadcn@latest add @thegridcn/theme-ares

# or several at once
npx shadcn@latest add @thegridcn/button @thegridcn/hud @thegridcn/radar
```

See the full walkthrough (namespace vs full URL, theming, tokens, troubleshooting) in [`docs/install.md`](./docs/install.md).

## Theme usage

Wrap your app once, then switch themes anywhere.

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="ares">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// any client component
"use client";
import { useTheme } from "@/components/theme";

export function Toggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "ares" ? "tron" : "ares")}>
      {theme}
    </button>
  );
}
```

Themes are `data-theme` attributes on `<html>`, so any CSS-variable-based component reacts automatically.

## Token export

Run `pnpm tokens:build` to regenerate `public/tokens/`:

```
public/tokens/
  index.json         · manifest of all themes
  tron.css           · copy-paste CSS block
  tron.json          · flat vars object { "--primary": "oklch(...)", ... }
  ares.{css,json}
  clu.{css,json}
  athena.{css,json}
  aphrodite.{css,json}
  poseidon.{css,json}
```

Drop a CSS file into any project:

```css
/* your-app/app/globals.css */
@import "https://thegridcn.com/tokens/ares.css";
```

Or import the JSON into your Tailwind config:

```ts
// tailwind.config.ts
import ares from "./tokens/ares.json" with { type: "json" };

export default {
  theme: {
    extend: {
      colors: {
        primary: ares.vars["--primary"],
        // ... map the rest
      },
    },
  },
};
```

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (runs registry:build first)
pnpm lint         # eslint
pnpm tokens:build # regenerate public/tokens/
```

Package manager is **pnpm**. Node 18+.

Project layout:

```
src/
  app/                · Next.js App Router
  components/ui/      · 55+ shadcn base components
  components/thegridcn/  · Tron-flavored components + 3D + effects
  components/theme/   · ThemeProvider + useTheme
  lib/                · cn(), registry helpers
scripts/              · registry + tokens build scripts
public/r/             · generated registry JSON (one per component)
public/tokens/        · generated theme tokens
docs/install.md       · shadcn CLI install guide
```

## Contributing

PRs are welcome — especially new Tron-flavored components, theme polish, and registry improvements. Open an issue first for anything larger than a tweak so we can align on direction.

## License

[MIT](./LICENSE)

---

_End of line._
