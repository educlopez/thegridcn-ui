"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ToastVariant = "info" | "success" | "warning" | "error"

interface ToastItem {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const addToast = React.useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
    const duration = toast.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

const variantStyles: Record<ToastVariant, string> = {
  info: "border-primary/30",
  success: "border-emerald-500/30",
  warning: "border-amber-500/30",
  error: "border-red-500/30",
}

const variantDots: Record<ToastVariant, string> = {
  info: "bg-primary",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  error: "bg-red-400",
}

function ToastContainer({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          data-slot="tron-toast"
          className={cn(
            "relative min-w-[280px] max-w-sm overflow-hidden rounded border bg-card/95 px-4 py-3 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.06)] backdrop-blur-md",
            variantStyles[toast.variant || "info"]
          )}
        >
          {/* Scanline */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />

          <div className="flex items-start gap-2.5">
            <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", variantDots[toast.variant || "info"])} />
            <div className="flex-1">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                {toast.title}
              </span>
              {toast.description && (
                <span className="mt-0.5 block font-mono text-[9px] text-foreground/35">
                  {toast.description}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              className="shrink-0 text-foreground/20 hover:text-foreground/50"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1l6 6M7 1l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Corner ticks */}
          <div className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-primary/30" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-primary/30" />
        </div>
      ))}
    </div>
  )
}

/** Standalone toast display for previews (no provider needed) */
export function ToastDemo({ className }: { className?: string }) {
  const toasts: ToastItem[] = [
    { id: "1", title: "System Updated", description: "Grid firmware v2.7.1 installed.", variant: "success" },
    { id: "2", title: "Warning", description: "Sector 7G response time elevated.", variant: "warning" },
    { id: "3", title: "Connection Lost", description: "Relay node 12A unreachable.", variant: "error" },
  ]
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative min-w-[260px] overflow-hidden rounded border bg-card/95 px-4 py-3 backdrop-blur-md",
            variantStyles[toast.variant || "info"]
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />
          <div className="flex items-start gap-2.5">
            <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", variantDots[toast.variant || "info"])} />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                {toast.title}
              </span>
              {toast.description && (
                <span className="mt-0.5 block font-mono text-[9px] text-foreground/35">
                  {toast.description}
                </span>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-primary/30" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-primary/30" />
        </div>
      ))}
    </div>
  )
}
