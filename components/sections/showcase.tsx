"use client";

import React, { useState } from "react";
import { PixelButton } from "@/components/pixel/button";
import { PixelInput } from "@/components/pixel/input";
import { PixelBadge } from "@/components/pixel/badge";
import { PixelSeparator } from "@/components/pixel/separator";
import { PixelAvatar } from "@/components/pixel/avatar";
import {
  ArrowRight,
  Search,
  BarChart3,
  Target,
  Calendar,
  FileText,
  Wallet,
  HelpCircle,
  BookOpen,
  Mail,
  Activity,
  Globe,
  ChevronDown,
  RotateCcw,
  Send,
  X,
  Layers,
  CreditCard,
  User,
  Bell,
  Shield,
  Palette,
  Sword,
  Sparkles,
} from "lucide-react";

function QrMatrix() {
  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto p-3 bg-(--surface) pixel-border-bevel flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-(--espresso)"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="5" y="5" width="28" height="28" />
        <rect x="11" y="11" width="16" height="16" fill="var(--surface)" />
        <rect x="15" y="15" width="8" height="8" />

        <rect x="67" y="5" width="28" height="28" />
        <rect x="73" y="11" width="16" height="16" fill="var(--surface)" />
        <rect x="77" y="15" width="8" height="8" />

        <rect x="5" y="67" width="28" height="28" />
        <rect x="11" y="73" width="16" height="16" fill="var(--surface)" />
        <rect x="15" y="77" width="8" height="8" />

        <rect x="38" y="8" width="6" height="6" />
        <rect x="48" y="16" width="6" height="6" />
        <rect x="56" y="8" width="6" height="6" />
        <rect x="38" y="24" width="6" height="6" />
        <rect x="48" y="32" width="6" height="6" />
        <rect x="8" y="38" width="6" height="6" />
        <rect x="18" y="46" width="6" height="6" />
        <rect x="26" y="38" width="6" height="6" />
        <rect x="38" y="44" width="10" height="6" />
        <rect x="54" y="44" width="6" height="10" />
        <rect x="66" y="38" width="8" height="6" />
        <rect x="78" y="44" width="6" height="6" />
        <rect x="88" y="38" width="6" height="6" />
        <rect x="40" y="58" width="8" height="6" />
        <rect x="52" y="62" width="6" height="6" />
        <rect x="64" y="54" width="6" height="12" />
        <rect x="76" y="58" width="10" height="6" />
        <rect x="88" y="54" width="6" height="6" />
        <rect x="38" y="74" width="6" height="6" />
        <rect x="48" y="82" width="8" height="6" />
        <rect x="60" y="74" width="6" height="6" />
        <rect x="70" y="80" width="8" height="6" />
        <rect x="84" y="74" width="6" height="8" />
        <rect x="80" y="88" width="12" height="6" />
        <rect x="40" y="90" width="6" height="6" />
        <rect x="56" y="88" width="6" height="6" />
      </svg>
    </div>
  );
}

