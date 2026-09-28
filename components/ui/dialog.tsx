import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  className?: string;
  inline?: boolean;
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
            "relative w-full bg-(--surface-card) border border-(--border-strong)",
            "shadow-xl focus:outline-none rounded-xl overflow-hidden",
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-(--border)">
              <div className="flex-1">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-base font-semibold text-(--foreground)"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="mt-0.5 text-xs text-(--foreground/70)"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-3 p-1.5 rounded-lg text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted) transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
          <div className="p-4 sm:p-6">{children}</div>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
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
            "animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none",
            sizeStyles[size],
            className
          )}
          {...props}
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

    if (!mounted) return null;
    return createPortal(modalContent, document.body);
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