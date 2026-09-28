"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { PixelButton } from "@/components/pixel/button";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelInput } from "@/components/pixel/input";
import { PixelAvatar } from "@/components/pixel/avatar";
import { PixelSeparator } from "@/components/pixel/separator";
import {
  Sparkles,
  Zap,
  Package,
  Cpu,
  Terminal,
  Swords,
  Layers,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Heart,
  Flame,
  Volume2,
  Code,
  Palette,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Gamepad2,
  Menu,
  X,
} from "lucide-react";
import { PixelSearchIcon, PixelCloseIcon } from "@/components/pixel/icons";

interface ComponentCardItem {
  id: string;
  name: string;
  category: string;
  cli: string;
  desc: string;
}

const ALL_COMPONENTS: ComponentCardItem[] = [
  // Vitality & HUD
  { id: "component-button", name: "PixelButton", category: "Vitality & HUD", cli: "button", desc: "3D beveled tactile game buttons with physical press feedback and audio synthesis." },
  { id: "component-badge", name: "PixelBadge", category: "Vitality & HUD", cli: "badge", desc: "Status pills for HP, MP, rarity tiers, and guild rankings." },
  { id: "component-progressbar", name: "PixelProgressBar", category: "Vitality & HUD", cli: "progress-bar", desc: "Stepped retro health, mana, and experience vitality meters." },
  { id: "component-avatar", name: "PixelAvatar", category: "Vitality & HUD", cli: "avatar", desc: "Instant AvatarsInPixels chibi portraits rendered synchronously via vector SVG." },
  { id: "component-separator", name: "PixelSeparator", category: "Vitality & HUD", cli: "separator", desc: "Pixelated horizontal and vertical layout dividing rules." },
  { id: "component-skeleton", name: "PixelSkeleton", category: "Vitality & HUD", cli: "skeleton", desc: "Chunky 8-bit placeholder shimmer for async inventory fetching." },

  // Actions & Inputs
  { id: "component-input", name: "PixelInput", category: "Actions & Inputs", cli: "input", desc: "Retro inset monospace inputs for character naming and cheat codes." },
  { id: "component-dropdown", name: "PixelDropdownMenu", category: "Actions & Inputs", cli: "dropdown-menu", desc: "Stepped action menus for character actions and inventory filtering." },
  { id: "component-tooltip", name: "PixelTooltip", category: "Actions & Inputs", cli: "tooltip", desc: "Equipment stat inspector popup for weapon and armor tooltips." },
  { id: "component-popover", name: "PixelPopover", category: "Actions & Inputs", cli: "popover", desc: "Interactive game overlays for dice rollers and mini stat inspectors." },

  // Inventory & Modals
  { id: "component-dialog", name: "PixelDialog", category: "Inventory & Modals", cli: "dialog", desc: "Modal window with stepped border framing for loot chests and NPC dialogues." },
  { id: "component-drawer", name: "PixelDrawer", category: "Inventory & Modals", cli: "drawer", desc: "Slide-over vault panel for character backpacks and quest logs." },
  { id: "component-alert-dialog", name: "PixelAlertDialog", category: "Inventory & Modals", cli: "alert-dialog", desc: "High-impact confirmation modal for permanent death or item dismantling." },
  { id: "component-empty-state", name: "PixelEmptyState", category: "Inventory & Modals", cli: "empty-state", desc: "Illustrative empty vault and backpack indicators." },

  // Codex & Layout
  { id: "component-card", name: "PixelCard", category: "Codex & Layout", cli: "card", desc: "Structured retro parchment panels with bevel headers and footers." },
  { id: "component-tabs", name: "PixelTabs", category: "Codex & Layout", cli: "tabs", desc: "Inventory category tab strip: Weapons, Armor, Consumables, and Spells." },
  { id: "component-accordion", name: "PixelAccordion", category: "Codex & Layout", cli: "accordion", desc: "Collapsible quest logs and monster bestiary codex." },
  { id: "component-collapsible", name: "PixelCollapsible", category: "Codex & Layout", cli: "collapsible", desc: "Lightweight disclosure widgets for skill trees and lore notes." },

  // Alerts & Feedback
  { id: "component-alert", name: "PixelAlert", category: "Alerts & Feedback", cli: "alert", desc: "Persistent combat hazard and debuff status banners." },
  { id: "component-toast", name: "PixelToast", category: "Alerts & Feedback", cli: "toast", desc: "Stacking loot notification popups with audio fanfare." },
  { id: "component-spinner", name: "PixelSpinner", category: "Alerts & Feedback", cli: "spinner", desc: "Pixelated rotating hourglass loader for matchmaking and saving." },

  // Navigation & Systems
  { id: "component-breadcrumb", name: "PixelBreadcrumb", category: "Navigation & Systems", cli: "breadcrumb", desc: "Dungeon floor and world travel breadcrumb trail." },
  { id: "component-pagination", name: "PixelPagination", category: "Navigation & Systems", cli: "pagination", desc: "Multi-page inventory and leaderboard navigation." },
  { id: "component-navbar", name: "PixelNavbar", category: "Navigation & Systems", cli: "navbar", desc: "Game navigation bar with responsive mobile menu drawer." },
  { id: "component-sidebar", name: "PixelSidebar", category: "Navigation & Systems", cli: "sidebar", desc: "Collapsible dungeon menu navigation sidebar." },
  { id: "component-command-palette", name: "PixelCommandPalette", category: "Navigation & Systems", cli: "command-palette", desc: "Fast-travel keyboard search palette (Cmd+K)." },
  { id: "component-table", name: "PixelTable", category: "Navigation & Systems", cli: "table", desc: "Sortable high-score leaderboard with responsive scroll wrapper." },
  { id: "component-calendar", name: "PixelCalendar", category: "Navigation & Systems", cli: "calendar", desc: "Daily quest tracker and server event calendar." },
];

