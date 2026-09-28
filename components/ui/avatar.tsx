"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  renderPixelAvatarSvgElement,
  generateRandomAvatar,
  generate8BitAvatar,
  generate16BitAvatar,
} from "@/lib/avatar-generator";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-lg",
};

const avatarPixelSizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [srcError, setSrcError] = useState(false);

  const effectiveSeed =
    (typeof fallback === "string" ? fallback : "") || alt || "jui-modern-user";

  const isShortInitials =
    typeof fallback === "string" && fallback.trim().length > 0 && fallback.trim().length <= 3;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full select-none overflow-hidden",
        "bg-(--cream-dark) text-(--espresso) ring-1 ring-black/10 dark:ring-white/10 font-semibold shadow-xs",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      role="img"
      aria-label={alt || (typeof fallback === "string" ? fallback : "Avatar")}
      {...props}
    >
      {src && !srcError ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          width={avatarPixelSizes[size] || 40}
          height={avatarPixelSizes[size] || 40}
          onError={() => setSrcError(true)}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : isShortInitials ? (
        <span aria-hidden="true" className="uppercase font-bold tracking-tight">
          {fallback}
        </span>
      ) : (
        renderPixelAvatarSvgElement(effectiveSeed, { size: avatarPixelSizes[size] }, "h-full w-full object-cover")
      )}
    </div>
  );
}

export { generateRandomAvatar, generate8BitAvatar, generate16BitAvatar };
