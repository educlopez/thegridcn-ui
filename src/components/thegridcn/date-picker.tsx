"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  date?: Date;
  disabled?: boolean;
  label?: string;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
  label,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(selected: Date | undefined) {
    onDateChange?.(selected);
    setOpen(false);
  }

  return (
    <div
      data-slot="tron-date-picker"
      className={cn("relative", disabled && "opacity-40", className)}
      {...props}
    >
      {label ? (
        <span className="mb-1 block font-mono text-[9px] text-foreground/40 uppercase tracking-widest">
          {label}
        </span>
      ) : null}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-2 rounded border bg-card/60 px-3 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm transition-all",
              open
                ? "border-primary/40 shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]"
                : "border-primary/20 hover:border-primary/30",
              date ? "text-foreground/70" : "text-foreground/25"
            )}
          >
            <CalendarIcon className="size-3 text-primary/50" />
            {date ? format(date, "PPP") : (placeholder ?? "")}
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto overflow-hidden border-primary/30 bg-card/95 p-0 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.06)] backdrop-blur-md"
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />

          {/* Corner decorations */}
          <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-primary/40 border-t border-l" />
          <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-primary/40 border-t border-r" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-primary/40 border-b border-l" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-primary/40 border-r border-b" />

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
