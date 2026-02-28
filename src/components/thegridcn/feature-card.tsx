"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
  variant?: "default" | "highlight"
}

export function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      data-slot="tron-feature-card"
      className={cn(
        "group relative overflow-hidden rounded border bg-card/80 p-5 backdrop-blur-sm transition-all duration-300",
        variant === "highlight"
          ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)]"
          : "border-primary/20 hover:border-primary/40",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Hover glow sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Icon */}
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30 transition-colors duration-300 group-hover:border-primary/60" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30 transition-colors duration-300 group-hover:border-primary/60" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30 transition-colors duration-300 group-hover:border-primary/60" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30 transition-colors duration-300 group-hover:border-primary/60" />
    </div>
  )
}
