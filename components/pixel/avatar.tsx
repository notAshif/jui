"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@/components/ui/avatar";
import { generateRandomAvatar, generate8BitAvatar, generate16BitAvatar } from "@/lib/avatar-generator";

const pixelSizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-14 h-14 text-sm",
};

const avatarPixelSizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function PixelAvatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
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
          console.error("[PixelAvatar] generateRandomAvatar returned empty string.");
        }
      } catch (error) {
        console.error("[PixelAvatar] Failed to generate avatar:", error);
      }
    }
  }, [src]);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-none font-pixel select-none overflow-hidden",
        "bg-(--cream-dark) text-(--espresso) pixel-border-bevel",
        pixelSizeClasses[size],
        className
      )}
      {...props}
    >
      {generatedAvatar && (
        <Image
          src={generatedAvatar}
          alt={alt || (typeof fallback === "string" ? fallback : "Pixel Avatar")}
          width={avatarPixelSizes[size]}
          height={avatarPixelSizes[size]}
          unoptimized
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
      )}
    </div>
  );
}

export { generate8BitAvatar, generate16BitAvatar };
