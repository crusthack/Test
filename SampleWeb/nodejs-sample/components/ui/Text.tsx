import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "muted" | "primary" | "success" | "danger";
  align?: "left" | "center" | "right";
  className?: string;
  marginBottom?: boolean;
}

const sizeStyles = {
  xs: "text-xs", // 0.75rem
  sm: "text-sm", // 0.875rem
  md: "text-base", // 1rem
  lg: "text-lg", // 1.125rem
  xl: "text-xl", // 1.25rem
};

const colorStyles = {
  default: "text-gray-900", // 진한 회색
  muted: "text-gray-600", // 중간 회색
  primary: "text-blue-600", // 파란색
  success: "text-green-600", // 초록색
  danger: "text-red-600", // 빨간색
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Text({
  children,
  size = "md",
  color = "default",
  align = "left",
  className,
  marginBottom = false,
}: TextProps) {
  const mbClass = marginBottom ? "mb-4" : "";

  return (
    <p
      className={cn(
        sizeStyles[size],
        colorStyles[color],
        alignStyles[align],
        mbClass,
        className
      )}
    >
      {children}
    </p>
  );
}