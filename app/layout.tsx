import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'

// Configure Inter font with multiple weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gabriel Renostro - Portfolio',
  description: 'Full-Stack Developer & Software Engineer. Passionate about creating exceptional digital experiences with modern technologies.',
  generator: 'v0.app',
  keywords: 'Gabriel Renostro, Full-Stack Developer, Software Engineer, React, Next.js, TypeScript, Web Development',
  authors: [{ name: 'Gabriel Renostro' }],
  creator: 'Gabriel Renostro',
  openGraph: {
    title: 'Gabriel Renostro - Portfolio',
    description: 'Full-Stack Developer & Software Engineer passionate about creating exceptional digital experiences.',
    url: 'https://gabrielrenostro.dev',
    siteName: 'Gabriel Renostro Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabriel Renostro - Full-Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Renostro - Portfolio',
    description: 'Full-Stack Developer & Software Engineer passionate about creating exceptional digital experiences.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#4f9cf9" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="msapplication-TileColor" content="#4f9cf9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/geist-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style>{`
html {
  font-family: ${inter.style.fontFamily}, ${GeistSans.style.fontFamily}, system-ui, sans-serif;
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-inter: ${inter.variable};
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Enhanced scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(79, 156, 249, 0.3);
  border-radius: 4px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(79, 156, 249, 0.5);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(79, 156, 249, 0.3) transparent;
}

/* Improved focus styles */
:focus-visible {
  outline: 2px solid rgb(79, 156, 249);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Smooth transitions for theme switching with performance optimization */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* GPU acceleration for better performance */
.will-change-transform {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

/* Optimized animations */
@media (prefers-reduced-motion: no-preference) {
  .animate-in {
    animation-fill-mode: both;
  }
}

/* Container queries for better responsive design */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
  }
}

/* Optimize font rendering */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'kern' 1;
  font-kerning: normal;
}

/* Optimize image loading */
img {
  content-visibility: auto;
}

/* Critical rendering optimizations */
.critical-render {
  contain: layout style paint;
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <div className="relative min-h-screen">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
