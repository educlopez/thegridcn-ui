import type { Metadata } from "next"
import { TronHeader } from "@/components/layout"

export const metadata: Metadata = {
  title: "Templates | The Gridcn",
  description:
    "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more — all with Greek god color themes.",
  openGraph: {
    title: "Templates | The Gridcn",
    description:
      "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more.",
    url: "https://thegridcn.com/templates",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Templates | The Gridcn",
    description:
      "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://thegridcn.com/templates",
  },
}

export default function TemplatesPickerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TronHeader />
      {children}
    </>
  )
}
