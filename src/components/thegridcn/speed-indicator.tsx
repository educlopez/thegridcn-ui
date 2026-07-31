"use client";

import { cn } from "@/lib/utils";

interface SpeedIndicatorProps {
  className?: string;
  maxSpeed?: number;
  speed: number;
}

export function SpeedIndicator({
  speed,
  maxSpeed = 200,
  className,
}: SpeedIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-bold font-mono text-3xl text-primary">{speed}</span>
      <div className="flex flex-col">
        <span className="text-[10px] text-foreground/80 uppercase tracking-widest">
          KM/H
        </span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(speed / maxSpeed) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
