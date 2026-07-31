"use client";

import * as React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TronCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  interval?: number;
  items: React.ReactNode[];
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  showArrows?: boolean;
  showDots?: boolean;
}

export function TronCarousel({
  items,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  orientation = "horizontal",
  loop = false,
  className,
  ...props
}: TronCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play logic
  React.useEffect(() => {
    if (!(autoPlay && api)) {
      return;
    }

    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [api, autoPlay, interval]);

  return (
    <div
      data-slot="tron-carousel"
      className={cn("group/carousel relative", className)}
      {...props}
    >
      {/* Outer chrome shell */}
      <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40">
        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

        {/* Top accent line */}
        <div className="absolute top-0 right-0 left-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Slide counter label */}
        <div className="absolute top-2 right-3 z-20 font-mono text-[9px] text-foreground/30 uppercase tracking-widest">
          {String(current + 1).padStart(2, "0")}/
          {String(count).padStart(2, "0")}
        </div>

        <Carousel
          setApi={setApi}
          orientation={orientation}
          opts={{ loop }}
          className="w-full"
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-4">{item}</div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {showArrows ? (
            <>
              <CarouselPrevious
                className={cn(
                  "absolute z-20 size-8 rounded border border-primary/30 bg-card/90 text-primary/60 backdrop-blur-sm",
                  "transition-all duration-200 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)]",
                  "disabled:opacity-20 disabled:hover:shadow-none",
                  orientation === "horizontal"
                    ? "top-1/2 left-2 -translate-y-1/2"
                    : "-top-2 left-1/2 -translate-x-1/2 rotate-90"
                )}
              />
              <CarouselNext
                className={cn(
                  "absolute z-20 size-8 rounded border border-primary/30 bg-card/90 text-primary/60 backdrop-blur-sm",
                  "transition-all duration-200 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)]",
                  "disabled:opacity-20 disabled:hover:shadow-none",
                  orientation === "horizontal"
                    ? "top-1/2 right-2 -translate-y-1/2"
                    : "-bottom-2 left-1/2 -translate-x-1/2 rotate-90"
                )}
              />
            </>
          ) : null}
        </Carousel>

        {/* Bottom accent line */}
        <div className="absolute right-0 bottom-0 left-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Corner decorations */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-3 w-3 border-primary/30 border-t-2 border-l-2 transition-colors duration-300 group-hover/carousel:border-primary/60" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-3 w-3 border-primary/30 border-t-2 border-r-2 transition-colors duration-300 group-hover/carousel:border-primary/60" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-3 border-primary/30 border-b-2 border-l-2 transition-colors duration-300 group-hover/carousel:border-primary/60" />
        <div className="pointer-events-none absolute right-0 bottom-0 z-10 h-3 w-3 border-primary/30 border-r-2 border-b-2 transition-colors duration-300 group-hover/carousel:border-primary/60" />
      </div>

      {/* Dot indicators */}
      {showDots && count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current
                  ? "w-6 bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.3)]"
                  : "w-1.5 bg-primary/20 hover:bg-primary/40"
              )}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom glow */}
      <div className="pointer-events-none absolute right-1/4 -bottom-4 left-1/4 h-8 rounded-full bg-primary/5 opacity-0 blur-xl transition-opacity duration-500 group-hover/carousel:opacity-100" />
    </div>
  );
}
