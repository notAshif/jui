import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "destructive";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeStyles = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

const variantStyles = {
  default: "bg-(--caramel)",
  success: "bg-(--success)",
  warning: "bg-(--warning)",
  destructive: "bg-(--destructive)",
};

export const ProgressBar = ({ 
  value, 
  max = 100, 
  size = "md", 
  variant = "default", 
  showLabel = false,
  label = "Progress",
  className 
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1.5 font-medium">
          <span className="text-(--foreground/70)">{label}</span>
          <span className="tabular-nums font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-(--surface-muted) rounded-full overflow-hidden",
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-300 ease-out motion-reduce:transition-none",
            variantStyles[variant]
          )}
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";