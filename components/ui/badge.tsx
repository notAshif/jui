import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

const badgeVariants = {
  default: "bg-(--caramel) text-(--cream)",
  secondary: "bg-(--cream-dark) text-(--espresso)",
  success: "bg-(--success)/15 text-(--success) border-(--success)/30",
  warning: "bg-(--warning)/15 text-(--warning) border-(--warning)/30",
  destructive: "bg-(--destructive)/15 text-(--destructive) border-(--destructive)/30",
  outline: "bg-transparent text-(--espresso) border border-(--border-strong)",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full select-none transition-colors border border-transparent",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
