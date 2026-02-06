"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  componentSections,
  standardComponents,
  type ComponentItem,
} from "@/lib/component-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ItemExplorerProps {
  currentItemId?: string;
  onItemSelect?: (item: ComponentItem) => void;
  isMobile?: boolean;
}

// Memoized item button component (rerender-memo pattern)
const ItemButton = React.memo(function ItemButton({
  item,
  isActive,
  onSelect,
}: {
  item: ComponentItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "block w-full text-left rounded px-2 py-1.5 text-xs transition-all",
        "hover:bg-primary/10 hover:text-primary",
        isActive
          ? "bg-primary/20 text-primary border-l-2 border-primary"
          : "text-foreground"
      )}
    >
      {item.title}
    </button>
  );
});

// Memoized section component
const ExplorerSection = React.memo(function ExplorerSection({
  sectionKey,
  title,
  items,
  isOpen,
  onToggle,
  currentItemId,
  onItemSelect,
}: {
  sectionKey: string;
  title: string;
  items: readonly ComponentItem[];
  isOpen: boolean;
  onToggle: () => void;
  currentItemId?: string;
  onItemSelect?: (item: ComponentItem) => void;
}) {
  // Memoize the item list to avoid recreation
  const itemButtons = React.useMemo(
    () =>
      items.map((item) => (
        <ItemButton
          key={item.id}
          item={item}
          isActive={item.id === currentItemId}
          onSelect={() => onItemSelect?.(item)}
        />
      )),
    [items, currentItemId, onItemSelect]
  );

  return (
    <Collapsible
      key={sectionKey}
      open={isOpen}
      onOpenChange={onToggle}
      className="group/collapsible"
    >
      <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
        <ChevronRightIcon
          className={cn(
            "h-3.5 w-3.5 text-foreground transition-transform",
            isOpen ? "rotate-90" : ""
          )}
        />
        <span>{title}</span>
        <span className="ml-auto rounded border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary">
          {items.length}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 space-y-0.5 border-l border-primary/20 pl-3">
          {itemButtons}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});

export function ItemExplorer({
  currentItemId,
  onItemSelect,
  isMobile = false,
}: ItemExplorerProps) {
  // Use functional setState for toggle (rerender-functional-setstate pattern)
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    () => new Set(["components", "tron-movie"])
  );

  // Memoize toggle handlers to prevent recreation
  const toggleTronMovie = React.useCallback(() => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has("tron-movie")) {
        next.delete("tron-movie");
      } else {
        next.add("tron-movie");
      }
      return next;
    });
  }, []);

  const toggleComponents = React.useCallback(() => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has("components")) {
        next.delete("components");
      } else {
        next.add("components");
      }
      return next;
    });
  }, []);

  // Derive boolean values for section open state (rerender-derived-state pattern)
  const isTronMovieOpen = openSections.has("tron-movie");
  const isComponentsOpen = openSections.has("components");

  // Get tron-movie section data
  const tronMovieSection = componentSections["tron-movie"];

  const content = (
    <div className="p-4">
      {!isMobile && (
        <div className="mb-4">
          {/* Panel Header - Tron style with diagonal cut */}
          <div className="relative">
            {/* Top line */}
            <div className="absolute -top-1 left-0 right-4 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
            {/* Diagonal cut element */}
            <div className="absolute -top-1 right-0 h-4 w-4">
              <div className="absolute right-0 top-0 h-px w-4 bg-primary/40" style={{ transform: 'rotate(-45deg)', transformOrigin: 'right top' }} />
            </div>

            <div className="border-b border-primary/30 pb-2 pt-1">
              <span className="font-mono text-[11px] tracking-[0.2em] text-foreground">
                REGISTRY: <span className="text-foreground/70">01.IDX</span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-1">
        {/* GridCN section (Tron: Ares) */}
        {tronMovieSection ? (
          <ExplorerSection
            sectionKey="tron-movie"
            title={tronMovieSection.title}
            items={tronMovieSection.items}
            isOpen={isTronMovieOpen}
            onToggle={toggleTronMovie}
            currentItemId={currentItemId}
            onItemSelect={onItemSelect}
          />
        ) : null}

        {/* Components section */}
        <ExplorerSection
          sectionKey="components"
          title="Components"
          items={standardComponents}
          isOpen={isComponentsOpen}
          onToggle={toggleComponents}
          currentItemId={currentItemId}
          onItemSelect={onItemSelect}
        />
      </div>

      {/* Footer Status - Terminal style */}
      {!isMobile && (
        <div className="mt-auto border-t border-foreground/20 pt-3">
          <div className="flex items-center gap-2 font-mono text-[8px]">
            <span className="text-foreground">IDX:</span>
            <span className="text-primary">OK</span>
            <span className="text-foreground/50">|</span>
            <span className="text-foreground">MOD:</span>
            <span className="text-primary">
              {tronMovieSection ? tronMovieSection.items.length + standardComponents.length : standardComponents.length}
            </span>
            <span className="ml-auto text-foreground/70">.END.</span>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile version - just render the content
  if (isMobile) {
    return content;
  }

  // Desktop version
  return (
    <div className="relative z-30 hidden h-full w-64 shrink-0 overflow-y-auto border-r border-primary/30 bg-panel xl:flex xl:flex-col"
    >
      {/* CRT scanline effect */}
      <div
        className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
      />

      <div className="relative flex-1">
        {content}
      </div>
    </div>
  );
}
