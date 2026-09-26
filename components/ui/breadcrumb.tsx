import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeIcon?: boolean;
  className?: string;
}

export const Breadcrumb = ({ items, homeIcon = true, className }: BreadcrumbProps) => {
  return (
    <nav 
      className={cn("flex items-center space-x-2 text-sm", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="w-4 h-4 text-(--foreground/40)" 
                  aria-hidden="true"
                />
              )}
              
              {index === 0 && homeIcon && !item.icon && (
                <Home className="w-4 h-4 text-(--foreground/60) mr-1" aria-hidden="true" />
              )}
              
              {item.icon && <span className="mr-1">{item.icon}</span>}
              
              {isLast ? (
                <span 
                  className="font-medium text-(--foreground)"
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
                    "focus:outline-none focus:ring-2 focus:ring-(--ring) rounded",
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

Breadcrumb.displayName = "Breadcrumb";