"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showEdges?: boolean
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  className,
  ...props
}: PaginationProps) {
  const pages = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 3 + 2 // siblings + first + last + current + 2 dots
    if (totalPages <= totalPageNumbers) return range(1, totalPages)

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 1

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + 2 * siblingCount
      return [...range(1, leftCount), "...", totalPages]
    }
    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + 2 * siblingCount
      return [1, "...", ...range(totalPages - rightCount + 1, totalPages)]
    }
    return [1, "...", ...range(leftSiblingIndex, rightSiblingIndex), "...", totalPages]
  }, [currentPage, totalPages, siblingCount])

  return (
    <nav
      data-slot="tron-pagination"
      aria-label="Pagination"
      className={cn(
        "inline-flex items-center gap-1 rounded border border-primary/20 bg-card/80 px-2 py-1.5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Previous */}
      {showEdges && (
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded font-mono text-[10px] transition-colors",
            currentPage <= 1
              ? "cursor-not-allowed text-foreground/15"
              : "text-foreground/40 hover:bg-primary/10 hover:text-primary"
          )}
          aria-label="Previous page"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M5.5 1L2.5 4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Pages */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="flex h-7 w-5 items-center justify-center font-mono text-[9px] text-foreground/20">
            ···
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            className={cn(
              "flex h-7 min-w-[28px] items-center justify-center rounded font-mono text-[10px] uppercase tracking-wider transition-all",
              page === currentPage
                ? "bg-primary/15 text-primary shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.15)]"
                : "text-foreground/40 hover:bg-primary/5 hover:text-foreground/60"
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      {showEdges && (
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded font-mono text-[10px] transition-colors",
            currentPage >= totalPages
              ? "cursor-not-allowed text-foreground/15"
              : "text-foreground/40 hover:bg-primary/10 hover:text-primary"
          )}
          aria-label="Next page"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M2.5 1L5.5 4l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Page info */}
      <span className="ml-1 border-l border-primary/15 pl-2 font-mono text-[8px] uppercase tracking-widest text-foreground/25">
        {currentPage}/{totalPages}
      </span>
    </nav>
  )
}
