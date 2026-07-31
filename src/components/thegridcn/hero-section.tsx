"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right";
  badge?: string;
  description?: string;
  subtitle?: string;
  title: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  badge,
  align = "center",
  children,
  className,
  ...props
}: HeroSectionProps) {
  const alignmentClasses = {
    center: "items-center text-center",
    left: "items-start text-left",
    right: "items-end text-right",
  };

  return (
    <div
      data-slot="tron-hero-section"
      className={cn(
        "group relative overflow-hidden rounded border border-primary/20 bg-card/80 px-6 py-16 backdrop-blur-sm md:px-12 md:py-24 lg:py-32",
        className
      )}
      {...props}
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Radial glow from center-top */}
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb,0,180,255),0.06),transparent_70%)]" />

      {/* Animated horizontal scan line */}
      <div
        className="pointer-events-none absolute right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{ animation: "heroScan 6s ease-in-out infinite" }}
      />

      {/* Animated top border glow */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px">
        <div
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "heroSweep 5s ease-in-out infinite" }}
        />
      </div>

      {/* Animated bottom border glow */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-px">
        <div
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "heroSweep 5s ease-in-out infinite reverse" }}
        />
      </div>

      <style jsx>{`
        @keyframes heroScan {
          0%, 100% { top: 20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 80%; }
        }
        @keyframes heroSweep {
          0%, 100% { margin-left: -10%; }
          50% { margin-left: 86%; }
        }
      `}</style>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex flex-col gap-4",
          alignmentClasses[align]
        )}
      >
        {/* Badge */}
        {badge ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.1)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
              {badge}
            </span>
          </div>
        ) : null}

        {/* Subtitle */}
        {subtitle ? (
          <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
            {subtitle}
          </div>
        ) : null}

        {/* Title */}
        <h1 className="max-w-4xl font-bold font-display text-3xl text-foreground uppercase tracking-wider md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Title underline accent */}
        <div
          className={cn(
            "flex gap-1",
            align === "center" && "justify-center",
            align === "right" && "justify-end"
          )}
        >
          <div className="h-px w-12 bg-primary/60" />
          <div className="h-px w-6 bg-primary/30" />
          <div className="h-px w-3 bg-primary/15" />
        </div>

        {/* Description */}
        {description ? (
          <p className="max-w-2xl text-foreground/60 text-sm leading-relaxed md:text-base">
            {description}
          </p>
        ) : null}

        {/* CTA / children */}
        {children ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {children}
          </div>
        ) : null}
      </div>

      {/* Side accent lines (left) */}
      <div className="pointer-events-none absolute top-8 bottom-8 left-0 flex flex-col justify-between">
        <div className="h-16 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="h-16 w-px bg-gradient-to-t from-primary/40 to-transparent" />
      </div>

      {/* Side accent lines (right) */}
      <div className="pointer-events-none absolute top-8 right-0 bottom-8 flex flex-col justify-between">
        <div className="h-16 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="h-16 w-px bg-gradient-to-t from-primary/40 to-transparent" />
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-primary/40 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-primary/40 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-primary/40 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-6 w-6 border-primary/40 border-r-2 border-b-2" />
    </div>
  );
}
