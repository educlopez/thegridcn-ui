import type { ThemeRegistration } from "shiki";

// Tron-inspired theme for Shiki syntax highlighting
export const tronTheme: ThemeRegistration = {
  name: "tron",
  type: "dark",
  colors: {
    "editor.background": "#0C1421",
    "editor.foreground": "#E0E6ED",
    "editor.lineHighlightBackground": "#1A2535",
    "editor.selectionBackground": "#2D4A6A",
    "editorCursor.foreground": "#FF6B6B",
    "editorLineNumber.foreground": "#4A5568",
    "editorLineNumber.activeForeground": "#FF6B6B",
  },
  tokenColors: [
    // Comments - muted
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#4A5568",
        fontStyle: "italic",
      },
    },
    // Strings - cyan/teal
    {
      scope: ["string", "string.quoted"],
      settings: {
        foreground: "#6EE7B7",
      },
    },
    // Numbers - orange
    {
      scope: ["constant.numeric"],
      settings: {
        foreground: "#F59E0B",
      },
    },
    // Keywords - primary (will be themed)
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#FF6B6B",
      },
    },
    // Functions - cyan
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
      ],
      settings: {
        foreground: "#22D3EE",
      },
    },
    // Classes/Types - gold
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: "#FBBF24",
      },
    },
    // Variables - foreground
    {
      scope: ["variable", "variable.other"],
      settings: {
        foreground: "#E0E6ED",
      },
    },
    // Properties - light blue
    {
      scope: ["variable.other.property", "support.type.property-name"],
      settings: {
        foreground: "#93C5FD",
      },
    },
    // Constants - pink
    {
      scope: ["constant", "constant.language", "variable.other.constant"],
      settings: {
        foreground: "#F472B6",
      },
    },
    // Punctuation - muted
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#6B7280",
      },
    },
    // Tags (JSX/HTML) - primary
    {
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: {
        foreground: "#FF6B6B",
      },
    },
    // Attributes - cyan
    {
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#22D3EE",
      },
    },
    // Imports/Exports - purple
    {
      scope: [
        "keyword.control.import",
        "keyword.control.export",
        "keyword.control.from",
      ],
      settings: {
        foreground: "#A78BFA",
      },
    },
    // Operators - orange
    {
      scope: ["keyword.operator.assignment", "keyword.operator.comparison"],
      settings: {
        foreground: "#F59E0B",
      },
    },
    // Template literals
    {
      scope: ["string.template", "punctuation.definition.template-expression"],
      settings: {
        foreground: "#6EE7B7",
      },
    },
    // Regex
    {
      scope: ["string.regexp"],
      settings: {
        foreground: "#F472B6",
      },
    },
  ],
};
