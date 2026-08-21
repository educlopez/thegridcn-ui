// TODO: add per-component routes at /components/[id] then include them here for deep SEO
import type { MetadataRoute } from "next";

const BASE_URL = "https://thegridcn.com";

const TEMPLATE_SLUGS = ["dashboard", "landing", "blog", "login", "analytics"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: BASE_URL,
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.9,
      url: `${BASE_URL}/components`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.8,
      url: `${BASE_URL}/templates`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.6,
      url: `${BASE_URL}/game`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.8,
      url: `${BASE_URL}/docs/install`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.7,
      url: `${BASE_URL}/docs/api`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.7,
      url: `${BASE_URL}/tokens`,
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.6,
      url: `${BASE_URL}/changelog`,
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.5,
      url: `${BASE_URL}/contributing`,
    },
  ];

  const templateRoutes: MetadataRoute.Sitemap = TEMPLATE_SLUGS.map((slug) => ({
    changeFrequency: "monthly",
    lastModified: now,
    priority: 0.6,
    url: `${BASE_URL}/templates/${slug}`,
  }));

  return [...staticRoutes, ...templateRoutes];
}
