import React from "react";
import { cn } from "@/lib/utils";

// Base interfaces following Interface Segregation Principle
export interface BaseCardProps {
  className?: string;
  children: React.ReactNode;
}

export interface BaseCardHeaderProps extends BaseCardProps {}
export interface BaseCardTitleProps extends BaseCardProps {}
export interface BaseCardDescriptionProps extends BaseCardProps {}
export interface BaseCardContentProps extends BaseCardProps {}
export interface BaseCardFooterProps extends BaseCardProps {}

// Abstract base component following Dependency Inversion Principle
export function createCardComponent(
  baseStyles: string,
  displayName: string
) {
  const Component = React.forwardRef<HTMLDivElement, BaseCardProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      return (
        <div ref={ref} className={cn(baseStyles, className)} {...props} />
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}

export function createCardSubComponent(
  baseStyles: string,
  displayName: string
) {
  const Component = React.forwardRef<HTMLDivElement, BaseCardProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      return (
        <div ref={ref} className={cn(baseStyles, className)} {...props} />
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}