"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@/components/ui/avatar";
import {
  renderPixelAvatarSvgElement,
  generateRandomAvatar,
  generate8BitAvatar,
  generate16BitAvatar,
  AvatarGenerationOptions,
} from "@/lib/avatar-generator";

export interface PixelAvatarProps extends AvatarProps {
  seed?: string;
  skinTone?: string;
  hairStyle?: string;
  hairColor?: string;
  eyeColor?: string;
  outfit?: string;
  accessory?: string;
  backgroundColor?: string;
  showBackground?: boolean;
}

const pixelSizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-14 h-14 text-sm",
  xl: "w-20 h-20 text-base",
};

const avatarPixelSizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function PixelAvatar({
  src,
  alt,
  fallback,
  seed,
  size = "md",
  skinTone,
  hairStyle,
  hairColor,
  eyeColor,
  outfit,
  accessory,
  backgroundColor,
  showBackground = true,
  className,
  ...props
}: PixelAvatarProps) {
  const [srcError, setSrcError] = useState(false);

  // Compute deterministic seed from seed prop, fallback initials, or alt text
  const effectiveSeed =
    seed ||
    (typeof fallback === "string" ? fallback : "") ||
    alt ||
    "jui-pixel-hero";

  const options: AvatarGenerationOptions = {
    skinTone,
    hairStyle,
    hairColor,
    eyeColor,
    outfit,
    accessory,
    backgroundColor,
    showBackground,
  };

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-none font-pixel select-none overflow-hidden",
        "bg-(--cream-dark) text-(--espresso) pixel-border-bevel",
        pixelSizeClasses[size] || pixelSizeClasses.md,
        className
      )}
      role="img"
      aria-label={alt || (typeof fallback === "string" ? fallback : "Pixel Avatar")}
      {...props}
    >
      {src && !srcError ? (
        <Image
          src={src}
          alt={alt || "Pixel Avatar"}
          width={avatarPixelSizes[size] || 40}
          height={avatarPixelSizes[size] || 40}
          onError={() => setSrcError(true)}
          unoptimized
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
      ) : (
        /* Instant synchronous AvatarsInPixels vector SVG.
           Renders in SSR HTML with ZERO delay and ZERO background flash on refresh. */
        renderPixelAvatarSvgElement(effectiveSeed, options, "h-full w-full object-cover")
      )}
    </div>
  );
}

export { generateRandomAvatar, generate8BitAvatar, generate16BitAvatar };
