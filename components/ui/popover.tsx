import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  content: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export const Popover = ({ open, onOpenChange, children, content, align = "center", side = "bottom" }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const controlledOpen = open !== undefined;
  const currentOpen = controlledOpen ? open : isOpen;

  const handleToggle = () => {
    if (controlledOpen) {
      onOpenChange?.(!currentOpen);
    } else {
      setIsOpen(!currentOpen);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      triggerRef.current && 
      !triggerRef.current.contains(event.target as Node) &&
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      if (controlledOpen) {
        onOpenChange?.(false);
      } else {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    if (currentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [currentOpen]);

  const alignStyles = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const sideStyles = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative inline-block">
      <div 
        ref={triggerRef}
        onClick={handleToggle}
        className="inline-block"
      >
        {children}
      </div>

      {currentOpen && (
        <div
          ref={contentRef}
          className={cn(
            "absolute z-50 w-64 p-4",
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
          role="dialog"
          aria-modal="false"
        >
          {content}
        </div>
      )}
    </div>
  );
};

Popover.displayName = "Popover";