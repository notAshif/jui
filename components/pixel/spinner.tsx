import React from "react";
import { cn } from "@/lib/utils";
import { SpinnerProps } from "@/components/ui/spinner";

const pixelSizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export const PixelSpinner = ({ size = "md", className }: SpinnerProps) => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <div
      className={cn(
        "inline-block border-(--border) border-t-(--caramel)",
        !prefersReducedMotion && "animate-spin",
        pixelSizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

PixelSpinner.displayName = "PixelSpinner";