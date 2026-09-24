import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

const pixelVariantStyles = {
  primary: "bg-[var(--caramel)] text-[var(--cream)] hover:brightness-105",
  secondary: "bg-[var(--cream-dark)] text-[var(--espresso)] hover:brightness-95",
  outline: "bg-transparent text-[var(--espresso)] hover:bg-[var(--cream-dark)]",
  ghost: "bg-transparent text-[var(--espresso)] shadow-none hover:bg-[var(--cream-dark)] hover:pixel-btn-bevel",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:brightness-110",
  link: "bg-transparent text-[var(--caramel)] underline shadow-none p-0 h-auto",
};

const pixelSizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-xs gap-2",
  lg: "h-12 px-6 text-sm gap-2.5",
};

export const PixelButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-pixel tracking-wider select-none cursor-pointer",
          "rounded-none transition-none",
          variant !== "link" && variant !== "ghost" && "pixel-btn-bevel",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          pixelVariantStyles[variant],
          variant !== "link" && pixelSizeStyles[size],
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

PixelButton.displayName = "PixelButton";
