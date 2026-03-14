"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Smartphone, Tablet, Monitor, ExternalLink } from "lucide-react"
import { ThemeSwitcherCompact } from "@/components/theme"
import { useTheme } from "@/components/theme"
import { cn } from "@/lib/utils"

type DeviceSize = "mobile" | "tablet" | "desktop"

const DEVICE_CONFIG: { id: DeviceSize; icon: typeof Monitor; label: string; maxWidth: string }[] = [
  { id: "mobile", icon: Smartphone, label: "Mobile", maxWidth: "max-w-[375px]" },
  { id: "tablet", icon: Tablet, label: "Tablet", maxWidth: "max-w-[768px]" },
  { id: "desktop", icon: Monitor, label: "Desktop", maxWidth: "max-w-full" },
]

interface TemplatePreviewerProps {
  name: string
  slug: string
}

export function TemplatePreviewer({ name, slug }: TemplatePreviewerProps) {
  const [device, setDevice] = React.useState<DeviceSize>("desktop")
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const { theme } = useTheme()

  // Sync theme to iframe via postMessage whenever theme changes
  React.useEffect(() => {
    const iframe = iframeRef.current
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "theme-sync", theme }, "*")
    }
  }, [theme])

  // Also sync on iframe load
  const handleIframeLoad = React.useCallback(() => {
    const iframe = iframeRef.current
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "theme-sync", theme }, "*")
    }
  }, [theme])

  const embedUrl = `/templates/embed/${slug}`
  const activeConfig = DEVICE_CONFIG.find((d) => d.id === device)!

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar header */}
      <header className="grid shrink-0 grid-cols-3 items-center border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur-sm">
        {/* Left: Back + Template name */}
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="flex items-center justify-center rounded-md border border-border p-2 text-foreground/60 transition-all hover:border-primary hover:text-primary hover:glow-sm"
            title="Back to templates"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <h1 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider text-primary">
              {name}
            </h1>
            <span className="hidden font-mono text-xs text-foreground/40 sm:inline">
              · Template
            </span>
          </div>
        </div>

        {/* Center: Device toggles */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background/50 p-1">
            {DEVICE_CONFIG.map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                title={d.label}
                className={cn(
                  "rounded-md p-1.5 transition-all",
                  device === d.id
                    ? "bg-primary/15 text-primary [box-shadow:0_0_8px_oklch(from_var(--primary)_l_c_h/0.3)]"
                    : "text-foreground/40 hover:text-foreground/70"
                )}
              >
                <d.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Theme switcher + fullscreen */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden sm:block">
            <ThemeSwitcherCompact />
          </div>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md border border-border p-2 text-foreground/60 transition-all hover:border-primary hover:text-primary hover:glow-sm"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Iframe container */}
      <div className="flex flex-1 items-start justify-center overflow-hidden bg-background/50 p-4">
        <div
          className={cn(
            "h-full w-full transition-all duration-500 ease-in-out",
            activeConfig.maxWidth,
            device !== "desktop" && "mx-auto"
          )}
        >
          <iframe
            ref={iframeRef}
            src={embedUrl}
            onLoad={handleIframeLoad}
            className={cn(
              "h-full w-full border border-border bg-background",
              device !== "desktop" ? "rounded-xl" : "rounded-lg"
            )}
            title={`${name} template preview`}
          />
        </div>
      </div>
    </div>
  )
}
