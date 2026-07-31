import type { Metadata } from "next";
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates/login",
  },
  description:
    "Tron-inspired login template built with shadcn/ui components. Futuristic authentication forms with glow effects and Greek god color themes.",
  openGraph: {
    description:
      "Tron-inspired login template built with shadcn/ui components. Futuristic authentication forms with glow effects.",
    images: [{ height: 630, url: "/api/og/poseidon", width: 1200 }],
    title: "Login Template | The Gridcn",
    url: "https://thegridcn.com/templates/login",
  },
  title: "Login Template | The Gridcn",
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/poseidon"],
  },
};

export default function LoginPreviewPage() {
  return <TemplatePreviewer name="Login" slug="login" />;
}
