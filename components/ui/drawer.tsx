import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  className?: string;
}

const sideStyles = {
  left: "left-0 h-full",
  right: "right-0 h-full",
  top: "top-0 w-full",
  bottom: "bottom-0 w-full",
};

const sizeStyles = {
  sm: "w-80 h-auto",
  md: "w-96 h-auto",
  lg: "w-[32rem] h-auto",
  xl: "w-[40rem] h-auto",
};

const horizontalSizeStyles = {
  sm: "h-80 w-full",
  md: "h-96 w-full",
  lg: "h-[32rem] w-full",
  xl: "h-[40rem] w-full",
};

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({
    open = false,
    onClose,
    title,
    description,
    children,
    side = "right",
    size = "md",
    showCloseButton = true,
    className,
    ...props
  }, ref) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        drawerRef.current?.focus();
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

    const isHorizontal = side === "top" || side === "bottom";
    const currentSizeStyles = isHorizontal ? horizontalSizeStyles[size] : sizeStyles[size];

    return (
      <div
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        aria-describedby={description ? "drawer-description" : undefined}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer Content */}
        <div
          ref={(node) => {
            drawerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute bg-(--surface-card) border border-(--border-strong)",
            "shadow-xl focus:outline-none",
            "animate-in duration-300 ease-out motion-reduce:animate-none",
            side === "left" && "slide-in-from-left",
            side === "right" && "slide-in-from-right",
            side === "top" && "slide-in-from-top",
            side === "bottom" && "slide-in-from-bottom",
            sideStyles[side],
            currentSizeStyles,
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
                    id="drawer-title"
                    className="text-lg font-semibold text-(--foreground)"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="drawer-description"
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
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Drawer.displayName = "Drawer";

// Drawer Footer for action buttons
export const DrawerFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-6", className)}>
      {children}
    </div>
  );
};

DrawerFooter.displayName = "DrawerFooter";