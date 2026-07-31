"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { selectableThemes, themes, useTheme } from "./theme-provider";

// Memoized theme button component to prevent unnecessary re-renders
const ThemeButton = React.memo(function ThemeButton({
  themeData,
  isActive,
  onSelect,
}: {
  themeData: (typeof themes)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300",
        "hover:glow-sm",
        isActive
          ? "glow-sm border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <span
        className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: themeData.color,
          boxShadow: isActive ? `0 0 10px ${themeData.color}` : "none",
        }}
      />
      <span className="font-medium text-sm">{themeData.name}</span>
    </button>
  );
});

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  // Memoize the theme buttons to avoid recreation on every render
  const themeButtons = React.useMemo(
    () =>
      selectableThemes.map((t) => (
        <ThemeButton
          key={t.id}
          themeData={t}
          isActive={theme === t.id}
          onSelect={() => setTheme(t.id)}
        />
      )),
    [theme, setTheme]
  );

  return <div className="flex flex-wrap gap-2">{themeButtons}</div>;
}

// Memoized compact button component
const CompactThemeButton = React.memo(function CompactThemeButton({
  themeData,
  isActive,
  onSelect,
}: {
  themeData: (typeof themes)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      title={`${themeData.name} - ${themeData.god}`}
      className={cn(
        "relative size-5 rounded-full border-2 transition-all duration-300",
        "hover:scale-110",
        isActive ? "scale-110" : "opacity-70 hover:opacity-100"
      )}
      style={{
        backgroundColor: themeData.color,
        borderColor: isActive ? themeData.color : "transparent",
        boxShadow: isActive
          ? `0 0 12px ${themeData.color}, 0 0 24px ${themeData.color}40`
          : "none",
      }}
    >
      {isActive ? (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: themeData.color }}
        />
      ) : null}
    </button>
  );
});

export function ThemeSwitcherCompact() {
  const { theme, setTheme } = useTheme();

  // Memoize the compact buttons
  const compactButtons = React.useMemo(
    () =>
      selectableThemes.map((t) => (
        <CompactThemeButton
          key={t.id}
          themeData={t}
          isActive={theme === t.id}
          onSelect={() => setTheme(t.id)}
        />
      )),
    [theme, setTheme]
  );

  return <div className="flex gap-2">{compactButtons}</div>;
}

// Memoized dropdown item component
const DropdownThemeItem = React.memo(function DropdownThemeItem({
  themeData,
  isActive,
  onSelect,
}: {
  themeData: (typeof themes)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-all",
        isActive ? "bg-primary/10" : "hover:bg-muted"
      )}
    >
      <span
        className="h-4 w-4 rounded-full"
        style={{
          backgroundColor: themeData.color,
          boxShadow: isActive ? `0 0 8px ${themeData.color}` : "none",
        }}
      />
      <div>
        <div className="font-medium">{themeData.name}</div>
        <div className="text-muted-foreground text-xs">{themeData.god}</div>
      </div>
    </button>
  );
});

// Use Map for O(1) theme lookup by ID (js-index-maps pattern)
const themeById = new Map(themes.map((t) => [t.id, t]));

export function ThemeSwitcherDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  // O(1) lookup instead of array find
  const currentTheme = themeById.get(theme);

  // Memoized handler to close dropdown
  const closeDropdown = React.useCallback(() => setOpen(false), []);

  // Memoize dropdown items
  const dropdownItems = React.useMemo(
    () =>
      selectableThemes.map((t) => (
        <DropdownThemeItem
          key={t.id}
          themeData={t}
          isActive={theme === t.id}
          onSelect={() => {
            setTheme(t.id);
            setOpen(false);
          }}
        />
      )),
    [theme, setTheme]
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="hover:glow-sm flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 transition-all hover:border-primary"
      >
        <span className="h-3 w-3 rounded-full bg-primary [box-shadow:0_0_8px_var(--primary)]" />
        <span className="font-medium">{currentTheme?.name}</span>
        <svg
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform",
            open ? "rotate-180" : ""
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open ? (
        <>
          <button
            aria-label="Close theme menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={closeDropdown}
            type="button"
          />
          <div className="absolute top-full right-0 z-50 mt-2 min-w-[200px] rounded-lg border border-border bg-card p-2 shadow-lg">
            {dropdownItems}
          </div>
        </>
      ) : null}
    </div>
  );
}
