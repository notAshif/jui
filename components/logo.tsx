import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 32, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JUI Game UI Logo"
      role="img"
      {...props}
    >
      <rect width="36" height="36" fill="var(--caramel)" fillOpacity="0.2" />
      <rect x="2" y="2" width="32" height="32" stroke="var(--espresso)" strokeWidth="2" />
      <rect x="10" y="8" width="16" height="4" fill="var(--espresso)" />
      <rect x="18" y="12" width="8" height="12" fill="var(--caramel)" />
      <rect x="10" y="20" width="8" height="8" fill="var(--caramel)" />
      <rect x="14" y="24" width="8" height="4" fill="var(--espresso)" />
      <rect x="8" y="20" width="4" height="4" fill="var(--espresso)" />
      <rect x="18" y="12" width="4" height="8" fill="var(--espresso)" />
      <rect x="24" y="8" width="4" height="4" fill="var(--cream)" />
    </svg>
  );
}
