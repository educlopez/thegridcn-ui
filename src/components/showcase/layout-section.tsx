"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import { ChevronsUpDown } from "lucide-react"

export function LayoutSection() {
  const [isOpen, setIsOpen] = React.useState(false)

  const scrollItems = Array.from({ length: 50 }, (_, i) => ({
    id: `PRG-${String(i + 1).padStart(3, "0")}`,
    name: `Program ${i + 1}`,
  }))

  return (
    <SectionWrapper
      title="Layout"
      description="Components for organizing and structuring content"
    >
      <ComponentCard title="Accordion">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Grid?</AccordionTrigger>
            <AccordionContent>
              The Grid is a digital frontier created by Kevin Flynn. It&apos;s a
              vast virtual world where programs exist and operate under their
              own rules and hierarchies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What are ISOs?</AccordionTrigger>
            <AccordionContent>
              ISOs (Isomorphic Algorithms) are a unique form of digital life
              that spontaneously emerged on the Grid. They represent a
              breakthrough in artificial intelligence and digital evolution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How does deresolution work?</AccordionTrigger>
            <AccordionContent>
              Deresolution is the process by which a program is destroyed on the
              Grid. When a program is derezzed, their code is fragmented and
              their digital existence ends permanently.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentCard>

      <ComponentCard title="Collapsible">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
          <div className="flex items-center justify-between space-x-4 rounded-md border border-border px-4 py-2">
            <h4 className="text-sm font-semibold">System Logs</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
            [INFO] Grid initialization complete
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
              [INFO] Security protocols activated
            </div>
            <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
              [INFO] Program registry loaded (2847 entries)
            </div>
            <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
              [WARN] Sector 7 experiencing high traffic
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ComponentCard>

      <ComponentCard title="Separator">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold">Grid System</h4>
            <p className="text-sm text-muted-foreground">
              Digital frontier simulation environment
            </p>
          </div>
          <Separator />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Programs</div>
            <Separator orientation="vertical" />
            <div>Users</div>
            <Separator orientation="vertical" />
            <div>Sectors</div>
            <Separator orientation="vertical" />
            <div>Settings</div>
          </div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            System Version: 2.0 | Last Update: Cycle 2847
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Scroll Area">
        <ScrollArea className="h-72 w-full rounded-md border border-border p-4">
          <div className="space-y-2">
            <h4 className="mb-4 text-sm font-semibold leading-none">
              Active Programs
            </h4>
            {scrollItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {item.id}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentCard>

      <ComponentCard title="Aspect Ratio">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">16:9</span>
              </div>
            </AspectRatio>
            <p className="text-center text-xs text-muted-foreground">Widescreen</p>
          </div>
          <div className="space-y-2">
            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">4:3</span>
              </div>
            </AspectRatio>
            <p className="text-center text-xs text-muted-foreground">Standard</p>
          </div>
          <div className="space-y-2">
            <AspectRatio ratio={1} className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">1:1</span>
              </div>
            </AspectRatio>
            <p className="text-center text-xs text-muted-foreground">Square</p>
          </div>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
