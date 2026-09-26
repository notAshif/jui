import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-(--caramel) text-(--cream) hover:brightness-105",
  secondary: "bg-(--cream-dark) text-(--espresso) hover:brightness-95",
  outline: "bg-transparent text-(--espresso) hover:bg-(--cream-dark)",
  ghost: "bg-transparent text-(--espresso) shadow-none hover:bg-(--cream-dark) hover:pixel-btn-bevel",
  destructive: "bg-(--destructive) text-(--destructive-foreground) hover:brightness-110",
  link: "bg-transparent text-(--caramel) underline shadow-none p-0 h-auto",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-xs gap-2",
  lg: "h-12 px-6 text-sm gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-pixel tracking-wider select-none cursor-pointer rounded-none",
          variant !== "link" && variant !== "ghost" && "pixel-btn-bevel",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
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

Button.displayName = "Button";
