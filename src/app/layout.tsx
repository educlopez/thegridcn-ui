import type { Metadata } from "next";
import { Geist_Mono, Orbitron, Rajdhani } from "next/font/google";
import { WebMcpProvider } from "@/components/agent/webmcp-provider";
import { ActivityBeacon } from "@/components/analytics/activity-beacon";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "@/styles/tron-style.css";
import { Analytics } from "@vercel/analytics/next";

// Optimize font loading with next/font — self-hosted, no external requests
const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const orbitron = Orbitron({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com",
  },
  description:
    "Tron-inspired shadcn/ui theme with 55+ components, 6 Greek god color schemes, 3D effects, and HUD-style elements.",
  icons: {
    apple: "/favicon.svg",
    icon: [{ type: "image/svg+xml", url: "/favicon.svg" }],
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://thegridcn.com"),
  openGraph: {
    description:
      "Tron-inspired shadcn/ui theme with 55+ components, 6 Greek god color schemes, 3D effects, and HUD-style elements.",
    images: [{ height: 630, url: "/og-image.png", width: 1200 }],
    siteName: "The Gridcn",
    title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
    type: "website",
    url: "https://thegridcn.com",
  },
  title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
  twitter: {
    card: "summary_large_image",
    description:
      "Tron-inspired shadcn/ui theme with 55+ components, 6 Greek god color schemes, 3D effects, and HUD-style elements.",
    images: ["/og-image.png"],
    title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
  },
};

// Inline script to prevent theme flash - runs before React hydrates
const themeInitScript = `
(function() {
  try {
    var themes = ['tron','ares','clu','athena','aphrodite','poseidon'];
    var intensities = ['none','light','medium','heavy'];

    var theme = localStorage.getItem('project-ares-theme');
    var intensity = localStorage.getItem('project-ares-theme-intensity');

    theme = themes.indexOf(theme) > -1 ? theme : 'tron';
    intensity = intensities.indexOf(intensity) > -1 ? intensity : 'medium';

    document.documentElement.setAttribute('data-theme', theme);
    if (intensity !== 'none') {
      document.documentElement.setAttribute('data-tron-intensity', intensity);
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="/.well-known/api-catalog"
          rel="api-catalog"
          type="application/linkset+json"
        />
        <link
          href="/openapi.json"
          rel="service-desc"
          type="application/openapi+json"
        />
        <link href="/docs/api" rel="service-doc" type="text/html" />
        <link
          href="/.well-known/ai-catalog.json"
          rel="describedby"
          type="application/json"
        />
        <link
          href="/.well-known/agent-skills/index.json"
          rel="describedby"
          type="application/json"
        />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  description:
                    "A Tron-inspired theme and component library for shadcn/ui with Greek god color schemes, 3D effects, and HUD-style UI elements.",
                  name: "The Gridcn",
                  potentialAction: {
                    "@type": "SearchAction",
                    "query-input": "required name=search_term_string",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://thegridcn.com/components#{search_term_string}",
                    },
                  },
                  url: "https://thegridcn.com",
                },
                {
                  "@type": "SoftwareApplication",
                  applicationCategory: "DeveloperApplication",
                  description:
                    "A Tron-inspired theme and component library for shadcn/ui with 100+ components, 6 Greek god color themes, Three.js 3D effects, and HUD-style UI elements.",
                  name: "thegridcn",
                  offers: {
                    "@type": "Offer",
                    price: 0,
                    priceCurrency: "USD",
                  },
                  operatingSystem: "Web",
                  url: "https://thegridcn.com",
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The Gridcn is a Tron-inspired theme and component library built on top of shadcn/ui. It provides 50+ pre-styled components, 6 Greek god color themes, 3D effects powered by Three.js, and HUD-style UI elements — all designed to create immersive, futuristic interfaces with minimal setup.",
                      },
                      name: "What is The Gridcn?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can install components using the shadcn CLI. Run 'pnpm dlx shadcn@latest add @thegridcn/[component]' to add individual components, or use 'pnpm dlx shadcn@latest list @thegridcn' to browse all available components. Works with npm, yarn, and bun too.",
                      },
                      name: "How do I install The Gridcn components?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. The Gridcn extends shadcn/ui, so you need a project with shadcn/ui initialized. Run 'pnpm dlx shadcn@latest init' first if you don't have it. The Gridcn components integrate seamlessly with your existing shadcn/ui setup and Tailwind CSS configuration.",
                      },
                      name: "Do I need shadcn/ui already set up?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Six Greek god-inspired themes: Ares (red), Tron (cyan), Clu (orange), Athena (gold), Aphrodite (pink), and Poseidon (blue). Each theme uses oklch() color space for precise color control and includes matching glow effects, borders, and background tones.",
                      },
                      name: "What themes are available?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely. Themes are defined as CSS variables using the oklch() color space, applied via a data-theme attribute. You can override any variable in your own CSS or create entirely new themes by defining a new set of color tokens following the same pattern.",
                      },
                      name: "Can I customize the themes or create my own?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The 3D components (Grid3D, Tunnel, GodAvatar) use Three.js and are dynamically imported with ssr: false so they don't impact server-side rendering or initial bundle size. They only load on the client when needed. You can also use the intensity system to control the level of visual effects.",
                      },
                      name: "Do the 3D components affect performance?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The Gridcn components work with any React framework that supports shadcn/ui — including Next.js, Vite, Remix, and Astro. Since they're installed directly into your project as source code (not a dependency), you have full control and can adapt them to your stack.",
                      },
                      name: "Does it work with frameworks other than Next.js?",
                    },
                    {
                      "@type": "Question",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, The Gridcn is completely free and open source. You can use it in personal and commercial projects. Components are added to your codebase as source files, giving you full ownership and the freedom to modify anything.",
                      },
                      name: "Is The Gridcn free to use?",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <ActivityBeacon />
          <WebMcpProvider />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
