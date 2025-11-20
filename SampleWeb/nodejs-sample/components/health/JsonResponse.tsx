import Section from "@/components/ui/Section";

interface JsonResponseProps {
  data: Record<string, unknown>; // JSON 데이터
}

export default function JsonResponse({ data }: JsonResponseProps) {
  return (
    <Section title="JSON 응답" marginBottom={false}>
      {/* 마지막 섹션이므로 하단 여백 없음 */}
      <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
        {/*
          bg-gray-900: 배경 진한 회색
          overflow-auto: 내용이 넘치면 스크롤
        */}
        <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono">
          {/*
            pre: 공백 보존
            text-sm: 작은 텍스트
            text-gray-100: 연한 회색 텍스트
            whitespace-pre-wrap: 공백과 줄바꿈 보존
            font-mono: 고정폭 폰트
          */}
          {JSON.stringify(data, null, 2)}
          {/*
            JSON.stringify(data, null, 2):
            - data를 JSON 문자열로 변환
            - null: 리플레이서 없음
            - 2: 들여쓰기 2칸
          */}
        </pre>
      </div>
    </Section>
  );
}