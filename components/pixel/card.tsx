import React from "react";
import { cn } from "@/lib/utils";

export function PixelCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-none bg-(--surface-muted) text-(--foreground) p-1",
        "pixel-border-panel relative select-none",
        className
      )}
      {...props}
    />
  );
}

export function PixelCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-2 p-5 border-b-2 border-dashed border-(--border-strong)", className)}
      {...props}
    />
  );
}

export function PixelCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-pixel text-sm uppercase tracking-widest text-(--espresso)", className)}
      {...props}
    />
  );
}

export function PixelCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-pixel text-[10px] tracking-wider text-[#7B5B49]", className)} {...props} />;
}

export function PixelCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-4", className)} {...props} />;
}

export function PixelCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}
