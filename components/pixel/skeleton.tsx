import React from "react";
import { cn } from "@/lib/utils";
import { SkeletonProps } from "@/components/ui/skeleton";

export const PixelSkeleton = ({ 
  className, 
  variant = "rectangular",
  width,
  height,
  count = 1 
}: SkeletonProps) => {
  const variantStyles = {
    text: "h-4",
    circular: "rounded-full",
    rectangular: "",
  };

  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={cn(
        "bg-(--surface-muted)",
        "pixel-slot",
        variantStyles[variant],
        className
      )}
      style={{
        width: width || (variant === "text" ? "100%" : undefined),
        height: height || (variant === "text" ? "1rem" : undefined)
      }}
      aria-hidden="true"
    />
  ));

  return count > 1 ? (
    <div className="space-y-2">{skeletons}</div>
  ) : (
    skeletons[0]
  );
};

PixelSkeleton.displayName = "PixelSkeleton";