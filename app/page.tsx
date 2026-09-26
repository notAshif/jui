"use client";

import React, { useState, useCallback } from "react";
import { Header, Hero, Showcase, Footer } from "@/components/sections";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

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
      className="min-h-screen w-full flex flex-col bg-(--background) text-(--foreground) selection:bg-(--caramel) selection:text-(--cream) font-pixel"
    >
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <Hero />
      <Showcase />
      <Footer />
    </div>
  );
}
