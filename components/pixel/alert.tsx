import React from "react";
import { cn } from "@/lib/utils";
import { AlertProps } from "@/components/ui/alert";
import {
  PixelInfoIcon,
  PixelWarningIcon,
  PixelAlertIcon,
  PixelCheckIcon,
  PixelCloseIcon
} from "@/components/pixel/icons";

const pixelVariantStyles = {
  info: "bg-(--surface-muted) border-(--border-strong) text-(--foreground)",
  warning: "bg-(--warning)/10 border-(--warning) text-(--warning-foreground)",
  error: "bg-(--destructive)/10 border-(--destructive) text-(--destructive-foreground)",
  success: "bg-(--success)/10 border-(--success) text-(--success-foreground)",
};

const pixelVariantIcons = {
  info: PixelInfoIcon,
  warning: PixelWarningIcon,
  error: PixelAlertIcon,
  success: PixelCheckIcon,
};

export const PixelAlert = ({ 
  variant = "info", 
  title, 
  description,
  children, 
  showCloseButton = false, 
  onClose,
  className
}: AlertProps) => {
  const Icon = pixelVariantIcons[variant];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-3 border",
        "pixel-border-panel",
        "font-pixel",
        pixelVariantStyles[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {Icon && (
        <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-xs tracking-wider mb-1">
            {title}
          </h4>
        )}
        {(description || children) && (
          <div className="text-xs tracking-wide">
            {description || children}
          </div>
        )}
      </div>

      {showCloseButton && (
        <button
          onClick={onClose}
          className={cn(
            "p-1 opacity-70 hover:opacity-100",
            "transition-opacity",
            // Touch target: minimum 32x32px
            "min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
          )}
          aria-label="Close alert"
        >
          <PixelCloseIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

PixelAlert.displayName = "PixelAlert";