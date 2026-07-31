"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface CTABannerProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  title: string;
  variant?: "default" | "highlight";
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
  className,
  ...props
}: CTABannerProps) {
  return (
    <div
      data-slot="tron-cta-banner"
      className={cn(
        "group relative overflow-hidden rounded border bg-card/80 px-6 py-8 text-center backdrop-blur-sm",
        variant === "highlight"
          ? "border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb,0,180,255),0.08)]"
          : "border-primary/20",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Animated top border glow */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "ctaSweep 4s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes ctaSweep {
          0%, 100% { margin-left: -10%; }
          50% { margin-left: 77%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative">
        <h3 className="font-bold font-display text-foreground text-lg uppercase tracking-wider md:text-xl">
          {title}
        </h3>
        {description ? (
          <p className="mx-auto mt-2 max-w-md text-foreground/60 text-sm">
            {description}
          </p>
        ) : null}

        {/* Actions */}
        {primaryAction || secondaryAction ? (
          <div className="mt-5 flex items-center justify-center gap-3">
            {primaryAction ? (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] text-primary uppercase tracking-widest shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
              >
                {primaryAction.label}
              </button>
            ) : null}
            {secondaryAction ? (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] text-foreground/60 uppercase tracking-widest transition-colors hover:border-primary/50 hover:text-primary"
              >
                {secondaryAction.label}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-primary/40 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-5 w-5 border-primary/40 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-primary/40 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-primary/40 border-r-2 border-b-2" />
    </div>
  );
}
