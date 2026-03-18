import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Components | The Gridcn",
  description:
    "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, and radar displays.",
  openGraph: {
    type: "website",
    title: "Components | The Gridcn",
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
    url: "https://thegridcn.com/components",
    siteName: "The Gridcn",
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
