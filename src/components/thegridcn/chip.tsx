"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  onRemove?: () => void;
  selected?: boolean;
  size?: "sm" | "md";
  variant?: "default" | "success" | "warning" | "danger";
}

export function Chip({
  selected = false,
  onRemove,
  variant = "default",
  size = "sm",
  disabled = false,
  className,
  children,
  ...props
}: ChipProps) {
  const variants: Record<string, { base: string; active: string }> = {
    danger: {
      active: "border-red-500/40 bg-red-500/10 text-red-400",
      base: "border-red-500/15 text-foreground/40 hover:border-red-500/30 hover:text-red-400/70",
    },
    default: {
      active:
        "border-primary/40 bg-primary/10 text-primary shadow-[0_0_6px_rgba(var(--primary-rgb,0,180,255),0.1)]",
      base: "border-primary/15 text-foreground/40 hover:border-primary/30 hover:text-foreground/60",
    },
    success: {
      active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      base: "border-emerald-500/15 text-foreground/40 hover:border-emerald-500/30 hover:text-emerald-400/70",
    },
    warning: {
      active: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      base: "border-amber-500/15 text-foreground/40 hover:border-amber-500/30 hover:text-amber-400/70",
    },
  };

  const v = variants[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      data-slot="tron-chip"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-widest transition-all",
        size === "sm" ? "px-2.5 py-0.5 text-[8px]" : "px-3 py-1 text-[9px]",
        disabled && "cursor-not-allowed opacity-40",
        selected ? v.active : v.base,
        className
      )}
      {...props}
    >
      {children}
      {onRemove ? (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              onRemove();
            }
          }}
          className="ml-0.5 flex h-3 w-3 items-center justify-center rounded-full hover:bg-foreground/10"
        >
          <svg
            aria-hidden="true"
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
          >
            <path
              d="M0.5 0.5l4 4M4.5 0.5l-4 4"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ) : null}
    </button>
  );
}
