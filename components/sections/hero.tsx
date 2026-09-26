"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PixelButton } from "@/components/pixel/button";
import { GithubIcon } from "@/components/github-icon";
import { Terminal, Copy, Check, ArrowRight } from "lucide-react";

export interface HeroProps {
  flavor: "modern" | "pixel";
}

export function Hero({ flavor }: HeroProps) {
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCliCommand = () => {
    navigator.clipboard.writeText("npx jui add button --flavor pixel");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 border-b border-dashed border-(--border)">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-(--caramel)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
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
        </div>
      </div>
    </section>
  );
}
