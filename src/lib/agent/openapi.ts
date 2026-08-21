import {
  PUBLIC_THEME_IDS,
  SITE_NAME,
  SITE_ORIGIN,
  TEMPLATE_SLUGS,
} from "@/lib/site";

const THEME_ENUM = [...PUBLIC_THEME_IDS];
const INTENSITY_ENUM = ["none", "light", "medium", "heavy"];
const DIFFICULTY_ENUM = ["easy", "medium", "hard", "insane"];
const TEMPLATE_ENUM = [...TEMPLATE_SLUGS];

export function getOpenApiDocument() {
  return {
    components: {
      schemas: {
        ComponentSummary: {
          additionalProperties: false,
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            section: { type: "string" },
            title: { type: "string" },
            type: { type: "string" },
          },
          required: ["id", "name", "section", "title", "type"],
          type: "object",
        },
        Error: {
          additionalProperties: false,
          properties: {
            error: { type: "string" },
          },
          required: ["error"],
          type: "object",
        },
        Health: {
          additionalProperties: false,
          properties: {
            status: { enum: ["ok"], type: "string" },
          },
          required: ["status"],
          type: "object",
        },
        LeaderboardEntry: {
          additionalProperties: false,
          properties: {
            alias: { type: "string" },
            character: { type: "string" },
            date: { format: "date-time", type: "string" },
            difficulty: { enum: DIFFICULTY_ENUM, type: "string" },
            time: { type: "number" },
          },
          required: ["alias", "date", "difficulty", "time"],
          type: "object",
        },
      },
    },
    info: {
      description:
        "Public APIs for The Gridcn: a Tron-inspired shadcn/ui registry, themed component payloads, template source, and the light-cycle game leaderboard.",
      title: `${SITE_NAME} API`,
      version: "0.1.0",
    },
    openapi: "3.1.0",
    paths: {
      "/api/components": {
        get: {
          description:
            "List showcase components. Pass q to filter by id, name, title, type, or section.",
          operationId: "listComponents",
          parameters: [
            {
              in: "query",
              name: "q",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    additionalProperties: false,
                    properties: {
                      components: {
                        items: {
                          $ref: "#/components/schemas/ComponentSummary",
                        },
                        type: "array",
                      },
                    },
                    required: ["components"],
                    type: "object",
                  },
                },
              },
              description: "Component summaries",
            },
          },
          summary: "Search the component catalog",
          tags: ["catalog"],
        },
      },
      "/api/health": {
        get: {
          operationId: "getHealth",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Health" },
                },
              },
              description: "Service is up",
            },
          },
          summary: "Health check",
          tags: ["status"],
        },
      },
      "/api/leaderboard": {
        get: {
          operationId: "listLeaderboard",
          parameters: [
            {
              in: "query",
              name: "difficulty",
              schema: {
                default: "medium",
                enum: DIFFICULTY_ENUM,
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    additionalProperties: false,
                    properties: {
                      entries: {
                        items: {
                          $ref: "#/components/schemas/LeaderboardEntry",
                        },
                        type: "array",
                      },
                    },
                    required: ["entries"],
                    type: "object",
                  },
                },
              },
              description: "Fastest times for a difficulty",
            },
          },
          summary: "Read light-cycle leaderboard",
          tags: ["game"],
        },
        post: {
          description:
            "Submit a validated race time. Requires a one-time session token from POST /api/leaderboard/session.",
          operationId: "submitLeaderboard",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  additionalProperties: false,
                  properties: {
                    alias: {
                      description: "Three uppercase letters",
                      type: "string",
                    },
                    character: { type: "string" },
                    difficulty: { enum: DIFFICULTY_ENUM, type: "string" },
                    time: { type: "number" },
                    token: { type: "string" },
                  },
                  required: ["alias", "difficulty", "time", "token"],
                  type: "object",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    additionalProperties: false,
                    properties: {
                      rank: { type: ["integer", "null"] },
                      success: { type: "boolean" },
                    },
                    required: ["success"],
                    type: "object",
                  },
                },
              },
              description: "Submission accepted",
            },
            "400": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Invalid submission",
            },
            "403": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Invalid or spent session",
            },
            "429": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Rate limited",
            },
            "503": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Leaderboard not configured",
            },
          },
          summary: "Submit a light-cycle score",
          tags: ["game"],
        },
      },
      "/api/leaderboard/session": {
        post: {
          operationId: "createLeaderboardSession",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  additionalProperties: false,
                  properties: {
                    difficulty: { enum: DIFFICULTY_ENUM, type: "string" },
                  },
                  required: ["difficulty"],
                  type: "object",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    additionalProperties: false,
                    properties: {
                      token: { type: "string" },
                    },
                    required: ["token"],
                    type: "object",
                  },
                },
              },
              description: "One-time session token",
            },
            "400": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Invalid difficulty",
            },
          },
          summary: "Start a leaderboard session",
          tags: ["game"],
        },
      },
      "/api/registry/{component}": {
        get: {
          description:
            "Return a shadcn registry item JSON with theme CSS merged in. Use component=styles for CSS only.",
          operationId: "getThemedRegistryItem",
          parameters: [
            {
              in: "path",
              name: "component",
              required: true,
              schema: { type: "string" },
            },
            {
              in: "query",
              name: "intensity",
              schema: {
                default: "medium",
                enum: INTENSITY_ENUM,
                type: "string",
              },
            },
            {
              in: "query",
              name: "theme",
              schema: {
                default: "tron",
                enum: THEME_ENUM,
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "Registry item",
            },
            "400": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Invalid theme or intensity",
            },
            "404": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Component not found",
            },
          },
          summary: "Get a themed registry item",
          tags: ["registry"],
        },
      },
      "/api/template-source/{slug}": {
        get: {
          operationId: "getTemplateSource",
          parameters: [
            {
              in: "path",
              name: "slug",
              required: true,
              schema: { enum: TEMPLATE_ENUM, type: "string" },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    additionalProperties: false,
                    properties: {
                      content: { type: "string" },
                      fileName: { type: "string" },
                      slug: { type: "string" },
                    },
                    required: ["content", "fileName", "slug"],
                    type: "object",
                  },
                },
              },
              description: "Template source",
            },
            "400": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Unknown template",
            },
          },
          summary: "Get template source",
          tags: ["templates"],
        },
      },
      "/r/{name}.json": {
        get: {
          description:
            "Canonical shadcn registry item used by `npx shadcn add @thegridcn/{name}`.",
          operationId: "getRegistryItem",
          parameters: [
            {
              in: "path",
              name: "name",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "Registry item JSON",
            },
            "404": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
              description: "Unknown registry item",
            },
          },
          summary: "Get a shadcn registry item",
          tags: ["registry"],
        },
      },
      "/tokens/{theme}.css": {
        get: {
          operationId: "getThemeCss",
          parameters: [
            {
              in: "path",
              name: "theme",
              required: true,
              schema: { enum: THEME_ENUM, type: "string" },
            },
          ],
          responses: {
            "200": {
              content: {
                "text/css": { schema: { type: "string" } },
              },
              description: "Theme CSS variables",
            },
          },
          summary: "Download theme tokens as CSS",
          tags: ["tokens"],
        },
      },
      "/tokens/{theme}.json": {
        get: {
          operationId: "getThemeJson",
          parameters: [
            {
              in: "path",
              name: "theme",
              required: true,
              schema: { enum: THEME_ENUM, type: "string" },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": { schema: { type: "object" } },
              },
              description: "Theme tokens as JSON",
            },
          },
          summary: "Download theme tokens as JSON",
          tags: ["tokens"],
        },
      },
      "/tokens/index.json": {
        get: {
          operationId: "listThemeTokens",
          responses: {
            "200": {
              content: {
                "application/json": { schema: { type: "object" } },
              },
              description: "Token file manifest",
            },
          },
          summary: "List theme token files",
          tags: ["tokens"],
        },
      },
    },
    servers: [{ url: SITE_ORIGIN }],
  };
}
