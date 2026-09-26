import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, disabled, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <input
          id={id}
          type={type}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={helperText && id ? `${id}-helper` : undefined}
          className={cn(
            "flex h-10 w-full px-3.5 py-2 text-sm select-none rounded-lg",
            "bg-(--surface-card) text-(--foreground) border border-(--border) shadow-xs",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:border-(--caramel)",
            "placeholder:text-(--foreground/40)",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-(--destructive) focus-visible:ring-(--destructive)",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            id={id ? `${id}-helper` : undefined}
            className={cn("text-xs leading-normal", error ? "text-(--destructive) font-medium" : "text-(--foreground/70)")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
