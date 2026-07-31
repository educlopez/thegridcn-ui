"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface GlowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  intensity?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export function GlowContainer({
  children,
  className,
  intensity = "md",
  pulse = false,
  hover = true,
  ...props
}: GlowContainerProps) {
  const glowClass = {
    lg: "glow-lg",
    md: "glow",
    sm: "glow-sm",
  }[intensity];

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-all duration-300",
        hover && "hover:glow-border",
        pulse && "glow-pulse",
        !(hover || pulse) && glowClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
