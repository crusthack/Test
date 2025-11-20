import Heading from "@/components/ui/Heading";

export default function HealthHeader() {
  return (
    <div className="text-center mb-8">
      {/* 중앙 정렬, 하단 여백 2rem */}
      <Heading level={1} size="2xl" align="center">
        시스템 상태
      </Heading>
    </div>
  );
}