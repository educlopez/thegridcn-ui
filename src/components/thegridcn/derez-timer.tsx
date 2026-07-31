"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface DerezTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  milliseconds?: number;
  minutes: number;
  seconds: number;
}

export function DerezTimer({
  minutes,
  seconds,
  milliseconds = 0,
  className,
  ...props
}: DerezTimerProps) {
  return (
    <div
      data-slot="tron-derez-timer"
      className={cn(
        "inline-flex flex-col items-end rounded border border-primary/30 bg-primary/10 px-4 py-2",
        className
      )}
      {...props}
    >
      <div className="text-[10px] text-primary/70 uppercase tracking-widest">
        TIME TO DE-RESOLUTION
      </div>
      <div className="flex items-baseline">
        <span className="glow-text font-bold font-mono text-4xl text-primary tracking-wider">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        {milliseconds > 0 && (
          <span className="ml-1 font-mono text-lg text-primary/70">
            -{String(milliseconds).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}
