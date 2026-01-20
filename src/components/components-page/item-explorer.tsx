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
          : "text-muted-foreground"
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
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            isOpen ? "rotate-90" : ""
          )}
        />
        <span>{title}</span>
        <span className="ml-auto rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary/60">
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

  return (
    <div className="sticky top-[88px] z-30 hidden h-[calc(100vh-88px)] w-64 overflow-y-auto border-r border-primary/20 bg-background/50 backdrop-blur-sm xl:flex xl:flex-col">
      <div className="p-4">
        <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
          COMPONENT REGISTRY
        </div>
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
      </div>
    </div>
  );
}
