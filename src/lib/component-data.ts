// Component data structure for the showcase
export type ComponentType =
  | "block"
  | "tron-movie"
  | "overlay"
  | "feedback"
  | "layout"
  | "data"
  | "navigation"
  | "button"
  | "form";

export interface ComponentItem {
  id: string;
  name: string;
  title: string;
  type: ComponentType;
  section: string;
}

export const componentSections: Partial<
  Record<ComponentType, { title: string; items: ComponentItem[] }>
> = {
  block: {
    title: "Blocks",
    items: [
      {
        id: "preview",
        name: "preview",
        title: "Home",
        type: "block",
        section: "blocks",
      },
      {
        id: "elevenlabs",
        name: "elevenlabs",
        title: "Elevenlabs",
        type: "block",
        section: "blocks",
      },
      {
        id: "github",
        name: "github",
        title: "GitHub",
        type: "block",
        section: "blocks",
      },
      {
        id: "vercel",
        name: "vercel",
        title: "Vercel",
        type: "block",
        section: "blocks",
      },
      {
        id: "chatgpt",
        name: "chatgpt",
        title: "ChatGPT",
        type: "block",
        section: "blocks",
      },
    ],
  },
  "tron-movie": {
    title: "GridCN",
    items: [
      // 3D Components
      {
        id: "grid-3d",
        name: "grid-3d",
        title: "Grid 3D",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "tunnel",
        name: "tunnel",
        title: "Tunnel",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "god-avatar",
        name: "god-avatar",
        title: "God Avatar",
        type: "tron-movie",
        section: "tron-movie",
      },
      // Data Display
      {
        id: "data-card",
        name: "data-card",
        title: "Data Card",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "status-bar",
        name: "status-bar",
        title: "Status Bar",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "video-player",
        name: "video-player",
        title: "Video Player",
        type: "tron-movie",
        section: "tron-movie",
      },
      // Timers
      {
        id: "timer",
        name: "timer",
        title: "Timer",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "countdown",
        name: "countdown",
        title: "Countdown",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "derez-timer",
        name: "derez-timer",
        title: "Derez Timer",
        type: "tron-movie",
        section: "tron-movie",
      },
      // HUD Elements
      {
        id: "reticle",
        name: "reticle",
        title: "Reticle",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "hud-frame",
        name: "hud-frame",
        title: "HUD Frame",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "stat",
        name: "stat",
        title: "Stat",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "speed-indicator",
        name: "speed-indicator",
        title: "Speed Indicator",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "regen-indicator",
        name: "regen-indicator",
        title: "Regen Indicator",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "radar",
        name: "radar",
        title: "Radar",
        type: "tron-movie",
        section: "tron-movie",
      },
      // Feedback
      {
        id: "alert-banner",
        name: "alert-banner",
        title: "Alert Banner",
        type: "tron-movie",
        section: "tron-movie",
      },
      // Effects
      {
        id: "circuit-background",
        name: "circuit-background",
        title: "Circuit Background",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "glow-container",
        name: "glow-container",
        title: "Glow Container",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "crt-effect",
        name: "crt-effect",
        title: "CRT Effect",
        type: "tron-movie",
        section: "tron-movie",
      },
      // Cinematic UI
      {
        id: "anomaly-banner",
        name: "anomaly-banner",
        title: "Anomaly Banner",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "hud-corner-frame",
        name: "hud-corner-frame",
        title: "HUD Corner Frame",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "video-progress",
        name: "video-progress",
        title: "Video Progress",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "floating-panel",
        name: "floating-panel",
        title: "Floating Panel",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "grid-scan-overlay",
        name: "grid-scan-overlay",
        title: "Grid Scan Overlay",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "location-display",
        name: "location-display",
        title: "Location Display",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "uplink-header",
        name: "uplink-header",
        title: "Uplink Header",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "arrival-panel",
        name: "arrival-panel",
        title: "Arrival Panel",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "beam-marker",
        name: "beam-marker",
        title: "Beam Marker",
        type: "tron-movie",
        section: "tron-movie",
      },
      {
        id: "timeline-bar",
        name: "timeline-bar",
        title: "Timeline Bar",
        type: "tron-movie",
        section: "tron-movie",
      },
    ],
  },
};

