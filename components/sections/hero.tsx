"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PixelButton } from "@/components/pixel/button";
import { GithubIcon } from "@/components/github-icon";
import { Terminal, Copy, Check, ArrowRight, Shield, Heart } from "lucide-react";

export function Hero() {
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCliCommand = () => {
    navigator.clipboard.writeText("npx jui add button");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 border-b-4 border-(--espresso) bg-(--background) font-pixel select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C0855212_1px,transparent_1px),linear-gradient(to_bottom,#C0855212_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-3 py-1.5 bg-(--surface-muted) text-(--espresso) pixel-border-bevel text-xs">
            <span className="flex items-center gap-1.5 text-(--destructive)">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>HP 82/100</span>
            </span>
            <span className="text-(--border-strong)">•</span>
            <span className="flex items-center gap-1.5 text-(--caramel)">
              <Shield className="w-3.5 h-3.5 fill-current" />
              <span>MP 100/100</span>
            </span>
            <span className="text-(--border-strong)">•</span>
            <span className="text-[#D48B38] font-bold">COINS: 99</span>
            <span className="text-(--border-strong)">•</span>
            <span className="text-(--espresso) font-bold">LVL: 42</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-(--espresso) leading-tight uppercase">
            TACTILE 2D PIXEL GAME UI.
            <br />
            <span className="text-(--caramel)">ARCADE &amp; RPG PRIMITIVES.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#7B5B49] leading-relaxed max-w-2xl mx-auto uppercase tracking-wide">
            RETRO 8-BIT &amp; 16-BIT UI PRIMITIVES CRAFTED FOR 2D INDIE GAMES AND RETRO WEB APPS.
            CONTROLLER-FIRST NAVIGATION, PHYSICAL PIXEL BEVELS, AND HIGH READABILITY.
          </p>

          <div className="pt-2 flex justify-center">
            <div
              onClick={copyCliCommand}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && copyCliCommand()}
              aria-label="Copy CLI installation command to clipboard"
              className="inline-flex items-center gap-3 px-4 py-2 bg-(--surface-card) text-xs text-(--espresso) pixel-border-bevel cursor-pointer select-none active:translate-x-0.5 active:translate-y-0.5"
            >
              <Terminal className="w-4 h-4 text-(--caramel)" />
              <span className="tracking-wider">&gt; npx jui add button</span>
              <span className="p-1 bg-(--surface-muted) text-(--espresso)">
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-(--success)" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs/component">
              <PixelButton size="lg" className="text-xs uppercase tracking-widest px-6 py-3">
                [A] EXPLORE ALL 28 PRIMITIVES
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
              </PixelButton>
            </Link>
            <Link
              href="https://github.com/notAshif/jui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PixelButton variant="outline" size="lg" className="text-xs uppercase tracking-widest px-6 py-3">
                <GithubIcon className="w-4 h-4 mr-1.5 inline" />
                [B] GITHUB REPO
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
