"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/github-icon";
import { Star, Sun, Moon } from "lucide-react";

export interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const MENU_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "DOCS", href: "/docs/component" },
  { label: "COMPONENTS", href: "/docs/component" },
];

export function Header({
  darkMode,
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
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-(--surface-card) border-b-4 border-(--espresso) font-pixel select-none shadow-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:outline-none p-1"
          >
            <Logo
              size={36}
              className="active:translate-x-0.5 active:translate-y-0.5"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl tracking-wider text-(--espresso)">
                JUI
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-(--espresso) text-(--cream) pixel-border-bevel">
                GAME UI
              </span>
            </div>
          </Link>
        </div>

        <nav
          className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          aria-label="Main Navigation"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-2.5 py-1 text-xs tracking-wider text-(--foreground) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none uppercase"
            >
              [{item.label}]
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex items-center text-[10px] px-2 py-1 bg-(--surface-muted) text-(--espresso) pixel-border-bevel uppercase">
            1P READY
          </span>

          <Link
            href="https://github.com/notAshif/jui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
            className="p-2 text-(--espresso) pixel-btn-bevel hover:text-(--caramel)"
          >
            <GithubIcon className="w-4 h-4" />
          </Link>

          <Link
            href="https://github.com/notAshif/jui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star this repository on GitHub"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-(--surface-card) text-(--espresso) pixel-btn-bevel"
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
            className="p-2 text-(--espresso) pixel-btn-bevel cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#D9965B]" />
            ) : (
              <Moon className="w-4 h-4 text-(--cinnamon)" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
