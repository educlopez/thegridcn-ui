"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy" | "away" | "error";
}

export function StatusDot({
  status = "offline",
  pulse = false,
  size = "md",
  label,
  className,
  ...props
}: StatusDotProps) {
  const statusColors: Record<string, { dot: string; ping: string }> = {
    away: {
      dot: "bg-amber-400",
      ping: "bg-amber-400",
    },
    busy: {
      dot: "bg-red-400",
      ping: "bg-red-400",
    },
    error: {
      dot: "bg-red-500",
      ping: "bg-red-500",
    },
    offline: {
      dot: "bg-foreground/30",
      ping: "bg-foreground/30",
    },
    online: {
      dot: "bg-emerald-400",
      ping: "bg-emerald-400",
    },
  };

  const sizes: Record<string, { dot: string; wrapper: string }> = {
    lg: { dot: "h-3.5 w-3.5", wrapper: "h-3.5 w-3.5" },
    md: { dot: "h-2.5 w-2.5", wrapper: "h-2.5 w-2.5" },
    sm: { dot: "h-1.5 w-1.5", wrapper: "h-1.5 w-1.5" },
  };

  const colors = statusColors[status];
  const sizeClasses = sizes[size];

  return (
    <span
      data-slot="tron-status-dot"
      className={cn(
        "inline-flex items-center gap-2 font-mono uppercase tracking-widest",
        className
      )}
      {...props}
    >
      <span className={cn("relative flex", sizeClasses.wrapper)}>
        {pulse && status !== "offline" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              colors.ping
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full shadow-[0_0_6px_currentColor]",
            sizeClasses.dot,
            colors.dot
          )}
        />
      </span>
      {label ? (
        <span
          className={cn(
            "text-foreground/50",
            size === "sm" && "text-[8px]",
            size === "md" && "text-[9px]",
            size === "lg" && "text-[10px]"
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
