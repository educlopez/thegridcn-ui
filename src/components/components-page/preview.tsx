"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { type ComponentItem, componentSections } from "@/lib/component-data"
import { ComponentPreview } from "./component-preview"
import { ComponentErrorBoundary } from "./error-boundary"

interface PreviewProps {
  component: ComponentItem | null
}

export function Preview({ component }: PreviewProps) {
  return (
    <div className="relative flex flex-1 flex-col justify-center">
      <div className="relative mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-primary/20 bg-background/50 ring-1 ring-primary/10">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-background/80 to-background/40" />

        {component ? (
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4 py-2">
              <div>
                <h3 className="font-mono text-sm font-semibold tracking-wider text-primary">
                  {component.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {componentSections[component.type]?.title}
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Preview
              </Badge>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <ComponentErrorBoundary>
                <ComponentPreview component={component} />
              </ComponentErrorBoundary>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
              [ NO COMPONENT SELECTED ]
            </div>
            <p className="text-sm text-muted-foreground">
              Select a component from the sidebar to preview it here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
