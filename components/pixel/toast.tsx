import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ToastProps, ToastContainer as BaseToastContainer } from "@/components/ui/toast";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const pixelVariantStyles = {
  default: "bg-(--surface-card) border-(--border-strong)",
  destructive: "bg-(--destructive) text-(--destructive-foreground) border-(--destructive)",
  success: "bg-(--success) text-(--success-foreground) border-(--success)",
  warning: "bg-(--warning) text-(--warning-foreground) border-(--warning)",
};

const pixelVariantIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
};

export const PixelToast = ({ 
  title, 
  description, 
  variant = "default", 
  duration = 5000,
  onClose,
  showCloseButton = true 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = pixelVariantIcons[variant];

  useEffect(() => {
    // Game UI pattern: Auto-dismiss after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 200); // Faster exit for pixel style
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 200);
  };

  if (!isVisible) return null;

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
          <h4 className="font-semibold text-xs tracking-wider">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-xs opacity-90 mt-1 tracking-wide">
            {description}
          </p>
        )}
      </div>

      {showCloseButton && (
        <button
          onClick={handleClose}
          className={cn(
            "p-1 opacity-70 hover:opacity-100",
            "transition-opacity",
            // Touch target: minimum 32x32px
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Close notification"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

PixelToast.displayName = "PixelToast";

// Pixel Toast container
export const PixelToastContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm w-full font-pixel pointer-events-none p-4",
        className
      )}
    >
      <div className="flex flex-col-reverse gap-2 pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

PixelToastContainer.displayName = "PixelToastContainer";