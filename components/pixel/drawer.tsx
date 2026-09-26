import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DrawerProps } from "@/components/ui/drawer";
import { PixelCloseIcon } from "@/components/pixel/icons";

const pixelSideStyles = {
  left: "left-0 top-0 bottom-0 h-full",
  right: "right-0 top-0 bottom-0 h-full",
  top: "top-0 left-0 right-0 w-full",
  bottom: "bottom-0 left-0 right-0 w-full",
};

const pixelVerticalWidthStyles = {
  sm: "w-72 sm:w-80",
  md: "w-80 sm:w-96",
  lg: "w-96 sm:w-[32rem]",
  xl: "w-full sm:w-[40rem]",
};

const pixelHorizontalHeightStyles = {
  sm: "h-72 sm:h-80",
  md: "h-80 sm:h-96",
  lg: "h-96 sm:h-[32rem]",
  xl: "h-full sm:h-[40rem]",
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
        drawerRef.current?.focus({ preventScroll: true });
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        previousActiveElement.current?.focus({ preventScroll: true });
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
    const dimensionStyles = isHorizontal
      ? pixelHorizontalHeightStyles[size]
      : pixelVerticalWidthStyles[size];

    return (
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        aria-describedby={description ? "drawer-description" : undefined}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 transition-opacity"
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
            "fixed bg-(--surface-card)",
            "pixel-border-panel",
            "focus:outline-none",
            "font-pixel",
            "flex flex-col",
            "shadow-2xl max-w-full",
            pixelSideStyles[side],
            dimensionStyles,
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b-2 border-(--border-strong) shrink-0 bg-(--surface-card)">
              <div className="flex-1 min-w-0">
                {title && (
                  <h2
                    id="drawer-title"
                    className="text-sm sm:text-base font-bold text-(--espresso) uppercase tracking-wider truncate"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="drawer-description"
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
                  aria-label="Close drawer"
                >
                  <PixelCloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
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
    <div className={cn("p-4 border-t-2 border-(--border-strong) bg-(--surface-card) shrink-0 flex items-center justify-end gap-3 font-pixel", className)}>
      {children}
    </div>
  );
};

PixelDrawerFooter.displayName = "PixelDrawerFooter";