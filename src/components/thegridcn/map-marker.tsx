"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface MapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  coordinates?: string;
  label: string;
  showBeam?: boolean;
  variant?: "default" | "primary" | "danger" | "highlight";
}

export function MapMarker({
  label,
  variant = "default",
  coordinates,
  showBeam = false,
  className,
  ...props
}: MapMarkerProps) {
  const variantStyles = {
    danger: {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-500",
    },
    default: {
      bg: "bg-muted/80",
      border: "border-muted-foreground/50",
      text: "text-foreground",
    },
    highlight: {
      bg: "bg-primary/20",
      border: "border-primary",
      text: "text-primary",
    },
    primary: {
      bg: "bg-cyan-500/20",
      border: "border-cyan-500",
      text: "text-cyan-500",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      {...props}
    >
      {/* Beam effect */}
      {showBeam ? (
        <div
          className={cn(
            "absolute bottom-full left-1/2 h-32 w-0.5 -translate-x-1/2",
            variant === "danger" &&
              "bg-gradient-to-t from-red-500 to-transparent",
            variant === "primary" &&
              "bg-gradient-to-t from-cyan-500 to-transparent",
            variant === "highlight" &&
              "bg-gradient-to-t from-primary to-transparent",
            variant === "default" &&
              "bg-gradient-to-t from-muted-foreground to-transparent"
          )}
        />
      ) : null}

      {/* Marker label */}
      <div
        data-slot="tron-map-marker"
        data-variant={variant}
        className={cn(
          "relative rounded border px-3 py-1 font-bold font-mono text-sm uppercase tracking-wider",
          styles.bg,
          styles.border,
          styles.text
        )}
      >
        {/* Corner decorations */}
        <div className="absolute -top-px -left-px h-2 w-2 border-current border-t border-l opacity-50" />
        <div className="absolute -top-px -right-px h-2 w-2 border-current border-t border-r opacity-50" />
        <div className="absolute -bottom-px -left-px h-2 w-2 border-current border-b border-l opacity-50" />
        <div className="absolute -right-px -bottom-px h-2 w-2 border-current border-r border-b opacity-50" />

        {label}
      </div>

      {/* Pointer */}
      <div
        className={cn(
          "h-4 w-0.5",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Dot */}
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Coordinates */}
      {coordinates ? (
        <div className="mt-1 font-mono text-[10px] text-foreground/80">
          {coordinates}
        </div>
      ) : null}
    </div>
  );
}
