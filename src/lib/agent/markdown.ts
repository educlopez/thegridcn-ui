import { readFileSync } from "node:fs";
import { join } from "node:path";
import { estimateMarkdownTokens } from "@/lib/agent/accept";
import { getAllComponents } from "@/lib/component-data";
import {
  PUBLIC_THEMES,
  SITE_NAME,
  SITE_ORIGIN,
  TEMPLATE_SLUGS,
} from "@/lib/site";

export interface MarkdownPage {
  body: string;
  tokens: number;
}

const FILE_CACHE = new Map<string, string | null>();

function markdownFilePath(
  relativePath: "CONTRIBUTING.md" | "docs/api.md" | "docs/install.md"
): string {
  switch (relativePath) {
    case "CONTRIBUTING.md":
      return join(process.cwd(), "CONTRIBUTING.md");
    case "docs/api.md":
      return join(process.cwd(), "docs", "api.md");
    case "docs/install.md":
      return join(process.cwd(), "docs", "install.md");
    default: {
      const _exhaustive: never = relativePath;
      return _exhaustive;
    }
  }
}

function readProjectFile(
  relativePath: "CONTRIBUTING.md" | "docs/api.md" | "docs/install.md"
): string | null {
  if (FILE_CACHE.has(relativePath)) {
    return FILE_CACHE.get(relativePath) ?? null;
  }

  try {
    const content = readFileSync(markdownFilePath(relativePath), "utf8");
    FILE_CACHE.set(relativePath, content);
    return content;
  } catch {
    FILE_CACHE.set(relativePath, null);
    return null;
  }
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

function wrap(title: string, body: string): string {
  return `# ${title}\n\n${body.trim()}\n`;
}

function homepageMarkdown(): string {
  const themes = PUBLIC_THEMES.map(
    (theme) => `- **${theme.name}** (\`${theme.id}\`) — ${theme.color}`
  ).join("\n");

  return wrap(
    SITE_NAME,
    `
Tron-inspired shadcn/ui theme system with Greek-god color schemes, HUD components, and Three.js effects. The site is both the showcase and the shadcn registry.

## Install

Apply a Radix or Base UI preset (Vega style), or register the namespace in \`components.json\`:

\`\`\`bash
npx shadcn@latest add @thegridcn/radix-vega
npx shadcn@latest add @thegridcn/base-vega
\`\`\`

\`\`\`json
{
  "registries": {
    "@thegridcn": "${SITE_ORIGIN}/r/{name}.json"
  }
}
\`\`\`

Then install any component:

\`\`\`bash
npx shadcn@latest add @thegridcn/button
npx shadcn@latest add @thegridcn/data-card
npx shadcn@latest add @thegridcn/radar
npx shadcn@latest add @thegridcn/theme-ares
npx shadcn@latest list @thegridcn
\`\`\`

Full walkthrough: ${SITE_ORIGIN}/docs/install

## Themes

${themes}

## Pages

- Components: ${SITE_ORIGIN}/components
- Templates: ${SITE_ORIGIN}/templates
- Design tokens: ${SITE_ORIGIN}/tokens
- Install docs: ${SITE_ORIGIN}/docs/install
- API docs: ${SITE_ORIGIN}/docs/api
- Changelog: ${SITE_ORIGIN}/changelog
- Contributing: ${SITE_ORIGIN}/contributing
- Light-cycle game: ${SITE_ORIGIN}/game

## Agent discovery

- API catalog: ${SITE_ORIGIN}/.well-known/api-catalog
- OpenAPI: ${SITE_ORIGIN}/openapi.json
- Capability manifest: ${SITE_ORIGIN}/.well-known/ai-catalog.json
- Agent skills: ${SITE_ORIGIN}/.well-known/agent-skills/index.json
- Request this site as markdown with \`Accept: text/markdown\`
`
  );
}

function componentsMarkdown(): string {
  const grouped = new Map<string, string[]>();

  for (const component of getAllComponents()) {
    const list = grouped.get(component.type) ?? [];
    list.push(`- \`${component.id}\` — ${component.title}`);
    grouped.set(component.type, list);
  }

  const sections: string[] = [];
  for (const [type, items] of grouped) {
    sections.push(`## ${type}\n\n${items.join("\n")}`);
  }

  return wrap(
    "Components",
    `
Browse the live gallery at ${SITE_ORIGIN}/components.

Install any registry name with \`npx shadcn@latest add @thegridcn/<id>\` after registering the \`@thegridcn\` namespace.

${sections.join("\n\n")}
`
  );
}

function tokensMarkdown(): string {
  const lines = PUBLIC_THEMES.map(
    (theme) =>
      `- **${theme.name}**: ${SITE_ORIGIN}/tokens/${theme.id}.css · ${SITE_ORIGIN}/tokens/${theme.id}.json`
  ).join("\n");

  return wrap(
    "Design tokens",
    `
Downloadable CSS variables and JSON for every public theme. Manifest: ${SITE_ORIGIN}/tokens/index.json

${lines}

Import CSS directly:

\`\`\`css
@import "${SITE_ORIGIN}/tokens/ares.css";
\`\`\`
`
  );
}

function templatesMarkdown(): string {
  const lines = TEMPLATE_SLUGS.map(
    (slug) =>
      `- **${slug}**: ${SITE_ORIGIN}/templates/${slug} — source JSON at ${SITE_ORIGIN}/api/template-source/${slug}`
  ).join("\n");

  return wrap(
    "Templates",
    `
Full-page template previews.

${lines}
`
  );
}

function gameMarkdown(): string {
  return wrap(
    "Light-cycle game",
    `
Play the Tron light-cycle arena at ${SITE_ORIGIN}/game.

Public leaderboard API:

- \`GET ${SITE_ORIGIN}/api/leaderboard?difficulty=medium\`
- \`POST ${SITE_ORIGIN}/api/leaderboard/session\` then \`POST ${SITE_ORIGIN}/api/leaderboard\`

See ${SITE_ORIGIN}/docs/api for request bodies.
`
  );
}

function fallbackMarkdown(pathname: string): string {
  return wrap(
    SITE_NAME,
    `
This page lives at ${SITE_ORIGIN}${pathname}.

Useful links:

- Install: ${SITE_ORIGIN}/docs/install
- API: ${SITE_ORIGIN}/docs/api
- Components: ${SITE_ORIGIN}/components
- OpenAPI: ${SITE_ORIGIN}/openapi.json
`
  );
}

export function getMarkdownForPath(pathname: string): MarkdownPage {
  const path = normalizePath(pathname);

  let body: string;
  switch (path) {
    case "/":
      body = homepageMarkdown();
      break;
    case "/changelog":
      body = wrap(
        "Changelog",
        `Recent commits are listed at ${SITE_ORIGIN}/changelog and https://github.com/educlopez/thegridcn-ui/commits/main.`
      );
      break;
    case "/components":
      body = componentsMarkdown();
      break;
    case "/contributing":
      body = readProjectFile("CONTRIBUTING.md") ?? fallbackMarkdown(path);
      break;
    case "/docs/api":
      body = readProjectFile("docs/api.md") ?? fallbackMarkdown(path);
      break;
    case "/docs/install":
      body = readProjectFile("docs/install.md") ?? fallbackMarkdown(path);
      break;
    case "/game":
      body = gameMarkdown();
      break;
    case "/templates":
      body = templatesMarkdown();
      break;
    case "/tokens":
      body = tokensMarkdown();
      break;
    default:
      body = fallbackMarkdown(path);
  }

  if (!body.endsWith("\n")) {
    body += "\n";
  }

  return {
    body,
    tokens: estimateMarkdownTokens(body),
  };
}

export function isMarkdownDocumentPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (
    path === "/openapi.json" ||
    path === "/robots.txt" ||
    path === "/sitemap.xml"
  ) {
    return false;
  }
  if (
    path.startsWith("/api/") ||
    path.startsWith("/r/") ||
    path.startsWith("/.well-known/") ||
    path.startsWith("/_next/") ||
    path.startsWith("/tokens/")
  ) {
    return false;
  }
  const lastSegment = path.split("/").pop() ?? "";
  return !lastSegment.includes(".");
}
