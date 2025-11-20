import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      {/*
        text-center: 모든 자식 요소 중앙 정렬
        mb-12: 하단 여백 3rem
      */}
      <Heading level={1} size="2xl" align="center">
        포켓몬 API
      </Heading>
      <Text size="xl" color="muted" align="center" marginBottom={false}>
        포켓몬 데이터를 조회하고 탐색할 수 있는 웹 인터페이스입니다.
      </Text>
    </div>
  );
}