"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface KanbanCard {
  assignee?: string;
  description?: string;
  id: string;
  tag?: string;
  tagVariant?: "default" | "success" | "warning" | "danger";
  title: string;
}

interface KanbanColumn {
  cards: KanbanCard[];
  color?: string;
  id: string;
  title: string;
}

interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[];
  onCardMove?: (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    toIndex: number
  ) => void;
  title?: string;
}

export function KanbanBoard({
  columns: externalColumns,
  title,
  onCardMove,
  className,
  ...props
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState(externalColumns);
  React.useEffect(() => setColumns(externalColumns), [externalColumns]);

  // Drag state
  const [dragging, setDragging] = React.useState<{
    cardId: string;
    columnId: string;
  } | null>(null);
  const [overColumn, setOverColumn] = React.useState<string | null>(null);
  const [overCard, setOverCard] = React.useState<string | null>(null);

  const tagColors: Record<string, string> = {
    danger: "border-red-500/30 bg-red-500/10 text-red-400",
    default: "border-primary/30 bg-primary/10 text-primary",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  function handleDragStart(
    e: React.DragEvent,
    cardId: string,
    columnId: string
  ) {
    setDragging({ cardId, columnId });
    e.dataTransfer.effectAllowed = "move";
    // Make the drag image slightly transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    }
  }

  function handleDragEnd() {
    setDragging(null);
    setOverColumn(null);
    setOverCard(null);
  }

  function handleColumnDragOver(e: React.DragEvent, columnId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverColumn(columnId);
  }

  function handleCardDragOver(e: React.DragEvent, cardId: string) {
    e.preventDefault();
    e.stopPropagation();
    setOverCard(cardId);
  }

  function handleDrop(e: React.DragEvent, targetColumnId: string) {
    e.preventDefault();
    if (!dragging) {
      return;
    }

    const { cardId, columnId: sourceColumnId } = dragging;

    if (sourceColumnId === targetColumnId && !overCard) {
      handleDragEnd();
      return;
    }

    setColumns((prev) => {
      const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
      const sourceCol = next.find((c) => c.id === sourceColumnId);
      const targetCol = next.find((c) => c.id === targetColumnId);
      if (!(sourceCol && targetCol)) {
        return prev;
      }

      const cardIndex = sourceCol.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) {
        return prev;
      }

      const [card] = sourceCol.cards.splice(cardIndex, 1);

      // Find insertion index
      let insertIndex = targetCol.cards.length;
      if (overCard) {
        const overIdx = targetCol.cards.findIndex((c) => c.id === overCard);
        if (overIdx !== -1) {
          insertIndex = overIdx;
        }
      }

      targetCol.cards.splice(insertIndex, 0, card);
      return next;
    });

    const targetCol = columns.find((c) => c.id === targetColumnId);
    const insertIndex = overCard
      ? (targetCol?.cards.findIndex((c) => c.id === overCard) ??
        targetCol?.cards.length ??
        0)
      : (targetCol?.cards.length ?? 0);

    onCardMove?.(cardId, sourceColumnId, targetColumnId, insertIndex);
    handleDragEnd();
  }

  return (
    <div
      data-slot="tron-kanban-board"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/60 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />

      {/* Header */}
      {title ? (
        <div className="border-primary/15 border-b px-4 py-2.5">
          <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            {title}
          </span>
        </div>
      ) : null}

      {/* Columns */}
      <div className="flex gap-px overflow-x-auto bg-primary/5 p-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              "flex min-w-[200px] flex-1 flex-col rounded transition-colors",
              overColumn === column.id && dragging?.columnId !== column.id
                ? "bg-primary/5"
                : "bg-background/40"
            )}
            onDragOver={(e) => handleColumnDragOver(e, column.id)}
            onDragLeave={() => {
              if (overColumn === column.id) {
                setOverColumn(null);
              }
            }}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: column.color || "hsl(var(--primary))",
                }}
              />
              <span className="font-mono text-[9px] text-foreground/50 uppercase tracking-widest">
                {column.title}
              </span>
              <span className="ml-auto rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5 font-mono text-[8px] text-foreground/25">
                {column.cards.length}
              </span>
            </div>

            {/* Cards */}
            <div
              className={cn(
                "flex min-h-[60px] flex-col gap-2 px-2 pb-2",
                overColumn === column.id &&
                  column.cards.length === 0 &&
                  "rounded border border-primary/20 border-dashed"
              )}
            >
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleCardDragOver(e, card.id)}
                  onDragLeave={() => {
                    if (overCard === card.id) {
                      setOverCard(null);
                    }
                  }}
                  className={cn(
                    "group relative cursor-grab rounded border border-primary/15 bg-card/80 p-3 transition-all active:cursor-grabbing",
                    "hover:border-primary/30 hover:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.06)]",
                    dragging?.cardId === card.id && "scale-95 opacity-40",
                    overCard === card.id &&
                      dragging?.cardId !== card.id &&
                      "border-t-2 border-t-primary/50"
                  )}
                >
                  {/* Drag handle */}
                  <div className="absolute top-1/2 left-1 flex -translate-y-1/2 flex-col gap-[2px] opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="h-[2px] w-[2px] rounded-full bg-foreground/20" />
                    <span className="h-[2px] w-[2px] rounded-full bg-foreground/20" />
                    <span className="h-[2px] w-[2px] rounded-full bg-foreground/20" />
                  </div>

                  <h4 className="font-mono text-[10px] text-foreground/70 uppercase tracking-wider group-hover:text-foreground/90">
                    {card.title}
                  </h4>
                  {card.description ? (
                    <p className="mt-1 font-mono text-[9px] text-foreground/30 leading-relaxed">
                      {card.description}
                    </p>
                  ) : null}
                  <div className="mt-2 flex items-center gap-2">
                    {card.tag ? (
                      <span
                        className={cn(
                          "rounded border px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest",
                          tagColors[card.tagVariant || "default"]
                        )}
                      >
                        {card.tag}
                      </span>
                    ) : null}
                    {card.assignee ? (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-[7px] text-primary">
                        {card.assignee.charAt(0).toUpperCase()}
                      </span>
                    ) : null}
                  </div>

                  {/* Card corner ticks */}
                  <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 border-primary/20 border-t border-l opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-0 bottom-0 h-1.5 w-1.5 border-primary/20 border-r border-b opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/40 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/40 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/40 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/40 border-r-2 border-b-2" />
    </div>
  );
}
