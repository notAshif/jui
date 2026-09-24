import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

const googleSansFlex = localFont({
  src: [
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-100.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-200.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-800.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Google-Sans-Flex/Google-Sans-Flex-900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-flex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JUI — Dual-Aesthetic UI Primitives for Modern SaaS & 2D Game Dev",
  description:
    "Sleek modern product components and tactile 8-bit pixel game UI from one unified, accessible codebase. React 19 & Tailwind v4 native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${GeistPixelSquare.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
