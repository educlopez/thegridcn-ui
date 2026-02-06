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
  },
  twitter: {
    title: "Components | The Gridcn",
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
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
