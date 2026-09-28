import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProps } from "@/components/ui/tooltip";

export const PixelTooltip = ({ content, children, side = "top", align = "center", delay = 300 }: TooltipProps) => {
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
            "absolute z-50 px-3 py-2 text-xs",
            "bg-(--espresso) text-(--cream)",
            "pixel-border-bevel",
            "font-pixel tracking-wide",
            "w-max max-w-[240px] sm:max-w-xs whitespace-normal leading-relaxed pointer-events-none shadow-lg",
            alignStyles[align],
            sideStyles[side]
          )}
          style={{
            // Game UI: strong text outline for readability on any background
            textShadow: `
              -1px -1px 0 var(--espresso-deep),
              1px -1px 0 var(--espresso-deep),
              -1px 1px 0 var(--espresso-deep),
              1px 1px 0 var(--espresso-deep)
            `
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

PixelTooltip.displayName = "PixelTooltip";