import { SITE_HOST, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export interface AiCatalogHost {
  displayName: string;
  identifier: string;
}

export interface AiCatalogEntry {
  displayName: string;
  identifier: string;
  representativeQueries: string[];
  type: string;
  url: string;
}

export interface AiCatalogDocument {
  entries: AiCatalogEntry[];
  host: AiCatalogHost;
  specVersion: string;
}

export function getAiCatalog(): AiCatalogDocument {
  return {
    entries: [
      {
        displayName: "The Gridcn OpenAPI description",
        identifier: `urn:air:${SITE_HOST}:api:openapi`,
        representativeQueries: [
          "how do I install a thegridcn component from the registry API",
          "what query parameters does the registry theme endpoint accept",
          "where is the OpenAPI spec for thegridcn.com",
          "fetch a shadcn registry item JSON for radar",
        ],
        type: "application/openapi+json",
        url: `${SITE_ORIGIN}/openapi.json`,
      },
      {
        displayName: "The Gridcn API catalog",
        identifier: `urn:air:${SITE_HOST}:api:catalog`,
        representativeQueries: [
          "list public APIs on thegridcn.com",
          "where is the shadcn component registry hosted",
          "find the health endpoint for thegridcn APIs",
        ],
        type: "application/linkset+json",
        url: `${SITE_ORIGIN}/.well-known/api-catalog`,
      },
      {
        displayName: "Install The Gridcn components",
        identifier: `urn:air:${SITE_HOST}:skill:install`,
        representativeQueries: [
          "install thegridcn radar with the shadcn CLI",
          "add the Ares theme to a shadcn project",
          "register the @thegridcn namespace in components.json",
          "how do I load Grid3D without breaking SSR",
        ],
        type: "text/markdown",
        url: `${SITE_ORIGIN}/.well-known/agent-skills/thegridcn-install/SKILL.md`,
      },
      {
        displayName: "The Gridcn install guide",
        identifier: `urn:air:${SITE_HOST}:docs:install`,
        representativeQueries: [
          "how do I use thegridcn with Next.js",
          "where are the downloadable theme tokens",
          "what themes does thegridcn ship",
        ],
        type: "text/html",
        url: `${SITE_ORIGIN}/docs/install`,
      },
    ],
    host: {
      displayName: SITE_NAME,
      identifier: `did:web:${SITE_HOST}`,
    },
    specVersion: "1.0",
  };
}
