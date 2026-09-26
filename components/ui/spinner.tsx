import React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <div
      className={cn(
        "inline-block rounded-full border-(--border) border-t-(--caramel)",
        !prefersReducedMotion && "animate-spin",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.displayName = "Spinner";