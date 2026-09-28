"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PixelButton } from "@/components/pixel/button";
import { PixelInput } from "@/components/pixel/input";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelAvatar } from "@/components/pixel/avatar";
import { PixelProgressBar } from "@/components/pixel/progress-bar";
import { PixelTabs } from "@/components/pixel/tabs";
import { PixelAccordion } from "@/components/pixel/accordion";
import { PixelDialog, PixelDialogFooter } from "@/components/pixel/dialog";
import { PixelDrawer, PixelDrawerFooter } from "@/components/pixel/drawer";
import { PixelAlertDialog } from "@/components/pixel/alert-dialog";
import { PixelDropdownMenu } from "@/components/pixel/dropdown-menu";
import { PixelTooltip } from "@/components/pixel/tooltip";
import { PixelPopover } from "@/components/pixel/popover";
import { PixelTable } from "@/components/pixel/table";
import { PixelPagination } from "@/components/pixel/pagination";
import { PixelBreadcrumb } from "@/components/pixel/breadcrumb";
import { PixelSkeleton } from "@/components/pixel/skeleton";
import { PixelSpinner } from "@/components/pixel/spinner";
import { PixelJevFeedback } from "@/components/pixel/jev-feedback";
import {
  Sword,
  Shield,
  Heart,
  Zap,
  Sparkles,
  ChevronDown,
  Info,
  Package,
  Scroll,
  Crosshair,
  Flame
} from "lucide-react";

