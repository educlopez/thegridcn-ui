"use client";

import type * as React from "react";
import {
  CodeBlock as BaseCodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/code-block/code-block";
import { CodeBlockShiki } from "@/components/code-block/shiki";
import { CopyButton } from "@/components/thegridcn/copy-button";
import { cn } from "@/lib/utils";

interface TronCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  filename?: string;
  highlightLines?: number[];
  language?: string;
  showLineNumbers?: boolean;
}

export function TronCodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  highlightLines: _highlightLines,
  className,
  ...props
}: TronCodeBlockProps) {
  const displayLabel = filename || language;

  return (
    <div
      data-slot="tron-code-block"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        "shadow-[0_0_15px_rgba(var(--primary-rgb,0,180,255),0.06)]",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-primary/40 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-primary/40 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-primary/40 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-primary/40 border-r-2 border-b-2" />

      <BaseCodeBlock className="bg-transparent">
        {/* Header bar */}
        <CodeBlockHeader className="border-primary/15 border-b bg-black/40">
          <CodeBlockGroup>
            <CodeBlockIcon language={language} />
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              {displayLabel}
            </span>
          </CodeBlockGroup>
          <CopyButton value={code} variant="ghost" size="sm" />
        </CodeBlockHeader>

        {/* Code content */}
        <CodeBlockContent className="bg-transparent">
          <CodeBlockShiki
            code={code}
            language={language}
            lineNumbers={showLineNumbers}
          />
        </CodeBlockContent>
      </BaseCodeBlock>
    </div>
  );
}
