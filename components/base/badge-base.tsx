import React from "react";
import { cn } from "@/lib/utils";

export interface BaseBadgeProps {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  className?: string;
}

export interface BadgeStyles {
  variant: Record<NonNullable<BaseBadgeProps["variant"]>, string>;
}

export function createBadgeComponent(
  styles: BadgeStyles,
  baseClasses: string,
  displayName: string
) {
  const Component = React.forwardRef<HTMLDivElement, BaseBadgeProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ variant = "default", className, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            baseClasses,
            styles.variant[variant],
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}