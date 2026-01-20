"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertCircle,
  Terminal,
  Settings,
  Zap,
  Shield,
  Cpu,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  ChevronsUpDown,
} from "lucide-react";

// Accordion
export const AccordionExamplePreview = React.memo(function AccordionExamplePreview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the Grid?</AccordionTrigger>
        <AccordionContent>
          The Grid is a digital frontier created by Kevin Flynn.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What are ISOs?</AccordionTrigger>
        <AccordionContent>
          ISOs are a unique form of digital life that emerged on the Grid.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

// Alert
export const AlertExamplePreview = React.memo(function AlertExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>System Message</AlertTitle>
        <AlertDescription>Grid connection established.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Security breach detected.</AlertDescription>
      </Alert>
    </div>
  );
});

// Alert Dialog Example
export const AlertDialogExamplePreview = React.memo(function AlertDialogExamplePreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="btn-glow">
          Open Alert
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

// Aspect Ratio
export const AspectRatioExamplePreview = React.memo(function AspectRatioExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <AspectRatio
        ratio={16 / 9}
        className="overflow-hidden rounded-lg border border-border bg-muted"
      >
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-muted-foreground">
            16:9 Aspect Ratio
          </span>
        </div>
      </AspectRatio>
    </div>
  );
});

// Avatar
export const AvatarExamplePreview = React.memo(function AvatarExamplePreview() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar className="h-16 w-16 border-2 border-primary">
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback className="bg-primary/20 text-primary">
          TR
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12 border-2 border-primary">
        <AvatarFallback className="bg-primary/20 text-primary">
          CL
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10 border-2 border-primary">
        <AvatarFallback className="bg-primary/20 text-primary">
          QR
        </AvatarFallback>
      </Avatar>
    </div>
  );
});

// Badge
export const BadgeExamplePreview = React.memo(function BadgeExamplePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
});

// Breadcrumb
export const BreadcrumbExamplePreview = React.memo(function BreadcrumbExamplePreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Grid</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Sector 7</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Programs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
});

// Button
export const ButtonExamplePreview = React.memo(function ButtonExamplePreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="btn-glow">Default</Button>
      <Button variant="secondary" className="btn-glow">
        Secondary
      </Button>
      <Button variant="destructive" className="btn-glow">
        Destructive
      </Button>
      <Button variant="outline" className="btn-glow">
        Outline
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
});

// Button Group
export const ButtonGroupExamplePreview = React.memo(function ButtonGroupExamplePreview() {
  return (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  );
});

// Calendar
export const CalendarExamplePreview = React.memo(function CalendarExamplePreview() {
  return (
    <div className="flex justify-center">
      <Calendar mode="single" className="rounded-md border" />
    </div>
  );
});

// Card
export const CardExamplePreview = React.memo(function CardExamplePreview() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some information.</p>
      </CardContent>
      <CardFooter>
        <Button className="btn-glow">Action</Button>
      </CardFooter>
    </Card>
  );
});

// Carousel
export const CarouselExamplePreview = React.memo(function CarouselExamplePreview() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex h-48 items-center justify-center rounded-md border border-border bg-muted">
              <span className="text-sm text-muted-foreground">
                Slide {index + 1}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
});

// Chart
export const ChartExamplePreview = React.memo(function ChartExamplePreview() {
  return (
    <div className="w-full max-w-md">
      <div className="h-48 rounded-md border border-border bg-muted/30 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          Chart Component
        </span>
      </div>
    </div>
  );
});

// Checkbox
export const CheckboxExamplePreview = React.memo(function CheckboxExamplePreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Receive system updates</Label>
      </div>
    </div>
  );
});

