"use client";

import React, { useState, useCallback } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggleIcon } from "@/components/theme-toggle-icon";
import { Button } from "@/components/ui/button";
import { PixelButton } from "@/components/pixel/button";
import { Input } from "@/components/ui/input";
import { PixelInput } from "@/components/pixel/input";
import { Badge } from "@/components/ui/badge";
import { PixelBadge } from "@/components/pixel/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  PixelCard,
  PixelCardHeader,
  PixelCardTitle,
  PixelCardDescription,
  PixelCardContent,
  PixelCardFooter,
} from "@/components/pixel/card";
import { Separator } from "@/components/ui/separator";
import { PixelSeparator } from "@/components/pixel/separator";
import { Avatar } from "@/components/ui/avatar";
import { PixelAvatar } from "@/components/pixel/avatar";
import {
  Star,
  Copy,
  Check,
  Sparkles,
  Terminal,
  ArrowRight,
  Sun,
  Moon,
  Shield,
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const MENU_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Docs", href: "#docs" },
  { label: "Components", href: "#components" },
];

export default function LandingPage() {
  const [flavor, setFlavor] = useState<"modern" | "pixel">("modern");
  const [darkMode, setDarkMode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const [buttonFlavor, setButtonFlavor] = useState<"modern" | "pixel">("modern");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputFlavor, setInputFlavor] = useState<"modern" | "pixel">("modern");
  const [inputError, setInputError] = useState(false);
  const [badgeFlavor, setBadgeFlavor] = useState<"modern" | "pixel">("modern");
  const [cardFlavor, setCardFlavor] = useState<"modern" | "pixel">("modern");
  const [separatorFlavor, setSeparatorFlavor] = useState<"modern" | "pixel">("modern");
  const [avatarFlavor, setAvatarFlavor] = useState<"modern" | "pixel">("modern");

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const toggleGlobalFlavor = useCallback(() => {
    const nextFlavor = flavor === "modern" ? "pixel" : "modern";
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-flavor", nextFlavor);
    setFlavor(nextFlavor);

    setButtonFlavor(nextFlavor);
    setInputFlavor(nextFlavor);
    setBadgeFlavor(nextFlavor);
    setCardFlavor(nextFlavor);
    setSeparatorFlavor(nextFlavor);
    setAvatarFlavor(nextFlavor);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    });
  }, [flavor]);

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

  const copyCliCommand = () => {
    navigator.clipboard.writeText("npx jui add button --flavor pixel");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copySnippet = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(name);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-(--background) text-(--foreground) selection:bg-(--caramel) selection:text-(--cream)">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-(--background)/90 border-b border-dashed border-(--border-strong) transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded-lg p-1">
              <Logo size={36} className="transition-transform duration-200 group-hover:scale-105" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-xl tracking-tight text-(--espresso)">JUI</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-(--surface-muted) text-(--cinnamon) border border-(--border)">
                  beta
                </span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-(--surface-muted)/60 px-3 py-1.5 rounded-full border border-(--border)" aria-label="Main Navigation">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-1 text-sm font-medium text-(--foreground) hover:text-(--caramel) transition-colors rounded-full hover:bg-(--surface) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="https://github.com/asifs/jui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="p-2 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/asifs/jui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star this repository on GitHub"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-(--border-strong) bg-(--surface-card) hover:bg-(--surface-muted) text-(--espresso) transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
            >
              <Star className="w-3.5 h-3.5 text-[#D48B38]" />
              <span className="hidden sm:inline">Star</span>
            </a>

            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to Parchment Light Mode" : "Switch to Campfire Dark Mode"}
              className="p-2 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#D9965B]" /> : <Moon className="w-4 h-4 text-(--cinnamon)" />}
            </button>

            <button
              onClick={toggleGlobalFlavor}
              aria-label={`Current mode: ${flavor}. Click to convert into ${flavor === "modern" ? "2D Pixel Game UI" : "Modern Product UI"}`}
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

      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-dashed border-(--border)">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-(--caramel)/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-(--espresso) leading-tight">
              Modern SaaS Primitives.
              <br />
              <span className="text-(--caramel)">Tactile 2D Pixel Game UI.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#7B5B49] leading-relaxed max-w-2xl mx-auto">
              Build clean product web applications and nostalgic 8-bit retro games from one unified codebase.
              Direct code ownership, shared TypeScript contracts, and zero black-box dependencies.
            </p>

            <div className="pt-2 flex justify-center">
              <div
                onClick={copyCliCommand}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && copyCliCommand()}
                aria-label="Copy CLI installation command to clipboard"
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-(--surface-muted) border border-(--border-strong) text-sm font-mono text-(--espresso) shadow-xs hover:border-(--caramel) transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
              >
                <Terminal className="w-4 h-4 text-(--caramel)" />
                <span>npx jui add button --flavor pixel</span>
                <span className="p-1 rounded bg-(--surface) text-(--espresso) group-hover:text-(--caramel) transition-colors">
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <a href="#components">
                {flavor === "modern" ? (
                  <Button size="lg" className="shadow-md">
                    Explore Components
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <PixelButton size="lg">
                    Explore Components
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </PixelButton>
                )}
              </a>
              <a href="https://github.com/asifs/jui" target="_blank" rel="noopener noreferrer">
                {flavor === "modern" ? (
                  <Button variant="outline" size="lg">
                    <GithubIcon className="w-4 h-4 mr-1.5 inline" />
                    GitHub Source
                  </Button>
                ) : (
                  <PixelButton variant="outline" size="lg">
                    <GithubIcon className="w-4 h-4 mr-1.5 inline" />
                    GitHub Source
                  </PixelButton>
                )}
              </a>
            </div>
          </div>

          <div className="mt-12 max-w-xl mx-auto">
            <div className="p-1 rounded-2xl bg-linear-to-b from-(--border) to-transparent">
              <div className="p-6 rounded-xl bg-(--surface-card) border border-(--border) shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-4">
                  <div className="flex items-center gap-3">
                    {flavor === "modern" ? (
                      <Avatar fallback="AP" size="md" />
                    ) : (
                      <PixelAvatar fallback="AP" size="md" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-(--espresso)">Asif Player</h4>
                      <p className="text-xs text-[#7B5B49]">Guild Architect • Lvl 42</p>
                    </div>
                  </div>
                  {flavor === "modern" ? (
                    <Badge variant="success">Online</Badge>
                  ) : (
                    <PixelBadge variant="success">Online</PixelBadge>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-(--espresso)">Quest Log Input</label>
                  {flavor === "modern" ? (
                    <Input placeholder="Enter dungeon secret key..." />
                  ) : (
                    <PixelInput placeholder="Enter dungeon key..." />
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#7B5B49] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-(--caramel)" />
                    100% Shared Prop Contract
                  </span>
                  {flavor === "modern" ? (
                    <Button size="sm">Cast Spell</Button>
                  ) : (
                    <PixelButton size="sm">Cast Spell</PixelButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="components" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--espresso) tracking-tight">
            Component Showcase
          </h2>
          <p className="text-base text-[#7B5B49]">
            Every component is built with identical prop signatures across both Modern and Pixel flavors.
            Toggle any card to inspect and copy the code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Button Primitive</h3>
                <p className="text-xs text-[#7B5B49]">6 variants, 3 sizes, loading & tactile states</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setButtonFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${buttonFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setButtonFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${buttonFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 flex flex-wrap items-center gap-3 p-4 bg-(--background) rounded-xl border border-(--border)">
              {buttonFlavor === "modern" ? (
                <>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="primary" loading={buttonLoading} onClick={() => setButtonLoading(!buttonLoading)}>
                    {buttonLoading ? "Loading..." : "Click to Load"}
                  </Button>
                </>
              ) : (
                <>
                  <PixelButton variant="primary">Primary</PixelButton>
                  <PixelButton variant="secondary">Secondary</PixelButton>
                  <PixelButton variant="outline">Outline</PixelButton>
                  <PixelButton variant="destructive">Destructive</PixelButton>
                  <PixelButton variant="primary" loading={buttonLoading} onClick={() => setButtonLoading(!buttonLoading)}>
                    {buttonLoading ? "Loading" : "Click to Load"}
                  </PixelButton>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <span>Props: `variant`, `size`, `loading`, `disabled`</span>
              <button
                onClick={() =>
                  copySnippet(
                    "button",
                    buttonFlavor === "modern"
                      ? `<Button variant="primary">Click Me</Button>`
                      : `<PixelButton variant="primary">Click Me</PixelButton>`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "button" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "button" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Input Primitive</h3>
                <p className="text-xs text-[#7B5B49]">Normal, error validation, helper text slots</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setInputFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${inputFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setInputFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${inputFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 flex flex-col justify-center gap-4 p-4 bg-(--background) rounded-xl border border-(--border)">
              {inputFlavor === "modern" ? (
                <>
                  <Input placeholder="name@example.com" helperText="Your primary account address" />
                  <Input
                    placeholder="Enter password..."
                    error={inputError}
                    helperText={inputError ? "Password must be at least 8 characters" : "Toggle error state below"}
                  />
                </>
              ) : (
                <>
                  <PixelInput placeholder="player@guild.net" helperText="Primary guild contact" />
                  <PixelInput
                    placeholder="Secret rune key..."
                    error={inputError}
                    helperText={inputError ? "Rune signature invalid" : "Toggle error state below"}
                  />
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <button
                onClick={() => setInputError(!inputError)}
                className="underline hover:text-(--caramel) cursor-pointer"
              >
                {inputError ? "Clear Error State" : "Simulate Error State"}
              </button>
              <button
                onClick={() =>
                  copySnippet(
                    "input",
                    inputFlavor === "modern"
                      ? `<Input placeholder="Email" error={false} helperText="Helper text" />`
                      : `<PixelInput placeholder="Email" error={false} helperText="Helper text" />`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "input" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "input" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Badge Primitive</h3>
                <p className="text-xs text-[#7B5B49]">Status chips, tags, and retro indicators</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setBadgeFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${badgeFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setBadgeFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${badgeFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 flex flex-wrap items-center gap-2.5 p-4 bg-(--background) rounded-xl border border-(--border)">
              {badgeFlavor === "modern" ? (
                <>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </>
              ) : (
                <>
                  <PixelBadge variant="default">Default</PixelBadge>
                  <PixelBadge variant="secondary">Secondary</PixelBadge>
                  <PixelBadge variant="success">Success</PixelBadge>
                  <PixelBadge variant="warning">Warning</PixelBadge>
                  <PixelBadge variant="destructive">Destructive</PixelBadge>
                  <PixelBadge variant="outline">Outline</PixelBadge>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <span>6 Semantic status variants</span>
              <button
                onClick={() =>
                  copySnippet(
                    "badge",
                    badgeFlavor === "modern" ? `<Badge variant="success">Active</Badge>` : `<PixelBadge variant="success">Active</PixelBadge>`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "badge" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "badge" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Card Composition</h3>
                <p className="text-xs text-[#7B5B49]">Container with Header, Title, Content, Footer</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setCardFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${cardFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setCardFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${cardFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 p-2 bg-(--background) rounded-xl border border-(--border) flex items-center justify-center">
              {cardFlavor === "modern" ? (
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Storage Inventory</CardTitle>
                    <CardDescription>Server capacity and cache utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-[#7B5B49]">82.4 GB of 128 GB utilized across nodes.</p>
                  </CardContent>
                  <CardFooter className="justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">Upgrade</Button>
                  </CardFooter>
                </Card>
              ) : (
                <PixelCard className="w-full max-w-sm">
                  <PixelCardHeader>
                    <PixelCardTitle>Inventory Bag</PixelCardTitle>
                    <PixelCardDescription>Potion slots & mana crystals</PixelCardDescription>
                  </PixelCardHeader>
                  <PixelCardContent>
                    <p className="font-pixel text-[10px] text-[#7B5B49]">14 of 20 inventory slots occupied.</p>
                  </PixelCardContent>
                  <PixelCardFooter className="justify-end gap-2">
                    <PixelButton variant="outline" size="sm">
                      Drop
                    </PixelButton>
                    <PixelButton size="sm">Equip</PixelButton>
                  </PixelCardFooter>
                </PixelCard>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <span>Compound Card structure</span>
              <button
                onClick={() =>
                  copySnippet(
                    "card",
                    cardFlavor === "modern"
                      ? `<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>`
                      : `<PixelCard><PixelCardHeader><PixelCardTitle>Title</PixelCardTitle></PixelCardHeader></PixelCard>`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "card" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "card" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Separator Primitive</h3>
                <p className="text-xs text-[#7B5B49]">Horizontal & vertical section dividers</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setSeparatorFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${separatorFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setSeparatorFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${separatorFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 flex flex-col justify-center gap-4 p-4 bg-(--background) rounded-xl border border-(--border)">
              <span className="text-xs font-semibold text-(--espresso)">Section Alpha</span>
              {separatorFlavor === "modern" ? <Separator /> : <PixelSeparator />}
              <span className="text-xs font-semibold text-(--espresso)">Section Beta</span>
              <div className="flex items-center gap-4 h-6 text-xs text-[#7B5B49]">
                <span>Option A</span>
                {separatorFlavor === "modern" ? <Separator orientation="vertical" /> : <PixelSeparator orientation="vertical" />}
                <span>Option B</span>
                {separatorFlavor === "modern" ? <Separator orientation="vertical" /> : <PixelSeparator orientation="vertical" />}
                <span>Option C</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <span>Accessible role="separator"</span>
              <button
                onClick={() =>
                  copySnippet(
                    "separator",
                    separatorFlavor === "modern" ? `<Separator orientation="horizontal" />` : `<PixelSeparator orientation="horizontal" />`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "separator" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "separator" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-(--border) bg-(--surface-card) shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-(--border) pb-3">
              <div>
                <h3 className="font-bold text-base text-(--espresso)">Avatar Primitive</h3>
                <p className="text-xs text-[#7B5B49]">Async image decoding, initials fallback, sm/md/lg</p>
              </div>
              <div className="flex items-center bg-(--surface-muted) p-0.5 rounded-lg border border-(--border) text-xs font-medium">
                <button
                  onClick={() => setAvatarFlavor("modern")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${avatarFlavor === "modern" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setAvatarFlavor("pixel")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${avatarFlavor === "pixel" ? "bg-(--surface) text-(--espresso) shadow-xs font-semibold" : "text-[#7B5B49]"}`}
                >
                  2D Pixel
                </button>
              </div>
            </div>

            <div className="min-h-35 flex items-center justify-center gap-6 p-4 bg-(--background) rounded-xl border border-(--border)">
              {avatarFlavor === "modern" ? (
                <>
                  <Avatar fallback="SM" size="sm" />
                  <Avatar fallback="MD" size="md" />
                  <Avatar fallback="LG" size="lg" />
                </>
              ) : (
                <>
                  <PixelAvatar fallback="S" size="sm" />
                  <PixelAvatar fallback="M" size="md" />
                  <PixelAvatar fallback="L" size="lg" />
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#7B5B49]">
              <span>Circular modern vs square stepped pixel framing</span>
              <button
                onClick={() =>
                  copySnippet(
                    "avatar",
                    avatarFlavor === "modern" ? `<Avatar fallback="JD" size="md" />` : `<PixelAvatar fallback="JD" size="md" />`
                  )
                }
                className="inline-flex items-center gap-1 hover:text-(--caramel) cursor-pointer"
              >
                {copiedSnippet === "avatar" ? <Check className="w-3.5 h-3.5 text-(--success)" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSnippet === "avatar" ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-dashed border-(--border-strong) py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-[#7B5B49]">
          Built by{" "}
          <a
            href="https://github.com/asifs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--espresso) hover:text-(--caramel) underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded px-1"
          >
            Asif
          </a>{" "}
          and the source code is available on{" "}
          <a
            href="https://github.com/asifs/jui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--espresso) hover:text-(--caramel) underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded px-1"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
