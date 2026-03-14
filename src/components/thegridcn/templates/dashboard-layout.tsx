"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  sidebar: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({
  sidebar,
  header,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", className)}>
      {/* Sidebar */}
      <aside className="flex-shrink-0">{sidebar}</aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {header && <div className="flex-shrink-0">{header}</div>}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
