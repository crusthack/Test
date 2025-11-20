/**
 * 클래스명을 병합하는 유틸리티 함수
 * 여러 클래스를 하나로 합칠 때 사용합니다.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  // falsy 값들을 제거하고 나머지를 공백으로 연결
  return classes.filter(Boolean).join(" ");
}