"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  pulse?: boolean;
  size?: "sm" | "md";
  variant?: "default" | "success" | "warning" | "danger" | "outline";
}

export function Badge({
  variant = "default",
  size = "sm",
  dot = false,
  pulse = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<string, string> = {
    danger: "border-red-500/30 bg-red-500/10 text-red-400",
    default: "border-primary/30 bg-primary/10 text-primary",
    outline: "border-primary/20 bg-transparent text-foreground/50",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  const dotColors: Record<string, string> = {
    danger: "bg-red-400",
    default: "bg-primary",
    outline: "bg-foreground/40",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
  };

  return (
    <span
      data-slot="tron-badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-widest",
        size === "sm" ? "px-2 py-0.5 text-[8px]" : "px-2.5 py-1 text-[9px]",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot ? (
        <span className="relative flex h-1.5 w-1.5">
          {pulse ? (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          ) : null}
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColors[variant]
            )}
          />
        </span>
      ) : null}
      {children}
    </span>
  );
}