// Collapsible
export const CollapsibleExamplePreview = React.memo(function CollapsibleExamplePreview() {
  return (
    <Collapsible className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between space-x-4 rounded-md border border-border px-4 py-2">
        <h4 className="text-sm font-semibold">System Logs</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
          [INFO] Grid initialization complete
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});

// Combobox
export const ComboboxExamplePreview = React.memo(function ComboboxExamplePreview() {
  return (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="combobox">Framework</Label>
      <Select>
        <SelectTrigger id="combobox">
          <SelectValue placeholder="Select framework..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});

// Command
export const CommandExamplePreview = React.memo(function CommandExamplePreview() {
  return (
    <Command className="rounded-lg border shadow-md max-w-md">
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
        </CommandGroup>
      </CommandList>
    </Command>
  );
});

// Context Menu
export const ContextMenuExamplePreview = React.memo(function ContextMenuExamplePreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-full max-w-md items-center justify-center rounded-md border border-dashed border-border text-sm">
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
      </ContextMenuContent>
    </ContextMenu>
  );
});

// Dialog
export const DialogExamplePreview = React.memo(function DialogExamplePreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-glow">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog component example.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});

// Drawer
export const DrawerExamplePreview = React.memo(function DrawerExamplePreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="btn-glow">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>System Status</DrawerTitle>
          <DrawerDescription>
            Current Grid diagnostics and system information.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here.
          </p>
        </div>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

// Dropdown Menu
export const DropdownMenuExamplePreview = React.memo(function DropdownMenuExamplePreview() {
  return (
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
  );
});

// Empty
export const EmptyExamplePreview = React.memo(function EmptyExamplePreview() {
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyTitle>No programs found</EmptyTitle>
        <EmptyDescription>
          There are no programs in this sector.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

// Field
export const FieldExamplePreview = React.memo(function FieldExamplePreview() {
  return (
    <FieldGroup className="max-w-md space-y-4">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="Enter your email" />
      </Field>
    </FieldGroup>
  );
});

// Hover Card
export const HoverCardExamplePreview = React.memo(function HoverCardExamplePreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-primary">
          @tron
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-primary/20 text-primary">
              TR
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Tron</h4>
            <p className="text-sm text-muted-foreground">
              Security program. Fights for the users.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
});

// Input
export const InputExamplePreview = React.memo(function InputExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="user@tron.grid" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
    </div>
  );
});

// Input Group
export const InputGroupExamplePreview = React.memo(function InputGroupExamplePreview() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupText>$</InputGroupText>
      <InputGroupInput placeholder="Amount" />
      <InputGroupText>.00</InputGroupText>
    </InputGroup>
  );
});

// Input OTP
export const InputOTPExamplePreview = React.memo(function InputOTPExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Label>Access Code</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
});

// Item
export const ItemExamplePreview = React.memo(function ItemExamplePreview() {
  return (
    <div className="space-y-2 max-w-md">
      <Item>
        <ItemContent>
          <ItemTitle>Program Name</ItemTitle>
          <ItemDescription>Tron</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Status</ItemTitle>
          <ItemDescription>Active</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
});

// Kbd
export const KbdExamplePreview = React.memo(function KbdExamplePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
    </div>
  );
});

// Label
export const LabelExamplePreview = React.memo(function LabelExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </div>
  );
});

// Menubar
export const MenubarExamplePreview = React.memo(function MenubarExamplePreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Program <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
});

// Native Select
export const NativeSelectExamplePreview = React.memo(function NativeSelectExamplePreview() {
  return (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="framework">Framework</Label>
      <select
        id="framework"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="react">React</option>
        <option value="next">Next.js</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  );
});

// Navigation Menu
export const NavigationMenuExamplePreview = React.memo(function NavigationMenuExamplePreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                    href="#"
                  >
                    <div className="text-sm font-medium">Security</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      System protection protocols
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="#"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
});

// Pagination
export const PaginationExamplePreview = React.memo(function PaginationExamplePreview() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

// Popover
export const PopoverExamplePreview = React.memo(function PopoverExamplePreview() {
  return (
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
        </div>
      </PopoverContent>
    </Popover>
  );
});

// Progress
export const ProgressExamplePreview = React.memo(function ProgressExamplePreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Download</span>
          <span>66%</span>
        </div>
        <Progress value={66} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Upload</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>
    </div>
  );
});

// Radio Group
export const RadioGroupExamplePreview = React.memo(function RadioGroupExamplePreview() {
  return (
    <RadioGroup defaultValue="option-one" className="max-w-md">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" />
        <Label htmlFor="r2">Option Two</Label>
      </div>
    </RadioGroup>
  );
});

// Resizable
export const ResizableExamplePreview = React.memo(function ResizableExamplePreview() {
  return (
    <div className="w-full max-w-md h-48 rounded-md border border-border bg-muted/30 flex items-center justify-center">
      <span className="text-sm text-muted-foreground">
        Resizable Component
      </span>
    </div>
  );
});

// Scroll Area
export const ScrollAreaExamplePreview = React.memo(function ScrollAreaExamplePreview() {
  return (
    <ScrollArea className="h-48 w-full max-w-md rounded-md border border-border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});

// Select
export const SelectExamplePreview = React.memo(function SelectExamplePreview() {
  return (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="role">Role</Label>
      <Select>
        <SelectTrigger id="role">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="guest">Guest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});

// Separator
export const SeparatorExamplePreview = React.memo(function SeparatorExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
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
      </div>
    </div>
  );
});

// Sheet
export const SheetExamplePreview = React.memo(function SheetExamplePreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="btn-glow">
          Open Sheet
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Grid Settings</SheetTitle>
          <SheetDescription>
            Configure your Grid preferences and system settings.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="sector">Home Sector</Label>
            <Input id="sector" placeholder="Enter sector number" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save Settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

// Skeleton
export const SkeletonExamplePreview = React.memo(function SkeletonExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
});

// Slider
export const SliderExamplePreview = React.memo(function SliderExamplePreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
});

// Sonner
export const SonnerExamplePreview = React.memo(function SonnerExamplePreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        className="btn-glow"
        onClick={() =>
          toast("Grid Notification", {
            description: "Your program has been uploaded successfully.",
          })
        }
      >
        Default Toast
      </Button>
      <Button
        variant="outline"
        className="btn-glow"
        onClick={() =>
          toast.success("Success", {
            description: "Connection to the Grid established.",
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        className="btn-glow"
        onClick={() =>
          toast.error("Error", {
            description: "Failed to connect to the Grid.",
          })
        }
      >
        Error Toast
      </Button>
    </div>
  );
});

// Spinner
export const SpinnerExamplePreview = React.memo(function SpinnerExamplePreview() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
      <Spinner size="sm" />
      <Spinner size="lg" />
    </div>
  );
});

