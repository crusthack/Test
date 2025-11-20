import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: ReactNode; // 카드 안에 들어갈 내용
  className?: string;  // 추가 CSS 클래스
  variant?: "default" | "outlined" | "elevated"; // 스타일 변형
  padding?: "sm" | "md" | "lg"; // 안쪽 여백 크기
  fullWidth?: boolean; // 전체 너비 사용 여부
}

// variant별 스타일 정의
const variantStyles = {
  default: "bg-white shadow-md hover:shadow-lg",
  outlined: "bg-white border border-gray-200 hover:border-gray-300",
  elevated: "bg-white shadow-lg hover:shadow-xl",
};

// padding별 스타일 정의
const paddingStyles = {
  sm: "p-4", // 작은 여백 (1rem)
  md: "p-6", // 중간 여백 (1.5rem)
  lg: "p-8", // 큰 여백 (2rem)
};

export default function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  fullWidth = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg transition-shadow", // 기본 스타일: 둥근 모서리, 그림자 전환
        variantStyles[variant], // 선택한 variant 스타일
        paddingStyles[padding], // 선택한 padding 크기
        fullWidth && "md:col-span-2", // fullWidth가 true면 그리드에서 2칸 차지
        className // 추가 클래스
      )}
    >
      {children}
    </div>
  );
}