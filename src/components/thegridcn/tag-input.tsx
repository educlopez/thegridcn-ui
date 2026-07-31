"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  allowDuplicates?: boolean;
  disabled?: boolean;
  maxTags?: number;
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  tags: string[];
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = "Add tag...",
  maxTags,
  allowDuplicates = false,
  disabled = false,
  className,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    if (!allowDuplicates && tags.includes(trimmed)) {
      return;
    }
    if (maxTags && tags.length >= maxTags) {
      return;
    }
    onTagsChange([...tags, trimmed]);
    setInputValue("");
  }

  function removeTag(index: number) {
    onTagsChange(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div
      data-slot="tron-tag-input"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex min-h-[38px] flex-wrap items-center gap-1.5 rounded border bg-card/60 px-2.5 py-1.5 backdrop-blur-sm transition-all",
          "focus-within:border-primary/40 focus-within:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]",
          disabled
            ? "cursor-not-allowed border-primary/10 opacity-40"
            : "cursor-text border-primary/20"
        )}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/8 px-2.5 py-0.5 font-mono text-[8px] text-primary uppercase tracking-widest transition-all",
              "shadow-[0_0_4px_rgba(var(--primary-rgb,0,180,255),0.08)]"
            )}
          >
            {tag}
            {!disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    removeTag(index);
                  }
                }}
                className="ml-0.5 flex h-3 w-3 items-center justify-center rounded-full hover:bg-foreground/10"
              >
                <svg
                  aria-hidden="true"
                  width="5"
                  height="5"
                  viewBox="0 0 5 5"
                  fill="none"
                >
                  <path
                    d="M0.5 0.5l4 4M4.5 0.5l-4 4"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={
            disabled || (maxTags !== undefined && tags.length >= maxTags)
          }
          className={cn(
            "min-w-[60px] flex-1 border-none bg-transparent font-mono text-foreground/80 text-xs outline-none placeholder:text-foreground/20"
          )}
        />
      </div>

      {maxTags ? (
        <p className="font-mono text-[9px] text-foreground/25">
          {tags.length}/{maxTags} tags
        </p>
      ) : null}
    </div>
  );
}
