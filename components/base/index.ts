export interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface BaseCardProps {
  className?: string;
}

export interface BaseInputProps {
  error?: boolean;
  helperText?: string;
  className?: string;
}

export interface BaseBadgeProps {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  className?: string;
}

export interface BaseAvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface BaseSeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}