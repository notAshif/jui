import React from "react";
import { cn } from "@/lib/utils";
import { PixelDialog, PixelDialogFooter } from "@/components/pixel/dialog";
import { AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";

export interface AlertDialogProps {
  open?: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "warning";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showIcon?: boolean;
}

const pixelVariantStyles = {
  default: "border-(--border-strong)",
  destructive: "border-(--destructive)",
  warning: "border-(--warning)",
};

const pixelVariantIcons = {
  default: Info,
  destructive: AlertCircle,
  warning: AlertTriangle,
};

const pixelVariantIconColors = {
  default: "text-(--foreground)",
  destructive: "text-(--destructive)",
  warning: "text-(--warning)",
};

export const PixelAlertDialog = ({
  open = false,
  onClose,
  title,
  description,
  variant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showIcon = true,
}: AlertDialogProps) => {
  const Icon = pixelVariantIcons[variant];

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <PixelDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="md"
      showCloseButton={false}
      className={cn(pixelVariantStyles[variant])}
    >
      <div className="flex flex-col items-center text-center">
        {showIcon && Icon && (
          <div className={cn("mb-4", pixelVariantIconColors[variant])}>
            <Icon className="w-10 h-10" />
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold tracking-wider">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-(--foreground/70) tracking-wide">
              {description}
            </p>
          )}
        </div>
      </div>

      <PixelDialogFooter>
        <button
          onClick={handleCancel}
          className={cn(
            "px-4 py-2",
            "bg-(--surface-muted) text-(--foreground)",
            "hover:bg-(--border)",
            "pixel-btn-bevel",
            "font-pixel text-xs tracking-wider",
            // Touch target: minimum 44px height
            "min-h-[44px]"
          )}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            "px-4 py-2",
            variant === "destructive" 
              ? "bg-(--destructive) text-(--destructive-foreground) hover:brightness-95"
              : variant === "warning"
              ? "bg-(--warning) text-(--warning-foreground) hover:brightness-95"
              : "bg-(--caramel) text-(--cream) hover:brightness-105",
            "pixel-btn-bevel",
            "font-pixel text-xs tracking-wider",
            // Touch target: minimum 44px height
            "min-h-[44px]"
          )}
        >
          {confirmText}
        </button>
      </PixelDialogFooter>
    </PixelDialog>
  );
};

PixelAlertDialog.displayName = "PixelAlertDialog";