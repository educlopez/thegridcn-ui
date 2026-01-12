import type { Metadata } from "next"
import Script from "next/script"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider, DynamicFavicon } from "@/components/theme"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <Script
          id="favicon-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('project-ares-theme');
                  const themes = {
                    ares: '#ff3333',
                    tron: '#00d4ff',
                    clu: '#ff6600',
                    athena: '#ffd700',
                    aphrodite: '#ff1493',
                    poseidon: '#0066ff'
                  };
                  const theme = storedTheme && themes[storedTheme] ? storedTheme : 'ares';
                  const color = themes[theme];

                  const svg = '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:' + color + ';stop-opacity:1" /><stop offset="100%" style="stop-color:' + color + ';stop-opacity:0.3" /></linearGradient><filter id="glow-filter"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="32" height="32" fill="#0a0a0f" rx="2"/><g opacity="0.3" stroke="' + color + '" stroke-width="0.5" fill="none"><line x1="0" y1="8" x2="32" y2="8"/><line x1="0" y1="16" x2="32" y2="16"/><line x1="0" y1="24" x2="32" y2="24"/><line x1="8" y1="0" x2="8" y2="32"/><line x1="16" y1="0" x2="16" y2="32"/><line x1="24" y1="0" x2="24" y2="32"/></g><g stroke="' + color + '" stroke-width="1.5" fill="none" filter="url(#glow-filter)"><rect x="8" y="8" width="16" height="16" rx="1"/><line x1="16" y1="10" x2="16" y2="22"/><line x1="10" y1="16" x2="22" y2="16"/><circle cx="8" cy="8" r="1.5" fill="' + color + '"/><circle cx="24" cy="8" r="1.5" fill="' + color + '"/><circle cx="8" cy="24" r="1.5" fill="' + color + '"/><circle cx="24" cy="24" r="1.5" fill="' + color + '"/><circle cx="16" cy="16" r="2" fill="' + color + '" opacity="0.8"/></g><g stroke="' + color + '" stroke-width="1" opacity="0.6"><line x1="2" y1="2" x2="6" y2="2"/><line x1="2" y1="2" x2="2" y2="6"/><line x1="30" y1="2" x2="26" y2="2"/><line x1="30" y1="2" x2="30" y2="6"/><line x1="2" y1="30" x2="6" y2="30"/><line x1="2" y1="30" x2="2" y2="26"/><line x1="30" y1="30" x2="26" y2="30"/><line x1="30" y1="30" x2="30" y2="26"/></g></svg>';
                  const dataUrl = 'data:image/svg+xml,' + encodeURIComponent(svg);

                  const updateLink = function(rel, type) {
                    var link = document.querySelector('link[rel="' + rel + '"]');
                    if (link) {
                      link.href = dataUrl;
                      if (type) link.type = type;
                    } else {
                      link = document.createElement('link');
                      link.rel = rel;
                      link.href = dataUrl;
                      if (type) link.type = type;
                      document.head.appendChild(link);
                    }
                  };

                  var existingLinks = document.querySelectorAll('link[rel*="icon"]');
                  for (var i = 0; i < existingLinks.length; i++) {
                    if (existingLinks[i].getAttribute('rel').indexOf('icon') !== -1) {
                      existingLinks[i].remove();
                    }
                  }

                  updateLink('icon', 'image/svg+xml');
                  updateLink('shortcut icon', 'image/svg+xml');
                  updateLink('apple-touch-icon');
                } catch(e) {}
              })();
            `,
          }}
        />
        <ThemeProvider defaultTheme="ares" storageKey="project-ares-theme">
          <DynamicFavicon />
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
        </ThemeProvider>
      </body>
    </html>
  )
}
