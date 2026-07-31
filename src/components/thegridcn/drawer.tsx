"use client";

import type * as React from "react";
import {
  Drawer as DrawerPrimitive,
  DrawerClose as DrawerPrimitiveClose,
  DrawerContent as DrawerPrimitiveContent,
  DrawerDescription as DrawerPrimitiveDescription,
  DrawerFooter as DrawerPrimitiveFooter,
  DrawerHeader as DrawerPrimitiveHeader,
  DrawerTitle as DrawerPrimitiveTitle,
  DrawerTrigger as DrawerPrimitiveTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  TronDrawer (root)                                                  */
/* ------------------------------------------------------------------ */

type TronDrawerProps = React.ComponentProps<typeof DrawerPrimitive>;

function TronDrawer({ ...props }: TronDrawerProps) {
  return <DrawerPrimitive {...props} />;
}

/* ------------------------------------------------------------------ */
/*  TronDrawerTrigger                                                  */
/* ------------------------------------------------------------------ */

type TronDrawerTriggerProps = React.ComponentProps<
  typeof DrawerPrimitiveTrigger
>;

function TronDrawerTrigger({ className, ...props }: TronDrawerTriggerProps) {
  return (
    <DrawerPrimitiveTrigger
      data-slot="tron-drawer-trigger"
      className={cn(
        "rounded border border-primary/20 bg-card/60 px-4 py-2 font-mono text-[10px] text-foreground/50 uppercase tracking-widest backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerContent                                                  */
/* ------------------------------------------------------------------ */

type TronDrawerContentProps = React.ComponentProps<
  typeof DrawerPrimitiveContent
>;

function TronDrawerContent({
  className,
  children,
  ...props
}: TronDrawerContentProps) {
  return (
    <DrawerPrimitiveContent
      data-slot="tron-drawer-content"
      className={cn(
        "border-primary/30 bg-card/95 shadow-[0_0_40px_rgba(var(--primary-rgb,0,180,255),0.08)] backdrop-blur-md",
        className
      )}
      {...props}
    >
      {/* Tron handle bar */}
      <div className="mx-auto mt-4 hidden h-1 w-16 rounded-full bg-primary/30 group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />

      {children}
    </DrawerPrimitiveContent>
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerHeader                                                   */
/* ------------------------------------------------------------------ */

type TronDrawerHeaderProps = React.ComponentProps<typeof DrawerPrimitiveHeader>;

function TronDrawerHeader({ className, ...props }: TronDrawerHeaderProps) {
  return (
    <DrawerPrimitiveHeader
      data-slot="tron-drawer-header"
      className={cn("border-primary/20 border-b px-5 py-3", className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerFooter                                                   */
/* ------------------------------------------------------------------ */

type TronDrawerFooterProps = React.ComponentProps<typeof DrawerPrimitiveFooter>;

function TronDrawerFooter({ className, ...props }: TronDrawerFooterProps) {
  return (
    <DrawerPrimitiveFooter
      data-slot="tron-drawer-footer"
      className={cn("border-primary/20 border-t px-5 py-3", className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerTitle                                                    */
/* ------------------------------------------------------------------ */

type TronDrawerTitleProps = React.ComponentProps<typeof DrawerPrimitiveTitle>;

function TronDrawerTitle({ className, ...props }: TronDrawerTitleProps) {
  return (
    <DrawerPrimitiveTitle
      data-slot="tron-drawer-title"
      className={cn(
        "font-mono text-primary text-xs uppercase tracking-widest",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerDescription                                              */
/* ------------------------------------------------------------------ */

type TronDrawerDescriptionProps = React.ComponentProps<
  typeof DrawerPrimitiveDescription
>;

function TronDrawerDescription({
  className,
  ...props
}: TronDrawerDescriptionProps) {
  return (
    <DrawerPrimitiveDescription
      data-slot="tron-drawer-description"
      className={cn(
        "mt-0.5 font-mono text-[10px] text-foreground/40",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TronDrawerClose                                                    */
/* ------------------------------------------------------------------ */

type TronDrawerCloseProps = React.ComponentProps<typeof DrawerPrimitiveClose>;

function TronDrawerClose({ className, ...props }: TronDrawerCloseProps) {
  return (
    <DrawerPrimitiveClose
      data-slot="tron-drawer-close"
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded text-foreground/30 transition-colors hover:bg-primary/10 hover:text-primary",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  TronDrawer,
  TronDrawerClose,
  TronDrawerContent,
  TronDrawerDescription,
  TronDrawerFooter,
  TronDrawerHeader,
  TronDrawerTitle,
  TronDrawerTrigger,
};
