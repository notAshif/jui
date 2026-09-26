import React from "react";
import { cn } from "@/lib/utils";

export interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ButtonStyles {
  variant: Record<NonNullable<BaseButtonProps["variant"]>, string>;
  size: Record<NonNullable<BaseButtonProps["size"]>, string>;
}

export function createButtonComponent(
  styles: ButtonStyles,
  displayName: string
) {
  const Component = React.forwardRef<HTMLButtonElement, BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ variant = "primary", size = "md", loading = false, disabled, className, children, ...props }, ref) => {
      return (
        <button
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            "inline-flex items-center justify-center select-none cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
            "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
            styles.variant[variant],
            variant !== "link" && styles.size[size],
            className
          )}
          {...props}
        >
          {loading && (
            <span className="inline-block w-2.5 h-2.5 bg-current animate-pulse mr-1.5" aria-hidden="true" />
          )}
          {children}
        </button>
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}