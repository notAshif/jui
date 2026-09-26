import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { PixelSearchIcon } from "@/components/pixel/icons";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  className?: string;
}

export const CommandPalette = ({ 
  items, 
  open = false, 
  onClose, 
  placeholder = "Search...",
  className 
}: CommandPaletteProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const flatItems = Object.values(groupedItems).flat();
    
    switch (e.key) {
      case "Escape":
        onClose?.();
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
        break;
      case "Enter":
        e.preventDefault();
        const selectedItem = flatItems[selectedIndex];
        if (selectedItem && !selectedItem.disabled) {
          selectedItem.onSelect?.();
          onClose?.();
        }
        break;
    }
  };

  const handleSelect = (item: CommandItem) => {
    if (!item.disabled) {
      item.onSelect?.();
      onClose?.();
    }
  };

  if (!open) return null;

  let currentIndex = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      style={{ 
        // Safe zone: 5% margin for TV overscan
        padding: "5%" 
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Command Palette */}
      <div
        className={cn(
          "relative w-full max-w-2xl bg-(--surface-card) border border-(--border-strong)",
          "shadow-xl rounded-lg",
          "animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none",
          className
        )}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 gap-3 bg-(--surface-card)">
          <PixelSearchIcon className="w-5 h-5 text-(--foreground/50) shrink-0 select-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none text-sm placeholder-(--foreground/40) py-0.5 leading-normal"
            onKeyDown={handleKeyDown}
            aria-label="Search commands"
            data-no-focus-outline
          />
          <kbd className="shrink-0 px-2 py-1 text-xs bg-(--surface-muted) rounded text-(--foreground/60) select-none leading-none">
            ⌘K
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-4">
              <div className="px-3 py-2 text-xs font-medium text-(--foreground/60) uppercase tracking-wider">
                {category}
              </div>
              {categoryItems.map((item) => {
                const itemIndex = currentIndex++;
                const isSelected = itemIndex === selectedIndex;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    disabled={item.disabled}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg text-left",
                      "transition-colors duration-150",
                      "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                      // Touch target: minimum 44px height
                      "min-h-[44px]",
                      item.disabled && "opacity-50 cursor-not-allowed",
                      !item.disabled && "cursor-pointer",
                      isSelected
                        ? "bg-(--surface-muted)"
                        : "hover:bg-(--surface-muted)"
                    )}
                    aria-selected={isSelected}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-(--foreground/60)">{item.description}</div>
                      )}
                    </div>
                    {item.shortcut && (
                      <kbd className="px-2 py-1 text-xs bg-(--surface-muted) rounded text-(--foreground/60)">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-(--foreground/60)">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CommandPalette.displayName = "CommandPalette";