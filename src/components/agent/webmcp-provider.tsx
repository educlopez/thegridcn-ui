"use client";

import { useEffect } from "react";
import { PUBLIC_THEMES, SITE_ORIGIN } from "@/lib/site";

interface ModelContextTool {
  description: string;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
  inputSchema: Record<string, unknown>;
  name: string;
}

interface ModelContext {
  provideContext?: (input: {
    tools: ModelContextTool[];
  }) => Promise<void> | void;
  registerTool?: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal }
  ) => Promise<void> | void;
}

function getModelContext(): ModelContext | undefined {
  const fromDocument = (document as Document & { modelContext?: ModelContext })
    .modelContext;
  if (fromDocument) {
    return fromDocument;
  }
  return (navigator as Navigator & { modelContext?: ModelContext })
    .modelContext;
}

function cliPrefix(packageManager: unknown): string {
  if (packageManager === "pnpm") {
    return "pnpm dlx shadcn@latest add";
  }
  if (packageManager === "yarn") {
    return "yarn dlx shadcn@latest add";
  }
  return "npx shadcn@latest add";
}

const TOOLS: ModelContextTool[] = [
  {
    description:
      "Search The Gridcn component catalog by id, name, title, type, or section. Returns matching components and their shadcn install names.",
    execute: async (input) => {
      const query = typeof input.query === "string" ? input.query : "";
      const response = await fetch(
        `/api/components?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        return { error: `Component search failed (${response.status})` };
      }
      return response.json();
    },
    inputSchema: {
      additionalProperties: false,
      properties: {
        query: {
          description: "Search text, for example hud, radar, or button",
          type: "string",
        },
      },
      required: ["query"],
      type: "object",
    },
    name: "search_components",
  },
  {
    description:
      "Return the shadcn CLI command and registry URL for a The Gridcn component or theme.",
    execute: (input) => {
      const name = typeof input.name === "string" ? input.name.trim() : "";
      if (!name) {
        return { error: "name is required" };
      }
      return {
        cli: `${cliPrefix(input.packageManager)} @thegridcn/${name}`,
        namespace: `@thegridcn/${name}`,
        registryUrl: `${SITE_ORIGIN}/r/${name}.json`,
        themedUrl: `${SITE_ORIGIN}/api/registry/${name}?theme=tron&intensity=medium`,
      };
    },
    inputSchema: {
      additionalProperties: false,
      properties: {
        name: {
          description:
            "Registry item name such as button, data-card, radar, or theme-ares",
          type: "string",
        },
        packageManager: {
          description: "CLI runner to use in the command string",
          enum: ["npx", "pnpm", "yarn"],
          type: "string",
        },
      },
      required: ["name"],
      type: "object",
    },
    name: "get_install_command",
  },
  {
    description:
      "List The Gridcn Greek-god themes, token file URLs, and shadcn theme install names.",
    execute: () => ({
      intensities: ["none", "light", "medium", "heavy"],
      themes: PUBLIC_THEMES.map((theme) => ({
        css: `${SITE_ORIGIN}/tokens/${theme.id}.css`,
        id: theme.id,
        install: `@thegridcn/theme-${theme.id}`,
        json: `${SITE_ORIGIN}/tokens/${theme.id}.json`,
        name: theme.name,
      })),
    }),
    inputSchema: {
      additionalProperties: false,
      properties: {},
      type: "object",
    },
    name: "list_themes",
  },
];

async function registerTools(
  modelContext: ModelContext,
  signal: AbortSignal
): Promise<void> {
  if (typeof modelContext.registerTool === "function") {
    await Promise.all(
      TOOLS.map((tool) => modelContext.registerTool?.(tool, { signal }))
    );
    return;
  }

  if (typeof modelContext.provideContext === "function") {
    await modelContext.provideContext({ tools: TOOLS });
  }
}

export function WebMcpProvider() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) {
      return;
    }

    const controller = new AbortController();

    const register = async () => {
      try {
        await registerTools(modelContext, controller.signal);
      } catch {
        // WebMCP is progressive enhancement; unsupported browsers stay silent.
      }
    };

    register();

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}
