import type { Metadata } from "next"
import { TronHeader } from "@/components/layout"
import { GameArena } from "./game-arena"

export const metadata: Metadata = {
  title: "Light Cycle Arena | The Gridcn",
  description:
    "Enter the Grid. Race your light cycle against AI opponents in this Tron-inspired mini-game. Choose your theme, leave your trail, and be the last program standing.",
  openGraph: {
    title: "Light Cycle Arena | The Gridcn",
    description:
      "Enter the Grid. Race your light cycle against AI opponents in this Tron-inspired mini-game.",
    url: "https://thegridcn.com/game",
  },
}

export default function GamePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TronHeader />
      <GameArena />
    </div>
  )
}
