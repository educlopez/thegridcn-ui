import type { Metadata } from "next";
import { HomePage } from "./home-page";

const title = "Tron UI for shadcn/ui | The Gridcn";
const description =
  "Tron UI kit for React on shadcn/ui: HUD components, Greek-god color themes, and Three.js effects. Install from the registry and ship.";

export const metadata: Metadata = {
  description,
  openGraph: {
    description,
    images: [{ height: 630, url: "/og-image.png", width: 1200 }],
    siteName: "The Gridcn",
    title,
    type: "website",
    url: "https://thegridcn.com",
  },
  title: { absolute: title },
  twitter: {
    card: "summary_large_image",
    description,
    images: ["/og-image.png"],
    title,
  },
};

export default function Page() {
  return <HomePage />;
}
