"use client";

import * as React from "react";
import { type ComponentItem } from "@/lib/component-data";
import { previewRegistry } from "./previews";

interface ComponentPreviewProps {
  component: ComponentItem;
}

// Memoized fallback component for missing previews
const PreviewNotFound = React.memo(function PreviewNotFound({
  component,
}: {
  component: ComponentItem;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6">
        <p className="font-mono text-sm font-semibold text-primary">
          Component preview not available
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          ID:{" "}
          <code className="rounded bg-muted px-1 py-0.5">{component.id}</code>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Title: {component.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Type: {component.type}
        </p>
      </div>
    </div>
  );
});

// Memoized wrapper that renders the preview component
const PreviewRenderer = React.memo(function PreviewRenderer({
  PreviewComponent,
}: {
  PreviewComponent: React.ComponentType;
}) {
  return <PreviewComponent />;
});

export function ComponentPreview({ component }: ComponentPreviewProps) {
  // Early return for null component
  if (!component) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No component selected</p>
      </div>
    );
  }

  // Look up the preview component from the registry
  const PreviewComponent = previewRegistry[component.id];

  // Render fallback if preview not found
  if (!PreviewComponent) {
    // Log for debugging in development
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Component preview not found for ID: "${component.id}" (title: "${component.title}")`
      );
    }
    return <PreviewNotFound component={component} />;
  }

  // Render the memoized preview component
  return <PreviewRenderer PreviewComponent={PreviewComponent} />;
}
