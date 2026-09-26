import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarSection, SidebarProps } from "@/components/ui/sidebar";
import { PixelChevronRightIcon, PixelCloseIcon } from "@/components/pixel/icons";

const pixelWidthStyles = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
};

export const PixelSidebar = ({ sections, open = true, onClose, title, className, width = "md", variant = "fixed" }: SidebarProps) => {
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
          ? cn("fixed left-0 top-0 h-full border-r-2 z-40", pixelWidthStyles[width])
          : "relative h-full w-full",
        "bg-(--surface-card) border-(--border-strong)",
        "pixel-border-panel",
        "font-pixel",
        className
      )}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b-2 border-(--border-strong)">
        {title && (
          <h2 className="font-semibold text-sm tracking-wider">{title}</h2>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "p-2",
              "text-(--foreground/60) hover:text-(--foreground)",
              "hover:bg-(--surface-muted)",
              "focus:outline-none focus:ring-2 focus:ring-(--ring)",
              "min-w-[32px] min-h-[32px]"
            )}
            aria-label="Close sidebar"
          >
            <PixelCloseIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {sections.map((section, sectionIndex) => {
          const isCollapsed = collapsedSections.has(section.title);
          
          return (
            <div key={sectionIndex} className="mb-6">
              <button
                onClick={() => toggleSection(section.title)}
                className={cn(
                  "w-full flex items-center justify-between p-2 text-left",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                  "min-h-[44px]",
                  "text-xs tracking-wider",
                  "cursor-pointer",
                  "hover:bg-(--surface-muted)"
                )}
                aria-expanded={!isCollapsed}
              >
                <span className="font-medium">{section.title}</span>
                <PixelChevronRightIcon 
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    !isCollapsed && "rotate-90"
                  )}
                  aria-hidden="true"
                />
              </button>

              {!isCollapsed && (
                <ul className="mt-2 space-y-1" role="list">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-xs transition-colors duration-150",
                          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                          "min-h-[44px]",
                          "tracking-wide",
                          item.disabled && "opacity-50 cursor-not-allowed",
                          !item.disabled && "cursor-pointer",
                          item.active
                            ? "bg-(--surface-muted) text-(--foreground)"
                            : "text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted)"
                        )}
                        aria-current={item.active ? "page" : undefined}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </a>
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

PixelSidebar.displayName = "PixelSidebar";