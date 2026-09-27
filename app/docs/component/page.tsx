"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { soundManager } from "@/lib/sound-effects";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

// Pixel Components (All 28 Game UI Primitives)
import { PixelButton } from "@/components/pixel/button";
import { PixelInput } from "@/components/pixel/input";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardContent, PixelCardFooter } from "@/components/pixel/card";
import { PixelAvatar } from "@/components/pixel/avatar";
import { PixelSeparator } from "@/components/pixel/separator";
import { PixelDialog, PixelDialogFooter } from "@/components/pixel/dialog";
import { PixelDrawer, PixelDrawerFooter } from "@/components/pixel/drawer";
import { PixelAlertDialog } from "@/components/pixel/alert-dialog";
import { PixelAlert } from "@/components/pixel/alert";
import { PixelToast, PixelToastContainer } from "@/components/pixel/toast";
import { PixelTooltip } from "@/components/pixel/tooltip";
import { PixelPopover } from "@/components/pixel/popover";
import { PixelDropdownMenu } from "@/components/pixel/dropdown-menu";
import { PixelTabs } from "@/components/pixel/tabs";
import { PixelAccordion } from "@/components/pixel/accordion";
import { PixelCollapsible } from "@/components/pixel/collapsible";
import { PixelBreadcrumb } from "@/components/pixel/breadcrumb";
import { PixelPagination } from "@/components/pixel/pagination";
import { PixelNavbar } from "@/components/pixel/navbar";
import { PixelSidebar } from "@/components/pixel/sidebar";
import { PixelCommandPalette } from "@/components/pixel/command-palette";
import { PixelTable } from "@/components/pixel/table";
import { PixelProgressBar } from "@/components/pixel/progress-bar";
import { PixelEmptyState } from "@/components/pixel/empty-state";
import { PixelCalendar } from "@/components/pixel/calendar";
import { PixelSkeleton } from "@/components/pixel/skeleton";
import { PixelSpinner } from "@/components/pixel/spinner";
import { PixelJevFeedback } from "@/components/pixel/jev-feedback";

import {
  Sword,
  Shield,
  Heart,
  Zap,
  Sparkles,
  Check,
  Copy,
  Terminal,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  Flame,
  Code,
  Package,
  Scroll,
  Crosshair,
  User,
  Sliders,
  Calendar as CalendarIcon,
  HelpCircle,
  Menu,
  X,
  Coins
} from "lucide-react";
import {
  PixelSearchIcon,
  PixelCloseIcon,
  PixelVolume2Icon,
  PixelVolumeXIcon
} from "@/components/pixel/icons";

interface GameToast {
  id: number;
  title: string;
  description: string;
  variant: "default" | "success" | "warning" | "destructive";
}

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  cli: string;
}

const ALL_COMPONENTS: ComponentItem[] = [
  // AI Decision Primitives
  { id: "jev-decision-layer", name: "Jev Feedback", category: "AI Decision Primitives", cli: "jev-feedback" },

  // Vitality & HUD
  { id: "component-button", name: "Button", category: "Vitality & HUD", cli: "button" },
  { id: "component-badge", name: "Badge", category: "Vitality & HUD", cli: "badge" },
  { id: "component-progressbar", name: "Progress Bar", category: "Vitality & HUD", cli: "progress-bar" },
  { id: "component-avatar", name: "Avatar", category: "Vitality & HUD", cli: "avatar" },
  { id: "component-separator", name: "Separator", category: "Vitality & HUD", cli: "separator" },
  { id: "component-skeleton", name: "Skeleton", category: "Vitality & HUD", cli: "skeleton" },

  // Actions & Inputs
  { id: "component-input", name: "Input", category: "Actions & Inputs", cli: "input" },
  { id: "component-dropdown", name: "Dropdown Menu", category: "Actions & Inputs", cli: "dropdown-menu" },
  { id: "component-tooltip", name: "Tooltip", category: "Actions & Inputs", cli: "tooltip" },
  { id: "component-popover", name: "Popover", category: "Actions & Inputs", cli: "popover" },

  // Inventory & Modals
  { id: "component-dialog", name: "Dialog", category: "Inventory & Modals", cli: "dialog" },
  { id: "component-drawer", name: "Drawer", category: "Inventory & Modals", cli: "drawer" },
  { id: "component-alert-dialog", name: "Alert Dialog", category: "Inventory & Modals", cli: "alert-dialog" },
  { id: "component-empty-state", name: "Empty State", category: "Inventory & Modals", cli: "empty-state" },

  // Codex & Layout
  { id: "component-card", name: "Card", category: "Codex & Layout", cli: "card" },
  { id: "component-tabs", name: "Tabs", category: "Codex & Layout", cli: "tabs" },
  { id: "component-accordion", name: "Accordion", category: "Codex & Layout", cli: "accordion" },
  { id: "component-collapsible", name: "Collapsible", category: "Codex & Layout", cli: "collapsible" },

  // Alerts & Feedback
  { id: "component-alert", name: "Alert", category: "Alerts & Feedback", cli: "alert" },
  { id: "component-toast", name: "Toast", category: "Alerts & Feedback", cli: "toast" },
  { id: "component-spinner", name: "Spinner", category: "Alerts & Feedback", cli: "spinner" },

  // Navigation & Systems
  { id: "component-breadcrumb", name: "Breadcrumb", category: "Navigation & Systems", cli: "breadcrumb" },
  { id: "component-pagination", name: "Pagination", category: "Navigation & Systems", cli: "pagination" },
  { id: "component-navbar", name: "Navbar", category: "Navigation & Systems", cli: "navbar" },
  { id: "component-sidebar", name: "Sidebar", category: "Navigation & Systems", cli: "sidebar" },
  { id: "component-command-palette", name: "Command Palette", category: "Navigation & Systems", cli: "command-palette" },
  { id: "component-table", name: "Table", category: "Navigation & Systems", cli: "table" },
  { id: "component-calendar", name: "Calendar", category: "Navigation & Systems", cli: "calendar" },
];

