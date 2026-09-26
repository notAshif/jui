import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DrawerProps, DrawerFooter as BaseDrawerFooter } from "@/components/ui/drawer";
import { X } from "lucide-react";

const pixelSideStyles = {
  left: "left-0 h-full",
  right: "right-0 h-full",
  top: "top-0 w-full",
  bottom: "bottom-0 w-full",
};

const pixelSizeStyles = {
  sm: "w-80 h-auto",
  md: "w-96 h-auto",
  lg: "w-[32rem] h-auto",
  xl: "w-[40rem] h-auto",
};

const pixelHorizontalSizeStyles = {
  sm: "h-80 w-full",
  md: "h-96 w-full",
  lg: "h-[32rem] w-full",
  xl: "h-[40rem] w-full",
};

export const PixelDrawer = React.forwardRef<HTMLDivElement, DrawerProps>(
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
    const currentSizeStyles = isHorizontal ? pixelHorizontalSizeStyles[size] : pixelSizeStyles[size];

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
          className="absolute inset-0 bg-black/60"
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
            "absolute bg-(--surface-card)",
            "pixel-border-panel",
            "focus:outline-none",
            // Game UI: instant appearance for drawers
            "font-pixel",
            pixelSideStyles[side],
            currentSizeStyles,
            className
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b-2 border-(--border-strong)">
              <div className="flex-1">
                {title && (
                  <h2
                    id="drawer-title"
                    className="text-sm font-semibold text-(--foreground) tracking-wider"
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
                    id="drawer-description"
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
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

PixelDrawer.displayName = "PixelDrawer";

// Pixel Drawer Footer
export const PixelDrawerFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-4 font-pixel", className)}>
      {children}
    </div>
  );
};

PixelDrawerFooter.displayName = "PixelDrawerFooter";