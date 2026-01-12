"use client";

import * as React from "react";
import { type ComponentItem } from "@/lib/component-data";
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
  TronDataCard,
  TronAlert,
  TronAlertBanner,
  TronTimer,
  TronCountdown,
  TronDerezTimer,
  TronReticle,
  TronHUDFrame,
  TronStat,
  TronSpeedIndicator,
  TronRegenIndicator,
  TronStatusBar,
  TronRadar,
} from "@/components/tron-ui";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  CheckCircle,
  Info,
  AlertTriangle,
  Terminal,
  CalendarIcon,
  Settings,
  User,
  FileText,
  Search,
  Zap,
  Shield,
  Cpu,
  ChevronDown,
  Mail,
  Download,
  Loader2,
  Bold,
  Italic,
  Underline,
  ChevronsUpDown,
} from "lucide-react";
import { format } from "date-fns";

interface ComponentPreviewProps {
  component: ComponentItem;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  // Render different components based on the selected item
  if (!component) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No component selected</p>
      </div>
    );
  }

  switch (component.id) {
    // Blocks
    case "card-form":
      return (
        <div className="space-y-4 max-w-2xl">
          <Card>
            <div className="aspect-video w-full bg-muted/30 rounded-t-lg" />
            <CardHeader>
              <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
              <CardDescription>
                Switch to the improved way to explore your data, with natural
                language. Monitoring will no longer be available on the Pro plan
                in November, 2025.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button className="btn-glow">Create Query +</Button>
              <Button variant="outline" size="sm">
                Warning
              </Button>
            </CardFooter>
          </Card>
        </div>
      );

    case "form":
      return (
        <div className="space-y-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Please fill in your details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="program">Program</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any additional comments"
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="btn-glow">Submit</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      );

    case "complex-form":
      return (
        <div className="space-y-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                All transactions are secure and encrypted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="btn-glow w-full">Submit Payment</Button>
            </CardFooter>
          </Card>
        </div>
      );

    case "fields":
      return (
        <div className="space-y-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Compute Environment</CardTitle>
              <CardDescription>
                Select the compute environment for your cluster.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="kubernetes" className="space-y-4">
                <div className="flex items-start space-x-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <RadioGroupItem
                    value="kubernetes"
                    id="k8s"
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="k8s"
                      className="font-semibold cursor-pointer"
                    >
                      Kubernetes
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Run GPU workloads on a K8s configured cluster. This is the
                      default.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                  <RadioGroupItem value="vm" id="vm" className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="vm"
                      className="font-semibold cursor-pointer"
                    >
                      Virtual Machine
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Run workloads on a virtual machine instance.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="btn-glow">Continue</Button>
            </CardFooter>
          </Card>
        </div>
      );

    // Tron Movie Components
    case "data-card":
      return (
        <div className="space-y-4">
          <TronDataCard
            subtitle="RECORDED SUBJECT"
            title="AJAY SINGH"
            status="active"
            fields={[
              {
                label: "DOB",
                value: "02 MAY 1985 [DAVIS, CA, USA]",
                highlight: true,
              },
              { label: "EMPLOYER", value: "ENCOM" },
              {
                label: "POSITION",
                value: "CHIEF TECHNOLOGY OFFICER [2020 - PRESENT]",
              },
            ]}
          />
        </div>
      );

    case "alert-banner":
      return (
        <div className="space-y-4">
          <TronAlertBanner variant="info" title="System update available" />
          <TronAlertBanner
            variant="warning"
            title="Warning: High energy consumption detected"
          />
          <TronAlertBanner variant="danger" title="Error: Connection lost" />
        </div>
      );

    case "timer":
      return (
        <div className="space-y-4">
          <TronTimer
            hours={4}
            minutes={27}
            seconds={53}
            label="ELAPSED"
            sublabel="19:21:42"
            size="lg"
          />
          <TronTimer
            hours={0}
            minutes={8}
            seconds={24}
            label="SESSION"
            size="md"
            variant="elapsed"
          />
        </div>
      );

    case "countdown":
      return (
        <div className="space-y-4">
          <TronCountdown
            value="00:38 MINUTES"
            label="EVE KIM ARRIVAL"
            variant="danger"
          />
          <TronCountdown value="12:45" label="SESSION TIME" variant="default" />
          <TronCountdown value="05:30" label="WARNING" variant="warning" />
        </div>
      );

    case "derez-timer":
      return (
        <div className="space-y-4">
          <TronDerezTimer minutes={16} seconds={48} milliseconds={50} />
          <TronDerezTimer minutes={5} seconds={30} />
        </div>
      );

    case "reticle":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <TronReticle size={100} variant="default" />
            <TronReticle size={100} variant="locked" />
            <TronReticle size={100} variant="scanning" />
          </div>
        </div>
      );

    case "hud-frame":
      return (
        <div className="space-y-4">
          <TronHUDFrame label="SYSTEM STATUS">
            <div className="space-y-3">
              <TronStat label="SPEED" value={160} unit="KM/H" direction="up" />
              <TronStat
                label="ACCEL"
                value={2.76}
                unit="G"
                direction="neutral"
              />
              <TronStat label="TEMP" value={78} unit="°C" direction="down" />
            </div>
          </TronHUDFrame>
        </div>
      );

    case "stat":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <TronStat label="SPEED" value={160} unit="KM/H" direction="up" />
            <TronStat label="ACCEL" value={2.76} unit="G" direction="neutral" />
            <TronStat label="TEMP" value={78} unit="°C" direction="down" />
            <TronStat label="POWER" value={95} unit="%" direction="up" />
          </div>
        </div>
      );

    case "speed-indicator":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <TronSpeedIndicator speed={160} />
            <TronSpeedIndicator speed={85} />
            <TronSpeedIndicator speed={240} />
          </div>
        </div>
      );

    case "regen-indicator":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <TronRegenIndicator />
          </div>
        </div>
      );

    case "status-bar":
      return (
        <div className="space-y-4">
          <TronStatusBar
            leftContent={<span>SYSTEM: ACTIVE</span>}
            rightContent={
              <>
                <span>LAT: 59.90753° N</span>
                <span>LNG: 134.89466° W</span>
              </>
            }
          />
          <TronStatusBar
            variant="alert"
            leftContent={<span>WARNING: ANOMALY DETECTED</span>}
            rightContent={<span>PRIORITY: HIGH</span>}
          />
          <TronStatusBar
            variant="info"
            leftContent={<span>INFO: SYSTEM UPDATE</span>}
            rightContent={<span>STATUS: ONLINE</span>}
          />
        </div>
      );

    case "radar":
      return (
        <div className="space-y-4">
          <TronRadar
            size={200}
            targets={[
              { x: 30, y: 35 },
              { x: 70, y: 60 },
            ]}
          />
        </div>
      );

    // Button Components
    case "button-variants":
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

    case "button-sizes":
      return (
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" className="btn-glow">
            Large
          </Button>
          <Button size="default" className="btn-glow">
            Default
          </Button>
          <Button size="sm" className="btn-glow">
            Small
          </Button>
        </div>
      );

    // Form Components
    case "input":
      return (
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" placeholder="Add any additional comments" />
          </div>
        </div>
      );

    case "select":
      return (
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
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
        </div>
      );

    case "radio-group":
      return (
        <div className="space-y-4 max-w-md">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup>
        </div>
      );

    case "slider":
      return (
        <div className="space-y-4 w-full max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Accept terms and conditions
            </label>
          </div>
        </div>
      );

    case "switch":
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode" className="text-sm">
              Airplane mode
            </label>
          </div>
        </div>
      );

    // Data Display Components
    case "card":
      return (
        <div className="max-w-md">
          <Card>
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
        </div>
      );

    case "badge":
      return (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      );

    case "progress":
      return (
        <div className="space-y-4 w-full max-w-md">
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
        </div>
      );

    // Navigation Components
    case "tabs":
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

    // Layout Components
    case "accordion":
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

    // Overlay Components
    case "dialog":
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

    case "alert-dialog":
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

    // Standard shadcn/ui Components
    case "accordion-example":
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

    case "alert-example":
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

    case "alert-dialog-example":
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

    case "aspect-ratio-example":
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

    case "avatar-example":
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

    case "badge-example":
      return (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      );

    case "breadcrumb-example":
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

    case "button-example":
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

    case "button-group-example":
      return (
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      );

    case "calendar-example":
      return (
        <div className="flex justify-center">
          <Calendar mode="single" className="rounded-md border" />
        </div>
      );

    case "card-example":
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

    case "carousel-example":
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

    case "chart-example":
      return (
        <div className="w-full max-w-md">
          <div className="h-48 rounded-md border border-border bg-muted/30 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Chart Component
            </span>
          </div>
        </div>
      );

    case "checkbox-example":
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

    case "collapsible-example":
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

    case "combobox-example":
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

    case "command-example":
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

    case "context-menu-example":
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

    case "dialog-example":
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

    case "drawer-example":
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

    case "dropdown-menu-example":
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

    case "empty-example":
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

    case "field-example":
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

    case "hover-card-example":
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

    case "input-example":
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

    case "input-group-example":
      return (
        <InputGroup className="max-w-md">
          <InputGroupText>$</InputGroupText>
          <InputGroupInput placeholder="Amount" />
          <InputGroupText>.00</InputGroupText>
        </InputGroup>
      );

    case "input-otp-example":
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

    case "item-example":
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

    case "kbd-example":
      return (
        <div className="flex flex-wrap gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Shift</Kbd>
        </div>
      );

    case "label-example":
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

    case "menubar-example":
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

    case "native-select-example":
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

    case "navigation-menu-example":
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

    case "pagination-example":
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

    case "popover-example":
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

    case "progress-example":
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

    case "radio-group-example":
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

    case "resizable-example":
      return (
        <div className="w-full max-w-md h-48 rounded-md border border-border bg-muted/30 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Resizable Component
          </span>
        </div>
      );

    case "scroll-area-example":
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

    case "select-example":
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

    case "separator-example":
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

    case "sheet-example":
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

    case "skeleton-example":
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

    case "slider-example":
      return (
        <div className="space-y-4 w-full max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      );

    case "sonner-example":
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

    case "spinner-example":
      return (
        <div className="flex items-center gap-4">
          <Spinner />
          <Spinner size="sm" />
          <Spinner size="lg" />
        </div>
      );

    case "switch-example":
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

    case "table-example":
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

    case "tabs-example":
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

    case "textarea-example":
      return (
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" placeholder="Add any additional comments" />
          </div>
        </div>
      );

    case "toggle-example":
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

    case "toggle-group-example":
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

    case "tooltip-example":
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

    case "component-example":
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

    default:
      // Log for debugging
      console.warn(
        `Component preview not found for ID: "${component.id}" (title: "${component.title}")`
      );
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-sm font-semibold text-primary">
              Component preview not available
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              ID:{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                {component.id}
              </code>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Title: {component.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Type: {component.type}
            </p>
          </div>
        </div>
      );
  }
}
