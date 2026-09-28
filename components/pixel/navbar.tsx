"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarProps } from "@/components/ui/navbar";
import { Menu, X } from "lucide-react";

export const PixelNavbar = ({
  logo,
  items,
  actions,
  className,
  variant = "default",
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const variantStyles = {
    default: "relative",
    sticky: "sticky top-0 z-40",
    fixed: "fixed top-0 left-0 right-0 z-50",
  };

  return (
    <>
      <nav
        className={cn(
          "w-full bg-(--surface-card) border-b-2 border-(--border-strong)",
          "font-pixel",
          variantStyles[variant],
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          {/* Logo */}
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href || "#"}
                className={cn(
                  "px-4 py-2 text-xs font-medium transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                  "min-h-[44px] flex items-center",
                  "tracking-wider",
                  item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                  !item.disabled && "cursor-pointer",
                  item.active
                    ? "bg-(--surface-muted) text-(--foreground)"
                    : "text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted)"
                )}
                aria-current={item.active ? "page" : undefined}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            {actions && <div className="flex items-center space-x-2">{actions}</div>}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-(--surface-card) border-b-4 border-(--espresso) font-pixel p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href || "#"}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 text-xs tracking-wider pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 uppercase",
                  item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                  item.active
                    ? "bg-(--caramel) text-(--cream) font-bold"
                    : "text-(--espresso) hover:bg-(--surface-muted) hover:text-(--caramel)"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

PixelNavbar.displayName = "PixelNavbar";