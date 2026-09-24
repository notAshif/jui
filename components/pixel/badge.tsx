import React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps } from "@/components/ui/badge";

const pixelBadgeVariants = {
  default: "bg-(--caramel) text-(--cream)",
  secondary: "bg-(--cream-dark) text-(--espresso)",
  success: "bg-(--success) text-(--success-foreground)",
  warning: "bg-(--warning) text-(--warning-foreground)",
  destructive: "bg-(--destructive) text-(--destructive-foreground)",
  outline: "bg-transparent text-(--espresso)",
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
