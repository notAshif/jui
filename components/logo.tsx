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
      aria-label="JUI Logo"
      role="img"
      {...props}
    >
      <rect width="36" height="36" rx="8" fill="var(--caramel)" fillOpacity="0.15" />
      <path
        d="M 10 9 C 10 9, 10 22, 16 26 C 20 28.5, 23 26, 23 22"
        stroke="var(--caramel)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="20" y="8" width="4" height="4" fill="var(--espresso)" />
      <rect x="24" y="8" width="4" height="4" fill="var(--caramel)" />
      <rect x="24" y="12" width="4" height="4" fill="var(--espresso)" />
      <rect x="24" y="16" width="4" height="4" fill="var(--caramel)" />
      <rect x="20" y="20" width="4" height="4" fill="var(--espresso)" />
      <rect x="16" y="24" width="4" height="4" fill="var(--caramel)" />
      <rect x="12" y="24" width="4" height="4" fill="var(--espresso)" />
      <rect x="12" y="8" width="3" height="3" fill="var(--cream)" />
    </svg>
  );
}
