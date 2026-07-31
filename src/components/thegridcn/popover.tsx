"use client";

import type * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TronPopoverProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

function TronPopover({ children, ...props }: TronPopoverProps) {
  return (
    <Popover data-slot="tron-popover" {...props}>
      {children}
    </Popover>
  );
}

interface TronPopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

function TronPopoverTrigger({
  children,
  className,
  ...props
}: TronPopoverTriggerProps) {
  return (
    <PopoverTrigger
      data-slot="tron-popover-trigger"
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </PopoverTrigger>
  );
}

interface TronPopoverContentProps {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

function TronPopoverContent({
  children,
  className,
  align = "center",
  side = "bottom",
  sideOffset = 8,
  ...props
}: TronPopoverContentProps) {
  return (
    <PopoverContent
      data-slot="tron-popover-content"
      align={align}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/95 p-4 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)] backdrop-blur-md",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-primary/40 border-t border-l" />
      <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-primary/40 border-t border-r" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-primary/40 border-b border-l" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-primary/40 border-r border-b" />

      {/* Content */}
      <div className="relative">{children}</div>
    </PopoverContent>
  );
}

export { TronPopover, TronPopoverContent, TronPopoverTrigger };
