import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

const badgeVariants = {
  default: "bg-(--caramel) text-(--cream)",
  secondary: "bg-(--cream-dark) text-(--espresso)",
  success: "bg-(--success) text-(--success-foreground)",
  warning: "bg-(--warning) text-(--warning-foreground)",
  destructive: "bg-(--destructive) text-(--destructive-foreground)",
  outline: "bg-transparent text-(--espresso)",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center font-pixel text-[10px] tracking-wider px-2 py-0.5 rounded-none select-none",
        "pixel-border-bevel uppercase",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
