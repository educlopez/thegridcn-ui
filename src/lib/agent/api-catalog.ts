import { SITE_ORIGIN } from "@/lib/site";

export interface ApiCatalogLink {
  href: string;
  type?: string;
}

export interface ApiCatalogEntry {
  anchor: string;
  "service-desc": ApiCatalogLink[];
  "service-doc": ApiCatalogLink[];
  status: ApiCatalogLink[];
}

export interface ApiCatalogDocument {
  linkset: ApiCatalogEntry[];
}

const OPENAPI: ApiCatalogLink = {
  href: `${SITE_ORIGIN}/openapi.json`,
  type: "application/openapi+json",
};

const API_DOCS: ApiCatalogLink = {
  href: `${SITE_ORIGIN}/docs/api`,
  type: "text/html",
};

const INSTALL_DOCS: ApiCatalogLink = {
  href: `${SITE_ORIGIN}/docs/install`,
  type: "text/html",
};

const HEALTH: ApiCatalogLink = {
  href: `${SITE_ORIGIN}/api/health`,
  type: "application/json",
};

export const API_CATALOG_CONTENT_TYPE =
  'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"';

export function getApiCatalog(): ApiCatalogDocument {
  return {
    linkset: [
      {
        anchor: `${SITE_ORIGIN}/r`,
        "service-desc": [OPENAPI],
        "service-doc": [INSTALL_DOCS, API_DOCS],
        status: [HEALTH],
      },
      {
        anchor: `${SITE_ORIGIN}/api/registry`,
        "service-desc": [OPENAPI],
        "service-doc": [INSTALL_DOCS, API_DOCS],
        status: [HEALTH],
      },
      {
        anchor: `${SITE_ORIGIN}/api/components`,
        "service-desc": [OPENAPI],
        "service-doc": [API_DOCS],
        status: [HEALTH],
      },
      {
        anchor: `${SITE_ORIGIN}/api/template-source`,
        "service-desc": [OPENAPI],
        "service-doc": [API_DOCS],
        status: [HEALTH],
      },
      {
        anchor: `${SITE_ORIGIN}/api/leaderboard`,
        "service-desc": [OPENAPI],
        "service-doc": [API_DOCS],
        status: [HEALTH],
      },
    ],
  };
}
