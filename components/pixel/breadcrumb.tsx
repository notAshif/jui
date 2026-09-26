import React from "react";
import { cn } from "@/lib/utils";
import { BreadcrumbItem, BreadcrumbProps } from "@/components/ui/breadcrumb";
import { PixelChevronRightIcon } from "@/components/pixel/icons";
import { Home } from "lucide-react";

export const PixelBreadcrumb = ({ items, homeIcon = true, className }: BreadcrumbProps) => {
  return (
    <nav 
      className={cn("flex items-center space-x-2 text-xs font-pixel", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <PixelChevronRightIcon 
                  className="w-3 h-3 text-(--foreground/40)" 
                  aria-hidden="true"
                />
              )}
              
              {index === 0 && homeIcon && !item.icon && (
                <Home className="w-3 h-3 text-(--foreground/60) mr-1" aria-hidden="true" />
              )}
              
              {item.icon && <span className="mr-1">{item.icon}</span>}
              
              {isLast ? (
                <span 
                  className="font-medium text-(--foreground) tracking-wide"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    "text-(--foreground/60) hover:text-(--foreground)",
                    "transition-colors duration-150",
                    "focus:outline-none focus:ring-2 focus:ring-(--ring)",
                    // Touch target: minimum 32x32px
                    "min-h-[32px] min-w-[32px] inline-flex items-center"
                  )}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

PixelBreadcrumb.displayName = "PixelBreadcrumb";