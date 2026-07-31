"use client";

import { SearchIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { type ComponentItem, getAllComponents } from "@/lib/component-data";
import { isNewComponent } from "@/lib/component-new";
import { groupComponentsByType } from "@/lib/utils";

interface ItemPickerProps {
  currentItemId?: string;
  onItemSelect?: (item: ComponentItem) => void;
}

export function ItemPicker({ currentItemId, onItemSelect }: ItemPickerProps) {
  const [open, setOpen] = React.useState(false);
  const allComponents = React.useMemo(() => getAllComponents(), []);
  const groupedItems = React.useMemo(
    () => groupComponentsByType(allComponents),
    [allComponents]
  );

  const currentItem = React.useMemo(
    () => allComponents.find((item) => item.id === currentItemId) ?? null,
    [allComponents, currentItemId]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "p") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = React.useCallback(
    (item: ComponentItem) => {
      onItemSelect?.(item);
      setOpen(false);
    },
    [onItemSelect]
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 max-w-56 justify-between gap-2 rounded-lg pr-2 text-left shadow-none sm:max-w-md"
      >
        <div className="flex flex-1 items-center gap-2">
          <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
          <span className="truncate text-sm">
            {currentItem?.title || "Search components..."}
          </span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components..." />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          {groupedItems.map((group) => (
            <CommandGroup key={group.type} heading={group.title}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.id} ${item.type}`}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
                >
                  <span>{item.title}</span>
                  {isNewComponent(item.id) && (
                    <span className="shrink-0 rounded border border-primary/40 bg-primary/10 px-1 py-px font-mono text-[8px] text-primary uppercase tracking-wider">
                      new
                    </span>
                  )}
                  <span className="ml-auto text-foreground/80 text-xs opacity-0 group-data-[selected=true]:opacity-100">
                    {group.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
