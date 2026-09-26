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
    text: "h-4 w-full",
    circular: "w-10 h-10",
    rectangular: "h-12 w-full",
  };

  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={cn(
        "bg-(--surface-muted)",
        "pixel-slot",
        "relative overflow-hidden",
        "animate-[pulse_1.5s_steps(4)_infinite]",
        variantStyles[variant],
        className
      )}
      style={{
        width: width || (variant === "text" ? "100%" : undefined),
        height: height || (variant === "text" ? "1rem" : undefined)
      }}
      aria-hidden="true"
    >
      {/* 8-bit scanline loading texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.08)_50%)] bg-[size:100%_4px] pointer-events-none" />
    </div>
  ));

  return count > 1 ? (
    <div className="space-y-2">{skeletons}</div>
  ) : (
    skeletons[0]
  );
};

PixelSkeleton.displayName = "PixelSkeleton";