"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TheGridcnLogo } from "./thegridcn-logo";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GitHubStars() {
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch("https://api.github.com/repos/educlopez/thegridcn-ui", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Silently fail on timeout or network error
      })
      .finally(() => clearTimeout(timeoutId));

    return () => controller.abort();
  }, []);

  return (
    <a
      href="https://github.com/educlopez/thegridcn-ui"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded border border-primary/30 bg-primary/5 px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-primary/50 hover:bg-primary/10"
    >
      <GitHubIcon className="h-4 w-4 text-primary" />
      <span className="text-primary">{stars !== null ? stars : "—"}</span>
    </a>
  );
}

interface NavItem {
  href: string;
  label: string;
}

interface TronHeaderProps {
  navItems?: NavItem[];
}

export function TronHeader({ navItems }: TronHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const defaultNavItems: NavItem[] = [
    { href: "/", label: "HOME" },
    { href: "/components", label: "COMPONENTS" },
    { href: "/game", label: "GAME" },
  ];

  const items = navItems || defaultNavItems;

  // Close menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div
        className="relative border-b border-primary/30 bg-panel"
      >
        {/* CRT scanline effect */}
        <div
          className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
        />
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo */}
            <div className="flex flex-1 justify-start">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <TheGridcnLogo size="sm" />
              </Link>
            </div>

            {/* Center section - Navigation (Desktop) */}
            <nav className="hidden items-center gap-1 lg:flex">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 font-mono text-xs tracking-widest transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {/* Active/Hover indicator */}
                  <span
                    className={cn(
                      "absolute inset-x-2 bottom-0 h-px bg-primary transition-transform",
                      pathname === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right section - Social & Actions */}
            <div className="flex flex-1 items-center justify-end gap-3">
              {/* GitHub Stars */}
              <div className="hidden sm:block">
                <GitHubStars />
              </div>

              {/* X (Twitter) Link */}
              <a
                href="https://x.com/educalvolpz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded border border-primary/30 bg-primary/5 px-2.5 py-1.5 transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <XIcon className="h-4 w-4 text-primary" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center rounded border border-primary/30 bg-primary/5 px-2.5 py-1.5 text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 lg:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="h-4 w-4" />
                ) : (
                  <MenuIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 transform border-l border-primary/30 bg-panel transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* CRT scanline effect */}
        <div
          className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
        />
        {/* Menu Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-b border-primary/20 px-4">
          {/* Top accent line */}
          <div className="absolute left-0 right-8 top-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground">
            NAVIGATION: <span className="text-foreground/70">00.SYS</span>
          </span>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center text-foreground/50 transition-colors hover:text-primary"
            aria-label="Close menu"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="relative flex flex-col p-4">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded border px-4 py-3 font-mono text-sm tracking-widest transition-all",
                  pathname === item.href
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/20 text-foreground/80 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                )}
              >
                {/* Index number */}
                <span className="font-mono text-[10px] text-primary/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Label */}
                <span>{item.label}</span>

                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="ml-auto font-mono text-[10px] text-primary">
                    ACTIVE
                  </span>
                )}

                {/* Corner accents */}
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/50" />
                <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/50" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary/50" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary/50" />
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-widest text-foreground">
              EXTERNAL LINKS
            </span>

            <a
              href="https://github.com/educlopez/thegridcn-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded border border-primary/30 px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              <GitHubIcon className="h-5 w-5 text-primary" />
              <span>GITHUB</span>
            </a>

            <a
              href="https://x.com/educalvolpz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded border border-primary/30 px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              <XIcon className="h-5 w-5 text-primary" />
              <span>X / TWITTER</span>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6">
            <div className="rounded border border-primary/30 bg-primary/5 p-3">
              <div className="font-mono text-[10px] tracking-widest text-foreground">
                SYSTEM STATUS
              </div>
              <div className="mt-1 font-mono text-xs text-primary">
                ALL SYSTEMS OPERATIONAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
