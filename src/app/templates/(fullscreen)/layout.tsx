"use client"

import { useEffect } from "react"
import type { Theme } from "@/components/theme"

const validThemes = new Set(["tron", "ares", "clu", "athena", "aphrodite", "poseidon", "creator"])

export default function TemplatesFullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Listen for theme sync messages from parent previewer (for iframe embed pages)
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "theme-sync" && validThemes.has(event.data.theme)) {
        const theme = event.data.theme as Theme
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("project-ares-theme", theme)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return <>{children}</>
}
