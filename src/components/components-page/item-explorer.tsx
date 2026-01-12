"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  componentSections,
  standardComponents,
  type ComponentItem,
  type ComponentType,
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

export function ItemExplorer({
  currentItemId,
  onItemSelect,
}: ItemExplorerProps) {
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    new Set(["components", "tron-movie"])
  );

  const toggleSection = (type: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  return (
    <div className="sticky top-[88px] z-30 hidden h-[calc(100vh-88px)] w-64 overflow-y-auto border-r border-primary/20 bg-background/50 backdrop-blur-sm xl:flex xl:flex-col">
      <div className="p-4">
        <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
          COMPONENT REGISTRY
        </div>
        <div className="space-y-1">
          {/* GridCN section (Tron: Ares) */}
          {componentSections["tron-movie"] && (
            <Collapsible
              key="tron-movie"
              open={openSections.has("tron-movie")}
              onOpenChange={() => toggleSection("tron-movie")}
              className="group/collapsible"
            >
              <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
                <ChevronRightIcon
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform",
                    openSections.has("tron-movie") && "rotate-90"
                  )}
                />
                <span>{componentSections["tron-movie"].title}</span>
                <span className="ml-auto rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary/60">
                  {componentSections["tron-movie"].items.length}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 space-y-0.5 border-l border-primary/20 pl-3">
                  {componentSections["tron-movie"].items.map((item) => {
                    const isActive = item.id === currentItemId;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => onItemSelect?.(item)}
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
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Components section */}
          <Collapsible
            key="components"
            open={openSections.has("components")}
            onOpenChange={() => toggleSection("components")}
            className="group/collapsible"
          >
            <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
              <ChevronRightIcon
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground transition-transform",
                  openSections.has("components") && "rotate-90"
                )}
              />
              <span>Components</span>
              <span className="ml-auto rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary/60">
                {standardComponents.length}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-6 space-y-0.5 border-l border-primary/20 pl-3">
                {standardComponents.map((item) => {
                  const isActive = item.id === currentItemId;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => onItemSelect?.(item)}
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
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
