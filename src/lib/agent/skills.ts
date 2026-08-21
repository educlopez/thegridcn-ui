import { createHash } from "node:crypto";

export const AGENT_SKILLS_SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export interface AgentSkillDefinition {
  body: string;
  description: string;
  name: string;
}

export interface AgentSkillIndexEntry {
  description: string;
  digest: string;
  name: string;
  type: "skill-md";
  url: string;
}

export interface AgentSkillsIndex {
  $schema: string;
  skills: AgentSkillIndexEntry[];
}

const THEGRIDCN_INSTALL_DESCRIPTION =
  "Install The Gridcn Tron-inspired shadcn/ui components, Greek-god themes, and design tokens. Use when adding HUD, radar, timer, or Three.js grid components, registering the @thegridcn registry, or switching Ares/Tron/Clu/Athena/Aphrodite/Poseidon themes.";

const THEGRIDCN_INSTALL_BODY = `---
name: thegridcn-install
description: ${THEGRIDCN_INSTALL_DESCRIPTION}
---

# Install The Gridcn

The Gridcn is a Tron-inspired shadcn/ui theme and component registry. Components are copied into the user's project as source (not an npm package). The live registry is https://thegridcn.com.

## Prerequisites

- A React project that shadcn/ui supports (Next.js, Vite, Remix, Astro).
- Tailwind CSS 4 recommended.
- \`components.json\` from \`npx shadcn@latest init\` (Radix or Base UI, Vega style).

## Configure Radix or Base UI

shadcn 4.18 uses \`style: "radix-vega"\` or \`style: "base-vega"\` in \`components.json\`. Apply a Gridcn preset (also registers \`@thegridcn\` and Tron fonts):

\`\`\`bash
npx shadcn@latest add @thegridcn/radix-vega
npx shadcn@latest add @thegridcn/base-vega
\`\`\`

This site uses Radix. Theme CSS and HUD components work with either primitive. \`@thegridcn/button\` and other \`ui/\` items still copy Radix source — Base UI apps should keep their own primitives for those.

## Register the namespace

If you skipped the preset, add this to the project's \`components.json\`:

\`\`\`json
{
  "registries": {
    "@thegridcn": "https://thegridcn.com/r/{name}.json"
  }
}
\`\`\`

## Install components

\`\`\`bash
npx shadcn@latest add @thegridcn/button
npx shadcn@latest add @thegridcn/data-card
npx shadcn@latest add @thegridcn/radar
npx shadcn@latest add @thegridcn/hud
npx shadcn@latest list @thegridcn
\`\`\`

Without editing \`components.json\`, pass the full URL:

\`\`\`bash
npx shadcn@latest add https://thegridcn.com/r/data-card.json
\`\`\`

Registry JSON is also available themed:

\`GET https://thegridcn.com/api/registry/{name}?theme=tron&intensity=medium\`

Valid themes: \`tron\`, \`ares\`, \`clu\`, \`athena\`, \`aphrodite\`, \`poseidon\`.
Valid intensities: \`none\`, \`light\`, \`medium\`, \`heavy\`.

## Themes

\`\`\`bash
npx shadcn@latest add @thegridcn/theme-ares
npx shadcn@latest add @thegridcn/theme-tron
\`\`\`

Each theme writes \`src/styles/thegridcn-theme.css\`. Import it from global CSS. For runtime switching, wrap the tree in \`ThemeProvider\` from \`@/components/theme\` and set \`data-theme\` on \`<html>\`.

Token files (CSS variables only):

- \`https://thegridcn.com/tokens/<theme>.css\`
- \`https://thegridcn.com/tokens/<theme>.json\`
- \`https://thegridcn.com/tokens/index.json\`

## Three.js components

\`grid\`, \`tunnel\`, and \`grid-floor\` must be loaded on the client only:

\`\`\`tsx
import dynamic from "next/dynamic";

const Grid3D = dynamic(
  () => import("@/components/thegridcn/grid").then((m) => m.Grid),
  { ssr: false }
);
\`\`\`

## Discovery

- API catalog: \`https://thegridcn.com/.well-known/api-catalog\`
- OpenAPI: \`https://thegridcn.com/openapi.json\`
- Human docs: \`https://thegridcn.com/docs/install\` and \`https://thegridcn.com/docs/api\`
- Browse components: \`https://thegridcn.com/components\`
- Markdown pages: send \`Accept: text/markdown\`
`;

export const AGENT_SKILLS: AgentSkillDefinition[] = [
  {
    body: THEGRIDCN_INSTALL_BODY,
    description: THEGRIDCN_INSTALL_DESCRIPTION,
    name: "thegridcn-install",
  },
];

const skillsByName = new Map(
  AGENT_SKILLS.map((skill) => [skill.name, skill] as const)
);

export function sha256Hex(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

export function skillDigest(body: string): string {
  return `sha256:${sha256Hex(body)}`;
}

export function getSkillByName(name: string): AgentSkillDefinition | undefined {
  return skillsByName.get(name);
}

export function getAgentSkillsIndex(): AgentSkillsIndex {
  return {
    $schema: AGENT_SKILLS_SCHEMA,
    skills: AGENT_SKILLS.map((skill) => ({
      description: skill.description,
      digest: skillDigest(skill.body),
      name: skill.name,
      type: "skill-md",
      url: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
    })),
  };
}