// Switch
export const SwitchExamplePreview = React.memo(function SwitchExamplePreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane mode</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
    </div>
  );
});

// Table
export const TableExamplePreview = React.memo(function TableExamplePreview() {
  return (
    <div className="rounded-md border max-w-md">
      <Table>
        <TableCaption>A list of programs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono text-xs">PRG-001</TableCell>
            <TableCell>Tron</TableCell>
            <TableCell>
              <Badge variant="outline">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">PRG-002</TableCell>
            <TableCell>Clu</TableCell>
            <TableCell>
              <Badge variant="outline">Derezzed</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
});

// Tabs
export const TabsExamplePreview = React.memo(function TabsExamplePreview() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
});

// Textarea
export const TextareaExamplePreview = React.memo(function TextareaExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea id="comments" placeholder="Add any additional comments" />
      </div>
    </div>
  );
});

// Toggle
export const ToggleExamplePreview = React.memo(function ToggleExamplePreview() {
  return (
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
  );
});

// Toggle Group
export const ToggleGroupExamplePreview = React.memo(function ToggleGroupExamplePreview() {
  return (
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
    </div>
  );
});

// Tooltip
export const TooltipExamplePreview = React.memo(function TooltipExamplePreview() {
  return (
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
  );
});

// Component Example (Generic)
export const ComponentExamplePreview = React.memo(function ComponentExamplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Example Component</CardTitle>
          <CardDescription>
            This is an example component showcase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This demonstrates how components can be combined to create
            complex interfaces.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="btn-glow">Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const standardPreviews: Record<string, React.ComponentType> = {
  "accordion-example": AccordionExamplePreview,
  "alert-example": AlertExamplePreview,
  "alert-dialog-example": AlertDialogExamplePreview,
  "aspect-ratio-example": AspectRatioExamplePreview,
  "avatar-example": AvatarExamplePreview,
  "badge-example": BadgeExamplePreview,
  "breadcrumb-example": BreadcrumbExamplePreview,
  "button-example": ButtonExamplePreview,
  "button-group-example": ButtonGroupExamplePreview,
  "calendar-example": CalendarExamplePreview,
  "card-example": CardExamplePreview,
  "carousel-example": CarouselExamplePreview,
  "chart-example": ChartExamplePreview,
  "checkbox-example": CheckboxExamplePreview,
  "collapsible-example": CollapsibleExamplePreview,
  "combobox-example": ComboboxExamplePreview,
  "command-example": CommandExamplePreview,
  "context-menu-example": ContextMenuExamplePreview,
  "dialog-example": DialogExamplePreview,
  "drawer-example": DrawerExamplePreview,
  "dropdown-menu-example": DropdownMenuExamplePreview,
  "empty-example": EmptyExamplePreview,
  "field-example": FieldExamplePreview,
  "hover-card-example": HoverCardExamplePreview,
  "input-example": InputExamplePreview,
  "input-group-example": InputGroupExamplePreview,
  "input-otp-example": InputOTPExamplePreview,
  "item-example": ItemExamplePreview,
  "kbd-example": KbdExamplePreview,
  "label-example": LabelExamplePreview,
  "menubar-example": MenubarExamplePreview,
  "native-select-example": NativeSelectExamplePreview,
  "navigation-menu-example": NavigationMenuExamplePreview,
  "pagination-example": PaginationExamplePreview,
  "popover-example": PopoverExamplePreview,
  "progress-example": ProgressExamplePreview,
  "radio-group-example": RadioGroupExamplePreview,
  "resizable-example": ResizableExamplePreview,
  "scroll-area-example": ScrollAreaExamplePreview,
  "select-example": SelectExamplePreview,
  "separator-example": SeparatorExamplePreview,
  "sheet-example": SheetExamplePreview,
  "skeleton-example": SkeletonExamplePreview,
  "slider-example": SliderExamplePreview,
  "sonner-example": SonnerExamplePreview,
  "spinner-example": SpinnerExamplePreview,
  "switch-example": SwitchExamplePreview,
  "table-example": TableExamplePreview,
  "tabs-example": TabsExamplePreview,
  "textarea-example": TextareaExamplePreview,
  "toggle-example": ToggleExamplePreview,
  "toggle-group-example": ToggleGroupExamplePreview,
  "tooltip-example": TooltipExamplePreview,
  "component-example": ComponentExamplePreview,
};
