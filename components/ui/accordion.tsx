import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion = ({ items, allowMultiple = false, defaultOpen = [], className }: AccordionProps) => {
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
    <div className={cn("w-full space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="border border-(--border) rounded-lg overflow-hidden">
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between p-4 text-left",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2",
                // Touch target: minimum 44px height
                "min-h-[44px]",
                item.disabled && "opacity-50 cursor-not-allowed",
                !item.disabled && "cursor-pointer",
                isOpen ? "bg-(--surface-muted)" : "hover:bg-(--surface-muted)"
              )}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
            >
              <span className="font-medium text-sm">{item.title}</span>
              <ChevronDown 
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            
            {isOpen && (
              <div
                id={`panel-${item.id}`}
                className="p-4 border-t border-(--border)"
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

Accordion.displayName = "Accordion";