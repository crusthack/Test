import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils/cn";

interface StatusCardProps {
  label: string; // 라벨 (예: "서버 상태")
  value: string; // 값 (예: "정상 작동 중")
  status?: "normal" | "success"; // 상태 타입
}

export default function StatusCard({
  label,
  value,
  status = "normal",
}: StatusCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      {/*
        bg-gray-50: 배경 연한 회색
        rounded-lg: 둥근 모서리
        p-4: 안쪽 여백 1rem
      */}
      <Text size="sm" color="muted" marginBottom={false} className="mb-2">
        {/* 라벨: 작은 텍스트, 회색 */}
        {label}
      </Text>
      <Heading
        level={3}
        size="2xl"
        className={cn(status === "success" && "text-green-600")}
        marginBottom={false}
      >
        {/*
          값: h3 태그, 큰 텍스트
          status가 success면 초록색
        */}
        {value}
      </Heading>
    </div>
  );
}