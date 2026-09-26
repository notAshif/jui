import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
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

const variantStyles = {
  default: "border-(--border-strong)",
  destructive: "border-(--destructive)",
  warning: "border-(--warning)",
};

const variantIcons = {
  default: Info,
  destructive: AlertCircle,
  warning: AlertTriangle,
};

const variantIconColors = {
  default: "text-(--foreground)",
  destructive: "text-(--destructive)",
  warning: "text-(--warning)",
};

export const AlertDialog = ({
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
  const Icon = variantIcons[variant];

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="md"
      showCloseButton={false}
      className={cn(variantStyles[variant])}
    >
      <div className="flex flex-col items-center text-center">
        {showIcon && Icon && (
          <div className={cn("mb-4", variantIconColors[variant])}>
            <Icon className="w-12 h-12" />
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-(--foreground/70)">
              {description}
            </p>
          )}
        </div>
      </div>

      <DialogFooter>
        <button
          onClick={handleCancel}
          className={cn(
            "px-4 py-2 rounded-lg",
            "bg-(--surface-muted) text-(--foreground)",
            "hover:bg-(--border)",
            "transition-colors duration-150",
            // Touch target: minimum 44px height
            "min-h-[44px]"
          )}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            "px-4 py-2 rounded-lg",
            variant === "destructive" 
              ? "bg-(--destructive) text-(--destructive-foreground) hover:brightness-95"
              : variant === "warning"
              ? "bg-(--warning) text-(--warning-foreground) hover:brightness-95"
              : "bg-(--caramel) text-(--cream) hover:bg-(--caramel-hover)",
            "transition-colors duration-150",
            // Touch target: minimum 44px height
            "min-h-[44px]"
          )}
        >
          {confirmText}
        </button>
      </DialogFooter>
    </Dialog>
  );
};

AlertDialog.displayName = "AlertDialog";