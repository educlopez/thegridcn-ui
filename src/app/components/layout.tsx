import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Components | The Gridcn",
  description:
    "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more — all with Greek god color themes and glow effects.",
  openGraph: {
    title: "Components | The Gridcn",
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
    url: "https://thegridcn.com/components",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Components | The Gridcn",
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://thegridcn.com/components",
  },
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