export default function ComponentDocsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCliId, setCopiedCliId] = useState<string | null>(null);

  // Live Game State for Demos
  const [playerHp, setPlayerHp] = useState(780);
  const [playerMp, setPlayerMp] = useState(340);
  const [gold, setGold] = useState(14850);
  const [actionLoading, setActionLoading] = useState(false);

  // Modals & Overlays
  const [forgeDialogOpen, setForgeDialogOpen] = useState(false);
  const [backpackDrawerOpen, setBackpackDrawerOpen] = useState(false);
  const [permaDeathAlertOpen, setPermaDeathAlertOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());
  const [paginationPage, setPaginationPage] = useState(1);
  const [heroName, setHeroName] = useState("Vaelin Ironheart");
  const [skeletonActive, setSkeletonActive] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<GameToast[]>([]);

  const addToast = useCallback((title: string, description: string, variant: GameToast["variant"] = "default") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    if (variant === "success") soundManager.playLoot();
    else if (variant === "destructive") soundManager.playAlert();
    else soundManager.playClick();

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  // Sync initial theme
  useEffect(() => {
    setDarkMode(document.documentElement.getAttribute("data-mode") === "dark");
  }, []);

  const toggleDarkMode = useCallback(() => {
    soundManager.playClick(600);
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

  const toggleSfx = () => {
    const next = !sfxEnabled;
    soundManager.enabled = next;
    setSfxEnabled(next);
    if (next) soundManager.playEquip();
  };

  const copyCli = (cli: string, id: string) => {
    navigator.clipboard.writeText(`npx jui add ${cli}`);
    soundManager.playClick(1000);
    setCopiedCliId(id);
    setTimeout(() => setCopiedCliId(null), 2000);
  };

  // Keyboard shortcut Command+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundManager.playCast();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered sidebar components
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COMPONENTS;
    return ALL_COMPONENTS.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cli.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const map = new Map<string, ComponentItem[]>();
    filteredComponents.forEach((c) => {
      const list = map.get(c.category) || [];
      list.push(c);
      map.set(c.category, list);
    });
    return Array.from(map.entries());
  }, [filteredComponents]);

  // Command palette items
  const commandItems = useMemo(
    () => [
      { id: "1", label: "Fast Travel: Dragon Spine Citadel", description: "Teleport to chapter 3 capital", shortcut: "⌘T", category: "Navigation", onSelect: () => addToast("Fast Travel Initiated", "Departing for Citadel...") },
      { id: "2", label: "Cast: Divine Resurrect", description: "Revive fallen party familiar", shortcut: "⌘R", category: "Magic", onSelect: () => addToast("Resurrect Cast", "Phoenix familiar revived!", "success") },
      { id: "3", label: "Open Enchantment Forge", description: "Modify equipment runestones", shortcut: "⌘F", category: "Inventory", onSelect: () => setForgeDialogOpen(true) },
      { id: "4", label: "Open Backpack Storage", description: "Access vault items", shortcut: "⌘B", category: "Inventory", onSelect: () => setBackpackDrawerOpen(true) },
    ],
    [addToast]
  );

  const leaderboardColumns = [
    { key: "rank", header: "RANK", sortable: true },
    { key: "hero", header: "HERO NAME", sortable: true },
    { key: "guild", header: "GUILD", sortable: true },
    { key: "level", header: "LVL", sortable: true },
    { key: "dps", header: "DPS", sortable: true },
  ];

  const leaderboardData = [
    { rank: "#1", hero: "Ignis The Bold", guild: "Sunforged", level: 99, dps: "142,500" },
    { rank: "#2", hero: "Seraphina", guild: "Moonlit", level: 98, dps: "138,200" },
    { rank: "#3", hero: "Kaelen Shadow", guild: "Abyssal", level: 96, dps: "125,900" },
    { rank: "#4", hero: "Thorgar Ironfist", guild: "Dwarf Citadel", level: 94, dps: "119,400" },
    { rank: "#5", hero: "Lyra Whisperwind", guild: "Wildwood", level: 92, dps: "112,000" },
  ];

  const componentCardClass =
    "p-5 sm:p-6 bg-(--surface-card) pixel-border-bevel font-pixel select-none space-y-4 scroll-mt-20";

  return (
    <div className="min-h-screen w-full flex flex-col bg-(--background) text-(--foreground) font-pixel selection:bg-(--caramel) selection:text-(--cream)">
      {/* Toast Container rendered at bottom */}
      <PixelToastContainer>
        {toasts.map((t) => (
          <PixelToast
            key={t.id}
            title={t.title}
            description={t.description}
            variant={t.variant}
          />
        ))}
      </PixelToastContainer>

      {/* Main Header */}
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
            <span className="text-xs text-(--espresso) font-bold">28 COMPONENTS</span>
          </div>

          <button
            type="button"
            onClick={toggleSfx}
            className="p-1.5 bg-(--surface-card) pixel-btn-bevel text-xs flex items-center gap-1 cursor-pointer"
          >
            {sfxEnabled ? <PixelVolume2Icon className="w-3.5 h-3.5 text-(--success)" /> : <PixelVolumeXIcon className="w-3.5 h-3.5 text-(--destructive)" />}
          </button>
        </div>

        {/* Left Sticky Documentation Sidebar */}
        <aside
          className={`w-full lg:w-64 xl:w-72 shrink-0 border-b-4 lg:border-b-0 lg:border-r-4 border-(--espresso) bg-(--surface-card) lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto p-4 space-y-6 ${
            sidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          {/* Quick Filter Search */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-(--espresso) uppercase tracking-wider block">
              FILTER PRIMITIVES
            </label>
            <div className="relative flex items-center">
              <PixelSearchIcon className="w-3.5 h-3.5 text-(--espresso) opacity-60 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10" />
              <PixelInput
                placeholder="Search 28 components..."
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

          {/* Section: DOCS */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-(--caramel) block border-b border-dashed border-(--border-strong) pb-1">
              DOCS
            </span>
            <ul className="space-y-1 text-xs">
              <li>
                <a
                  href="#overview"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-2.5 py-1.5 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel"
                >
                  Overview &amp; Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#jev-decision-layer"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-2.5 py-1.5 text-(--espresso) bg-(--caramel)/10 font-bold hover:bg-(--caramel) hover:text-(--cream) pixel-border-bevel flex items-center justify-between"
                >
                  <span>Jev AI Decision Layer</span>
                  <span className="text-[9px] px-1 bg-(--espresso) text-(--cream)">NEW</span>
                </a>
              </li>
              <li>
                <a
                  href="#cli-install"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-2.5 py-1.5 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel"
                >
                  CLI Installation
                </a>
              </li>
              <li>
                <a
                  href="#keyboard-nav"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-2.5 py-1.5 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) pixel-border-bevel"
                >
                  Gamepad &amp; Keys
                </a>
              </li>
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
                      <a
                        href={`#${item.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-between px-2 py-1 text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel) transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-2.5 h-2.5 opacity-40" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Audio Synthesizer Toggle */}
          <div className="pt-2 border-t border-dashed border-(--border-strong)">
            <button
              type="button"
              onClick={toggleSfx}
              className="w-full flex items-center justify-between px-2 py-1.5 bg-(--surface-muted) pixel-border-bevel text-xs text-(--espresso) cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase">SFX AUDIO</span>
              <span className="flex items-center gap-1 font-bold text-(--caramel)">
                {sfxEnabled ? <PixelVolume2Icon className="w-3.5 h-3.5 text-(--success)" /> : <PixelVolumeXIcon className="w-3.5 h-3.5 text-(--destructive)" />}
                {sfxEnabled ? "ON" : "MUTED"}
              </span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-12">
          {/* Docs Overview Banner */}
          <section id="overview" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-(--border-strong) pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-(--espresso) uppercase tracking-wider">
                    JUI COMPONENT CODEX
                  </h1>
                  <PixelBadge variant="warning">ARCADE READY</PixelBadge>
                </div>
                <p className="text-xs text-[#7B5B49] mt-1">
                  TACTILE 8-BIT &amp; 16-BIT UI PRIMITIVES GROUNDED IN CONTROLLER-FIRST RPG CONTEXTS.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playCast();
                    setCommandPaletteOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-(--surface-muted) text-(--espresso) pixel-border-bevel cursor-pointer"
                >
                  <PixelSearchIcon className="w-3.5 h-3.5 text-(--caramel)" />
                  <span>COMMAND PALETTE</span>
                  <kbd className="px-1 text-[10px] bg-(--cream) text-(--espresso) border border-(--border-strong)">⌘K</kbd>
                </button>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#7B5B49] max-w-3xl">
              Every primitive is built using physical pixel bevel compression, zero layout shifts, full keyboard navigation,
              and procedural 8-bit sound effects. Use these components for retro indie games, cyberpunk interfaces, or nostalgic web applications.
            </p>
          </section>

          {/* Jev System One Decision Layer Section */}
          <section id="jev-decision-layer" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-(--caramel)" />
                  JEV SYSTEM ONE DECISION LAYER
                </span>
                <PixelBadge variant="default">AI PICKER</PixelBadge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-(--caramel)">
                  MODEL: typesafe/jev-1.13
                </span>
              </div>
            </div>

            <p className="text-xs text-[#7B5B49] leading-relaxed">
              Instead of writing complex <code className="bg-(--cream-dark) px-1 py-0.5 border border-(--border-strong)">if/switch</code> conditions for game feedback, JUI features native integration with TypeSafe AI&apos;s <strong>Jev System One</strong> model. It evaluates game event signals and picks the ideal pixel primitive in under 350ms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-(--espresso)">PixelToast</span>
                  <span className="text-[9px] px-1 bg-(--cream-dark) border border-(--border-strong)">toast</span>
                </div>
                <p className="text-[11px] text-[#7B5B49]">
                  Ambient non-blocking notifications. Triggered for minor loot, item pickups, XP ticks, and passive stat gains.
                </p>
              </div>

              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-(--espresso)">PixelAlert</span>
                  <span className="text-[9px] px-1 bg-(--warning)/20 text-(--warning-foreground) border border-(--border-strong)">alert</span>
                </div>
                <p className="text-[11px] text-[#7B5B49]">
                  Persistent inline tactical warnings. Triggered for poison ticks, environmental traps, and broken equipment.
                </p>
              </div>

              <div className="p-3 bg-(--background) pixel-border-bevel space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-(--espresso)">PixelDialog</span>
                  <span className="text-[9px] px-1 bg-(--destructive)/20 text-(--destructive-foreground) border border-(--border-strong)">dialog</span>
                </div>
                <p className="text-[11px] text-[#7B5B49]">
                  Urgent blocking modal dialogues. Triggered for boss defeats, level completions, and climactic story beats.
                </p>
              </div>
            </div>

            {/* Live Interactive Drop-in Primitive */}
            <div className="pt-2">
              <PixelJevFeedback />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-(--border-strong)">
              <div className="text-[11px] text-(--foreground/70)">
                Includes client confidence-smoothing state machine to eliminate UI flicker.
              </div>
              <Link href="/demo/pixel-intent">
                <PixelButton variant="primary" size="sm" className="text-xs">
                  ▶ Launch Interactive Playground
                </PixelButton>
              </Link>
            </div>
          </section>

          {/* CLI Installation Section */}
          <section id="cli-install" className="p-6 bg-(--surface-card) pixel-border-bevel space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2">
              <span className="text-sm font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-(--caramel)" />
                CLI INSTALLATION &amp; WORKFLOW
              </span>
              <PixelBadge variant="secondary">NPX JUI</PixelBadge>
            </div>

            <p className="text-xs text-[#7B5B49]">
              Add any pixel component directly to your project codebase. No bulky dependencies required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-[10px] font-bold text-(--caramel) uppercase block">1. ADD ANY COMPONENT</span>
                <div
                  onClick={() => copyCli("button", "cli-hero")}
                  className="flex items-center justify-between p-2.5 bg-(--surface-card) pixel-border-bevel cursor-pointer text-xs"
                >
                  <span className="text-(--espresso)">&gt; npx jui add button</span>
                  <span className="p-1 bg-(--surface-muted)">
                    {copiedCliId === "cli-hero" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-(--background) pixel-border-bevel space-y-2">
                <span className="text-[10px] font-bold text-(--caramel) uppercase block">2. ADD MULTIPLE PRIMITIVES</span>
                <div
                  onClick={() => copyCli("dialog drawer toast", "cli-multi")}
                  className="flex items-center justify-between p-2.5 bg-(--surface-card) pixel-border-bevel cursor-pointer text-xs"
                >
                  <span className="text-(--espresso)">&gt; npx jui add dialog drawer toast</span>
                  <span className="p-1 bg-(--surface-muted)">
                    {copiedCliId === "cli-multi" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Controller & Keyboard Section */}
          <section id="keyboard-nav" className="p-4 sm:p-5 bg-(--surface-muted) pixel-border-bevel space-y-2 scroll-mt-20">
            <span className="text-[10px] font-bold uppercase text-(--caramel) tracking-wider block">
              GAMEPAD &amp; CONTROLLER SHORTCUTS:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-(--surface-card) pixel-border-bevel">[TAB] Navigate Focus</span>
              <span className="px-2 py-1 bg-(--surface-card) pixel-border-bevel">[ENTER / SPACE] Trigger Action</span>
              <span className="px-2 py-1 bg-(--surface-card) pixel-border-bevel">[ESC] Dismiss Modal / Drawer</span>
              <span className="px-2 py-1 bg-(--surface-card) pixel-border-bevel">[⌘K] Open Command Spellbook</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 1. BUTTON */}
          {/* ========================================================================= */}
          <section id="component-button" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelButton</h3>
                <PixelBadge variant="warning">VITALITY &amp; HUD</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("button", "btn")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "btn" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add button
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Physical tactile bevels with active 2px diagonal compression and loading spinner.
            </p>
            <div className="flex flex-wrap items-center gap-3 p-4 bg-(--background) pixel-border-bevel">
              <PixelButton variant="primary" onClick={() => addToast("Primary Command", "Hero executes strike [A]")}>
                Primary [A]
              </PixelButton>
              <PixelButton variant="secondary" onClick={() => addToast("Secondary Stance", "Defensive ward raised")}>
                Secondary [B]
              </PixelButton>
              <PixelButton variant="outline" onClick={() => addToast("Inspect Item", "Examining runic gear")}>
                Outline [X]
              </PixelButton>
              <PixelButton variant="destructive" onClick={() => addToast("Hero Flees", "Departed battle instance", "destructive")}>
                Flee [ESC]
              </PixelButton>
              <PixelButton
                variant="primary"
                loading={actionLoading}
                onClick={() => {
                  setActionLoading(true);
                  setTimeout(() => setActionLoading(false), 1200);
                }}
              >
                {actionLoading ? "Casting..." : "Cast Spell"}
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. BADGE */}
          {/* ========================================================================= */}
          <section id="component-badge" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelBadge</h3>
                <PixelBadge variant="warning">STATUS &amp; AFFINITY</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("badge", "badge")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "badge" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add badge
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Status effects, elemental tags, and level indicators with authentic 1-pixel borders.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 p-4 bg-(--background) pixel-border-bevel">
              <PixelBadge variant="default">DEFAULT LVL 42</PixelBadge>
              <PixelBadge variant="secondary">DEFENSE +14</PixelBadge>
              <PixelBadge variant="success">HASTE ACTIVE</PixelBadge>
              <PixelBadge variant="warning">CRITICAL SURGE</PixelBadge>
              <PixelBadge variant="destructive">POISON -8 HP</PixelBadge>
              <PixelBadge variant="outline">ARCADE 1P</PixelBadge>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. PROGRESS BAR */}
          {/* ========================================================================= */}
          <section id="component-progressbar" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelProgressBar</h3>
                <PixelBadge variant="warning">VITALS HUD</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("progress-bar", "prog")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "prog" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add progress-bar
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Diegetic health, mana, and boss shield bars with dynamic variant coloring and tabular numerals.
            </p>
            <div className="space-y-3 p-4 bg-(--background) pixel-border-bevel">
              <PixelProgressBar
                value={playerHp}
                max={1000}
                variant={playerHp < 300 ? "destructive" : "success"}
                showLabel
                label="Player Health (HP)"
              />
              <PixelProgressBar
                value={playerMp}
                max={500}
                variant="default"
                showLabel
                label="Mana Pool (MP)"
              />
              <div className="pt-2 flex gap-2">
                <PixelButton
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPlayerHp((prev) => Math.max(prev - 160, 0));
                    addToast("Damage Sustained", "-160 HP from enemy blade", "destructive");
                  }}
                >
                  Take Damage (-160)
                </PixelButton>
                <PixelButton
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setPlayerHp((prev) => Math.min(prev + 200, 1000));
                    setPlayerMp((prev) => Math.min(prev + 100, 500));
                    addToast("Elixir Consumed", "+200 HP, +100 MP restored", "success");
                  }}
                >
                  Drink Elixir (+200)
                </PixelButton>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. AVATAR */}
          {/* ========================================================================= */}
          <section id="component-avatar" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelAvatar</h3>
                <PixelBadge variant="warning">CHARACTER PORTRAITS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("avatar", "av")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "av" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add avatar
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Party portraits with fallback initials and pixel-bevel frame border.
            </p>
            <div className="flex items-center justify-around p-4 bg-(--background) pixel-border-bevel">
              <div className="flex flex-col items-center gap-2">
                <PixelAvatar fallback="VI" size="lg" />
                <span className="text-[10px] font-bold">Vaelin (LG)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PixelAvatar fallback="PX" size="lg" />
                <span className="text-[10px] font-bold">Phoenix (LG)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PixelAvatar fallback="WY" size="md" />
                <span className="text-[10px] font-bold">Wyrm (MD)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PixelAvatar fallback="SO" size="sm" />
                <span className="text-[10px] font-bold">Scout (SM)</span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. SEPARATOR */}
          {/* ========================================================================= */}
          <section id="component-separator" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelSeparator</h3>
                <PixelBadge variant="warning">LAYOUT DIVIDERS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("separator", "sep")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "sep" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add separator
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Solid and dashed pixel dividers to segment UI panels and stat cards.
            </p>
            <div className="space-y-4 p-4 bg-(--background) pixel-border-bevel text-xs">
              <div>
                <span className="text-[10px] text-[#7B5B49] block mb-1">HORIZONTAL PIXEL SEPARATOR:</span>
                <PixelSeparator />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. SKELETON */}
          {/* ========================================================================= */}
          <section id="component-skeleton" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelSkeleton</h3>
                <PixelBadge variant="warning">ASYNC LOADING</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("skeleton", "skel")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "skel" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add skeleton
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Chunky 8-bit scanline skeleton with stepped pulse animation for retro asynchronous loaders.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-(--espresso)">LOADER PREVIEW:</span>
                <button
                  type="button"
                  onClick={() => setSkeletonActive(!skeletonActive)}
                  className="text-xs text-(--caramel) font-bold hover:underline cursor-pointer"
                >
                  {skeletonActive ? "[SHOW RENDERED]" : "[TOGGLE SKELETON]"}
                </button>
              </div>
              {skeletonActive ? (
                <div className="space-y-2">
                  <PixelSkeleton variant="text" count={2} />
                  <PixelSkeleton variant="rectangular" height={50} />
                </div>
              ) : (
                <div className="p-3 bg-(--surface-muted) pixel-border-bevel text-xs space-y-1">
                  <span className="font-bold text-(--espresso) block">VAULT ASSETS LOADED</span>
                  <span className="text-[#7B5B49]">32 inventory items synced from cloud server.</span>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. INPUT */}
          {/* ========================================================================= */}
          <section id="component-input" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelInput</h3>
                <PixelBadge variant="warning">ACTIONS &amp; INPUTS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("input", "inp")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "inp" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add input
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Tactile text box with inset bevel, high contrast cursor, and keyboard focus states.
            </p>
            <div className="space-y-3 p-4 bg-(--background) pixel-border-bevel">
              <div>
                <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                  Hero Name (PixelInput):
                </label>
                <PixelInput
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Enter adventurer name..."
                />
              </div>
              <div className="text-xs text-[#7B5B49]">
                Active Name: <span className="font-bold text-(--espresso)">{heroName || "(Unnamed)"}</span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. DROPDOWN MENU */}
          {/* ========================================================================= */}
          <section id="component-dropdown" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelDropdownMenu</h3>
                <PixelBadge variant="warning">ACTIONS &amp; POPUPS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("dropdown-menu", "dd")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "dd" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add dropdown-menu
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Dropdown combat actions and spell menus with keyboard support and click-outside dismissal.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelDropdownMenu
                trigger={
                  <PixelButton variant="primary" size="sm">
                    CHOOSE SPELL <ChevronDown className="w-3 h-3 ml-1.5 inline" />
                  </PixelButton>
                }
                items={[
                  { label: "Inferno Meteor", icon: <Flame className="w-3 h-3 text-(--destructive)" />, onClick: () => addToast("Spell Cast", "Inferno Meteor unleashed!") },
                  { label: "Frost Barrier", icon: <Shield className="w-3 h-3 text-(--caramel)" />, onClick: () => addToast("Spell Cast", "Frost Barrier activated!") },
                  { label: "Lightning Strike", icon: <Zap className="w-3 h-3 text-[#D48B38]" />, onClick: () => addToast("Spell Cast", "Lightning Strike struck target!") },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. TOOLTIP */}
          {/* ========================================================================= */}
          <section id="component-tooltip" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelTooltip</h3>
                <PixelBadge variant="warning">HUD STATS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("tooltip", "tip")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "tip" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add tooltip
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              High-contrast item lore tooltip with text outlines and delayed hover detection.
            </p>
            <div className="flex flex-wrap gap-4 p-4 bg-(--background) pixel-border-bevel">
              <PixelTooltip content="Rune Blade +3: Grants +45 ATK and 12% Critical Strike Chance.">
                <div className="p-2 bg-(--surface-card) pixel-btn-bevel text-xs font-bold cursor-pointer">
                  HOVER: RUNE BLADE
                </div>
              </PixelTooltip>
              <PixelTooltip content="Shadow Cloak: +18 AGI, 20% stealth evasion in dungeons.">
                <div className="p-2 bg-(--surface-card) pixel-btn-bevel text-xs font-bold cursor-pointer">
                  HOVER: SHADOW CLOAK
                </div>
              </PixelTooltip>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 10. POPOVER */}
          {/* ========================================================================= */}
          <section id="component-popover" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelPopover</h3>
                <PixelBadge variant="warning">INFO OVERLAYS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("popover", "pop")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "pop" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add popover
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Floating pixel card for inspecting monster attributes and loot tables without leaving the HUD.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelPopover
                content={
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-(--espresso) block">DRAGON LORE INTEL</span>
                    <p className="text-[11px] text-[#7B5B49]">
                      Ancient fire drake vulnerable to Frost spells (+50% DMG). Resists physical attacks.
                    </p>
                    <PixelBadge variant="warning" className="text-[9px]">BOUNTY: 1,500 GP</PixelBadge>
                  </div>
                }
              >
                <PixelButton variant="outline" size="sm">
                  INSPECT MONSTER INTEL
                </PixelButton>
              </PixelPopover>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 11. DIALOG */}
          {/* ========================================================================= */}
          <section id="component-dialog" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelDialog</h3>
                <PixelBadge variant="warning">MODAL WINDOWS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("dialog", "dlg")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "dlg" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add dialog
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Accessible modal dialog with zero layout shift (CLS stabilized), focus trap, and escape key handling.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelButton variant="primary" onClick={() => setForgeDialogOpen(true)}>
                OPEN ENCHANTMENT FORGE DIALOG
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 12. DRAWER */}
          {/* ========================================================================= */}
          <section id="component-drawer" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelDrawer</h3>
                <PixelBadge variant="warning">INVENTORY PANELS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("drawer", "drw")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "drw" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add drawer
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Slide-over side inventory and vault storage panels with scroll locking and backdrop dismiss.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelButton variant="secondary" onClick={() => setBackpackDrawerOpen(true)}>
                OPEN BACKPACK VAULT DRAWER
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 13. ALERT DIALOG */}
          {/* ========================================================================= */}
          <section id="component-alert-dialog" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelAlertDialog</h3>
                <PixelBadge variant="warning">CRITICAL CONFIRMATION</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("alert-dialog", "adlg")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "adlg" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add alert-dialog
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              High-stakes action prompt for permadeath confirmation, irreversible trades, or character deletion.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelButton variant="destructive" onClick={() => setPermaDeathAlertOpen(true)}>
                TRIGGER PERMADEATH CONFIRMATION
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 14. EMPTY STATE */}
          {/* ========================================================================= */}
          <section id="component-empty-state" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelEmptyState</h3>
                <PixelBadge variant="warning">EMPTY VAULT</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("empty-state", "es")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "es" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add empty-state
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Clean prompt when inventory slots, quest logs, or mailboxes are empty.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelEmptyState
                title="BACKPACK IS EMPTY"
                description="Defeat dungeon bosses and complete quests to obtain ancient loot."
                action={
                  <PixelButton size="sm" onClick={() => addToast("Quest Accepted", "New quest added to log!")}>
                    Explore Dungeon
                  </PixelButton>
                }
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 15. CARD */}
          {/* ========================================================================= */}
          <section id="component-card" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelCard</h3>
                <PixelBadge variant="warning">CONTAINER</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("card", "card")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "card" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add card
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Structured tactile container with header, content, and footer slots.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelCard>
                <PixelCardHeader>
                  <PixelCardTitle>DUNGEON CONTRACT #402</PixelCardTitle>
                  <PixelCardDescription>Reward: 12,000 GP • Difficulty: Hard</PixelCardDescription>
                </PixelCardHeader>
                <PixelCardContent>
                  <p className="text-xs text-[#7B5B49]">
                    Exterminate the Frost Chimera threatening the northern trade routes.
                  </p>
                </PixelCardContent>
                <PixelCardFooter>
                  <PixelButton size="sm" variant="primary">Accept Mission</PixelButton>
                </PixelCardFooter>
              </PixelCard>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 16. TABS */}
          {/* ========================================================================= */}
          <section id="component-tabs" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelTabs</h3>
                <PixelBadge variant="warning">NAVIGATION</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("tabs", "tabs")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "tabs" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add tabs
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Tabbed navigation for weapon loadouts, armor slots, and inventory categories.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelTabs
                tabs={[
                  {
                    id: "weapons",
                    label: "WEAPONS",
                    content: (
                      <div className="p-3 bg-(--surface-muted) pixel-border-bevel text-xs flex items-center justify-between">
                        <span>Rune Blade +3</span>
                        <PixelBadge variant="success">ATK +45</PixelBadge>
                      </div>
                    ),
                  },
                  {
                    id: "armor",
                    label: "ARMOR",
                    content: (
                      <div className="p-3 bg-(--surface-muted) pixel-border-bevel text-xs flex items-center justify-between">
                        <span>Dragon Mail</span>
                        <PixelBadge variant="warning">DEF +58</PixelBadge>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 17. ACCORDION */}
          {/* ========================================================================= */}
          <section id="component-accordion" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelAccordion</h3>
                <PixelBadge variant="warning">CODEX</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("accordion", "acc")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "acc" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add accordion
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Collapsible lore codex with keyboard arrows support and smooth chevron rotation.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelAccordion
                defaultOpen={["codex-1"]}
                items={[
                  {
                    id: "codex-1",
                    title: "CHAPTER I: THE WYRM LAIR",
                    content: <p className="text-xs text-[#7B5B49]">Slumbering in volcanic chambers of Mount Cinder.</p>,
                  },
                  {
                    id: "codex-2",
                    title: "CHAPTER II: SUNKEN CITADEL",
                    content: <p className="text-xs text-[#7B5B49]">Ancient deep-sea ruins guarded by leviathans.</p>,
                  },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 18. COLLAPSIBLE */}
          {/* ========================================================================= */}
          <section id="component-collapsible" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelCollapsible</h3>
                <PixelBadge variant="warning">PROGRESSIVE DISCLOSURE</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("collapsible", "col")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "col" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add collapsible
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Compact toggle panel for advanced combat settings and cheat codes.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelCollapsible trigger="ADVANCED COMBAT FORMULAS">
                <p className="text-xs text-[#7B5B49] pt-2">
                  Damage formula: (ATK * 1.5) - (DEF * 0.75) + Elemental Variance.
                </p>
              </PixelCollapsible>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 19. ALERT */}
          {/* ========================================================================= */}
          <section id="component-alert" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelAlert</h3>
                <PixelBadge variant="warning">COMBAT NOTICES</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("alert", "alt")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "alt" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add alert
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Inline battle warnings, raid notices, and server status messages.
            </p>
            <div className="space-y-3 p-4 bg-(--background) pixel-border-bevel">
              <PixelAlert
                variant="warning"
                title="BOSS CHAMBER APPROACHING"
                description="Equip Fire Resistance gear before stepping into the magma floor."
              />
              <PixelAlert
                variant="error"
                title="DUNGEON COLLAPSE IMMINENT"
                description="Only 120 seconds remain to evacuate through the town portal."
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 20. TOAST */}
          {/* ========================================================================= */}
          <section id="component-toast" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelToast</h3>
                <PixelBadge variant="warning">NOTIFICATIONS</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("toast", "tst")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "tst" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add toast
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Toast notifications rendered at the bottom right with audio feedback and auto-dismiss.
            </p>
            <div className="flex flex-wrap gap-2.5 p-4 bg-(--background) pixel-border-bevel">
              <PixelButton
                size="sm"
                variant="primary"
                onClick={() => addToast("Quest Completed", "Dragon Slayer title granted (+500 XP)", "success")}
              >
                Success Toast
              </PixelButton>
              <PixelButton
                size="sm"
                variant="destructive"
                onClick={() => addToast("Direct Hit Taken", "-160 HP from enemy breath", "destructive")}
              >
                Destructive Toast
              </PixelButton>
              <PixelButton
                size="sm"
                variant="outline"
                onClick={() => addToast("Low Mana Warning", "Requires 40 MP to cast Fireball", "warning")}
              >
                Warning Toast
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 21. SPINNER */}
          {/* ========================================================================= */}
          <section id="component-spinner" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelSpinner</h3>
                <PixelBadge variant="warning">8-BIT LOADER</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("spinner", "spn")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "spn" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add spinner
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Authentic 8-block pixel art loading spinner with stepped 8-direction discrete rotation.
            </p>
            <div className="flex items-center justify-around p-4 bg-(--background) pixel-border-bevel">
              <div className="flex flex-col items-center gap-2">
                <PixelSpinner size="sm" />
                <span className="text-[10px]">SM (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PixelSpinner size="md" />
                <span className="text-[10px]">MD (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PixelSpinner size="lg" />
                <span className="text-[10px]">LG (32px)</span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 22. BREADCRUMB */}
          {/* ========================================================================= */}
          <section id="component-breadcrumb" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelBreadcrumb</h3>
                <PixelBadge variant="warning">NAVIGATION</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("breadcrumb", "bc")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "bc" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add breadcrumb
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Hierarchical dungeon and realm path navigation.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelBreadcrumb
                items={[
                  { label: "OVERWORLD", href: "#" },
                  { label: "MOUNT CINDER", href: "#" },
                  { label: "VOLCANIC LAIR" },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 23. PAGINATION */}
          {/* ========================================================================= */}
          <section id="component-pagination" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelPagination</h3>
                <PixelBadge variant="warning">PAGES</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("pagination", "pg")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "pg" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add pagination
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Tactile page controls for quest books, leaderboards, and auction houses.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelPagination
                currentPage={paginationPage}
                totalPages={6}
                onPageChange={(p) => {
                  soundManager.playClick(900);
                  setPaginationPage(p);
                }}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 24. NAVBAR */}
          {/* ========================================================================= */}
          <section id="component-navbar" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelNavbar</h3>
                <PixelBadge variant="warning">GLOBAL HEADER</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("navbar", "nav")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "nav" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add navbar
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Top navigation bar component with responsive actions and brand link.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelNavbar
                logo={<span className="font-bold text-sm text-(--espresso)">ARCADE GUILD</span>}
                items={[
                  { label: "BATTLES", href: "#" },
                  { label: "HEROES", href: "#" },
                  { label: "QUESTS", href: "#" },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 25. SIDEBAR */}
          {/* ========================================================================= */}
          <section id="component-sidebar" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelSidebar</h3>
                <PixelBadge variant="warning">PANEL</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("sidebar", "sb")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "sb" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add sidebar
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Multi-section collapsible sidebar navigation for administrative game consoles.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelSidebar
                variant="inline"
                title="REALM CONSOLE"
                sections={[
                  {
                    title: "GUILD MANAGEMENT",
                    items: [
                      { label: "Active Raids", href: "#", active: true },
                      { label: "Member Roster", href: "#" },
                    ],
                  },
                ]}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 26. COMMAND PALETTE */}
          {/* ========================================================================= */}
          <section id="component-command-palette" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelCommandPalette</h3>
                <PixelBadge variant="warning">KEYBOARD SHORTCUT</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("command-palette", "cp")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "cp" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add command-palette
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Global spellbook and command console triggered with ⌘K or Ctrl+K.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelButton
                variant="outline"
                onClick={() => {
                  soundManager.playCast();
                  setCommandPaletteOpen(true);
                }}
              >
                TRIGGER COMMAND PALETTE [⌘K]
              </PixelButton>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 27. TABLE */}
          {/* ========================================================================= */}
          <section id="component-table" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelTable</h3>
                <PixelBadge variant="warning">DATA GRID</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("table", "tbl")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "tbl" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add table
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Sortable retro data grid with column sorting, hover highlighting, and responsive horizontal scroll.
            </p>
            <div className="p-4 bg-(--background) pixel-border-bevel">
              <PixelTable columns={leaderboardColumns} data={leaderboardData} />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 28. CALENDAR */}
          {/* ========================================================================= */}
          <section id="component-calendar" className={componentCardClass}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-(--espresso)">PixelCalendar</h3>
                <PixelBadge variant="warning">DATE SCHEDULER</PixelBadge>
              </div>
              <button
                type="button"
                onClick={() => copyCli("calendar", "cal")}
                className="text-[10px] text-(--caramel) font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCliId === "cal" ? <Check className="w-3 h-3 text-(--success)" /> : <Copy className="w-3 h-3" />}
                &gt; npx jui add calendar
              </button>
            </div>
            <p className="text-xs text-[#7B5B49]">
              Retro month-grid calendar for raid lockouts, seasonal events, and login streak tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-(--background) pixel-border-bevel">
              <PixelCalendar
                selected={selectedCalendarDate}
                onSelect={(d) => {
                  soundManager.playClick(850);
                  setSelectedCalendarDate(d);
                }}
              />
              <div className="p-3 bg-(--surface-muted) pixel-border-bevel text-xs space-y-1">
                <span className="font-bold text-(--espresso) block">SELECTED EVENT DATE:</span>
                <span className="text-(--caramel) font-bold">
                  {selectedCalendarDate ? selectedCalendarDate.toDateString() : "None"}
                </span>
                <p className="text-[10px] text-[#7B5B49] mt-1">
                  Raid instances reset every Tuesday at dawn.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Global Interactive Forge Dialog */}
      <PixelDialog
        open={forgeDialogOpen}
        onClose={() => setForgeDialogOpen(false)}
        title="ARCANE ENCHANTMENT FORGE"
        description="Select a runestone to fuse into your primary equipment."
      >
        <div className="space-y-4 py-2 text-xs">
          <div className="p-3 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
            <div>
              <span className="font-bold text-(--espresso) block">FIRE RUBY RUNESTONE</span>
              <span className="text-[10px] text-[#7B5B49]">+25 Fire Damage on all attacks</span>
            </div>
            <PixelBadge variant="warning">LVL 4</PixelBadge>
          </div>
          <div className="p-3 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
            <div>
              <span className="font-bold text-(--espresso) block">FROST SAPPHIRE RUNESTONE</span>
              <span className="text-[10px] text-[#7B5B49]">+15% Chance to Freeze target</span>
            </div>
            <PixelBadge variant="success">LVL 3</PixelBadge>
          </div>
        </div>
        <PixelDialogFooter>
          <PixelButton variant="outline" size="sm" onClick={() => setForgeDialogOpen(false)}>
            CANCEL [ESC]
          </PixelButton>
          <PixelButton
            variant="primary"
            size="sm"
            onClick={() => {
              setForgeDialogOpen(false);
              addToast("Forge Complete", "Fire Ruby Runestone fused into weapon!", "success");
            }}
          >
            FUSE RUNESTONE [ENTER]
          </PixelButton>
        </PixelDialogFooter>
      </PixelDialog>

      {/* Global Interactive Backpack Drawer */}
      <PixelDrawer
        open={backpackDrawerOpen}
        onClose={() => setBackpackDrawerOpen(false)}
        side="right"
        title="HERO BACKPACK STORAGE"
        description="Inventory Vault Capacity: 18 / 30 Slots"
      >
        <div className="space-y-3 py-2 text-xs">
          {[
            { name: "Greater Healing Elixir", qty: "x5", type: "Consumable" },
            { name: "Mana Crystal Shard", qty: "x12", type: "Material" },
            { name: "Nether Dragon Scale", qty: "x3", type: "Crafting" },
            { name: "Scroll of Town Portal", qty: "x8", type: "Spell" },
          ].map((item) => (
            <div key={item.name} className="p-2.5 bg-(--surface-muted) pixel-border-bevel flex items-center justify-between">
              <div>
                <span className="font-bold text-(--espresso) block">{item.name}</span>
                <span className="text-[10px] text-[#7B5B49]">{item.type}</span>
              </div>
              <span className="font-bold text-(--caramel)">{item.qty}</span>
            </div>
          ))}
        </div>
        <PixelDrawerFooter>
          <PixelButton variant="outline" size="sm" onClick={() => setBackpackDrawerOpen(false)} className="w-full">
            CLOSE BACKPACK [ESC]
          </PixelButton>
        </PixelDrawerFooter>
      </PixelDrawer>

      {/* Global Interactive Alert Dialog */}
      <PixelAlertDialog
        open={permaDeathAlertOpen}
        onClose={() => setPermaDeathAlertOpen(false)}
        title="PERMADEATH RUN CONFIRMATION"
        description="Entering the Nether Core in Hardcore mode will erase all inventory and save data upon death. Proceed?"
        variant="destructive"
        confirmText="ENTER CORE"
        cancelText="ABORT"
        onConfirm={() => addToast("Hardcore Mode Active", "Entered Nether Core with 0 revives remaining.", "destructive")}
      />

      {/* Global Command Palette */}
      <PixelCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        items={commandItems}
      />

      {/* Main Shared Footer */}
      <Footer />
    </div>
  );
}
