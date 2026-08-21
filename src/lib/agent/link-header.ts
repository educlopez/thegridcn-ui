/**
 * RFC 8288 Link header advertised on the homepage so agents can find
 * catalogs, OpenAPI, and docs without scraping HTML.
 */
export function getHomepageLinkHeader(): string {
  return [
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
    '</docs/api>; rel="service-doc"; type="text/html"',
    '</docs/install>; rel="service-doc"; type="text/html"',
    '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
    '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  ].join(", ");
}
