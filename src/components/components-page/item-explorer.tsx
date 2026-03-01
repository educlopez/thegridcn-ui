"use client";

import * as React from "react";
import { ChevronRightIcon, SearchIcon, XIcon } from "lucide-react";
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

// Memoized item button component
const ItemButton = React.memo(function ItemButton({
  item,
  isActive,
  onSelect,
  highlight,
}: {
  item: ComponentItem;
  isActive: boolean;
  onSelect: () => void;
  highlight?: string;
}) {
  // Highlight matching substring
  const title = item.title;
  let content: React.ReactNode = title;

  if (highlight) {
    const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx >= 0) {
      content = (
        <>
          {title.slice(0, idx)}
          <span className="text-primary font-medium">{title.slice(idx, idx + highlight.length)}</span>
          {title.slice(idx + highlight.length)}
        </>
      );
    }
  }

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
      {content}
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
  highlight,
}: {
  sectionKey: string;
  title: string;
  items: readonly ComponentItem[];
  isOpen: boolean;
  onToggle: () => void;
  currentItemId?: string;
  onItemSelect?: (item: ComponentItem) => void;
  highlight?: string;
}) {
  const itemButtons = React.useMemo(
    () =>
      items.map((item) => (
        <ItemButton
          key={item.id}
          item={item}
          isActive={item.id === currentItemId}
          onSelect={() => onItemSelect?.(item)}
          highlight={highlight}
        />
      )),
    [items, currentItemId, onItemSelect, highlight]
  );

  if (items.length === 0) return null;

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
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    () => new Set(["components", "tron-movie"])
  );
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggleTronMovie = React.useCallback(() => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has("tron-movie")) next.delete("tron-movie");
      else next.add("tron-movie");
      return next;
    });
  }, []);

  const toggleComponents = React.useCallback(() => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has("components")) next.delete("components");
      else next.add("components");
      return next;
    });
  }, []);

  const isTronMovieOpen = openSections.has("tron-movie");
  const isComponentsOpen = openSections.has("components");

  const tronMovieSection = componentSections["tron-movie"];

  // Filter items by query
  const trimmed = query.trim().toLowerCase();
  const filteredTronItems = React.useMemo(() => {
    if (!trimmed || !tronMovieSection) return tronMovieSection?.items ?? [];
    return tronMovieSection.items.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.id.toLowerCase().includes(trimmed)
    );
  }, [trimmed, tronMovieSection]);

  const filteredStandardItems = React.useMemo(() => {
    if (!trimmed) return standardComponents;
    return standardComponents.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.id.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  // Auto-expand sections with results when searching
  const isSearching = trimmed.length > 0;
  const effectiveTronOpen = isSearching ? filteredTronItems.length > 0 : isTronMovieOpen;
  const effectiveComponentsOpen = isSearching ? filteredStandardItems.length > 0 : isComponentsOpen;

  // Keyboard shortcut: "/" to focus search
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const totalResults = filteredTronItems.length + filteredStandardItems.length;

  const content = (
    <div className="p-4">
      {!isMobile && (
        <div className="mb-4">
          <div className="relative">
            <div className="absolute -top-1 left-0 right-4 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
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

      {/* Search input */}
      <div className="relative mb-3">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/30" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components..."
          className={cn(
            "w-full rounded border bg-background/50 py-1.5 pl-8 pr-8 font-mono text-xs text-foreground placeholder:text-foreground/30",
            "outline-none transition-colors",
            "border-primary/20 focus:border-primary/50 focus:bg-background/80",
          )}
        />
        {query ? (
          <button
            type="button"
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-primary/20 bg-primary/5 px-1 font-mono text-[9px] text-foreground/30">
            /
          </kbd>
        )}
      </div>

      {/* Result count when searching */}
      {isSearching && (
        <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-foreground/30">
          {totalResults} {totalResults === 1 ? "result" : "results"}
        </div>
      )}

      <div className="space-y-1">
        {/* GridCN section */}
        {tronMovieSection && filteredTronItems.length > 0 ? (
          <ExplorerSection
            sectionKey="tron-movie"
            title={tronMovieSection.title}
            items={filteredTronItems}
            isOpen={effectiveTronOpen}
            onToggle={toggleTronMovie}
            currentItemId={currentItemId}
            onItemSelect={onItemSelect}
            highlight={isSearching ? trimmed : undefined}
          />
        ) : null}

        {/* Components section */}
        {filteredStandardItems.length > 0 ? (
          <ExplorerSection
            sectionKey="components"
            title="Components"
            items={filteredStandardItems}
            isOpen={effectiveComponentsOpen}
            onToggle={toggleComponents}
            currentItemId={currentItemId}
            onItemSelect={onItemSelect}
            highlight={isSearching ? trimmed : undefined}
          />
        ) : null}

        {/* No results */}
        {isSearching && totalResults === 0 && (
          <div className="py-8 text-center">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">
              NO MATCH FOUND
            </div>
            <div className="mt-1 font-mono text-[9px] text-foreground/20">
              Try a different search term
            </div>
          </div>
        )}
      </div>

      {/* Footer Status */}
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

  if (isMobile) return content;

  return (
    <div className="relative z-30 hidden h-full w-64 shrink-0 overflow-y-auto border-r border-primary/30 bg-panel xl:flex xl:flex-col">
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative flex-1">{content}</div>
    </div>
  );
}
