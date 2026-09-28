"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { PixelButton } from "@/components/pixel/button";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelCard, PixelCardContent } from "@/components/pixel/card";
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
  Coins,
} from "lucide-react";

interface ComponentCardItem {
  id: string;
  name: string;
  category: string;
  cli: string;
  desc: string;
}

const ALL_COMPONENTS: ComponentCardItem[] = [
  // AI Decision Primitives
  { id: "jev-decision-layer", name: "PixelJevFeedback", category: "AI Decision Primitives", cli: "jev-feedback", desc: "System One AI dynamically picking between toast, dialog, or alert based on game context." },

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

export default function DocsPage() {
  const [darkMode, setDarkMode] = useState(false);
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

  const navLinks = [
    { label: "🌟 WHY JUI", href: "#why-jui" },
    { label: "🚀 GET STARTED", href: "#get-started" },
    { label: "📦 INSTALLATION", href: "#installation" },
    { label: "⚙️ HOW IT WORKS", href: "#how-it-works" },
    { label: "🤖 JEV AI ENGINE", href: "#ai-decision-layer" },
    { label: "📋 REGISTRY CLI", href: "#registry" },
    { label: "🎮 USE CASES", href: "#use-cases" },
    { label: "⚔️ 28 PRIMITIVES", href: "#primitives-codex" },
    { label: "❓ FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-(--background) text-(--foreground) font-pixel selection:bg-(--caramel) selection:text-(--cream)">
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Docs Sub-Header / Quick Jump Bar */}
      <div className="w-full bg-(--surface-muted) border-b-2 border-(--espresso) overflow-x-auto py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max">
          <span className="text-[10px] font-bold text-(--caramel) uppercase tracking-widest mr-2 flex items-center gap-1">
            <Gamepad2 className="w-3.5 h-3.5" /> JUMP TO:
          </span>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-2.5 py-1 text-[11px] text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-card) pixel-border-bevel transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b-4 border-(--espresso) bg-(--surface-card)">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C0855212_1px,transparent_1px),linear-gradient(to_bottom,#C0855212_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-3 py-1.5 bg-(--surface-muted) text-(--espresso) pixel-border-bevel text-xs">
            <span className="flex items-center gap-1.5 text-(--destructive)">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>HP 100/100</span>
            </span>
            <span className="text-(--border-strong)">•</span>
            <span className="flex items-center gap-1.5 text-(--caramel)">
              <Shield className="w-3.5 h-3.5 fill-current" />
              <span>MP 100/100</span>
            </span>
            <span className="text-(--border-strong)">•</span>
            <span className="text-[#D48B38] font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> 99 GOLD
            </span>
            <span className="text-(--border-strong)">•</span>
            <span className="text-(--espresso) font-bold">LVL 42 ARCHMAGE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-(--espresso) tracking-wider uppercase leading-tight">
            JUI GAME UI DOCUMENTATION
          </h1>

          <p className="text-xs sm:text-sm text-[#7B5B49] max-w-2xl mx-auto uppercase leading-relaxed tracking-wide">
            The complete handbook for building tactile 2D pixel-art game interfaces, retro RPG HUDs, and web games in React 19 and Tailwind CSS.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a href="#get-started">
              <PixelButton size="lg" className="text-xs uppercase px-6 py-3 cursor-pointer">
                GET STARTED NOW
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
              </PixelButton>
            </a>
            <Link href="/docs/component">
              <PixelButton variant="outline" size="lg" className="text-xs uppercase px-6 py-3 cursor-pointer">
                VIEW 28 COMPONENTS CODEX
              </PixelButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Documentation Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* ========================================================================= */}
        {/* 1. WHY JUI? */}
        {/* ========================================================================= */}
        <section id="why-jui" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Sparkles className="w-5 h-5 text-(--caramel)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              1. WHY JUI? (THE GAME UI PHILOSOPHY)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
            Standard web component libraries are engineered for generic dashboards and enterprise SaaS. They are sleek, sterile, and feel completely out of place inside an indie RPG, a retro arcade game, or a gamified web product.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <div className="flex items-center gap-2 text-(--caramel)">
                <Gamepad2 className="w-5 h-5" />
                <h3 className="font-bold text-sm text-(--espresso) uppercase">TACTILE 3D BEVELS</h3>
              </div>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Buttons and panels feature authentic 8-bit/16-bit stepped bevel contours. They physically depress by 2 pixels when clicked or tapped.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <div className="flex items-center gap-2 text-(--destructive)">
                <Volume2 className="w-5 h-5" />
                <h3 className="font-bold text-sm text-(--espresso) uppercase">SYNTHESIZED 8-BIT SFX</h3>
              </div>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Zero audio asset files to load. SoundManager synthesizes retro clicks, item loot chimes, spell casts, and alerts directly via Web Audio API.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <div className="flex items-center gap-2 text-(--success)">
                <Palette className="w-5 h-5" />
                <h3 className="font-bold text-sm text-(--espresso) uppercase">EARTHY PALETTE</h3>
              </div>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Warm parchment cream, rich caramel, deep cinnamon, and espresso contours designed for high readability on retro CRT or modern screens.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. GETTING STARTED */}
        {/* ========================================================================= */}
        <section id="get-started" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Zap className="w-5 h-5 text-(--warning)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              2. GETTING STARTED &amp; PREREQUISITES
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
            JUI runs on modern React frameworks. Ensure your environment matches the following prerequisites:
          </p>

          <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-4 text-xs">
            <ul className="space-y-2 text-[#7B5B49]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                <span><strong className="text-(--espresso)">React 19 or React 18:</strong> Full support for Server Components and Client Components.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                <span><strong className="text-(--espresso)">Tailwind CSS v4 (or v3):</strong> Compatible with modern CSS custom properties and tokens.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0 mt-0.5" />
                <span><strong className="text-(--espresso)">Framework:</strong> Next.js (App Router), Vite, Remix, or Astro.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INSTALLATION */}
        {/* ========================================================================= */}
        <section id="installation" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Package className="w-5 h-5 text-(--caramel)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              3. INSTALLATION &amp; SETUP
            </h2>
          </div>

          <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-(--border-strong) pb-3">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider">
                STEP 1: INITIALIZE JUI IN YOUR REPO
              </span>
              {/* Package manager switcher */}
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

            <div className="flex items-center justify-between p-3 bg-(--surface-muted) pixel-border-bevel text-xs">
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

            <p className="text-xs text-[#7B5B49] leading-relaxed">
              The <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">init</code> command configures your project automatically:
            </p>

            <ul className="text-xs space-y-1.5 text-[#7B5B49] list-disc list-inside">
              <li>Creates <code className="text-(--espresso) font-bold">lib/utils.ts</code> with the standard <code className="text-(--espresso)">cn()</code> utility.</li>
              <li>Installs necessary peer helpers (<code className="text-(--espresso)">clsx</code>, <code className="text-(--espresso)">tailwind-merge</code>, <code className="text-(--espresso)">pixelarticons</code>).</li>
              <li>Prepares your theme tokens in <code className="text-(--espresso)">globals.css</code>.</li>
            </ul>

            <div className="pt-3 border-t border-dashed border-(--border-strong) space-y-3">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider block">
                STEP 2: ADD GAME UI PRIMITIVES
              </span>
              <p className="text-xs text-[#7B5B49]">
                Add any of the 28 primitives directly into your <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">components/pixel/</code> folder:
              </p>

              <div className="flex items-center justify-between p-3 bg-(--surface-muted) pixel-border-bevel text-xs">
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
        {/* 4. HOW IT WORKS */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Cpu className="w-5 h-5 text-(--espresso)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              4. HOW IT WORKS &amp; ARCHITECTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                01. 100% CODE OWNERSHIP (SHADCN STYLE)
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                JUI distributes direct source code directly into your repository. You don&apos;t depend on a heavy runtime library or external style sheets that you cannot customize. You have complete freedom to alter pixel bevel heights, colors, or props.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                02. SYNCHRONOUS SVG RENDERING
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Our AvatarsInPixels character generator and HUD indicators render synchronously as vector SVG. The browser paints pixels immediately on first HTML stream—with zero canvas delays, zero hydration mismatch, and zero background flicker on refresh.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                03. ZERO-LATENCY SOUND SYNTHESIS
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Instead of bundling megabytes of MP3 files that stutter over slow connections, JUI includes a built-in SoundManager that synthesizes audio waveforms in real time using your browser&apos;s Web Audio API.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-3">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                04. CONTROLLER &amp; ARIA READINESS
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                All components adhere strictly to WAI-ARIA authoring guidelines. Modals feature focus traps and Escape key dismissal; lists and tabs support arrow key navigation and game controller mapping.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. JEV AI DECISION LAYER */}
        {/* ========================================================================= */}
        <section id="ai-decision-layer" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Flame className="w-5 h-5 text-(--caramel)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              5. JEV AI DECISION LAYER
            </h2>
          </div>

          <div className="p-5 sm:p-6 bg-(--surface-card) pixel-border-bevel space-y-4">
            <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed">
              JUI includes first-class integration with <strong className="text-(--espresso)">TypeSafe AI&apos;s System One decision model (typesafe/jev-1.13)</strong>. Instead of hallucinating free-form text or unpredictable HTML, Jev operates as an ultra-fast classification boundary that selects the appropriate UI primitive from fixed schemas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-(--surface-muted) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--destructive) block">BOSS DEFEAT / CRITICAL</span>
                <span className="text-[10px] text-(--espresso) block">Routes to: <strong className="text-(--caramel)">PixelDialog</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Requires active player acknowledgment with loot reward confirmation.</p>
              </div>

              <div className="p-3 bg-(--surface-muted) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--warning) block">POISON / ENVIRONMENTAL</span>
                <span className="text-[10px] text-(--espresso) block">Routes to: <strong className="text-(--caramel)">PixelAlert</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Renders a persistent hazard banner in the HUD until dispelled.</p>
              </div>

              <div className="p-3 bg-(--surface-muted) pixel-border-bevel space-y-1.5">
                <span className="font-bold text-(--success) block">AMBIENT LOOT / GOLD</span>
                <span className="text-[10px] text-(--espresso) block">Routes to: <strong className="text-(--caramel)">PixelToast</strong></span>
                <p className="text-[10px] text-[#7B5B49]">Auto-dismissing notification with loot pickup chime.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#7B5B49]">
                Includes deterministic offline mock for zero-latency testing.
              </span>
              <Link href="/docs/component#jev-decision-layer" className="text-(--caramel) hover:underline font-bold text-xs">
                Inspect Jev Playground &gt;
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. REGISTRY */}
        {/* ========================================================================= */}
        <section id="registry" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Terminal className="w-5 h-5 text-(--espresso)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              6. THE REGISTRY &amp; CLI SYSTEM
            </h2>
          </div>

          <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-4 text-xs">
            <p className="text-[#7B5B49] leading-relaxed">
              JUI uses a centralized, static registry (<code className="text-(--espresso)">lib/registry.json</code>) that catalogs every component, its target file path, and external dependencies.
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-(--espresso) uppercase tracking-wider block">
                CLI COMMAND REFERENCE:
              </span>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
                  <span>npx @1zuku/jui list</span>
                  <span className="text-[10px] font-sans text-[#7B5B49]">Prints all 28 available primitives</span>
                </div>
                <div className="p-2.5 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
                  <span>npx @1zuku/jui add &lt;name&gt;</span>
                  <span className="text-[10px] font-sans text-[#7B5B49]">Installs specific component into your project</span>
                </div>
                <div className="p-2.5 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
                  <span>npx @1zuku/jui add --all</span>
                  <span className="text-[10px] font-sans text-[#7B5B49]">Adds the complete 28-primitive codex at once</span>
                </div>
                <div className="p-2.5 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
                  <span>npx @1zuku/jui add &lt;name&gt; --overwrite</span>
                  <span className="text-[10px] font-sans text-[#7B5B49]">Forces update of existing files</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. USE CASES */}
        {/* ========================================================================= */}
        <section id="use-cases" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <Swords className="w-5 h-5 text-(--caramel)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              7. REAL-WORLD USE CASES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-2">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                🗡️ INDIE 2D RPG &amp; ARCADE GAMES
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Build full game menus, inventory grids, skill trees, health bars, merchant shops, and dialog dialogue boxes in React or Next.js without building custom sprite sheets.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-2">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                🎮 GAMIFIED SAAS &amp; ONBOARDING
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Transform standard web applications into rewarding experiences with level-up toasts, XP progress bars, achievement badges, and pixel profile avatars.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-2">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                🪙 WEB3 &amp; RETRO DAPPS
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                High-personality wallet dashboards, guild leaderboards, NFT inventory vaults, and transaction confirmation modals with retro arcade flair.
              </p>
            </div>

            <div className="p-5 bg-(--surface-card) pixel-border-bevel space-y-2">
              <span className="text-xs font-bold text-(--caramel) uppercase tracking-wider block">
                🎨 CREATIVE PORTFOLIOS &amp; STUDIOS
              </span>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Create stand-out personal portfolios, interactive resumes, game design documents, and devlogs that leave a lasting nostalgic impression.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. 28 PRIMITIVES CODEX */}
        {/* ========================================================================= */}
        <section id="primitives-codex" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-(--espresso) pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-(--caramel)" />
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
                8. COMPLETE 28-COMPONENT CODEX
              </h2>
            </div>
            <Link
              href="/docs/component"
              className="text-xs text-(--caramel) font-bold hover:underline flex items-center gap-1"
            >
              Interactive API Codex &gt;
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-[#7B5B49]">
            Every primitive is ready to copy or add via CLI. Click any card to jump directly to its interactive API playground and live demo:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_COMPONENTS.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-(--surface-card) pixel-border-bevel flex flex-col justify-between space-y-3 group hover:border-(--caramel) transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-(--caramel) uppercase">
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
                  <h3 className="font-bold text-sm text-(--espresso) group-hover:text-(--caramel) transition-colors">
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
                    className="p-1 pixel-btn-bevel bg-(--surface-muted) text-(--espresso) hover:text-(--caramel) cursor-pointer"
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
        <section id="faq" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b-2 border-(--espresso) pb-2">
            <HelpCircle className="w-5 h-5 text-(--espresso)" />
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              9. FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-(--surface-card) pixel-border-bevel space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-(--espresso) uppercase">
                Q: CAN I MUTE OR DISABLE THE SOUND EFFECTS?
              </h3>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Yes! You can toggle sound effects globally at runtime via <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">soundManager.enabled = false</code> or use the audio toggle button in the header/codex sidebar.
              </p>
            </div>

            <div className="p-4 bg-(--surface-card) pixel-border-bevel space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-(--espresso) uppercase">
                Q: DOES PIXELAVATAR SUPPORT CUSTOM IMAGE URLS?
              </h3>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Yes. Pass <code className="bg-(--surface-muted) px-1 py-0.5 border border-(--border-strong)">src=&quot;https://...&quot;</code> to render a custom image. If the image fails or while omitted, it renders the instant AvatarsInPixels SVG synchronously with 0 background flicker on refresh.
              </p>
            </div>

            <div className="p-4 bg-(--surface-card) pixel-border-bevel space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-(--espresso) uppercase">
                Q: IS JUI FREE AND OPEN SOURCE?
              </h3>
              <p className="text-xs text-[#7B5B49] leading-relaxed">
                Yes, JUI is completely free and open-source under the MIT license. You can use it in commercial games, indie projects, and applications without restriction.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
