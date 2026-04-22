// TODO: add per-component routes at /components/[id] then include them here for deep SEO
import type { MetadataRoute } from "next"

const BASE_URL = "https://thegridcn.com"

const TEMPLATE_SLUGS = ["dashboard", "landing", "blog", "login", "analytics"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/components`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/game`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/docs/install`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tokens`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contributing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  const templateRoutes: MetadataRoute.Sitemap = TEMPLATE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...templateRoutes]
}
