"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const variantStyles = {
  default:
    "border-primary/30 bg-card/80 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary-rgb),0.08)]",
  elevated:
    "border-primary/50 bg-card/90 backdrop-blur-md shadow-[0_0_25px_rgba(var(--primary-rgb),0.15),inset_0_1px_0_rgba(var(--primary-rgb),0.1)]",
  ghost:
    "border-primary/10 bg-transparent shadow-none",
} as const

type TronCardVariant = keyof typeof variantStyles

// ---------------------------------------------------------------------------
// TronCard
// ---------------------------------------------------------------------------

interface TronCardProps extends React.ComponentProps<"div"> {
  variant?: TronCardVariant
}

function TronCard({
  variant = "default",
  className,
  children,
  ...props
}: TronCardProps) {
  return (
    <Card
      data-slot="tron-card"
      data-variant={variant}
      className={cn(
        "relative overflow-hidden rounded border text-card-foreground",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-4 w-4 border-b-2 border-r-2 border-primary/40" />

      {children}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// TronCardHeader
// ---------------------------------------------------------------------------

type TronCardHeaderProps = React.ComponentProps<"div">

function TronCardHeader({ className, ...props }: TronCardHeaderProps) {
  return (
    <CardHeader
      data-slot="tron-card-header"
      className={cn("border-b border-primary/20 px-4 py-3", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// TronCardTitle
// ---------------------------------------------------------------------------

type TronCardTitleProps = React.ComponentProps<"div">

function TronCardTitle({ className, ...props }: TronCardTitleProps) {
  return (
    <CardTitle
      data-slot="tron-card-title"
      className={cn(
        "font-display text-sm font-bold uppercase tracking-wider text-foreground",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// TronCardDescription
// ---------------------------------------------------------------------------

type TronCardDescriptionProps = React.ComponentProps<"div">

function TronCardDescription({
  className,
  ...props
}: TronCardDescriptionProps) {
  return (
    <CardDescription
      data-slot="tron-card-description"
      className={cn(
        "font-mono text-[10px] uppercase tracking-widest text-foreground/60",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// TronCardContent
// ---------------------------------------------------------------------------

type TronCardContentProps = React.ComponentProps<"div">

function TronCardContent({ className, ...props }: TronCardContentProps) {
  return (
    <CardContent
      data-slot="tron-card-content"
      className={cn("relative px-4 py-3", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// TronCardFooter
// ---------------------------------------------------------------------------

type TronCardFooterProps = React.ComponentProps<"div">

function TronCardFooter({ className, ...props }: TronCardFooterProps) {
  return (
    <CardFooter
      data-slot="tron-card-footer"
      className={cn(
        "border-t border-primary/20 px-4 py-3",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  TronCard,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
  TronCardContent,
  TronCardFooter,
}

export type { TronCardProps, TronCardVariant }
