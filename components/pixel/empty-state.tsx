import React from "react";
import { cn } from "@/lib/utils";
import { EmptyStateProps } from "@/components/ui/empty-state";

const pixelSizeStyles = {
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
};

export const PixelEmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  className,
  size = "md"
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center font-pixel",
        pixelSizeStyles[size],
        className
      )}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="mb-4 text-(--foreground/40)">
          {icon}
        </div>
      )}
      
      <h3 className="text-sm font-semibold text-(--foreground) mb-2 tracking-wider">
        {title}
      </h3>
      
      {description && (
        <p className="text-xs text-(--foreground/60) max-w-sm mb-6 tracking-wide">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

PixelEmptyState.displayName = "PixelEmptyState";