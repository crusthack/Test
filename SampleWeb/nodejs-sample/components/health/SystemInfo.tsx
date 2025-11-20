import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

interface ApiEndpoint {
  method: string; // HTTP 메서드
  path: string; // API 경로
  description: string; // 설명
}

interface SystemInfoProps {
  apiEndpoints: ApiEndpoint[];
  webPages: string[];
}

export default function SystemInfo({
  apiEndpoints,
  webPages,
}: SystemInfoProps) {
  return (
    <Section title="시스템 정보">
      <div className="mb-6">
        {/* 하단 여백 1.5rem */}
        <Heading level={3} size="md" marginBottom={false} className="mb-3">
          API 엔드포인트
        </Heading>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {/*
            list-disc: 불릿 포인트
            list-inside: 불릿 안쪽
            space-y-2: 항목 사이 간격
            text-gray-700: 텍스트 중간 회색
          */}
          {apiEndpoints.map((endpoint, index) => (
            <li key={index}>
              <code className="bg-gray-100 px-2 py-1 rounded">
                {/*
                  code: 코드 스타일
                  bg-gray-100: 배경 연한 회색
                  px-2 py-1: 작은 여백
                  rounded: 둥근 모서리
                */}
                {endpoint.method} {endpoint.path}
              </code>{" "}
              - {endpoint.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading level={3} size="md" marginBottom={false} className="mb-3">
          웹 페이지
        </Heading>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {webPages.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}