export const SITE_HOST = "thegridcn.com";
export const SITE_NAME = "The Gridcn";
export const SITE_ORIGIN = "https://thegridcn.com";

export const PUBLIC_THEMES = [
  { color: "cyan", id: "tron", name: "Tron" },
  { color: "red", id: "ares", name: "Ares" },
  { color: "orange", id: "clu", name: "Clu" },
  { color: "gold", id: "athena", name: "Athena" },
  { color: "pink", id: "aphrodite", name: "Aphrodite" },
  { color: "blue", id: "poseidon", name: "Poseidon" },
] as const;

export const PUBLIC_THEME_IDS = PUBLIC_THEMES.map((theme) => theme.id);

export const TEMPLATE_SLUGS = [
  "dashboard",
  "landing",
  "blog",
  "login",
  "analytics",
] as const;
