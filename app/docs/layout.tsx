import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Codex & API Reference",
  description:
    "Explore all 28 retro game UI components for React 19: PixelButton, PixelCard, HealthBar, DialogBox, InventorySlot, PixelToast, and Jev AI feedback primitives. Complete with interactive props and CLI commands.",
  openGraph: {
    title: "Component Codex & API Reference | JUI",
    description:
      "Explore all 28 retro game UI components for React 19: PixelButton, PixelCard, HealthBar, DialogBox, InventorySlot, PixelToast, and Jev AI feedback primitives.",
  },
  twitter: {
    title: "Component Codex & API Reference | JUI",
    description:
      "Explore all 28 retro game UI components for React 19: PixelButton, PixelCard, HealthBar, DialogBox, InventorySlot, PixelToast, and Jev AI feedback primitives.",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
