"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  answer: string;
  question: string;
}

interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FAQItem[];
  label?: string;
  /** Allow multiple items open at once */
  multiple?: boolean;
}

export function FAQ({
  items,
  label,
  multiple = false,
  className,
  ...props
}: FAQProps) {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  function toggle(idx: number) {
    setOpenItems((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  return (
    <div
      data-slot="tron-faq"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label ? (
        <div className="border-primary/20 border-b px-5 py-3 text-[10px] text-foreground/50 uppercase tracking-widest">
          {label}
        </div>
      ) : null}

      <div className="relative divide-y divide-primary/10">
        {items.map((item, i) => {
          const isOpen = openItems.has(i);
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-primary/5"
              >
                {/* Animated plus/minus icon */}
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <span className="absolute h-px w-3 bg-primary/60 transition-transform" />
                  <span
                    className={cn(
                      "absolute h-3 w-px bg-primary/60 transition-transform duration-200",
                      isOpen && "rotate-90 opacity-0"
                    )}
                  />
                </span>
                <span className="font-mono text-foreground/90 text-sm">
                  {item.question}
                </span>
              </button>

              {/* Answer with slide animation */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 pl-12 text-foreground/50 text-xs leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
