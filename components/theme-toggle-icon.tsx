import React from "react";

interface ThemeToggleIconProps extends React.SVGProps<SVGSVGElement> {
  flavor: "modern" | "pixel";
  size?: number;
}

export function ThemeToggleIcon({ flavor, size = 20, className = "", ...props }: ThemeToggleIconProps) {
  if (flavor === "pixel") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="10" y="2" width="4" height="4" />
        <rect x="8" y="6" width="8" height="4" />
        <rect x="2" y="10" width="20" height="4" />
        <rect x="6" y="14" width="12" height="4" />
        <rect x="8" y="18" width="8" height="4" />
        <rect x="6" y="18" width="4" height="4" />
        <rect x="14" y="18" width="4" height="4" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3c0 4.97 4.03 9 9 9-4.97 0-9 4.03-9 9 0-4.97-4.03-9-9-9 4.97 0 9-4.03 9-9Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}
