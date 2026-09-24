import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-[var(--caramel)] text-[var(--cream)] hover:bg-[var(--caramel-hover)] shadow-sm active:scale-[0.98]",
  secondary: "bg-[var(--surface-muted)] text-[var(--espresso)] hover:bg-[#EBD8C4] border border-[var(--border)] active:scale-[0.98]",
  outline: "border border-[var(--border-strong)] text-[var(--espresso)] hover:bg-[var(--surface-muted)] active:scale-[0.98]",
  ghost: "text-[var(--espresso)] hover:bg-[var(--surface-muted)] active:scale-[0.98]",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:brightness-95 active:scale-[0.98]",
  link: "text-[var(--caramel)] underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
