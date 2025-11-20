import HealthHeader from "@/components/health/HealthHeader";
import ServerStatus from "@/components/health/ServerStatus";
import SystemInfo from "@/components/health/SystemInfo";
import JsonResponse from "@/components/health/JsonResponse";

// 정적 데이터
const healthData = {
  status: "OK",
  uptime: 36838.970354721,
  timestamp: "2025-11-02T10:13:59.141Z",
  environment: "production",
  memory: "18MB",
  database: "연결됨",
};

const apiEndpoints = [
  { method: "GET", path: "/api/health", description: "시스템 상태 확인" },
  { method: "GET", path: "/api/info", description: "API 정보" },
  { method: "GET", path: "/api/pokemon", description: "포켓몬 목록" },
  {
    method: "GET",
    path: "/api/pokemon/:id",
    description: "특정 포켓몬 조회",
  },
];

const webPages = ["홈페이지", "포켓몬 목록", "통계", "API 문서"];

const jsonResponseData = {
  status: healthData.status,
  uptime: healthData.uptime,
  timestamp: healthData.timestamp,
  environment: healthData.environment,
};

export default function Health() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 최소 높이 화면 전체, 배경 연한 회색 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 최대 너비, 중앙 정렬, 반응형 여백 */}
        <HealthHeader />
        <ServerStatus healthData={healthData} />
        <SystemInfo apiEndpoints={apiEndpoints} webPages={webPages} />
        <JsonResponse data={jsonResponseData} />
      </div>
    </div>
  );
}