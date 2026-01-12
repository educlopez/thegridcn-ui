"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal } from "lucide-react"

export function FeedbackSection() {
  return (
    <SectionWrapper
      title="Feedback"
      description="Components for user notifications and confirmations"
    >
      <ComponentCard title="Alert">
        <div className="space-y-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>System Message</AlertTitle>
            <AlertDescription>
              Grid connection established. All protocols active.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Security breach detected in Sector 7. Initiating lockdown.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Success</AlertTitle>
            <AlertDescription className="text-green-400/80">
              Program successfully uploaded to the Grid.
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="text-yellow-500">Warning</AlertTitle>
            <AlertDescription className="text-yellow-400/80">
              System resources running low. Consider derezzzing inactive programs.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-500">Info</AlertTitle>
            <AlertDescription className="text-blue-400/80">
              New updates available for Grid protocols v2.0.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentCard>

      <ComponentCard title="Dialog">
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="btn-glow">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Program</DialogTitle>
                <DialogDescription>
                  Make changes to your program profile. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="Tron" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input id="type" defaultValue="Security" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Program</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deresolution</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently derezz the
                  program and remove all associated data from the Grid.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                  Derezz
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentCard>

      <ComponentCard title="Sheet">
        <div className="flex flex-wrap gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="btn-glow">Open Sheet (Right)</Button>
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
                <div className="space-y-2">
                  <Label htmlFor="alias">Program Alias</Label>
                  <Input id="alias" placeholder="Enter your alias" />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Save Settings</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="btn-glow">Open Sheet (Left)</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Access different areas of the Grid.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <nav className="space-y-2">
                  {["Dashboard", "Programs", "Sectors", "Settings"].map((item) => (
                    <Button key={item} variant="ghost" className="w-full justify-start">
                      {item}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ComponentCard>

      <ComponentCard title="Drawer">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="btn-glow">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>System Status</DrawerTitle>
              <DrawerDescription>
                Current Grid diagnostics and system information.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="text-sm text-muted-foreground">Active Programs</div>
                  <div className="text-2xl font-bold">2,847</div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="text-sm text-muted-foreground">Grid Uptime</div>
                  <div className="text-2xl font-bold">99.9%</div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="text-sm text-muted-foreground">Data Transfer</div>
                  <div className="text-2xl font-bold">1.2 TB</div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="text-sm text-muted-foreground">Sectors Online</div>
                  <div className="text-2xl font-bold">42</div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button>View Full Report</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentCard>

      <ComponentCard title="Toast (Sonner)">
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
          <Button
            variant="outline"
            className="btn-glow"
            onClick={() =>
              toast.warning("Warning", {
                description: "Low energy levels detected.",
              })
            }
          >
            Warning Toast
          </Button>
          <Button
            variant="outline"
            className="btn-glow"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                  loading: "Uploading to Grid...",
                  success: "Upload complete!",
                  error: "Upload failed.",
                }
              )
            }
          >
            Promise Toast
          </Button>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
