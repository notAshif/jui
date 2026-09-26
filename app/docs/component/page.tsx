"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { soundManager } from "@/lib/sound-effects";

// Modern Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerFooter } from "@/components/ui/drawer";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";
import { Toast, ToastContainer } from "@/components/ui/toast";
import { Tooltip } from "@/components/ui/tooltip";
import { Popover } from "@/components/ui/popover";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible } from "@/components/ui/collapsible";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Navbar } from "@/components/ui/navbar";
import { Sidebar } from "@/components/ui/sidebar";
import { CommandPalette } from "@/components/ui/command-palette";
import { Table } from "@/components/ui/table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

// Pixel Components
import { PixelButton } from "@/components/pixel/button";
import { PixelInput } from "@/components/pixel/input";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardContent, PixelCardFooter } from "@/components/pixel/card";
import { PixelAvatar } from "@/components/pixel/avatar";
import { PixelSeparator } from "@/components/pixel/separator";
import { PixelDialog } from "@/components/pixel/dialog";
import { PixelDrawer } from "@/components/pixel/drawer";
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

import { Logo } from "@/components/logo";
import {
  Sword,
  Shield,
  Heart,
  Zap,
  Sparkles,
  Volume2,
  VolumeX,
  Tv,
  Check,
  Copy,
  Terminal,
  Crosshair,
  Scroll,
  Backpack,
  Compass,
  Flame,
  Search,
  Sun,
  Moon,
  ChevronRight,
  Layers,
  ArrowRight,
  RotateCcw,
  Sliders,
  Code
} from "lucide-react";

type Flavor = "pixel" | "modern";
type Category = "all" | "vitality" | "actions" | "inventory" | "codex" | "alerts" | "navigation" | "systems";

