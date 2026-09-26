"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggleIcon } from "@/components/theme-toggle-icon";
import { GithubIcon } from "@/components/github-icon";
import { Star, Sun, Moon } from "lucide-react";

export interface HeaderProps {
  flavor: "modern" | "pixel";
  darkMode: boolean;
  onToggleFlavor: () => void;
  onToggleDarkMode: () => void;
}

const MENU_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Docs", href: "#docs" },
  { label: "Components", href: "#components" },
];

export function Header({
  flavor,
  darkMode,
  onToggleFlavor,
  onToggleDarkMode,
}: HeaderProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/notAshif/jui")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fallback gracefully if rate-limited or offline
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-(--background)/90 border-b border-dashed border-(--border-strong) transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 relative flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded-lg p-1"
          >
            <Logo
              size={36}
              className="transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-xl tracking-tight text-(--espresso)">
                JUI
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Main Navigation Menu (Precisely centered) */}
        <nav
          className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          aria-label="Main Navigation"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-2 py-1 text-sm font-medium text-(--foreground) hover:text-(--caramel) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (GitHub, Star count, Theme & Dark Mode toggles) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            href="https://github.com/notAshif/jui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
            className="p-2 text-(--espresso)"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>

          <Link
            href="https://github.com/notAshif/jui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star this repository on GitHub"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold"
          >
            <Star className="w-3.5 h-3.5 text-[#D48B38] fill-[#D48B38]" />
            <span>{stars !== null ? stars.toLocaleString() : "0"}</span>
          </Link>

          <button
            onClick={onToggleDarkMode}
            aria-label={
              darkMode
                ? "Switch to Parchment Light Mode"
                : "Switch to Campfire Dark Mode"
            }
            className="p-2 text-(--espresso) cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#D9965B]" />
            ) : (
              <Moon className="w-4 h-4 text-(--cinnamon)" />
            )}
          </button>

          <button
            onClick={onToggleFlavor}
            aria-label={`Current mode: ${flavor}. Click to convert into ${
              flavor === "modern" ? "2D Pixel Game UI" : "Modern Product UI"
            }`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer select-none transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) ${
              flavor === "pixel"
                ? "bg-(--espresso) text-(--cream) pixel-border-bevel uppercase font-pixel tracking-wider"
                : "bg-(--caramel) text-(--cream) rounded-lg shadow-sm hover:bg-(--caramel-hover)"
            }`}
          >
            <ThemeToggleIcon flavor={flavor} size={16} />
            <span className="hidden sm:inline">
              {flavor === "modern" ? "Go 2D Pixel" : "Go Modern"}
            </span>
            <span className="sm:hidden">{flavor === "modern" ? "2D" : "UI"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
