"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PixelButton } from "@/components/pixel/button";
import { Input } from "@/components/ui/input";
import { PixelInput } from "@/components/pixel/input";
import { Badge } from "@/components/ui/badge";
import { PixelBadge } from "@/components/pixel/badge";
import { Separator } from "@/components/ui/separator";
import { PixelSeparator } from "@/components/pixel/separator";
import { Avatar } from "@/components/ui/avatar";
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
} from "lucide-react";

export interface ShowcaseProps {
  globalFlavor: "modern" | "pixel";
}

// Crisp SVG QR Code component matching theme tokens
function QrMatrix({ flavor }: { flavor: "modern" | "pixel" }) {
  const isPixel = flavor === "pixel";
  return (
    <div
      className={`w-32 h-32 sm:w-36 sm:h-36 mx-auto p-2 bg-(--surface) flex items-center justify-center ${
        isPixel
          ? "pixel-border-bevel"
          : "rounded-xl border border-(--border) shadow-xs"
      }`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-(--espresso)"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Top-Left Finder */}
        <rect x="5" y="5" width="28" height="28" rx={isPixel ? 0 : 4} />
        <rect x="11" y="11" width="16" height="16" fill="var(--surface)" rx={isPixel ? 0 : 2} />
        <rect x="15" y="15" width="8" height="8" rx={isPixel ? 0 : 1} />

        {/* Top-Right Finder */}
        <rect x="67" y="5" width="28" height="28" rx={isPixel ? 0 : 4} />
        <rect x="73" y="11" width="16" height="16" fill="var(--surface)" rx={isPixel ? 0 : 2} />
        <rect x="77" y="15" width="8" height="8" rx={isPixel ? 0 : 1} />

        {/* Bottom-Left Finder */}
        <rect x="5" y="67" width="28" height="28" rx={isPixel ? 0 : 4} />
        <rect x="11" y="73" width="16" height="16" fill="var(--surface)" rx={isPixel ? 0 : 2} />
        <rect x="15" y="77" width="8" height="8" rx={isPixel ? 0 : 1} />

        {/* Decorative QR Data Cells */}
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

export function Showcase({ globalFlavor }: ShowcaseProps) {
  const isPixel = globalFlavor === "pixel";

  // Action controls state
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageQuery, setMessageQuery] = useState("");
  const [selectedRadio, setSelectedRadio] = useState<number>(1);
  const [switchEnabled, setSwitchEnabled] = useState(true);

  // Navigation states
  const [activePlanning, setActivePlanning] = useState("Reports");
  const [activeOverview, setActiveOverview] = useState("Analytics");
  const [activeAccount, setActiveAccount] = useState("Billing");

  // Milestone Form state
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("$15,000");
  const [targetDate, setTargetDate] = useState("Dec 2026");

  // Payout state
  const [payoutAmount, setPayoutAmount] = useState(2500);
  const [payoutNotes, setPayoutNotes] = useState("");

  // Chat state
  const [chatMessage, setChatMessage] = useState("");

  const cardClass =
    "p-3.5 sm:p-4 flex flex-col justify-between space-y-3 bg-(--surface-card) rounded-2xl border border-(--border) shadow-xs";

  return (
    <main
      id="components"
      className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6"
    >
     
      {/* 4-Column Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {/* ============================================================== */}
        {/* COLUMN 1: Action Controls + Menus                              */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Action Controls & Primitives */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              {/* Buttons Row */}
              <div className="flex flex-wrap items-center gap-2">
                {isPixel ? (
                  <>
                    <PixelButton
                      variant="primary"
                      size="sm"
                      loading={buttonLoading}
                      onClick={() => setButtonLoading(!buttonLoading)}
                    >
                      Button <ArrowRight className="w-3 h-3 ml-1 inline" />
                    </PixelButton>
                    <PixelButton variant="secondary" size="sm">
                      Secondary
                    </PixelButton>
                    <PixelButton variant="outline" size="sm">
                      Outline
                    </PixelButton>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      loading={buttonLoading}
                      onClick={() => setButtonLoading(!buttonLoading)}
                    >
                      Button <ArrowRight className="w-3 h-3 ml-1 inline" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                  </>
                )}
              </div>

              {/* Name Input with search icon */}
              <div className="relative">
                {isPixel ? (
                  <PixelInput
                    placeholder="Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs py-1.5 pr-8"
                  />
                ) : (
                  <Input
                    placeholder="Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs py-1.5 pr-8"
                  />
                )}
                <Search className="w-3.5 h-3.5 text-(--cinnamon) absolute right-3 top-2.5 pointer-events-none" />
              </div>

              {/* Message Input */}
              <div>
                {isPixel ? (
                  <PixelInput
                    placeholder="Message"
                    value={messageQuery}
                    onChange={(e) => setMessageQuery(e.target.value)}
                    className="text-xs py-1.5"
                  />
                ) : (
                  <Input
                    placeholder="Message"
                    value={messageQuery}
                    onChange={(e) => setMessageQuery(e.target.value)}
                    className="text-xs py-4.5"
                  />
                )}
              </div>

              {/* Badges and Radio / Toggle switches */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1.5">
                  {isPixel ? (
                    <>
                      <PixelBadge variant="default" className="text-[10px]">
                        Badge
                      </PixelBadge>
                      <PixelBadge variant="secondary" className="text-[10px]">
                        Secondary
                      </PixelBadge>
                    </>
                  ) : (
                    <>
                      <Badge variant="default" className="text-[10px]">
                        Badge
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        Secondary
                      </Badge>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Radio toggles */}
                  <div className="flex items-center gap-1">
                    {[0, 1].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRadio(idx)}
                        className={`w-3.5 h-3.5 rounded-full border border-(--border-strong) flex items-center justify-center cursor-pointer transition-colors ${
                          selectedRadio === idx
                            ? "bg-(--caramel) border-(--caramel)"
                            : "bg-(--background)"
                        }`}
                        aria-label={`Option ${idx + 1}`}
                      >
                        {selectedRadio === idx && (
                          <div className="w-1.5 h-1.5 rounded-full bg-(--cream)" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Switch toggle */}
                  <button
                    onClick={() => setSwitchEnabled(!switchEnabled)}
                    role="switch"
                    aria-checked={switchEnabled}
                    className={`w-7 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      switchEnabled ? "bg-(--caramel)" : "bg-(--surface-muted)"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-(--cream) shadow-xs transform transition-transform ${
                        switchEnabled ? "translate-x-3" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Bottom Buttons Row: Alert Dialog & Button Group */}
              <div className="flex items-center justify-between pt-1 border-t border-dashed border-(--border)">
                {isPixel ? (
                  <>
                    <PixelButton variant="outline" size="sm" className="text-xs py-1">
                      Alert Dialog
                    </PixelButton>
                    <PixelButton variant="secondary" size="sm" className="text-xs py-1">
                      Button Group <ChevronDown className="w-3 h-3 ml-1 inline" />
                    </PixelButton>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="text-xs py-1">
                      Alert Dialog
                    </Button>
                    <Button variant="secondary" size="sm" className="text-xs py-1">
                      Button Group <ChevronDown className="w-3 h-3 ml-1 inline" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Planning & Support Navigation List */}
          <div className={cardClass}>
            <div className="grid grid-cols-2 gap-3">
              {/* Planning List */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-1">
                  Planning
                </span>
                {[
                  { label: "Documents", icon: FileText },
                  { label: "Budget", icon: Wallet },
                  { label: "Reports", icon: BarChart3 },
                  { label: "Goals", icon: Target },
                  { label: "Calendar", icon: Calendar },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activePlanning === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActivePlanning(item.label)}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-semibold"
                          : "text-[#7B5B49] hover:bg-(--surface-muted)/60 hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--caramel) shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Support List */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-1">
                  Support
                </span>
                {[
                  { label: "Help Center", icon: HelpCircle },
                  { label: "Docs", icon: BookOpen },
                  { label: "Contact Us", icon: Mail },
                  { label: "Status", icon: Activity },
                  { label: "Community", icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-[#7B5B49] hover:bg-(--surface-muted)/60 hover:text-(--espresso) transition-colors cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-(--cinnamon) shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: Overview & Account Navigation List */}
          <div className={cardClass}>
            <div className="grid grid-cols-2 gap-3">
              {/* Overview */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-1">
                  Overview
                </span>
                {[
                  { label: "Analytics", icon: BarChart3 },
                  { label: "Transactions", icon: Layers },
                  { label: "Investments", icon: Wallet },
                  { label: "Accounts", icon: User },
                  { label: "Spending", icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeOverview === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveOverview(item.label)}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-semibold"
                          : "text-[#7B5B49] hover:bg-(--surface-muted)/60 hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--caramel) shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Account */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5B49] block mb-1">
                  Account
                </span>
                {[
                  { label: "Profile", icon: User },
                  { label: "Billing", icon: CreditCard },
                  { label: "Notifications", icon: Bell },
                  { label: "Security", icon: Shield },
                  { label: "Appearance", icon: Palette },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAccount === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveAccount(item.label)}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer text-left ${
                        isActive
                          ? "bg-(--surface-muted) text-(--espresso) font-semibold"
                          : "text-[#7B5B49] hover:bg-(--surface-muted)/60 hover:text-(--espresso)"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-(--cinnamon) shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLUMN 2: Contribution History & Claimable Balance              */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4">
          {/* Card 4: Contribution History */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-(--espresso)">
                  Contribution History
                </h3>
                <p className="text-[11px] text-[#7B5B49]">Last 6 months of activity</p>
              </div>

              {/* Bar Chart */}
              <div className="h-28 flex items-end justify-between gap-2 px-2 pt-3 pb-1 bg-(--background) rounded-xl border border-(--border)">
                {[
                  { label: "Dec", height: "45%" },
                  { label: "Jan", height: "82%" },
                  { label: "Feb", height: "58%" },
                  { label: "Mar", height: "96%" },
                  { label: "Apr", height: "48%" },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      style={{ height: bar.height }}
                      className={`w-full transition-all duration-300 hover:brightness-110 ${
                        isPixel
                          ? "bg-(--caramel) pixel-border-bevel"
                          : "bg-(--caramel) rounded-t-sm shadow-xs"
                      }`}
                    />
                    <span className="text-[10px] text-[#7B5B49] font-medium">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Metric boxes */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-(--background) border border-(--border)">
                  <span className="text-[9px] font-semibold uppercase text-[#7B5B49] block">
                    Upcoming
                  </span>
                  <span className="font-bold text-xs text-(--espresso)">May 2026</span>
                  <span className="text-[9px] text-[#7B5B49] block">Scheduled</span>
                </div>
                <div className="p-2 rounded-lg bg-(--background) border border-(--border)">
                  <span className="text-[9px] font-semibold uppercase text-[#7B5B49] block">
                    Savings Plan
                  </span>
                  <span className="font-bold text-xs text-(--espresso)">Accelerated</span>
                  <span className="text-[9px] text-[#7B5B49] block">Recurring</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-dashed border-(--border)">
              {isPixel ? (
                <PixelButton variant="outline" size="sm" className="w-full text-xs py-1.5">
                  View Full Report
                </PixelButton>
              ) : (
                <Button variant="outline" size="sm" className="w-full text-xs py-1.5">
                  View Full Report
                </Button>
              )}
            </div>
          </div>

          {/* Card 5: Claimable Balance */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <div>
                <span className="text-[11px] font-medium text-[#7B5B49] block">
                  Claimable Balance
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-(--espresso) tracking-tight mt-0.5">
                  $1,211.29
                </div>
                <div className="mt-1">
                  {isPixel ? (
                    <PixelBadge variant="warning" className="text-[9px]">
                      ● Pending Setup
                    </PixelBadge>
                  ) : (
                    <Badge variant="warning" className="text-[9px]">
                      ● Pending Setup
                    </Badge>
                  )}
                </div>
              </div>

              {isPixel ? <PixelSeparator /> : <Separator />}

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#7B5B49]">
                  <span>Net Royalties</span>
                  <span className="font-medium text-(--espresso)">$1,248.75</span>
                </div>
                <div className="flex items-center justify-between text-[#7B5B49]">
                  <span>Processing Fee</span>
                  <span className="font-medium text-(--destructive)">-$37.46</span>
                </div>
                <div className="flex items-center justify-between font-bold text-(--espresso) pt-1 border-t border-dashed border-(--border)">
                  <span>Total Ready to Claim</span>
                  <span>$1,211.29 USD</span>
                </div>
              </div>

              <p className="text-[10px] text-[#7B5B49] leading-tight pt-1">
                Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLUMN 3: Milestone Form & Payout Threshold                     */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4">
          {/* Card 6: Set a new milestone */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-(--espresso)">
                    Set a new milestone
                  </h3>
                  <p className="text-[11px] text-[#7B5B49] leading-tight">
                    Define your financial target and we&apos;ll help pace your savings.
                  </p>
                </div>
                <Target className="w-4 h-4 text-(--caramel) shrink-0 ml-1" />
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-semibold text-(--espresso) block mb-0.5">
                    Goal Name
                  </label>
                  {isPixel ? (
                    <PixelInput
                      placeholder="e.g. New Equipment, Studio Gear"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className="text-xs py-1"
                    />
                  ) : (
                    <Input
                      placeholder="e.g. New Equipment, Studio Gear"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className="text-xs py-1"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-(--espresso) block mb-0.5">
                      Target Amount
                    </label>
                    {isPixel ? (
                      <PixelInput
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="text-xs py-1"
                      />
                    ) : (
                      <Input
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="text-xs py-1"
                      />
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-(--espresso) block mb-0.5">
                      Target Date
                    </label>
                    {isPixel ? (
                      <PixelInput
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="text-xs py-1"
                      />
                    ) : (
                      <Input
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="text-xs py-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-dashed border-(--border) flex flex-col gap-1.5">
              {isPixel ? (
                <>
                  <PixelButton variant="primary" size="sm" className="w-full text-xs py-1">
                    Create Goal
                  </PixelButton>
                  <PixelButton variant="outline" size="sm" className="w-full text-xs py-1">
                    Cancel
                  </PixelButton>
                </>
              ) : (
                <>
                  <Button variant="primary" size="sm" className="w-full text-xs py-1">
                    Create Goal
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs py-1">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Card 7: Payout Threshold */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-(--espresso)">
                    Payout Threshold
                  </h3>
                  <p className="text-[11px] text-[#7B5B49] leading-tight">
                    Set the minimum balance required before payout triggers.
                  </p>
                </div>
                <button
                  className="p-1 text-[#7B5B49] hover:text-(--espresso) rounded cursor-pointer"
                  aria-label="Dismiss payout settings"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-semibold text-(--espresso) block mb-0.5">
                    Preferred Currency
                  </label>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-(--border) bg-(--background) text-xs text-(--espresso)">
                    <span>USD — United States Dollar</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7B5B49]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-semibold text-(--espresso)">
                      Minimum Payout Amount
                    </span>
                    <span className="font-bold text-xs text-(--espresso)">
                      ${payoutAmount.toLocaleString()}.00
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="10000"
                    step="50"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-(--surface-muted) accent-(--caramel) cursor-pointer my-1.5"
                  />
                  <div className="flex justify-between text-[9px] text-[#7B5B49]">
                    <span>$50 (MIN)</span>
                    <span>$10,000 (MAX)</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-(--espresso) block mb-0.5">
                    Notes
                  </label>
                  {isPixel ? (
                    <PixelInput
                      placeholder="Add any notes for this payout..."
                      value={payoutNotes}
                      onChange={(e) => setPayoutNotes(e.target.value)}
                      className="text-xs py-1"
                    />
                  ) : (
                    <Input
                      placeholder="Add any notes for this payout..."
                      value={payoutNotes}
                      onChange={(e) => setPayoutNotes(e.target.value)}
                      className="text-xs py-1"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLUMN 4: Mobile Sync (QR Code) & Chat Assistant                */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4">
          {/* Card 8: Mobile Device Sync / QR Code */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <QrMatrix flavor={globalFlavor} />

              <div className="text-center space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-(--espresso)">
                  Scan to connect your mobile device
                </h4>
                <p className="text-[11px] text-[#7B5B49] leading-tight max-w-xs mx-auto">
                  Open the Ledger mobile app and scan this code to link your session.
                </p>
              </div>
            </div>
          </div>

          {/* Card 9: New Chat / Assistant Dialogue */}
          <div className={cardClass}>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-1.5">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-(--espresso)">
                    New Chat
                  </h3>
                  <p className="text-[11px] text-[#7B5B49]">How can I help you today?</p>
                </div>
                <button
                  className="p-1 text-[#7B5B49] hover:text-(--espresso) rounded cursor-pointer transition-colors"
                  aria-label="Refresh conversation"
                  onClick={() => setChatMessage("")}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Bubble with Avatar */}
              <div className="p-2.5 rounded-xl bg-(--background) border border-(--border) space-y-1.5">
                <div className="flex items-center gap-2">
                  {isPixel ? (
                    <PixelAvatar fallback="JU" size="sm" />
                  ) : (
                    <Avatar fallback="JU" size="sm" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-(--espresso) block">
                      Morning, Developer!
                    </span>
                    <span className="text-[9px] text-[#7B5B49]">Assistant v2.4</span>
                  </div>
                </div>
                <p className="text-xs text-[#7B5B49] leading-relaxed">
                  What are we working on today? Press send to start a new conversation.
                </p>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap gap-1">
                {["Deploy", "Export", "Theme", "Tokens"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setChatMessage(chip)}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-(--surface-muted) text-(--espresso) hover:bg-(--surface) border border-(--border) transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Input Bar */}
            <div className="pt-2 border-t border-dashed border-(--border) flex items-center gap-1.5">
              <div className="flex-1">
                {isPixel ? (
                  <PixelInput
                    placeholder="Ask anything..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="text-xs py-1"
                  />
                ) : (
                  <Input
                    placeholder="Ask anything..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="text-xs py-1"
                  />
                )}
              </div>
              {isPixel ? (
                <PixelButton
                  size="sm"
                  className="px-2 py-1"
                  onClick={() => setChatMessage("")}
                >
                  <Send className="w-3 h-3" />
                </PixelButton>
              ) : (
                <Button
                  size="sm"
                  className="px-2 py-1"
                  onClick={() => setChatMessage("")}
                >
                  <Send className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
