import HeroSection from "@/app/heroSection";
import FeatureGrid, { Feature } from "@/app/featureGrid";

export const features: Feature[] = [
  {
    icon: "cat",
    color: "blue",
    title: "아군 캐릭터",
    description: "아군 캐릭터 도감",
    href: "allies",
    buttonText: "아군 캐릭터 목록 확인",
    width: 1,
  },
  {
    icon: "dog",
    color: "red",
    title: "적 캐릭터",
    description: "적 캐릭터 도감",
    href: "enemies",
    buttonText: "적 캐릭터 목록 확인",
    width: 1,
  },
  {
    icon: "map",
    color: "green",
    title: "스테이지",
    description: "스테이지 정보",
    href: "stages",
    buttonText: "스테이지 정보 확인",
    width: 1,
  },
  {
    icon: "calendar",
    color: "cyan",
    title: "월간미션",
    description: "미션도우미",
    href: "mission",
    buttonText: "미션 수행하기",
    width: 1,
  },
  {
    icon: "file",
    color: "blue",
    title: "API 문서",
    description: "API 사용 가이드와 엔드포인트 정보",
    href: "docs",
    buttonText: "문서 보기",
    width: 2, // ✅ fullWidth 의미
  },
  {
    icon: "activity",
    color: "blue",
    title: "Health Check",
    description: "시스템 상태 및 성능 모니터링",
    href: "health",
    buttonText: "상태 확인",
    width: 2, // ✅ fullWidth 의미
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />

      {/* Main Categories - 4 Cards */}
      <FeatureGrid features={features}/>
    </div>
  ); 
}
