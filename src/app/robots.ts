import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/api/", "/r/"],
      userAgent: "*",
    },
    sitemap: "https://thegridcn.com/sitemap.xml",
  };
}
