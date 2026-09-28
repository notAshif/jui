"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";

export interface SidebarSection {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
  }>;
}

export interface SidebarProps {
  sections: SidebarSection[];
  open?: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
  width?: "sm" | "md" | "lg";
  variant?: "fixed" | "inline";
}

const widthStyles = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
};

export const Sidebar = ({ sections, open = true, onClose, title, className, width = "md", variant = "fixed" }: SidebarProps) => {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionTitle: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionTitle)) {
      newCollapsed.delete(sectionTitle);
    } else {
      newCollapsed.add(sectionTitle);
    }
    setCollapsedSections(newCollapsed);
  };

  if (!open) return null;

  return (
    <aside
      className={cn(
        variant === "fixed"
          ? cn("fixed left-0 top-0 h-full shadow-lg z-40 border-r", widthStyles[width])
          : "relative h-full w-full",
        "bg-(--surface-card) border-(--border)",
        className
      )}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-(--border)">
        {title && (
          <h2 className="font-semibold text-lg">{title}</h2>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-lg",
              "text-(--foreground/60) hover:text-(--foreground)",
              "hover:bg-(--surface-muted)",
              "focus:outline-none focus:ring-2 focus:ring-(--ring)",
              // Touch target: minimum 32x32px
              "min-w-[32px] min-h-[32px]"
            )}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {sections.map((section, sectionIndex) => {
          const isCollapsed = collapsedSections.has(section.title);
          
          return (
            <div key={sectionIndex} className="mb-6">
              <button
                onClick={() => toggleSection(section.title)}
                className={cn(
                  "w-full flex items-center justify-between p-2 text-left",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-(--ring) rounded",
                  // Touch target: minimum 44px height
                  "min-h-[44px]",
                  "cursor-pointer",
                  "hover:bg-(--surface-muted)"
                )}
                aria-expanded={!isCollapsed}
              >
                <span className="font-medium text-sm">{section.title}</span>
                <ChevronRight 
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    !isCollapsed && "rotate-90"
                  )}
                  aria-hidden="true"
                />
              </button>

              {!isCollapsed && (
                <ul className="mt-2 space-y-1" role="list">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href || "#"}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-150",
                          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                          // Touch target: minimum 44px height
                          "min-h-[44px]",
                          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                          !item.disabled && "cursor-pointer",
                          item.active
                            ? "bg-(--surface-muted) text-(--foreground)"
                            : "text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted)"
                        )}
                        aria-current={item.active ? "page" : undefined}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";