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
            "flex h-10 w-full rounded-lg border bg-(--surface) px-3 py-2 text-sm transition-all duration-150",
            "border-(--border) text-(--foreground)",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-(--destructive) focus-visible:ring-(--destructive) text-(--destructive)",
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            id={id ? `${id}-helper` : undefined}
            className={cn("text-xs", error ? "text-(--destructive) font-medium" : "text-[#7B5B49]")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
