import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps {
  children: ReactNode;
  href?: string; // 링크 주소 (있으면 Link로 변환)
  onClick?: () => void; // 클릭 이벤트
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

// variant별 스타일
const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700", // 파란 배경
  secondary: "bg-gray-600 text-white hover:bg-gray-700", // 회색 배경
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50", // 테두리만
  ghost: "text-gray-700 hover:bg-gray-100", // 배경 없음
};

// size별 스타일
const sizeStyles = {
  sm: "px-3 py-1.5 text-sm", // 작은 버튼
  md: "px-4 py-2 text-base", // 중간 버튼
  lg: "px-6 py-3 text-lg", // 큰 버튼
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: ButtonProps) {
  const baseClasses = "inline-block rounded transition-colors font-medium";

  const classes = cn(
    baseClasses, // 기본 스타일
    variantStyles[variant], // variant 스타일
    sizeStyles[size], // 크기 스타일
    className // 추가 클래스
  );

  // href가 있으면 Link 컴포넌트로 렌더링
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // href가 없으면 일반 button 태그로 렌더링
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}