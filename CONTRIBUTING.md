# Contributing to thegridcn

Thanks for taking the time. This project is a Tron: Ares inspired shadcn/ui theme system. Keep contributions focused and small.

---

## Local setup

```bash
git clone https://github.com/educlopez/thegridcn-ui.git
cd thegridcn-ui
pnpm install
pnpm dev
```

Dev server runs at `http://localhost:3000`.

Required:

- Node 20+
- pnpm 9+

---

## Add a new component

1. Create the file under `src/components/thegridcn/` (Tron-flavored) or `src/components/ui/` (base shadcn).
2. Follow surrounding patterns: `"use client"` only when needed, `cn()` for classes, no `rounded-2xl`/`rounded-3xl`, 1px borders.
3. Register it: edit `registry.json` at the repo root, then run:

```bash
pnpm registry:build
```

4. Add a preview entry in `src/lib/component-data.ts` so it shows up in `/components`.

---

## Add a new theme

1. Add a `[data-theme="<name>"]` block in `src/app/globals.css` next to the existing ones. Use `oklch()` for all color tokens.
2. Export it:

```bash
pnpm tokens:build
```

This regenerates `public/tokens/<name>.{css,json}` and the `index.json` manifest.

3. Add the theme id to `src/components/theme/` switcher options.

---

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` docs only
- `style:` formatting, no code change
- `refactor:` refactor without behavior change
- `chore:` build / tooling
- `perf:` performance work

Examples:

```
feat: add radar sweep component
fix: resolve theme flash on first paint
docs: update install guide with tokens example
```

---

## Opening a PR

1. Fork and branch from `main`.
2. Keep PRs small and scoped. One feature or fix per PR.
3. Before pushing:

```bash
pnpm lint
pnpm build
```

4. Describe the change, why it matters, and include a screenshot or short clip if it's visual.

---

## Code style

- No comments unless the WHY is non-obvious.
- Match the surrounding file. Don't introduce new patterns in a one-liner fix.
- TypeScript strict. No `any` unless you justify it in the PR.
- Prefer composition over props explosion.
- Tailwind utilities via `cn()`; avoid inline style objects unless dynamic CSS vars are needed.

---

## Reporting bugs

Open an issue with:

- Repro steps
- Expected vs actual
- Browser / Node / pnpm versions
- Minimal code sample if possible
