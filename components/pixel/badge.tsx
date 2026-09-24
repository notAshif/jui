import React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps } from "@/components/ui/badge";

const pixelBadgeVariants = {
  default: "bg-[var(--caramel)] text-[var(--cream)]",
  secondary: "bg-[var(--cream-dark)] text-[var(--espresso)]",
  success: "bg-[var(--success)] text-[var(--success-foreground)]",
  warning: "bg-[var(--warning)] text-[var(--warning-foreground)]",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)]",
  outline: "bg-transparent text-[var(--espresso)]",
};

export function PixelBadge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center font-pixel text-[10px] tracking-wider px-2 py-0.5 rounded-none select-none",
        "pixel-border-bevel uppercase",
        pixelBadgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
