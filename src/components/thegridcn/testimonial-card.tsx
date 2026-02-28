"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  author: string
  role?: string
  avatar?: string
  rating?: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating,
  className,
  ...props
}: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      data-slot="tron-testimonial-card"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/80 p-5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Quote mark */}
      <div className="mb-3 font-display text-2xl leading-none text-primary/30">"</div>

      {/* Quote text */}
      <p className="text-sm leading-relaxed text-foreground/80">{quote}</p>

      {/* Rating */}
      {rating !== undefined && (
        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={cn(
                "text-xs",
                i < rating ? "text-primary" : "text-foreground/15"
              )}
            >
              ◆
            </span>
          ))}
        </div>
      )}

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary/10">
          {avatar ? (
            <img src={avatar} alt={author} className="h-full w-full object-cover" />
          ) : (
            <span className="font-mono text-[10px] font-bold text-primary">{initials}</span>
          )}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-foreground">
            {author}
          </div>
          {role && (
            <div className="text-[10px] uppercase tracking-widest text-foreground/40">
              {role}
            </div>
          )}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
    </div>
  )
}
