import React from "react";
import { cn } from "@/lib/utils";

// Base interfaces following Interface Segregation Principle
export interface BaseAvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface AvatarSizeStyles {
  size: Record<NonNullable<BaseAvatarProps["size"]>, string>;
}

// Abstract base component following Dependency Inversion Principle
export function createAvatarComponent(
  sizeStyles: AvatarSizeStyles,
  baseClasses: string,
  displayName: string
) {
  const Component = React.forwardRef<HTMLDivElement, BaseAvatarProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ src, alt, fallback, size = "md", className, ...props }, ref) => {
      const [hasError, setHasError] = React.useState(false);

      return (
        <div
          ref={ref}
          className={cn(
            baseClasses,
            sizeStyles.size[size],
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
  );

  Component.displayName = displayName;
  return Component;
}