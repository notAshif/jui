import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AccordionProps } from "@/components/ui/accordion";
import { PixelChevronDownIcon } from "@/components/pixel/icons";

export const PixelAccordion = ({ items, allowMultiple = false, defaultOpen = [], className }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (allowMultiple) {
        newOpenItems.add(id);
      } else {
        newOpenItems.clear();
        newOpenItems.add(id);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={cn("w-full space-y-2 font-pixel", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="border-2 border-(--border-strong) relative">
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between p-3 text-left",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                // Touch target: minimum 44px height
                "min-h-[44px]",
                "text-xs tracking-wider",
                item.disabled && "opacity-50 cursor-not-allowed",
                !item.disabled && "cursor-pointer",
                isOpen ? "bg-(--surface-muted)" : "hover:bg-(--surface-muted)"
              )}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
            >
              <span className="font-medium">{item.title}</span>
              <PixelChevronDownIcon 
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            
            {isOpen && (
              <div
                id={`panel-${item.id}`}
                className="p-3 border-t-2 border-(--border-strong)"
                role="region"
                aria-labelledby={`header-${item.id}`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

PixelAccordion.displayName = "PixelAccordion";