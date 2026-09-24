import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@/components/ui/avatar";

const pixelSizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-14 h-14 text-sm",
};

export function PixelAvatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-none font-pixel select-none",
        "bg-[var(--cream-dark)] text-[var(--espresso)] pixel-border-bevel",
        pixelSizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </div>
  );
}
