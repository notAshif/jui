import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { DialogProps } from "@/components/ui/dialog";
import { PixelCloseIcon } from "@/components/pixel/icons";

const pixelSizeStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-6xl",
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
    inline = false,
    ...props
  }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (open && !inline) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        dialogRef.current?.focus({ preventScroll: true });
        document.body.style.overflow = "hidden";
      } else if (!inline) {
        document.body.style.overflow = "";
        previousActiveElement.current?.focus({ preventScroll: true });
      }

      return () => {
        if (!inline) {
          document.body.style.overflow = "";
        }
      };
    }, [open, inline]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (!open) return null;

    if (inline) {
      return (
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
            "font-pixel",
            "flex flex-col shadow-xl overflow-hidden",
            pixelSizeStyles[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b-2 border-(--border-strong) shrink-0 bg-(--surface-card)">
              <div className="flex-1 min-w-0">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-xs sm:text-sm font-bold text-(--espresso) uppercase tracking-wider truncate"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="mt-0.5 text-[11px] text-[#7B5B49] tracking-wide"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center p-1 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer shrink-0 ml-2"
                  aria-label="Close dialog"
                >
                  <PixelCloseIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 p-3.5 sm:p-5 space-y-3">
            {children}
          </div>
        </div>
      );
    }

    const modalContent = (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 transition-opacity"
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
            "font-pixel",
            "flex flex-col max-h-[85vh] shadow-2xl overflow-hidden",
            pixelSizeStyles[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-(--border-strong) shrink-0 bg-(--surface-card)">
              <div className="flex-1 min-w-0">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-sm sm:text-base font-bold text-(--espresso) uppercase tracking-wider truncate"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="mt-0.5 text-xs text-[#7B5B49] tracking-wide"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center p-1 text-(--espresso) hover:text-(--caramel) hover:bg-(--surface-muted) pixel-border-bevel active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer shrink-0 ml-3"
                  aria-label="Close dialog"
                >
                  <PixelCloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {children}
          </div>
        </div>
      </div>
    );

    if (!mounted) return null;
    return createPortal(modalContent, document.body);
  }
);

PixelDialog.displayName = "PixelDialog";

// Pixel Dialog Footer
export const PixelDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("p-4 border-t-2 border-(--border-strong) bg-(--surface-card) shrink-0 flex items-center justify-end gap-3 font-pixel", className)}>
      {children}
    </div>
  );
};

PixelDialogFooter.displayName = "PixelDialogFooter";