export default function ComponentDocsPage() {
  const [flavor, setFlavor] = useState<Flavor>("pixel");
  const [darkMode, setDarkMode] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Interactive Game State
  const [playerHp, setPlayerHp] = useState(780);
  const [playerMp, setPlayerMp] = useState(340);
  const [bossShield, setBossShield] = useState(65);
  const [gold, setGold] = useState(14850);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal / Overlay States
  const [forgeDialogOpen, setForgeDialogOpen] = useState(false);
  const [backpackDrawerOpen, setBackpackDrawerOpen] = useState(false);
  const [permaDeathAlertOpen, setPermaDeathAlertOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());
  const [codexPage, setCodexPage] = useState(1);
  const [heroName, setHeroName] = useState("Vaelin Ironheart");
  const [heroError, setHeroError] = useState(false);

  // Live Toast Notifications
  interface GameToast {
    id: number;
    title: string;
    description: string;
    variant: "default" | "success" | "warning" | "destructive";
  }
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

  // Keyboard shortcut ⌘K for Command Palette
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

  const copyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    soundManager.playClick(1000);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Combat Handlers
  const handleTakeDamage = () => {
    soundManager.playAlert();
    setPlayerHp((prev) => Math.max(prev - 160, 0));
    addToast("Direct Strike Taken!", "-160 HP from Wyrm Breath", "destructive");
  };

  const handleUsePotion = () => {
    soundManager.playLoot();
    setPlayerHp((prev) => Math.min(prev + 200, 1000));
    setPlayerMp((prev) => Math.min(prev + 120, 500));
    addToast("Elixir Consumed", "+200 HP, +120 MP restored", "success");
  };

  const handleCastSpell = () => {
    if (playerMp < 60) {
      soundManager.playAlert();
      addToast("Insufficient Mana", "Requires 60 MP to cast Inferno Meteor", "warning");
      return;
    }
    setActionLoading(true);
    soundManager.playCast();
    setPlayerMp((prev) => prev - 60);
    setBossShield((prev) => Math.max(prev - 20, 0));
    setTimeout(() => {
      setActionLoading(false);
      soundManager.playLoot();
      addToast("Inferno Meteor Landed!", "Boss Shield reduced by 20%", "success");
    }, 800);
  };

  const commandItems = useMemo(
    () => [
      { id: "1", label: "Fast Travel: Dragon Spine Citadel", description: "Teleport to chapter 3 capital", shortcut: "⌘T", category: "Navigation", onSelect: () => addToast("Fast Travel Initiated", "Departing for Citadel...") },
      { id: "2", label: "Cast: Divine Resurrect", description: "Revive fallen party familiar", shortcut: "⌘R", category: "Magic", onSelect: () => addToast("Resurrect Cast", "Phoenix familiar revived!") },
      { id: "3", label: "Open Enchantment Forge", description: "Modify equipment runestones", shortcut: "⌘F", category: "Inventory", onSelect: () => setForgeDialogOpen(true) },
      { id: "4", label: "Toggle Tactical Stance", description: "Switch between Defense and Offense", shortcut: "⌘S", category: "Combat", onSelect: () => addToast("Stance Swapped", "Now in Berserk Offensive Stance") },
      { id: "5", label: "Open Backpack Storage", description: "Access vault items", shortcut: "⌘B", category: "Inventory", onSelect: () => setBackpackDrawerOpen(true) },
    ],
    [addToast]
  );

  const leaderboardData = [
    { rank: "#1", hero: "Ignis The Bold", guild: "Sunforged Order", level: 99, dps: "142,500", status: "In Raid" },
    { rank: "#2", hero: "Seraphina", guild: "Moonlit Covenant", level: 98, dps: "138,200", status: "Online" },
    { rank: "#3", hero: "Kaelen Shadow", guild: "Abyssal Creed", level: 96, dps: "125,900", status: "In Dungeon" },
    { rank: "#4", hero: "Thorgar Ironfist", guild: "Dwarf Citadel", level: 94, dps: "119,400", status: "Offline" },
    { rank: "#5", hero: "Lyra Whisperwind", guild: "Wildwood Rangers", level: 92, dps: "112,000", status: "Online" },
  ];

  const leaderboardColumns = [
    { key: "rank", header: "Rank", sortable: true },
    { key: "hero", header: "Hero Name", sortable: true },
    { key: "guild", header: "Guild", sortable: true },
    { key: "level", header: "Level", sortable: true },
    { key: "dps", header: "Damage / Sec", sortable: true },
    { key: "status", header: "Status", sortable: true },
  ];

  const categories: { id: Category; label: string; count: number }[] = [
    { id: "all", label: "All 28 Components", count: 28 },
    { id: "vitality", label: "Vitality & HUD", count: 6 },
    { id: "actions", label: "Actions & Spells", count: 4 },
    { id: "inventory", label: "Inventory & Stash", count: 4 },
    { id: "codex", label: "Quest Codex & Lore", count: 4 },
    { id: "alerts", label: "Combat Alerts", count: 3 },
    { id: "navigation", label: "Realm Navigation", count: 4 },
    { id: "systems", label: "Arcane Systems", count: 3 },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (selectedCategory === "all") return true;
    return cat.id === selectedCategory;
  });

  return (
    <div className={`min-h-screen bg-(--background) text-(--foreground) ${flavor === "pixel" ? "font-pixel" : "font-sans"} select-none`}>
      {/* TV Safe-Zone Visualizer Overlay (from /game-ui-design) */}
      {showSafeZone && (
        <div className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-200">
          {/* Action Safe Zone (93%) */}
          <div className="absolute inset-[3.5%] border-2 border-dashed border-amber-500/50 flex flex-col justify-between p-2">
            <span className="text-[10px] text-amber-500 font-mono tracking-widest bg-black/60 px-1 py-0.5 rounded self-start">
              ACTION SAFE (93%)
            </span>
          </div>
          {/* Title Safe Zone (90%) */}
          <div className="absolute inset-[5%] border-2 border-red-500/60 flex flex-col justify-between p-2">
            <span className="text-[10px] text-red-500 font-mono tracking-widest bg-black/70 px-1 py-0.5 rounded self-start">
              TITLE SAFE (90%) - HUD ELEMENTS MUST SIT HERE
            </span>
            <span className="text-[10px] text-red-500 font-mono tracking-widest bg-black/70 px-1 py-0.5 rounded self-end">
              OVERSCAN PROTECTED
            </span>
          </div>
        </div>
      )}

      {/* Floating Game Toasts Container */}
      {flavor === "pixel" ? (
        <PixelToastContainer>
          {toasts.map((t) => (
            <PixelToast key={t.id} title={t.title} description={t.description} variant={t.variant} />
          ))}
        </PixelToastContainer>
      ) : (
        <ToastContainer>
          {toasts.map((t) => (
            <Toast key={t.id} title={t.title} description={t.description} variant={t.variant} />
          ))}
        </ToastContainer>
      )}

      {/* Top HUD Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-(--surface-card)/90 border-b-2 border-(--espresso)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo size={32} />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-wider text-(--espresso)">JUI DOCS</span>
                <span className="text-[9px] uppercase tracking-widest text-(--caramel)">Interactive Component Deck</span>
              </div>
            </Link>
          </div>

          {/* Quick HUD Center Controls: Flavor & Sound & SafeZone */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Aesthetic Flavor Switcher */}
            <div className="flex items-center bg-(--surface-muted) p-1 rounded-lg border border-(--border)">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick(750);
                  setFlavor("pixel");
                }}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  flavor === "pixel"
                    ? "bg-(--caramel) text-(--cream) pixel-btn-bevel shadow-xs"
                    : "text-(--foreground/70) hover:text-(--foreground)"
                }`}
              >
                [16-Bit Pixel]
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick(900);
                  setFlavor("modern");
                }}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  flavor === "modern"
                    ? "bg-(--caramel) text-(--cream) rounded-md shadow-xs"
                    : "text-(--foreground/70) hover:text-(--foreground)"
                }`}
              >
                [Modern Tactical]
              </button>
            </div>

            {/* TV Safe Zone Visualizer Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick(500);
                setShowSafeZone(!showSafeZone);
              }}
              title="Toggle 90% TV Title-Safe & 93% Action-Safe Grid"
              className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
                showSafeZone
                  ? "bg-(--warning)/20 border-(--warning) text-(--warning-foreground)"
                  : "bg-(--surface-card) border-(--border) text-(--foreground/70) hover:bg-(--surface-muted)"
              }`}
            >
              <Tv className="w-4 h-4" />
              <span className="hidden xl:inline">Safe Zone</span>
            </button>

            {/* SFX Audio Synthesizer Toggle */}
            <button
              type="button"
              onClick={toggleSfx}
              title={sfxEnabled ? "Mute Web Audio SFX" : "Enable Web Audio SFX"}
              className="p-2 rounded-lg border border-(--border) bg-(--surface-card) hover:bg-(--surface-muted) transition-colors cursor-pointer flex items-center gap-1.5 text-xs text-(--foreground/80)"
            >
              {sfxEnabled ? <Volume2 className="w-4 h-4 text-(--success)" /> : <VolumeX className="w-4 h-4 text-(--destructive)" />}
              <span className="hidden xl:inline">{sfxEnabled ? "SFX On" : "SFX Muted"}</span>
            </button>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playCast();
                setCommandPaletteOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-(--surface-muted) hover:bg-(--surface-card) border border-(--border) rounded-md text-(--foreground/70) cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Spellbook / Console</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-(--cream) text-(--espresso) rounded border border-(--border-strong) font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-(--border) bg-(--surface-card) hover:bg-(--surface-muted) text-(--espresso) cursor-pointer"
              aria-label="Toggle Parchment/Campfire theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#D9965B]" /> : <Moon className="w-4 h-4 text-(--cinnamon)" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Showcase Deck */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero Section Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-(--surface-card) border-2 border-(--espresso) p-6 sm:p-10 shadow-lg">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-(--caramel)/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-(--caramel) text-(--cream) rounded">
                  Dual-Aesthetic System
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-(--cream-dark) text-(--espresso) rounded border border-(--border)">
                  28 Components • Live Playground
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--espresso) text-balance">
                Game UI & Modern Primitives Showcase
              </h1>
              <p className="text-sm sm:text-base text-(--foreground/80) leading-relaxed text-pretty">
                Every component engineered with Apple fluid physical motion, tactile 3D pixel bevel press mechanics, 100% keyboard accessibility, and authentic RPG gameplay scenarios.
              </p>

              {/* Gamepad Navigation Cues Banner (from /game-ui-design) */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-(--foreground/70)">
                <span className="text-[11px] font-semibold text-(--caramel)">CONTROLLER / KEYBOARD:</span>
                <span className="px-2 py-0.5 bg-(--surface-muted) border border-(--border) rounded font-mono text-[10px]">[TAB] Target</span>
                <span className="px-2 py-0.5 bg-(--surface-muted) border border-(--border) rounded font-mono text-[10px]">[ENTER] Interact</span>
                <span className="px-2 py-0.5 bg-(--surface-muted) border border-(--border) rounded font-mono text-[10px]">[ESC] Dismiss</span>
                <span className="px-2 py-0.5 bg-(--surface-muted) border border-(--border) rounded font-mono text-[10px]">[⌘K] Command Deck</span>
              </div>
            </div>

            {/* Live Interactive Hero Vitals Monitor */}
            <div className="w-full md:w-80 bg-(--surface-muted) p-4 rounded-xl border-2 border-(--border-strong) space-y-3">
              <div className="flex items-center justify-between text-xs font-bold tracking-wider">
                <span className="flex items-center gap-1.5 text-(--espresso)">
                  <Heart className="w-3.5 h-3.5 text-(--destructive)" /> PLAYER VITALS
                </span>
                <span className="tabular-nums text-(--caramel)">LVL 85 PALADIN</span>
              </div>

              {flavor === "pixel" ? (
                <>
                  <PixelProgressBar value={playerHp} max={1000} size="sm" variant={playerHp < 300 ? "destructive" : "success"} showLabel label="Health Points (HP)" />
                  <PixelProgressBar value={playerMp} max={500} size="sm" variant="default" showLabel label="Mana Pool (MP)" />
                </>
              ) : (
                <>
                  <ProgressBar value={playerHp} max={1000} size="sm" variant={playerHp < 300 ? "destructive" : "success"} showLabel label="Health Points (HP)" />
                  <ProgressBar value={playerMp} max={500} size="sm" variant="default" showLabel label="Mana Pool (MP)" />
                </>
              )}

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleTakeDamage}
                  className="px-2 py-1.5 text-[11px] font-semibold bg-(--destructive)/15 text-(--destructive) hover:bg-(--destructive)/25 rounded border border-(--destructive)/40 transition-colors cursor-pointer active:scale-95 text-center"
                >
                  ⚡ Take Hit (-160)
                </button>
                <button
                  type="button"
                  onClick={handleUsePotion}
                  className="px-2 py-1.5 text-[11px] font-semibold bg-(--success)/15 text-(--success) hover:bg-(--success)/25 rounded border border-(--success)/40 transition-colors cursor-pointer active:scale-95 text-center"
                >
                  🧪 Drink Potion
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-(--border-strong) pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundManager.playClick(650);
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-(--espresso) text-(--cream) shadow-xs"
                    : "bg-(--surface-card) text-(--foreground/70) hover:text-(--foreground) border border-(--border)"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-(--foreground/60)">Aesthetic Mode:</span>
            <span className="text-xs font-bold uppercase text-(--caramel)">
              {flavor === "pixel" ? "16-Bit Pixel RPG" : "Modern SaaS / Tactical"}
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TIER 1: VITALITY & COMBAT HUD (Progress, Avatar, Badge, Tooltip, Spinner, Skeleton) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "vitality") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-(--destructive)" /> [VITALITY & COMBAT HUD]
              </h2>
              <span className="text-xs text-(--foreground/60)">6 Core Primitives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. ProgressBar */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">1. Progress Bar</h3>
                  <Badge variant="outline">HP / MP / Boss Shield</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Diegetic health, mana, and boss shield bars with dynamic variant coloring and tabular numerals.
                </p>

                <div className="space-y-3 p-3 bg-(--surface-muted) rounded-lg">
                  {flavor === "pixel" ? (
                    <>
                      <PixelProgressBar value={playerHp} max={1000} size="md" variant={playerHp < 300 ? "destructive" : "success"} showLabel label="Health (HP)" />
                      <PixelProgressBar value={playerMp} max={500} size="md" variant="default" showLabel label="Arcane Mana (MP)" />
                      <PixelProgressBar value={bossShield} max={100} size="md" variant="warning" showLabel label="Dragon Kinetic Shield" />
                    </>
                  ) : (
                    <>
                      <ProgressBar value={playerHp} max={1000} size="md" variant={playerHp < 300 ? "destructive" : "success"} showLabel label="Health (HP)" />
                      <ProgressBar value={playerMp} max={500} size="md" variant="default" showLabel label="Arcane Mana (MP)" />
                      <ProgressBar value={bossShield} max={100} size="md" variant="warning" showLabel label="Dragon Kinetic Shield" />
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-(--foreground/60)">Test Interactive Vitals:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleTakeDamage}
                      className="px-2 py-1 text-[11px] bg-(--destructive)/10 text-(--destructive) rounded hover:bg-(--destructive)/25 cursor-pointer font-medium"
                    >
                      Damage
                    </button>
                    <button
                      type="button"
                      onClick={handleUsePotion}
                      className="px-2 py-1 text-[11px] bg-(--success)/10 text-(--success) rounded hover:bg-(--success)/25 cursor-pointer font-medium"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Avatar */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">2. Avatar</h3>
                  <Badge variant="outline">Character Portraits</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Party portraits with image fallback initials, 1px depth outline, and status presence indicators.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg flex items-center justify-around">
                  {flavor === "pixel" ? (
                    <>
                      <div className="flex flex-col items-center gap-1.5">
                        <PixelAvatar fallback="VI" size="lg" />
                        <span className="text-[10px] text-(--foreground/80)">Paladin</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <PixelAvatar fallback="PX" size="md" />
                        <span className="text-[10px] text-(--foreground/80)">Phoenix</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <PixelAvatar fallback="WY" size="sm" />
                        <span className="text-[10px] text-(--foreground/80)">Wyrm</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-1.5">
                        <Avatar fallback="VI" size="lg" />
                        <span className="text-[10px] text-(--foreground/80)">Paladin</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Avatar fallback="PX" size="md" />
                        <span className="text-[10px] text-(--foreground/80)">Phoenix</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Avatar fallback="WY" size="sm" />
                        <span className="text-[10px] text-(--foreground/80)">Wyrm</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-[11px] text-(--foreground/60) flex justify-between">
                  <span>Sizes: lg (56px), md (40px), sm (32px)</span>
                  <span className="text-(--success) font-semibold">● 3 Party Ready</span>
                </div>
              </div>

              {/* 3. Badge */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">3. Badge</h3>
                  <Badge variant="outline">Rarity & Buffs</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Equipment rarity tiers, combat level tags, and active elemental aura badges.
                </p>

                <div className="p-3 bg-(--surface-muted) rounded-lg flex flex-wrap gap-2 items-center">
                  {flavor === "pixel" ? (
                    <>
                      <PixelBadge variant="default">LEGENDARY</PixelBadge>
                      <PixelBadge variant="secondary">LVL 85</PixelBadge>
                      <PixelBadge variant="success">HEALED +45</PixelBadge>
                      <PixelBadge variant="warning">SHIELDED</PixelBadge>
                      <PixelBadge variant="destructive">POISONED</PixelBadge>
                      <PixelBadge variant="outline">QUEST ITEM</PixelBadge>
                    </>
                  ) : (
                    <>
                      <Badge variant="default">Legendary Tier</Badge>
                      <Badge variant="secondary">LVL 85</Badge>
                      <Badge variant="success">Regen +45</Badge>
                      <Badge variant="warning">Shielded</Badge>
                      <Badge variant="destructive">Poisoned</Badge>
                      <Badge variant="outline">Quest Item</Badge>
                    </>
                  )}
                </div>

                <div className="text-[11px] text-(--foreground/60)">
                  <span>Variants: default (caramel), secondary, success, warning, destructive, outline.</span>
                </div>
              </div>

              {/* 4. Tooltip */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">4. Tooltip</h3>
                  <Badge variant="outline">Spell & Item Lore</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Hover or focus triggers informative lore popouts with delay duration and directional positioning.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg flex flex-wrap justify-around items-center gap-3">
                  {flavor === "pixel" ? (
                    <>
                      <PixelTooltip content="Excalibur +5: Deals 1,200 Holy Damage" side="top">
                        <PixelButton size="sm" variant="secondary">
                          <Sword className="w-3.5 h-3.5 mr-1" /> Inspect Sword
                        </PixelButton>
                      </PixelTooltip>
                      <PixelTooltip content="Aegis of Dawn: 45% Fire Resistance" side="bottom">
                        <PixelButton size="sm" variant="outline">
                          <Shield className="w-3.5 h-3.5 mr-1" /> Inspect Shield
                        </PixelButton>
                      </PixelTooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip content="Excalibur +5: Deals 1,200 Holy Damage" side="top">
                        <Button size="sm" variant="secondary">
                          <Sword className="w-3.5 h-3.5 mr-1" /> Inspect Sword
                        </Button>
                      </Tooltip>
                      <Tooltip content="Aegis of Dawn: 45% Fire Resistance" side="bottom">
                        <Button size="sm" variant="outline">
                          <Shield className="w-3.5 h-3.5 mr-1" /> Inspect Shield
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </div>

                <span className="text-[11px] text-(--foreground/60) block">
                  Hover or tab-focus to preview equipment stats & lore.
                </span>
              </div>

              {/* 5. Spinner */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">5. Spinner</h3>
                  <Badge variant="outline">Summoning Glyphs</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Accessible loading indicator with screen-reader text and motion-safe spin animation.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg flex items-center justify-around">
                  {flavor === "pixel" ? (
                    <>
                      <div className="flex flex-col items-center gap-1">
                        <PixelSpinner size="sm" />
                        <span className="text-[10px] text-(--foreground/70)">Buffering</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <PixelSpinner size="md" />
                        <span className="text-[10px] text-(--foreground/70)">Summoning</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <PixelSpinner size="lg" />
                        <span className="text-[10px] text-(--foreground/70)">Portal</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-1">
                        <Spinner size="sm" />
                        <span className="text-[10px] text-(--foreground/70)">Buffering</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Spinner size="md" />
                        <span className="text-[10px] text-(--foreground/70)">Summoning</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Spinner size="lg" />
                        <span className="text-[10px] text-(--foreground/70)">Portal</span>
                      </div>
                    </>
                  )}
                </div>

                <span className="text-[11px] text-(--foreground/60) block">
                  Sizes: sm (16px), md (24px), lg (32px).
                </span>
              </div>

              {/* 6. Skeleton */}
              <div className="bg-(--surface-card) p-5 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">6. Skeleton</h3>
                  <Badge variant="outline">Loot Chest Wireframe</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Content loading placeholders that prevent layout shifts when fetching dungeon instances.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-2.5">
                  {flavor === "pixel" ? (
                    <>
                      <div className="flex items-center gap-3">
                        <PixelSkeleton className="w-10 h-10 shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <PixelSkeleton className="h-3 w-3/4" />
                          <PixelSkeleton className="h-2 w-1/2" />
                        </div>
                      </div>
                      <PixelSkeleton className="h-4 w-full" />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <Skeleton className="h-3 w-3/4" />
                          <Skeleton className="h-2 w-1/2" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full" />
                    </>
                  )}
                </div>

                <span className="text-[11px] text-(--foreground/60) block">
                  Smooth pulse animation matching earthy surface tokens.
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 2: TACTILE ACTIONS & SPELLS (Button, DropdownMenu, Popover, Separator) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "actions") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Sword className="w-5 h-5 text-(--caramel)" /> [TACTILE ACTIONS & ACTION BAR]
              </h2>
              <span className="text-xs text-(--foreground/60)">4 Action Primitives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 7. Button */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">7. Button (Tactile 0.96 & 3D Bevel)</h3>
                  <Badge variant="default">All Variants & Sizes</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  High-frequency interactive controls with tactile press mechanics (0.96 scale for modern, 2px down-right stepped translation for pixel).
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {flavor === "pixel" ? (
                      <>
                        <PixelButton onClick={() => soundManager.playClick(900)}>Attack (Primary)</PixelButton>
                        <PixelButton variant="secondary" onClick={() => soundManager.playClick(600)}>Defend</PixelButton>
                        <PixelButton variant="destructive" onClick={() => soundManager.playAlert()}>Flee Battle</PixelButton>
                        <PixelButton variant="outline" onClick={() => soundManager.playClick(800)}>Inspect</PixelButton>
                        <PixelButton variant="ghost" onClick={() => soundManager.playClick(1000)}>Quick Stash</PixelButton>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => soundManager.playClick(900)}>Attack (Primary)</Button>
                        <Button variant="secondary" onClick={() => soundManager.playClick(600)}>Defend</Button>
                        <Button variant="destructive" onClick={() => soundManager.playAlert()}>Flee Battle</Button>
                        <Button variant="outline" onClick={() => soundManager.playClick(800)}>Inspect</Button>
                        <Button variant="ghost" onClick={() => soundManager.playClick(1000)}>Quick Stash</Button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {flavor === "pixel" ? (
                      <>
                        <PixelButton size="sm" onClick={handleCastSpell} loading={actionLoading}>
                          <Sparkles className="w-3.5 h-3.5 mr-1" /> Cast Spell
                        </PixelButton>
                        <PixelButton size="lg" variant="primary" onClick={() => soundManager.playEquip()}>
                          Equip Gear (lg)
                        </PixelButton>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={handleCastSpell} loading={actionLoading}>
                          <Sparkles className="w-3.5 h-3.5 mr-1" /> Cast Spell
                        </Button>
                        <Button size="lg" variant="primary" onClick={() => soundManager.playEquip()}>
                          Equip Gear (lg)
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-(--foreground/60) flex justify-between">
                  <span>Press feedback: active:scale-[0.96] / pixel-btn-bevel</span>
                  <span className="text-(--caramel) font-semibold">Instant Web Audio Click</span>
                </div>
              </div>

              {/* 8. DropdownMenu & 9. Popover & 10. Separator */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">8, 9, 10. Dropdown, Popover & Separator</h3>
                  <Badge variant="outline">Tactics & Stats</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Dropdown menus for battle tactics, popovers for critical stat breakdowns, and semantic separators.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {flavor === "pixel" ? (
                      <>
                        <PixelDropdownMenu
                          trigger={
                            <PixelButton variant="secondary" size="md">
                              <Sliders className="w-3.5 h-3.5 mr-1.5" /> Battle Tactics ▼
                            </PixelButton>
                          }
                          items={[
                            { label: "Aggressive Rush (+25% ATK)", onClick: () => addToast("Tactics Changed", "Switched to Aggressive Rush") },
                            { label: "Balanced Stance (Standard)", checked: true, onClick: () => addToast("Tactics Changed", "Switched to Balanced Stance") },
                            { label: "Guardian Wall (+40% DEF)", onClick: () => addToast("Tactics Changed", "Switched to Guardian Wall") },
                            { label: "Tactical Retreat", destructive: true, onClick: () => addToast("Retreat Initiated", "Falling back to campfire", "warning") },
                          ]}
                        />

                        <PixelPopover
                          align="center"
                          content={
                            <div className="space-y-2 text-xs">
                              <h4 className="font-bold text-(--espresso) uppercase tracking-wider">Combat Stats Breakdown</h4>
                              <div className="flex justify-between border-b border-(--border) pb-1">
                                <span className="text-(--foreground/70)">Critical Hit Rate:</span>
                                <span className="font-semibold tabular-nums text-(--caramel)">34.2%</span>
                              </div>
                              <div className="flex justify-between border-b border-(--border) pb-1">
                                <span className="text-(--foreground/70)">Armor Penetration:</span>
                                <span className="font-semibold tabular-nums text-(--caramel)">+68</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-(--foreground/70)">Elemental Resistance:</span>
                                <span className="font-semibold tabular-nums text-(--success)">55% Fire / 20% Frost</span>
                              </div>
                            </div>
                          }
                        >
                          <PixelButton variant="outline" size="md">
                            <Crosshair className="w-3.5 h-3.5 mr-1.5" /> View Stat Popover
                          </PixelButton>
                        </PixelPopover>
                      </>
                    ) : (
                      <>
                        <DropdownMenu
                          trigger={
                            <Button variant="secondary" size="md">
                              <Sliders className="w-3.5 h-3.5 mr-1.5" /> Battle Tactics ▼
                            </Button>
                          }
                          items={[
                            { label: "Aggressive Rush (+25% ATK)", onClick: () => addToast("Tactics Changed", "Switched to Aggressive Rush") },
                            { label: "Balanced Stance (Standard)", checked: true, onClick: () => addToast("Tactics Changed", "Switched to Balanced Stance") },
                            { label: "Guardian Wall (+40% DEF)", onClick: () => addToast("Tactics Changed", "Switched to Guardian Wall") },
                            { label: "Tactical Retreat", destructive: true, onClick: () => addToast("Retreat Initiated", "Falling back to campfire", "warning") },
                          ]}
                        />

                        <Popover
                          align="center"
                          content={
                            <div className="space-y-2 text-xs">
                              <h4 className="font-semibold text-(--espresso)">Combat Stats Breakdown</h4>
                              <div className="flex justify-between border-b border-(--border) pb-1">
                                <span className="text-(--foreground/70)">Critical Hit Rate:</span>
                                <span className="font-medium tabular-nums text-(--caramel)">34.2%</span>
                              </div>
                              <div className="flex justify-between border-b border-(--border) pb-1">
                                <span className="text-(--foreground/70)">Armor Penetration:</span>
                                <span className="font-medium tabular-nums text-(--caramel)">+68</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-(--foreground/70)">Elemental Resistance:</span>
                                <span className="font-medium tabular-nums text-(--success)">55% Fire / 20% Frost</span>
                              </div>
                            </div>
                          }
                        >
                          <Button variant="outline" size="md">
                            <Crosshair className="w-3.5 h-3.5 mr-1.5" /> View Stat Popover
                          </Button>
                        </Popover>
                      </>
                    )}
                  </div>

                  {/* 10. Separator */}
                  <div className="pt-2">
                    <span className="text-[10px] text-(--foreground/60) block mb-1.5 uppercase tracking-wider">
                      Separator Primitive:
                    </span>
                    {flavor === "pixel" ? <PixelSeparator /> : <Separator />}
                  </div>
                </div>

                <div className="text-[11px] text-(--foreground/60)">
                  <span>Accessible keyboard focus trapping & click-outside listeners.</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 3: INVENTORY & STASH MATRIX (Card, Dialog, Drawer, EmptyState) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "inventory") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Backpack className="w-5 h-5 text-(--cinnamon)" /> [INVENTORY & STASH MATRIX]
              </h2>
              <span className="text-xs text-(--foreground/60)">4 Storage Primitives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 11. Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">11. Card (Item Display)</h3>
                  <Badge variant="default">Equip Slot</Badge>
                </div>
                {flavor === "pixel" ? (
                  <PixelCard>
                    <PixelCardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <PixelCardTitle>Sunforged Claymore +4</PixelCardTitle>
                          <PixelCardDescription>Two-Handed Holy Greatsword</PixelCardDescription>
                        </div>
                        <PixelBadge variant="default">LEGENDARY</PixelBadge>
                      </div>
                    </PixelCardHeader>
                    <PixelCardContent>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Physical Attack:</span>
                          <span className="font-bold tabular-nums text-(--caramel)">+850 DMG</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Holy Smite Proc:</span>
                          <span className="font-bold tabular-nums text-(--warning)">24% Chance</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Durability:</span>
                          <span className="font-bold tabular-nums">98 / 100</span>
                        </div>
                      </div>
                    </PixelCardContent>
                    <PixelCardFooter>
                      <div className="flex gap-2 w-full">
                        <PixelButton size="sm" variant="secondary" className="flex-1" onClick={() => setForgeDialogOpen(true)}>
                          Infuse Runes
                        </PixelButton>
                        <PixelButton size="sm" className="flex-1" onClick={() => addToast("Item Equipped", "Sunforged Claymore bound to Main Hand", "success")}>
                          Equip Weapon
                        </PixelButton>
                      </div>
                    </PixelCardFooter>
                  </PixelCard>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Sunforged Claymore +4</CardTitle>
                          <CardDescription>Two-Handed Holy Greatsword</CardDescription>
                        </div>
                        <Badge variant="default">Legendary</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Physical Attack:</span>
                          <span className="font-semibold tabular-nums text-(--caramel)">+850 DMG</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Holy Smite Proc:</span>
                          <span className="font-semibold tabular-nums text-(--warning)">24% Chance</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--foreground/70)">Durability:</span>
                          <span className="font-semibold tabular-nums">98 / 100</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button size="sm" variant="secondary" className="flex-1" onClick={() => setForgeDialogOpen(true)}>
                          Infuse Runes
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => addToast("Item Equipped", "Sunforged Claymore bound to Main Hand", "success")}>
                          Equip Weapon
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>

              {/* 12. Dialog & 13. Drawer Triggers */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">12 & 13. Dialog & Drawer</h3>
                  <Badge variant="outline">Modal & Stash Sheet</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Focused dialogs for enchantment forges, and side-sheet drawers for inspecting hero equipment bags.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  {flavor === "pixel" ? (
                    <>
                      <PixelButton
                        variant="primary"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playEquip();
                          setForgeDialogOpen(true);
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" /> Open Arcane Forge (Dialog)
                      </PixelButton>

                      <PixelButton
                        variant="secondary"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playClick(700);
                          setBackpackDrawerOpen(true);
                        }}
                      >
                        <Backpack className="w-4 h-4 mr-2" /> Open Adventurer's Stash (Drawer)
                      </PixelButton>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playEquip();
                          setForgeDialogOpen(true);
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" /> Open Arcane Forge (Dialog)
                      </Button>

                      <Button
                        variant="secondary"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playClick(700);
                          setBackpackDrawerOpen(true);
                        }}
                      >
                        <Backpack className="w-4 h-4 mr-2" /> Open Adventurer's Stash (Drawer)
                      </Button>
                    </>
                  )}
                </div>

                <div className="text-[11px] text-(--foreground/60)">
                  <span>Full Escape key listener, body overflow lock, and focus restore.</span>
                </div>
              </div>

              {/* 14. EmptyState */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">14. Empty State</h3>
                  <Badge variant="outline">Loot Chest Status</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Graceful empty notifications when inventory slots or dungeon chests have been looted.
                </p>

                <div className="p-2 bg-(--surface-muted) rounded-lg">
                  {flavor === "pixel" ? (
                    <PixelEmptyState
                      icon={<Scroll className="w-10 h-10 text-(--cinnamon)" />}
                      title="No Relics Discovered"
                      description="This crypt altar has been cleared. Slay the Abyssal Guardian to unseal treasure."
                      action={
                        <PixelButton size="sm" onClick={() => addToast("Dungeon Key Forged", "Proceeding to Depth 4...")}>
                          Craft Dungeon Key
                        </PixelButton>
                      }
                    />
                  ) : (
                    <EmptyState
                      icon={<Scroll className="w-10 h-10 text-(--cinnamon)" />}
                      title="No Relics Discovered"
                      description="This crypt altar has been cleared. Slay the Abyssal Guardian to unseal treasure."
                      action={
                        <Button size="sm" onClick={() => addToast("Dungeon Key Forged", "Proceeding to Depth 4...")}>
                          Craft Dungeon Key
                        </Button>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 4: QUEST CODEX & LORE ARCHIVES (Tabs, Accordion, Collapsible, Table) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "codex") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Scroll className="w-5 h-5 text-(--warning)" /> [QUEST CODEX & LORE ARCHIVES]
              </h2>
              <span className="text-xs text-(--foreground/60)">4 Organization Primitives</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 15. Tabs & 16. Accordion */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">15 & 16. Tabs & Accordion (Quest Log)</h3>
                  <Badge variant="outline">Chapter Objectives</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Nested tab categories and multi-expandable chapter accordions for quest tracking.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-4">
                  {flavor === "pixel" ? (
                    <PixelTabs
                      tabs={[
                        {
                          id: "main",
                          label: "Main Quests",
                          content: (
                            <PixelAccordion
                              items={[
                                {
                                  id: "act-1",
                                  title: "Act I: Siege of the Ember Keep",
                                  content: "Infiltrate the outer ramparts, disable 3 ballistas, and defeat General Malakor. Rewards: 3,500 XP, 400 Gold.",
                                },
                                {
                                  id: "act-2",
                                  title: "Act II: Lair of the Frost Wyrm",
                                  content: "Traverse the frozen chasm, acquire the Flame Crest relic, and survive the blizzard storm. Rewards: Wyrm Scale Shield.",
                                },
                                {
                                  id: "act-3",
                                  title: "Act III: The Eclipse Throne",
                                  content: "Ascend the citadel tower and challenge the Shadow Emperor. Rewards: Title of Sun Champion.",
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          id: "bounties",
                          label: "Guild Bounties",
                          content: (
                            <div className="p-3 text-xs space-y-2">
                              <p className="font-bold text-(--espresso)">Bounty Target: Bloodfang Werewolf</p>
                              <p className="text-(--foreground/80)">Last seen roaming the Western Woodlands during midnight cycle.</p>
                              <PixelButton size="sm" onClick={() => addToast("Bounty Accepted", "Track the beast in the Western Woodlands")}>
                                Accept Bounty
                              </PixelButton>
                            </div>
                          ),
                        },
                        {
                          id: "lore",
                          label: "Bestiary Lore",
                          content: (
                            <div className="p-3 text-xs space-y-1.5 text-(--foreground/80)">
                              <p className="font-bold text-(--caramel)">Ancient Wyrms of Caldera</p>
                              <p>Fire drakes bred during the First Age of Ash. Immune to burning, vulnerable to divine radiance.</p>
                            </div>
                          ),
                        },
                      ]}
                    />
                  ) : (
                    <Tabs
                      tabs={[
                        {
                          id: "main",
                          label: "Main Quests",
                          content: (
                            <Accordion
                              items={[
                                {
                                  id: "act-1",
                                  title: "Act I: Siege of the Ember Keep",
                                  content: "Infiltrate the outer ramparts, disable 3 ballistas, and defeat General Malakor. Rewards: 3,500 XP, 400 Gold.",
                                },
                                {
                                  id: "act-2",
                                  title: "Act II: Lair of the Frost Wyrm",
                                  content: "Traverse the frozen chasm, acquire the Flame Crest relic, and survive the blizzard storm. Rewards: Wyrm Scale Shield.",
                                },
                                {
                                  id: "act-3",
                                  title: "Act III: The Eclipse Throne",
                                  content: "Ascend the citadel tower and challenge the Shadow Emperor. Rewards: Title of Sun Champion.",
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          id: "bounties",
                          label: "Guild Bounties",
                          content: (
                            <div className="p-3 text-xs space-y-2">
                              <p className="font-semibold text-(--espresso)">Bounty Target: Bloodfang Werewolf</p>
                              <p className="text-(--foreground/80)">Last seen roaming the Western Woodlands during midnight cycle.</p>
                              <Button size="sm" onClick={() => addToast("Bounty Accepted", "Track the beast in the Western Woodlands")}>
                                Accept Bounty
                              </Button>
                            </div>
                          ),
                        },
                        {
                          id: "lore",
                          label: "Bestiary Lore",
                          content: (
                            <div className="p-3 text-xs space-y-1.5 text-(--foreground/80)">
                              <p className="font-semibold text-(--caramel)">Ancient Wyrms of Caldera</p>
                              <p>Fire drakes bred during the First Age of Ash. Immune to burning, vulnerable to divine radiance.</p>
                            </div>
                          ),
                        },
                      ]}
                    />
                  )}
                </div>
              </div>

              {/* 17. Collapsible & 18. Table */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">17 & 18. Collapsible & Leaderboard Table</h3>
                  <Badge variant="outline">Guild Hall of Fame</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Collapsible dungeon room puzzles, and sorted data tables for realm leaderboards.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-4">
                  {/* Collapsible Secret Clue */}
                  {flavor === "pixel" ? (
                    <PixelCollapsible
                      trigger="Secret Crypt Chamber Puzzle (Click to Reveal Hint)"
                      content={
                        <p className="text-xs text-(--foreground/80) leading-relaxed">
                          Light the torches in order: Lion, Eagle, Serpent, Drake. The stone gate will slide open for 30 seconds.
                        </p>
                      }
                    />
                  ) : (
                    <Collapsible
                      trigger="Secret Crypt Chamber Puzzle (Click to Reveal Hint)"
                      content={
                        <p className="text-xs text-(--foreground/80) leading-relaxed">
                          Light the torches in order: Lion, Eagle, Serpent, Drake. The stone gate will slide open for 30 seconds.
                        </p>
                      }
                    />
                  )}

                  {/* Leaderboard Table */}
                  <div className="overflow-x-auto">
                    {flavor === "pixel" ? (
                      <PixelTable columns={leaderboardColumns} data={leaderboardData} />
                    ) : (
                      <Table columns={leaderboardColumns} data={leaderboardData} />
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-(--foreground/60) flex justify-between">
                  <span>Accessible table markup with sorting and keyboard tab stops.</span>
                  <span className="text-(--caramel) font-semibold">5 High-Rank Champions</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 5: BATTLE ALERTS & SAVE SYSTEM (Alert, AlertDialog, Toast) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "alerts") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-(--destructive)" /> [BATTLE ALERTS & SAVE VERIFICATION]
              </h2>
              <span className="text-xs text-(--foreground/60)">3 Notification Primitives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 19. Alert */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">19. Alert (Environmental & Hazards)</h3>
                  <Badge variant="outline">Live Status</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Atmospheric environmental hazard warnings and combat status updates across info, warning, error, and success variants.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  {flavor === "pixel" ? (
                    <>
                      <PixelAlert
                        variant="error"
                        title="Critical Boss Rage Meter (95%)"
                        description="Ancient Wyrm is charging apocalyptic Hellfire Breath. Seek stone pillar cover immediately!"
                      />
                      <PixelAlert
                        variant="warning"
                        title="Environmental Hazard: Toxic Miasma"
                        description="All active player healing is suppressed by 50% until cleansing altar is activated."
                      />
                      <PixelAlert
                        variant="success"
                        title="Sanctuary Aura Active"
                        description="Inside campfire perimeter: Mana and Stamina regeneration accelerated by +100%."
                      />
                    </>
                  ) : (
                    <>
                      <Alert
                        variant="error"
                        title="Critical Boss Rage Meter (95%)"
                        description="Ancient Wyrm is charging apocalyptic Hellfire Breath. Seek stone pillar cover immediately!"
                      />
                      <Alert
                        variant="warning"
                        title="Environmental Hazard: Toxic Miasma"
                        description="All active player healing is suppressed by 50% until cleansing altar is activated."
                      />
                      <Alert
                        variant="success"
                        title="Sanctuary Aura Active"
                        description="Inside campfire perimeter: Mana and Stamina regeneration accelerated by +100%."
                      />
                    </>
                  )}
                </div>
              </div>

              {/* 20. AlertDialog & 21. Toast */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">20 & 21. Alert Dialog & Toast System</h3>
                  <Badge variant="destructive">Critical Risk Actions</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Irreversible confirmation dialogs for perma-death and save file overwrites, plus live toast triggers.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-(--espresso) block">
                      Trigger Perma-Death Confirmation (AlertDialog):
                    </span>
                    {flavor === "pixel" ? (
                      <PixelButton
                        variant="destructive"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playAlert();
                          setPermaDeathAlertOpen(true);
                        }}
                      >
                        ⚠️ Enter Hardcore Perma-Death Rift
                      </PixelButton>
                    ) : (
                      <Button
                        variant="destructive"
                        className="w-full justify-center"
                        onClick={() => {
                          soundManager.playAlert();
                          setPermaDeathAlertOpen(true);
                        }}
                      >
                        ⚠️ Enter Hardcore Perma-Death Rift
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-(--espresso) block">
                      Trigger Live Game Notification Toasts:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {flavor === "pixel" ? (
                        <>
                          <PixelButton size="sm" variant="secondary" onClick={() => addToast("Quest Complete!", "+2,500 XP and Dragon Scale Armor unlocked", "success")}>
                            🎉 Loot Toast
                          </PixelButton>
                          <PixelButton size="sm" variant="secondary" onClick={() => addToast("Trap Triggered!", "Spike pit sprang: -120 HP", "destructive")}>
                            💥 Hazard Toast
                          </PixelButton>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="secondary" onClick={() => addToast("Quest Complete!", "+2,500 XP and Dragon Scale Armor unlocked", "success")}>
                            🎉 Loot Toast
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => addToast("Trap Triggered!", "Spike pit sprang: -120 HP", "destructive")}>
                            💥 Hazard Toast
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-(--foreground/60)">
                  <span>Toasts auto-dismiss with animated progress and exit transitions.</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 6: REALM MAP & NAVIGATION (Breadcrumb, Navbar, Sidebar, Pagination) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "navigation") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-(--caramel)" /> [REALM MAP & WAYFINDING]
              </h2>
              <span className="text-xs text-(--foreground/60)">4 Navigation Primitives</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 22. Breadcrumb & 23. Navbar */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">22 & 23. Breadcrumb & Realm Navbar</h3>
                  <Badge variant="outline">Dungeon Hierarchy</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Dungeon depth breadcrumb trail and compact in-game realm exploration bar.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-4">
                  {/* Breadcrumb */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-(--foreground/60)">Dungeon Depth Path:</span>
                    {flavor === "pixel" ? (
                      <PixelBreadcrumb
                        items={[
                          { label: "Overworld", href: "#" },
                          { label: "Caldera Mountains", href: "#" },
                          { label: "Obsidian Cavern", href: "#" },
                          { label: "Throne of the Wyrm (Depth 5)", href: "#" },
                        ]}
                      />
                    ) : (
                      <Breadcrumb
                        items={[
                          { label: "Overworld", href: "#" },
                          { label: "Caldera Mountains", href: "#" },
                          { label: "Obsidian Cavern", href: "#" },
                          { label: "Throne of the Wyrm (Depth 5)", href: "#" },
                        ]}
                      />
                    )}
                  </div>

                  {/* Navbar */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-(--foreground/60)">Realm Exploration Header:</span>
                    {flavor === "pixel" ? (
                      <PixelNavbar
                        logo={
                          <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-(--caramel)" />
                            <span className="font-bold text-xs">NORTHERN REALM</span>
                          </div>
                        }
                        items={[
                          { label: "Campfire", href: "#" },
                          { label: "World Map", href: "#" },
                          { label: "Bounties", href: "#" },
                        ]}
                        actions={
                          <PixelBadge variant="warning">
                            🪙 {gold.toLocaleString()} GP
                          </PixelBadge>
                        }
                      />
                    ) : (
                      <Navbar
                        logo={
                          <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-(--caramel)" />
                            <span className="font-bold text-xs">NORTHERN REALM</span>
                          </div>
                        }
                        items={[
                          { label: "Campfire", href: "#" },
                          { label: "World Map", href: "#" },
                          { label: "Bounties", href: "#" },
                        ]}
                        actions={
                          <Badge variant="warning">
                            🪙 {gold.toLocaleString()} GP
                          </Badge>
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* 24. Sidebar & 25. Pagination */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">24 & 25. Party Sidebar & Grimoire Pagination</h3>
                  <Badge variant="outline">Tactics Deck</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Tactical party management sidebar layout and multi-page codex grimoire navigation.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-4">
                  {/* Sidebar Preview */}
                  <div className="border border-(--border) rounded-lg overflow-hidden bg-(--surface-card)">
                    {flavor === "pixel" ? (
                      <PixelSidebar
                        title="PARTY FORMATION"
                        variant="inline"
                        sections={[
                          {
                            title: "ACTIVE VANGUARD",
                            items: [
                              { label: "1. Vaelin (Tank - Front)", icon: <Sword className="w-3.5 h-3.5" />, active: true },
                              { label: "2. Lyra (Mage - Back)", icon: <Zap className="w-3.5 h-3.5" /> },
                              { label: "3. Kaelen (Rogue - Flank)", icon: <Crosshair className="w-3.5 h-3.5" /> },
                            ]
                          }
                        ]}
                      />
                    ) : (
                      <Sidebar
                        title="PARTY FORMATION"
                        variant="inline"
                        sections={[
                          {
                            title: "ACTIVE VANGUARD",
                            items: [
                              { label: "1. Vaelin (Tank - Front)", icon: <Sword className="w-3.5 h-3.5" />, active: true },
                              { label: "2. Lyra (Mage - Back)", icon: <Zap className="w-3.5 h-3.5" /> },
                              { label: "3. Kaelen (Rogue - Flank)", icon: <Crosshair className="w-3.5 h-3.5" /> },
                            ]
                          }
                        ]}
                      />
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-(--foreground/70)">Grimoire Codex Page:</span>
                      <span className="font-semibold tabular-nums text-(--caramel)">Page {codexPage} of 10</span>
                    </div>
                    <div className="flex justify-center">
                      {flavor === "pixel" ? (
                        <PixelPagination
                          currentPage={codexPage}
                          totalPages={10}
                          onPageChange={(p) => {
                            soundManager.playClick(800);
                            setCodexPage(p);
                          }}
                        />
                      ) : (
                        <Pagination
                          currentPage={codexPage}
                          totalPages={10}
                          onPageChange={(p) => {
                            soundManager.playClick(800);
                            setCodexPage(p);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TIER 7: ARCANE SYSTEMS & TERMINAL (CommandPalette, Input, Calendar) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "systems") && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-(--espresso)" /> [ARCANE DECK & IN-GAME SYSTEMS]
              </h2>
              <span className="text-xs text-(--foreground/60)">3 Input & Calendar Primitives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 26. CommandPalette Trigger */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">26. Command Palette</h3>
                  <Badge variant="outline">⌘K Quick Cast</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Quick-travel, spell casting, and debug cheats accessible via keyboard shortcut ⌘K or mouse trigger.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  {flavor === "pixel" ? (
                    <PixelButton
                      variant="primary"
                      className="w-full justify-center"
                      onClick={() => {
                        soundManager.playCast();
                        setCommandPaletteOpen(true);
                      }}
                    >
                      <Terminal className="w-4 h-4 mr-2" /> Launch Arcane Spellbook (⌘K)
                    </PixelButton>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full justify-center"
                      onClick={() => {
                        soundManager.playCast();
                        setCommandPaletteOpen(true);
                      }}
                    >
                      <Terminal className="w-4 h-4 mr-2" /> Launch Arcane Spellbook (⌘K)
                    </Button>
                  )}
                  <p className="text-[11px] text-center text-(--foreground/60)">
                    Try pressing <kbd className="px-1.5 py-0.5 bg-(--surface-card) rounded font-mono text-[10px]">⌘K</kbd> or <kbd className="px-1.5 py-0.5 bg-(--surface-card) rounded font-mono text-[10px]">Ctrl+K</kbd> anywhere!
                  </p>
                </div>
              </div>

              {/* 27. Input */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">27. Input</h3>
                  <Badge variant="outline">Character Naming</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Form inputs with helper text, error boundaries, and accessible ARIA attributes.
                </p>

                <div className="p-4 bg-(--surface-muted) rounded-lg space-y-3">
                  {flavor === "pixel" ? (
                    <>
                      <PixelInput
                        id="hero-name-pixel"
                        value={heroName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHeroName(val);
                          setHeroError(val.length < 3);
                        }}
                        error={heroError}
                        helperText={heroError ? "Hero name must be at least 3 characters" : "Character identifier in Guild Records"}
                      />
                      <PixelInput
                        id="secret-rune"
                        placeholder="Enter Arcane Password..."
                        type="password"
                        helperText="Required to unseal Chamber 4"
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        id="hero-name-modern"
                        value={heroName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHeroName(val);
                          setHeroError(val.length < 3);
                        }}
                        error={heroError}
                        helperText={heroError ? "Hero name must be at least 3 characters" : "Character identifier in Guild Records"}
                      />
                      <Input
                        id="secret-rune-modern"
                        placeholder="Enter Arcane Password..."
                        type="password"
                        helperText="Required to unseal Chamber 4"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* 28. Calendar */}
              <div className="bg-(--surface-card) p-6 rounded-xl border border-(--border) space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-(--espresso)">28. Calendar</h3>
                  <Badge variant="outline">Lunar & Raid Dates</Badge>
                </div>
                <p className="text-xs text-(--foreground/70)">
                  Full in-game raid scheduling calendar, solar eclipse tracking, and daily login rewards.
                </p>

                <div className="p-2 bg-(--surface-muted) rounded-lg flex justify-center">
                  {flavor === "pixel" ? (
                    <PixelCalendar
                      selected={selectedCalendarDate}
                      onSelect={(date) => {
                        soundManager.playClick(850);
                        setSelectedCalendarDate(date);
                        addToast("Raid Scheduled", `Event marked on ${date?.toLocaleDateString()}`);
                      }}
                    />
                  ) : (
                    <Calendar
                      selected={selectedCalendarDate}
                      onSelect={(date) => {
                        soundManager.playClick(850);
                        setSelectedCalendarDate(date);
                        addToast("Raid Scheduled", `Event marked on ${date?.toLocaleDateString()}`);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* OVERLAYS & MODALS (Dialog, Drawer, AlertDialog, CommandPalette) */}
        {/* ========================================================================= */}

        {/* 12. Enchantment Forge Dialog */}
        {flavor === "pixel" ? (
          <PixelDialog
            open={forgeDialogOpen}
            onClose={() => setForgeDialogOpen(false)}
            title="Arcane Enchantment Forge"
            description="Infuse mythical runestones into your equipped armaments. Success chance: 85%."
          >
            <div className="space-y-4 py-2">
              <div className="p-3 bg-(--surface-muted) rounded border border-(--border) space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Target Weapon:</span>
                  <span className="text-(--caramel) font-bold">Sunforged Claymore +4</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Infusion Stone:</span>
                  <span className="text-(--warning) font-bold">Radiant Solar Gem (+80 Fire)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold">Forge Cost:</span>
                  <span className="font-bold tabular-nums">🪙 2,400 GP</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <PixelButton variant="outline" onClick={() => setForgeDialogOpen(false)}>
                  Cancel Forge
                </PixelButton>
                <PixelButton
                  variant="primary"
                  onClick={() => {
                    soundManager.playLoot();
                    setGold((prev) => prev - 2400);
                    setForgeDialogOpen(false);
                    addToast("Enchantment Forged!", "Claymore upgraded to +5 Divine Radiance", "success");
                  }}
                >
                  Confirm Infusion (2,400 GP)
                </PixelButton>
              </div>
            </div>
          </PixelDialog>
        ) : (
          <Dialog
            open={forgeDialogOpen}
            onClose={() => setForgeDialogOpen(false)}
            title="Arcane Enchantment Forge"
            description="Infuse mythical runestones into your equipped armaments. Success chance: 85%."
          >
            <div className="space-y-4 py-2">
              <div className="p-4 bg-(--surface-muted) rounded-lg border border-(--border) space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-(--foreground/70)">Target Weapon:</span>
                  <span className="text-(--caramel) font-semibold">Sunforged Claymore +4</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-(--foreground/70)">Infusion Stone:</span>
                  <span className="text-(--warning) font-semibold">Radiant Solar Gem (+80 Fire)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-(--foreground/70)">Forge Cost:</span>
                  <span className="font-semibold tabular-nums">🪙 2,400 GP</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setForgeDialogOpen(false)}>
                  Cancel Forge
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    soundManager.playLoot();
                    setGold((prev) => prev - 2400);
                    setForgeDialogOpen(false);
                    addToast("Enchantment Forged!", "Claymore upgraded to +5 Divine Radiance", "success");
                  }}
                >
                  Confirm Infusion (2,400 GP)
                </Button>
              </div>
            </div>
          </Dialog>
        )}

        {/* 13. Adventurer's Backpack Stash Drawer */}
        {flavor === "pixel" ? (
          <PixelDrawer
            open={backpackDrawerOpen}
            onClose={() => setBackpackDrawerOpen(false)}
            title="Adventurer's Storage Vault"
            description="Slot capacity: 18 / 30 items carried."
            side="right"
          >
            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 bg-(--surface-muted) rounded space-y-2">
                <div className="font-bold text-(--espresso) flex items-center justify-between">
                  <span>Equipped Consumables</span>
                  <span className="text-[10px] text-(--caramel)">3 Quick Slots</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 bg-(--surface-card) border border-(--border) rounded">
                    🧪 Health Potion x4
                  </div>
                  <div className="p-2 bg-(--surface-card) border border-(--border) rounded">
                    ⚡ Mana Crystal x2
                  </div>
                  <div className="p-2 bg-(--surface-card) border border-(--border) rounded">
                    📜 Teleport Scroll x1
                  </div>
                </div>
              </div>

              <div className="p-3 bg-(--surface-muted) rounded space-y-2">
                <div className="font-bold text-(--espresso)">Unused Relics</div>
                <p className="text-[11px] text-(--foreground/70)">
                  Phoenix Feather (Ressurection item), Wyrm Tooth Dagger, Dragon Horn War-cry.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <PixelButton onClick={() => setBackpackDrawerOpen(false)}>
                  Close Backpack
                </PixelButton>
              </div>
            </div>
          </PixelDrawer>
        ) : (
          <Drawer
            open={backpackDrawerOpen}
            onClose={() => setBackpackDrawerOpen(false)}
            title="Adventurer's Storage Vault"
            description="Slot capacity: 18 / 30 items carried."
            side="right"
          >
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 bg-(--surface-muted) rounded-lg space-y-2">
                <div className="font-semibold text-(--espresso) flex items-center justify-between">
                  <span>Equipped Consumables</span>
                  <span className="text-[10px] text-(--caramel)">3 Quick Slots</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2.5 bg-(--surface-card) border border-(--border) rounded-md">
                    🧪 Health Potion x4
                  </div>
                  <div className="p-2.5 bg-(--surface-card) border border-(--border) rounded-md">
                    ⚡ Mana Crystal x2
                  </div>
                  <div className="p-2.5 bg-(--surface-card) border border-(--border) rounded-md">
                    📜 Teleport Scroll x1
                  </div>
                </div>
              </div>

              <div className="p-3 bg-(--surface-muted) rounded-lg space-y-1.5">
                <div className="font-semibold text-(--espresso)">Unused Relics</div>
                <p className="text-[11px] text-(--foreground/70)">
                  Phoenix Feather (Ressurection item), Wyrm Tooth Dagger, Dragon Horn War-cry.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setBackpackDrawerOpen(false)}>
                  Close Backpack
                </Button>
              </div>
            </div>
          </Drawer>
        )}

        {/* 20. Hardcore Perma-Death Confirmation (AlertDialog) */}
        {flavor === "pixel" ? (
          <PixelAlertDialog
            open={permaDeathAlertOpen}
            onClose={() => setPermaDeathAlertOpen(false)}
            title="PERMA-DEATH HAZARD CONFIRMATION"
            description="Entering the Abyssal Rift activates Hardcore rules. If your hero reaches 0 HP, this character save file and all 14,850 Gold will be deleted permanently from the realm database."
            variant="destructive"
            confirmText="Accept Mortality & Enter"
            cancelText="Retreat to Safety"
            onConfirm={() => {
              soundManager.playAlert();
              addToast("Entered Rift", "Hardcore Perma-Death rules now active!", "destructive");
            }}
          />
        ) : (
          <AlertDialog
            open={permaDeathAlertOpen}
            onClose={() => setPermaDeathAlertOpen(false)}
            title="PERMA-DEATH HAZARD CONFIRMATION"
            description="Entering the Abyssal Rift activates Hardcore rules. If your hero reaches 0 HP, this character save file and all 14,850 Gold will be deleted permanently from the realm database."
            variant="destructive"
            confirmText="Accept Mortality & Enter"
            cancelText="Retreat to Safety"
            onConfirm={() => {
              soundManager.playAlert();
              addToast("Entered Rift", "Hardcore Perma-Death rules now active!", "destructive");
            }}
          />
        )}

        {/* 26. Arcane Command Palette (⌘K) */}
        {flavor === "pixel" ? (
          <PixelCommandPalette
            open={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            items={commandItems}
            placeholder="Type spell name, realm location, or cheat command..."
          />
        ) : (
          <CommandPalette
            open={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            items={commandItems}
            placeholder="Type spell name, realm location, or cheat command..."
          />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t-2 border-(--border-strong) bg-(--surface-card) py-6 text-center text-xs text-(--foreground/70) space-y-1">
        <p>JUI Primitives Library • Crafted with React 19 & Tailwind CSS v4</p>
        <p className="text-[11px] text-(--foreground/50)">
          Dual-Flavor Architecture: 28 Modern SaaS Primitives & 28 Tactile 16-Bit Game Primitives
        </p>
      </footer>
    </div>
  );
}
