"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface CoordinateDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  bearing?: string;
  heading?: number;
  label?: string;
  latitude?: string;
  longitude?: string;
}

export function CoordinateDisplay({
  heading = 0,
  bearing = "NE",
  latitude,
  longitude,
  label,
  className,
  ...props
}: CoordinateDisplayProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end font-mono text-sm",
        className
      )}
      {...props}
    >
      {/* Heading */}
      <div className="flex items-baseline gap-1">
        <span className="font-bold text-lg text-primary">{heading}°</span>
        <span className="text-foreground/80 text-xs">{`${String(Math.floor(Math.random() * 200)).padStart(3, "0")}`}</span>
        <span className="font-bold text-primary">{bearing}</span>
      </div>

      {/* Lat/Long */}
      {latitude || longitude ? (
        <div className="text-[10px] text-foreground/80 uppercase tracking-widest">
          {latitude ? <span>LAT {latitude}</span> : null}
          {latitude ? longitude && <span> · </span> : null}
          {longitude ? <span>LNG {longitude}</span> : null}
        </div>
      ) : null}

      {/* Label */}
      {label ? (
        <div className="text-[10px] text-foreground/80 uppercase tracking-widest">
          {label}
        </div>
      ) : null}
    </div>
  );
}
