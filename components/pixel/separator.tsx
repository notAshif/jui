import React from "react";
import { cn } from "@/lib/utils";
import { SeparatorProps } from "@/components/ui/separator";

export function PixelSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "h-1 w-full border-t-2 border-b-2 border-dashed border-(--cinnamon)"
          : "w-1 h-full border-l-2 border-r-2 border-dashed border-(--cinnamon)",
        className
      )}
      {...props}
    />
  );
}
