import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-(--caramel) text-(--cream) hover:brightness-105 shadow-sm active:scale-[0.96]",
  secondary: "bg-(--cream-dark) text-(--espresso) hover:brightness-95 shadow-sm active:scale-[0.96]",
  outline: "bg-transparent text-(--espresso) hover:bg-(--cream-dark) border border-(--border-strong) active:scale-[0.96]",
  ghost: "bg-transparent text-(--espresso) shadow-none hover:bg-(--cream-dark)/60 active:scale-[0.96]",
  destructive: "bg-(--destructive) text-(--destructive-foreground) hover:brightness-110 shadow-sm active:scale-[0.96]",
  link: "bg-transparent text-(--caramel) underline shadow-none p-0 h-auto",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none cursor-pointer",
          "transition-transform duration-100 ease-out motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
