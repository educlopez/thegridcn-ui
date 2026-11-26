import type { Metadata } from "next";
import { SiteFooter, TronHeader } from "@/components/layout";
import { EffectsWorkbench } from "./workbench";

export const metadata: Metadata = {
  alternates: { canonical: "https://thegridcn.com/effects" },
  description:
    "Try effects on live HTML, compare WebGL with the DOM fallback, and install them from The Gridcn registry.",
  title: "HTML-in-Canvas Effects | The Gridcn",
};

export default function EffectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TronHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <header className="mb-7 border-primary/25 border-b pb-6 sm:mb-9">
          <p className="mb-3 font-mono text-primary text-xs tracking-[0.2em]">
            GRIDCN / REBOOT LAB
          </p>
          <h1 className="font-bold font-display text-3xl tracking-tight sm:text-5xl">
            HTML-in-Canvas Effects
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            Refract text, fold a changing interface, or break a whole panel into
            glass. These demos use live HTML, not screenshots or video.
          </p>
        </header>
        <EffectsWorkbench />
        <section
          aria-labelledby="effects-fallback"
          className="mt-8 grid gap-3 border-primary/25 border-t pt-5 sm:grid-cols-[1fr_2fr] sm:gap-8"
        >
          <h2 className="font-display text-lg" id="effects-fallback">
            Built to fall back
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Auto opts into native HTML capture when it is available. Depending
            on the effect, the browser can use WebGL or Canvas 2D; without
            capture or with reduced motion, controls and data still work in the
            DOM. Nothing plays without an action, and audio follows Site sound.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
