import React from "react";
import { cn } from "@/lib/utils";
import { ProgressBarProps } from "@/components/ui/progress-bar";

const pixelSizeStyles = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

const pixelVariantStyles = {
  default: "bg-(--caramel)",
  success: "bg-(--success)",
  warning: "bg-(--warning)",
  destructive: "bg-(--destructive)",
};

export const PixelProgressBar = ({ 
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
    <div className={cn("w-full font-pixel", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-(--foreground/70) tracking-wide">{label}</span>
          <span className="font-semibold tracking-wider tabular-nums">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-(--surface-muted) overflow-hidden",
          "pixel-slot",
          pixelSizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-200 ease-out motion-reduce:transition-none",
            pixelVariantStyles[variant]
          )}
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  );
};

PixelProgressBar.displayName = "PixelProgressBar";