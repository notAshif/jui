"use client";

import React, { useState, useCallback } from "react";
import { Header, Hero, Showcase, Footer } from "@/components/sections";

export default function LandingPage() {
  const [flavor, setFlavor] = useState<"modern" | "pixel">("modern");
  const [darkMode, setDarkMode] = useState(false);

  const toggleGlobalFlavor = useCallback(() => {
    const nextFlavor = flavor === "modern" ? "pixel" : "modern";
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-flavor", nextFlavor);
    setFlavor(nextFlavor);

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

  return (
    <div
      id="home"
      className="min-h-screen w-full flex flex-col bg-(--background) text-(--foreground) selection:bg-(--caramel) selection:text-(--cream)"
    >
      <Header
        flavor={flavor}
        darkMode={darkMode}
        onToggleFlavor={toggleGlobalFlavor}
        onToggleDarkMode={toggleDarkMode}
      />
      <Hero flavor={flavor} />
      <Showcase globalFlavor={flavor} />
      <Footer />
    </div>
  );
}
