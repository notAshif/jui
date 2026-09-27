import React from "react";
import { cn } from "@/lib/utils";

export interface BaseCardProps {
  className?: string;
  children: React.ReactNode;
}

export type BaseCardHeaderProps = BaseCardProps;
export type BaseCardTitleProps = BaseCardProps;
export type BaseCardDescriptionProps = BaseCardProps;
export type BaseCardContentProps = BaseCardProps;
export type BaseCardFooterProps = BaseCardProps;

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