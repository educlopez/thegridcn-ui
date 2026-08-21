import type { NextConfig } from "next";
import { getHomepageLinkHeader } from "./src/lib/agent/link-header";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: "Link",
            value: getHomepageLinkHeader(),
          },
        ],
        source: "/",
      },
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://shoogle.dev",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
        source: "/(.*)",
      },
    ];
  },
};

export default nextConfig;