const DOCS_SECTIONS = [
  { id: "why-jui", title: "Overview & Philosophy" },
  { id: "ai-decision-layer", title: "Jev AI Decision Layer", isNew: true },
  { id: "get-started", title: "Getting Started" },
  { id: "installation", title: "CLI Installation" },
  { id: "how-it-works", title: "How It Works" },
  { id: "registry", title: "Registry System" },
  { id: "use-cases", title: "Real-World Use Cases" },
  { id: "primitives-codex", title: "Primitives Codex (28)" },
  { id: "faq", title: "Frequently Asked Questions" },
];

export default function DocsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<"bun" | "pnpm" | "npm" | "yarn">("bun");

  useEffect(() => {
    setDarkMode(document.documentElement.getAttribute("data-mode") === "dark");
  }, []);

  const toggleDarkMode = useCallback(() => {
    const nextDark = !darkMode;
    document.documentElement.classList.add("theme-transitioning");
    if (nextDark) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
    setDarkMode(nextDark);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    });
  }, [darkMode]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const pkgCommands = {
    bun: "bunx @1zuku/jui init",
    pnpm: "pnpm dlx @1zuku/jui init",
    npm: "npx @1zuku/jui init",
    yarn: "yarn dlx @1zuku/jui init",
  };

  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COMPONENTS;
    return ALL_COMPONENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cli.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const map = new Map<string, ComponentCardItem[]>();
    filteredComponents.forEach((c) => {
      const list = map.get(c.category) || [];
      list.push(c);
      map.set(c.category, list);
    });
    return Array.from(map.entries());
  }, [filteredComponents]);

  // Sidebar content (rendered in desktop aside and mobile drawer)
  const renderSidebarContent = () => (
    <>
      {/* Quick Filter Search */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-(--espresso) uppercase tracking-wider block">
          FILTER CODEX
        </label>
        <div className="relative flex items-center">
          <PixelSearchIcon className="w-3.5 h-3.5 text-(--espresso) opacity-60 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10" />
          <PixelInput
            placeholder="Search docs & primitives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs pl-8 pr-7 py-1.5 h-9"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-(--espresso) opacity-60 hover:opacity-100 p-0.5 cursor-pointer z-10"
              aria-label="Clear filter"
            >
              <PixelCloseIcon className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Section: DOCS (Matching pixel-border-bevel box styling) */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-(--caramel) block border-b border-dashed border-(--border-strong) pb-1">
          DOCS
        </span>
        <ul className="space-y-1 text-xs">
          {DOCS_SECTIONS.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                onClick={() => setSidebarOpen(false)}
                className={`block px-2.5 py-1.5 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel flex items-center justify-between transition-colors ${
                  sec.isNew ? "bg-(--caramel)/10 font-bold" : ""
                }`}
              >
                <span>{sec.title}</span>
                {sec.isNew && (
                  <span className="text-[9px] px-1 bg-(--espresso) text-(--cream)">NEW</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: COMPONENTS (Categorized) */}
      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-(--caramel) block border-b border-dashed border-(--border-strong) pb-1">
          COMPONENTS ({filteredComponents.length})
        </span>

        {categories.map(([catTitle, items]) => (
          <div key={catTitle} className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#7B5B49] block px-1">
              {catTitle} ({items.length})
            </span>
            <ul className="space-y-0.5 text-xs">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/docs/component#${item.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-2 py-1 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Link to Full Interactive Component Codex */}
      <div className="pt-2 border-t border-dashed border-(--border-strong)">
        <Link
          href="/docs/component"
          className="w-full flex items-center justify-between px-3 py-2 bg-(--caramel) text-(--cream) pixel-border-bevel text-xs font-bold hover:bg-(--caramel-hover) transition-colors"
        >
          <span>INTERACTIVE CODEX</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-(--background) text-(--foreground) font-pixel selection:bg-(--caramel) selection:text-(--cream)">
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Main Layout: Sidebar on Left + Content on Right */}
      <div className="w-full flex-1 flex flex-col lg:flex-row">
        {/* Mobile Sidebar Toggle Button */}
        <div className="lg:hidden p-3 bg-(--surface-muted) border-b-2 border-(--espresso) flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PixelButton
              size="sm"
              variant="outline"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-xs"
            >
              {sidebarOpen ? <X className="w-3.5 h-3.5 mr-1" /> : <Menu className="w-3.5 h-3.5 mr-1" />}
              {sidebarOpen ? "CLOSE SIDEBAR" : "DOCS MENU"}
            </PixelButton>
            <span className="text-xs text-(--espresso) font-bold">DOCUMENTATION</span>
          </div>

          <Link href="/docs/component">
            <PixelButton size="sm" variant="outline" className="text-xs">
              COMPONENTS CODEX &gt;
            </PixelButton>
          </Link>
        </div>

        {/* Left Sticky Documentation Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 border-r-4 border-(--espresso) bg-(--surface-card) lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto p-4 space-y-6">
          {renderSidebarContent()}
        </aside>

        {/* Mobile Slide-Over Drawer (Mobile & Tablet) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Documentation Sidebar"
          >
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <aside className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-(--surface-card) border-r-4 border-(--espresso) h-full overflow-y-auto p-4 space-y-6 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b-2 border-(--border-strong)">
                <div>
                  <span className="font-bold text-sm text-(--espresso) tracking-wider block">
                    DOCS DIRECTORY
                  </span>
                  <span className="text-[10px] text-(--caramel) font-bold uppercase tracking-widest block">
                    TABLE OF CONTENTS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center p-1 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  aria-label="Close docs drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {renderSidebarContent()}
            </aside>
          </div>
        )}

        {/* Right Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-12">
          {/* Docs Overview Banner */}
          <section id="why-jui" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-(--border-strong) pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-(--espresso) uppercase tracking-wider">
                    1. OVERVIEW &amp; PHILOSOPHY
                  </h1>
                  <PixelBadge variant="warning">GAME UI</PixelBadge>
                </div>
                <p className="text-xs text-[#7B5B49] mt-1">
                  TACTILE 2D PIXEL-ART GAME UI PRIMITIVES FOR REACT 19 AND TAILWIND CSS.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/docs/component">
                  <PixelButton size="sm" className="text-xs">
                    VIEW 28 COMPONENTS &gt;
                  </PixelButton>
                </Link>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
              Standard web UI components are engineered for enterprise dashboards and corporate SaaS. They feel sterile, flat, and out of place inside an indie RPG, retro arcade game, or gamified product. JUI was designed from scratch as a tactile 2D pixel game UI library:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <div className="flex items-center gap-2 text-(--caramel)">
                  <Gamepad2 className="w-4 h-4" />
                  <h3 className="font-bold text-xs text-(--espresso) uppercase">TACTILE 3D BEVELS</h3>
                </div>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Buttons and panels feature authentic stepped pixel bevels that physically depress by 2 pixels when pressed.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <div className="flex items-center gap-2 text-(--destructive)">
                  <Volume2 className="w-4 h-4" />
                  <h3 className="font-bold text-xs text-(--espresso) uppercase">SYNTHESIZED 8-BIT SFX</h3>
                </div>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Zero MP3 asset files to load. SoundManager synthesizes retro clicks, loot chimes, and spell casts via Web Audio API.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <div className="flex items-center gap-2 text-(--success)">
                  <Palette className="w-4 h-4" />
                  <h3 className="font-bold text-xs text-(--espresso) uppercase">EARTHY PALETTE</h3>
                </div>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Parchment cream, warm caramel, cinnamon depth, and espresso contours calibrated for high contrast and readability.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. JEV AI DECISION LAYER */}
          {/* ========================================================================= */}
          <section id="ai-decision-layer" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b-2 border-dashed border-(--border-strong) pb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                  2. JEV AI DECISION LAYER
                </h2>
                <PixelBadge variant="warning">SYSTEM ONE AI</PixelBadge>
              </div>
              <Link href="/docs/component#jev-decision-layer" className="text-xs text-(--caramel) font-bold hover:underline">
                Open Playground &gt;
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
              JUI includes native integration with <strong className="text-(--espresso)">TypeSafe AI&apos;s System One decision engine (typesafe/jev-1.13)</strong>. Instead of generating unconstrained text or fragile HTML, Jev acts as an ultra-fast classification layer that chooses the right UI primitive based on game context:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--destructive) block">BOSS DEFEAT / CRITICAL</span>
                <span className="text-[10px] text-(--espresso) block">Component: <strong className="text-(--caramel)">PixelDialog</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Requires active player acknowledgment before proceeding.</p>
              </div>

              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--warning) block">POISON / ENVIRONMENTAL</span>
                <span className="text-[10px] text-(--espresso) block">Component: <strong className="text-(--caramel)">PixelAlert</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Renders a persistent HUD hazard alert banner.</p>
              </div>

              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--success) block">AMBIENT LOOT / GOLD</span>
                <span className="text-[10px] text-(--espresso) block">Component: <strong className="text-(--caramel)">PixelToast</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Auto-dismissing notification with loot sound effect.</p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. GETTING STARTED */}
          {/* ========================================================================= */}
          <section id="get-started" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                3. GETTING STARTED &amp; PREREQUISITES
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
              JUI primitives are built for React 19 and Tailwind CSS. Ensure your project meets the requirements below:
            </p>

            <div className="p-4 bg-(--background) pixel-border-bevel space-y-3 text-xs">
              <ul className="space-y-2 text-[#7B5B49]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                  <span><strong className="text-(--espresso)">React 19 or React 18:</strong> Full support for both Server and Client Components.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                  <span><strong className="text-(--espresso)">Tailwind CSS v4 (or v3):</strong> Uses standard CSS variables for theme tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                  <span><strong className="text-(--espresso)">Framework:</strong> Next.js (App Router), Vite, Remix, or Astro.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. INSTALLATION & SETUP */}
          {/* ========================================================================= */}
          <section id="installation" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                4. CLI INSTALLATION &amp; SETUP
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider">
                  STEP 1: INITIALIZE JUI IN YOUR PROJECT
                </span>
                <div className="flex items-center gap-1">
                  {(["bun", "pnpm", "npm", "yarn"] as const).map((pkg) => (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase pixel-border-bevel cursor-pointer ${
                        selectedPkg === pkg ? "bg-(--caramel) text-(--cream)" : "bg-(--surface-muted) text-(--espresso)"
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-(--background) pixel-border-bevel text-xs">
                <code className="font-mono text-(--espresso) font-bold text-[11px] sm:text-xs">
                  {pkgCommands[selectedPkg]}
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard(pkgCommands[selectedPkg], "init")}
                  className="p-1.5 pixel-btn-bevel bg-(--surface-card) text-(--espresso) hover:text-(--caramel) cursor-pointer"
                  aria-label="Copy init command"
                >
                  {copiedKey === "init" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="pt-2 border-t border-dashed border-(--border-strong) space-y-3">
                <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider block">
                  STEP 2: ADD PRIMITIVES TO YOUR REPOSITORY
                </span>

                <div className="flex items-center justify-between p-3 bg-(--background) pixel-border-bevel text-xs">
                  <code className="font-mono text-(--espresso) font-bold text-[11px] sm:text-xs">
                    npx @1zuku/jui add button card dialog avatar toast
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("npx @1zuku/jui add button card dialog avatar toast", "add-multi")}
                    className="p-1.5 pixel-btn-bevel bg-(--surface-card) text-(--espresso) hover:text-(--caramel) cursor-pointer"
                    aria-label="Copy add command"
                  >
                    {copiedKey === "add-multi" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. HOW IT WORKS */}
          {/* ========================================================================= */}
          <section id="how-it-works" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                5. HOW IT WORKS &amp; ARCHITECTURE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                  01. COMPLETE CODE OWNERSHIP
                </span>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Source files are added directly to your components folder. There is no runtime npm package locking you in. Modify borders, paddings, and sounds freely.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                  02. SYNCHRONOUS SVG RENDERING
                </span>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  PixelAvatar renders synchronous vector SVG on both server and client. The browser paints pixels immediately on initial page load with zero background flicker.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                  03. WEB AUDIO SYNTHESIZER
                </span>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  No heavy audio assets to fetch. Sound waveforms are generated live in the browser for instant tactile audio feedback.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                  04. KEYBOARD &amp; ARIA READINESS
                </span>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Focus traps in dialogs, Escape key dismissal, and arrow key traversal built according to WAI-ARIA authoring practices.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. REGISTRY */}
          {/* ========================================================================= */}
          <section id="registry" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                6. THE REGISTRY SYSTEM
              </h2>
            </div>

            <p className="text-xs text-[#7B5B49]">
              The registry catalogs all 28 primitives with automated dependency tracking:
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2.5 bg-(--background) pixel-border-bevel flex items-center justify-between">
                <span>npx @1zuku/jui list</span>
                <span className="text-[10px] font-sans text-[#7B5B49]">Lists all available primitives</span>
              </div>
              <div className="p-2.5 bg-(--background) pixel-border-bevel flex items-center justify-between">
                <span>npx @1zuku/jui add &lt;name&gt;</span>
                <span className="text-[10px] font-sans text-[#7B5B49]">Adds specific primitive</span>
              </div>
              <div className="p-2.5 bg-(--background) pixel-border-bevel flex items-center justify-between">
                <span>npx @1zuku/jui add --all</span>
                <span className="text-[10px] font-sans text-[#7B5B49]">Adds complete 28-primitive codex</span>
              </div>
              <div className="p-2.5 bg-(--background) pixel-border-bevel flex items-center justify-between">
                <span>npx @1zuku/jui add &lt;name&gt; --overwrite</span>
                <span className="text-[10px] font-sans text-[#7B5B49]">Overwrites existing component files</span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. USE CASES */}
          {/* ========================================================================= */}
          <section id="use-cases" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                7. REAL-WORLD USE CASES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="text-xs font-bold text-(--caramel) uppercase block">
                  INDIE 2D RPG &amp; ARCADE GAMES
                </span>
                <p className="text-xs text-[#7B5B49]">
                  Inventory grids, character sheets, health bars, merchant shops, and dialog dialogue boxes.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="text-xs font-bold text-(--caramel) uppercase block">
                  GAMIFIED SAAS &amp; ONBOARDING
                </span>
                <p className="text-xs text-[#7B5B49]">
                  Level-up toasts, XP progress bars, achievement badges, and retro character avatars.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="text-xs font-bold text-(--caramel) uppercase block">
                  WEB3 &amp; RETRO DAPPS
                </span>
                <p className="text-xs text-[#7B5B49]">
                  Wallet balance cards, guild leaderboards, vault storage drawers, and transaction confirmation alerts.
                </p>
              </div>

              <div className="p-4 bg-(--background) pixel-border-bevel space-y-1.5">
                <span className="text-xs font-bold text-(--caramel) uppercase block">
                  CREATIVE PORTFOLIOS &amp; STUDIOS
                </span>
                <p className="text-xs text-[#7B5B49]">
                  Memorable personal sites, developer portfolios, and interactive game dev logs.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. 28 PRIMITIVES CODEX */}
          {/* ========================================================================= */}
          <section id="primitives-codex" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-dashed border-(--border-strong) pb-3">
              <div>
                <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                  8. COMPLETE 28-COMPONENT CODEX
                </h2>
                <p className="text-xs text-[#7B5B49] mt-0.5">
                  ALL 28 RETRO GAME UI PRIMITIVES GROUNDED IN RPG WORKFLOWS.
                </p>
              </div>
              <Link
                href="/docs/component"
                className="text-xs text-(--caramel) font-bold hover:underline flex items-center gap-1"
              >
                Interactive API Demos &gt;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {ALL_COMPONENTS.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 bg-(--background) pixel-border-bevel flex flex-col justify-between space-y-2.5 group hover:border-(--caramel) transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-(--caramel) uppercase">
                        {c.category}
                      </span>
                      <Link
                        href={`/docs/component#${c.id}`}
                        className="text-[10px] text-(--espresso) opacity-60 group-hover:opacity-100 hover:text-(--caramel) flex items-center gap-0.5"
                      >
                        <span>DEMO</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <h3 className="font-bold text-xs text-(--espresso) group-hover:text-(--caramel) transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-[11px] text-[#7B5B49] leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-(--border-strong) flex items-center justify-between">
                    <code className="text-[10px] font-mono text-(--espresso)">
                      npx jui add {c.cli}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`npx @1zuku/jui add ${c.cli}`, c.cli)}
                      className="p-1 pixel-btn-bevel bg-(--surface-card) text-(--espresso) hover:text-(--caramel) cursor-pointer"
                      aria-label={`Copy CLI command for ${c.name}`}
                    >
                      {copiedKey === c.cli ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. FAQ */}
          {/* ========================================================================= */}
          <section id="faq" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="border-b-2 border-dashed border-(--border-strong) pb-3">
              <h2 className="text-xl font-bold text-(--espresso) uppercase tracking-wider">
                9. FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-(--background) pixel-border-bevel space-y-1.5">
                <h3 className="font-bold text-xs text-(--espresso) uppercase">
                  CAN I MUTE OR DISABLE THE SOUND EFFECTS?
                </h3>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Yes. You can toggle audio globally via <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">soundManager.enabled = false</code> or use the audio toggle button in the component codex sidebar.
                </p>
              </div>

              <div className="p-3.5 bg-(--background) pixel-border-bevel space-y-1.5">
                <h3 className="font-bold text-xs text-(--espresso) uppercase">
                  DOES PIXELAVATAR SUPPORT CUSTOM IMAGE URLS?
                </h3>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Yes. Pass <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">src=&quot;https://...&quot;</code> to load an image. If the image is omitted or fails, it falls back instantly to the synchronous AvatarsInPixels SVG.
                </p>
              </div>

              <div className="p-3.5 bg-(--background) pixel-border-bevel space-y-1.5">
                <h3 className="font-bold text-xs text-(--espresso) uppercase">
                  IS JUI FREE AND OPEN SOURCE?
                </h3>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  Yes, JUI is licensed under the MIT license. You are free to use it in commercial games, indie projects, and applications without fee.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
