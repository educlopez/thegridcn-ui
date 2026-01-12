"use client"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import { Bold, Italic, Underline, ChevronDown, Loader2, Mail, Download } from "lucide-react"

export function ButtonsSection() {
  return (
    <SectionWrapper
      title="Buttons & Actions"
      description="Interactive elements with Tron-style glow effects"
    >
      <ComponentCard title="Button Variants">
        <div className="flex flex-wrap gap-4">
          <Button className="btn-glow">Default</Button>
          <Button variant="secondary" className="btn-glow">Secondary</Button>
          <Button variant="destructive" className="btn-glow">Destructive</Button>
          <Button variant="outline" className="btn-glow">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentCard>

      <ComponentCard title="Button Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" className="btn-glow">Large</Button>
          <Button size="default" className="btn-glow">Default</Button>
          <Button size="sm" className="btn-glow">Small</Button>
          <Button size="icon" className="btn-glow">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </ComponentCard>

      <ComponentCard title="Button States">
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
          <Button className="btn-glow">
            <Mail className="mr-2 h-4 w-4" />
            With Icon
          </Button>
          <Button className="btn-glow">
            Download
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </ComponentCard>

      <ComponentCard title="Toggle">
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic" variant="outline">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle underline" disabled>
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </ComponentCard>

      <ComponentCard title="Toggle Group">
        <div className="flex flex-wrap items-center gap-4">
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentCard>

      <ComponentCard title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="btn-glow">
              Open Menu
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentCard>
    </SectionWrapper>
  )
}
