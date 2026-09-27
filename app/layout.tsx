import type { Metadata, Viewport } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jui.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F0" },
    { media: "(prefers-color-scheme: dark)", color: "#140D0B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives for Indie Games & Web RPGs",
    template: "%s | JUI",
  },
  description:
    "Retro arcade and RPG interface components with tactile pixel bevels, controller navigation prompts, and diegetic HUD elements. React 19 & Tailwind v4 native with Jev AI decision layer.",
  applicationName: "JUI",
  authors: [
    {
      name: "Asif Shah",
      url: "https://github.com/notAshif",
    },
  ],
  generator: "Next.js",
  keywords: [
    "pixel ui",
    "retro game ui",
    "8-bit ui components",
    "16-bit ui components",
    "indie game ui",
    "web rpg hud",
    "react 19 pixel components",
    "tailwind css v4",
    "pixel art design system",
    "diegetic game ui",
    "jev ai decision layer",
    "typesafe ai jev",
    "pixel button",
    "health bar component",
    "dialog box component",
    "inventory slot",
    "gamepad navigation",
    "chiptune audio",
    "shadcn pixel",
  ],
  creator: "Asif Shah",
  publisher: "JUI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives",
    description:
      "Retro arcade and RPG interface components with tactile pixel bevels, controller navigation prompts, and diegetic HUD elements. React 19 & Tailwind v4 native.",
    url: siteUrl,
    siteName: "JUI Game UI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives",
    description:
      "Retro arcade and RPG interface components with tactile pixel bevels, controller navigation prompts, and diegetic HUD elements.",
    creator: "@notAshif",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JUI",
  alternateName: "JUI Game UI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  description:
    "Tactile 8-bit & 16-bit retro game UI primitives for React 19 and Tailwind CSS v4, featuring 28+ pixel-beveled components and Jev AI decision engine integration.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Asif Shah",
    url: "https://github.com/notAshif",
  },
  softwareRequirements: "React 19, Tailwind CSS v4, Next.js 15+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistPixelSquare.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-pixel select-none antialiased">
        {children}
      </body>
    </html>
  );
}
