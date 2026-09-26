import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const variantStyles = {
  default: "bg-(--surface-card) border-(--border-strong)",
  destructive: "bg-(--destructive) text-(--destructive-foreground) border-(--destructive)",
  success: "bg-(--success) text-(--success-foreground) border-(--success)",
  warning: "bg-(--warning) text-(--warning-foreground) border-(--warning)",
};

const variantIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
};

export const Toast = ({ 
  title, 
  description, 
  variant = "default", 
  duration = 5000,
  onClose,
  showCloseButton = true 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = variantIcons[variant];

  useEffect(() => {
    // Game UI pattern: Auto-dismiss after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "animate-in slide-in-from-right-full duration-300",
        "transition-all duration-300",
        variantStyles[variant]
      )}
      style={{
        // Game UI: respects reduced motion preference
        animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
          ? 'none' 
          : undefined
      }}
      role="alert"
      aria-live="polite"
    >
      {Icon && (
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-sm">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-sm opacity-90 mt-1">
            {description}
          </p>
        )}
      </div>

      {showCloseButton && (
        <button
          onClick={handleClose}
          className={cn(
            "p-1 rounded opacity-70 hover:opacity-100",
            "transition-opacity",
            // Touch target: minimum 32x32px
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

Toast.displayName = "Toast";

// Toast container for managing multiple toasts
export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
      style={{ 
        // Safe zone: 5% margin for TV overscan
        right: "5%",
        top: "5%"
      }}
    >
      {children}
    </div>
  );
};

ToastContainer.displayName = "ToastContainer";