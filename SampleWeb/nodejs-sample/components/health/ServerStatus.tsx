import StatusGrid from "./StatusGrid";
import Section from "@/components/ui/Section";
import { formatUptime, formatTimestamp } from "@/lib/utils/date";

interface HealthData {
  status: string;
  uptime: number;
  timestamp: string;
  environment: string;
  memory: string;
  database: string;
}

interface ServerStatusProps {
  healthData: HealthData;
}

export default function ServerStatus({ healthData }: ServerStatusProps) {
  // 상태 배열 구성
  const statuses = [
    {
      label: "서버 상태",
      value: "정상 작동 중",
      status: "success" as const, // 타입 단언
    },
    {
      label: "가동 시간",
      value: formatUptime(healthData.uptime), // 유틸리티 함수 사용
    },
    {
      label: "현재 시간",
      value: formatTimestamp(healthData.timestamp),
    },
    {
      label: "환경",
      value: healthData.environment,
    },
    {
      label: "메모리 사용량",
      value: healthData.memory,
    },
    {
      label: "데이터베이스",
      value: healthData.database,
      status: "success" as const,
    },
  ];

  return (
    <Section title="서버 상태">
      {/* Section 컴포넌트: 제목과 배경 자동 적용 */}
      <StatusGrid statuses={statuses} />
    </Section>
  );
}