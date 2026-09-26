import type { Metadata } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUI — Tactile 8-Bit & 16-Bit Game UI Primitives for Indie Games & Web RPGs",
  description:
    "Retro arcade and RPG interface components with tactile pixel bevels, controller navigation prompts, and diegetic HUD elements. React 19 & Tailwind v4 native.",
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
    >
      <body className="min-h-full flex flex-col font-pixel select-none">{children}</body>
    </html>
  );
}
