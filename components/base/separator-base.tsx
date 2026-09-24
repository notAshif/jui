import React from "react";
import { cn } from "@/lib/utils";

// Base interfaces following Interface Segregation Principle
export interface BaseSeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}

// Abstract base component following Dependency Inversion Principle
export function createSeparatorComponent(
  styleClasses: (orientation: "horizontal" | "vertical") => string,
  displayName: string
) {
  const Component = React.forwardRef<HTMLDivElement, BaseSeparatorProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ orientation = "horizontal", decorative = true, className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          aria-orientation={decorative ? undefined : orientation}
          className={cn(
            "shrink-0",
            styleClasses(orientation),
            className
          )}
          {...props}
        />
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}