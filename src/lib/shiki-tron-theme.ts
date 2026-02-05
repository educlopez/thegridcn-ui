import type { ThemeRegistration } from "shiki";

// Tron: Ares terminal-inspired theme for Shiki syntax highlighting
// Based on the movie's red, orange, and white terminal aesthetic
export const tronTheme: ThemeRegistration = {
  name: "tron-ares",
  type: "dark",
  colors: {
    // Pure black background like the preview area
    "editor.background": "#000000",
    "editor.foreground": "#F0F0F0",
    "editor.lineHighlightBackground": "#1A0A0A",
    "editor.selectionBackground": "#4A1515",
    "editorCursor.foreground": "#FF5544",
    "editorLineNumber.foreground": "#4A2020",
    "editorLineNumber.activeForeground": "#FF5544",
  },
  tokenColors: [
    // Comments - muted gray
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#666666",
        fontStyle: "italic",
      },
    },
    // Strings - white (like data values in terminal)
    {
      scope: ["string", "string.quoted"],
      settings: {
        foreground: "#FFFFFF",
      },
    },
    // Numbers - bright orange (like percentage displays)
    {
      scope: ["constant.numeric"],
      settings: {
        foreground: "#FF8C00",
      },
    },
    // Keywords - bright red (primary terminal color)
    {
      scope: [
        "keyword",
        "keyword.control",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#FF4136",
        fontStyle: "bold",
      },
    },
    // Functions - orange (like function calls in terminal)
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
      ],
      settings: {
        foreground: "#FFA500",
      },
    },
    // Classes/Types - white bold (like important labels)
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: "#FFFFFF",
        fontStyle: "bold",
      },
    },
    // Variables - light gray/white
    {
      scope: ["variable", "variable.other"],
      settings: {
        foreground: "#E8E8E8",
      },
    },
    // Properties - orange
    {
      scope: ["variable.other.property", "support.type.property-name"],
      settings: {
        foreground: "#FF7744",
      },
    },
    // Constants - bright orange (like "ready" status)
    {
      scope: ["constant", "constant.language", "variable.other.constant"],
      settings: {
        foreground: "#FF8C00",
      },
    },
    // Punctuation - dim red/gray
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#AA4444",
      },
    },
    // Tags (JSX/HTML) - bright red
    {
      scope: ["entity.name.tag"],
      settings: {
        foreground: "#FF4136",
      },
    },
    // Tag brackets - red
    {
      scope: ["punctuation.definition.tag"],
      settings: {
        foreground: "#CC3333",
      },
    },
    // Attributes - orange
    {
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#FFA500",
      },
    },
    // Imports/Exports - red
    {
      scope: [
        "keyword.control.import",
        "keyword.control.export",
        "keyword.control.from",
      ],
      settings: {
        foreground: "#FF4136",
      },
    },
    // Operators - orange
    {
      scope: [
        "keyword.operator",
        "keyword.operator.assignment",
        "keyword.operator.comparison",
        "keyword.operator.arithmetic",
        "keyword.operator.logical",
      ],
      settings: {
        foreground: "#FF7744",
      },
    },
    // Template literals - white
    {
      scope: ["string.template"],
      settings: {
        foreground: "#FFFFFF",
      },
    },
    // Template expression punctuation - orange
    {
      scope: ["punctuation.definition.template-expression"],
      settings: {
        foreground: "#FF8C00",
      },
    },
    // Regex - orange
    {
      scope: ["string.regexp"],
      settings: {
        foreground: "#FF7744",
      },
    },
    // Boolean/null - bright orange
    {
      scope: ["constant.language.boolean", "constant.language.null", "constant.language.undefined"],
      settings: {
        foreground: "#FF8C00",
        fontStyle: "bold",
      },
    },
    // Type annotations - orange
    {
      scope: ["entity.name.type.alias", "entity.name.type.interface", "entity.name.type.enum"],
      settings: {
        foreground: "#FFA500",
      },
    },
    // Object keys - white
    {
      scope: ["meta.object-literal.key"],
      settings: {
        foreground: "#FFFFFF",
      },
    },
    // Parameters - light gray
    {
      scope: ["variable.parameter"],
      settings: {
        foreground: "#E0E0E0",
      },
    },
    // Decorators - orange
    {
      scope: ["meta.decorator", "punctuation.decorator"],
      settings: {
        foreground: "#FFA500",
      },
    },
    // this/self keyword - red
    {
      scope: ["variable.language.this", "variable.language.self"],
      settings: {
        foreground: "#FF4136",
        fontStyle: "italic",
      },
    },
    // Spread operator - orange
    {
      scope: ["keyword.operator.spread", "keyword.operator.rest"],
      settings: {
        foreground: "#FF7744",
      },
    },
    // Arrow function - orange
    {
      scope: ["storage.type.function.arrow"],
      settings: {
        foreground: "#FF7744",
      },
    },
    // Markdown headings - red bold
    {
      scope: ["markup.heading", "entity.name.section"],
      settings: {
        foreground: "#FF4136",
        fontStyle: "bold",
      },
    },
    // Markdown bold - white bold
    {
      scope: ["markup.bold"],
      settings: {
        foreground: "#FFFFFF",
        fontStyle: "bold",
      },
    },
    // Markdown italic - light gray italic
    {
      scope: ["markup.italic"],
      settings: {
        foreground: "#E0E0E0",
        fontStyle: "italic",
      },
    },
    // Markdown code - orange
    {
      scope: ["markup.inline.raw", "markup.fenced_code"],
      settings: {
        foreground: "#FFA500",
      },
    },
    // Markdown links - red
    {
      scope: ["markup.underline.link"],
      settings: {
        foreground: "#FF4136",
      },
    },
  ],
};
