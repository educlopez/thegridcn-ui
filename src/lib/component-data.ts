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
  section: string;
  title: string;
  type: ComponentType;
}

export const componentSections: Partial<
  Record<ComponentType, { title: string; items: ComponentItem[] }>
> = {
  block: {
    items: [
      {
        id: "preview",
        name: "preview",
        section: "blocks",
        title: "Home",
        type: "block",
      },
      {
        id: "elevenlabs",
        name: "elevenlabs",
        section: "blocks",
        title: "Elevenlabs",
        type: "block",
      },
      {
        id: "github",
        name: "github",
        section: "blocks",
        title: "GitHub",
        type: "block",
      },
      {
        id: "vercel",
        name: "vercel",
        section: "blocks",
        title: "Vercel",
        type: "block",
      },
      {
        id: "chatgpt",
        name: "chatgpt",
        section: "blocks",
        title: "ChatGPT",
        type: "block",
      },
    ],
    title: "Blocks",
  },
  "tron-movie": {
    items: [
      // 3D Components
      {
        id: "grid-3d",
        name: "grid-3d",
        section: "tron-movie",
        title: "Grid 3D",
        type: "tron-movie",
      },
      {
        id: "tunnel",
        name: "tunnel",
        section: "tron-movie",
        title: "Tunnel",
        type: "tron-movie",
      },
      {
        id: "god-avatar",
        name: "god-avatar",
        section: "tron-movie",
        title: "God Avatar",
        type: "tron-movie",
      },
      // Data Display
      {
        id: "data-card",
        name: "data-card",
        section: "tron-movie",
        title: "Data Card",
        type: "tron-movie",
      },
      {
        id: "status-bar",
        name: "status-bar",
        section: "tron-movie",
        title: "Status Bar",
        type: "tron-movie",
      },
      {
        id: "video-player",
        name: "video-player",
        section: "tron-movie",
        title: "Video Player",
        type: "tron-movie",
      },
      // Timers
      {
        id: "timer",
        name: "timer",
        section: "tron-movie",
        title: "Timer",
        type: "tron-movie",
      },
      {
        id: "countdown",
        name: "countdown",
        section: "tron-movie",
        title: "Countdown",
        type: "tron-movie",
      },
      {
        id: "derez-timer",
        name: "derez-timer",
        section: "tron-movie",
        title: "Derez Timer",
        type: "tron-movie",
      },
      // HUD Elements
      {
        id: "reticle",
        name: "reticle",
        section: "tron-movie",
        title: "Reticle",
        type: "tron-movie",
      },
      {
        id: "hud-frame",
        name: "hud-frame",
        section: "tron-movie",
        title: "HUD Frame",
        type: "tron-movie",
      },
      {
        id: "stat",
        name: "stat",
        section: "tron-movie",
        title: "Stat",
        type: "tron-movie",
      },
      {
        id: "speed-indicator",
        name: "speed-indicator",
        section: "tron-movie",
        title: "Speed Indicator",
        type: "tron-movie",
      },
      {
        id: "regen-indicator",
        name: "regen-indicator",
        section: "tron-movie",
        title: "Regen Indicator",
        type: "tron-movie",
      },
      {
        id: "radar",
        name: "radar",
        section: "tron-movie",
        title: "Radar",
        type: "tron-movie",
      },
      // Feedback
      {
        id: "alert-banner",
        name: "alert-banner",
        section: "tron-movie",
        title: "Alert Banner",
        type: "tron-movie",
      },
      // Effects
      {
        id: "circuit-background",
        name: "circuit-background",
        section: "tron-movie",
        title: "Circuit Background",
        type: "tron-movie",
      },
      {
        id: "glow-container",
        name: "glow-container",
        section: "tron-movie",
        title: "Glow Container",
        type: "tron-movie",
      },
      {
        id: "crt-effect",
        name: "crt-effect",
        section: "tron-movie",
        title: "CRT Effect",
        type: "tron-movie",
      },
      // Cinematic UI
      {
        id: "anomaly-banner",
        name: "anomaly-banner",
        section: "tron-movie",
        title: "Anomaly Banner",
        type: "tron-movie",
      },
      {
        id: "hud-corner-frame",
        name: "hud-corner-frame",
        section: "tron-movie",
        title: "HUD Corner Frame",
        type: "tron-movie",
      },
      {
        id: "video-progress",
        name: "video-progress",
        section: "tron-movie",
        title: "Video Progress",
        type: "tron-movie",
      },
      {
        id: "floating-panel",
        name: "floating-panel",
        section: "tron-movie",
        title: "Floating Panel",
        type: "tron-movie",
      },
      {
        id: "grid-scan-overlay",
        name: "grid-scan-overlay",
        section: "tron-movie",
        title: "Grid Scan Overlay",
        type: "tron-movie",
      },
      {
        id: "location-display",
        name: "location-display",
        section: "tron-movie",
        title: "Location Display",
        type: "tron-movie",
      },
      {
        id: "uplink-header",
        name: "uplink-header",
        section: "tron-movie",
        title: "Uplink Header",
        type: "tron-movie",
      },
      {
        id: "arrival-panel",
        name: "arrival-panel",
        section: "tron-movie",
        title: "Arrival Panel",
        type: "tron-movie",
      },
      {
        id: "beam-marker",
        name: "beam-marker",
        section: "tron-movie",
        title: "Beam Marker",
        type: "tron-movie",
      },
      {
        id: "timeline-bar",
        name: "timeline-bar",
        section: "tron-movie",
        title: "Timeline Bar",
        type: "tron-movie",
      },
      // Interactive UI
      {
        id: "terminal",
        name: "terminal",
        section: "tron-movie",
        title: "Terminal",
        type: "tron-movie",
      },
      {
        id: "energy-meter",
        name: "energy-meter",
        section: "tron-movie",
        title: "Energy Meter",
        type: "tron-movie",
      },
      {
        id: "progress-ring",
        name: "progress-ring",
        section: "tron-movie",
        title: "Progress Ring",
        type: "tron-movie",
      },
      {
        id: "diagnostics-panel",
        name: "diagnostics-panel",
        section: "tron-movie",
        title: "Diagnostics Panel",
        type: "tron-movie",
      },
      {
        id: "identity-disc",
        name: "identity-disc",
        section: "tron-movie",
        title: "Identity Disc",
        type: "tron-movie",
      },
      // Dashboard & Monitoring
      {
        id: "gauge",
        name: "gauge",
        section: "tron-movie",
        title: "Gauge",
        type: "tron-movie",
      },
      {
        id: "waveform",
        name: "waveform",
        section: "tron-movie",
        title: "Waveform",
        type: "tron-movie",
      },
      {
        id: "data-stream",
        name: "data-stream",
        section: "tron-movie",
        title: "Data Stream",
        type: "tron-movie",
      },
      {
        id: "boot-sequence",
        name: "boot-sequence",
        section: "tron-movie",
        title: "Boot Sequence",
        type: "tron-movie",
      },
      {
        id: "signal-indicator",
        name: "signal-indicator",
        section: "tron-movie",
        title: "Signal Indicator",
        type: "tron-movie",
      },
      {
        id: "notification",
        name: "notification",
        section: "tron-movie",
        title: "Notification",
        type: "tron-movie",
      },
      {
        id: "stepper",
        name: "stepper",
        section: "tron-movie",
        title: "Stepper",
        type: "tron-movie",
      },
      {
        id: "tag",
        name: "tag",
        section: "tron-movie",
        title: "Tag",
        type: "tron-movie",
      },
      // Landing Page & Dashboard
      {
        id: "stat-card",
        name: "stat-card",
        section: "tron-movie",
        title: "Stat Card",
        type: "tron-movie",
      },
      {
        id: "sparkline",
        name: "sparkline",
        section: "tron-movie",
        title: "Sparkline",
        type: "tron-movie",
      },
      {
        id: "feature-card",
        name: "feature-card",
        section: "tron-movie",
        title: "Feature Card",
        type: "tron-movie",
      },
      {
        id: "pricing-card",
        name: "pricing-card",
        section: "tron-movie",
        title: "Pricing Card",
        type: "tron-movie",
      },
      {
        id: "testimonial-card",
        name: "testimonial-card",
        section: "tron-movie",
        title: "Testimonial Card",
        type: "tron-movie",
      },
      {
        id: "stats-counter",
        name: "stats-counter",
        section: "tron-movie",
        title: "Stats Counter",
        type: "tron-movie",
      },
      {
        id: "cta-banner",
        name: "cta-banner",
        section: "tron-movie",
        title: "CTA Banner",
        type: "tron-movie",
      },
      {
        id: "heatmap",
        name: "heatmap",
        section: "tron-movie",
        title: "Heatmap",
        type: "tron-movie",
      },
      // Marketing & Product
      {
        id: "logo-cloud",
        name: "logo-cloud",
        section: "tron-movie",
        title: "Logo Cloud",
        type: "tron-movie",
      },
      {
        id: "comparison-table",
        name: "comparison-table",
        section: "tron-movie",
        title: "Comparison Table",
        type: "tron-movie",
      },
      {
        id: "changelog",
        name: "changelog",
        section: "tron-movie",
        title: "Changelog",
        type: "tron-movie",
      },
      {
        id: "progress-bar",
        name: "progress-bar",
        section: "tron-movie",
        title: "Progress Bar",
        type: "tron-movie",
      },
      {
        id: "avatar-group",
        name: "avatar-group",
        section: "tron-movie",
        title: "Avatar Group",
        type: "tron-movie",
      },
      {
        id: "bento-grid",
        name: "bento-grid",
        section: "tron-movie",
        title: "Bento Grid",
        type: "tron-movie",
      },
      {
        id: "marquee",
        name: "marquee",
        section: "tron-movie",
        title: "Marquee",
        type: "tron-movie",
      },
      {
        id: "divider",
        name: "divider",
        section: "tron-movie",
        title: "Divider",
        type: "tron-movie",
      },
      // Essential UI
      {
        id: "faq",
        name: "faq",
        section: "tron-movie",
        title: "FAQ",
        type: "tron-movie",
      },
      {
        id: "timeline",
        name: "timeline",
        section: "tron-movie",
        title: "Timeline",
        type: "tron-movie",
      },
      {
        id: "announcement-bar",
        name: "announcement-bar",
        section: "tron-movie",
        title: "Announcement Bar",
        type: "tron-movie",
      },
      {
        id: "data-table",
        name: "data-table",
        section: "tron-movie",
        title: "Data Table",
        type: "tron-movie",
      },
      {
        id: "rating",
        name: "rating",
        section: "tron-movie",
        title: "Rating",
        type: "tron-movie",
      },
      {
        id: "skeleton",
        name: "skeleton",
        section: "tron-movie",
        title: "Skeleton",
        type: "tron-movie",
      },
      {
        id: "breadcrumb-nav",
        name: "breadcrumb-nav",
        section: "tron-movie",
        title: "Breadcrumb",
        type: "tron-movie",
      },
      {
        id: "command-menu",
        name: "command-menu",
        section: "tron-movie",
        title: "Command Menu",
        type: "tron-movie",
      },
      // Avatar
      {
        id: "agent-avatar",
        name: "agent-avatar",
        section: "tron-movie",
        title: "Agent Avatar",
        type: "tron-movie",
      },
      // Application UI
      {
        id: "tabs",
        name: "tabs",
        section: "tron-movie",
        title: "Tabs",
        type: "tron-movie",
      },
      {
        id: "tooltip",
        name: "tooltip",
        section: "tron-movie",
        title: "Tooltip",
        type: "tron-movie",
      },
      {
        id: "modal",
        name: "modal",
        section: "tron-movie",
        title: "Modal",
        type: "tron-movie",
      },
      {
        id: "dropdown",
        name: "dropdown",
        section: "tron-movie",
        title: "Dropdown",
        type: "tron-movie",
      },
      {
        id: "toggle",
        name: "toggle",
        section: "tron-movie",
        title: "Toggle",
        type: "tron-movie",
      },
      {
        id: "pagination",
        name: "pagination",
        section: "tron-movie",
        title: "Pagination",
        type: "tron-movie",
      },
      {
        id: "file-upload",
        name: "file-upload",
        section: "tron-movie",
        title: "File Upload",
        type: "tron-movie",
      },
      {
        id: "kanban-board",
        name: "kanban-board",
        section: "tron-movie",
        title: "Kanban Board",
        type: "tron-movie",
      },
      // Form & Input
      {
        id: "empty-state",
        name: "empty-state",
        section: "tron-movie",
        title: "Empty State",
        type: "tron-movie",
      },
      {
        id: "badge",
        name: "badge",
        section: "tron-movie",
        title: "Badge",
        type: "tron-movie",
      },
      {
        id: "toast",
        name: "toast",
        section: "tron-movie",
        title: "Toast",
        type: "tron-movie",
      },
      {
        id: "slider",
        name: "slider",
        section: "tron-movie",
        title: "Slider",
        type: "tron-movie",
      },
      {
        id: "select",
        name: "select",
        section: "tron-movie",
        title: "Select",
        type: "tron-movie",
      },
      {
        id: "text-input",
        name: "text-input",
        section: "tron-movie",
        title: "Text Input",
        type: "tron-movie",
      },
      {
        id: "number-input",
        name: "number-input",
        section: "tron-movie",
        title: "Number Input",
        type: "tron-movie",
      },
      {
        id: "chip",
        name: "chip",
        section: "tron-movie",
        title: "Chip",
        type: "tron-movie",
      },
      // Code & Utilities
      {
        id: "copy-button",
        name: "copy-button",
        section: "tron-movie",
        title: "Copy Button",
        type: "tron-movie",
      },
      {
        id: "tron-code-block",
        name: "tron-code-block",
        section: "tron-movie",
        title: "Code Block",
        type: "tron-movie",
      },
      {
        id: "install-command",
        name: "install-command",
        section: "tron-movie",
        title: "Install Command",
        type: "tron-movie",
      },
      // Status & Indicators
      {
        id: "status-dot",
        name: "status-dot",
        section: "tron-movie",
        title: "Status Dot",
        type: "tron-movie",
      },
      // Layout & Page Sections
      {
        id: "hero-section",
        name: "hero-section",
        section: "tron-movie",
        title: "Hero Section",
        type: "tron-movie",
      },
      {
        id: "tron-footer",
        name: "tron-footer",
        section: "tron-movie",
        title: "Footer",
        type: "tron-movie",
      },
      {
        id: "sidebar-nav",
        name: "sidebar-nav",
        section: "tron-movie",
        title: "Sidebar Nav",
        type: "tron-movie",
      },
      // Wrappers (Tron-styled shadcn/ui)
      {
        id: "tron-accordion",
        name: "tron-accordion",
        section: "tron-movie",
        title: "Tron Accordion",
        type: "tron-movie",
      },
      {
        id: "tron-carousel",
        name: "tron-carousel",
        section: "tron-movie",
        title: "Tron Carousel",
        type: "tron-movie",
      },
      {
        id: "tron-drawer",
        name: "tron-drawer",
        section: "tron-movie",
        title: "Tron Drawer",
        type: "tron-movie",
      },
      {
        id: "tron-card",
        name: "tron-card",
        section: "tron-movie",
        title: "Tron Card",
        type: "tron-movie",
      },
      {
        id: "tron-popover",
        name: "tron-popover",
        section: "tron-movie",
        title: "Tron Popover",
        type: "tron-movie",
      },
      // Data Display (Extended)
      {
        id: "activity-feed",
        name: "activity-feed",
        section: "tron-movie",
        title: "Activity Feed",
        type: "tron-movie",
      },
      {
        id: "metric-row",
        name: "metric-row",
        section: "tron-movie",
        title: "Metric Row",
        type: "tron-movie",
      },
      // Form & Input (Extended)
      {
        id: "search-input",
        name: "search-input",
        section: "tron-movie",
        title: "Search Input",
        type: "tron-movie",
      },
      {
        id: "tag-input",
        name: "tag-input",
        section: "tron-movie",
        title: "Tag Input",
        type: "tron-movie",
      },
      {
        id: "newsletter-form",
        name: "newsletter-form",
        section: "tron-movie",
        title: "Newsletter Form",
        type: "tron-movie",
      },
      {
        id: "date-picker",
        name: "date-picker",
        section: "tron-movie",
        title: "Date Picker",
        type: "tron-movie",
      },
      // Game
      {
        id: "light-cycle-game",
        name: "light-cycle-game",
        section: "tron-movie",
        title: "Light Cycle Game",
        type: "tron-movie",
      },
    ],
    title: "GridCN",
  },
};

