import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
};

export const EmptyState = ({ 
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
        "flex flex-col items-center justify-center text-center",
        sizeStyles[size],
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
      
      <h3 className="text-lg font-semibold text-(--foreground) mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-(--foreground/60) max-w-sm mb-6">
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

EmptyState.displayName = "EmptyState";