"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  avatar?: string;
  quote: string;
  rating?: number;
  role?: string;
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
    .slice(0, 2);

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
      <div className="mb-3 font-display text-2xl text-primary/30 leading-none">
        &ldquo;
      </div>

      {/* Quote text */}
      <p className="text-foreground/80 text-sm leading-relaxed">{quote}</p>

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
      <div className="mt-4 flex items-center gap-3 border-border/30 border-t pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary/10">
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-bold font-mono text-[10px] text-primary">
              {initials}
            </span>
          )}
        </div>
        <div>
          <div className="font-bold text-foreground text-xs uppercase tracking-wider">
            {author}
          </div>
          {role ? (
            <div className="text-[10px] text-foreground/40 uppercase tracking-widest">
              {role}
            </div>
          ) : null}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/30 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/30 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/30 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/30 border-r-2 border-b-2" />
    </div>
  );
}
