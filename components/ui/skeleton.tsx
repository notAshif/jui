import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const Skeleton = ({ 
  className, 
  variant = "rectangular",
  width,
  height,
  count = 1 
}: SkeletonProps) => {
  const variantStyles = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded",
  };

  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={cn(
        "bg-(--surface-muted)",
        "animate-pulse",
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

Skeleton.displayName = "Skeleton";