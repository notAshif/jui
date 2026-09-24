import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

const badgeVariants = {
  default: "bg-[var(--caramel)] text-[var(--cream)] border-transparent",
  secondary: "bg-[var(--cream-dark)] text-[var(--espresso)] border-[var(--border)]",
  success: "bg-[var(--success)] text-[var(--success-foreground)] border-transparent",
  warning: "bg-[var(--warning)] text-[var(--warning-foreground)] border-transparent",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] border-transparent",
  outline: "border-[var(--border-strong)] text-[var(--espresso)] bg-transparent",
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
