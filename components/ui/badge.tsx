import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

const badgeVariants = {
  default: "bg-(--caramel) text-(--cream) border-transparent",
  secondary: "bg-(--cream-dark) text-(--espresso) border-(--border)",
  success: "bg-(--success) text-(--success-foreground) border-transparent",
  warning: "bg-(--warning) text-(--warning-foreground) border-transparent",
  destructive: "bg-(--destructive) text-(--destructive-foreground) border-transparent",
  outline: "border-(--border-strong) text-(--espresso) bg-transparent",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-(--ring)",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
