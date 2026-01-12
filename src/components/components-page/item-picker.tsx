"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";
import { getAllComponents, type ComponentItem } from "@/lib/component-data";
import { groupComponentsByType } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface ItemPickerProps {
  currentItemId?: string;
  onItemSelect?: (item: ComponentItem) => void;
}


export function ItemPicker({
  currentItemId,
  onItemSelect,
}: ItemPickerProps) {
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
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
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
                  <span className="text-muted-foreground ml-auto text-xs opacity-0 group-data-[selected=true]:opacity-100">
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
