"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/github-icon";
import {
  Star,
  Menu,
  X,
  BookOpen,
  Layers,
  Home,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import { PixelSunIcon, PixelMoonIcon } from "@/components/theme-toggle-icon";
import { PixelButton } from "@/components/pixel/button";

export interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const MENU_ITEMS = [
  { label: "HOME", href: "/", icon: Home },
  { label: "DOCS", href: "/docs", icon: BookOpen },
  { label: "COMPONENTS", href: "/docs/component", icon: Layers },
];

const COMPONENT_CATEGORIES = [
  { name: "Vitality & HUD", href: "/docs/component#component-button", count: "6" },
  { name: "Actions & Inputs", href: "/docs/component#component-input", count: "4" },
  { name: "Inventory & Modals", href: "/docs/component#component-dialog", count: "4" },
  { name: "Codex & Layout", href: "/docs/component#component-card", count: "4" },
  { name: "Alerts & Feedback", href: "/docs/component#component-alert", count: "3" },
  { name: "Navigation & Systems", href: "/docs/component#component-navbar", count: "7" },
];

export function Header({
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const pathname = usePathname();
  const [stars, setStars] = useState<number | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

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

  // Close drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const copyInitCommand = () => {
    navigator.clipboard.writeText("npx @1zuku/jui init");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-(--surface-card) border-b-4 border-(--espresso) font-pixel select-none shadow-none">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 relative flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none p-1"
            >
              <Logo
                size={34}
                className="active:translate-x-0.5 active:translate-y-0.5 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wider text-(--espresso) leading-none">
                  JUI
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation without active state */}
          <nav
            className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
            aria-label="Main Navigation"
          >
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-2.5 py-1 text-xs tracking-wider text-(--foreground) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none uppercase transition-colors"
              >
                [{item.label}]
              </Link>
            ))}
          </nav>

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* GitHub Source Link */}
            <Link
              href="https://github.com/notAshif/jui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </Link>

            {/* Separator between GitHub and Star */}
            <div className="h-4 w-[2px] bg-(--border-strong) opacity-60 shrink-0" aria-hidden="true" />

            {/* GitHub Stars */}
            <Link
              href="https://github.com/notAshif/jui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star this repository on GitHub"
              className="h-8 shrink-0 inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 text-xs font-bold text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#D48B38] fill-[#D48B38] shrink-0" />
              <span className="tabular-nums text-[11px] sm:text-xs">
                {stars !== null ? stars.toLocaleString() : "0"}
              </span>
            </Link>

            {/* Separator between Star and Theme Toggler */}
            <div className="h-4 w-[2px] bg-(--border-strong) opacity-60 shrink-0" aria-hidden="true" />

            {/* Dark Mode Toggle (same h-8 w-8 as GitHub) */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={
                darkMode
                  ? "Switch to Parchment Light Mode"
                  : "Switch to Campfire Dark Mode"
              }
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <PixelSunIcon size={18} className="text-[#D9965B]" />
              ) : (
                <PixelMoonIcon size={18} className="text-(--cinnamon)" />
              )}
            </button>

            {/* Mobile / Tablet Menu Button (matching h-8 w-8) */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open navigation menu drawer"
              className="h-8 w-8 shrink-0 md:hidden inline-flex items-center justify-center text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ml-0.5"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile / Mid-range Menu Drawer Sidebar */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-(--surface-card) border-l-4 border-(--espresso) flex flex-col shadow-2xl font-pixel select-none animate-in slide-in-from-right duration-200 z-50">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-(--border-strong) bg-(--surface-card)">
              <div className="flex items-center gap-2.5">
                <Logo size={28} />
                <div>
                  <span className="font-bold text-base text-(--espresso) tracking-wider block leading-tight">
                    JUI GAME UI
                  </span>
                  <span className="text-[10px] text-(--caramel) font-bold uppercase tracking-widest block">
                    CODEX &amp; MENU
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center p-1 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Quick CLI Installation Banner */}
              <div className="p-3 bg-(--surface-muted) pixel-border-bevel space-y-2">
                <span className="text-[10px] font-bold text-(--caramel) uppercase tracking-wider block">
                  QUICK CLI INIT
                </span>
                <button
                  type="button"
                  onClick={copyInitCommand}
                  className="w-full flex items-center justify-between p-2 bg-(--surface-card) pixel-btn-bevel text-xs text-(--espresso) text-left group cursor-pointer"
                >
                  <span className="font-mono text-[11px] truncate flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-(--caramel) shrink-0" />
                    npx @1zuku/jui init
                  </span>
                  {copiedCli ? (
                    <Check className="w-3.5 h-3.5 text-(--success) shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-(--espresso) opacity-60 group-hover:opacity-100 shrink-0" />
                  )}
                </button>
              </div>

              {/* Main Navigation Links */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-(--caramel) block border-b border-dashed border-(--border-strong) pb-1">
                  MAIN NAVIGATION
                </span>
                <div className="space-y-1 pt-1">
                  {MENU_ITEMS.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 text-xs tracking-wider pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors uppercase text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel)"
                      >
                        <span className="flex items-center gap-2">
                          <ItemIcon className="w-3.5 h-3.5" />
                          <span>[{item.label}]</span>
                        </span>
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Component Categories Directory */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-(--caramel) block border-b border-dashed border-(--border-strong) pb-1">
                  PRIMITIVES CODEX (28)
                </span>
                <div className="space-y-1 pt-1">
                  {COMPONENT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-(--surface-muted) text-(--caramel) font-bold">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-2 pt-2 border-t-2 border-(--border-strong)">
                <Link
                  href="https://github.com/notAshif/jui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GITHUB REPOSITORY</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#D48B38] flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#D48B38] fill-[#D48B38]" />
                    <span>{stars !== null ? stars.toLocaleString() : "0"}</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t-2 border-(--border-strong) bg-(--surface-card) space-y-2">
              <button
                type="button"
                onClick={() => {
                  onToggleDarkMode();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 text-xs text-(--espresso) bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 cursor-pointer uppercase"
              >
                {darkMode ? (
                  <>
                    <PixelSunIcon size={16} className="text-[#D9965B]" />
                    <span>PARCHMENT LIGHT</span>
                  </>
                ) : (
                  <>
                    <PixelMoonIcon size={16} className="text-(--cinnamon)" />
                    <span>CAMPFIRE DARK</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
