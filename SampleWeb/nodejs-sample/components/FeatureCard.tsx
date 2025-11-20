import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { IconProps } from "@/components/ui/Icon";


interface FeatureCardProps {
  icon?: string; // 아이콘
  iconColor?: IconProps["color"]; // 아이콘 색
  title: string; // 제목
  description: string; // 설명
  href: string; // 링크 주소
  buttonText: string; // 버튼 텍스트
  fullWidth?: boolean; // 전체 너비 사용 여부
}

export default function FeatureCard({
  icon = "",
  iconColor = "default",
  title,
  description,
  href,
  buttonText,
  fullWidth = false,
}: FeatureCardProps) {
  return (
    <Card fullWidth={fullWidth}>
      {/* Card 컴포넌트로 감싸기 */}
      <Icon name={icon} color={iconColor}/>
      <Heading level={2} size="lg" marginBottom={false}>
        {/* 제목: h2 태그, 크기 lg, 하단 여백 없음 */}
        {title}
      </Heading>
      <Text color="muted" marginBottom={true}>
        {/* 설명: 회색, 하단 여백 있음 */}
        {description}
      </Text>
      <Button href={href}>{buttonText}</Button>
      {/* 버튼: href 속성으로 Link 변환 */}
    </Card>
  );
}