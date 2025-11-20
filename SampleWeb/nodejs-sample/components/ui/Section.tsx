import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: ReactNode;
  title?: string; // 섹션 제목
  className?: string;
  padding?: "sm" | "md" | "lg"; // 안쪽 여백
  marginBottom?: boolean; // 하단 여백
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Section({
  children,
  title,
  className,
  padding = "lg",
  marginBottom = true,
}: SectionProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md", // 기본 스타일
        paddingStyles[padding],
        marginBottom && "mb-8",
        className
      )}
    >
      {title && (
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {/*
            text-2xl: 큰 텍스트
            font-semibold: 중간 굵기
            mb-6: 하단 여백 1.5rem
          */}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}