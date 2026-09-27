/**
 * Pixel Component Registry
 * Maps Jev decision keys -> concrete React pixel UI components.
 * Adding a new component: add key to question schema, register adapter here.
 */

import React from "react";
import { FeedbackChoice, GameEvent } from "@/lib/jev/pixelUIQuestions";
import { PixelToast } from "@/components/pixel/toast";
import { PixelDialog, PixelDialogFooter } from "@/components/pixel/dialog";
import { PixelAlert } from "@/components/pixel/alert";
import { PixelButton } from "@/components/pixel/button";

export interface PixelFeedbackComponentProps {
  title: string;
  message: string;
  urgency?: "low" | "medium" | "high" | "critical";
  onDismiss?: () => void;
  onConfirm?: () => void;
  className?: string;
}

/**
 * 1. Toast Feedback Adapter (Ambient transient feedback)
 */
export const FeedbackToastAdapter: React.FC<PixelFeedbackComponentProps> = ({
  title,
  message,
  urgency = "low",
  onDismiss,
  className,
}) => {
  const variant =
    urgency === "critical"
      ? "destructive"
      : urgency === "high"
      ? "warning"
      : "default";

  return (
    <div className={className}>
      <PixelToast
        onClose={onDismiss}
        title={title}
        description={message}
        variant={variant}
        duration={5000}
      />
    </div>
  );
};
FeedbackToastAdapter.displayName = "FeedbackToastAdapter";

/**
 * 2. DialogBox Feedback Adapter (Urgent blocking modal requiring confirmation)
 */
export const FeedbackDialogAdapter: React.FC<PixelFeedbackComponentProps> = ({
  title,
  message,
  onConfirm,
  onDismiss,
  className,
}) => {
  return (
    <PixelDialog
      open={true}
      onClose={onDismiss || onConfirm}
      title={title}
      size="sm"
      className={className}
    >
      <div className="py-2 text-xs text-(--foreground/90) leading-relaxed">
        {message}
      </div>
      <PixelDialogFooter className="mt-4">
        <PixelButton
          variant="primary"
          size="sm"
          onClick={onConfirm || onDismiss}
          className="w-full text-xs font-pixel"
        >
          [ ENTER ] Continue
        </PixelButton>
      </PixelDialogFooter>
    </PixelDialog>
  );
};
FeedbackDialogAdapter.displayName = "FeedbackDialogAdapter";

/**
 * 3. Alert Feedback Adapter (Persistent inline tactical notification)
 */
export const FeedbackAlertAdapter: React.FC<PixelFeedbackComponentProps> = ({
  title,
  message,
  urgency = "medium",
  onDismiss,
  className,
}) => {
  const variant =
    urgency === "critical"
      ? "error"
      : urgency === "high"
      ? "warning"
      : "info";

  return (
    <PixelAlert
      variant={variant}
      title={title}
      showCloseButton={Boolean(onDismiss)}
      onClose={onDismiss}
      className={className}
    >
      {message}
    </PixelAlert>
  );
};
FeedbackAlertAdapter.displayName = "FeedbackAlertAdapter";

/**
 * Pure lookup table mapping Jev FeedbackChoice -> React Component
 */
export const feedbackComponentRegistry: Record<
  FeedbackChoice,
  React.ComponentType<PixelFeedbackComponentProps>
> = {
  toast: FeedbackToastAdapter,
  dialog: FeedbackDialogAdapter,
  alert: FeedbackAlertAdapter,
};

/**
 * Helper to fetch a component by choice key with a safe default.
 */
export function getFeedbackComponent(
  choice: FeedbackChoice
): React.ComponentType<PixelFeedbackComponentProps> {
  return feedbackComponentRegistry[choice] || feedbackComponentRegistry.toast;
}

/**
 * Composite Dynamic Feedback Renderer with Ghost/Pending State Support
 */
export interface DynamicPixelFeedbackProps {
  choice: FeedbackChoice;
  event: GameEvent;
  isPending?: boolean;
  onDismiss?: () => void;
  onConfirm?: () => void;
  className?: string;
}

export const DynamicPixelFeedback: React.FC<DynamicPixelFeedbackProps> = ({
  choice,
  event,
  isPending = false,
  onDismiss,
  onConfirm,
  className,
}) => {
  const Component = getFeedbackComponent(choice);

  return (
    <div
      className={`relative transition-all duration-200 ${
        isPending ? "opacity-60 grayscale-[40%] scale-[0.98]" : "opacity-100 scale-100"
      }`}
    >
      {isPending && (
        <div className="absolute -top-3 right-2 z-10 px-2 py-0.5 text-[10px] font-pixel bg-(--caramel) text-(--espresso) border border-(--border-strong) animate-pulse shadow-sm">
          CONFIRMING INTENT...
        </div>
      )}
      <Component
        title={event.title}
        message={event.message}
        urgency={event.urgency}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        className={className}
      />
    </div>
  );
};
DynamicPixelFeedback.displayName = "DynamicPixelFeedback";
