import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Collapsible = ({ trigger, children, open, onOpenChange, className }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

  const controlledOpen = open !== undefined;
  const currentOpen = controlledOpen ? open : isOpen;

  const toggle = () => {
    if (controlledOpen) {
      onOpenChange?.(!currentOpen);
    } else {
      setIsOpen(!currentOpen);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <button
        onClick={toggle}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2",
          // Touch target: minimum 44px height
          "min-h-[44px]",
          "cursor-pointer",
          currentOpen ? "bg-(--surface-muted)" : "hover:bg-(--surface-muted)"
        )}
        aria-expanded={currentOpen}
      >
        <span className="font-medium text-sm">{trigger}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            currentOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      
      {currentOpen && (
        <div className="p-4 border-t border-(--border)">
          {children}
        </div>
      )}
    </div>
  );
};

Collapsible.displayName = "Collapsible";