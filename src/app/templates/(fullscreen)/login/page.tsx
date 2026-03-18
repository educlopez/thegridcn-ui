import type { Metadata } from "next"
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer"

export const metadata: Metadata = {
  title: "Login Template | The Gridcn",
  description:
    "Tron-inspired login template built with shadcn/ui components. Futuristic authentication forms with glow effects and Greek god color themes.",
  openGraph: {
    title: "Login Template | The Gridcn",
    description:
      "Tron-inspired login template built with shadcn/ui components. Futuristic authentication forms with glow effects.",
    url: "https://thegridcn.com/templates/login",
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/login",
  },
}

export default function LoginPreviewPage() {
  return <TemplatePreviewer name="Login" slug="login" />
}
