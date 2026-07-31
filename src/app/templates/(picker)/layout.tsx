import type { Metadata } from "next";
import { TronHeader } from "@/components/layout";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates",
  },
  description:
    "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more — all with Greek god color themes.",
  openGraph: {
    description:
      "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more.",
    images: [{ height: 630, url: "/api/og/ares", width: 1200 }],
    siteName: "The Gridcn",
    title: "Templates | The Gridcn",
    type: "website",
    url: "https://thegridcn.com/templates",
  },
  title: "Templates | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Full-page template examples built with Tron-inspired shadcn/ui components. Dashboard layouts, landing pages, and more.",
    images: ["/api/og/ares"],
    title: "Templates | The Gridcn",
  },
};

export default function TemplatesPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TronHeader />
      {children}
    </>
  );
}
