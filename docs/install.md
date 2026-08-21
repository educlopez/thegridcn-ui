# Install guide · shadcn CLI

The GridCN ships a [shadcn/ui](https://ui.shadcn.com/)-compatible registry. Every component is a single `npx shadcn add` away, either by namespace (`@thegridcn/button`) or by full URL.

---

## Prerequisites

A project that shadcn/ui can write into:

- Next.js 14+, Vite, Remix, or any React project supported by shadcn.
- Tailwind CSS 3.4+ (Tailwind 4 is recommended — that's what The GridCN uses).
- A `components.json` at the project root. If you don't have one yet:

```bash
npx shadcn@latest init
```

Pick **Radix UI** or **Base UI**, then the **Vega** style (Vega is the New York look this registry uses). Base color: `neutral`. CSS variables: yes.

Or skip the prompts and apply a Gridcn `registry:base` preset — see [Radix UI and Base UI](#radix-ui-and-base-ui).

---

## Radix UI and Base UI

shadcn 4.18 stores the primitive library in `components.json` `style` as `{library}-{style}`. Vega is this registry's look (the old `new-york` style):

| `style` | Primitive library | Preset |
| --- | --- | --- |
| `radix-vega` | Radix UI (this site) | `@thegridcn/radix-vega` |
| `base-vega` | Base UI | `@thegridcn/base-vega` |

A project can only have one of those values. Apply the matching preset and it writes `style`, aliases, fonts (Rajdhani, Orbitron, Geist Mono), and the `@thegridcn` registry URL:

```bash
npx shadcn@latest add @thegridcn/radix-vega
# or
npx shadcn@latest add @thegridcn/base-vega
```

**Works with either primitive:** theme CSS (`theme-ares`, …), intensity styles, and HUD / thegridcn components that are CSS-based.

**Radix source:** `@thegridcn/button` and other `src/components/ui` items import `@radix-ui/*`. If your app is Base UI, keep your own Base UI primitives for those and only add Gridcn themes + HUD components.

This repository's `components.json` uses `"style": "radix-vega"`.

---

## Register the namespace (recommended)

Add `@thegridcn` once to your `components.json` and skip typing URLs:

```json
{
  "registries": {
    "@thegridcn": "https://thegridcn.com/r/{name}.json"
  }
}
```

From then on, every item is a short name away. If you applied `@thegridcn/radix-vega` or `@thegridcn/base-vega`, this namespace is already registered.

```bash
# base shadcn component (our version, re-exported)
npx shadcn@latest add @thegridcn/button

# tron-flavored component
npx shadcn@latest add @thegridcn/data-card
npx shadcn@latest add @thegridcn/radar
npx shadcn@latest add @thegridcn/hud

# install several at once
npx shadcn@latest add @thegridcn/button @thegridcn/data-card @thegridcn/hud

# 3D component (pulls in three + @react-three/fiber)
npx shadcn@latest add @thegridcn/grid
```

You can also search and list the registry:

```bash
npx shadcn@latest search @thegridcn
npx shadcn@latest search @thegridcn --query "hud"
npx shadcn@latest list   @thegridcn
```

---

## Install by full URL (no setup)

If you'd rather not edit `components.json`, pass the full URL:

```bash
npx shadcn@latest add https://thegridcn.com/r/button.json
npx shadcn@latest add https://thegridcn.com/r/data-card.json
```

The CLI will:

1. Fetch the JSON manifest.
2. Resolve `registryDependencies` (sibling registry entries).
3. Resolve `dependencies` (npm packages) and install them with your package manager.
4. Write the TSX to `src/components/ui/` (base) or `src/components/thegridcn/` (Tron), honoring your `components.json` aliases.

---

## Install a theme

Themes ship as `registry:style` items that write a single CSS file with the `oklch()` variables baked in:

```bash
npx shadcn@latest add @thegridcn/theme-ares
npx shadcn@latest add @thegridcn/theme-tron
npx shadcn@latest add @thegridcn/theme-clu
npx shadcn@latest add @thegridcn/theme-athena
npx shadcn@latest add @thegridcn/theme-aphrodite
npx shadcn@latest add @thegridcn/theme-poseidon
```

Each writes to `src/styles/thegridcn-theme.css`. Import it from your global CSS:

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "../styles/thegridcn-theme.css";
```

If you want multiple themes side-by-side with `data-theme` switching, use the raw token files instead (see [Tokens export](#tokens-export) below).

---

## Listing available components

Every registry entry is mirrored under `public/r/` and served at `/r/<name>.json`. The canonical list lives in [`registry.json`](https://github.com/educlopez/thegridcn-ui/blob/main/registry.json) at the project root. To enumerate names locally:

```bash
# from a clone of thegridcn-ui
jq -r '.items[].name' registry.json | sort -u
```

To enumerate names from the repo on GitHub:

```bash
curl -sL https://raw.githubusercontent.com/educlopez/thegridcn-ui/main/registry.json | jq -r '.items[].name' | sort -u
```

---

## Complete example

Install a button, a Tron data card, the Ares theme, then render it.

```bash
# 1. init shadcn if you haven't (Radix or Base UI, Vega style)
npx shadcn@latest init

# 2. apply a Gridcn base (registers @thegridcn + fonts)
npx shadcn@latest add @thegridcn/radix-vega

# 3. install a theme and components
npx shadcn@latest add @thegridcn/theme-ares @thegridcn/button @thegridcn/data-card
```

```tsx
// app/page.tsx
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/thegridcn/data-card";

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <DataCard
        subtitle="PROGRAM"
        title="FLYNN"
        status="active"
        fields={[
          { label: "STATUS", value: "ACTIVE" },
          { label: "TYPE", value: "USER" },
        ]}
      />
      <Button className="mt-6">Enter the Grid</Button>
    </div>
  );
}
```

---

## Tokens export

If you'd rather not install a full theme style file, grab just the CSS variables:

- CSS: `https://thegridcn.com/tokens/<theme>.css`
- JSON: `https://thegridcn.com/tokens/<theme>.json`
- Manifest: `https://thegridcn.com/tokens/index.json`

Available theme names: `tron`, `ares`, `clu`, `athena`, `aphrodite`, `poseidon`.

```css
/* drop into your app's globals.css */
@import "https://thegridcn.com/tokens/ares.css";
```

Or regenerate locally:

```bash
pnpm tokens:build
```

---

## Troubleshooting

**`Component "foo" not found`**
Check the exact name in `registry.json` — some Tron variants are prefixed (`thegridcn-badge`, `thegridcn-timeline`, etc.) to disambiguate from the base shadcn component.

**`Cannot find module '@/components/ui/...'`**
Your `components.json` aliases don't match The GridCN's defaults. Either align your aliases (`components: "@/components"`, `ui: "@/components/ui"`) or update the imports after install.

**Tailwind classes not applying**
The GridCN is built on Tailwind 4. On Tailwind 3 most utilities work, but you'll need to port `@theme inline` blocks from `src/app/globals.css` to your `tailwind.config.*`. The `tokens/<theme>.json` file is the easiest bridge.

**3D components fail to render**
The Three.js components (`grid`, `tunnel`, `grid-floor`) must be dynamically imported with `ssr: false` in Next.js:

```tsx
import dynamic from "next/dynamic";

const Grid3D = dynamic(() => import("@/components/thegridcn/grid").then(m => m.Grid), {
  ssr: false,
});
```

**Multiple themes on one page**
Wrap the section in `<div data-theme="tron">…</div>` after importing each theme CSS or the raw tokens. The `data-theme` attribute cascades CSS variables locally.

---

## Registry compatibility status

The registry is generated by `shadcn build` (see `pnpm registry:build`) and follows the [`registry-item.json` schema](https://ui.shadcn.com/schema/registry-item.json). It is consumed out-of-the-box by `npx shadcn@latest add <url>`.

Verified working:

- Single-file `registry:component` items (base + tron).
- Items with `dependencies` (npm) and `registryDependencies` (sibling items).
- `registry:style` theme items.
- `registry:base` presets (`radix-vega`, `base-vega`) and `registry:font` items.

Known limitations:

- The 3D components don't declare `ssr: false` in their registry entries. Consumers must wrap them with `dynamic(..., { ssr: false })` themselves (see Troubleshooting).

If you hit anything else, open an issue at the repo.
