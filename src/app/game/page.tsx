import type { Metadata } from "next";
import { TronHeader } from "@/components/layout";
import { GameArena } from "./game-arena";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/game",
  },
  description:
    "Enter the Grid. Race your light cycle against AI opponents in this Tron-inspired mini-game. Choose your theme, leave your trail, and be the last program standing.",
  openGraph: {
    description:
      "Enter the Grid. Race your light cycle against AI opponents in this Tron-inspired mini-game.",
    title: "Light Cycle Arena | The Gridcn",
    url: "https://thegridcn.com/game",
  },
  title: "Light Cycle Arena | The Gridcn",
};

export default function GamePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TronHeader />
      <GameArena />
    </div>
  );
}
