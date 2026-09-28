import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
  delay,
  className
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const effectiveDelay = delay ?? delayDuration;

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, effectiveDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const alignStyles = {
    start: side === "top" || side === "bottom" ? "left-0" : "top-0",
    center: side === "top" || side === "bottom" 
      ? "left-1/2 -translate-x-1/2" 
      : "top-1/2 -translate-y-1/2",
    end: side === "top" || side === "bottom" ? "right-0" : "bottom-0",
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
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-xs",
            "bg-(--espresso) text-(--cream)",
            "rounded-md shadow-lg pointer-events-none",
            "animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none",
            "w-max max-w-[240px] sm:max-w-xs whitespace-normal leading-relaxed",
            alignStyles[align],
            sideStyles[side]
          )}
          style={{
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
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