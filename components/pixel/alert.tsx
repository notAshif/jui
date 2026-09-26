import React from "react";
import { cn } from "@/lib/utils";
import { AlertProps } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const pixelVariantStyles = {
  info: "bg-(--surface-muted) border-(--border-strong) text-(--foreground)",
  warning: "bg-(--warning)/10 border-(--warning) text-(--warning-foreground)",
  error: "bg-(--destructive)/10 border-(--destructive) text-(--destructive-foreground)",
  success: "bg-(--success)/10 border-(--success) text-(--success-foreground)",
};

const pixelVariantIcons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

export const PixelAlert = ({ 
  variant = "info", 
  title, 
  children, 
  showCloseButton = false,
  onClose 
}: AlertProps) => {
  const Icon = pixelVariantIcons[variant];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-3 border",
        "pixel-border-panel",
        "font-pixel",
        pixelVariantStyles[variant]
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
        {children && (
          <div className="text-xs tracking-wide">
            {children}
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
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Close alert"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

PixelAlert.displayName = "PixelAlert";