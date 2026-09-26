import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownMenuItem {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
}

export const DropdownMenu = ({ trigger, items, align = "start", side = "bottom" }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      triggerRef.current && 
      !triggerRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  const alignStyles = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const sideStyles = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  return (
    <div className="relative inline-block">
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute z-50 min-w-[180px] py-2",
            "bg-(--surface-card) border border-(--border-strong)",
            "shadow-lg rounded-lg",
            "animate-in fade-in zoom-in-95 duration-200",
            alignStyles[align],
            sideStyles[side]
          )}
          style={{
            // Motion-safe: respects reduced motion preference
            animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? 'none' 
              : undefined
          }}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={cn(
                "w-full px-4 py-2 text-left flex items-center gap-3",
                "transition-colors duration-150",
                "focus:outline-none focus:bg-(--surface-muted)",
                // Touch target: minimum 44px height
                "min-h-[44px]",
                item.disabled && "opacity-50 cursor-not-allowed",
                item.destructive && "text-(--destructive) hover:bg-(--destructive)/10",
                !item.destructive && !item.disabled && "hover:bg-(--surface-muted)",
                !item.disabled && "cursor-pointer"
              )}
              role="menuitem"
            >
              {item.checked && <Check className="w-4 h-4 flex-shrink-0" />}
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownMenu.displayName = "DropdownMenu";