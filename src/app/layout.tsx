import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import "@/styles/tron-style.css"
import { Analytics } from '@vercel/analytics/next';

// Optimize font loading with display: swap to prevent invisible text during load
// This improves Largest Contentful Paint (LCP) and First Contentful Paint (FCP)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Gridcn | Tron-Inspired shadcn/ui Theme",
  description: "A Tron: Ares inspired theme system for shadcn/ui featuring Greek god color schemes",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
}

// Inline script to prevent theme flash - runs before React hydrates
const themeInitScript = `
(function() {
  try {
    var themes = ['ares','tron','clu','athena','aphrodite','poseidon'];
    var intensities = ['none','light','medium','heavy'];

    var theme = localStorage.getItem('project-ares-theme');
    var intensity = localStorage.getItem('project-ares-theme-intensity');

    theme = themes.indexOf(theme) > -1 ? theme : 'ares';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
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
