"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { generateRandomAvatar, generate8BitAvatar, generate16BitAvatar } from "@/lib/avatar-generator";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

const avatarPixelSizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function Avatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
  const [srcError, setSrcError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      try {
        const avatar = generateRandomAvatar();
        if (avatar) {
          setGeneratedAvatar(avatar);
        } else {
          console.error("[Avatar] generateRandomAvatar returned empty string.");
        }
      } catch (error) {
        console.error("[Avatar] Failed to generate avatar:", error);
      }
    }
  }, [src]);

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
      {src && !srcError ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          width={avatarPixelSizes[size]}
          height={avatarPixelSizes[size]}
          onError={(e) => {
            console.error("[Avatar] Error loading src image:", src, e);
            setSrcError(true);
          }}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : generatedAvatar && !avatarError ? (
        <Image
          src={generatedAvatar}
          alt={alt || (typeof fallback === "string" ? fallback : "Generated Avatar")}
          width={avatarPixelSizes[size]}
          height={avatarPixelSizes[size]}
          onError={(e) => {
            console.error("[Avatar] Error rendering generated avatar:", e);
            setAvatarError(true);
          }}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </div>
  );
}

export { generate8BitAvatar, generate16BitAvatar };
