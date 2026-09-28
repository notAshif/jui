"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  className?: string;
  variant?: "default" | "sticky" | "fixed";
}

export const Navbar = ({
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
          "w-full bg-(--surface-card) border-b border-(--border)",
          variantStyles[variant],
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3">
          {/* Logo */}
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href || "#"}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2",
                  "min-h-[44px] flex items-center",
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

          {/* Actions & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {actions && <div className="flex items-center space-x-2">{actions}</div>}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-(--foreground) hover:bg-(--surface-muted) transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-(--surface-card) border-b border-(--border) p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href || "#"}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                  item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                  item.active
                    ? "bg-(--surface-muted) text-(--foreground) font-semibold"
                    : "text-(--foreground/70) hover:text-(--foreground) hover:bg-(--surface-muted)"
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

Navbar.displayName = "Navbar";