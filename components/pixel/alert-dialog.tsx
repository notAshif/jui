import React from "react";
import { cn } from "@/lib/utils";
import { PixelDialog, PixelDialogFooter } from "@/components/pixel/dialog";
import { PixelButton } from "@/components/pixel/button";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

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
      size="sm"
      showCloseButton={false}
      className={cn(pixelVariantStyles[variant])}
    >
      <div className="flex flex-col items-center text-center space-y-3 py-1">
        {showIcon && Icon && (
          <div className={cn("p-2 bg-(--surface-muted) pixel-border-bevel", pixelVariantIconColors[variant])}>
            <Icon className="w-8 h-8" />
          </div>
        )}

        {description && (
          <p className="text-xs text-[#7B5B49] leading-relaxed tracking-wide max-w-sm">
            {description}
          </p>
        )}
      </div>

      <PixelDialogFooter className="mt-4">
        <PixelButton
          variant="outline"
          size="sm"
          onClick={handleCancel}
          className="text-xs"
        >
          {cancelText}
        </PixelButton>
        <PixelButton
          variant={variant === "destructive" ? "destructive" : "primary"}
          size="sm"
          onClick={handleConfirm}
          className="text-xs"
        >
          {confirmText}
        </PixelButton>
      </PixelDialogFooter>
    </PixelDialog>
  );
};

PixelAlertDialog.displayName = "PixelAlertDialog";