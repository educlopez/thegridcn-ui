import type { Metadata } from "next";

export const TEMPLATE_PAGE_SLUGS = [
  "dashboard",
  "landing",
  "blog",
  "login",
  "analytics",
] as const;

export type TemplatePageSlug = (typeof TEMPLATE_PAGE_SLUGS)[number];

interface TemplatePageCopy {
  description: string;
  extract: string;
  name: string;
  ogImage: string;
  title: string;
}

export const TEMPLATE_PAGES: Record<TemplatePageSlug, TemplatePageCopy> = {
  analytics: {
    description:
      "Tron UI analytics template for React on shadcn/ui: metric cards and charts. Preview on The Gridcn, then install from the registry.",
    extract:
      "Tron UI analytics template for React on shadcn/ui. Metric cards, charts, and data panels with HUD styling and Greek-god color themes. Preview the dashboard, then install the chart blocks from the The Gridcn registry.",
    name: "Analytics",
    ogImage: "/api/og/clu",
    title: "Analytics Template | The Gridcn",
  },
  blog: {
    description:
      "Tron UI blog template for React on shadcn/ui: article layout and post grid. Preview on The Gridcn, then install from the registry.",
    extract:
      "Tron UI blog template for React on shadcn/ui. Article layout, post grid, and reading view with HUD chrome and Greek-god color themes. Preview the pages, then install the blocks from the The Gridcn registry.",
    name: "Blog",
    ogImage: "/api/og/athena",
    title: "Blog Template | The Gridcn",
  },
  dashboard: {
    description:
      "Tron UI dashboard template for React on shadcn/ui: HUD metrics and data grids. Preview on The Gridcn, then install from the registry.",
    extract:
      "Tron UI dashboard template for React on shadcn/ui. HUD-style metrics, data grids, and analytics panels with Greek-god color themes. Preview the layout, then install the matching blocks from the The Gridcn registry.",
    name: "Dashboard",
    ogImage: "/api/og/tron",
    title: "Dashboard Template | The Gridcn",
  },
  landing: {
    description:
      "Tron UI landing page template for React on shadcn/ui: hero and feature grid. Preview on The Gridcn, then install from the registry.",
    extract:
      "Tron UI landing page template for React on shadcn/ui. Hero, feature grid, and CTA sections with HUD styling and Greek-god color themes. Preview the composition, then pull the components from the The Gridcn registry.",
    name: "Landing Page",
    ogImage: "/api/og/ares",
    title: "Landing Page Template | The Gridcn",
  },
  login: {
    description:
      "Tron UI login template for React on shadcn/ui: authentication form and glow accents. Preview on The Gridcn, then install from the registry.",
    extract:
      "Tron UI login template for React on shadcn/ui. Authentication form with glow accents and Greek-god color themes. Preview the screen, then install the form blocks from the The Gridcn registry.",
    name: "Login",
    ogImage: "/api/og/poseidon",
    title: "Login Template | The Gridcn",
  },
};

export function templatePageMetadata(slug: TemplatePageSlug): Metadata {
  const page = TEMPLATE_PAGES[slug];
  const url = `https://thegridcn.com/templates/${slug}`;

  return {
    alternates: {
      canonical: url,
    },
    description: page.description,
    openGraph: {
      description: page.description,
      images: [{ height: 630, url: page.ogImage, width: 1200 }],
      title: page.title,
      url,
    },
    title: page.title,
    twitter: {
      card: "summary_large_image",
      images: [page.ogImage],
    },
  };
}
