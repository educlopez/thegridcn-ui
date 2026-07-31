"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface UplinkHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  leftText: string;
  rightText?: string;
  variant?:
    | "primary"
    | "cyan"
    | "orange"
    | "blue"
    | "purple"
    | "green"
    | "amber";
}

const variantStyles = {
  amber: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/30",
    text: "text-amber-400",
    textMuted: "text-amber-400",
  },
  blue: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
    text: "text-blue-400",
    textMuted: "text-blue-400",
  },
  cyan: {
    bg: "bg-cyan-500/5",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    textMuted: "text-cyan-400",
  },
  green: {
    bg: "bg-green-500/5",
    border: "border-green-500/30",
    text: "text-green-400",
    textMuted: "text-green-400",
  },
  orange: {
    bg: "bg-orange-500/5",
    border: "border-orange-500/30",
    text: "text-orange-400",
    textMuted: "text-orange-400",
  },
  primary: {
    bg: "bg-primary/5",
    border: "border-primary/30",
    text: "text-primary",
    textMuted: "text-primary",
  },
  purple: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/30",
    text: "text-purple-400",
    textMuted: "text-purple-400",
  },
};

export function UplinkHeader({
  leftText,
  rightText,
  variant = "primary",
  className,
  ...props
}: UplinkHeaderProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y px-4 py-1.5 font-mono text-[10px] tracking-widest",
        styles.border,
        styles.bg,
        className
      )}
      {...props}
    >
      <span className={styles.text}>{leftText}</span>
      {rightText ? <span className={styles.textMuted}>{rightText}</span> : null}
    </div>
  );
}
