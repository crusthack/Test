import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import {Feature} from "@/components/FeatureGrid";

// 기능 데이터 배열
const features: Feature[] = [
  {
    icon: "fa-dragon",
    iconColor: "blue",
    title: "포켓몬 목록 보기",
    description: "모든 포켓몬의 목록을 확인하고 탐색할 수 있습니다.",
    href: "/pokemon",
    buttonText: "포켓몬 목록 보기",
  },
  {
    icon: "fa-search",
    iconColor: "black",
    title: "포켓몬 검색",
    description: "이름, 타입, 카테고리로 포켓몬을 검색할 수 있습니다.",
    href: "/pokemon",
    buttonText: "검색하기",
  },
  {
    icon: "fa-chart-bar",
    iconColor: "green",
    title: "통계 조회",
    description: "포켓몬의 타입별, 카테고리별 통계를 확인할 수 있습니다.",
    href: "/stats",
    buttonText: "통계 보기",
  },
  {
    icon: "fa-code",
    iconColor: "yellow",
    title: "API 문서",
    description:
      "RESTful API를 통해 프로그래밍 방식으로 데이터에 접근할 수 있습니다.",
    href: "/api-docs",
    buttonText: "API 정보",
  },
  {
    icon: "fa-heartbeat",
    iconColor: "red",
    title: "시스템 상태",
    description:
      "서버 상태, 가동 시간, 메모리 사용량 등 시스템 정보를 확인할 수 있습니다.",
    href: "/health",
    buttonText: "API 상태",
    fullWidth: true, // 이 카드는 전체 너비 사용
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/*
        min-h-screen: 최소 높이를 화면 전체로 설정
        bg-gray-50: 배경 연한 회색
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/*
          max-w-4xl: 최대 너비 896px
          mx-auto: 가로 중앙 정렬
          px-4 sm:px-6 lg:px-8: 반응형 좌우 여백
          py-12: 상하 여백 3rem
        */}
        <HeroSection />
        <FeatureGrid features={features} />
      </div>
    </div>
  );
}