"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onCopy"> {
  disabled?: boolean;
  onCopy?: (value: string) => void;
  size?: "sm" | "md";
  value: string;
  variant?: "default" | "ghost" | "outline";
}

export function CopyButton({
  value,
  variant = "default",
  size = "sm",
  onCopy,
  disabled = false,
  className,
  children,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    if (disabled || copied) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.(value);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [value, disabled, copied, onCopy]);

  const variants: Record<string, string> = {
    default:
      "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.15)]",
    ghost:
      "border-transparent bg-transparent text-foreground/50 hover:text-primary hover:bg-primary/5",
    outline:
      "border-primary/20 bg-transparent text-foreground/50 hover:border-primary/40 hover:text-primary",
  };

  const copiedStyle =
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]";

  return (
    <button
      type="button"
      disabled={disabled}
      data-slot="tron-copy-button"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded border font-mono uppercase tracking-widest transition-all",
        size === "sm" ? "px-2 py-1 text-[8px]" : "px-3 py-1.5 text-[9px]",
        disabled && "cursor-not-allowed opacity-40",
        copied ? copiedStyle : variants[variant],
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      {copied ? (
        <svg
          aria-hidden="true"
          width={size === "sm" ? 10 : 12}
          height={size === "sm" ? 10 : 12}
          viewBox="0 0 12 12"
          fill="none"
          className="fade-in zoom-in-50 animate-in duration-200"
        >
          <path
            d="M2.5 6.5L5 9L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          width={size === "sm" ? 10 : 12}
          height={size === "sm" ? 10 : 12}
          viewBox="0 0 12 12"
          fill="none"
        >
          <rect
            x="4"
            y="4"
            width="6.5"
            height="6.5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M8 4V2.5A1 1 0 007 1.5H2.5A1 1 0 001.5 2.5V7A1 1 0 002.5 8H4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
