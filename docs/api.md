# API reference

The Gridcn exposes a small public HTTP surface: the shadcn component registry, themed registry payloads, template source, a component search helper, and the light-cycle game leaderboard.

Machine-readable entry points:

- OpenAPI 3.1: [`/openapi.json`](https://thegridcn.com/openapi.json)
- RFC 9727 catalog: [`/.well-known/api-catalog`](https://thegridcn.com/.well-known/api-catalog)
- Health: [`/api/health`](https://thegridcn.com/api/health)

Send `Accept: text/markdown` on HTML pages to get a markdown representation.

---

## shadcn registry

Canonical item JSON used by the CLI:

```
GET https://thegridcn.com/r/{name}.json
```

Register once in `components.json`:

```json
{
  "registries": {
    "@thegridcn": "https://thegridcn.com/r/{name}.json"
  }
}
```

Then:

```bash
npx shadcn@latest add @thegridcn/radar
```

Themed payload (merges theme CSS into the registry item):

```
GET https://thegridcn.com/api/registry/{name}?theme=tron&intensity=medium
```

Query parameters:

| Name | Values | Default |
| --- | --- | --- |
| `theme` | `tron`, `ares`, `clu`, `athena`, `aphrodite`, `poseidon` | `tron` |
| `intensity` | `none`, `light`, `medium`, `heavy` | `medium` |

Use `{name}=styles` to fetch CSS only.

See the [install guide](/docs/install) for CLI walkthroughs, tokens, and Three.js SSR notes.

---

## Component catalog

```
GET https://thegridcn.com/api/components
GET https://thegridcn.com/api/components?q=hud
```

Returns `{ "components": [{ "id", "name", "title", "type", "section" }] }` from the showcase list.

---

## Template source

```
GET https://thegridcn.com/api/template-source/{slug}
```

Valid slugs: `dashboard`, `landing`, `blog`, `login`, `analytics`.

---

## Design tokens

Static files, not under `/api`:

- `https://thegridcn.com/tokens/index.json`
- `https://thegridcn.com/tokens/{theme}.css`
- `https://thegridcn.com/tokens/{theme}.json`

---

## Light-cycle leaderboard

Read scores:

```
GET https://thegridcn.com/api/leaderboard?difficulty=medium
```

Submit a score (requires a one-time session):

1. `POST /api/leaderboard/session` with `{ "difficulty": "medium" }` → `{ "token" }`.
2. `POST /api/leaderboard` with `{ "alias", "difficulty", "time", "token" }` and optional `character`.

`alias` must be three uppercase letters. Invalid, reused, or too-fast sessions return `403`. Unconfigured Redis returns `503`.
