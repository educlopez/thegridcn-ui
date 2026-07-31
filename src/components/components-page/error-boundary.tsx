"use client";

import * as React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

export class ComponentErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component preview error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
              <p className="font-mono font-semibold text-destructive text-sm">
                Component Preview Error
              </p>
              <p className="mt-2 text-foreground/80 text-xs">
                {this.state.error?.message ||
                  "An error occurred while rendering the component"}
              </p>
              <button
                type="button"
                onClick={() => this.setState({ error: null, hasError: false })}
                className="mt-4 rounded-md border border-border bg-background px-3 py-1.5 text-xs hover:bg-accent"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
