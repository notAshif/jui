import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delay?: number;
}

export const Tooltip = ({ content, children, side = "top", align = "center", delay = 300 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Game UI pattern: 300-500ms delay before showing tooltips
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    <div 
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm",
            "bg-(--espresso) text-(--cream)",
            "rounded shadow-lg",
            "animate-in fade-in zoom-in-95 duration-150",
            "max-w-xs",
            alignStyles[align],
            sideStyles[side]
          )}
          style={{
            // Game UI: text outline for readability
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            // Motion-safe: respects reduced motion preference
            animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? 'none' 
              : undefined
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";