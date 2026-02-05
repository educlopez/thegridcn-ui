"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeSwitcherCompact, themes, useTheme } from "@/components/theme"
import { cn } from "@/lib/utils"
import { TheGridcnLogo } from "./thegridcn-logo"

interface NavItem {
  href: string
  label: string
}

interface TronHeaderProps {
  navItems?: NavItem[]
}

export function TronHeader({ navItems }: TronHeaderProps) {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.id === theme)
  const pathname = usePathname()

  const defaultNavItems: NavItem[] = [
    { href: "/", label: "HOME" },
    { href: "/components", label: "COMPONENTS" },
  ]

  const items = navItems || defaultNavItems

  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="relative border-b border-primary/30 bg-background/60 backdrop-blur-xl">
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Scan line effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="transition-opacity hover:opacity-80">
                <TheGridcnLogo size="sm" />
              </Link>

              {/* Status indicator */}
              <div className="hidden items-center gap-2 md:flex">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [box-shadow:0_0_8px_var(--primary)]" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  SYSTEM ONLINE
                </span>
              </div>
            </div>

            {/* Center section - Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 font-mono text-xs tracking-widest transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {/* Active/Hover indicator */}
                  <span
                    className={cn(
                      "absolute inset-x-2 bottom-0 h-px bg-primary transition-transform",
                      pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right section - Theme & Actions */}
            <div className="flex items-center gap-4">
              {/* Current theme badge */}
              <div className="hidden items-center gap-1.5 rounded border border-primary/50 bg-primary/10 px-2.5 py-1 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary [box-shadow:0_0_6px_var(--primary)]" />
                <span className="font-mono text-[10px] tracking-wider text-primary">
                  {currentTheme?.name.toUpperCase()}
                </span>
              </div>

              <ThemeSwitcherCompact />

              {/* Mobile menu */}
              <Link
                href="/components"
                className="rounded border border-primary/50 px-3 py-1.5 font-mono text-xs tracking-wider text-primary transition-colors hover:bg-primary/10 lg:hidden"
              >
                MENU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
