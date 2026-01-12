"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
}

export function SectionWrapper({
  title,
  description,
  children,
  className,
  ...props
}: SectionWrapperProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-")

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-12", className)}
      {...props}
    >
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold tracking-wider glow-text">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  )
}

interface ComponentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

export function ComponentCard({
  title,
  children,
  className,
  ...props
}: ComponentCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/50 hover:glow-sm",
        className
      )}
      {...props}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
