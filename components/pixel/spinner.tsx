import React from "react";
import { cn } from "@/lib/utils";
import { SpinnerProps } from "@/components/ui/spinner";

const pixelSizes = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const PixelSpinner = ({ size = "md", className, ...props }: SpinnerProps & React.HTMLAttributes<HTMLDivElement>) => {
  const pixelSize = pixelSizes[size] || 24;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center shrink-0", className)}
      {...props}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        shapeRendering="crispEdges"
        className="animate-[spin_0.8s_steps(8)_infinite] text-(--caramel)"
      >
        {/* 8-dot chunky pixel art spinner ring */}
        <rect x="10" y="2" width="4" height="4" opacity="1.0" />
        <rect x="16" y="4" width="4" height="4" opacity="0.875" />
        <rect x="18" y="10" width="4" height="4" opacity="0.75" />
        <rect x="16" y="16" width="4" height="4" opacity="0.625" />
        <rect x="10" y="18" width="4" height="4" opacity="0.5" />
        <rect x="4" y="16" width="4" height="4" opacity="0.375" />
        <rect x="2" y="10" width="4" height="4" opacity="0.25" />
        <rect x="4" y="4" width="4" height="4" opacity="0.125" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

PixelSpinner.displayName = "PixelSpinner";