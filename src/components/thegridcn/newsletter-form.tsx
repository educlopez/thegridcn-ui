"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  buttonText?: string;
  description?: string;
  loading?: boolean;
  onSubmit?: (email: string) => void;
  success?: boolean;
  title?: string;
}

export function NewsletterForm({
  onSubmit,
  title = "Stay Connected",
  description,
  buttonText = "Subscribe",
  loading = false,
  success = false,
  className,
  ...props
}: NewsletterFormProps) {
  const emailId = React.useId();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    onSubmit?.(email);
  }

  return (
    <div
      data-slot="tron-newsletter-form"
      className={cn(
        "group relative overflow-hidden rounded border border-primary/20 bg-card/80 px-6 py-8 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Top border glow */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Content */}
      <div className="relative">
        {title ? (
          <h3 className="font-bold font-display text-foreground text-lg uppercase tracking-wider">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="mt-2 text-foreground/60 text-sm">{description}</p>
        ) : null}

        {success ? (
          <div className="mt-5 flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="h-4 w-4 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">
              Subscription confirmed
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-1">
                <label
                  className="block font-mono text-[9px] text-foreground/40 uppercase tracking-widest"
                  htmlFor={emailId}
                >
                  Email Address
                </label>
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="user@grid.io"
                  disabled={loading}
                  className={cn(
                    "w-full rounded border bg-card/60 px-3 py-2 font-mono text-foreground/80 text-xs outline-none backdrop-blur-sm transition-all placeholder:text-foreground/20",
                    "focus:border-primary/40 focus:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]",
                    error ? "border-red-500/40" : "border-primary/20",
                    loading && "cursor-not-allowed opacity-40"
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "mt-[18px] shrink-0 rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] text-primary uppercase tracking-widest shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30",
                  loading && "cursor-not-allowed opacity-40"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border border-primary/30 border-t-primary" />
                    Processing
                  </span>
                ) : (
                  buttonText
                )}
              </button>
            </div>
            {error ? (
              <p className="mt-1 font-mono text-[9px] text-red-400">{error}</p>
            ) : null}
          </form>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-primary/40 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-5 w-5 border-primary/40 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-primary/40 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-primary/40 border-r-2 border-b-2" />
    </div>
  );
}
