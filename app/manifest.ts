import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JUI — Tactile Pixel Game UI Primitives",
    short_name: "JUI",
    description:
      "Retro 8-bit & 16-bit UI components and Jev AI decision layer for indie games and web RPGs.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#4B2E2B",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