export function Showcase() {
  // Combat state
  const [playerHp, setPlayerHp] = useState(780);
  const [playerMp, setPlayerMp] = useState(340);
  const [attackLoading, setAttackLoading] = useState(false);
  const [incantation, setIncantation] = useState("");
  const [combatLog, setCombatLog] = useState("Battle initiated. Ready for command.");

  // Modals state
  const [forgeDialogOpen, setForgeDialogOpen] = useState(false);
  const [drawerBackpackOpen, setDrawerBackpackOpen] = useState(false);
  const [dismantleAlertOpen, setDismantleAlertOpen] = useState(false);

  // Async & Table state
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAttack = () => {
    setAttackLoading(true);
    setTimeout(() => {
      setAttackLoading(false);
      setCombatLog("Critical strike dealt for 240 physical damage!");
    }, 600);
  };

  const handleTakeHit = () => {
    setPlayerHp((prev) => Math.max(prev - 140, 0));
    setCombatLog("Monster counter-attacks: -140 HP!");
  };

  const handleHeal = () => {
    setPlayerHp((prev) => Math.min(prev + 180, 1000));
    setPlayerMp((prev) => Math.min(prev + 80, 500));
    setCombatLog("Healing potion consumed: +180 HP, +80 MP.");
  };

  const leaderboardColumns = [
    { key: "rank", header: "RANK", sortable: true },
    { key: "hero", header: "HERO", sortable: true },
    { key: "level", header: "LVL", sortable: true },
    { key: "dps", header: "DPS", sortable: true },
  ];

  const leaderboardData = [
    { rank: "#1", hero: "IGNIS", level: 99, dps: "142,500" },
    { rank: "#2", hero: "SERAPH", level: 98, dps: "138,200" },
    { rank: "#3", hero: "KAELEN", level: 96, dps: "125,900" },
    { rank: "#4", hero: "THORGAR", level: 94, dps: "119,400" },
  ];

  const cardClass =
    "p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-(--surface-card) pixel-border-bevel font-pixel select-none";

  return (
    <main
      id="components"
      className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-pixel"
    >
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Module 1: Battle Commands & Input */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Sword className="w-4 h-4 text-(--caramel)" />
                BATTLE COMMANDS
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelButton</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelInput</PixelBadge>
              </div>
            </div>

            <p className="text-xs text-[#7B5B49] leading-relaxed">
              Tactile physical bevels with active stepped compression and loading spinner.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <PixelButton
                variant="primary"
                size="sm"
                loading={attackLoading}
                onClick={handleAttack}
              >
                ATTACK [A]
              </PixelButton>
              <PixelButton
                variant="secondary"
                size="sm"
                onClick={handleTakeHit}
              >
                DEFEND [B]
              </PixelButton>
              <PixelDropdownMenu
                trigger={
                  <PixelButton variant="outline" size="sm">
                    SPELLS <ChevronDown className="w-3 h-3 ml-1 inline" />
                  </PixelButton>
                }
                items={[
                  { label: "Inferno Meteor", icon: <Flame className="w-3.5 h-3.5 text-(--destructive)" />, onClick: () => setCombatLog("Cast: Inferno Meteor (-60 MP)") },
                  { label: "Frost Barrier", icon: <Shield className="w-3.5 h-3.5 text-(--caramel)" />, onClick: () => setCombatLog("Cast: Frost Barrier (+40 DEF)") },
                  { label: "Lightning Storm", icon: <Zap className="w-3.5 h-3.5 text-[#D48B38]" />, onClick: () => setCombatLog("Cast: Lightning Storm (-50 MP)") },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-(--espresso) block">
                Cast Incantation (PixelInput)
              </label>
              <PixelInput
                placeholder="Type rune spell or command..."
                value={incantation}
                onChange={(e) => setIncantation(e.target.value)}
                className="text-xs py-2"
              />
            </div>

            <div className="p-2.5 bg-(--surface-muted) pixel-border-bevel text-[11px] text-(--espresso)">
              <span className="font-bold text-(--caramel)">LOG: </span>
              {combatLog}
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Combat Menus, Dialogues</span>
            <Link href="/docs/component#component-button" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 2: Vitality HUD & Tooltip */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-(--destructive)" />
                HERO VITALS &amp; TOOLTIP
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelProgressBar</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelTooltip</PixelBadge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PixelAvatar seed="Vaelin" fallback="VH" size="md" />
                <div>
                  <span className="text-xs font-bold text-(--espresso) block">VAELIN IRONHEART</span>
                  <span className="text-[10px] text-(--caramel) font-bold">LVL 42 PALADIN</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <PixelBadge variant={playerHp < 300 ? "destructive" : "success"} className="text-[9px]">
                  {playerHp < 300 ? "CRITICAL" : "HEALTHY"}
                </PixelBadge>
                <PixelTooltip content="Rune Blade +3 equipped (+45 ATK)">
                  <div className="p-1.5 bg-(--surface-muted) pixel-border-bevel cursor-pointer">
                    <Info className="w-3.5 h-3.5 text-(--espresso)" />
                  </div>
                </PixelTooltip>
              </div>
            </div>

            <div className="space-y-3">
              <PixelProgressBar
                value={playerHp}
                max={1000}
                variant={playerHp < 300 ? "destructive" : "success"}
                showLabel
                label="Health Points (HP)"
              />
              <PixelProgressBar
                value={playerMp}
                max={500}
                variant="default"
                showLabel
                label="Mana Pool (MP)"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <PixelButton variant="outline" size="sm" onClick={handleTakeHit} className="text-xs py-1.5">
                Take Hit (-140)
              </PixelButton>
              <PixelButton variant="primary" size="sm" onClick={handleHeal} className="text-xs py-1.5">
                Elixir (+180)
              </PixelButton>
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Status HUD, Player Profile</span>
            <Link href="/docs/component#component-progressbar" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 3: Vault Inventory & Drawer */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-(--caramel)" />
                VAULT &amp; TABS
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelTabs</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelDrawer</PixelBadge>
              </div>
            </div>

            <PixelTabs
              tabs={[
                {
                  id: "weapons",
                  label: "WEAPONS",
                  content: (
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-(--background) pixel-border-bevel flex items-center justify-between">
                        <span>Rune Blade +3</span>
                        <PixelBadge variant="success" className="text-[9px]">ATK +45</PixelBadge>
                      </div>
                      <div className="p-2 bg-(--background) pixel-border-bevel flex items-center justify-between">
                        <span>Bow of the Falcon</span>
                        <PixelBadge variant="secondary" className="text-[9px]">ATK +32</PixelBadge>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "armor",
                  label: "ARMOR",
                  content: (
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-(--background) pixel-border-bevel flex items-center justify-between">
                        <span>Dragon Plate</span>
                        <PixelBadge variant="warning" className="text-[9px]">DEF +58</PixelBadge>
                      </div>
                      <div className="p-2 bg-(--background) pixel-border-bevel flex items-center justify-between">
                        <span>Shadow Cloak</span>
                        <PixelBadge variant="secondary" className="text-[9px]">AGI +14</PixelBadge>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "relics",
                  label: "RELICS",
                  content: (
                    <div className="p-2 bg-(--background) pixel-border-bevel text-xs">
                      <div className="flex items-center justify-between">
                        <span>Amulet of Kings</span>
                        <PixelBadge variant="warning" className="text-[9px]">XP +25%</PixelBadge>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <PixelButton
              variant="outline"
              size="sm"
              onClick={() => setDrawerBackpackOpen(true)}
              className="w-full text-xs py-2"
            >
              OPEN BACKPACK DRAWER [TAB]
            </PixelButton>
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Stash, Equipment Loadout</span>
            <Link href="/docs/component#component-drawer" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 4: Arcane Forge & Modals */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-(--caramel)" />
                FORGE &amp; DIALOGS
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelDialog</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelAlertDialog</PixelBadge>
              </div>
            </div>

            <p className="text-xs text-[#7B5B49] leading-relaxed">
              Zero-CLS modal systems engineered with accessible keyboard trapping and crisp retro bevels.
            </p>

            <div className="p-3 bg-(--background) pixel-border-bevel space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-(--espresso)">RUNIC ANVIL</span>
                <PixelBadge variant="warning" className="text-[9px]">TIER IV</PixelBadge>
              </div>
              <p className="text-[11px] text-[#7B5B49]">
                Imbue weapons with fire, ice, or void enchantments using ancient runestones.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <PixelButton
                variant="primary"
                size="sm"
                onClick={() => setForgeDialogOpen(true)}
                className="w-full text-xs py-2"
              >
                OPEN ENCHANTMENT FORGE
              </PixelButton>
              <PixelButton
                variant="destructive"
                size="sm"
                onClick={() => setDismantleAlertOpen(true)}
                className="w-full text-xs py-2"
              >
                DISMANTLE ITEM CONFIRMATION
              </PixelButton>
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Crafting, Dangerous Actions</span>
            <Link href="/docs/component#component-dialog" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 5: Quest Codex & Lore */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-(--caramel)" />
                QUEST CODEX &amp; BREADCRUMB
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelAccordion</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelPopover</PixelBadge>
              </div>
            </div>

            <PixelBreadcrumb
              items={[
                { label: "REALM", href: "#" },
                { label: "DUNGEON", href: "#" },
                { label: "CHAMBER" },
              ]}
            />

            <PixelAccordion
              defaultOpen={["quest-1"]}
              items={[
                {
                  id: "quest-1",
                  title: "CHAPTER I: THE WYRM LAIR",
                  content: (
                    <div className="space-y-2 text-xs text-[#7B5B49]">
                      <p>Slumbering in the volcanic depths of Mount Cinder.</p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <PixelBadge variant="warning" className="text-[9px] py-1 px-2 select-none">
                          REWARD: 1,500 GP
                        </PixelBadge>
                        <PixelPopover
                          side="top"
                          align="start"
                          content={
                            <div className="space-y-1.5 text-xs">
                              <span className="font-bold text-(--espresso) block tracking-wider text-[11px] uppercase">
                                WYRM WEAKNESS
                              </span>
                              <p className="text-[11px] text-[#7B5B49] leading-relaxed">
                                Vulnerable to Frost spells (+50% DMG). Resists Fire.
                              </p>
                            </div>
                          }
                        >
                          <PixelButton variant="outline" size="sm" className="text-[9px] py-1 px-2.5 h-auto">
                            LORE INTEL
                          </PixelButton>
                        </PixelPopover>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "quest-2",
                  title: "CHAPTER II: SUNKEN CITADEL",
                  content: (
                    <p className="text-xs text-[#7B5B49]">
                      Ancient ruins guarded by deep-sea sirens and tidal guardians.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Quest Logs, FAQ, Bestiary</span>
            <Link href="/docs/component#component-accordion" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 6: Guild Leaderboard & Async Systems */}
        <div className={`${cardClass} min-h-[420px]`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-(--caramel)" />
                LEADERBOARD &amp; LOADERS
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="secondary" className="text-[9px]">PixelTable</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">PixelSpinner</PixelBadge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-(--espresso)">RAID DAMAGE / SEC</span>
              <button
                onClick={() => setLoadingPreview(!loadingPreview)}
                className="text-[10px] uppercase font-bold text-(--caramel) hover:underline cursor-pointer"
              >
                {loadingPreview ? "[SHOW DATA]" : "[TEST SKELETON]"}
              </button>
            </div>

            {loadingPreview ? (
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-center gap-2 p-3 bg-(--surface-muted) pixel-border-bevel">
                  <PixelSpinner size="md" />
                  <span className="text-xs text-(--espresso) font-bold">FETCHING REALM DATA...</span>
                </div>
                <PixelSkeleton variant="text" count={3} />
              </div>
            ) : (
              <div className="space-y-3">
                <PixelTable columns={leaderboardColumns} data={leaderboardData} />
                <PixelPagination
                  currentPage={currentPage}
                  totalPages={4}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Guild Ranking, High Scores</span>
            <Link href="/docs/component#component-table" className="text-(--caramel) hover:underline">
              View API &gt;
            </Link>
          </div>
        </div>

        {/* Module 7: Jev System One AI Decision Primitive */}
        <div className={`${cardClass} md:col-span-2 lg:col-span-3 min-h-[380px]`}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2.5">
              <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-(--caramel)" />
                AI DECISION PRIMITIVE (JEV SYSTEM ONE ENGINE)
              </span>
              <div className="flex items-center gap-1">
                <PixelBadge variant="default" className="text-[9px]">PixelJevFeedback</PixelBadge>
                <PixelBadge variant="secondary" className="text-[9px]">typesafe/jev-1.13</PixelBadge>
              </div>
            </div>

            <p className="text-xs text-[#7B5B49] leading-relaxed max-w-3xl">
              TypeSafe AI&apos;s System One model dynamically picks whether to render a <code className="bg-(--cream-dark) px-1 py-0.5 border border-(--border-strong)">PixelToast</code>, <code className="bg-(--cream-dark) px-1 py-0.5 border border-(--border-strong)">PixelAlert</code>, or <code className="bg-(--cream-dark) px-1 py-0.5 border border-(--border-strong)">PixelDialog</code> based on real-time event signals. Test live triggers below to inspect calibrated confidence scores and probabilities.
            </p>

            <PixelJevFeedback />
          </div>

          <div className="pt-3 border-t border-dashed border-(--border-strong) flex items-center justify-between text-[10px] text-[#7B5B49]">
            <span>Used In: Dynamic Game Feedback, Adaptive UI, Loot &amp; Combat Events</span>
            <Link href="/docs/component#component-ai-decision" className="text-(--caramel) hover:underline font-bold">
              View Documentation &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Forge Dialog */}
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
              setCombatLog("Runestone successfully forged into Rune Blade!");
            }}
          >
            FUSE RUNESTONE [ENTER]
          </PixelButton>
        </PixelDialogFooter>
      </PixelDialog>

      {/* Interactive Backpack Drawer */}
      <PixelDrawer
        open={drawerBackpackOpen}
        onClose={() => setDrawerBackpackOpen(false)}
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
          <PixelButton variant="outline" size="sm" onClick={() => setDrawerBackpackOpen(false)} className="w-full">
            CLOSE BACKPACK [ESC]
          </PixelButton>
        </PixelDrawerFooter>
      </PixelDrawer>

      {/* Interactive Dismantle Alert Dialog */}
      <PixelAlertDialog
        open={dismantleAlertOpen}
        onClose={() => setDismantleAlertOpen(false)}
        title="DISMANTLE RARE ARTIFACT?"
        description="This action cannot be undone. You will lose the Rune Blade permanently and gain 4x Mystic Dust."
        variant="destructive"
        confirmText="CONFIRM DISMANTLE"
        cancelText="KEEP WEAPON"
        onConfirm={() => setCombatLog("Item dismantled into 4x Mystic Dust.")}
      />
    </main>
  );
}
