import React from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/components/ui/input";

export const PixelInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, disabled, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        <input
          id={id}
          type={type}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={helperText && id ? `${id}-helper` : undefined}
          className={cn(
            "flex h-10 w-full px-3 py-2 font-pixel text-xs tracking-wider select-none",
            "bg-(--surface-muted) text-(--foreground) rounded-none",
            "pixel-input-bevel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "text-(--destructive)",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            id={id ? `${id}-helper` : undefined}
            className={cn("font-pixel text-[10px] tracking-wider", error ? "text-(--destructive)" : "text-[#7B5B49]")}
          >
            {error ? `[!] ${helperText}` : helperText}
          </p>
        )}
      </div>
    );
  }
);

PixelInput.displayName = "PixelInput";
