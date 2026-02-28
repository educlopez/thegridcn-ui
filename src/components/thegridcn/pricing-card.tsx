"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  price: string
  period?: string
  description?: string
  features: PricingFeature[]
  ctaText?: string
  onCtaClick?: () => void
  highlighted?: boolean
  badge?: string
}

export function PricingCard({
  title,
  price,
  period = "/mo",
  description,
  features,
  ctaText = "SELECT PLAN",
  onCtaClick,
  highlighted = false,
  badge,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      data-slot="tron-pricing-card"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded border bg-card/80 backdrop-blur-sm transition-all duration-300",
        highlighted
          ? "border-primary/60 shadow-[0_0_30px_rgba(var(--primary-rgb,0,180,255),0.1)]"
          : "border-primary/20 hover:border-primary/40",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Badge */}
      {badge && (
        <div className="absolute right-3 top-3 rounded border border-primary/50 bg-primary/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
          {badge}
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "border-b px-5 pb-4 pt-5",
        highlighted ? "border-primary/30" : "border-border/50"
      )}>
        <div className="text-[10px] uppercase tracking-widest text-foreground/60">
          {title}
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-foreground">{price}</span>
          <span className="font-mono text-sm text-foreground/40">{period}</span>
        </div>
        {description && (
          <p className="mt-1.5 text-xs text-foreground/50">{description}</p>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 space-y-2.5 px-5 py-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className={cn(
              "mt-0.5 shrink-0 font-mono text-[10px]",
              feature.included ? "text-green-500" : "text-foreground/20"
            )}>
              {feature.included ? "✓" : "—"}
            </span>
            <span className={cn(
              feature.included ? "text-foreground/80" : "text-foreground/30"
            )}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <button
          onClick={onCtaClick}
          className={cn(
            "w-full rounded border py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300",
            highlighted
              ? "border-primary bg-primary/20 text-primary hover:bg-primary/30 shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)]"
              : "border-primary/30 text-foreground/60 hover:border-primary/50 hover:text-primary"
          )}
        >
          {ctaText}
        </button>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}
