import { cn } from "@/lib/utils/cn";

export interface IconProps {
  name: string; // ex) "fa-heartbeat | fa-dragon"
  size?: "default" | "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "green" | "blue" | "red" | "yellow" | "black";
  align?: "left" | "center" | "right";
  className?: string;
  marginBottom?: boolean;
}

const sizeStyles = {
  default: "text-4xl",
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-2xl",
};

const colorStyles = {
  default: "text-green-500",
  green: "text-green-500",
  blue: "text-blue-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  black: "test-black-500",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Icon({
  name,
  size = "default",
  color = "default",
  align = "left",
  marginBottom = false,
  className,
}: IconProps) {
  return (
    <i
      className={cn(
        name,
        sizeStyles[size],
        colorStyles[color],
        alignStyles[align],
        marginBottom && "mb-4",
        "fa-solid",
        className
      )}
    />
  );
}
