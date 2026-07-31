"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface BeamMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  beamColor?: "red" | "cyan" | "amber" | "primary";
  beamHeight?: number;
  coordinates?: string;
  label: string;
  sublabel?: string;
}

const colorStyles = {
  amber: {
    beam: "from-amber-500 to-transparent",
    bg: "bg-amber-500/90",
    line: "bg-amber-500",
  },
  cyan: {
    beam: "from-cyan-500 to-transparent",
    bg: "bg-cyan-500/90",
    line: "bg-cyan-500",
  },
  primary: {
    beam: "from-primary to-transparent",
    bg: "bg-primary/90",
    line: "bg-primary",
  },
  red: {
    beam: "from-red-500 to-transparent",
    bg: "bg-red-500/90",
    line: "bg-red-500",
  },
};

export function BeamMarker({
  label,
  sublabel,
  beamColor = "red",
  coordinates,
  beamHeight = 96,
  className,
  ...props
}: BeamMarkerProps) {
  const colors = colorStyles[beamColor];

  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      {...props}
    >
      {/* Vertical beam */}
      <div
        className={cn("w-0.5 bg-gradient-to-t", colors.beam)}
        style={{ filter: "blur(1px)", height: beamHeight }}
      />

      {/* Label box */}
      <div
        data-slot="tron-beam-marker"
        data-color={beamColor}
        className={cn(
          "relative px-4 py-1 font-bold font-mono text-sm text-white tracking-wider",
          colors.bg
        )}
      >
        {label}
        {/* Corner brackets */}
        <div className="absolute -top-1 -left-1 h-2 w-2 border-white/50 border-t border-l" />
        <div className="absolute -top-1 -right-1 h-2 w-2 border-white/50 border-t border-r" />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 border-white/50 border-b border-l" />
        <div className="absolute -right-1 -bottom-1 h-2 w-2 border-white/50 border-r border-b" />
      </div>

      {/* Sublabel */}
      {sublabel ? (
        <div className="mt-1 font-mono text-[9px] text-foreground/80 tracking-widest">
          {sublabel}
        </div>
      ) : null}

      {/* Pointer line */}
      <div className={cn("h-4 w-0.5", colors.line)} />

      {/* Coordinates */}
      {coordinates ? (
        <div className="mt-1 font-mono text-[8px] text-foreground/80">
          {coordinates}
        </div>
      ) : null}
    </div>
  );
}
