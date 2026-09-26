import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

export function Avatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full select-none overflow-hidden",
        "bg-(--cream-dark) text-(--espresso) ring-1 ring-black/10 dark:ring-white/10 font-semibold shadow-xs",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </div>
  );
}