export function Showcase() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageQuery, setMessageQuery] = useState("");
  const [selectedRadio, setSelectedRadio] = useState<number>(0);
  const [switchEnabled, setSwitchEnabled] = useState(true);

  const [activePlanning, setActivePlanning] = useState("Dragon Cavern");
  const [activeOverview, setActiveOverview] = useState("Rune Blade +3");
  const [activeAccount, setActiveAccount] = useState("Strength: 88");

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("15,000 GP");
  const [targetDate, setTargetDate] = useState("72 HOURS");

  const [sfxVolume, setSfxVolume] = useState(85);
  const [payoutNotes, setPayoutNotes] = useState("");

  const [chatMessage, setChatMessage] = useState("");

  const cardClass =
    "p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-(--surface-card) pixel-border-bevel font-pixel select-none";

  return (
    <main
      id="components"
      className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 font-pixel"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-dashed border-(--border-strong) pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-(--espresso) uppercase tracking-wider">
              [GAME UI PRIMITIVES HUD]
            </h2>
            <PixelBadge variant="warning" className="text-[10px]">
              ARCADE READY
            </PixelBadge>
          </div>
          <p className="text-xs text-[#7B5B49] mt-0.5">
            TACTILE 8-BIT GAME PRIMITIVES GROUNDED IN IMMERSIVE DIEGETIC CONTEXTS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        <div className="flex flex-col gap-5">
          <div className={`${cardClass} min-h-[350px]`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2">
                <span className="text-xs font-bold text-(--espresso) uppercase tracking-wider flex items-center gap-1.5">
                  <Sword className="w-3.5 h-3.5 text-(--caramel)" />
                  BATTLE COMMANDS
                </span>
                <PixelBadge variant="secondary" className="text-[9px]">
                  LVL 42
                </PixelBadge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <PixelButton
                  variant="primary"
                  size="sm"
                  loading={buttonLoading}
                  onClick={() => setButtonLoading(!buttonLoading)}
                >
                  ATTACK [A] <ArrowRight className="w-3 h-3 ml-1 inline" />
                </PixelButton>
                <PixelButton variant="secondary" size="sm">
                  DEFEND [B]
                </PixelButton>
                <PixelButton variant="outline" size="sm">
                  SPELL [X]
                </PixelButton>
              </div>

              <div className="relative">
                <PixelInput
                  placeholder="Hero Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs py-2 pr-8"
                />
                <Search className="w-3.5 h-3.5 text-(--cinnamon) absolute right-3 top-3 pointer-events-none" />
              </div>

              <div>
                <PixelInput
                  placeholder="Cast Rune Incantation..."
                  value={messageQuery}
                  onChange={(e) => setMessageQuery(e.target.value)}
                  className="text-xs py-4"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <PixelBadge variant="destructive" className="text-[9px]">
                    POISON -4
                  </PixelBadge>
                  <PixelBadge variant="success" className="text-[9px]">
                    HASTE +20%
                  </PixelBadge>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRadio(idx)}
                        className={`w-4 h-4 pixel-border-bevel flex items-center justify-center cursor-pointer ${
                          selectedRadio === idx
                            ? "bg-(--caramel)"
                            : "bg-(--background)"
                        }`}
                        aria-label={`Stance ${idx + 1}`}
                      >
                        {selectedRadio === idx && (
                          <div className="w-2 h-2 bg-(--cream)" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSwitchEnabled(!switchEnabled)}
                    role="switch"
                    aria-checked={switchEnabled}
                    className={`w-8 h-4.5 flex items-center p-0.5 cursor-pointer pixel-border-bevel ${
                      switchEnabled ? "bg-(--caramel)" : "bg-(--surface-muted)"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-(--cream) transform transition-transform ${
                        switchEnabled ? "translate-x-3.5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-dashed border-(--border-strong)">
                <PixelButton variant="outline" size="sm" className="text-xs py-1.5">
                  FLEE [ESC]
                </PixelButton>
                <PixelButton variant="secondary" size="sm" className="text-xs py-1.5">
                  SPECIAL [Y] <ChevronDown className="w-3 h-3 ml-1 inline" />
                </PixelButton>
              </div>
            </div>
          </div>

          <div className={`${cardClass} min-h-[300px]`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-2">
                  QUEST DUNGEONS
                </span>
                {[
                  { label: "Dragon Cavern", icon: Sword },
                  { label: "Ancient Ruins", icon: Wallet },
                  { label: "Goblin Fort", icon: BarChart3 },
                  { label: "Sunken Relic", icon: Target },
                  { label: "Dark Citadel", icon: Calendar },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activePlanning === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActivePlanning(item.label)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-bold pixel-border-bevel"
                          : "text-[#7B5B49] hover:bg-(--surface-muted) hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--caramel) shrink-0" />
                      <span className="truncate uppercase">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-2">
                  LORE &amp; BESTIARY
                </span>
                {[
                  { label: "Monster Codex", icon: HelpCircle },
                  { label: "Spell Grimoire", icon: BookOpen },
                  { label: "Guild Rules", icon: Mail },
                  { label: "Server 14ms", icon: Activity },
                  { label: "World Tavern", icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#7B5B49] hover:bg-(--surface-muted) hover:text-(--espresso) cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-(--cinnamon) shrink-0" />
                      <span className="truncate uppercase">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`${cardClass} min-h-[300px]`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-2">
                  HERO GEAR
                </span>
                {[
                  { label: "Rune Blade +3", icon: Sword },
                  { label: "Dragon Shield", icon: Layers },
                  { label: "Shadow Cloak", icon: Wallet },
                  { label: "Winged Boots", icon: User },
                  { label: "Berserk Ring", icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeOverview === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveOverview(item.label)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-bold pixel-border-bevel"
                          : "text-[#7B5B49] hover:bg-(--surface-muted) hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--caramel) shrink-0" />
                      <span className="truncate uppercase">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-2">
                  ATTRIBUTES
                </span>
                {[
                  { label: "Strength: 88", icon: User },
                  { label: "Defense: 74", icon: Shield },
                  { label: "Agility: 92", icon: Bell },
                  { label: "Wisdom: 65", icon: Sparkles },
                  { label: "Luck: 50", icon: Palette },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAccount === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveAccount(item.label)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-bold pixel-border-bevel"
                          : "text-[#7B5B49] hover:bg-(--surface-muted) hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--cinnamon) shrink-0" />
                      <span className="truncate uppercase">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className={`${cardClass} min-h-[460px]`}>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-sm text-(--espresso) uppercase tracking-wider">
                  COMBAT MASTERY &amp; DPS
                </h3>
                <p className="text-xs text-[#7B5B49]">RECENT DUNGEON BATTLE PERFORMANCE</p>
              </div>

              <div className="h-44 flex items-end justify-between gap-3 px-3 pt-4 pb-2 bg-(--background) pixel-border-bevel">
                {[
                  { label: "DNG 1", height: "45%" },
                  { label: "DNG 2", height: "82%" },
                  { label: "DNG 3", height: "58%" },
                  { label: "DNG 4", height: "96%" },
                  { label: "BOSS", height: "48%" },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      style={{ height: bar.height }}
                      className="w-full bg-(--caramel) pixel-border-bevel hover:brightness-110"
                    />
                    <span className="text-[10px] text-[#7B5B49] font-bold">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-(--background) pixel-border-bevel space-y-0.5">
                  <span className="text-[9px] font-bold uppercase text-[#7B5B49] block">
                    NEXT LEVEL
                  </span>
                  <span className="font-bold text-sm text-(--espresso)">LVL 43</span>
                  <span className="text-[10px] text-[#7B5B49] block">850 XP REMAINING</span>
                </div>
                <div className="p-3 bg-(--background) pixel-border-bevel space-y-0.5">
                  <span className="text-[9px] font-bold uppercase text-[#7B5B49] block">
                    ATTACK BUFF
                  </span>
                  <span className="font-bold text-sm text-(--espresso)">+24% HASTE</span>
                  <span className="text-[10px] text-[#7B5B49] block">FRENZY ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-(--border-strong)">
              <PixelButton variant="outline" size="sm" className="w-full text-xs py-2 uppercase tracking-wider">
                VIEW TALENT TREE [TAB]
              </PixelButton>
            </div>
          </div>

          <div className={`${cardClass} min-h-[400px]`}>
            <div className="space-y-3.5">
              <div>
                <span className="text-xs font-bold text-[#7B5B49] uppercase tracking-wider block">
                  GUILD TREASURY VAULT
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-(--espresso) tracking-widest mt-1">
                  1,211 GOLD
                </div>
                <div className="mt-1.5">
                  <PixelBadge variant="warning" className="text-[9px]">
                    ● READY TO WITHDRAW
                  </PixelBadge>
                </div>
              </div>

              <PixelSeparator />

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#7B5B49]">
                  <span className="uppercase">Dragon Hoard Bounty</span>
                  <span className="font-bold text-(--espresso)">+1,248 GP</span>
                </div>
                <div className="flex items-center justify-between text-[#7B5B49]">
                  <span className="uppercase">Blacksmith Repair Fee</span>
                  <span className="font-bold text-(--destructive)">-37 GP</span>
                </div>
                <div className="flex items-center justify-between font-bold text-(--espresso) pt-2 border-t border-dashed border-(--border-strong)">
                  <span className="uppercase">Net Vault Allocation</span>
                  <span>1,211 GP</span>
                </div>
              </div>

              <p className="text-[11px] text-[#7B5B49] leading-relaxed pt-1 uppercase">
                Gold balances over 10 GP are automatically delivered to hero pouch each dawn.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className={`${cardClass} min-h-[460px]`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-(--espresso) uppercase tracking-wider">
                    POST GUILD BOUNTY
                  </h3>
                  <p className="text-xs text-[#7B5B49] leading-tight mt-0.5">
                    RALLY GUILD ADVENTURERS FOR BOSS RAIDS.
                  </p>
                </div>
                <Target className="w-4 h-4 text-(--caramel) shrink-0 ml-1" />
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                    Bounty Target
                  </label>
                  <PixelInput
                    placeholder="e.g. Nether Wyrm, Frost Drake"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="text-xs py-1.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                      Reward Gold
                    </label>
                    <PixelInput
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="text-xs py-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                      Time Limit
                    </label>
                    <PixelInput
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="text-xs py-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-(--border-strong) flex flex-col gap-2">
              <PixelButton variant="primary" size="sm" className="w-full text-xs py-1.5 uppercase tracking-wider">
                ISSUE BOUNTY [ENTER]
              </PixelButton>
              <PixelButton variant="outline" size="sm" className="w-full text-xs py-1.5 uppercase tracking-wider">
                CANCEL [ESC]
              </PixelButton>
            </div>
          </div>

          <div className={`${cardClass} min-h-[400px]`}>
            <div className="space-y-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-(--espresso) uppercase tracking-wider">
                    GAME AUDIO &amp; HUD
                  </h3>
                  <p className="text-xs text-[#7B5B49] leading-tight mt-0.5">
                    AUDIO CHANNELS AND GAMEPAD CONFIG.
                  </p>
                </div>
                <button
                  className="p-1 text-[#7B5B49] hover:text-(--espresso) pixel-border-bevel cursor-pointer"
                  aria-label="Dismiss settings"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                    Sound Chip Engine
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 pixel-border-bevel bg-(--background) text-xs text-(--espresso)">
                    <span>8-BIT CHIPTUNE STEREO</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7B5B49]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-(--espresso)">
                      Master SFX Volume
                    </span>
                    <span className="font-bold text-xs text-(--espresso)">
                      {sfxVolume}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={sfxVolume}
                    onChange={(e) => setSfxVolume(Number(e.target.value))}
                    className="w-full h-2 bg-(--surface-muted) accent-(--caramel) cursor-pointer my-2"
                  />
                  <div className="flex justify-between text-[9px] text-[#7B5B49]">
                    <span>0% (MUTE)</span>
                    <span>100% (MAX)</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-(--espresso) block mb-1">
                    Cheat Macro Code
                  </label>
                  <PixelInput
                    placeholder="UP UP DOWN DOWN LEFT RIGHT..."
                    value={payoutNotes}
                    onChange={(e) => setPayoutNotes(e.target.value)}
                    className="text-xs py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className={`${cardClass} min-h-[440px]`}>
            <div className="space-y-4 my-auto">
              <QrMatrix />

              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm text-(--espresso) uppercase tracking-wider">
                  PAIR GAMEPAD CONTROLLER
                </h4>
                <p className="text-xs text-[#7B5B49] leading-relaxed max-w-xs mx-auto">
                  SCAN WITH STEAM DECK OR MOBILE TO LINK WIRELESS GAMEPAD CONTROLS.
                </p>
              </div>
            </div>
          </div>

          <div className={`${cardClass} min-h-[420px]`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-dashed border-(--border-strong) pb-2">
                <div>
                  <h3 className="font-bold text-sm text-(--espresso) uppercase tracking-wider">
                    NPC TAVERN CHAT
                  </h3>
                  <p className="text-xs text-[#7B5B49]">INTERACTIVE RPG DIALOGUE</p>
                </div>
                <button
                  className="p-1 text-[#7B5B49] hover:text-(--espresso) pixel-border-bevel cursor-pointer"
                  aria-label="Refresh conversation"
                  onClick={() => setChatMessage("")}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 bg-(--background) pixel-border-bevel space-y-2 min-h-[110px]">
                <div className="flex items-center gap-2.5">
                  <PixelAvatar fallback="EL" size="sm" />
                  <div>
                    <span className="text-xs font-bold text-(--espresso) uppercase block">
                      ELDER CORMAC (LVL 75)
                    </span>
                    <span className="text-[9px] text-[#7B5B49]">GUILD MASTER</span>
                  </div>
                </div>
                <p className="text-xs text-[#7B5B49] leading-relaxed uppercase">
                  &quot;Greetings, Hero! Dark omens stir in the ancient dungeon. Take this enchanted rune and make haste!&quot;
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["[1] ACCEPT QUEST", "[2] INQUIRE LORE", "[3] TRADE WEAPONS"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setChatMessage(chip)}
                    className="px-2.5 py-1 text-[9px] font-bold bg-(--surface-muted) text-(--espresso) hover:bg-(--caramel) hover:text-(--cream) pixel-border-bevel cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-(--border-strong) flex items-center gap-2">
              <div className="flex-1">
                <PixelInput
                  placeholder="Reply to elder..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="text-xs py-2"
                />
              </div>
              <PixelButton
                size="sm"
                className="px-3 py-2"
                onClick={() => setChatMessage("")}
              >
                <Send className="w-3.5 h-3.5" />
              </PixelButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
