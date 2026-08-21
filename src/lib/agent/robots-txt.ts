import { SITE_ORIGIN } from "@/lib/site";

export function getRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /r/
Content-Signal: ai-train=yes, search=yes, ai-input=yes

Sitemap: ${SITE_ORIGIN}/sitemap.xml
Agentmap: ${SITE_ORIGIN}/.well-known/ai-catalog.json
`;
}
