"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import { CalendarIcon, Settings, User, FileText, Search, Zap, Shield, Cpu } from "lucide-react"
import { format } from "date-fns"

export function OverlaysSection() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <SectionWrapper
      title="Overlays"
      description="Floating components and contextual interfaces"
    >
      <ComponentCard title="Popover">
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="btn-glow">
                Open Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Grid Status</h4>
                  <p className="text-sm text-muted-foreground">
                    Current system parameters and diagnostics.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Programs</span>
                    <span className="text-sm font-mono">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Load</span>
                    <span className="text-sm font-mono">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="text-sm font-mono">99.9%</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="btn-glow w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>
      </ComponentCard>

      <ComponentCard title="Tooltip">
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="btn-glow">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>System Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="btn-glow">
                  <User className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>User Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="btn-glow">
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Documentation</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="btn-glow">
                  Hover for details
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold">Grid Information</p>
                  <p className="text-xs">Version 2.0 | Cycle 2847</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentCard>

      <ComponentCard title="Hover Card">
        <div className="flex flex-wrap gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="h-auto p-0 text-primary">
                @tron
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary">TR</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Tron</h4>
                  <p className="text-sm text-muted-foreground">
                    Security program. Fights for the users.
                  </p>
                  <div className="flex items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      Security
                    </Badge>
                    <span className="ml-2 text-xs text-muted-foreground">
                      Active since Cycle 1
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="h-auto p-0 text-primary">
                @quorra
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary">QR</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Quorra</h4>
                  <p className="text-sm text-muted-foreground">
                    The last ISO. A miracle.
                  </p>
                  <div className="flex items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      ISO
                    </Badge>
                    <span className="ml-2 text-xs text-muted-foreground">
                      Unique existence
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentCard>

      <ComponentCard title="Context Menu">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuLabel>Program Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Zap className="mr-2 h-4 w-4" />
              Execute
              <ContextMenuShortcut>⌘E</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              Protect
              <ContextMenuShortcut>⌘P</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Cpu className="mr-2 h-4 w-4" />
              Analyze
              <ContextMenuShortcut>⌘A</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">
              Derezz
              <ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ComponentCard>

      <ComponentCard title="Command Palette">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>{" "}
            to open the command palette
          </p>

          {/* Static preview - uses inert to prevent focus stealing */}
          <div inert={true}>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Programs">
                  <CommandItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Tron</span>
                  </CommandItem>
                  <CommandItem>
                    <Cpu className="mr-2 h-4 w-4" />
                    <span>Clu</span>
                  </CommandItem>
                  <CommandItem>
                    <Zap className="mr-2 h-4 w-4" />
                    <span>Quorra</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search Programs</span>
                    <CommandShortcut>⌘F</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Programs">
                <CommandItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Tron</span>
                </CommandItem>
                <CommandItem>
                  <Cpu className="mr-2 h-4 w-4" />
                  <span>Clu</span>
                </CommandItem>
                <CommandItem>
                  <Zap className="mr-2 h-4 w-4" />
                  <span>Quorra</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search Programs</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
