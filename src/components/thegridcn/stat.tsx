"use client";

import { cn } from "@/lib/utils";

interface StatProps {
  direction?: "up" | "down" | "neutral";
  label: string;
  unit?: string;
  value: string | number;
}

export function Stat({ label, value, unit, direction }: StatProps) {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="text-[10px] text-foreground/80 uppercase tracking-widest">
        {label}
      </span>
      <span
        className={cn(
          "font-bold text-lg",
          direction === "up" && "text-green-500",
          direction === "down" && "text-red-500",
          direction === "neutral" && "text-primary"
        )}
      >
        {direction === "up" && "▲"}
        {direction === "down" && "▼"}
        {value}
        {unit ? <span className="ml-1 text-sm opacity-70">{unit}</span> : null}
      </span>
    </div>
  );
}
