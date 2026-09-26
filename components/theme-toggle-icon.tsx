import React from "react";

export interface PixelIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function PixelSunIcon({ size = 18, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Cardinals */}
      <rect x="11" y="1" width="2" height="3" />
      <rect x="11" y="20" width="2" height="3" />
      <rect x="1" y="11" width="3" height="2" />
      <rect x="20" y="11" width="3" height="2" />
      {/* Diagonals */}
      <rect x="4" y="4" width="2" height="2" />
      <rect x="18" y="4" width="2" height="2" />
      <rect x="4" y="18" width="2" height="2" />
      <rect x="18" y="18" width="2" height="2" />
      {/* Sun Core */}
      <rect x="9" y="6" width="6" height="2" />
      <rect x="7" y="8" width="10" height="2" />
      <rect x="6" y="10" width="12" height="4" />
      <rect x="7" y="14" width="10" height="2" />
      <rect x="9" y="16" width="6" height="2" />
    </svg>
  );
}

export function PixelMoonIcon({ size = 18, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="9" y="2" width="6" height="2" />
      <rect x="7" y="4" width="4" height="2" />
      <rect x="14" y="4" width="3" height="2" />
      <rect x="5" y="6" width="4" height="2" />
      <rect x="15" y="6" width="3" height="2" />
      <rect x="4" y="8" width="3" height="8" />
      <rect x="15" y="8" width="3" height="2" />
      <rect x="13" y="10" width="3" height="2" />
      <rect x="11" y="12" width="3" height="2" />
      <rect x="13" y="14" width="3" height="2" />
      <rect x="5" y="16" width="4" height="2" />
      <rect x="15" y="16" width="3" height="2" />
      <rect x="7" y="18" width="4" height="2" />
      <rect x="14" y="18" width="3" height="2" />
      <rect x="9" y="20" width="6" height="2" />
    </svg>
  );
}

export function ThemeToggleIcon({
  darkMode,
  size = 18,
  className = "",
  ...props
}: PixelIconProps & { darkMode?: boolean; flavor?: string }) {
  if (darkMode) {
    return <PixelSunIcon size={size} className={className} {...props} />;
  }
  return <PixelMoonIcon size={size} className={className} {...props} />;
}
