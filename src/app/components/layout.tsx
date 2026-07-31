import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/components",
  },
  description:
    "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, and radar displays.",
  openGraph: {
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    siteName: "The Gridcn",
    title: "Components | The Gridcn",
    type: "website",
    url: "https://thegridcn.com/components",
  },
  title: "Components | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Browse 55+ Tron-inspired UI components for shadcn/ui. Data cards, HUD elements, 3D grids, radar displays, and more.",
    images: ["/api/og/tron"],
    title: "Components | The Gridcn",
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
