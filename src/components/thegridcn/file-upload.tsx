"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFiles?: (files: File[]) => void
  label?: string
  description?: string
  disabled?: boolean
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFiles,
  label = "DROP FILES HERE",
  description = "or click to browse",
  disabled = false,
  className,
  ...props
}: FileUploadProps) {
  const [dragging, setDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleFiles(fileList: FileList) {
    const arr = Array.from(fileList)
    const filtered = maxSize ? arr.filter((f) => f.size <= maxSize) : arr
    setFiles(filtered)
    onFiles?.(filtered)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (disabled || !e.dataTransfer.files.length) return
    handleFiles(e.dataTransfer.files)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) handleFiles(e.target.files)
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div
      data-slot="tron-file-upload"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-6 py-10 transition-all",
          disabled && "cursor-not-allowed opacity-40",
          dragging
            ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.1)]"
            : "border-primary/20 bg-card/60 hover:border-primary/40 hover:bg-card/80"
        )}
      >
        {/* Upload icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={cn(
          "mb-3 transition-colors",
          dragging ? "text-primary" : "text-foreground/20 group-hover:text-foreground/40"
        )}>
          <path d="M14 18V6M14 6l-5 5M14 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 18v4a2 2 0 002 2h16a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <span className={cn(
          "font-mono text-[10px] uppercase tracking-widest transition-colors",
          dragging ? "text-primary" : "text-foreground/40"
        )}>
          {label}
        </span>
        <span className="mt-1 font-mono text-[9px] text-foreground/20">
          {description}
        </span>

        {maxSize && (
          <span className="mt-1 font-mono text-[8px] text-foreground/15">
            MAX {formatSize(maxSize)}
          </span>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l border-t border-primary/30" />
        <div className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r border-t border-primary/30" />
        <div className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b border-l border-primary/30" />
        <div className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b border-r border-primary/30" />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded border border-primary/15 bg-card/60 px-3 py-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-primary/50">
                <path d="M2 1h5l3 3v7H2V1z" stroke="currentColor" strokeWidth="1" />
                <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span className="flex-1 truncate font-mono text-[10px] text-foreground/60">
                {file.name}
              </span>
              <span className="font-mono text-[8px] text-foreground/25">
                {formatSize(file.size)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  const next = files.filter((_, j) => j !== i)
                  setFiles(next)
                  onFiles?.(next)
                }}
                className="flex h-4 w-4 items-center justify-center rounded text-foreground/25 hover:bg-red-500/10 hover:text-red-400"
              >
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <path d="M0.5 0.5l5 5M5.5 0.5l-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