// Standard shadcn/ui components section (mapped from registry:example type)
export const standardComponents: ComponentItem[] = [
  {
    id: "accordion-example",
    name: "accordion-example",
    title: "Accordion",
    type: "overlay",
    section: "components",
  },
  {
    id: "alert-example",
    name: "alert-example",
    title: "Alert",
    type: "feedback",
    section: "components",
  },
  {
    id: "alert-dialog-example",
    name: "alert-dialog-example",
    title: "Alert Dialog",
    type: "overlay",
    section: "components",
  },
  {
    id: "aspect-ratio-example",
    name: "aspect-ratio-example",
    title: "Aspect Ratio",
    type: "layout",
    section: "components",
  },
  {
    id: "avatar-example",
    name: "avatar-example",
    title: "Avatar",
    type: "data",
    section: "components",
  },
  {
    id: "badge-example",
    name: "badge-example",
    title: "Badge",
    type: "data",
    section: "components",
  },
  {
    id: "breadcrumb-example",
    name: "breadcrumb-example",
    title: "Breadcrumb",
    type: "navigation",
    section: "components",
  },
  {
    id: "button-example",
    name: "button-example",
    title: "Button",
    type: "button",
    section: "components",
  },
  {
    id: "button-group-example",
    name: "button-group-example",
    title: "Button Group",
    type: "button",
    section: "components",
  },
  {
    id: "calendar-example",
    name: "calendar-example",
    title: "Calendar",
    type: "form",
    section: "components",
  },
  {
    id: "card-example",
    name: "card-example",
    title: "Card",
    type: "data",
    section: "components",
  },
  {
    id: "carousel-example",
    name: "carousel-example",
    title: "Carousel",
    type: "data",
    section: "components",
  },
  {
    id: "chart-example",
    name: "chart-example",
    title: "Chart",
    type: "data",
    section: "components",
  },
  {
    id: "checkbox-example",
    name: "checkbox-example",
    title: "Checkbox",
    type: "form",
    section: "components",
  },
  {
    id: "collapsible-example",
    name: "collapsible-example",
    title: "Collapsible",
    type: "layout",
    section: "components",
  },
  {
    id: "combobox-example",
    name: "combobox-example",
    title: "Combobox",
    type: "form",
    section: "components",
  },
  {
    id: "command-example",
    name: "command-example",
    title: "Command",
    type: "navigation",
    section: "components",
  },
  {
    id: "context-menu-example",
    name: "context-menu-example",
    title: "Context Menu",
    type: "navigation",
    section: "components",
  },
  {
    id: "dialog-example",
    name: "dialog-example",
    title: "Dialog",
    type: "overlay",
    section: "components",
  },
  {
    id: "drawer-example",
    name: "drawer-example",
    title: "Drawer",
    type: "overlay",
    section: "components",
  },
  {
    id: "dropdown-menu-example",
    name: "dropdown-menu-example",
    title: "Dropdown Menu",
    type: "navigation",
    section: "components",
  },
  {
    id: "empty-example",
    name: "empty-example",
    title: "Empty",
    type: "data",
    section: "components",
  },
  {
    id: "field-example",
    name: "field-example",
    title: "Field",
    type: "form",
    section: "components",
  },
  {
    id: "hover-card-example",
    name: "hover-card-example",
    title: "Hover Card",
    type: "overlay",
    section: "components",
  },
  {
    id: "input-example",
    name: "input-example",
    title: "Input",
    type: "form",
    section: "components",
  },
  {
    id: "input-group-example",
    name: "input-group-example",
    title: "Input Group",
    type: "form",
    section: "components",
  },
  {
    id: "input-otp-example",
    name: "input-otp-example",
    title: "Input OTP",
    type: "form",
    section: "components",
  },
  {
    id: "item-example",
    name: "item-example",
    title: "Item",
    type: "data",
    section: "components",
  },
  {
    id: "kbd-example",
    name: "kbd-example",
    title: "Kbd",
    type: "data",
    section: "components",
  },
  {
    id: "label-example",
    name: "label-example",
    title: "Label",
    type: "form",
    section: "components",
  },
  {
    id: "menubar-example",
    name: "menubar-example",
    title: "Menubar",
    type: "navigation",
    section: "components",
  },
  {
    id: "native-select-example",
    name: "native-select-example",
    title: "Native Select",
    type: "form",
    section: "components",
  },
  {
    id: "navigation-menu-example",
    name: "navigation-menu-example",
    title: "Navigation Menu",
    type: "navigation",
    section: "components",
  },
  {
    id: "pagination-example",
    name: "pagination-example",
    title: "Pagination",
    type: "navigation",
    section: "components",
  },
  {
    id: "popover-example",
    name: "popover-example",
    title: "Popover",
    type: "overlay",
    section: "components",
  },
  {
    id: "progress-example",
    name: "progress-example",
    title: "Progress",
    type: "feedback",
    section: "components",
  },
  {
    id: "radio-group-example",
    name: "radio-group-example",
    title: "Radio Group",
    type: "form",
    section: "components",
  },
  {
    id: "resizable-example",
    name: "resizable-example",
    title: "Resizable",
    type: "layout",
    section: "components",
  },
  {
    id: "scroll-area-example",
    name: "scroll-area-example",
    title: "Scroll Area",
    type: "layout",
    section: "components",
  },
  {
    id: "select-example",
    name: "select-example",
    title: "Select",
    type: "form",
    section: "components",
  },
  {
    id: "separator-example",
    name: "separator-example",
    title: "Separator",
    type: "layout",
    section: "components",
  },
  {
    id: "sheet-example",
    name: "sheet-example",
    title: "Sheet",
    type: "overlay",
    section: "components",
  },
  {
    id: "skeleton-example",
    name: "skeleton-example",
    title: "Skeleton",
    type: "data",
    section: "components",
  },
  {
    id: "slider-example",
    name: "slider-example",
    title: "Slider",
    type: "form",
    section: "components",
  },
  {
    id: "sonner-example",
    name: "sonner-example",
    title: "Sonner",
    type: "feedback",
    section: "components",
  },
  {
    id: "spinner-example",
    name: "spinner-example",
    title: "Spinner",
    type: "feedback",
    section: "components",
  },
  {
    id: "switch-example",
    name: "switch-example",
    title: "Switch",
    type: "form",
    section: "components",
  },
  {
    id: "table-example",
    name: "table-example",
    title: "Table",
    type: "data",
    section: "components",
  },
  {
    id: "tabs-example",
    name: "tabs-example",
    title: "Tabs",
    type: "navigation",
    section: "components",
  },
  {
    id: "textarea-example",
    name: "textarea-example",
    title: "Textarea",
    type: "form",
    section: "components",
  },
  {
    id: "toggle-example",
    name: "toggle-example",
    title: "Toggle",
    type: "button",
    section: "components",
  },
  {
    id: "toggle-group-example",
    name: "toggle-group-example",
    title: "Toggle Group",
    type: "button",
    section: "components",
  },
  {
    id: "tooltip-example",
    name: "tooltip-example",
    title: "Tooltip",
    type: "overlay",
    section: "components",
  },
  {
    id: "component-example",
    name: "component-example",
    title: "Example",
    type: "overlay",
    section: "components",
  },
];

// Add a "Components" section that groups all standard components
export const componentsSection = {
  title: "Components",
  items: standardComponents,
};

export function getAllComponents(): ComponentItem[] {
  const sectionComponents = Object.values(componentSections).flatMap(
    (section) => section.items
  );
  return [...sectionComponents, ...standardComponents];
}

export function getComponentById(id: string): ComponentItem | undefined {
  return getAllComponents().find((item) => item.id === id);
}

export function getComponentsByType(type: ComponentType): ComponentItem[] {
  return componentSections[type]?.items || [];
}
