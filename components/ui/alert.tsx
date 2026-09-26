import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export interface AlertProps {
  variant?: "info" | "warning" | "error" | "success";
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const variantStyles = {
  info: "bg-(--surface-muted) border-(--border-strong) text-(--foreground)",
  warning: "bg-(--warning)/10 border-(--warning) text-(--warning-foreground)",
  error: "bg-(--destructive)/10 border-(--destructive) text-(--destructive-foreground)",
  success: "bg-(--success)/10 border-(--success) text-(--success-foreground)",
};

const variantIcons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

export const Alert = ({ 
  variant = "info", 
  title, 
  children, 
  showCloseButton = false,
  onClose 
}: AlertProps) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg border",
        variantStyles[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      {Icon && (
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-sm mb-1">
            {title}
          </h4>
        )}
        {children && (
          <div className="text-sm">
            {children}
          </div>
        )}
      </div>

      {showCloseButton && (
        <button
          onClick={onClose}
          className={cn(
            "p-1 rounded opacity-70 hover:opacity-100",
            "transition-opacity",
            // Touch target: minimum 32x32px
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";