import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // HTML 헤딩 레벨 (h1~h6)
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"; // 표시 크기
  align?: "left" | "center" | "right"; // 정렬
  className?: string;
  marginBottom?: boolean; // 하단 여백 여부
}

// 크기별 텍스트 크기 스타일
const sizeStyles = {
  sm: "text-lg", // 작음 (1.125rem)
  md: "text-xl", // 중간 (1.25rem)
  lg: "text-2xl", // 큼 (1.5rem)
  xl: "text-3xl", // 매우 큼 (1.875rem)
  "2xl": "text-4xl", // 아주 큼 (2.25rem)
  "3xl": "text-5xl", // 엄청 큼 (3rem)
  "4xl": "text-6xl", // 최대 (3.75rem)
};

// 정렬별 스타일
const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Heading({
  children,
  level = 1,
  size = "2xl",
  align = "left",
  className,
  marginBottom = true,
}: HeadingProps) {
  const mbClass = marginBottom ? "mb-4" : "";

  const commonClasses = cn(
    "font-bold text-gray-900", // 기본 스타일: 굵게, 진한 회색
    sizeStyles[size], // 선택한 크기
    alignStyles[align], // 선택한 정렬
    mbClass, // 하단 여백
    className // 추가 클래스
  );

  // level에 따라 적절한 HTML 태그 반환
  switch (level) {
    case 1:
      return <h1 className={commonClasses}>{children}</h1>;
    case 2:
      return <h2 className={commonClasses}>{children}</h2>;
    case 3:
      return <h3 className={commonClasses}>{children}</h3>;
    case 4:
      return <h4 className={commonClasses}>{children}</h4>;
    case 5:
      return <h5 className={commonClasses}>{children}</h5>;
    case 6:
      return <h6 className={commonClasses}>{children}</h6>;
    default:
      return <h1 className={commonClasses}>{children}</h1>;
  }
}