import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CommandItem, CommandPaletteProps } from "@/components/ui/command-palette";
import { Search } from "lucide-react";

export const PixelCommandPalette = ({ 
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

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      inputRef.current?.focus({ preventScroll: true });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus({ preventScroll: true });
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 font-pixel"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative w-full max-w-2xl bg-(--surface-card)",
          "pixel-border-panel",
          className
        )}
      >
        <div className="flex items-center border-b-2 border-(--border-strong) p-3">
          <Search className="w-4 h-4 text-(--foreground/40) mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-xs placeholder-(--foreground/40) tracking-wide"
            onKeyDown={handleKeyDown}
            aria-label="Search commands"
          />
          <kbd className="px-2 py-1 text-xs bg-(--surface-muted) pixel-btn-bevel text-(--foreground/60)">
            ⌘K
          </kbd>
        </div>

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
                      "w-full flex items-center px-3 py-2 text-left",
                      "transition-colors duration-150",
                      "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                      "min-h-[44px]",
                      "text-xs tracking-wide",
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
                      <div className="text-xs font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-(--foreground/60)">{item.description}</div>
                      )}
                    </div>
                    {item.shortcut && (
                      <kbd className="px-2 py-1 text-xs bg-(--surface-muted) pixel-btn-bevel text-(--foreground/60)">
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

PixelCommandPalette.displayName = "PixelCommandPalette";