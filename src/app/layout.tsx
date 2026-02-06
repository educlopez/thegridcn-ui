import type { Metadata } from "next"
import { Geist_Mono, Orbitron, Rajdhani } from "next/font/google"
import { ThemeProvider } from "@/components/theme"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import "@/styles/tron-style.css"
import { Analytics } from '@vercel/analytics/next';

// Optimize font loading with next/font — self-hosted, no external requests
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://thegridcn.com"),
  title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
  description:
    "A Tron: Ares inspired theme and component library for shadcn/ui. 55+ components, 6 Greek god color themes, 3D effects, and HUD-style UI elements for futuristic React interfaces.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://thegridcn.com",
    title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
    description:
      "A Tron: Ares inspired theme and component library for shadcn/ui. 55+ components, 6 Greek god color themes, 3D effects, and HUD-style UI elements for futuristic React interfaces.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    siteName: "The Gridcn",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
    description:
      "A Tron: Ares inspired theme and component library for shadcn/ui. 55+ components, 6 Greek god color themes, 3D effects, and HUD-style UI elements.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://thegridcn.com",
  },
  manifest: "/manifest.json",
}

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
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "The Gridcn",
                  "url": "https://thegridcn.com",
                  "description": "A Tron-inspired theme and component library for shadcn/ui with Greek god color schemes, 3D effects, and HUD-style UI elements.",
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is The Gridcn?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Gridcn is a Tron-inspired theme and component library built on top of shadcn/ui. It provides 50+ pre-styled components, 6 Greek god color themes, 3D effects powered by Three.js, and HUD-style UI elements — all designed to create immersive, futuristic interfaces with minimal setup."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I install The Gridcn components?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can install components using the shadcn CLI. Run 'pnpm dlx shadcn@latest add @thegridcn/[component]' to add individual components, or use 'pnpm dlx shadcn@latest list @thegridcn' to browse all available components. Works with npm, yarn, and bun too."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do I need shadcn/ui already set up?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The Gridcn extends shadcn/ui, so you need a project with shadcn/ui initialized. Run 'pnpm dlx shadcn@latest init' first if you don't have it. The Gridcn components integrate seamlessly with your existing shadcn/ui setup and Tailwind CSS configuration."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What themes are available?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Six Greek god-inspired themes: Ares (red), Tron (cyan), Clu (orange), Athena (gold), Aphrodite (pink), and Poseidon (blue). Each theme uses oklch() color space for precise color control and includes matching glow effects, borders, and background tones."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I customize the themes or create my own?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. Themes are defined as CSS variables using the oklch() color space, applied via a data-theme attribute. You can override any variable in your own CSS or create entirely new themes by defining a new set of color tokens following the same pattern."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do the 3D components affect performance?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The 3D components (Grid3D, Tunnel, GodAvatar) use Three.js and are dynamically imported with ssr: false so they don't impact server-side rendering or initial bundle size. They only load on the client when needed. You can also use the intensity system to control the level of visual effects."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does it work with frameworks other than Next.js?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Gridcn components work with any React framework that supports shadcn/ui — including Next.js, Vite, Remix, and Astro. Since they're installed directly into your project as source code (not a dependency), you have full control and can adapt them to your stack."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is The Gridcn free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, The Gridcn is completely free and open source. You can use it in personal and commercial projects. Components are added to your codebase as source files, giving you full ownership and the freedom to modify anything."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
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
  )
}
