"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  timestamp?: string;
  title: string;
  variant?: "info" | "success" | "warning" | "error";
}

const variantStyles: Record<
  string,
  { border: string; icon: string; text: string; glow: string }
> = {
  error: {
    border: "border-red-500/50",
    glow: "shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]",
    icon: "text-red-500",
    text: "text-red-500",
  },
  info: {
    border: "border-primary/50",
    glow: "shadow-[inset_0_0_20px_rgba(var(--primary-rgb,0,180,255),0.05)]",
    icon: "text-primary",
    text: "text-primary",
  },
  success: {
    border: "border-green-500/50",
    glow: "shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]",
    icon: "text-green-500",
    text: "text-green-500",
  },
  warning: {
    border: "border-amber-500/50",
    glow: "shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]",
    icon: "text-amber-500",
    text: "text-amber-500",
  },
};

const variantIcon: Record<string, string> = {
  error: "✕",
  info: "◈",
  success: "✓",
  warning: "△",
};

export function Notification({
  title,
  description,
  variant = "info",
  timestamp,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: NotificationProps) {
  const styles = variantStyles[variant];
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleDismiss() {
    setVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  }

  return (
    <div
      data-slot="tron-notification"
      className={cn(
        "relative overflow-hidden rounded border bg-card/90 backdrop-blur-sm transition-all duration-300",
        styles.border,
        styles.glow,
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Left accent line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 w-0.5",
          styles.icon.replace("text-", "bg-")
        )}
      />

      <div className="flex items-start gap-3 px-4 py-3">
        {/* Icon */}
        <span className={cn("mt-0.5 shrink-0 font-mono text-sm", styles.icon)}>
          {variantIcon[variant]}
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider">
              {title}
            </span>
            {timestamp ? (
              <span className="ml-auto shrink-0 font-mono text-[9px] text-foreground/40">
                {timestamp}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="mt-0.5 text-foreground/70 text-xs leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        {/* Dismiss */}
        {dismissible ? (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 text-foreground/40 transition-colors hover:text-foreground/80"
          >
            <span className="font-mono text-xs">✕</span>
          </button>
        ) : null}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/30 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/30 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/30 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/30 border-r-2 border-b-2" />
    </div>
  );
}
