"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  description?: string;
  title: string;
}

export function SectionWrapper({
  title,
  description,
  children,
  className,
  ...props
}: SectionWrapperProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id={id} className={cn("scroll-mt-20 py-12", className)} {...props}>
      <div className="mb-8">
        <h2 className="glow-text mb-2 font-bold text-2xl tracking-wider">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

interface ComponentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
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
        "hover:glow-sm rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/50",
        className
      )}
      {...props}
    >
      <h3 className="mb-4 font-semibold text-primary text-sm uppercase tracking-widest">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
