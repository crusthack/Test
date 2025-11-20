import FeatureCard from "./FeatureCard";
import Grid from "@/components/ui/Grid";
import type { IconProps } from "@/components/ui/Icon";

export interface Feature {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  fullWidth?: boolean;
  icon?: string;
  iconColor?: IconProps["color"];
}

interface FeatureGridProps {
  features: Feature[]; // Feature 배열
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <Grid columns={{ default: 1, md: 2 }} gap="md">
      {/*
        Grid 컴포넌트 사용
        columns: 모바일 1열, 태블릿 이상 2열
        gap: 중간 간격
      */}
      {features.map((feature, index) => (
        // 배열을 map으로 순회하며 각 FeatureCard 생성
        <FeatureCard
          key={index} // React에서 리스트 렌더링 시 필요
          title={feature.title}
          description={feature.description}
          href={feature.href}
          buttonText={feature.buttonText}
          fullWidth={feature.fullWidth}
          icon={feature.icon}
          iconColor={feature.iconColor}
        />
      ))}
    </Grid>
  );
}