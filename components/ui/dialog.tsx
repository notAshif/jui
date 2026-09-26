import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

const sizeStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({
    open = false,
    onClose,
    title,
    description,
    children,
    size = "md",
    showCloseButton = true,
    ...props
  }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        dialogRef.current?.focus();
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        previousActiveElement.current?.focus();
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          // Safe zone: 5% margin for TV overscan
          padding: "5%"
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Dialog Content */}
        <div
          ref={(node) => {
            dialogRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative w-full bg-(--surface-card) border border-(--border-strong)",
            "shadow-xl focus:outline-none",
            "animate-in fade-in zoom-in-95 duration-200",
            sizeStyles[size],
            props.className
          )}
          style={{
            // Motion-safe: respects reduced motion preference
            animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'none'
              : undefined
          }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-(--border)">
              <div className="flex-1">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-lg font-semibold text-(--foreground)"
                    // Text readability: ensure contrast
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="mt-1 text-sm text-(--foreground/70)"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={cn(
                    "ml-4 p-2 rounded-lg",
                    "text-(--foreground/60) hover:text-(--foreground)",
                    "hover:bg-(--surface-muted)",
                    "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                    // Touch target: minimum 44x44px
                    "min-w-[44px] min-h-[44px]",
                    "transition-colors duration-150"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Dialog.displayName = "Dialog";

// Dialog Footer for action buttons
export const DialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-6", className)}>
      {children}
    </div>
  );
};

DialogFooter.displayName = "DialogFooter";