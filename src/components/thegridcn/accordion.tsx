"use client";

import type * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TronAccordionItem {
  /** Content revealed when the item is expanded */
  content: React.ReactNode;
  /** Content shown in the trigger / header */
  trigger: React.ReactNode;
  /** Unique value identifier for the item. Defaults to index if omitted. */
  value?: string;
}

interface TronAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value(s) open by default. String for single, string[] for multiple. */
  defaultValue?: string | string[];
  /** Array of accordion items to render */
  items: TronAccordionItem[];
  /** Optional label displayed above the accordion */
  label?: string;
  /** Whether one or multiple items can be open at once */
  type?: "single" | "multiple";
}

export function TronAccordion({
  items,
  type = "single",
  defaultValue,
  label,
  className,
  ...props
}: TronAccordionProps) {
  // Build the correct props for each accordion variant
  const accordionProps =
    type === "multiple"
      ? {
          defaultValue: Array.isArray(defaultValue)
            ? defaultValue
            : defaultValue
              ? [defaultValue]
              : undefined,
          type: "multiple" as const,
        }
      : {
          collapsible: true,
          defaultValue: Array.isArray(defaultValue)
            ? defaultValue[0]
            : defaultValue,
          type: "single" as const,
        };

  return (
    <div
      data-slot="tron-accordion"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label ? (
        <div className="border-primary/20 border-b px-5 py-3 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
          {label}
        </div>
      ) : null}

      <ShadcnAccordion {...accordionProps} className="relative">
        {items.map((item, i) => {
          const value = item.value ?? `item-${i}`;
          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-primary/10 border-b last:border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "px-5 py-4 font-mono text-foreground/90 text-sm",
                  "hover:bg-primary/5 hover:no-underline",
                  "transition-colors",
                  "[&[data-state=open]]:text-primary [&[data-state=open]]:shadow-[inset_2px_0_0_0_hsl(var(--primary))]"
                )}
              >
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-foreground/50 text-xs leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </ShadcnAccordion>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
