"use client"

import { useEffect, useState } from "react"
import { useTheme, themes } from "./theme-provider"

/**
 * Dynamic favicon component that updates based on the current theme
 * Creates a tron-themed SVG favicon with the theme's primary color
 */
export function DynamicFavicon() {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.id === theme)
  const [mounted, setMounted] = useState(false)

  // Update favicon function
  const updateFavicon = (themeColor: string) => {
    // Create SVG favicon with tron aesthetic
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${themeColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${themeColor};stop-opacity:0.3" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Background -->
        <rect width="32" height="32" fill="#0a0a0f" rx="2"/>

        <!-- Grid pattern -->
        <g opacity="0.3" stroke="${themeColor}" stroke-width="0.5" fill="none">
          <line x1="0" y1="8" x2="32" y2="8"/>
          <line x1="0" y1="16" x2="32" y2="16"/>
          <line x1="0" y1="24" x2="32" y2="24"/>
          <line x1="8" y1="0" x2="8" y2="32"/>
          <line x1="16" y1="0" x2="16" y2="32"/>
          <line x1="24" y1="0" x2="24" y2="32"/>
        </g>

        <!-- Central circuit pattern -->
        <g stroke="${themeColor}" stroke-width="1.5" fill="none" filter="url(#glow-filter)">
          <!-- Outer square -->
          <rect x="8" y="8" width="16" height="16" rx="1"/>

          <!-- Inner cross -->
          <line x1="16" y1="10" x2="16" y2="22"/>
          <line x1="10" y1="16" x2="22" y2="16"/>

          <!-- Corner connectors -->
          <circle cx="8" cy="8" r="1.5" fill="${themeColor}"/>
          <circle cx="24" cy="8" r="1.5" fill="${themeColor}"/>
          <circle cx="8" cy="24" r="1.5" fill="${themeColor}"/>
          <circle cx="24" cy="24" r="1.5" fill="${themeColor}"/>

          <!-- Center node -->
          <circle cx="16" cy="16" r="2" fill="${themeColor}" opacity="0.8"/>
        </g>

        <!-- Corner accent lines -->
        <g stroke="${themeColor}" stroke-width="1" opacity="0.6">
          <line x1="2" y1="2" x2="6" y2="2"/>
          <line x1="2" y1="2" x2="2" y2="6"/>
          <line x1="30" y1="2" x2="26" y2="2"/>
          <line x1="30" y1="2" x2="30" y2="6"/>
          <line x1="2" y1="30" x2="6" y2="30"/>
          <line x1="2" y1="30" x2="2" y2="26"/>
          <line x1="30" y1="30" x2="26" y2="30"/>
          <line x1="30" y1="30" x2="30" y2="26"/>
        </g>
      </svg>
    `

    // Convert SVG to data URL (URL-encoded for better browser compatibility)
    const encodedSvg = encodeURIComponent(svg)
    const dataUrl = `data:image/svg+xml,${encodedSvg}`

    // Helper to update or create favicon link
    const updateOrCreateLink = (rel: string, type?: string) => {
      // Try multiple selectors for better compatibility
      const selectors = [
        `link[rel="${rel}"]`,
        `link[rel*="${rel}"]`,
      ]

      let link = document.querySelector(selectors[0]) as HTMLLinkElement
      if (!link) {
        link = document.querySelector(selectors[1]) as HTMLLinkElement
      }

      if (link) {
        link.href = dataUrl
        if (type) link.type = type
      } else {
        link = document.createElement("link")
        link.rel = rel
        link.href = dataUrl
        if (type) link.type = type
        document.head.appendChild(link)
      }
    }

    // Remove all existing favicon links first to avoid conflicts
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')
    existingLinks.forEach((link) => {
      if (link.getAttribute('rel')?.includes('icon')) {
        link.remove()
      }
    })

    // Update standard favicon
    updateOrCreateLink("icon", "image/svg+xml")

    // Update shortcut icon (legacy support)
    updateOrCreateLink("shortcut icon", "image/svg+xml")

    // Update apple-touch-icon for iOS
    updateOrCreateLink("apple-touch-icon")
  }

  // Run immediately on mount and when theme changes
  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage if available (before React hydrates)
    const storedTheme = localStorage.getItem("project-ares-theme") as typeof theme | null
    const initialTheme = storedTheme && themes.some((t) => t.id === storedTheme)
      ? themes.find((t) => t.id === storedTheme)
      : themes.find((t) => t.id === "ares") // Default to ares

    if (initialTheme) {
      updateFavicon(initialTheme.color)
    }
  }, [])

  useEffect(() => {
    if (!mounted || !currentTheme) return
    updateFavicon(currentTheme.color)
  }, [mounted, theme, currentTheme])

  return null // This component doesn't render anything
}