// Standard shadcn/ui components section (mapped from registry:example type)
export const standardComponents: ComponentItem[] = [
  {
    id: "accordion-example",
    name: "accordion-example",
    section: "components",
    title: "Accordion",
    type: "overlay",
  },
  {
    id: "alert-example",
    name: "alert-example",
    section: "components",
    title: "Alert",
    type: "feedback",
  },
  {
    id: "alert-dialog-example",
    name: "alert-dialog-example",
    section: "components",
    title: "Alert Dialog",
    type: "overlay",
  },
  {
    id: "aspect-ratio-example",
    name: "aspect-ratio-example",
    section: "components",
    title: "Aspect Ratio",
    type: "layout",
  },
  {
    id: "avatar-example",
    name: "avatar-example",
    section: "components",
    title: "Avatar",
    type: "data",
  },
  {
    id: "badge-example",
    name: "badge-example",
    section: "components",
    title: "Badge",
    type: "data",
  },
  {
    id: "breadcrumb-example",
    name: "breadcrumb-example",
    section: "components",
    title: "Breadcrumb",
    type: "navigation",
  },
  {
    id: "button-example",
    name: "button-example",
    section: "components",
    title: "Button",
    type: "button",
  },
  {
    id: "button-group-example",
    name: "button-group-example",
    section: "components",
    title: "Button Group",
    type: "button",
  },
  {
    id: "calendar-example",
    name: "calendar-example",
    section: "components",
    title: "Calendar",
    type: "form",
  },
  {
    id: "card-example",
    name: "card-example",
    section: "components",
    title: "Card",
    type: "data",
  },
  {
    id: "carousel-example",
    name: "carousel-example",
    section: "components",
    title: "Carousel",
    type: "data",
  },
  {
    id: "chart-example",
    name: "chart-example",
    section: "components",
    title: "Chart",
    type: "data",
  },
  {
    id: "checkbox-example",
    name: "checkbox-example",
    section: "components",
    title: "Checkbox",
    type: "form",
  },
  {
    id: "collapsible-example",
    name: "collapsible-example",
    section: "components",
    title: "Collapsible",
    type: "layout",
  },
  {
    id: "combobox-example",
    name: "combobox-example",
    section: "components",
    title: "Combobox",
    type: "form",
  },
  {
    id: "command-example",
    name: "command-example",
    section: "components",
    title: "Command",
    type: "navigation",
  },
  {
    id: "context-menu-example",
    name: "context-menu-example",
    section: "components",
    title: "Context Menu",
    type: "navigation",
  },
  {
    id: "dialog-example",
    name: "dialog-example",
    section: "components",
    title: "Dialog",
    type: "overlay",
  },
  {
    id: "drawer-example",
    name: "drawer-example",
    section: "components",
    title: "Drawer",
    type: "overlay",
  },
  {
    id: "dropdown-menu-example",
    name: "dropdown-menu-example",
    section: "components",
    title: "Dropdown Menu",
    type: "navigation",
  },
  {
    id: "empty-example",
    name: "empty-example",
    section: "components",
    title: "Empty",
    type: "data",
  },
  {
    id: "field-example",
    name: "field-example",
    section: "components",
    title: "Field",
    type: "form",
  },
  {
    id: "hover-card-example",
    name: "hover-card-example",
    section: "components",
    title: "Hover Card",
    type: "overlay",
  },
  {
    id: "input-example",
    name: "input-example",
    section: "components",
    title: "Input",
    type: "form",
  },
  {
    id: "input-group-example",
    name: "input-group-example",
    section: "components",
    title: "Input Group",
    type: "form",
  },
  {
    id: "input-otp-example",
    name: "input-otp-example",
    section: "components",
    title: "Input OTP",
    type: "form",
  },
  {
    id: "item-example",
    name: "item-example",
    section: "components",
    title: "Item",
    type: "data",
  },
  {
    id: "kbd-example",
    name: "kbd-example",
    section: "components",
    title: "Kbd",
    type: "data",
  },
  {
    id: "label-example",
    name: "label-example",
    section: "components",
    title: "Label",
    type: "form",
  },
  {
    id: "menubar-example",
    name: "menubar-example",
    section: "components",
    title: "Menubar",
    type: "navigation",
  },
  {
    id: "native-select-example",
    name: "native-select-example",
    section: "components",
    title: "Native Select",
    type: "form",
  },
  {
    id: "navigation-menu-example",
    name: "navigation-menu-example",
    section: "components",
    title: "Navigation Menu",
    type: "navigation",
  },
  {
    id: "pagination-example",
    name: "pagination-example",
    section: "components",
    title: "Pagination",
    type: "navigation",
  },
  {
    id: "popover-example",
    name: "popover-example",
    section: "components",
    title: "Popover",
    type: "overlay",
  },
  {
    id: "progress-example",
    name: "progress-example",
    section: "components",
    title: "Progress",
    type: "feedback",
  },
  {
    id: "radio-group-example",
    name: "radio-group-example",
    section: "components",
    title: "Radio Group",
    type: "form",
  },
  {
    id: "resizable-example",
    name: "resizable-example",
    section: "components",
    title: "Resizable",
    type: "layout",
  },
  {
    id: "scroll-area-example",
    name: "scroll-area-example",
    section: "components",
    title: "Scroll Area",
    type: "layout",
  },
  {
    id: "select-example",
    name: "select-example",
    section: "components",
    title: "Select",
    type: "form",
  },
  {
    id: "separator-example",
    name: "separator-example",
    section: "components",
    title: "Separator",
    type: "layout",
  },
  {
    id: "sheet-example",
    name: "sheet-example",
    section: "components",
    title: "Sheet",
    type: "overlay",
  },
  {
    id: "skeleton-example",
    name: "skeleton-example",
    section: "components",
    title: "Skeleton",
    type: "data",
  },
  {
    id: "slider-example",
    name: "slider-example",
    section: "components",
    title: "Slider",
    type: "form",
  },
  {
    id: "sonner-example",
    name: "sonner-example",
    section: "components",
    title: "Sonner",
    type: "feedback",
  },
  {
    id: "spinner-example",
    name: "spinner-example",
    section: "components",
    title: "Spinner",
    type: "feedback",
  },
  {
    id: "switch-example",
    name: "switch-example",
    section: "components",
    title: "Switch",
    type: "form",
  },
  {
    id: "table-example",
    name: "table-example",
    section: "components",
    title: "Table",
    type: "data",
  },
  {
    id: "tabs-example",
    name: "tabs-example",
    section: "components",
    title: "Tabs",
    type: "navigation",
  },
  {
    id: "textarea-example",
    name: "textarea-example",
    section: "components",
    title: "Textarea",
    type: "form",
  },
  {
    id: "toggle-example",
    name: "toggle-example",
    section: "components",
    title: "Toggle",
    type: "button",
  },
  {
    id: "toggle-group-example",
    name: "toggle-group-example",
    section: "components",
    title: "Toggle Group",
    type: "button",
  },
  {
    id: "tooltip-example",
    name: "tooltip-example",
    section: "components",
    title: "Tooltip",
    type: "overlay",
  },
  {
    id: "component-example",
    name: "component-example",
    section: "components",
    title: "Example",
    type: "overlay",
  },
];

// Sort all items alphabetically by title
const sortByTitle = (a: ComponentItem, b: ComponentItem) =>
  a.title.localeCompare(b.title);

for (const section of Object.values(componentSections)) {
  section.items.sort(sortByTitle);
}
standardComponents.sort(sortByTitle);

// Add a "Components" section that groups all standard components
export const componentsSection = {
  items: standardComponents,
  title: "Components",
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
