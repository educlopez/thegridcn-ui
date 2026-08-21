import { describe, expect, it } from "vitest";
import { estimateMarkdownTokens, prefersMarkdown } from "@/lib/agent/accept";
import { getAiCatalog } from "@/lib/agent/ai-catalog";
import {
  API_CATALOG_CONTENT_TYPE,
  getApiCatalog,
} from "@/lib/agent/api-catalog";
import { getHomepageLinkHeader } from "@/lib/agent/link-header";
import {
  getMarkdownForPath,
  isMarkdownDocumentPath,
} from "@/lib/agent/markdown";
import { getOpenApiDocument } from "@/lib/agent/openapi";
import { getRobotsTxt } from "@/lib/agent/robots-txt";
import {
  AGENT_SKILLS_SCHEMA,
  getAgentSkillsIndex,
  getSkillByName,
  skillDigest,
} from "@/lib/agent/skills";

describe("prefersMarkdown", () => {
  it("returns false when Accept is missing", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("")).toBe(false);
  });

  it("returns true for markdown-only clients", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown; charset=utf-8")).toBe(true);
  });

  it("returns false for browsers", () => {
    expect(
      prefersMarkdown(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      )
    ).toBe(false);
  });

  it("prefers markdown when it outranks html", () => {
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
  });
});

describe("estimateMarkdownTokens", () => {
  it("uses a 4-chars-per-token estimate", () => {
    expect(estimateMarkdownTokens("abcd")).toBe(1);
    expect(estimateMarkdownTokens("abcdefgh")).toBe(2);
  });
});

describe("api catalog", () => {
  it("lists registry, components, and leaderboard anchors", () => {
    const catalog = getApiCatalog();
    const anchors = catalog.linkset.map((entry) => entry.anchor);

    expect(catalog.linkset.length).toBeGreaterThan(0);
    expect(anchors.some((anchor) => anchor.endsWith("/r"))).toBe(true);
    expect(anchors.some((anchor) => anchor.includes("/api/leaderboard"))).toBe(
      true
    );

    for (const entry of catalog.linkset) {
      expect(entry["service-desc"][0]?.href).toContain("/openapi.json");
      expect(entry["service-doc"].length).toBeGreaterThan(0);
      expect(entry.status[0]?.href).toContain("/api/health");
    }
  });

  it("uses the RFC 9727 linkset content type", () => {
    expect(API_CATALOG_CONTENT_TYPE).toContain("application/linkset+json");
    expect(API_CATALOG_CONTENT_TYPE).toContain("rfc9727");
  });
});

describe("ai catalog", () => {
  it("publishes a host and entries with url XOR data", () => {
    const catalog = getAiCatalog();

    expect(catalog.specVersion).toBe("1.0");
    expect(catalog.host.displayName).toBe("The Gridcn");
    expect(catalog.host.identifier).toBe("did:web:thegridcn.com");
    expect(catalog.entries.length).toBeGreaterThan(0);

    for (const entry of catalog.entries) {
      expect(entry.identifier.startsWith("urn:air:thegridcn.com:")).toBe(true);
      expect(entry.url).toMatch(/^https:\/\//);
      expect(entry).not.toHaveProperty("data");
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5);
    }
  });
});

describe("agent skills index", () => {
  it("matches the discovery RFC and hashes SKILL.md bytes", () => {
    const index = getAgentSkillsIndex();
    const skill = getSkillByName("thegridcn-install");

    expect(index.$schema).toBe(AGENT_SKILLS_SCHEMA);
    expect(skill).toBeDefined();
    expect(index.skills[0]?.name).toBe("thegridcn-install");
    expect(index.skills[0]?.type).toBe("skill-md");
    expect(index.skills[0]?.url).toBe(
      "/.well-known/agent-skills/thegridcn-install/SKILL.md"
    );
    expect(index.skills[0]?.digest).toBe(skillDigest(skill?.body ?? ""));
    expect(index.skills[0]?.digest).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(skill?.body.startsWith("---\nname: thegridcn-install\n")).toBe(true);
  });
});

describe("openapi", () => {
  it("describes the public registry and health endpoints", () => {
    const spec = getOpenApiDocument();

    expect(spec.openapi).toBe("3.1.0");
    expect(spec.paths["/r/{name}.json"]).toBeDefined();
    expect(spec.paths["/api/health"]).toBeDefined();
    expect(spec.paths["/api/registry/{component}"]).toBeDefined();
    expect(spec.servers[0]?.url).toBe("https://thegridcn.com");
  });
});

describe("robots.txt", () => {
  it("declares content signals and an agentmap", () => {
    const robots = getRobotsTxt();

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain(
      "Content-Signal: ai-train=yes, search=yes, ai-input=yes"
    );
    expect(robots).toContain("Sitemap: https://thegridcn.com/sitemap.xml");
    expect(robots).toContain(
      "Agentmap: https://thegridcn.com/.well-known/ai-catalog.json"
    );
  });
});

describe("link header", () => {
  it("advertises api-catalog and service-desc relations", () => {
    const header = getHomepageLinkHeader();

    expect(header).toContain('rel="api-catalog"');
    expect(header).toContain('rel="service-desc"');
    expect(header).toContain('rel="service-doc"');
    expect(header).toContain("/.well-known/api-catalog");
    expect(header).toContain("/openapi.json");
  });
});

describe("markdown pages", () => {
  it("renders homepage and install docs", () => {
    const home = getMarkdownForPath("/");
    const install = getMarkdownForPath("/docs/install");

    expect(home.body).toContain("# The Gridcn");
    expect(home.body).toContain("npx shadcn@latest add @thegridcn/button");
    expect(home.tokens).toBeGreaterThan(1);
    expect(install.body).toContain("Install guide");
    expect(install.body).toContain("@thegridcn");
  });

  it("only treats HTML document paths as markdown-negotiable", () => {
    expect(isMarkdownDocumentPath("/")).toBe(true);
    expect(isMarkdownDocumentPath("/docs/install")).toBe(true);
    expect(isMarkdownDocumentPath("/api/health")).toBe(false);
    expect(isMarkdownDocumentPath("/.well-known/api-catalog")).toBe(false);
    expect(isMarkdownDocumentPath("/openapi.json")).toBe(false);
    expect(isMarkdownDocumentPath("/favicon.svg")).toBe(false);
  });
});
