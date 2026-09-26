import React from "react";
import { cn } from "@/lib/utils";

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

export const Navbar = ({ logo, items, actions, className, variant = "default" }: NavbarProps) => {
  const variantStyles = {
    default: "relative",
    sticky: "sticky top-0 z-40",
    fixed: "fixed top-0 left-0 right-0 z-50",
  };

  return (
    <nav
      className={cn(
        "w-full bg-(--surface-card) border-b border-(--border)",
        variantStyles[variant],
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2",
                // Touch target: minimum 44px height
                "min-h-[44px]",
                item.disabled && "opacity-50 cursor-not-allowed",
                !item.disabled && "cursor-pointer",
                item.active
                  ? "bg-(--surface-muted) text-(--foreground)"
                  : "text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted)"
              )}
              aria-current={item.active ? "page" : undefined}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";