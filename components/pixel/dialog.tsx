import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DialogProps, DialogFooter as BaseDialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";

const pixelSizeStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export const PixelDialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({
    open = false,
    onClose,
    title,
    description,
    children,
    size = "md",
    showCloseButton = true,
    className,
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
          className="absolute inset-0 bg-black/60"
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
            "relative w-full bg-(--surface-card)",
            "pixel-border-panel",
            "focus:outline-none",
            // Game UI: instant appearance for critical dialogs
            "font-pixel",
            pixelSizeStyles[size],
            className
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b-2 border-(--border-strong)">
              <div className="flex-1">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-sm font-semibold text-(--foreground) tracking-wider"
                    // Game UI: text outline for readability on any background
                    style={{
                      textShadow: `
                        -1px -1px 0 var(--espresso-deep),
                        1px -1px 0 var(--espresso-deep),
                        -1px 1px 0 var(--espresso-deep),
                        1px 1px 0 var(--espresso-deep)
                      `
                    }}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="mt-1 text-xs text-(--foreground/80) tracking-wide"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={cn(
                    "ml-4 p-2 font-pixel",
                    "text-(--foreground/70) hover:text-(--foreground)",
                    "hover:bg-(--surface-muted)",
                    "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                    // Touch target: minimum 44x44px
                    "min-w-[44px] min-h-[44px]",
                    "pixel-btn-bevel"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

PixelDialog.displayName = "PixelDialog";

// Pixel Dialog Footer
export const PixelDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-4 font-pixel", className)}>
      {children}
    </div>
  );
};

PixelDialogFooter.displayName = "PixelDialogFooter";