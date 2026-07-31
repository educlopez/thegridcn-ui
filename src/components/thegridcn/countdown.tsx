"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  variant?: "default" | "danger" | "warning";
}

export function Countdown({
  value,
  label,
  variant = "default",
  className,
  ...props
}: CountdownProps) {
  const variantStyles = {
    danger: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      text: "text-red-500",
    },
    default: {
      bg: "bg-primary/20",
      border: "border-primary/50",
      text: "text-primary",
    },
    warning: {
      bg: "bg-amber-500/20",
      border: "border-amber-500/50",
      text: "text-amber-500",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn("flex items-center gap-3 font-mono", className)}
      {...props}
    >
      <span className="text-foreground/80 text-sm uppercase tracking-widest">
        {label}:
      </span>
      <span
        data-slot="tron-countdown-value"
        data-variant={variant}
        className={cn(
          "rounded border px-3 py-1 font-bold text-lg tracking-wider",
          styles.bg,
          styles.text,
          styles.border
        )}
      >
        {value}
      </span>
    </div>
  );
}
