"use client";

import { SHADCN_PRIMITIVES } from "@/lib/shadcn-primitive";
import { cn } from "@/lib/utils";
import { usePrimitive } from "./primitive-provider";

export function PrimitiveSwitcher({ className }: { className?: string }) {
  const { primitive, setPrimitive } = usePrimitive();

  return (
    <fieldset
      className={cn(
        "m-0 grid min-w-0 grid-cols-2 gap-2 border-0 p-0",
        className
      )}
    >
      <legend className="sr-only">UI library</legend>
      {SHADCN_PRIMITIVES.map((option) => {
        const isActive = primitive === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setPrimitive(option.id)}
            className={cn(
              "relative rounded border px-2 py-2 text-center transition-all",
              isActive
                ? "border-primary bg-primary/10"
                : "border-primary/20 bg-card/20 hover:border-primary/50 hover:bg-card/40"
            )}
          >
            {isActive ? (
              <>
                <span className="absolute top-0 left-0 h-2 w-2 border-primary border-t border-l" />
                <span className="absolute top-0 right-0 h-2 w-2 border-primary border-t border-r" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-primary border-b border-l" />
                <span className="absolute right-0 bottom-0 h-2 w-2 border-primary border-r border-b" />
              </>
            ) : null}
            <span
              className={cn(
                "block font-mono text-[9px] tracking-wider",
                isActive ? "text-primary" : "text-foreground"
              )}
            >
              {option.label.toUpperCase()}
            </span>
            <span className="mt-0.5 block font-mono text-[8px] text-foreground/50">
              {option.style}
            </span>
          </button>
        );
      })}
    </fieldset>
  );
}

export function PrimitiveSwitcherCompact({
  className,
}: {
  className?: string;
}) {
  const { primitive, setPrimitive } = usePrimitive();

  return (
    <fieldset
      className={cn(
        "m-0 inline-flex min-w-0 border border-primary/30 bg-panel p-0 font-mono text-[10px]",
        className
      )}
    >
      <legend className="sr-only">UI library</legend>
      {SHADCN_PRIMITIVES.map((option) => {
        const isActive = primitive === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setPrimitive(option.id)}
            className={cn(
              "px-2.5 py-1 uppercase tracking-wider transition-colors",
              isActive
                ? "bg-primary/20 text-primary"
                : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
            )}
          >
            {option.id}
          </button>
        );
      })}
    </fieldset>
  );
}
